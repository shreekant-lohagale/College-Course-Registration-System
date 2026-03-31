# 🎓 CCRS Portal: Academic Registration & Insurance ML Analysis

**A sophisticated full-stack portal designed to bridge academic course management with advanced medical data analysis.**

Built with a **Deep Space** aesthetic, this platform provides a premium experience for students managing their registrations and analysts exploring medical cost prediction through Machine Learning.

---

## 🚀 Key Features

### 📚 Academic Course Management
*   **Dynamic Registration**: Register for courses with high-fidelity UI cards.
*   **Secure Dashboard**: Synchronous data management with a modern, glass-morphic interface.
*   **RESTful Integration**: Full CRUD operations for all academic records.

### 🏥 Insurance Portfolio & ML Engine
*   **Advanced Data Entry**: Mongoose-validated medical record entry (Age, BMI, Smoker Status).
*   **Machine Learning Integration**: Trigger powerful Python ML models directly from the UI.
*   **Predictive Analytics**: compare **Linear Regression** vs **Random Forest** R² scores and MSE.
*   **EDA Visualizations**: Dynamic rendering of Exploratory Data Analysis plots saved on the cloud.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide-Icons |
| **Backend** | Node.js, Express, Passport.js (Google OAuth 2.0) |
| **Database** | MongoDB Atlas (Cloud Database) |
| **ML Engine** | Python 3, Pandas, Scikit-Learn, Seaborn, Matplotlib |
| **Deployment**| **Vercel** (Frontend) & **Render** (Backend/Python Engine) |

---

## ⚙️ Local Setup Guide

1.  **Clone the Repository**:
    ```bash
    git clone [repository-url]
    cd College-Course-Registration-System
    ```

2.  **Environment Variables**: Create a `.env` in the root:
    ```env
    PORT=5000
    MONGODB_URI=your_atlas_uri
    GOOGLE_CLIENT_ID=your_id
    GOOGLE_CLIENT_SECRET=your_secret
    JWT_SECRET=your_jwt_key
    FRONTEND_URL=http://localhost:5173
    CALLBACK_URL=http://localhost:5000/auth/google/callback
    ```

3.  **Run the Project**:
    ```bash
    # Root: Start Backend
    npm install
    npm run dev

    # client: Start Frontend
    cd client
    npm install
    npm run dev
    ```

---

## 🚢 Deployment Configuration

### 🌌 Vercel (Frontend)
*   **Root Directory**: `client`
*   **Framework**: Vite
*   **Env Variables**: `VITE_API_BASE_URL` (your Render URL)

### ☁️ Render (Backend)
*   **Runtime**: Node
*   **Build Command**: `npm run build` (Installs Node & Python requirements)
*   **Start Command**: `npm start`
*   **Env Variables**: `PYTHON_CMD=python3`, `FRONTEND_URL`, `MONGODB_URI`, etc.

---

## 👨‍💻 Author
**Shreekant Lohagale** 
*Expertly designed for academic and analytical excellence.*

---
*© 2026 CCRS Portal. All rights reserved.*
