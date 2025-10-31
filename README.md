# Highway Delight (MERN Full-Stack Project)

Highway Delight is a full-stack MERN booking application that allows users to browse travel/experience options, view available dates and time slots, and securely book them. The system updates available slot counts and prevents duplicate bookings for the same time slot.

---

## 🛠️ Tech Stack

| Layer       | Technology |
|------------|------------|
| Frontend   | React + TypeScript + Vite + Tailwind CSS |
| Backend    | Node.js + Express.js |
| Database   | MongoDB Atlas |
| Deployment | Render / Netlify |

---

## 🗃️ 1. Clone the Repository

  ```bash
  git clone https://github.com/NyalataSaiRam/highway_delight.git
  cd highway_delight
  ```

## ⚙️ 2. Backend Setup
  ```
  cd backend
  npm install
  ```
  ### Create .env file
  
  create a file named .env inside the backend folder and add:
    
  ```
  PORT=5000
  CONN_STR=<Your MongoDB Atlas Connection String>
  ```
  ### Start Backend
  ```
  npm start
  ```
  server will start at:
  ```
  http:localhost:5000
  ```

## 🎨 3. Frontend Setup
```
cd frontend_typescript
npm install
```

### create .env file
```
VITE_LOCAL_SERVER=http://localhost:5000
```

### Start Frontend
```
npm run dev
```
Front will run at:
```
http://localhost:5173
```

# ✅ Project is Now Running

Open Frontend: http://localhost:5173

Frontend communicates with backend at http://localhost:5000
