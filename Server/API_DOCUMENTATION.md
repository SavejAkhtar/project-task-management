# Project & Task Management System API Documentation

## Base URLs

### Production

```text
https://project-task-management-n9kv.onrender.com/api
```

### Local Development

```text
http://localhost:8000/api
```

Use the production URL when testing the deployed application. Use the local URL when running the backend locally.

## Authentication

Protected APIs require a JWT token in the request header:

```text
Authorization: Bearer <JWT_TOKEN>
```

After login, use the returned token for protected requests.

## User APIs

### Register User

**POST** `/users/register`

Request Body:

```json
{
  "name": "Test User",
  "email": "test@gmail.com",
  "password": "123456"
}
```

Newly registered users use the `teamMember` role by default. Admin and Project Manager access is assigned separately by the application/database configuration.

### Login User

**POST** `/users/login`

Request Body:

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Returns a JWT token on successful login.

### Get Profile

**GET** `/users/profile`

Authentication: Required

Returns the authenticated user's JWT payload.

### Get Admin Profile

**GET** `/users/admin-profile`

Authentication: Required

Role: `admin`

### Get Team Members

**GET** `/users/team-members`

Authentication: Required

Roles: `admin`, `projectManager`

Returns users with the `teamMember` role.

## Project APIs

### Create Project

**POST** `/projects/create`

Authentication: Required

Roles: `admin`, `projectManager`

Request Body:

```json
{
  "name": "Employee Management System",
  "description": "Project description",
  "status": "active"
}
```

### Get Projects

**GET** `/projects`

Authentication: Required

Returns the available projects.

### Update Project

**PUT** `/projects/:id`

Authentication: Required

Roles: `admin`, `projectManager`

Request Body:

```json
{
  "name": "Updated Project",
  "description": "Updated description",
  "status": "active"
}
```

### Delete Project

**DELETE** `/projects/:id`

Authentication: Required

Roles: `admin`, `projectManager`

## Task APIs

### Create Task

**POST** `/tasks/create`

Authentication: Required

Roles: `admin`, `projectManager`

Request Body:

```json
{
  "title": "Create Login Page",
  "description": "Create login page for project",
  "project": "PROJECT_ID",
  "assignedTo": "USER_ID",
  "priority": "high",
  "dueDate": "2026-09-30"
}
```

Allowed priority values:

- `low`
- `medium`
- `high`

### Get Tasks

**GET** `/tasks`

Authentication: Required

Supported query parameters:

```text
?page=1&limit=20&status=todo&priority=high
```

Supported status values:

- `todo`
- `in-progress`
- `completed`

The `status` and `priority` query parameters are optional.

### Search Tasks

**GET** `/tasks/search?keyword=Login`

Authentication: Required

Searches tasks by title using the supplied keyword.

### Get My Tasks

**GET** `/tasks/myTask`

Authentication: Required

Role: `teamMember`

Returns tasks assigned to the authenticated team member.

### Filter Tasks

**GET** `/tasks?status=todo&priority=high`

Authentication: Required

Filters tasks using status and priority. This uses the same task listing endpoint with query parameters.

### Update Task Status

**PUT** `/tasks/:id/status`

Authentication: Required

Role: `teamMember`

The authenticated team member can update the status of a task assigned to them.

Request Body:

```json
{
  "status": "in-progress"
}
```

### Update Task

**PUT** `/tasks/:id`

Authentication: Required

Roles: `admin`, `projectManager`

Request Body:

```json
{
  "title": "Create Login Page Updated",
  "description": "Updated login page task",
  "project": "PROJECT_ID",
  "assignedTo": "USER_ID",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-10-05"
}
```

### Delete Task

**DELETE** `/tasks/:id`

Authentication: Required

Roles: `admin`, `projectManager`

## Audit Logging

Task create, update, status update, and delete operations create audit log records containing the authenticated user, action, entity, entity ID, and timestamps.

The audit log is handled internally by the backend and does not have a separate public API endpoint.

## Common API Response Format

The API commonly uses a response structure containing a status flag and message, for example:

```json
{
  "status": 1,
  "msg": "Operation successful"
}
```

For protected endpoints, authentication failures may return a response such as:

```json
{
  "status": 0,
  "msg": "Token required"
}
```

or:

```json
{
  "status": 0,
  "msg": "Invalid or expired token"
}
```

Role-restricted endpoints may return:

```json
{
  "status": 0,
  "msg": "Access denied"
}
```

## Postman Testing

A Postman collection is included in the project root for API documentation and testing.

The collection uses the production base URL by default and includes authentication, project, and task API requests.

Collection variables include:

```text
baseUrl
 token
 projectId
 taskId
 memberId
```

Replace placeholder IDs with actual values when required.
