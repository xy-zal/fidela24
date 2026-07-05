# Selamat Ulang Tahun, Fidela 🎇

Website statis (HTML/CSS/JS murni, tanpa framework) untuk ucapan ulang tahun
ke-24 Fidela. Bisa langsung dihosting gratis di GitHub Pages, tidak butuh
backend/server.

## Fitur

- Gift box / scratch card sebagai halaman pembuka
- Hero dengan kembang api animasi, termasuk momen "24" yang terbentuk dari
  partikel kembang api
- Stories ala Instagram (thumbnail lingkaran → fullscreen slideshow,
  auto-advance, swipe, tap kanan/kiri)
- Backsound otomatis setelah interaksi pertama + tombol mute mengambang
- Custom cursor & trail di desktop
- Surprise reveal di bagian akhir yang terkunci sampai discroll,
  dengan kembang api & confetti "encore"
- Tombol "bagikan momen ini" (screenshot otomatis + share ke WhatsApp/dll)

## Cara menambahkan konten kamu

1. **Foto** — taruh foto di `assets/img/` dengan nama `foto1.jpg`,
   `foto2.jpg`, dst. Lihat `assets/img/BACA-INI.txt` untuk detail.
   Sebelum foto ditambahkan, situs otomatis menampilkan gambar placeholder
   supaya tetap terlihat rapi.
2. **Musik** — taruh file di `assets/audio/backsound.mp3`. Lihat
   `assets/audio/BACA-INI.txt` untuk detail & tips kompresi.
3. **Teks pesan penutup** — edit langsung di `index.html`, cari komentar
   `GANTI TEKS INI SESUAI KEINGINAN` di bagian `#reveal-message`.
4. **Nama / usia** — edit `CONFIG` di baris paling atas `script.js`
   (`name` dan `age`). Angka `age` juga otomatis dipakai untuk animasi
   kembang api "24".

## Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub (public), misalnya bernama
   `ulang-tahun-fidela`.
2. Upload semua isi folder ini ke repo tersebut. Bisa lewat web GitHub
   (drag & drop semua file/folder) atau lewat terminal:

   ```bash
   git init
   git add .
   git commit -m "Website ulang tahun Fidela"
   git branch -M main
   git remote add origin https://github.com/USERNAME/ulang-tahun-fidela.git
   git push -u origin main
   ```

3. Di repo GitHub, buka **Settings → Pages**.
4. Di bagian **Build and deployment**, pilih source **Deploy from a branch**,
   branch `main`, folder `/ (root)`, lalu **Save**.
5. Tunggu 1-2 menit, GitHub akan memberi link seperti:
   `https://USERNAME.github.io/ulang-tahun-fidela/`
6. Buka link itu untuk memastikan semua berjalan (foto, musik, kembang api),
   baru dibagikan ke Fidela 🎉

## Catatan teknis

- **Autoplay musik**: browser modern memblokir autoplay bersuara sebelum ada
  interaksi user. Karena gift box/scratch card butuh sentuhan dulu, musik
  otomatis mulai tepat setelah kotak "dibuka" — jadi terasa seperti autoplay
  dari sudut pandang pengunjung.
- **Tombol share**: menggunakan Web Share API, hanya berjalan penuh di HTTPS
  (GitHub Pages sudah otomatis HTTPS) dan browser yang mendukung (kebanyakan
  browser mobile). Di browser yang tidak mendukung, otomatis fallback ke
  tombol download gambar.
- **Reduced motion**: pengunjung yang mengaktifkan "prefers-reduced-motion"
  di sistemnya akan mendapat versi dengan animasi lebih minim secara
  otomatis.

Selamat merayakan, semoga Fidela suka! 🤍
