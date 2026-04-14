# ✨ Check-It: Modern Task Orchestration Platform

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-blueviolet?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **Check-It** adalah platform manajemen tugas (To-Do List) tingkat premium yang dirancang untuk produktivitas tanpa kompromi. Menggabungkan kecepatan Next.js, fleksibilitas MongoDB, dan estetika desain modern yang memukau.

---

## 📑 Daftar Isi

- [🚀 Ikhtisar](#-ikhtisar)
- [✨ Fitur Utama](#-fitur-utama)
- [🛠️ Arsitektur Teknologi](#-arsitektur-teknologi)
- [📂 Struktur Proyek](#-struktur-proyek)
- [⚙️ Pengaturan Dasar](#-pengaturan-dasar)
  - [Prasyarat](#prasyarat)
  - [Instalasi](#instalasi)
  - [Variabel Lingkungan](#variabel-lingkungan)
- [🖥️ Penggunaan](#%EF%B8%8F-penggunaan)
- [📡 Dokumentasi API](#-dokumentasi-api)
  - [Autentikasi](#autentikasi)
  - [Tugas (Tasks)](#tugas-tasks)
- [🎨 Desain & Estetika](#-desain--estetika)
- [🏗️ Rencana Pengembangan (Roadmap)](#%EF%B8%8F-rencana-pengembangan-roadmap)
- [🤝 Kontribusi](#-kontribusi)
- [📄 Lisensi](#-lisensi)

---

## 🚀 Ikhtisar

**Check-It** bukan sekadar list biasa. Ini adalah ekosistem produktivitas yang membantu Anda mengelola kekacauan menjadi keteraturan. Dengan antarmuka yang bersih, animasi mikro yang halus, dan performa yang responsif, Check-It memberikan pengalaman pengguna yang belum pernah ada sebelumnya dalam aplikasi pengelolaan tugas.

---

## ✨ Fitur Utama

### 🔐 Autentikasi Keamanan Tinggi
- **Registrasi & Login**: Sistem aman menggunakan NextAuth.js.
- **Enkripsi Password**: Menggunakan `bcryptjs` untuk perlindungan data maksimal.
- **Proteksi Route**: Middleware yang memastikan data Anda hanya milik Anda.

### 📋 Manajemen Tugas Lanjutan
- **CRUD Operasional**: Buat, baca, perbarui, dan hapus tugas dengan instan.
- **Kategorisasi Cerdas**: Pisahkan antara pekerjaan, urusan pribadi, keuangan, dan kesehatan.
- **Deadline Tracker**: Atur tanggal jatuh tempo untuk memastikan tidak ada yang terlewat.
- **Status Toggle**: Tandai tugas sebagai selesai dengan satu klik dan animasi visual.

### 📊 Dashboard Analitik
- **Statistik Real-time**: Pantau jumlah tugas total, tertunda, dan selesai.
- **Sistem Filter**: Filter instan berdasarkan status tugas.
- **Pencarian Cepat**: Temukan tugas apa pun hanya dengan mengetik judulnya.

### 📱 Desain Responsif & Premium
- **Glassmorphism**: Aksen modern dengan efek blur dan gradien.
- **Mobile First**: Pengalaman mulus di perangkat seluler maupun desktop.
- **Framer Motion**: Transisi halaman dan komponen yang memanjakan mata.

---

## 🛠️ Arsitektur Teknologi

Aplikasi ini dibangun di atas tumpukan teknologi paling mutakhir di industri:

| Teknologi | Peran |
| :--- | :--- |
| **Next.js 14+** | Framework utama (App Router) |
| **MongoDB** | Database NoSQL yang skalabel |
| **Mongoose** | ODM (Object Data Modeling) untuk MongoDB |
| **Tailwind CSS** | Styling utility-first untuk desain premium |
| **Zustand** | Manajemen state yang ringan dan skalabel |
| **NextAuth.js** | Protokol autentikasi dan otorisasi |
| **Zod** | Validasi skema data dan tipe |
| **React Hook Form** | Pengelolaan form yang efisien |
| **Framer Motion** | Engine animasi tingkat lanjut |

---

## 📂 Struktur Proyek

```text
├── app/                  # Route, Layout, dan API Handlers (App Router)
│   ├── api/              # API Endpoints (Auth, Tasks)
│   ├── auth/             # Halaman Register & Login
│   ├── dashboard/        # Antarmuka utama aplikasi
│   └── layout.tsx        # Root layout & providers
├── components/           # Komponen UI Reusable (Navbar, Sidebar, Modal, dll)
├── lib/                  # Utilitas, Helper, dan Konfigurasi DB
├── models/               # Definisi Skema Mongoose (User, Task)
├── store/                # Store Zustand untuk state global
├── types/                # Definisi TypeScript Interfaces
├── public/               # Aset statis (Gambar, Icon)
└── styles/               # File CSS Global
```

---

## ⚙️ Pengaturan Dasar

### Prasyarat
- Node.js versi 18.x atau lebih tinggi.
- Akun MongoDB Atlas atau database MongoDB lokal.
- NPM atau Yarn sebagai package manager.

### Instalasi

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/username/check-it.git
   cd check-it
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Salin environment variables:**
   ```bash
   cp .env.example .env
   ```

### Variabel Lingkungan
Isi variabel berikut di file `.env` Anda:

```env
MONGODB_URI=link_koneksi_mongodb_anda
NEXTAUTH_SECRET=rahasia_acak_minimal_32_karakter
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=rahasia_jwt_anda
```

---

## 🖥️ Penggunaan

1. **Menjalankan mode pengembangan:**
   ```bash
   npm run dev
   ```
2. **Buka browser Anda:**
   Akses `http://localhost:3000`
3. **Mulai Produktivitas:**
   Daftar akun baru, mulailah membuat tugas pertama Anda, dan rasakan betapa lancarnya alur kerja Anda.

---

## 📡 Dokumentasi API

Check-It menyediakan endpoint API internal yang aman:

### Autentikasi
- `POST /api/auth/register` : Mendaftarkan pengguna baru.
- `POST /api/auth/login` : Masuk ke akun yang ada (handled by NextAuth).

### Tugas (Tasks)
- `GET /api/tasks` : Mengambil semua tugas milik user yang sedang aktif.
- `POST /api/tasks` : Membuat tugas baru.
- `PUT /api/tasks/:id` : Memperbarui tugas berdasarkan ID.
- `DELETE /api/tasks/:id` : Menghapus tugas berdasarkan ID.

---

## 🎨 Desain & Estetika

Kami percaya bahwa alat kerja yang indah meningkatkan semangat kerja.
- **Warna**: Menggunakan palet `Slate` dengan aksen `Indigo` dan `Purple` untuk kesan profesional namun segar.
- **Tipografi**: Menggunakan kombinasi font **Inter** (untuk keterbacaan) dan **Outfit** (untuk headline yang modern).
- **Interaksi**: Efek hover pada tombol dan card menggunakan skala halus `scale-105` dan transisi transparan.

---

## 🏗️ Rencana Pengembangan (Roadmap)

- [ ] Integrasi Notifikasi Email & Push Notification.
- [ ] Fitur Prioritas Tugas (Low, Medium, High).
- [ ] Mode Gelap (Dark Mode) yang lebih mendalam.
- [ ] Berbagi Tugas (Task Sharing) antar pengguna.
- [ ] Integrasi Kalender eksternal (Google/Apple Calendar).

---

## 🤝 Kontribusi

Kontribusi adalah apa yang membuat komunitas open source menjadi tempat yang luar biasa untuk belajar, menginspirasi, dan berkreasi. Setiap kontribusi yang Anda berikan **sangat dihargai**.

1. Fork Proyek ini.
2. Buat Feature Branch (`git checkout -b feature/FiturLuarBiasa`).
3. Commit Perubahan Anda (`git commit -m 'Add beberapa FiturLuarBiasa'`).
4. Push ke Branch (`git push origin feature/FiturLuarBiasa`).
5. Buka Pull Request.

---

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

---

<p align="center">
  Dibuat dengan ❤️ oleh Antigravity AI
</p>
