# Task Management App (NestJS)

Aplikasi pengelolaan tugas siswa berbasis RESTful API menggunakan **NestJS** dan **MySQL**. Dirancang untuk memisahkan hak akses antara **Guru (TEACHER)** dan **Murid (STUDENT)**.

Guru dapat mengelola kategori dan tugas secara penuh, sementara murid hanya dapat memperbarui status tugas miliknya sendiri.

Saya menggunakan pendekatan Modular dan Layered Architecture karena merupakan pendekatan standar yang direkomendasikan oleh NestJS. Pendekatan ini memisahkan tanggung jawab antara controller, service, dan data access sehingga kode lebih mudah dipahami, diuji, dan dikembangkan tanpa over-engineering.

## Fitur Utama
- **Autentikasi JWT**:
  - Registrasi pengguna baru (`POST /auth/register`)
  - Login dan mendapatkan token (`POST /auth/login`)
- **Manajemen Category** (hanya TEACHER):
  - CRUD lengkap kategori tugas (contoh: Matematika, IPA, Bahasa)
- **Manajemen Task / Tugas**:
  - TEACHER: Full CRUD (buat, baca, update semua field, hapus)
  - STUDENT: Hanya update status tugas (`PATCH /task/:id` – hanya field `status`)
- Role-based Access Control (RBAC) sederhana
- Status tugas: `PENDING`, `IN_PROGRESS`, `COMPLETED`

## Tech Stack
- **Framework**: NestJS (TypeScript)
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (Bearer Token)
- **Validasi**: class-validator + class-transformer
- **Linting & Formatting**: ESLint + Prettier
- **Testing**: Jest (unit & e2e)

## Prasyarat
- Node.js ≥ 18
- npm ≥ 9
- MySQL server 

## Instalasi & Setup
1. Clone repository
   ```bash
   git clone https://github.com/aldencoding/task-management-app-nestjs.git
   cd task-management-app-nestjs

2. Install dependencies
   ```bash
   npm install
   ```

3. Setup environment
   Salin file contoh:
   ```bash
   cp .env.example .env
   ```
   Kemudian isi file `.env` dengan konfigurasi Anda:
   ```
   DATABASE_URL="mysql://user:password@localhost:3306/task_management_db"
   JWT_SECRET=your-very-long-random-secret-key-here
   PORT=3000
   ```

4. Generate Prisma client & migrasi database
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

   (Jika ingin seed data awal: `npx prisma db seed` – jika sudah ada script seed)

5. Jalankan aplikasi (development mode)
   ```bash
   npm run start:dev
   ```

   Server akan berjalan di: `http://localhost:3000`

   (Gunakan `npm run start:prod` untuk production)

## Struktur Folder Utama

```
task-management-app-nestjs/
├── prisma/                 # Schema Prisma & migrasi
├── src/
│   ├── auth/               # Module autentikasi (register, login, guard)
│   ├── tasks/              # Module tugas
│   ├── category/         #   Module kategori
│   ├── users/              # Module user & role
│   ├── common/             # Filter, interceptor, dto, dll
│   └── main.ts
├── test/                   # Tes unit & e2e
├── .env.example
├── nest-cli.json
├── package.json
└── README.md
```

## Endpoint Utama

### Auth
- `POST /auth/register` → Daftar akun baru (username, email, password, role)
- `POST /auth/login`    → Login & dapatkan JWT token

### Categories (hanya TEACHER)
- `GET    /category`
- `POST   /category`
- `PATCH  /category/:id`
- `DELETE /category/:id`

### Tasks
- `GET    /task`               → Daftar tugas 
- `GET    /task/:id`
- `POST   /task`               → Buat tugas (TEACHER)
- `PATCH  /task/:id`           → Update tugas (TEACHER full | STUDENT hanya status)
- `DELETE /task/:id`           → Hapus tugas (TEACHER)

## Dokumentasi API

- Import file **Postman Collection** (jika sudah ada di repo: `Student Task Manager App.postman_collection.json`) ke Postman Anda.
- Atau akses Swagger (jika sudah diaktifkan): `http://localhost:3000/` (setelah `npm run start:dev`)

## Cara Kontribusi

1. Fork repository ini
2. Buat branch baru: `git checkout -b fitur/nama-fitur`
3. Commit perubahan Anda
4. Push ke branch: `git push origin fitur/nama-fitur`
5. Buat Pull Request

## Lisensi

[MIT License](LICENSE) – Bebas digunakan, dimodifikasi, dan didistribusikan.

Dibuat dengan ❤️ oleh [Alden](https://github.com/aldencoding) – Bekasi, 2026
