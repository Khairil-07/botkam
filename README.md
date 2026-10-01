# 🚀 Interactive Profile Card - React Fundamental

Aplikasi web interaktif sederhana yang menampilkan daftar kartu profil tim. Project ini dibuat untuk memenuhi **Tugas Individu Week 4: Interactive Profile Card (React Fundamental)**.

---

## 📌 Fitur Utama

- **Komponen Modular**: Pemisahan struktur komponen yang rapi (`Header.jsx` dan `Card.jsx`).
- **Dinamis dengan Props**: Mengirimkan data profil (nama, profesi, deskripsi) secara dinamis dari komponen induk (`App.jsx`).
- **Interaktif dengan State**: Tombol *Like* interaktif dengan jumlah angka (*counter*) yang berjalan secara independen di setiap kartu.
- **Desain Modern & Responsif**: Tampilan UI dengan gaya kartu modern, efek bayangan, serta tata letak *grid* yang menyesuaikan layar.

---

## 🛠️ Teknologi yang Digunakan

- **React.js** (Vite)
- **JavaScript (ES6+)**
- **CSS-in-JS** (Styling dinamis & efek hover)

---

## 📁 Struktur Folder

```text
my-profile-card/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx    # Komponen header & judul aplikasi
│   │   └── Card.jsx      # Komponen kartu profil interaktif
│   ├── App.jsx           # Induk komponen & pengiriman props
│   └── main.jsx         # Entry point React
├── package.json
└── README.md
