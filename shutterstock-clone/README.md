# Project Name

Deskripsi singkat tentang aplikasi ini, misalnya fungsionalitas utama, teknologi yang digunakan, dan tujuan dari aplikasi ini.

## Persyaratan

Pastikan Anda memiliki persyaratan berikut sebelum menjalankan aplikasi:

-   **Node.js** (versi minimal yang diperlukan, misalnya `v14.x.x` atau lebih baru)
-   **MongoDB** (database yang digunakan)
-   **Next.js**

## Instalasi

1. **Clone repository** ini ke komputer Anda:

    ```bash
    git clone https://github.com/RehanNarwindo/shutterstockclone_RehanNarwindo.git
    ```

2. **Masuk ke direktori proyek**:

    ```bash
    cd project-name
    ```

3. **Instal dependensi** dengan perintah:

    ```bash
    npm install
    ```

4. **Buat file `.env.local`** di root proyek Anda, lalu tambahkan variabel environment berikut:

    ```bash
    MONGGO_DB_URI=your-mongodb-uri
    SECRET_KEY=your-secret-key
    NEXT_PUBLIC_BASE_URL=your-base-url
    ```

    - `MONGGO_DB_URI`: URI untuk koneksi ke database MongoDB.
    - `SECRET_KEY`: Kunci rahasia untuk keperluan autentikasi atau enkripsi.
    - `NEXT_PUBLIC_BASE_URL`: URL base untuk aplikasi Next.js yang digunakan (misalnya `http://localhost:3000`).

5. **Jalankan aplikasi dalam mode development**:

    ```bash
    npm run dev
    ```

    Aplikasi Anda akan berjalan di `http://localhost:3000`.

## Teknologi yang Digunakan

-   **Next.js**: Framework React untuk server-side rendering dan aplikasi web.
-   **MongoDB**: Database NoSQL untuk penyimpanan data.
-   **Tailwind CSS**: Framework utility-first untuk styling cepat dan efisien.

## Fitur

-   **Autentikasi Pengguna**: Fitur login dan registrasi pengguna.
-   **CRUD Data**: Kemampuan untuk menambah, melihat, mengedit, dan menghapus data tertentu.
-   **Responsif**: Desain yang dioptimalkan untuk tampilan di perangkat seluler dan desktop.

## Struktur Proyek

-   `pages/`: Berisi halaman-halaman utama aplikasi.
-   `components/`: Komponen UI reusable di aplikasi.
-   `lib/`: Fungsi helper dan konfigurasi database.

## Cara Berkontribusi

Jika Anda ingin berkontribusi dalam proyek ini:

1. Fork repository ini.
2. Buat branch baru untuk fitur atau perbaikan (`git checkout -b feature-branch`).
3. Commit perubahan (`git commit -m 'Add new feature'`).
4. Push ke branch (`git push origin feature-branch`).
5. Buat pull request di GitHub.
