# EmagePro

**EmagePro** is a full-stack web application built using the **MERN stack** with an **N-tier architecture**. It provides a seamless solution for managing employees with features like CRUD operations, authentication, search functionality, and a responsive UI/UX design. The project has been deployed on **Vercel** for live access.

---

## Authors

- **Aum Zaveri**  
  [GitHub Profile](https://github.com/ZaveriAum)

---

## **Features**

#### 🔒 **Authentication**

- User sign-up, login, and logout functionalities with secure token-based authentication.

#### 🧑‍💼 **Employee Management**

- Add, view, update, and delete employee records.
- Search employees by department or position for efficient management.

### 🎨 **Responsive Design**

- Professional and responsive UI/UX design to ensure compatibility across all device types.

---

## **Prerequisites**

Before running the application, ensure you have the following:

- **Node.js** and **npm** installed.
- **MongoDB** set up and running.

---

## **Installation & Setup**

Follow these steps to run the application locally:

### 🚀 **Backend Setup**

1. **Clone the backend repository:**

   ```bash
   git clone https://github.com/ZaveriAum/101413047_comp3123_assignment1

   ```

2. **Navigate to the project directory**

```bash
cd 101413047_comp3123_assignment1
```

3. **Install backend dependencies**

```bash
npm install
```

4. **Set up MongoDB connection**

- Create a .env file in the project root.
- Add the following variables

```env
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key
```

5. **Start the backend server**

```bash
npm run nodemon
```

The backend server will run on http://localhost:5000 by default

### 🌐 **Frontend Setup**

1. **Clone the frontend repository**

```bash
git clone https://github.com/ZaveriAum/101413047_comp3123_assignment2_reactjs
```

2. **Navigate to the project directory**

```bash
cd 101413047_comp3123_assignment2_reactjs
```

3. **Install frontend dependencies**

```bash
npm install
```

4. **Configure the API client**

- Open the project in your preferred code editor.
- Set the backend server URL (e.g., http://localhost:5000) in the API client configuration.

5. **Start the frontend server**

```bash
npm start
```

The frontend application will run on http://localhost:3000 by default.

## **Folder Structure**

**Backend**

```plaintext
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── .env
└── index.js
```

**Frontend**

```plaintext
frontend/
├── src/
│ ├── assets/
│ ├── client/
│ ├── components/
│ ├── context/
│ ├── service/
│ ├── App.js
│ └── index.js
├── .env
└── package.json
```

## **Deployment**

The project is deployed and accessible live on Vercel.
Visit Live Application - https://101413047-comp3123-assignment2-reactjs.vercel.app/

## **Feedback & Contributions**

For any feedback, reach out at aumzaveri06@gmail.com.
