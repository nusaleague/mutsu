# mutsu

> "Don't play with fire too much, okay?"
>
> -- Mutsu

mutsu adalah server yang menyediakan website Nusa Mascot League (https://www.nusaleague.com).

## Panduan development

### Kebutuhan awal

- Node.js
- npm
- [akashi](https://github.com/nusaleague/akashi): API server Nusa Mascot League

### Tahapan pemasangan

#### Instalasi

Untuk memasang mutsu di komputer Anda, clone repositori ini dan jalankan `npm install` untuk memasang dependency packages:

```sh
$ git clone git@github.com:nusaleague/mutsu
$ cd mutsu
$ npm install
```

#### Konfigurasi

Salin file `default.env` menjadi file `.env`:

```
$ cp default.env .env
```

Kemudian ubah file `.env` seperlunya.

#### Jalankan development server

Setelah database dipasang, Anda dapat menyalakan mutsu:

```sh
$ npm run dev
```

mutsu akan berjalan di port 3002 (default).

## Dokumentasi

_TBA_

## Cara berkontribusi

_TBA_

## Lisensi

mutsu dikelola oleh Nusa Mascot League dan dilisensi di bawah [MIT License][license].

[license]: https://github.com/nusaleague/mutsu/blob/master/LICENSE
