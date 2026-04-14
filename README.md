# ✨ Check-It: Modern Task Orchestration Platform

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-blueviolet?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **Check-It** adalah platform manajemen tugas (To-Do List) tingkat premium yang dirancang untuk produktivitas tanpa kompromi. Menggabungkan kecepatan Next.js, fleksibilitas MongoDB, dan sistem notifikasi hybrid yang canggih.

---

## 📑 Daftar Isi

- [🚀 Ikhtisar](#-ikhtisar)
- [✨ Fitur Super Lengkap](#-fitur-super-lengkap)
- [🔔 Sistem Notifikasi Hybrid](#-sistem-notifikasi-hybrid)
- [🛠️ Arsitektur Teknologi](#-arsitektur-teknologi)
- [📂 Struktur Proyek](#-struktur-proyek)
- [⚙️ Pengaturan Dasar](#-pengaturan-dasar)
- [📡 Dokumentasi API](#-dokumentasi-api)
- [🏗️ Roadmap Pengembangan](#-roadmap-pengembangan-project-roadmap)

---

## 🚀 Ikhtisar

**Check-It** bukan sekadar list biasa. Ini adalah ekosistem produktivitas yang membantu Anda mengelola kekacauan menjadi keteraturan. Dengan antarmuka yang bersih, animasi mikro yang halus, dan sistem notifikasi yang menjaga Anda tetap di jalur, Check-It memberikan pengalaman pengguna yang belum pernah ada sebelumnya.

---

## ✨ Fitur Super Lengkap & Eksklusif

### 🔐 Autentikasi & Keamanan Dasar
- **Registrasi & Login Terpadu**: Sistem login responsif dengan validasi input yang aman.
- **NextAuth.js Integration**: Menggunakan standar industri untuk manajemen sesi dan token JWT.
- **Bcrypt Password Hashing**: Semua password di-hash dengan aman.
- **Middleware Protected Routes**: Keamanan data tingkat tinggi untuk pengguna.

### 📋 Manajemen Tugas Lanjutan
- **Sistem CRUD Instan**: Performa tinggi dalam pembuatan dan pembaruan tugas.
- **Kategorisasi Cerdas**: Pisahkan antara pekerjaan, urusan pribadi, keuangan, dan kesehatan.
- **Deadline Tracker**: Atur tanggal jatuh tempo dengan visualisasi sisa waktu.
- **Task Analytics**: Ringkasan jumlah tugas (Total, Pending, Completed) otomatis.

---

## 🔔 Sistem Notifikasi Hybrid (Email & Push)

Check-It menghadirkan sistem pengingat yang mumpuni untuk memastikan produktivitas Anda:

- **Otomatisasi Email**: Setiap pembuatan tugas akan memicu pengiriman email ringkasan ke alamat terdaftar menggunakan protokol SMTP.
- **Web Push Notifications**: Notifikasi real-time langsung ke browser menggunakan standar VAPID, meskipun tab aplikasi sedang ditutup.
- **Service Worker Integration**: Menangani push event di latar belakang untuk pengalaman PWA yang mulus.
- **One-Click Subscription**: Sinkronisasi otomatis saat pengguna masuk ke dashboard.

---

## 🛠️ Arsitektur Teknologi

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router) |
| **Database** | MongoDB (Atlas) + Mongoose ODM |
| **Styling** | Tailwind CSS (Utility-first) |
| **Auth** | NextAuth.js |
| **Notifications** | Nodemailer & Web Push API |
| **Animations** | Framer Motion |

---

## ⚙️ Pengaturan Dasar

### 1. Kloning Repositori
```bash
git clone https://github.com/Athallah1234/todolist.git
cd todolist
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)
Lengkapi variabel berikut:
```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=rahasia_anda

# Email Server (SMTP)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=email@example.com
EMAIL_SERVER_PASSWORD=password_aplikasi

# Web Push (VAPID Keys)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key
```

### 4. Menjalankan Aplikasi
```bash
npm run dev
```

---

## 📂 Struktur Proyek (Project Structure)

Berikut adalah hierarki struktur folder dan file pada proyek **Check-It** untuk memudahkan navigasi pengembangan:

```text
.
├── app/                        # 🌐 App Router (Next.js 14+)
│   ├── api/                    # ⚙️ Backend API Handlers
│   │   ├── auth/               # 🔐 Auth API (Register/Login)
│   │   ├── tasks/              # 📋 Tasks CRUD API
│   │   └── subscribe/          # 🔔 Notification Subscription API
│   ├── auth/                   # 🔑 Halaman Autentikasi (UI)
│   │   ├── login/              # 🚪 Halaman Login
│   │   └── register/           # 📝 Halaman Pendaftaran
│   ├── dashboard/              # 🏠 Antarmuka Dashboard Utama
│   │   ├── categories/         # 📁 Filter Berdasarkan Kategori
│   │   ├── deadlines/          # 📅 Filter Berdasarkan Tenggat Waktu
│   │   ├── layout.tsx          # 🖼️ Dashboard Sidebar & Header Layout
│   │   └── page.tsx            # 📊 Main View (Daftar Semua Task)
│   ├── favicon.ico             # アイコン Favicon
│   ├── globals.css             # 🎨 Global Tailwind Styles
│   ├── layout.tsx              # 🏗️ Root Layout & Provider Wrapper
│   └── page.tsx                # 🚀 Entry Point (Landing Page)
├── components/                 # 🧩 Komponen UI Reusable
│   ├── ui/                     # 💎 Komponen Dasar (Button, Input, Card)
│   ├── Header.tsx              # 👤 Komponen Header Dashboard
│   ├── Sidebar.tsx             # navigation Komponen Navigasi Sidebar
│   └── TaskCard.tsx            # 🗃️ Komponen Visualisasi Item Task
├── hooks/                      # ⚓ Custom React Hooks
│   └── useNotifications.ts     # 🔔 Logika Registrasi Notifikasi
├── lib/                        # 📚 Utilitas & Konfigurasi
│   ├── mongodb.ts              # 🔌 Koneksi Database MongoDB
│   ├── notifications.ts        # 📧 SMTP & Web-Push Handlers
│   └── utils.ts                # 🛠️ Helper Functions umum
├── models/                     # 🧱 Data Modeling (Mongoose)
│   ├── Task.ts                 # 📑 Skema Data Tugas
│   └── User.ts                 # 👤 Skema Data Pengguna
├── public/                     # 📁 Aset Statis
│   ├── icons/                  # 🖼️ App Icons (PWA & Notif)
│   └── sw.js                   # 🤖 Service Worker (Push Handler)
├── store/                      # 🧠 State Management (Zustand)
│   └── useTaskStore.ts         # 📦 Global Store untuk Data Task
├── types/                      # 🏷️ TypeScript Definitions
└── .env                        # 🤫 Variabel Lingkungan (Sensitif)
```

---

## 🏗️ Roadmap Pengembangan (Project Roadmap)

Rencana pengembangan **Check-It** dibagi menjadi beberapa fase strategis untuk memastikan kualitas dan fitur yang kompetitif:

### 🌑 Fase 1: Fondasi & Core (Selesai)
- [x] Inisialisasi Project dengan Next.js 14 & TypeScript.
- [x] Integrasi MongoDB & Authentication (NextAuth).
- [x] Fitur Dasar CRUD (Create, Read, Update, Delete) Task.
- [x] Dashboard Filter (All, Pending, Completed).
- [x] Estetika Desain Glassmorphism & Responsivitas Mobile.

### 🌓 Fase 2: Komunikasi & Engagement (Selesai)
- [x] Integrasi Nodemailer untuk Notifikasi Email Otomatis.
- [x] Implementasi Web Push Notification (VAPID Protocol).
- [x] Service Worker untuk pendeteksian push di background.
- [x] Statistik Task di Header Dashboard.

### 🌔 Fase 3: Optimasi & Produktivitas (Sedang Berjalan)
- [ ] **Mode Gelap (Dark Mode)**: Implementasi tema gelap yang menyeluruh dan elegan.
- [ ] **Prioritas Task**: Label prioritas (High, Medium, Low) dengan indikator warna.
- [ ] **Drag-and-Drop**: Pengaturan urutan task secara visual dengan antarmuka seret-lepas.
- [ ] **Search Engine**: Pencarian teks penuh (full-text search) untuk ribuan task.

### 🌕 Fase 4: Ekosistem & Integrasi (Masa Depan)
- [ ] **Calendar View**: Visualisasi deadline dalam format kalender interaktif.
- [ ] **Export Data**: Fitur ekspor daftar tugas ke format PDF atau CSV.
- [ ] **Integrasi Kalender**: Sinkronisasi otomatis dengan Google Calendar & Outlook.
- [ ] **Multi-User Collaboration**: Berbagi daftar tugas antar rekan kerja (Team Work).

---

<p align="center">
  Dibuat dengan ❤️ oleh <b>Athallah1234</b> & <b>Antigravity AI</b>
</p>
