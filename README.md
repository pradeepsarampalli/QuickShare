# ⚡ QuickShare

A secure and fast **File Sharing Application** built with **Node.js, Express, and MongoDB**. It provides authentication, file uploads, and quick sharing features with an intuitive UI.

---

## 🚀 Features

* 🔐 **User Authentication** – Signup, Login, and JWT-based sessions
* 📤 **File Upload** – Upload and store files securely
* 📥 **File Sharing** – Generate links for quick sharing
* 🛡️ **Middleware Protection** – Auth & file upload handling
* 🎨 **Frontend UI** – Simple, responsive design with HTML & CSS

---

## 📂 Project Structure

```
QuickShare-main/
│── server.js                     # Main server file
│── package.json                  # Dependencies
│
├── controller/                   # Business logic
│   ├── authController.js         # Auth functions
│   └── fileController.js         # File handling
│
├── middleware/                   # Middleware utilities
│   ├── authMiddleware.js         # Auth protection
│   └── multer.js                 # File upload handling
│
├── model/                        # Mongoose models
│   ├── userModel.js              # User schema
│   └── uploadModel.js            # File schema
│
├── routes/                       # App routes
│   ├── authRoute.js              # Auth endpoints
│   └── fileRoutes.js             # File endpoints
│
└── public/                       # Frontend assets
    ├── index.html
    ├── login.html
    ├── signup.html
    └── img/ (UI icons)
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/quickshare.git
   cd QuickShare-main
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file and add:

   ```env
   PORT=3000
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

4. **Run the server**

   ```bash
   node server.js
   ```

5. **Access the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by **S Pradeep** ✨
If you like this project, consider giving it a ⭐ on GitHub!
