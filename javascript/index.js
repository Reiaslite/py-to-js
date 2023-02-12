const prompt = require('prompt-sync')({sigint: true});

const peserta = []

const data_paket = [
    ["Karawang - Pantai Pakis Jaya","6 Orang", "1000000"],
    ["Karawang - Curig Cigentis - Gunung Sanggabuana","6 Orang", "500000"],
    ["Karawang - Candi Jiwa", "4 Orang", "600000"],
    ["Karawang - Pantai Samudra", "5 Orang", "850000"]
]

const data_tambahan = [
    ["A", "Penginapan", "600000"],
    ["B", "Penjemputan", "300000"],
    ["C", "Kuliner", "300000"]
]

function showPaket() {
    console.clear()
    console.log("Data paket")
    for (let i = 0; i < data_paket.length; i++) {
        console.log(`${i+1}. ${data_paket[i][0]} - ${data_paket[i][1]} - ${data_paket[i][2]}`)
    }
    
    console.log("\nData tambahan")
    for (let i = 0; i < data_tambahan.length; i++) {
        console.log(`${i+1}. ${data_tambahan[i][0]} - ${data_tambahan[i][1]} - ${data_tambahan[i][2]}`)
    }
    menu()
}

function showData() {
    if (peserta.length == 0) {
        console.clear()
        console.log("\nData peserta masih kosong\n")
        const choice = prompt("Lanjutkan? (y/n) ")
        if(choice == "y"){
            console.clear()
            menu()
        }else if (choice == "n"){
            console.clear()
            showPaket()
        }else{
            console.log("Invalid choice")
        }
    } else {
        console.clear()
        console.log("Data peserta\n")

        console.log("|No.|\t|Nama|\t|Paket|\t\t\t\t\t|Tambahan|\t\t|Total|")
        for (let i = 0; i < peserta.length; i++) {
            console.log(`${i+1}.\t${peserta[i].nama}\t${peserta[i].paket}\t${peserta[i].tambahan}\t${peserta[i].total}`)
        }
        const choice = prompt("Ingin Membeli Tiket Lagi? (y/n) ")
        if(choice == "y"){
            insertData()
        }
        else if(choice == "n"){
            console.clear()
            menu()
        }
        else{
            console.log("Invalid choice")
        }
    }
}

function insertData() {
    console.clear()
    // Insert data paket
    const nama = prompt("Masukkan nama: ")
    const paket = prompt("Masukkan paket: ")
    const get_paket = data_paket[paket-1]
    console.log(`Paket yang dipilih: ${get_paket[0]} - ${get_paket[1]} - ${get_paket[2]}\n`)

    // Insert data tambahan
    const tambahan = prompt("Masukkan tambahan: ")
    const get_tambahan = data_tambahan[tambahan-1]
    console.log(`Tambahan yang dipilih: ${get_tambahan[0]} - ${get_tambahan[1]} - ${get_tambahan[2]}\n`)

    // Hitung total harga
    const total = parseInt(get_paket[2]) + parseInt(get_tambahan[2])
    console.log(`Total harga: ${total}\n`)
    peserta.push({
        nama: nama,
        paket: get_paket,
        tambahan: get_tambahan,
        total: total
    })

    console.log("Data berhasil ditambahkan")
    const choice = prompt("Ingin Membeli Tiket Lagi? (y/n)")
    if(choice == "y"){
        insertData()
    } else if(choice == "n"){
        console.clear()
        menu()
    } else{
        console.log("Invalid choice")
    }
}

function searchData() {
    console.clear()
    const search = prompt("Masukkan nama: ").toLowerCase();
    const filtered = peserta.filter(function (item) {
        return item.nama.toLowerCase().includes(search);
    });
    const found = filtered[0];
    if (found) {
        console.log(`Data ditemukan: ${found.nama} - ${found.paket} - ${found.tambahan} - ${found.total}`)
    } else {
        console.log("Data tidak ditemukan")
    }

    const choice = prompt("Cari Data Lagi? (y/n) ")
    if(choice == "y"){
        searchData()
    } else if(choice == "n"){
        console.clear()
        menu()
    } else{
        console.log("Invalid choice")
    }
}

function deleteData() {
    console.clear()
    const search = prompt("Masukkan nama: ").toLowerCase();
    const filtered = peserta.filter(function (item) {
        return item.nama.toLowerCase().includes(search);
    });
    const found = filtered[0];
    if (found) {
        console.log(`Data ditemukan: ${found.nama} - ${found.paket} - ${found.tambahan} - ${found.total}`)
        const choice = prompt("Apakah anda yakin ingin menghapus data ini? (y/n) ")
        if(choice == "y"){
            const index = peserta.indexOf(found)
            peserta.splice(index, 1)
            console.log("Data berhasil dihapus")
        } else if(choice == "n"){
            console.clear()
            menu()
        } else{
            console.log("Invalid choice")
        }
    } else {
        console.log("Data tidak ditemukan")
    }

    const choice = prompt("Hapus Data Lagi? (y/n) ")
    if(choice == "y"){
        deleteData()
    } else if(choice == "n"){
        console.clear()
        menu()
    } else{
        console.log("Invalid choice")
    }
}

function menu(){
    const strip = ("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    console.log(strip)
    console.log("Selamat Datang di Program Tiket!")
    console.log(strip)
    console.log("Menu: \n 1. Show Paket \n 2. Show Data \n 3. Insert Data \n 4. Search Data \n 5. Delete Data \n 6. Keluar")
    var choice = prompt("Enter your choice: ")
    if(choice == 1){
        showPaket()
    }
    else if(choice == 2){
        showData()
    }
    else if(choice == 3){
        insertData()
    }
    else if(choice == 4){
        searchData()
    }
    else if(choice == 5){
        deleteData()
    } else if(choice == 6){
        console.log("Terima kasih telah menggunakan program ini")
    }
    else{
        console.log("Invalid choice")
    }

}
menu()