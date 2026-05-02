📚 Simple Q&A Forum API

A RESTful API built with NestJS for a simple Q&A forum system where users can register, log in, create discussion threads, and participate in conversations. The system uses authentication and ensures that users can only update or delete their own threads.


🚀 Tech Stack
Backend Framework: NestJS (Express-based)
Database: PostgreSQL
ORM: Prisma
Authentication: JWT (JSON Web Token)
Language: TypeScript


🔐 Features
👤 User Management
User registration
User login (JWT authentication)
View user profile
🧵 Thread Management (Q&A)
Create thread (question)
View all threads
View single thread
Update thread (owner only)
Delete thread (owner only)
🔒 Security
JWT authentication required for protected routes
Ownership validation (users can only modify their own threads)


⚙️ Environment Variables

Create a .env file in the root directory:

PORT=3000

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/your_db_name

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=2h




🛠 Installation & Setup

# install dependencies
npm install

# run prisma migrations
npx prisma migrate dev

# generate prisma client
npx prisma generate

# start development server
npm run start:dev



📌 API Endpoints

POSTMAN: https://galactic-sunset-265314.postman.co/workspace/codechallenge2be~5465ec8b-a763-4046-b7fb-de444c0f061d/collection/50232975-39e8c1a6-1a72-4ce9-ac92-216a759f741b?action=share&source=copy-link&creator=50232975

POST api/auth/register

![Auth Register](assets/Auth%20Register.PNG)

POST api/auth/login

![Auth Login](assets/Auth%20Login.PNG)

GET api/users/:id

![Auth Specific User](assets/Auth%20Get%20Specific%20User.PNG)

GET api/threads

![All Threads](assets/Get%20All%20Threads.PNG)

GET api/threads/:id

![Specific Thread](assets/Get%20Specific%20Thread.PNG)

POST api/threads

![Create Thread](assets/POST%20Create%20New%20Thread.PNG)

PUT api/threads/:id

![Update Thread](assets/PUT%20Edit%20Thread.PNG)

DELETE api/threads/:id

![Delete Thread](assets/DELETE%20Thread.PNG)

🧱 Database Schema (Prisma)

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id           String        @id @default(uuid())
  displayId    String       @unique
  email        String        @unique
  username     String        @unique
  name         String?
  password     String
  role         String        @default("USER")
  refreshToken  String?
  threads  Thread[]
}


model Thread {
  id              String              @id @default(uuid())
  userId          String
  displayId       String             @unique
  title           String
  content         String       
  createdAt       DateTime          @default(now())
  updatedAt DateTime @updatedAt
  user            User              @relation(fields: [userId], references: [id])
}


📌 Future Improvements
Add comments system
Add likes/dislikes
Pagination for threads
Role-based access control (Admin/User)
Search & filtering


👨‍💻 Author

Built with NestJS, Prisma, and PostgreSQL for learning and production-ready API design practice.