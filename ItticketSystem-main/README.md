
# IT Ticket Management System 🎫

[🌐 View on GitHub]'https://karthikeyank0903.github.io/ItticketSystem/'

An end-to-end full-stack web application designed for managing internal IT support tickets. This system supports ticket creation, tracking, resolution, and role-based access for employees and support engineers.

## 📌 Features

- 🔐 User Authentication (JWT-based)
- 👥 Role-based access (Employee & Support Engineer)
- 📝 Ticket Submission & Tracking
- 📊 Dashboard views for users
- 📂 Ticket categorization by priority and type
- 📅 Auto-generated timestamps
- 🗃️ Persistent data storage with MySQL

## 🛠️ Tech Stack

### Backend:
- Java 17
- Spring Boot 3
- Spring Security (JWT)
- Spring Data JPA
- MySQL

### Frontend:
- React.js (with Hooks)
- TailwindCSS or Bootstrap
- Axios (API integration)
- React Router DOM
- Vite (Port 5173)

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/karthikcode/itticketsystem.git
cd itticketsystem
```

### 2️⃣ Backend Setup (Spring Boot)

#### 📁 Navigate to backend folder

```bash
cd backend
```

#### ⚙️ Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/itticketdb
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=your_jwt_secret_key
```

#### ▶️ Run the Application

```bash
./mvnw spring-boot:run
```

### 3️⃣ Frontend Setup (React + Vite)

#### 📁 Navigate to frontend folder

```bash
cd frontend
```

#### 📦 Install dependencies

```bash
npm install
```

#### ▶️ Start the Frontend Server

```bash
npm run dev
```

The app will run on:  
**http://localhost:5173**

### 🔧 CORS Configuration (Spring Boot)

```java
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowCredentials(true);
        }
    };
}
```

### 🗃️ Sample Database Schema (MySQL)

```sql
CREATE TABLE tickets (
  request_id VARCHAR(255) PRIMARY KEY,
  employee_id VARCHAR(255),
  system_id VARCHAR(255),
  subject VARCHAR(255),
  description TEXT,
  priority VARCHAR(50),
  request_type VARCHAR(50),
  critical_system BOOLEAN,
  created_by_id VARCHAR(255),
  created_by_name VARCHAR(255),
  created_by_email VARCHAR(255)
);
```

## 👥 Roles

- **Employee**
  - Create and view own tickets
- **Support Engineer**
  - View, update, resolve all tickets

## 🔐 API Overview

### Auth

| Method | Endpoint        | Description        |
|--------|------------------|--------------------|
| POST   | `/auth/signup`   | Register a user    |
| POST   | `/auth/login`    | Login & get token  |

### Tickets

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/tickets`         | Create a ticket              |
| GET    | `/tickets`         | Get all tickets (Admin)      |
| GET    | `/tickets/{id}`    | Get ticket by ID             |

## 🖼️ Screenshots

> Add screenshots of your dashboard, ticket form, and login page

## 📦 Future Enhancements

- ✅ Email notifications
- ✅ Ticket assignment to support agents
- ⏳ File attachment support
- ⏳ Admin role for full control
- ⏳ Filtering, searching & exporting reports

## 🙌 Contributors

- **Karthikeyan Krishnan**  
  [🔗 GitHub Repo](https://github.com/karthikcode/itticketsystem)

## 📄 License

MIT License
