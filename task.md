# 🇮🇩 Indonesia National Debt Clock (React)

Website **Debt Clock Indonesia** dengan **counter utang berjalan real-time** dan **animasi angka seperti mesin slot**.

Project ini dibuat menggunakan **React** dan **data JSON statis**, sehingga tetap bisa di-deploy di **GitHub Pages tanpa backend atau database**.

---

# ✨ Fitur

* ⏱ Counter utang **bertambah setiap detik**
* 🎰 Animasi angka **slot / rolling digit**
* ⚛ Dibuat dengan **React**
* 📊 Data disimpan dalam **JSON**
* 🚀 Bisa deploy ke **GitHub Pages**
* 🗂 Tanpa backend / database

---

# 📁 Struktur Project

```
indonesia-debt-clock/
│
├── public/
│   └── debt-data.json
│
├── src/
│   ├── components/
│   │   └── DebtCounter.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
│
├── package.json
└── README.md
```

---

# 📊 Data Utang

File JSON digunakan sebagai sumber data.

## `public/debt-data.json`

```json
{
  "base_debt_trillion": 9637.90,
  "increase_per_second_trillion": 0.0000407,
  "start_time": "2025-12-31T00:00:00Z"
}
```

---

# ⚛ Komponen React

## `src/components/DebtCounter.jsx`

```jsx
import { useEffect, useState } from "react"

export default function DebtCounter(){

const [digits,setDigits] = useState([])

const [config,setConfig] = useState(null)

useEffect(()=>{

fetch("/debt-data.json")
.then(res=>res.json())
.then(data=>{

setConfig(data)

})

},[])

useEffect(()=>{

if(!config) return

const interval=setInterval(()=>{

const now=new Date()

const start=new Date(config.start_time)

const seconds=(now-start)/1000

const debt=
config.base_debt_trillion+
(seconds*config.increase_per_second_trillion)

let formatted=
debt.toFixed(2).replace(".","")

formatted=formatted.padStart(12,"0")

setDigits(formatted.split(""))

},1000)

return ()=>clearInterval(interval)

},[config])

return(

<div className="counter">

{digits.map((d,i)=>(
<div key={i} className="digit">
<span>{d}</span>
</div>
))}

</div>

)

}
```

---

# ⚛ App Component

## `src/App.jsx`

```jsx
import DebtCounter from "./components/DebtCounter"
import "./style.css"

export default function App(){

return(

<div className="app">

<h1>Indonesia National Debt Clock</h1>

<DebtCounter/>

<p className="subtitle">
utang bertambah setiap detik
</p>

</div>

)

}
```

---

# 🎨 Styling

## `src/style.css`

```css
body{

background:#000;
color:white;
font-family:monospace;
text-align:center;
margin-top:80px;

}

.counter{

display:flex;
justify-content:center;
font-size:60px;
margin-top:40px;

}

.digit{

width:40px;
height:70px;
overflow:hidden;
background:#111;
border:2px solid #333;
margin:2px;
display:flex;
align-items:center;
justify-content:center;

}

.subtitle{

color:#aaa;
margin-top:20px;

}
```

---

# 🧮 Rumus Counter

Counter dihitung dengan rumus:

```
utang_sekarang =
utang_awal +
(kenaikan_per_detik × waktu_berjalan)
```

Contoh:

```
Utang awal = 9637.90 Triliun
Kenaikan = 0.0000407 Triliun / detik


Formula proyeksi sederhana:
Utang(n+1) = Utang(n) × (1 + growth_rate)
Contoh kalkulasi manual:

2025 → 2026: 9.637,90 × 1,12 = 10.794,45 T
2026 → 2027: 10.794,45 × 1,12 = 12.089,78 T
dst.

Untuk memperbarui proyeksi, ubah array predictions dan sesuaikan val dan pdb.

const eras = [
  { name: 'Soekarno',           period: '1945–1966', debt: 0.794,   pdb: 29.0,  color: '#3266ad' },
  { name: 'Soeharto',           period: '1966–1998', debt: 551.4,   pdb: 57.7,  color: '#5DCAA5' },
  { name: 'BJ Habibie',         period: '1998–1999', debt: 938.8,   pdb: 85.4,  color: '#E24B4A' },
  { name: 'Abdurrahman Wahid',  period: '1999–2001', debt: 1271.4,  pdb: 77.2,  color: '#D85A30' },
  { name: 'Megawati',           period: '2001–2004', debt: 1298.0,  pdb: 56.5,  color: '#7F77DD' },
  { name: 'SBY',                period: '2004–2014', debt: 2608.8,  pdb: 24.7,  color: '#1D9E75' },
  { name: 'Joko Widodo',        period: '2014–2024', debt: 8353.02, pdb: 39.13,  color: '#BA7517' },
  { name: 'Prabowo',            period: '2024–',     debt: 9637.90, pdb: 40.46, color: '#A32D2D' },
];
```

---

# 🚀 Menjalankan Project

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

---

# 🌐 Deploy ke GitHub Pages

Install package deploy:

```
npm install gh-pages
```

Tambahkan pada `package.json`

```json
"homepage": "https://username.github.io/indonesia-debt-clock"
```

Script deploy:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "deploy": "gh-pages -d dist"
}
```

Build project:

```
npm run build
```

Deploy:

```
npm run deploy
```

Website akan tersedia di:

```
https://username.github.io/indonesia-debt-clock
```

---

# 📈 Pengembangan Selanjutnya

Fitur yang bisa ditambahkan:

* 📊 grafik utang per presiden
* 👥 utang per warga Indonesia
* 🌏 perbandingan utang negara lain
* 🔮 prediksi utang hingga 2045
* 📉 rasio utang terhadap PDB
* 🧾 timeline sejarah utang Indonesia

---

# 📜 License

Open-source untuk tujuan edukasi ekonomi.
