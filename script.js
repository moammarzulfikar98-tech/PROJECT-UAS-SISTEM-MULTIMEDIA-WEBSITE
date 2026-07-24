/* ============================================
   PLN MOBILE INTERACTIVE LEARNING — SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading Screen ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('hidden'), 500);
  });
  // fallback in case load event already fired
  setTimeout(() => loadingScreen.classList.add('hidden'), 2200);

  /* ---------- AOS Init ---------- */
  if (window.AOS) AOS.init({ duration: 700, once: true, offset: 60 });

  /* ---------- Navbar scroll state + active link + progress bar ---------- */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');
  const backToTop = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('main section[id], footer');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 20);
    backToTop.classList.toggle('show', scrollY > 600);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollY / docHeight) * 100 : 0) + '%';

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Mobile nav burger ---------- */
  const navBurger = document.getElementById('nav-burger');
  const navLinksWrap = document.getElementById('nav-links');
  navBurger.addEventListener('click', () => navLinksWrap.classList.toggle('open'));
  navLinksWrap.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksWrap.classList.remove('open')));

  /* ---------- Dark mode ---------- */
  const darkToggle = document.getElementById('dark-toggle');
  const root = document.documentElement;
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    darkToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
  setTheme('light');
  darkToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  /* ---------- Hero canvas electric animation ---------- */
  const canvas = document.getElementById('electric-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  function resizeCanvas() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  function initParticles() {
    particles = [];
    const count = Math.floor((w * h) / 18000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6
      });
    }
  }
  function animateCanvas() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,209,0,0.55)';
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateCanvas);
  }
  resizeCanvas(); initParticles(); animateCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  /* ---------- GSAP hero entrance ---------- */
  if (window.gsap) {
    gsap.from('.hero-content > *', { y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
  }

  /* ================= FEATURE MODAL ================= */
  const featureData = {
    token: {
      icon: 'fa-coins', title: 'Pembelian Token Listrik',
      desc: 'Beli token listrik prabayar langsung dari aplikasi, tanpa perlu antre ke loket atau minimarket.',
      list: ['Masukkan nomor meter pelanggan', 'Pilih nominal token yang diinginkan', 'Bayar melalui e-wallet/transfer/kartu', 'Token 20 digit otomatis masuk ke meteran']
    },
    tagihan: {
      icon: 'fa-file-invoice-dollar', title: 'Pembayaran Tagihan',
      desc: 'Bayar tagihan listrik pascabayar bulanan secara praktis dan tercatat rapi riwayatnya.',
      list: ['Masukkan ID Pelanggan', 'Cek rincian tagihan bulan berjalan', 'Pilih metode pembayaran', 'Dapatkan struk digital sebagai bukti bayar']
    },
    gangguan: {
      icon: 'fa-triangle-exclamation', title: 'Pelaporan Gangguan',
      desc: 'Laporkan gangguan kelistrikan di sekitar Anda agar petugas PLN dapat segera menindaklanjuti.',
      list: ['Isi data diri & lokasi gangguan', 'Pilih jenis gangguan yang dialami', 'Lampirkan foto sebagai bukti', 'Pantau status penanganan secara real-time']
    },
    pasangbaru: {
      icon: 'fa-plug-circle-bolt', title: 'Permohonan Pasang Baru',
      desc: 'Ajukan pemasangan sambungan listrik baru untuk rumah atau bangunan tanpa datang ke kantor PLN.',
      list: ['Isi formulir data pemohon', 'Tentukan daya yang diinginkan', 'Unggah dokumen pendukung', 'Terima estimasi biaya & jadwal survei']
    },
    tambahdaya: {
      icon: 'fa-gauge-high', title: 'Tambah Daya',
      desc: 'Naikkan kapasitas daya listrik rumah agar sesuai dengan kebutuhan penggunaan yang meningkat.',
      list: ['Pilih daya baru yang diinginkan', 'Lihat estimasi biaya penyambungan', 'Ajukan permohonan secara online', 'Petugas PLN menjadwalkan pemasangan']
    },
    monitoring: {
      icon: 'fa-magnifying-glass-chart', title: 'Monitoring Status Pengaduan',
      desc: 'Pantau perkembangan laporan gangguan maupun permohonan layanan yang telah Anda ajukan.',
      list: ['Masukkan nomor tiket laporan', 'Lihat status: diterima, diproses, selesai', 'Dapatkan notifikasi setiap perubahan status', 'Beri penilaian setelah laporan selesai']
    }
  };

  const featureModalOverlay = document.getElementById('feature-modal-overlay');
  const featureModalBody = document.getElementById('feature-modal-body');
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = featureData[card.dataset.feature];
      if (!data) return;
      featureModalBody.innerHTML = `
        <div class="modal-icon"><i class="fa-solid ${data.icon}"></i></div>
        <h3>${data.title}</h3>
        <p>${data.desc}</p>
        <ul>${data.list.map(li => `<li><i class="fa-solid fa-circle-check"></i><span>${li}</span></li>`).join('')}</ul>
      `;
      featureModalOverlay.classList.add('active');
    });
  });
  document.getElementById('feature-modal-close').addEventListener('click', () => featureModalOverlay.classList.remove('active'));
  featureModalOverlay.addEventListener('click', (e) => { if (e.target === featureModalOverlay) featureModalOverlay.classList.remove('active'); });

  /* ================= TOAST ================= */
  window.showToast = function (msg, icon = 'fa-circle-check') {
    const toast = document.getElementById('toast');
    const item = document.createElement('div');
    item.className = 'toast-item';
    item.innerHTML = `<i class="fa-solid ${icon}"></i><span>${msg}</span>`;
    toast.appendChild(item);
    setTimeout(() => item.remove(), 3000);
  };

  /* ================= SIMULASI TABS ================= */
  document.querySelectorAll('.sim-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sim-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.sim-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('sim-' + tab.dataset.sim).classList.add('active');
    });
  });

  /* ---------- Upload dummy ---------- */
  const gangguanFoto = document.getElementById('gangguan-foto');
  if (gangguanFoto) {
    gangguanFoto.addEventListener('change', () => {
      const label = document.getElementById('upload-label');
      if (gangguanFoto.files.length) label.textContent = gangguanFoto.files[0].name;
    });
  }

  /* ---------- Tambah Daya buttons ---------- */
  let selectedDaya = null;
  document.querySelectorAll('.daya-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.daya-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDaya = btn.dataset.va;
      const biayaPerVA = { 450: 20, 900: 30, 1300: 35, 2200: 40, 3500: 45, 5500: 50 };
      const estimasi = parseInt(selectedDaya) * (biayaPerVA[selectedDaya] || 40) * 1000 / 100;
      const biaya = Math.round(estimasi / 1000) * 1000 + 750000;
      document.getElementById('daya-result').innerHTML = `
        <div class="result-card">
          <h5><i class="fa-solid fa-circle-check"></i> Estimasi Biaya Tambah Daya</h5>
          <p>Daya baru: <strong>${selectedDaya} VA</strong></p>
          <p>Estimasi Biaya Penyambungan: <strong>Rp ${biaya.toLocaleString('id-ID')}</strong></p>
          <p>Estimasi jadwal survei: <strong>3-5 hari kerja</strong></p>
        </div>`;
      showToast('Estimasi biaya tambah daya berhasil dihitung');
    });
  });

  /* Init small extras */
  buildAccordion();
  buildStoryboard();
  animateStats();
  initChart();
});

/* ================= SIMULASI: BELI TOKEN ================= */
function simBeliToken() {
  const meter = document.getElementById('token-meter').value.trim();
  const nominal = document.getElementById('token-nominal');
  const resultBox = document.getElementById('token-result');
  if (!meter) {
    resultBox.innerHTML = `<div class="result-card info"><h5><i class="fa-solid fa-circle-info"></i> Perhatian</h5><p>Silakan masukkan nomor meter terlebih dahulu.</p></div>`;
    return;
  }
  const nomorToken = Array.from({ length: 4 }, () => Math.floor(1000 + Math.random() * 9000)).join('-');
  const label = nominal.options[nominal.selectedIndex].text;
  resultBox.innerHTML = `
    <div class="result-card">
      <h5><i class="fa-solid fa-circle-check"></i> Token Berhasil Dibeli</h5>
      <p>Nomor Meter: <strong>${meter}</strong></p>
      <p>Nominal: <strong>${label}</strong></p>
      <p>Nomor Token: <strong>${nomorToken}</strong></p>
    </div>`;
  showToast('Token listrik berhasil dibeli!');
}

/* ================= SIMULASI: BAYAR TAGIHAN ================= */
function simCekTagihan() {
  const id = document.getElementById('bayar-id').value.trim();
  const box = document.getElementById('bayar-tagihan-box');
  const bayarBtn = document.getElementById('bayar-btn');
  document.getElementById('bayar-result').innerHTML = '';
  if (!id) {
    box.innerHTML = `<div class="result-card info"><h5><i class="fa-solid fa-circle-info"></i> Perhatian</h5><p>Silakan masukkan ID Pelanggan terlebih dahulu.</p></div>`;
    bayarBtn.style.display = 'none';
    return;
  }
  const tagihan = (Math.floor(Math.random() * 40) + 15) * 10000;
  box.innerHTML = `
    <div class="result-card info">
      <h5><i class="fa-solid fa-file-invoice"></i> Rincian Tagihan</h5>
      <p>ID Pelanggan: <strong>${id}</strong></p>
      <p>Periode: <strong>Juli 2026</strong></p>
      <p>Total Tagihan: <strong>Rp ${tagihan.toLocaleString('id-ID')}</strong></p>
    </div>`;
  bayarBtn.style.display = 'block';
  bayarBtn.dataset.amount = tagihan;
}
function simBayarTagihan() {
  const bayarBtn = document.getElementById('bayar-btn');
  const amount = bayarBtn.dataset.amount || 0;
  const kode = 'PLN' + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('bayar-result').innerHTML = `
    <div class="result-card">
      <h5><i class="fa-solid fa-circle-check"></i> Pembayaran Berhasil</h5>
      <p>Jumlah Dibayar: <strong>Rp ${parseInt(amount).toLocaleString('id-ID')}</strong></p>
      <p>Kode Referensi: <strong>${kode}</strong></p>
    </div>`;
  showToast('Pembayaran tagihan berhasil!');
}

/* ================= SIMULASI: LAPOR GANGGUAN ================= */
function simLaporGangguan() {
  const nama = document.getElementById('gangguan-nama').value.trim();
  const alamat = document.getElementById('gangguan-alamat').value.trim();
  const jenis = document.getElementById('gangguan-jenis').value;
  const resultBox = document.getElementById('gangguan-result');
  if (!nama || !alamat) {
    resultBox.innerHTML = `<div class="result-card info"><h5><i class="fa-solid fa-circle-info"></i> Perhatian</h5><p>Nama dan alamat wajib diisi.</p></div>`;
    return;
  }
  const tiket = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
  resultBox.innerHTML = `
    <div class="result-card">
      <h5><i class="fa-solid fa-circle-check"></i> Laporan Berhasil Dikirim</h5>
      <p>Nama: <strong>${nama}</strong></p>
      <p>Jenis Gangguan: <strong>${jenis}</strong></p>
      <p>Nomor Tiket: <strong>${tiket}</strong></p>
    </div>`;
  showToast('Laporan gangguan terkirim!');
}

/* ================= SIMULASI: PASANG BARU ================= */
function simPasangBaru() {
  const nama = document.getElementById('pb-nama').value.trim();
  const alamat = document.getElementById('pb-alamat').value.trim();
  const daya = document.getElementById('pb-daya').value;
  const resultBox = document.getElementById('pasangbaru-result');
  if (!nama || !alamat) {
    resultBox.innerHTML = `<div class="result-card info"><h5><i class="fa-solid fa-circle-info"></i> Perhatian</h5><p>Nama dan alamat wajib diisi.</p></div>`;
    return;
  }
  const noPermohonan = 'PSG-' + Math.floor(100000 + Math.random() * 900000);
  resultBox.innerHTML = `
    <div class="result-card">
      <h5><i class="fa-solid fa-circle-check"></i> Permohonan Diterima</h5>
      <p>Nama Pemohon: <strong>${nama}</strong></p>
      <p>Alamat: <strong>${alamat}</strong></p>
      <p>Daya Diminta: <strong>${daya}</strong></p>
      <p>Nomor Permohonan: <strong>${noPermohonan}</strong></p>
    </div>`;
  showToast('Permohonan pasang baru berhasil diajukan!');
}

/* ================= KONTAK FORM ================= */
function simKirimKontak() {
  const nama = document.getElementById('cf-nama').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const resultBox = document.getElementById('kontak-result');
  if (!nama || !email) {
    resultBox.innerHTML = `<div class="result-card info"><h5><i class="fa-solid fa-circle-info"></i> Perhatian</h5><p>Nama dan email wajib diisi.</p></div>`;
    return;
  }
  resultBox.innerHTML = `<div class="result-card"><h5><i class="fa-solid fa-circle-check"></i> Pesan Terkirim</h5><p>Terima kasih, ${nama}. Tim kami akan segera merespons ke ${email}.</p></div>`;
  showToast('Pesan berhasil dikirim!');
  document.getElementById('cf-nama').value = '';
  document.getElementById('cf-email').value = '';
  document.getElementById('cf-pesan').value = '';
}

/* ================= FAQ ACCORDION ================= */
function buildAccordion() {
  const faqData = [
    ['Apa itu PLN Mobile?', 'PLN Mobile adalah aplikasi resmi PT PLN (Persero) untuk mengakses seluruh layanan kelistrikan secara digital.'],
    ['Apakah PLN Mobile berbayar?', 'Tidak, aplikasi PLN Mobile dapat diunduh dan digunakan secara gratis di Play Store dan App Store.'],
    ['Bagaimana cara mendaftar akun?', 'Cukup unduh aplikasi, daftar dengan nomor HP, lalu verifikasi menggunakan kode OTP.'],
    ['Apakah bisa membayar tagihan lebih dari satu ID pelanggan?', 'Bisa, Anda dapat menambahkan beberapa ID pelanggan dalam satu akun PLN Mobile.'],
    ['Berapa lama proses pelaporan gangguan ditindaklanjuti?', 'Umumnya petugas menindaklanjuti dalam hitungan menit hingga beberapa jam tergantung tingkat urgensi.'],
    ['Apakah token listrik bisa hangus?', 'Tidak, token yang sudah dibeli tidak memiliki masa kedaluwarsa dan bisa dimasukkan kapan saja.'],
    ['Metode pembayaran apa saja yang didukung?', 'PLN Mobile mendukung transfer bank, e-wallet, kartu debit/kredit, dan gerai retail rekanan.'],
    ['Bagaimana jika nomor meter tidak ditemukan?', 'Pastikan nomor meter dimasukkan dengan benar, atau hubungi Contact Center PLN 123 untuk verifikasi.'],
    ['Apakah pengajuan tambah daya dikenakan biaya?', 'Ya, terdapat biaya penyambungan sesuai golongan daya yang dipilih, estimasi ditampilkan sebelum konfirmasi.'],
    ['Bisakah saya memantau riwayat transaksi?', 'Bisa, seluruh riwayat pembelian token dan pembayaran tersimpan rapi di menu Riwayat Transaksi.']
  ];
  const wrap = document.getElementById('accordion');
  wrap.innerHTML = faqData.map((item, i) => `
    <div class="accordion-item">
      <div class="accordion-head" onclick="toggleAccordion(${i})">
        <span>${item[0]}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div class="accordion-body" id="acc-body-${i}">
        <div class="accordion-body-inner">${item[1]}</div>
      </div>
    </div>`).join('');
}
function toggleAccordion(i) {
  const item = document.querySelectorAll('.accordion-item')[i];
  const body = document.getElementById('acc-body-' + i);
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.accordion-item').forEach((el, idx) => {
    el.classList.remove('open');
    document.getElementById('acc-body-' + idx).style.maxHeight = null;
  });
  if (!isOpen) {
    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

/* ================= QUIZ ================= */
const quizData = [
  { q: 'Apa kepanjangan dari PLN?', options: ['Perusahaan Listrik Negara', 'Pusat Listrik Nasional', 'Perusahaan Listrik Nusantara', 'Pelayanan Listrik Negara'], correct: 0 },
  { q: 'Fitur apa yang digunakan untuk membeli pulsa listrik prabayar?', options: ['Pembayaran Tagihan', 'Pembelian Token', 'Tambah Daya', 'Pasang Baru'], correct: 1 },
  { q: 'Apa yang dibutuhkan untuk mengecek tagihan listrik pascabayar?', options: ['Nomor Meter', 'ID Pelanggan', 'Nomor KTP', 'Nomor HP'], correct: 1 },
  { q: 'Fitur apa yang digunakan saat listrik di rumah padam total?', options: ['Tambah Daya', 'Pelaporan Gangguan', 'Pasang Baru', 'Monitoring'], correct: 1 },
  { q: 'Berapa nomor Contact Center PLN?', options: ['108', '123', '110', '112'], correct: 1 },
  { q: 'Manakah pilihan daya listrik yang TIDAK tersedia di simulasi Tambah Daya?', options: ['900 VA', '1300 VA', '4000 VA', '2200 VA'], correct: 2 },
  { q: 'Apa fungsi fitur Monitoring Status Pengaduan?', options: ['Membeli token', 'Memantau status laporan', 'Membayar tagihan', 'Mengajukan pasang baru'], correct: 1 },
  { q: 'Dokumen apa yang perlu diisi saat mengajukan Pasang Baru?', options: ['Formulir data pemohon', 'Nomor token lama', 'Riwayat pembayaran', 'Kode OTP'], correct: 0 },
  { q: 'Apakah token listrik memiliki masa kedaluwarsa?', options: ['Ya, 30 hari', 'Ya, 1 tahun', 'Tidak', 'Ya, 6 bulan'], correct: 2 },
  { q: 'Warna aksen khas identitas PLN pada aplikasi ini adalah...', options: ['Merah', 'Hijau', 'Kuning', 'Ungu'], correct: 2 }
];
let quizIndex = 0, quizScore = 0, quizAnswered = false;

function startQuiz() {
  quizIndex = 0; quizScore = 0; quizAnswered = false;
  document.getElementById('quiz-intro').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-question').style.display = 'block';
  renderQuizQuestion();
}
function renderQuizQuestion() {
  quizAnswered = false;
  const item = quizData[quizIndex];
  document.getElementById('quiz-count').textContent = `Soal ${quizIndex + 1}/${quizData.length}`;
  document.getElementById('quiz-progress-fill').style.width = ((quizIndex) / quizData.length * 100) + '%';
  document.getElementById('quiz-question-text').textContent = item.q;
  const optWrap = document.getElementById('quiz-options');
  optWrap.innerHTML = item.options.map((opt, i) => `<div class="quiz-option" onclick="answerQuiz(${i})">${opt}</div>`).join('');
}
function answerQuiz(i) {
  if (quizAnswered) return;
  quizAnswered = true;
  const item = quizData[quizIndex];
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach((el, idx) => {
    if (idx === item.correct) el.classList.add('correct');
    else if (idx === i) el.classList.add('wrong');
  });
  if (i === item.correct) quizScore++;
  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizData.length) {
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  }, 900);
}
function finishQuiz() {
  document.getElementById('quiz-question').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';
  const percent = Math.round((quizScore / quizData.length) * 100);
  document.getElementById('quiz-score-text').textContent = `Skor kamu: ${quizScore}/${quizData.length}`;
  document.getElementById('quiz-percent').textContent = percent + '%';
  const ring = document.getElementById('quiz-ring');
  const circumference = 327;
  setTimeout(() => {
    ring.style.strokeDashoffset = circumference - (circumference * percent / 100);
  }, 100);
  if (window.gsap) gsap.from('#quiz-result', { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' });
  showToast('Quiz selesai! Skor: ' + percent + '%', 'fa-trophy');
}

/* ================= STORYBOARD TABLE ================= */
function buildStoryboard() {
  const rows = [
    [1, 'Logo & judul muncul di layar hero', 'Musik latar mulai perlahan', 'Fade in + partikel listrik bergerak', 'Scroll untuk lanjut'],
    [2, 'Tombol "Mulai Belajar" & "Coba Simulasi"', 'Efek hover halus', 'Tombol membesar saat disentuh', 'Klik tombol → scroll ke section'],
    [3, 'Section Tentang dengan ilustrasi smartphone', 'Tidak ada audio khusus', 'Fade + slide dari kiri/kanan', 'Scroll reveal'],
    [4, 'Tiga poin manfaat PLN Mobile', 'Senyap', 'Ikon muncul bertahap', 'Hover ikon'],
    [5, 'Enam kartu fitur tersusun grid', 'Efek klik saat kartu ditekan', 'Card terangkat saat hover', 'Klik kartu membuka modal'],
    [6, 'Modal penjelasan fitur terbuka', 'Efek notifikasi ringan', 'Modal zoom-in dari tengah', 'Klik ikon X untuk menutup'],
    [7, 'Tab simulasi & bingkai ponsel', 'Efek klik tab', 'Transisi antar tab', 'Klik tab memilih simulasi'],
    [8, 'Form input pada simulasi token', 'Efek ketik ringan (opsional)', 'Fokus input bercahaya', 'Isi form → klik Beli Sekarang'],
    [9, 'Kartu hasil transaksi muncul', 'Efek sukses (chime)', 'Pop-in dengan sedikit bounce', 'Otomatis tampil setelah aksi'],
    [10, 'Timeline tutorial 5 langkah', 'Senyap', 'Garis timeline terisi bertahap', 'Scroll reveal per langkah'],
    [11, 'Accordion FAQ tersusun vertikal', 'Efek klik saat expand', 'Panel meluncur turun', 'Klik pertanyaan untuk membuka jawaban'],
    [12, 'Grid kartu tips', 'Senyap', 'Flip-in bergantian', 'Hover kartu'],
    [13, 'Kartu soal quiz & progress bar', 'Efek klik pilihan jawaban', 'Progress bar terisi tiap soal', 'Klik salah satu opsi jawaban'],
    [14, 'Lingkaran skor akhir quiz', 'Efek sukses (trophy chime)', 'Ring skor terisi memutar', 'Klik "Ulangi Quiz"'],
    [15, 'Grafik statistik & kartu angka', 'Senyap', 'Angka menghitung naik (count-up)', 'Scroll reveal'],
    [16, 'Formulir kontak & peta dummy', 'Efek notifikasi saat kirim pesan', 'Fade + slide', 'Isi form → klik Kirim Pesan']
  ];
  const body = document.getElementById('storyboard-body');
  if (!body) return;
  body.innerHTML = rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('');
}

/* ================= STATISTIK ================= */
function animateStats() {
  const targets = { 'stat-pengguna': 52000000, 'stat-token': 18500000, 'stat-gangguan': 340000, 'stat-bayar': 22750000 };
  const els = Object.keys(targets).map(id => document.getElementById(id));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target, targets[entry.target.id]);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => el && observer.observe(el));
}
function countUp(el, target) {
  let start = 0;
  const duration = 1400;
  const startTime = performance.now();
  function format(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + ' Jt';
    if (n >= 1000) return Math.round(n / 1000) + ' Rb';
    return n;
  }
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = format(value);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = format(target);
  }
  requestAnimationFrame(step);
}

/* ================= CHART.JS ================= */
function initChart() {
  const ctxEl = document.getElementById('statsChart');
  if (!ctxEl || !window.Chart) return;
  new Chart(ctxEl, {
    type: 'bar',
    data: {
      labels: ['Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'],
      datasets: [
        { label: 'Pembelian Token', data: [14, 16, 15, 18, 19, 20], backgroundColor: '#FFD100', borderRadius: 8 },
        { label: 'Pembayaran Tagihan', data: [10, 11, 13, 12, 15, 16], backgroundColor: '#0C3C78', borderRadius: 8 },
        { label: 'Pelaporan Gangguan', data: [2, 3, 2.5, 3.2, 2.8, 3], backgroundColor: '#1E5FA8', borderRadius: 8 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Juta Transaksi' } } }
    }
  });
}
