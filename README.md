# 📱 DompetKu - Smart Daily Expense & Budgeting Mobile App

Aplikasi pencatatan keuangan dan manajemen anggaran harian cerdas lintas platform (_cross-platform mobile application_) yang dibangun menggunakan **React Native** dengan ekosistem **Expo** dan **JavaScript standar (.js)**.

Proyek ini dirancang secara modular, responsif, stabil, dan ramah pengguna untuk memenuhi seluruh spesifikasi teknis **Ujian Tengah Semester (UTS) Mata Kuliah Aplikasi Berbasis Platform**.

---

## 🌟 1. Deskripsi Singkat Aplikasi & Fitur Utama

### A. Deskripsi Singkat

- **Nama Aplikasi**: **DompetKu** (_Smart Financial & Daily Budgeting App_)
- **Latar Belakang**: Banyak kalangan mahasiswa, _freelancer_, dan pekerja muda mengalami kesulitan dalam melacak arus kas harian serta mengendalikan pengeluaran impulsif. DompetKu hadir sebagai solusi pencatatan finansial yang ringkas, modern, dan nyaman di mata dengan palet warna hangat (_warm plum palette_).
- **Tujuan Aplikasi**: Membantu pengguna memonitor pemasukan, mengendalikan pengeluaran harian, mengamankan alokasi pos tabungan dan dana darurat, menerima peringatan saldo otomatis, serta melihat rekapitulasi kesehatan finansial secara visual dan _real-time_.
- **Target Pengguna**: Mahasiswa, pekerja lepas (_freelancer_), dan individu yang menginginkan tata kelola keuangan pribadi yang disiplin, aman, dan terstruktur.

### B. Fitur-Fitur Utama (Hasil Revisi Lengkap)

1. **Pusat Notifikasi Aktif & Deteksi Peringatan Saldo Otomatis**:
   - Sistem cerdas yang secara otomatis mendeteksi kondisi keuangan pengguna:
     - **Peringatan Saldo Kritis / Defisit**: Terpicu jika total saldo $\le 0$ atau pengeluaran melebihi pemasukan.
     - **Peringatan Saldo Menipis**: Terpicu jika saldo berada di bawah batas aman (Rp 2.000.000).
     - **Peringatan Rasio Pengeluaran Tinggi**: Mengingatkan saat pengeluaran telah mencapai $\ge 75\%$ dari total pemasukan.
     - **Tips Finansial & Pengingat Pos Tabungan Darurat**.
   - Dilengkapi status baca (_unread/read_), counter badge pada ikon lonceng di header, tombol **"Tandai Sudah Dibaca"** per notifikasi, tombol **"Baca Semua"**, serta tombol **"Bersihkan"** dengan konfirmasi dialog.
2. **Profil Pengguna Interaktif & Dapat Diedit (_Editable Profile_)**:
   - Pengguna dapat mengubah nama lengkap, email, nomor handphone, dan profesi melalui modal formulir edit profil.
   - Perubahan nama langsung memperbarui sapaan (_greeting_) di layar beranda (_"Hai, [Nama]"_) dan kartu profil secara instan (_Single Source of Truth_).
   - Pembersihan bagian yang tidak relevan: fitur ekspor PDF dan kartu statis info pengembang/aplikasi telah dihapus.
3. **Perluasan Kategori Pengeluaran & Pemasukan**:
   - Menambahkan kategori pengeluaran esensial baru: **Pendidikan**, **Tagihan & Internet**, **Kesehatan**, dan **Kebutuhan Rumah**, tanpa menghapus kategori lama (_Simpanan, Tabungan Darurat, Jajan, Investasi, Gaji, Belanja, Transportasi, Lainnya_).
   - Seluruh kategori baru memiliki ikon vektor legal yang representatif dan terintegrasi pada grafik rekapitulasi.
4. **Ringkasan Saldo Real-Time & Quick Categories**:
   - Perhitungan otomatis instan untuk **Saldo Total (Balance)**, **Total Pemasukan (Total Income)**, dan **Total Pengeluaran (Total Expense)**.
   - 4 kartu kategori unggulan (Simpanan, Tabungan Darurat berlatar _highlight plum_, Jajan, dan Investasi) dengan nominal teragregasi.
5. **Filter Transaksi Cepat**:
   - Menyaring riwayat transaksi secara langsung berdasarkan tab chip: **Semua**, **Pemasukan**, dan **Pengeluaran**.
6. **Pencatatan Transaksi Baru (_Add Transaction Modal_)**:
   - Formulir modal dengan validasi input ketat (judul tidak boleh kosong, nominal angka $> 0$), seleksi kategori via chips, kalender tanggal otomatis, dan catatan rincian.
7. **Detail & Manajemen Transaksi Lengkap (_Full CRUD_)**:
   - Halaman detail transaksi berbasis parameter ID (`transactionId`), mendukung fitur pengeditan data secara langsung (_inline form edit_) dan penghapusan data dengan konfirmasi dialog aman.
8. **Analisis Keuangan & Visualisasi Donut Ring**:
   - Layar analisis komprehensif memuat kartu status surplus/defisit bersih, visual Donut Ring Chart alokasi anggaran, progress bar persentase, serta rincian nominal per pos pengeluaran maupun pemasukan.
9. **Reset Data Bawaan (_Mock Initial Data_)**:
   - Opsi di menu profil untuk mengembalikan seluruh transaksi ke data contoh awal (_initialTransactions_) guna pengujian aplikasi.

---

## 📂 2. Struktur Folder Proyek

Proyek disusun dengan arsitektur modular dan rapi sesuai _best practices_ pengembangan React Native:

```
dompetku/ (sikday/)
├── App.js                         # Root entry point: Provider Wrapper (Navigation, SafeArea, State)
├── app.json                       # Konfigurasi metadata aplikasi Expo
├── package.json                   # Daftar pustaka dependensi & script runner
├── babel.config.js                # Babel preset untuk ekosistem Expo
├── README.md                      # Dokumentasi komprehensif proyek
├── Laporan_UTS_DompetKu.docx      # Draf laporan formal Word UTS Aplikasi Berbasis Platform
├── assets/                        # Aset grafis resmi aplikasi
│   ├── adaptive-icon.png          # Ikon adaptif Android
│   ├── icon.png                   # Ikon aplikasi utama
│   ├── splash.png                 # Splash screen bertema #450920
│   └── favicon.png                # Favicon web
└── src/
    ├── constants/
    │   ├── colors.js              # Palet warna resmi (#450920, #A53860, #DA627D, #FFA5AB, #F9DBBD)
    │   └── categories.js          # Daftar 12 kategori transaksi lengkap & mapping ikon legal
    ├── data/
    │   └── initialTransactions.js # Data lokal awal (Mock data transaksi harian)
    ├── context/
    │   └── TransactionContext.js  # State Management global (CRUD transaksi, kalkulasi, profil, notifikasi)
    ├── components/
    │   ├── Header.js              # Header konsisten dengan lonceng notifikasi & counter badge
    │   ├── BalanceCard.js         # Kartu informasi saldo & pengeluaran
    │   ├── CategoryCard.js        # Kartu kategori modular
    │   ├── TransactionItem.js     # Komponen baris item transaksi pada daftar
    │   └── CategoryChart.js       # Komponen visualisasi Donut Ring & Progress Alokasi
    ├── navigation/
    │   ├── RootNavigator.js       # Stack Navigator utama (MainTabs, Add, Detail, Notif, Onboarding)
    │   └── BottomTabNavigator.js  # Bottom Tab Bar dengan tombol (+) menonjol berlatar #450920
    └── screens/
        ├── TransactionsScreen.js  # [Tab 1] Beranda transaksi, ringkasan saldo, filter, & list
        ├── SummaryScreen.js       # [Tab 2] Rekapitulasi keuangan & rincian nominal per pos
        ├── ProfileScreen.js       # [Tab 3] Profil pengguna editable, preferensi, & reset data
        ├── NotificationScreen.js  # [Stack] Pusat notifikasi cerdas & peringatan saldo kritis
        ├── AddTransactionScreen.js     # [Stack Modal] Form pencatatan transaksi baru
        ├── TransactionDetailScreen.js  # [Stack] Rincian detail transaksi, inline form edit, & fitur hapus
        └── OnboardingScreen.js         # [Stack] Layar pembuka / perkenalan interaktif
```

---

## 🧭 3. Daftar 7 Screen Aktif & Arsitektur Navigasi

Aplikasi mengintegrasikan kombinasi **Bottom Tab Navigation** (menu navigasi di bawah layar) dan **Stack Navigation** (layar tumpukan bertingkat dan modal formulir).

```
RootStackNavigator (Stack Navigation)
│
├── [MainTabs] (Bottom Tab Navigator - Berlatar #450920)
│   │
│   ├── [Tab 1] TransactionsScreen
│   │   └── Menampilkan ringkasan saldo/pemasukan/pengeluaran, banner panduan,
│   │       filter (Semua, Pemasukan, Pengeluaran), kartu 4 kategori utama,
│   │       daftar transaksi, serta header dengan lonceng notifikasi aktif.
│   │
│   ├── [Tab 2] SummaryScreen
│   │   └── Menampilkan rekapitulasi total pemasukan vs pengeluaran, indikator
│   │       surplus/defisit, Donut Ring Chart alokasi anggaran, dan rincian nominal per pos.
│   │
│   ├── [Center Action] AddPlaceholderTab
│   │   └── Slot tombol lingkaran (+) menonjol (#DA627D) yang membuka
│   │       AddTransactionScreen via Stack modal.
│   │
│   └── [Tab 3] ProfileScreen
│       └── Menampilkan profil pengguna dengan tombol "Edit Profil", statistik keuangan,
│           menu preferensi (akses cepat pusat notifikasi, pengingat), dan tombol "Reset Data".
│
├── [Stack Screen] AddTransactionScreen
│   └── Formulir pencatatan transaksi baru (input nominal IDR, judul, toggle jenis,
│       12 chip kategori lengkap, tanggal, dan catatan) dengan validasi data.
│
├── [Stack Screen] TransactionDetailScreen
│   └── Layar detail berbasis parameter `transactionId`. Mendukung pengubahan data (Edit)
│       secara inline dan penghapusan transaksi (Delete) dengan konfirmasi dialog.
│
├── [Stack Screen] NotificationScreen
│   └── Pusat notifikasi aktif yang menyajikan deteksi otomatis saldo menipis/defisit,
│       filter belum dibaca, tombol tandai dibaca per item, baca semua, dan bersihkan.
│
└── [Stack Screen] OnboardingScreen
    └── Layar pengantar ilustratif dengan tombol Call-To-Action ("YUK ATUR KEUANGAN" & "LEWATI").
```

---

## 🎨 4. Palet Warna Resmi (Color Palette)

Aplikasi mengadaptasi palet warna khusus sesuai spesifikasi desain antarmuka _mobile finance app_ yang harmonis dan memiliki rasio kontras teks tinggi:

**Tautan Palet Coolors**: [https://coolors.co/palette/f9dbbd-ffa5ab-da627d-a53860-450920](https://coolors.co/palette/f9dbbd-ffa5ab-da627d-a53860-450920)

|  Kode Warna   | Nama Nuansa           | Peran dalam Antarmuka DompetKu                                                                                                                             |
| :-----------: | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`#450920`** | Deep Plum / Dark Wine | **Header gelap**, bilah navigasi bawah (**Bottom Bar**), kartu sorotan Tabungan Darurat, serta teks judul utama di atas kartu putih.                       |
| **`#A53860`** | Magenta Rose          | **Aksen penegas**, label kategori aktif, elemen sekunder, sub-judul (_subtitle_), dan tombol aksi _Reset Data_.                                            |
| **`#DA627D`** | Blush Coral           | **Tombol aksi utama (CTA)**, **tombol lingkaran `(+)` yang menonjol di tengah bottom bar**, tombol Edit, badge notifikasi baru, dan indikator pengeluaran. |
| **`#FFA5AB`** | Pastel Pink           | **Aksen pendukung**, badge kategori, label saldo di header gelap, garis _divider_, dan border aksen avatar profil.                                         |
| **`#F9DBBD`** | Peach Cream           | **Latar belakang area konten utama di bawah header**, dipadukan secara kontras dengan kartu-kartu putih membulat.                                          |
| **`#FFFFFF`** | Neutral White         | **Kartu putih sudut membulat (#FFFFFF)** untuk wadah kartu ringkasan, baris transaksi, formulir input, dan modal pop-up.                                   |

File konfigurasi warna terpusat di: [`src/constants/colors.js`](file:///Users/ikapramesti/Downloads/sikday/src/constants/colors.js).

---

## 🛠️ 5. Daftar Library & Sumber Aset Legal

Seluruh dependensi dan aset visual yang digunakan pada aplikasi DompetKu merupakan sumber **100% legal, _open-source_, dan bebas lisensi bermasalah**:

| Library / Aset                     | Sumber & Lisensi                   | Kegunaan dalam Proyek                                                               |
| :--------------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------- |
| **React Native**                   | Meta Platforms, Inc. (MIT License) | Framework utama pengembangan aplikasi mobile lintas platform.                       |
| **Expo SDK**                       | Expo Community (MIT License)       | Ekosistem toolchain, bundling, dan runtime aplikasi mobile.                         |
| **@react-navigation/native**       | React Navigation (MIT License)     | Inti manajemen navigasi dan perpindahan layar.                                      |
| **@react-navigation/bottom-tabs**  | React Navigation (MIT License)     | Navigasi menu utama di bagian bawah layar (_Bottom Tab Bar_).                       |
| **@react-navigation/native-stack** | React Navigation (MIT License)     | Navigasi tumpukan (_Stack_) untuk alur detail, notifikasi, dan modal.               |
| **react-native-screens**           | Software Mansion (MIT License)     | Optimasi performa memori native layar navigasi.                                     |
| **react-native-safe-area-context** | Software Mansion (MIT License)     | Penanganan area aman lekukan layar (_notch_ / _status bar_).                        |
| **@expo/vector-icons**             | Expo (MIT License)                 | Ikon legal bawaan ekosistem Expo (_Feather_, _MaterialCommunityIcons_, _Ionicons_). |
| **Tipografi Sistem**               | Apple & Google                     | Menggunakan _System Font_ bawaan (San Francisco pada iOS, Roboto pada Android).     |

---

## 🚀 6. Panduan Menjalankan Aplikasi

### A. Prasyarat Sistem

- **Node.js** versi 18.x atau 20+ ke atas telah terpasang.
- Manajer paket **npm** bawaan Node.js.
- Aplikasi **Expo Go** pada perangkat fisik Android/iOS, atau Android Studio / Xcode Emulator.

### B. Langkah Instalasi & Menjalankan Proyek

1. Buka terminal dan masuk ke direktori proyek:

   ```bash
   cd /path/to/sikday
   ```

2. Pasang seluruh dependensi proyek:

   ```bash
   npm install
   ```

3. Jalankan server pengembang Expo:

   ```bash
   npm start
   # atau
   npx expo start
   ```

4. Menjalankan di perangkat:
   - **Perangkat Fisik**: Buka aplikasi **Expo Go**, lalu scan QR code yang muncul di terminal (Android) atau via Camera App (iOS).
   - **Android Emulator**: Tekan tombol `a` pada keyboard di terminal.
   - **iOS Simulator**: Tekan tombol `i` pada keyboard di terminal.
   - **Web Browser**: Tekan tombol `w` pada keyboard di terminal.
