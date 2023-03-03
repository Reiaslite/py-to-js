const prompt = require("prompt-sync")({ sigint: true });
const Table = require("cli-table");

const peserta = [];

const data_paket = [
  ["Karawang - Pantai Pakis Jaya", "6 Orang", "1000000"],
  ["Karawang - Curig Cigentis - Gunung Sanggabuana", "6 Orang", "500000"],
  ["Karawang - Candi Jiwa", "4 Orang", "600000"],
  ["Karawang - Pantai Samudra", "5 Orang", "850000"],
];

const data_tambahan = [
  ["A", "Penginapan", "600000"],
  ["B", "Penjemputan", "300000"],
  ["C", "Kuliner", "300000"],
];

function showPaket() {
  console.clear();
  // Buat Tabel Paket
  const table = new Table({
    head: ["No", "Nama Paket", "Kuota", "Harga"],
  });
  for (let i = 0; i < data_paket.length; i++) {
    table.push([i + 1, data_paket[i][0], data_paket[i][1], data_paket[i][2]]);
  }

  // Buat Tabel Tambahan
  const table2 = new Table({
    head: ["No", "Nama Tambahan", "Harga"],
  });
  for (let i = 0; i < data_tambahan.length; i++) {
    table2.push([i + 1, data_tambahan[i][1], data_tambahan[i][2]]);
  }

  // Tampilkan tabel
  console.log("Data paket");
  console.log(table.toString());
  console.log("\nData tambahan");
  console.log(table2.toString());
  menu();
}

function showData() {
  if (peserta.length == 0) {
    console.clear();
    console.log("\nData peserta masih kosong\n");
    const choice = prompt("Lanjutkan? (y/n) ");
    if (choice == "y") {
      console.clear();
      menu();
    } else if (choice == "n") {
      console.clear();
      showPaket();
    } else {
      console.log("Invalid choice");
    }
  } else {
    console.clear();
    // Buat Tabel Data Peserta
    const table = new Table({
      head: ["No", "Nama", "Paket", "Tambahan", "Total"],
    });

    for (let i = 0; i < peserta.length; i++) {
      table.push([
        i + 1,
        peserta[i].nama,
        peserta[i].paket[0],
        peserta[i].tambahan[0],
        peserta[i].total,
      ]);
    }

    // Tampilkan tabel
    console.log("Data peserta");
    console.log(table.toString());

    const choice = prompt("Ingin Membeli Tiket Lagi? (y/n) ");
    if (choice == "y") {
      insertData();
    } else if (choice == "n") {
      console.clear();
      menu();
    } else {
      console.log("Invalid choice");
    }
  }
}

function insertData() {
  console.clear();
  // Insert data paket
  const nama = prompt("Masukkan nama\t: ");
  // error handling
  let paket;
  while (true) {
    paket = prompt("Masukkan paket\t: ");

    if (isNaN(paket)) {
      console.error("Input Paket harus berupa angka!\n");
    } else if (paket > data_paket.length || paket <= 0) {
      console.error("Paket yang tersedia hanya 1-4!\n");
    } else {
      break;
    }
  }
  const get_paket = data_paket[paket - 1];

  const tablePaket = new Table({
    head: ["No", "Nama Paket", "Kuota", "Harga"],
  });
  tablePaket.push([paket, get_paket[0], get_paket[1], get_paket[2]]);

  console.log(tablePaket.toString());

  // console.log(`Paket yang dipilih: ${get_paket[0]} - ${get_paket[1]} - ${get_paket[2]}\n`)

  // Insert data tambahan
  // error handling
  let tambahan;
  while (true) {
    tambahan = prompt("Masukkan tambahan: ");
    if (isNaN(tambahan)) {
      console.error("Input Tambahan harus berupa angka!\n");
    } else if (tambahan > data_tambahan.length || tambahan <= 0) {
      console.error("Tambahan yang tersedia hanya 1-3!\n");
    } else {
      break;
    }
  }
  const get_tambahan = data_tambahan[tambahan - 1];

  const tableTambahan = new Table({
    head: ["No", "Kode Tambahan", "Tipe", "Harga"],
  });
  tableTambahan.push([
    tambahan,
    get_tambahan[0],
    get_tambahan[1],
    get_tambahan[2],
  ]);
  console.log(tableTambahan.toString());
  // console.log(`Tambahan yang dipilih: ${get_tambahan[0]} - ${get_tambahan[1]} - ${get_tambahan[2]}\n`)

  // Hitung total harga
  const total = parseInt(get_paket[2]) + parseInt(get_tambahan[2]);
  const totalTable = new Table({
    head: ["Total Harga"],
  });
  totalTable.push([total]);
  console.log(totalTable.toString());
  // console.log(`Total harga: ${total}\n`)
  peserta.push({
    nama: nama,
    paket: get_paket,
    tambahan: get_tambahan,
    total: total,
  });

  console.log("Data berhasil ditambahkan");
  const choice = prompt("Ingin Membeli Tiket Lagi? (y/n)");
  if (choice == "y") {
    insertData();
  } else if (choice == "n") {
    console.clear();
    menu();
  } else {
    console.log("Invalid choice");
  }
}

function searchData() {
  console.clear();
  const search = prompt("Masukkan nama: ").toLowerCase();
  const filtered = peserta.filter(function (item) {
    return item.nama.toLowerCase().includes(search);
  });
  const found = filtered[0];
  if (found) {
    const table = new Table({
      head: ["No", "Nama Pembeli", "Paket", "Tambahan", "Total"],
    });
    for (let i = 0; i < filtered.length; i++) {
      table.push([
        i + 1,
        filtered[i].nama,
        filtered[i].paket[0],
        filtered[i].tambahan[1],
        filtered[i].total,
      ]);
    }
    console.log(table.toString());
    // console.log(`Data ditemukan: ${found.nama} - ${found.paket} - ${found.tambahan} - ${found.total}`)
  } else {
    console.log("Data tidak ditemukan");
  }

  const choice = prompt("Cari Data Lagi? (y/n) ");
  if (choice == "y") {
    searchData();
  } else if (choice == "n") {
    console.clear();
    menu();
  } else {
    console.log("Invalid choice");
  }
}

function deleteData() {
  console.clear();
  const search = prompt("Masukkan nama: ").toLowerCase();
  const filtered = peserta.filter(function (item) {
    return item.nama.toLowerCase().includes(search);
  });
  const found = filtered[0];
  if (found) {
    const table = new Table({
      head: ["No", "Nama Pembeli", "Paket", "Tambahan", "Total"],
    });
    for (let i = 0; i < filtered.length; i++) {
      table.push([
        i + 1,
        filtered[i].nama,
        filtered[i].paket[0],
        filtered[i].tambahan[1],
        filtered[i].total,
      ]);
    }
    console.log(table.toString());
    // console.log(`Data ditemukan: ${found.nama} - ${found.paket} - ${found.tambahan} - ${found.total}`)
    const choice = prompt("Apakah anda yakin ingin menghapus data ini? (y/n) ");
    if (choice == "y") {
      const index = peserta.indexOf(found);
      peserta.splice(index, 1);
      console.log("Data berhasil dihapus");
    } else if (choice == "n") {
      console.clear();
      menu();
    } else {
      console.log("Invalid choice");
    }
  } else {
    console.log("Data tidak ditemukan");
  }

  const choice = prompt("Hapus Data Lagi? (y/n) ");
  if (choice == "y") {
    deleteData();
  } else if (choice == "n") {
    console.clear();
    menu();
  } else {
    console.log("Invalid choice");
  }
}

function menu() {
  const strip = "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=";
  console.log(strip);
  console.log("Selamat Datang di Program Tiket!");
  console.log(strip);
  console.log(
    "Menu: \n 1. Show Paket \n 2. Show Data \n 3. Insert Data \n 4. Search Data \n 5. Delete Data \n 6. Keluar"
  );
  var choice = prompt("Enter your choice: ");
  if (choice == 1) {
    showPaket();
  } else if (choice == 2) {
    showData();
  } else if (choice == 3) {
    insertData();
  } else if (choice == 4) {
    searchData();
  } else if (choice == 5) {
    deleteData();
  } else if (choice == 6) {
    console.log("Terima kasih telah menggunakan program ini");
  } else {
    console.log("Invalid choice");
  }
}
menu();
