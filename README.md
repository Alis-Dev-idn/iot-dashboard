# IoT-Dashboard

## Pendahuluan
Website ini dibuat menggunakan `ReactJs` serta menggunakan `typeScript`,
Website memerlukan backend  [berikut](https://github.com/Alis-Dev-idn/iot-api) untuk berjalan.

## Setup Website
- pastikan telah menginstal nodejs jika belum silakan kunjungi [website](https://nodejs.org/en/) untuk install
- gunakan git untuk clone repository ini, jika belum mengintal silakan kunjungi [website](https://git-scm.com/downloads) untuk installasi
- jika sudah terinstall clone repository ini dengan menentukan folder untuk menyimpannya, kemudian klik kanan dan pilih `git bash here`
- kemudian ketik seperti berikut didalam command:
    ```
    git clone https://github.com/Alis-Dev-idn/iot-dashboard
    ```
- Setelahnya silakan isi file .env sesuai dengan yang dimintakan (sesuikan dengan backend yang digunakan)
- untuk mejalankan, gunakan : `npm start`
- pastikan sebelum memulai aplikasi menginstal dependensi yang diperlukan : `npm install`
- untuk membuat production file gunakan : `npm run build`
- untuk demo bisa kunjungi [website berikut](https://iot.smpvanilla.com)

## Setup Pada Hosting
- setelah melakukan `npm run build` silakan copy file yang berada pada folder `/build`
- letakkan pada hosting yang telah disewa

## Setup dengan VPS
- Install nginx dengan perintah berikut pada ekosistem linux :
    ````
    sudo apt update
    sudo apt install nginx
    ````
- Periksa apakah nginx telah berjalan dengan menggunakan perintah berikut. Pastikan tidak ada pesan error
    ````
  sudo systemctl status nginx
  ````
- Buat konfigurasi `iot-dashboard` di lokasi : `/etc/nginx/sites-available`.
- Ketik perintah : sudo nano `/etc/nginx/sites-available/iot-dashboard`. Salin baris konfigurasi berikut, kemudian ubah beberapa variable sesuai dengan nilai yang valid pada tabel.
    ````
  server {
  listen {PORT};
  server_name {IP_ADDRESS};
  root {PATH_APLIKASI};
  index index.html index.htm;
  location / {
      try_files $uri /index.html;
  }
  }
  ````
| Variable | Deskripsi | Contoh       |
| -------- | --------- |--------------|
|PORT | Port Aplikasi | 5023, [::]80 |
| IP_ADDRESS | Ip Server | numeric or domain |

- Aktifkan setingan nginx dengan perintah
    ````
    sudo ln -s /etc/nginx/sites-available/iot-dashboard /etc/nginx/sites-enabled
    sudo systemctl restart nginx
  ````
