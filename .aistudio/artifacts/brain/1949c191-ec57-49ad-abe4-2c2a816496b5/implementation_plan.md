# FacultyScore — Fakultetlar Reytingi va Maktab Jamiyati Platformasi

Ushbu reja `facultyscore.lovable.app` (Abu Ali ibn Sino ixtisoslashtirilgan maktabi, Farg'ona filiali) loyihasining to'liq tahlili, dizayn tizimi, hisoblash mantig'i va zamonaviy veb-arxitekturasi asosida to'laqonli platformani yaratishni belgilaydi.

---

## Foydalanuvchi tanlagan qarorlar va tasdiqlar

> [!IMPORTANT]
> **Foydalanuvchi tasdiqlagan qarorlar:**
> - **Fakultetlar tizimi**: 4 ta asosiy fakultet — **BLUE** (Ko‘k), **GREEN** (Yashil), **WHITE** (Oq), **RED** (Qizil).
> - **Mavzu va ranglar**: Yorug‘ (Light) va qorong‘i (Dark) rejimlarni almashtirish (toggle) imkoniyati bilan toza, Manrope shriftidagi akademik dashboard.
> - **Funksional qamrov**: Asl platformaning barcha asosiy sahifalari va interaktiv imkoniyatlari (Bosh sahifa, Reyting, O‘quvchilar, Yutuqlar, Viktorinalar/Zakovat, Tadbirlar, To‘garaklar, E’lonlar, Davomat, Takliflar qutisi, Sardorlar saylovi va Statistika).

---

## 1. Umumiy tavsif va loyiha konsepsiyasi

- **Loyiha maqsadi**: Ixtisoslashtirilgan maktablar va litseylarda "House system" (Fakultetlar/Uylar tizimi) orqali o'quvchilar o'rtasida sog'lom raqobat, jamoaviylik, akademik yutuqlar, sport va madaniy faollikni rag'batlantirish.
- **Asosiy mantiq (Gamification & Point Economy)**:
  - Har bir ijobiy faoliyat (fan olimpiadalari, kitobxonlik tanlovi, robototexnika loyihalari, to'garaklardagi faollik, maktabga ko'ngilli ko'mak) fakultet jamg'armasiga ballar (+15, +20, +25, +30 ball) qo'shadi.
  - Namunaviy intizom qoidalari va kechikishlar fakultetdan ball ayirilishiga sabab bo'ladi (-5 ball), bu esa o'quvchilarda jamoaviy mas'uliyatni shakllantiradi.
  - Haftalik, oylik va yillik reytinglar dinamik tarzda yangilanadi va fakultetlar o'rtasidagi farqlar ("Yetakchigacha X ball") ko'rsatiladi.

---

## 2. Foydalanuvchi tajribasi (UX) va Vizual Dizayn

### A. Vizual o'ziga xoslik va Mavzu
- **Shriftlar**: Manrope (asosiy sarlavha va matnlar uchun) + tabular raqamlar (`tabular-nums`, `font-mono`) ballar, sanalar va statistikalar uchun.
- **Ranglar palitrasi (60-30-10 qoidasi)**:
  - *Light rejim*: Oq va yumshoq och kulrang fon (`#FAFAFA` / `#F4F5F7`), nozik hoshiyalar (`border-slate-200`), to'q kulrang matnlar (`#0F172A`).
  - *Dark rejim*: To'q grafit/slate fon (`#0B0F17` / `#111827`), yumshoq kontrast yuzalar (`#1F2937`), oqish matnlar (`#F9FAFB`).
  - *Fakultetlar rang kodlari*:
    - **BLUE**: `#2563EB` (Ko‘k fakultet — chuqur bilim va intellekt)
    - **GREEN**: `#16A34A` (Yashil fakultet — o‘sish, tabiat va ekologiya)
    - **WHITE**: `#64748B` / `#94A3B8` (Oq fakultet — soflik, adolat va halollik)
    - **RED**: `#DC2626` (Qizil fakultet — shijoat, yetakchilik va g'alaba)
- **Zero-Pill intizomi**: Metama'lumotlar ortiqcha tabletka/kapsula ramkalarisiz, toza matn va `·` yoki `/` ajratgichlar bilan beriladi.
- **Sidebar va Navigatsiya**:
  - Yig'iladigan (collapsible) zamonaviy chap menyu: Maktab brendi, filial tanlovi, asosiy menyu bo'limlari, o'quv yili (2026–2027) va profil vidjeti.
  - Yuqori panel: Qidiruv (`⌘ K`), Tezkor ball qo'shish tugmasi, Dark/Light rejim tugmasi va joriy foydalanuvchi ma'lumotlari.

### B. Asosiy foydalanuvchi oqimlari (Key User Flows)
1. **Bosh sahifa (Dashboard)**:
   - Shaxsiy salomlashuv: "Salom, Muhammad! Bugungi kichik yutuq — fakultetingizning katta g‘alabasi."
   - Fakultetlar reytingi kartalari (1–4-o'rinlar, joriy ball, haftalik o'zgarish, yetakchigacha masofa).
   - Bugungi maktab statistikasi (Jami o‘quvchilar, faol to‘garaklar, oylik yutuqlar, tadbirlar soni).
   - Oxirgi yutuqlar tasmasi (avalar, sinf, tadbir nomi, berilgan ball).
   - Yaqinlashayotgan tadbirlar va e'lonlar.
   - Ball o‘zgarishlari tarixi (ijobiy va intizomiy yozuvlar).
2. **Reyting sahifasi (`/reyting`)**:
   - Vaqt bo'yicha filtrlash: Bu hafta, Bu oy, Chorak, Butun mavsum.
   - Kategoriya bo'yicha taqsimot: Olimpiadalar, Sport, Ijod, To'garaklar, Intizom.
3. **O‘quvchilar sahifasi (`/oquvchilar`)**:
   - Qidiruv va fakultet / sinf (8, 9, 10, 11) bo'yicha filtrlash.
   - O'quvchi kartasi yoki jadvali, to'plagan shaxsiy ballari va olgan sertifikatlari.
4. **Yutuqlar va Ball berish modali (`/yutuqlar`)**:
   - Yutuqlar arxivi, yangi yutuq kiritish (o'quvchini tanlash, kategoriya, asoslash va fakultetga ball qo'shish).
5. **Interaktiv Viktorinalar (`/viktorinalar`)**:
   - Zakovat / Fan viktorinasi o'yini: test savollari, fakultetlararo bellashuv va ball to'plash.
6. **Tadbirlar va To‘garaklar (`/tadbirlar`, `/togaraklar`)**:
   - Robototexnika, Sun'iy intellekt, Matematika to'garaklari jadvali, murabbiylar va a'zo bo'lish imkoniyati.
7. **Sardorlar saylovi (`/saylov`) & Takliflar qutisi (`/takliflar`)**:
   - Fakultet sardorligiga nomzodlar, ularning dasturlari va ovoz berish jarayoni.
   - O'quvchilarning maktab hayotini yaxshilash bo'yicha takliflari va ovozlar soni.

---

## 3. Mahsulot bo'yicha qarorlar va Tanlovlar

- **Mahalliy holat va Saqlash**: `localStorage` orqali saqlash — foydalanuvchi yangi yutuq qo'shganda, viktorina yechganda, taklif yozganda yoki sardorga ovoz berganda ma'lumotlar brauzerda real saqlanadi va jonli qayta hisoblanadi.
- **Tezkor filtrlash va Qidiruv**: Barcha ro'yxatlar (o'quvchilar, yutuqlar, e'lonlar, tadbirlar) bir zumda sinf, fakultet va matn bo'yicha filtrlanadi.
- **Tezkor rol almashtirish**: O'quvchi (Muhammad Aliyev, 9-blue) yoki Hakam/O'qituvchi rejimiga o'tish orqali ball qo'shish imkoniyati.

---

## 4. Texnik arxitektura va Ma'lumotlar modeli

```
┌────────────────────────────────────────────────────────────────────────┐
│                          FacultyScore Shell                            │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │     AppSidebar          │  │              AppHeader              │  │
│  │ ─────────────────────── │  │ ─────────────────────────────────── │  │
│  │ • Brand & Maktab tanlovi│  │ • ⌘ K Qidiruv                       │  │
│  │ • Asosiy menyu (11 link)│  │ • Dark/Light Toggle                 │  │
│  │ • O'quv yili (26-27)    │  │ • Ball qo'shish tezkor tugmasi      │  │
│  │ • Yig'ish (collapse)    │  │ • Foydalanuvchi profili             │  │
│  └─────────────────────────┘  └─────────────────────────────────────┘  │
│                               ┌─────────────────────────────────────┐  │
│                               │         Asosiy Ko'rinish            │  │
│                               │  • Bosh sahifa (Dashboard)          │  │
│                               │  • Reyting (Leaderboard & Charts)   │  │
│                               │  • O'quvchilar & Sinf jurnali       │  │
│                               │  • Yutuqlar & Yangi ball kiritish   │  │
│                               │  • Viktorina / Zakovat arenasi      │  │
│                               │  • Tadbirlar & To'garaklar          │  │
│                               │  • Saylov & Takliflar tizimi        │  │
│                               └─────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Ma'lumotlar tuzilishi:
1. `Faculty`: `id` ('blue'|'green'|'white'|'red'), `name`, `score`, `weeklyChange`, `lastAchievementPoints`, `colorClass`.
2. `Student`: `id`, `name`, `grade`, `facultyId`, `score`, `achievementsCount`, `avatar`.
3. `Achievement`: `id`, `studentId`, `facultyId`, `title`, `reason`, `points`, `date`, `category`.
4. `Event`: `id`, `title`, `date`, `time`, `location`, `category`.
5. `Club`: `id`, `title`, `teacher`, `schedule`, `description`, `membersCount`.
6. `ElectionCandidate`: `id`, `name`, `facultyId`, `motto`, `votesCount`, `photo`.

---

## 5. Bosqichma-bosqich bajarish rejasi

1. **Dizayn tizimi va poydevor**:
   - Manrope shrifti, Tailwind rang o'zgaruvchilari va Dark/Light rejim sinflarini sozlash.
   - `metadata.json` va `index.html` sarlavhalarini yangilash.
2. **Ma'lumotlar modeli va Mock ma'lumotlar**:
   - Abu Ali ibn Sino maktabi, 4 fakultet, o'quvchilar, namunaviy ballar tarixi va to'garaklar ma'lumotlarini yaratish (`src/data/mockData.ts`).
3. **Sidebar va Header komponentlari**:
   - Asl saytdagi kabi mukammal brending, maktab tanlovi, ikonlar va navigatsiya holatlari.
4. **Bosh sahifa (Dashboard)**:
   - Fakultetlar reytingi kartalari, kun statistikasi, so'nggi yutuqlar, e'lonlar, yaqin tadbirlar va ball tarixi.
5. **Qo'shimcha sahifalar va modullar**:
   - Reyting sahifasi (batafsil filtrlash bilan).
   - O'quvchilar katalogi.
   - Yangi yutuq va ball qo'shish modali (ball hisobini dinamik o'zgartiradi).
   - Zakovat interaktiv viktorinasi.
   - Sardorlar saylovi va takliflar qutisi.
6. **Sifat nazorati va test**:
   - `compile_applet` orqali xatolarsiz yig'ilishini tekshirish.
