# Task Management API

Sebuah API manajemen tugas berbasis GraphQL dengan Node.js, Express, dan MySQL. Mendukung operasi CRUD, filter tugas, validasi input, dan error handling.

## Fitur Utama
- ✅ Buat, baca, update, hapus tugas
- ✅ Filter tugas berdasarkan status & tanggal jatuh tempo
- ✅ Validasi input (title min 3 karakter, status enum, dll)
- ✅ Error handling terstruktur
- ✅ Docker support
- ✅ Unit & integration testing


## Prasyarat
- Node.js v16+
- MySQL server (local atau Docker)
- (Opsional) Docker & docker-compose
- API client (Postman/Insomnia/GraphiQL)

## 🚀 Cara Setup

### 1. Clone Repository
```bash
git clone https://github.com/KemasMuhAriZulmi/task-management-api.git
cd task-management-api

-  Install Dependencies
npm i/ npm install

** SET UP DATABASE **
- Buat Database di MySQL
CREATE DATABASE task_management;
- jalankan SQL script / docker
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  dueDate DATE NOT NULL,
  status ENUM('pending', 'in progress', 'completed') NOT NULL
);
* docker-compose up -d db *
- configurasi file env
- jalankan ("npm run dev")

*** TESTING UNIT ***
- unit tests
npm test
- integration tests
npm run test:integration

📚 Dokumentasi API
 - Contoh Query & Mutation
    - Buat task baru :
    mutation {
  createTask(input: {
    title: "Belajar GraphQL",
    description: "Membuat API task management",
    dueDate: "2023-12-31",
    status: "pending"
  }) {
    id
    title
    status
  }
}
 %% RESPONS SUKSES %%
 {
  "data": {
    "createTask": {
      "id": "1",
      "title": "Belajar GraphQL",
      "status": "pending"
    }
  }
}

🔒 Fitur Opsional
 *** Autentikasi JWT ***
 - Tambahkan "Authorization: Bearer <your_jwt_token>" pada header request
 - Generate Token "const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET, { expiresIn: '1h' });" tambahkan di dalam resolver

README ini mencakup:
1. Instruksi setup lengkap untuk berbagai skenario
2. Contoh request/response untuk semua endpoint
3. Dokumentasi error handling
4. Petunjuk untuk fitur opsional
5. Troubleshooting umum
6. Kontribusi guidelines

P.S Untuk versi live documentation, Anda bisa deploy GraphiQL atau Postman collection secara terpisah.

Dibuat dengan ❤️ oleh [Kemas Muh Ari Zulmy]. Untuk pertanyaan, silakan buka issue atau hubungi [kemasuharizulmy@gmail.com]
