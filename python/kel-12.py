from prettytable import PrettyTable
peserta = []

data_paket = [
    ["Karawang - Pantai Pakis Jaya","6 Orang", "1000000"],
    ["Karawang - Curig Cigentis - Gunung Sanggabuana","6 Orang", "500000"],
    ["Karawang - Candi Jiwa", "4 Orang", "600000"],
    ["Karawang - Pantai Samudra", "5 Orang", "850000"]
]

data_tambahan = [
    ["A", "Penginapan", "600000"],
    ["B", "Penjemputan", "300000"],
    ["C", "Kuliner", "300000"]
]

def show_data():
    
    if len(peserta) < 1:
        print("Data Belum Ada")
    else:
        table = PrettyTable(["ID","Nama","Rute Perjalanan","Fasilitas","Total"])
        for indeks, data in enumerate(peserta):
            dapes = [indeks+1] + data
            table.add_row(dapes)
        print(table)
        menu_utama()

def insert_data():
    # Tabel data_paket
    table = PrettyTable(["ID", "Rute Perjalanan","Minimum Peserta", "Tarif"])
    for indeks, data in enumerate(data_paket):
        paket = [indeks+1] + data
        table.add_row(paket)
    print(table)

    nama = input("Nama Peserta\t: ")
    paket = int(input("Kode Paket\t: "))
    get_paket = data_paket[paket-1]

    table = PrettyTable(["ID", "Fasilitas", "Tarif"])
    for data in data_tambahan:
        table.add_row(data)
    print(table)

    fasilitas = input("Kode Tambahan\t: ")
    get_fasilitas = next(filter(lambda x: x[0] == fasilitas, data_tambahan), None)
    print("Tiket berhasil dipesan!")
    
    tarif_total = int(get_paket[2]) +int(get_fasilitas[2])
    ppn = 0.11 * tarif_total

    peserta.append([
        nama,
        get_paket[0],
        get_fasilitas[1],
        tarif_total + ppn
    ])
    show_data()

def search_data():
    nama = input("Masukkan Nama\t: ")
    datas = next(filter(lambda x:x[0].lower() == nama.lower(), peserta), None)
    table = PrettyTable(["ID","Nama","Rute Perjalanan","Fasilitas","Total"])
    
    if len(datas) < 1:
        print("Maaf data belum ada.")
    else:
        for indeks, data in enumerate(datas):
            paket = [indeks+1] + data
            table.add_row(paket)    
        print(table)


def menu_utama():
    print("======= Menu =======")
    print("[1] Show Data\n[2] Insert Data \n[3] Search Data\n[4] Exit")
    print("======= Menu =======")
    print()
    menu = int(input("Masukan Pilihan\t: "))
    if menu == 1:
        show_data()
    elif menu == 2:
        insert_data()
    elif menu == 3:
        search_data()
    elif menu == 4:
        print("Terima Kasih!")
        exit()
    else:
        print("Salah Pilih")
menu_utama()
