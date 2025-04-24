# AI-Powered Interviewer Backend

This is a TypeScript + Node.js that communicates with OpenAI to make it play as role as recruiter. It includes full authentication, OpenAI integration, conversation and message tracking, and clean architecture aimed to make.

---

## Features

- JWT-based authentication (register & login)
- OpenAI ChatGPT integration
- Conversations + message history per user
- Role-based dynamic system prompts
- Token usage tracking support
- Built with Express, Sequelize (PostgreSQL), TypeScript
- Clean project structure, fully typed

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL, Sequelize
- **AI Provider:** OpenAI API
- **Auth:** JWT
- **Dev Tools:** ts-node-dev, dotenv, helmet, cors, morgan

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
# Server
WEB_PORT=4000
FRONTEND_URL=http://localhost:3000
APP_URL=localhost

# Database
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_DIALECT=postgres

# Auth
JWT_SECRET=your_super_secret_jwt_key

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MODEL_PRO=gpt-4
```

### 4. Start the server
```bash
npm run dev
```