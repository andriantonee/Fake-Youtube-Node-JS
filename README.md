## Deskripsi Tugas-Project-Web-Lanjutan(Revolution)

Revolution adalah sebuah website yang berfungsi sebagai pemutar MV(Music Video). Pada website ini, user dapat mengetahui berbagai MV yang baru dirilis pada bagian **New Release** yang terdapat pada **_Home_** page, selain itu user juga dapat mengetahui berbagai MV yang sedang **Hot** atau **Trending** yang juga terdapat pada **_Home_** page. Jika user ingin melihat MV berdasarkan pembagian kategorinya, user dapat melihatnya di bagian **_Music Category_** page. Kemudian jika user ingin melihat MV yang sedang popular atau paling banyak diview di youtube saat ini, user dapat melihatnya di bagian **_Popular on Web_** page. Pada saat user memutar MV, user dapat mengetahui banyak view atau like MV tersebut dan juga dapat melihat beberapa suggestion MV pada kategori MV yang sama. Selain itu, user juga dapat meng-support MV tersebut dengan menekan tombol love agar MV tersebut bisa masuk dalam bagian **Hot** atau **Trending** yang berada pada **_Home_** page. User yang ingin melihat lyric MV tersebut dapat menekan tombol Show Lyric.

## Instalasi
####1. Clone project ini atau download zipnya

```sh
$ git clone https://github.com/andriantonee/Tugas-Project-Web-Lanjutan.git
```

####2. Pastikan anda telah menginstall [mysql](https://www.mysql.com/) dan sudah memiliki database dengan nama **_musicvideo_**

####3. Kemudian lakukanlah import file dengan nama **_musicvideo.sql_** pada project ini ke dalam database **_musicvideo_**

####4. Pastikan anda telah menginstall [node](https://nodejs.org/en/) dan [npm](https://www.npmjs.org/) secara global

####5. Kemudian lakukan command berikut

```sh
$ cd `project-directory`
```
- install dependency
```sh
$ npm install 
```
- a shortcut for `node index.js`
```sh
$ npm start
```

## Informasi Tambahan

Untuk mengakses **_Admin Panel_** gunakan link **_/hidden_** dengan `username : admin` dan `password : admin`
