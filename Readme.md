# 🚀 Employee Management System (Backend API)

A simple and scalable **Employee Management System (EMS)** built using **Node.js, Express, Prisma ORM, and PostgreSQL**.

## 🚀 Live Demo

🔗 You can explore and test the live API using Swagger UI here:
https://employee-management-system-is4e.onrender.com/api-docs/#


This system demonstrates real-world backend architecture with **role-based access control**, covering Admin, HR, and Employee workflows.

---

## 📌 Features

### 🔐 Authentication

* JWT-based login system
* Secure password hashing using bcrypt
* Role-based access control

---

### 👨‍💼 Admin Capabilities

* Create, update, delete employees
* Create and manage HR accounts
* Assign roles (ADMIN, HR, EMPLOYEE)
* Manage salaries (increment, decrement, bonus)
* View all employees and departments
* View organization-wide data

---

### 🧑‍💼 HR Capabilities

* Create and update employee records
* View employees (restricted access)
* Approve / reject leave requests
* Cannot delete employees (soft delete only)

---

### 👨‍🔧 Employee Capabilities

* View own profile
* Update personal details (phone, address)
* Apply for leave
* View leave status (pending / approved / rejected)

---

## 🏗️ Tech Stack

* **Node.js + Express** – Backend framework
* **Prisma ORM** – Database ORM
* **PostgreSQL** – Database
* **JWT** – Authentication
* **bcrypt** – Password hashing
* **pgAdmin** – DB management

---

## 📁 Project Structure

```
src/
  modules/
    auth/
    employees/
    departments/
    leaves/
    payroll/
    audit/
  shared/
    middleware/
    helpers/
    lib/
config/
app.js
server.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd employee-management-system
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup environment variables

Create a `.env` file:

```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/ems
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4. Setup database

```
npx prisma migrate dev
```

---

### 5. Seed initial admin users

```
node prisma/seed.js
```

---

### 6. Start server

```
npm start
```

---

## 🔑 Authentication

### Login

```
POST /auth/login
```

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

👉 Use this token in all protected routes:

```
Authorization: Bearer <TOKEN>
```

---

## 📦 API Overview

### 👤 Employees

| Method | Endpoint       | Access                  |
| ------ | -------------- | ----------------------- |
| POST   | /employees     | Admin, HR               |
| GET    | /employees     | Admin, HR               |
| GET    | /employees/:id | All (restricted)        |
| PUT    | /employees/:id | All (restricted)        |
| DELETE | /employees/:id | Admin (full), HR (soft) |

---

### 🏢 Departments

| Method | Endpoint     | Access    |
| ------ | ------------ | --------- |
| POST   | /departments | Admin     |
| GET    | /departments | Admin, HR |

---

### 📝 Leaves

| Method | Endpoint           | Access    |
| ------ | ------------------ | --------- |
| POST   | /leaves            | Employee  |
| GET    | /leaves            | Admin, HR |
| PATCH  | /leaves/:id/status | Admin, HR |
| GET    | /leaves/my         | Employee  |

---

## 🔄 System Workflow

### Step 1: Admin Login

* Admin logs in and receives JWT token

### Step 2: Create HR

* Admin creates HR users

### Step 3: Create Employees

* Admin or HR creates employees
* Assign department, salary, role

### Step 4: Employee Login

* Employee logs in using credentials

### Step 5: Apply Leave

* Employee submits leave request

### Step 6: HR Review

* HR views all leave requests
* Approves or rejects requests

### Step 7: Employee Checks Status

* Employee views updated leave status

---


# 🔐 Token Usage & Role-Based Access

After login, every user receives a **JWT token**:

```json
{
  "token": "JWT_TOKEN"
}
```

👉 This token must be included in all protected API requests:

```
Authorization: Bearer <TOKEN>
```

---

## 👑 Admin Token

Use token from:

```
POST /auth/login (Admin credentials)
```

### ✅ Admin can:

* Create HR and Employees
* View all employees
* Update any employee
* Delete employees (permanent)
* Manage salaries (increment, decrement, bonus)
* View all departments
* View all leave requests

### 🔗 Accessible APIs:

```
POST   /employees
GET    /employees
GET    /employees/:id
PUT    /employees/:id
DELETE /employees/:id
PATCH  /employees/:id/salary

POST   /departments
GET    /departments

GET    /leaves
PATCH  /leaves/:id/status
```

---

## 🧑‍💼 HR Token

Use token from:

```
POST /auth/login (HR credentials)
```

### ✅ HR can:

* Create employees
* Update employee details
* View employees (only EMPLOYEE role)
* Approve / reject leave requests
* Soft delete employees (mark inactive)

### ❌ HR cannot:

* Create Admins
* Change roles
* Delete permanently
* Manage salaries

### 🔗 Accessible APIs:

```
POST   /employees
GET    /employees
GET    /employees/:id
PUT    /employees/:id
DELETE /employees/:id   (soft delete)

GET    /departments

GET    /leaves
PATCH  /leaves/:id/status
```

---

## 👨‍🔧 Employee Token

Use token from:

```
POST /auth/login (Employee credentials)
```

### ✅ Employee can:

* View own profile
* Update phone & address only
* Apply for leave
* View own leave status

### ❌ Employee cannot:

* View other employees
* Approve/reject leaves
* Access admin/HR data

### 🔗 Accessible APIs:

```
GET    /employees/:id   (only self)
PUT    /employees/:id   (only phone & address)

POST   /leaves
GET    /leaves/my
```

---

## ⚠️ Important Rules

* Always use the **correct token for the role**
* If wrong role → ❌ `403 Forbidden`
* If no token → ❌ `401 Unauthorized`
* If invalid token → ❌ `401 Unauthorized`

---

## 🧠 Quick Summary

| Action          | Who Can Do              |
| --------------- | ----------------------- |
| Create HR       | Admin                   |
| Create Employee | Admin, HR               |
| View Employees  | Admin, HR               |
| Update Employee | Admin, HR, Self         |
| Delete Employee | Admin (hard), HR (soft) |
| Apply Leave     | Employee                |
| Approve Leave   | HR, Admin               |
| View Own Leave  | Employee                |
| Manage Salary   | Admin                   |

---

This section ensures:
✔ Clear role separation
✔ Easy API testing in Postman
✔ Real-world security understanding


## 🔐 Role-Based Access Summary

| Role     | Permissions                       |
| -------- | --------------------------------- |
| ADMIN    | Full system access                |
| HR       | Manage employees + approve leaves |
| EMPLOYEE | Self-service access only          |

---

## 📌 Notes

* All protected routes require JWT token
* RoleGuard middleware restricts access
* Soft delete is used for HR actions
* Clean modular architecture for scalability

---

## 🚀 Future Improvements

* Pagination & filtering
* File/document uploads
* Dashboard analytics
* Swagger API documentation
* Refresh token system

---

## 👨‍💻 Author

Built as a backend system to demonstrate:

* Clean architecture
* Real-world role handling
* Scalable API design

---

## ⭐ If you found this useful

Give it a ⭐ and use it in your portfolio 🚀
