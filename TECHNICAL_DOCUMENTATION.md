# Technical Documentation: CCRS & Insurance ML Portal

**A Deep Dive into the Engineering, Logic, and Analytics of the System.**

This document provides a low-level technical overview of the full-stack architecture, the machine learning pipeline, and the security protocols implemented in this project.

---

## 1. System Architecture

The application follows a modern decoupled architecture:

*   **Frontend**: React 19 Single Page Application (SPA).
*   **Backend**: Node.js/Express REST API.
*   **Database**: MongoDB Atlas (NoSQL).
*   **ML Engine**: Python 3.14+ (Scientific stack).

---

## 2. Database Schema (MongoDB/Mongoose)

### 2.1 User Model
Stores authenticated user profiles from Google OAuth.
*   `googleId`: String (Unique identifier from Google).
*   `displayName`: String (User's full name).
*   `email`: String (User's primary email).
*   `image`: String (URL to profile picture).
*   `createdAt`: Date (Auto-generated).

### 2.2 Course Model (CCRS)
Handles the student registration data.
*   `course_id`: String (Required, unique).
*   `course_name`: String (Required).
*   `credits`: Number (Range: 1-5).
*   `faculty`: String (Department name).
*   `semester`: String (Academic term).
*   `user`: ObjectId (Reference to User).

### 2.3 Insurance Model
Stores medical records for ML analysis.
*   `age`: Number (0-120).
*   `sex`: String (male/female).
*   `bmi`: Number (10-100).
*   `children`: Number (0-20).
*   `smoker`: String (yes/no).
*   `region`: String (southeast/southwest/northeast/northwest).
*   `charges`: Number (Actual medical cost).
*   `user`: ObjectId (Reference to User).

---

## 3. Authentication & Security

### 3.1 Google OAuth 2.0 Flow
1.  User clicks "Login with Google."
2.  Backend redirects to Google Consent screen.
3.  Google returns a `callback` with a code.
4.  Backend exchanges the code for a profile.
5.  Backend generates a **JWT (JSON Web Token)**.
6.  Backend redirects to the Frontend with the token in the URL.

### 3.2 Security Middleware
*   **ensureAuth**: Validates the JWT in the `Authorization` header (`Bearer <token>`).
*   **CORS**: Restricted to the frontend origin to prevent Cross-Origin attacks.
*   **Helmet**: Secures HTTP headers and enforces CSP policies.

---

## 4. Machine Learning Methodology

### 4.1 Data Processing
The Python engine (`insurance_analysis.py`) performs the following:
*   **Encoding**: Categorical features (sex, smoker, region) are transformed using One-Hot Encoding via `pandas.get_dummies`.
*   **Splitting**: 80/20 train-test split for model validation.

### 4.2 Linear Regression
*   **Use Case**: Identifying simple linear relationships between age and medical costs.
*   **Output**: R-Squared (R2) score and Mean Squared Error (MSE).

### 4.3 Random Forest Regressor
*   **Use Case**: Capturing non-linear interactions (e.g., how the combination of high BMI AND smoking leads to exponential charge increases).
*   **Hyperparameters**: 100 estimators with random state 42 for reproducibility.

### 4.4 Data Visualization (EDA)
Generates a 4-panel dashboard:
1.  **Age vs Charges**: Scatter plot with smoker hue.
2.  **Smoker Impact**: Box plot comparing charge distributions.
3.  **BMI Correlation**: Trend analysis for health metrics.
4.  **Charge Distribution**: Histogram with KDE density estimation.

---

## 5. API Endpoints

### Auth
*   `GET /auth/google`: Start OAuth flow.
*   `GET /auth/google/callback`: Callback for Google redirection.
*   `GET /auth/logout`: End session.

### Course Registration
*   `GET /api/courses`: Fetch user's registrations.
*   `POST /api/courses`: Add new registration.
*   `DELETE /api/courses/:id`: Remove registration.

### Insurance Analysis
*   `GET /api/insurance`: Fetch medical records.
*   `POST /api/insurance`: Add medical record.
*   `GET /api/insurance/analyze`: Trigger Python ML script and return results.

---

## 6. Deployment Strategy

### Backend (Render)
*   **Build**: Node.js environment with added `pip` support for Python libraries.
*   **Env Config**: `PYTHON_CMD`, `MONGODB_URI`, `JWT_SECRET`.

### Frontend (Vercel)
*   **Build**: Vite production bundle.
*   **Routing**: `vercel.json` rewrite ensures all paths point to `index.html`.
*   **Env Config**: `VITE_API_BASE_URL`.

---
*Technical Documentation Version 1.0.0*
