const employees = require('./Employee');

console.log(employees);
var http = require("http");
//TODO - Use Employee Module here
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
// Create a web server using the 'http' module
const server = http.createServer((req, res) => {
    // Check if the request method is not GET
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        }

        if (req.url === '/employee') {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employees));
        }

        if (req.url === '/employee/names') {
            const employeeNames = employees.map((employee) => {
                return `${employee.firstName} ${employee.lastName}`;
            });

            employeeNames.sort();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(employeeNames));
        }

        if (req.url === '/employee/totalsalary') {
            const totalSalary = employees.reduce((acc, employee) => {
                return acc + employee.salary;
            }, 0);

            const response = { total_salary: totalSalary };

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));
        }
    }

    if (!res.finished) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
    }
});

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});