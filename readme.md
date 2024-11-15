# PCademy

## Proyek
PCademy adalah sebuah website interaktif yang dirancang untuk pembelajaran pengenalan komputasi. Proyek ini dikembangkan sebagai bagian dari tugas mata kuliah PAWM II3140.

### Informasi Pengembang
- **Nama:** David Dewanto
- **NIM:** 18222027
- **Mata Kuliah:** PAWM II3140

### Website Deployment
Akses Website di https://uts-david-dewanto.vercel.app

## Struktur Proyek
```
UTS-David-Dewanto-FrontEnd
├── about.html
├── contact-us.html
├── index.html
├── account/
│   ├── account-dashboard.html
│   ├── login.html
│   ├── register.html
│   └── exercise/
│       ├── module1.html
│       ├── module2.html
│       ├── module3.html
│       └── module4.html
├── assets/
│   ├── arrow.svg
│   ├── features-hand.svg
│   ├── features-money.svg
│   ├── features-speedometer.svg
│   ├── google_icon.svg
│   └── logo.svg
├── css/
│   ├── accountDashboard/
│   │   ├── accountDashboard.css
│   │   ├── login.css
│   │   └── register.css
│   ├── exercise/
│   │   └── exercise.css
│   ├── homePage/
│   │   └── homePage.css
│   └── reusable/
│       ├── footer.css
│       ├── header.css
│       ├── main.css
│       └── others.css
└── scripts/
    ├── accountDashboard.js
    ├── exercise1.js
    ├── exercise2.js
    ├── exercise3.js
    ├── exercise4.js
    ├── homePage.js
    ├── main.js
    ├── register.js
    └── url.js
```

## Teknologi yang Digunakan
- HTML5
- CSS3
- JavaScript
- Vercel (untuk deployment)

## Fitur-Fitur
- Modul pembelajaran interaktif
- Sistem autentikasi pengguna
- Modul latihan (tersedia 4 modul)
- Desain responsif
- Dashboard pengguna
- Formulir kontak

## Memulai Proyek

### Prasyarat
- Browser web modern
- Node.js (untuk pengembangan)

### Instalasi
1. Clone repositori
   ```bash
   git clone [repository-url]
   ```
2. Masuk ke direktori proyek
   ```bash
   cd UTS-David-Dewanto-FrontEnd
   ```
3. Instal dependensi
   ```bash
   npm install
   ```

### Menjalankan Proyek
1. Buka `index.html` di browser web Anda untuk melihat proyek secara lokal
2. Untuk pengembangan dengan live reload, gunakan:
   ```bash
   npm start
   ```

## Komponen Proyek

### Halaman-Halaman
- **Beranda** (`index.html`): Halaman utama
- **Tentang** (`about.html`): Informasi tentang PCademy
- **Kontak** (`contact-us.html`): Formulir kontak dan informasi
- **Halaman Akun**:
  - Login (`account/login.html`)
  - Registrasi (`account/register.html`)
  - Dashboard (`account/account-dashboard.html`)
- **Modul Latihan**:
  - Modul 1-4 (`account/exercise/module1-4.html`)

### Pengaturan Tampilan
- Struktur CSS modular dengan file terpisah untuk komponen berbeda
- Komponen yang dapat digunakan ulang di `css/reusable/`
- Implementasi desain responsif

### Skrip
- File JavaScript modular untuk fungsi yang berbeda
- Skrip khusus untuk setiap modul latihan
- Utilitas utama di `main.js`
- Penanganan URL di `url.js`

## Deployment
Proyek ini dikonfigurasi untuk deployment di Vercel dengan file konfigurasi `vercel.json` yang disertakan.

## Informasi Tambahan
Untuk dokumentasi lengkap dan detail proyek, silakan lihat laporan lengkap yang tersedia di Edunex.

## Kontribusi
Ini adalah proyek akademik dan tidak terbuka untuk kontribusi.

## Lisensi
Proyek ini dibuat untuk tujuan akademik. Hak cipta dilindungi.

---

*Catatan: README ini merupakan bagian dari tugas mata kuliah PAWM II3140 dan mencakup informasi dasar tentang proyek PCademy. Untuk informasi lebih detail, silakan merujuk ke dokumentasi lengkap di Edunex.*
