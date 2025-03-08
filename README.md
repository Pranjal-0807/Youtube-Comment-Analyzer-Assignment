# 📊 YouTube Comment Sentiment Analyzer

A full-stack **MERN** application that fetches YouTube comments, analyzes sentiment using **Gemini API**, and provides insights through **data visualization**.

## 🚀 Features

✅ Fetch comments from YouTube videos using the **YouTube API**  
✅ Analyze sentiments (Agree, Disagree, Neutral) using **Gemini AI**  
✅ Store processed comments in **MongoDB**  
✅ Generate **CSV reports** for sentiment insights  
✅ Interactive dashboard with **data visualization**  

---

## 🛠️ Tech Stack

### **Frontend** 🖥️
- **React** (Vite for fast builds)
- **Tailwind CSS** (UI styling)
- **Redux Toolkit** (State management)
- **Chart.js** (Data visualization)
- **Axios** (API requests)

### **Backend** ⚙️
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Google YouTube API** (Fetching comments)
- **Gemini AI API** (Sentiment analysis)
- **json2csv** (CSV export)

---

## 📦 Installation

```sh
# Clone the Repository**
git clone https://github.com/Pranjal-0807/Youtube-Comment-Analyzer-Assignment.git
cd Youtube-Comment-Analyzer-Assignment

# Backend Setup
cd backend
npm install
# Craete a .env file, add the following environment variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_youtube_api_key
GEMINI_API_KEY=your_gemini_api_key
# Start the backend server
nodemon server.js
```

```sh
# Frontend Setup
cd frontend
npm install
# Craete a .env file, add the following environment variables
VITE_BACKEND_URL=http://localhost:5000
# Start the frontend server
npm run dev
```




