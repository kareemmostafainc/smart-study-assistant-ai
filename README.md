# Smart Study Assistant (AI Web Application)

## 1. Overview
Smart Study Assistant is an advanced AI-driven web application that enhances the learning experience by automating study processes through Artificial Intelligence and Natural Language Processing (NLP). The platform allows students to upload study materials, generate summarized notes, create quizzes, analyze progress, and interact with their notes via an intelligent chat interface. It represents a full-stack implementation that integrates modern web technologies with AI microservices for scalable, efficient, and real-world academic applications.

---

## 2. Objectives
- Provide an intelligent study companion powered by AI.
- Automate summarization and quiz generation from study materials.
- Deliver personalized analytics and progress tracking.
- Demonstrate a clean, maintainable full-stack architecture suitable for professional and academic portfolios.

---

## 3. Core Features
1. Smart Notes Generator – Automatically summarizes uploaded PDF files into structured notes using NLP models.  
2. Quiz Generator – Generates multiple-choice and true/false questions based on uploaded content.  
3. Study Dashboard – Displays analytics, progress tracking, and performance metrics.  
4. Chat with Notes – Enables interactive, context-based Q&A using uploaded study materials.  
5. Authentication System – Secure registration and login with JWT and password encryption.  
6. Dark/Light Mode – Modern UI customization with persistent theme settings.  
7. Cloud Synchronization – Saves user data securely on the cloud using MongoDB Atlas.

---

## 4. System Architecture
### A. Client Layer (React.js)
Handles all user interactions, interface rendering, and REST API communication. Includes pages for Dashboard, Quiz, Notes, Chat, Login, and Registration. Utilizes reusable components (Navbar, Sidebar) for modular UI design.

### B. Server Layer (Node.js + Express)
Manages API endpoints, authentication, and database operations. Connects with the AI microservice for NLP processing. Uses environment variables for secure configuration.

### C. AI Layer (Python + Flask)
Processes natural language tasks such as summarization, question generation, and contextual answering. Utilizes pre-trained transformer models and NLP libraries (Transformers, NLTK). Communicates with the Node.js backend through REST endpoints.

---

## 5. Technical Stack
| Category | Technologies |
|-----------|--------------|
| Frontend | React.js, JavaScript (ES6), HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI Engine | Python, Flask, Transformers, NLTK |
| Authentication | JWT, Bcrypt |
| Deployment | Vercel, Render Cloud |
| Version Control | Git, GitHub |

---

## 6. Folder Structure
```
smart-study-assistant-ai/
│
├── README.md
├── LICENSE
├── .gitignore
├── vercel.json
│
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       ├── styles.css
│       ├── theme.js
│       ├── pages/
│       │   ├── Dashboard.js
│       │   ├── QuizPage.js
│       │   ├── NotesPage.js
│       │   ├── ChatPage.js
│       │   ├── Login.js
│       │   └── Register.js
│       └── components/
│           ├── Navbar.js
│           └── Sidebar.js
│
├── server/
│   ├── server.js
│   ├── routes.js
│   ├── database.js
│   ├── auth.js
│   ├── config.env
│   ├── ai/
│   │   ├── app.py
│   │   └── ai_utils.py
│   └── requirements.txt
│
└── docs/
    └── architecture_diagram.md
```

---

## 7. Installation and Setup
```bash
# Clone repository
git clone https://github.com/kareemmostafainc/smart-study-assistant-ai.git

# Navigate into project directory
cd smart-study-assistant-ai

# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install

# Run backend and frontend servers
npm start (for client)
node server.js (for backend)
```

For the AI module:
```bash
cd server/ai
pip install -r requirements.txt
python app.py
```

---

## 8. Future Enhancements
- Integration with GPT-based APIs for advanced conversational capabilities.  
- Personalized learning recommendations based on student progress.  
- Offline functionality using PWA technologies.  
- Support for multilingual datasets and global accessibility.  

---

## 9. License
This project is licensed under the MIT License, allowing free use, modification, and distribution with proper attribution.

---

## 10. Author
**Kareem Mostafa**  
Developer, AI Enthusiast, and aspiring Computer Science student.  
GitHub: [kareemmostafainc](https://github.com/kareemmostafainc)  
Email: kareemmostafainc@gmail.com
