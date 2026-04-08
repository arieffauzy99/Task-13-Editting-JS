// --- 1. INISIALISASI & LOCALSTORAGE ---
// Membaca data dari localStorage saat web dibuka
let dummyData = JSON.parse(localStorage.getItem('data_tugas')) || [];

const form = document.getElementById('userForm');
const inputNama = document.getElementById('userName');
const inputId = document.getElementById('userId'); // hidden input untuk ID
const containerData = document.getElementById('userList');
const tombolSubmit = document.getElementById('submitBtn');

// --- 2. FUNGSI MENAMPILKAN DATA (READ) ---
const tampilkanData = () => {
    containerData.innerHTML = ''; // Kosongkan tampilan sebelum refresh
    
    dummyData.forEach((item) => {
        containerData.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>
                    <button onclick="persiapanEdit(${item.id})">Edit</button>
                    <button onclick="hapusData(${item.id})">Hapus</button>
                </td>
            </tr>
        `;
    });

    // Simpan setiap perubahan ke localStorage (Aksi simpan data dummy)
    localStorage.setItem('data_tugas', JSON.stringify(dummyData));
};

// --- 3. FUNGSI EDIT DATA (SESUAI INSTRUKSI) ---
window.persiapanEdit = (id) => {
    // A. Ambil data yang akan diedit
    const dataDitemukan = dummyData.find(item => item.id === id);
    
    // B. Masukkan data ke dalam input form
    inputNama.value = dataDitemukan.nama;
    inputId.value = dataDitemukan.id;
    
    // Ubah UI tombol agar user tahu ini mode edit
    tombolSubmit.innerText = "Update Data";
};

// --- 4. FUNGSI SIMPAN (TAMBAH & UPDATE) ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const idSaatIni = inputId.value;
    const namaBaru = inputNama.value;

    if (idSaatIni) {
        // LOGIKA EDIT:
        // C. Terapkan function filter berdasarkan BUKAN id yang dipilih
        dummyData = dummyData.filter(item => item.id != idSaatIni);
        
        // D. Simpan/Push kembali data yang sudah diganti valuenya
        dummyData.push({ id: parseInt(idSaatIni), nama: namaBaru });
    } else {
        // LOGIKA TAMBAH BARU:
        const dataBaru = { id: Date.now(), nama: namaBaru };
        dummyData.push(dataBaru);
    }

    // Reset Form setelah aksi selesai
    form.reset();
    inputId.value = '';
    tombolSubmit.innerText = "Tambah Data";
    
    tampilkanData(); // Refresh tampilan dan localStorage
});

// --- 5. FUNGSI DELETE (SESUAI INSTRUKSI) ---
window.hapusData = (id) => {
    // A. Ambil data yang akan dihapus & Terapkan filter berdasarkan id yang dipilih
    // Filter akan membuang ID yang dipilih dan menyisakan yang lain
    dummyData = dummyData.filter(item => item.id !== id);
    
    // B. Simpan Data ke data dummy (Update LocalStorage)
    tampilkanData();
};

// Jalankan fungsi tampilkan pertama kali
tampilkanData();