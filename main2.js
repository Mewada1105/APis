<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Employee Attendance</title>
<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    width: 300px;
    display: inline-block;
  }
  .red {
    color: red;
  }
  .green {
    color: green;
  }
  .purple {
    color: purple;
  }
</style>
</head>
<body>
<div id="employees"></div>

<script>
// Fetch data from API
fetch('https://res.cloudinary.com/des3si8bs/raw/upload/v1654770778/attendance/attandance_alc65n.JSON')
  .then(response => response.json())
  .then(data => {
    // Process the data
    displayEmployees(data);
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to display employees in card format
function displayEmployees(data) {
  const employeesContainer = document.getElementById('employees');
  
  data.forEach(employee => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Check if the employee has taken more than 5 leaves
    const totalLeaveDays = employee.LeaveDays;
    if (totalLeaveDays > 5) {
      card.classList.add('red');
    }

    // Calculate total productive time
    const totalWorkingDays = employee.TotalWorkingDays;
    const totalProductiveTime = totalWorkingDays * 8.5;

    // Check if the employee has not taken any leave
    if (totalLeaveDays === 0) {
      card.classList.add('purple');
    }

    // Display employee details in the card
    card.innerHTML = `
      <p><strong>Employee Name:</strong> ${employee.EmployeeName}</p>
      <p><strong>Join Date:</strong> ${employee.JoinDate}</p>
      <p><strong>Leave Days:</strong> ${totalLeaveDays}</p>
      <p><strong>Present Days:</strong> ${employee.PresentDays}</p>
      <button onclick="showLeaveDetails('${employee.EmployeeName}', '${employee.LeaveDetails}')">Show Leave Details</button>
      <div id="leaveDetails_${employee.EmployeeName}" style="display: none;"></div>
      <p class="green"><strong>Total Productive Time:</strong> ${totalProductiveTime} hours</p>
    `;
    
    employeesContainer.appendChild(card);
  });
}

// Function to show leave details
function showLeaveDetails(employeeName, leaveDetails) {
  const leaveDetailsDiv = document.getElementById(`leaveDetails_${employeeName}`);
  leaveDetailsDiv.innerHTML = `<p><strong>Leave Details:</strong> ${leaveDetails}</p>`;
  leaveDetailsDiv.style.display = 'block';
}
</script>
</body>
</html>
