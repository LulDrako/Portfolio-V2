# Portfolio V2

## 🛠️ Technologies utilisées

- **🖥️ Framework** : [Next.js (App Router)](https://nextjs.org/)
- **⚛️ Bibliothèque** : [React](https://react.dev/)
- **📘 Langage** : [TypeScript](https://www.typescriptlang.org/)
- **🎨 CSS Framework** : [Tailwind CSS](https://tailwindcss.com/)
- **🌐 Internationalisation (i18n)** : [next-intl](https://next-intl-docs.vercel.app/) avec structure locale/ et JSON de traductions
- **🌈 Animation Parallax** : [react-parallax-tilt](https://www.npmjs.com/package/react-parallax-tilt)
- **🌀 Vortex Modal** : Design custom animé avec effet glow + tilt 3D

---

## 📂 Structure du projet

```
Portfolio-V2/
│── app/                # Pages (Next.js App Router + Layout)
│   └── [locale]/       # Gestion des langues (i18n via next-intl)
│── components/         # Composants réutilisables (Navbar, Hero, VortexModal, etc.)
│── hooks/              # Hooks personnalisés
│── lib/                # Données, config i18n et messages de traduction
│   └── i18n/
│   └── messages/
│       ├── fr.json     # Traductions FR
│       └── en.json     # Traductions EN
│── public/             # Images, icônes, fichiers statiques
│── .eslintrc.json      # Linting config
│── next.config.ts      # Config Next.js (TS)
│── package.json        # Dépendances
│── tailwind.config.ts  # Config Tailwind CSS
│── tsconfig.json       # Config TypeScript
```

---

## 🚀 Installation et démarrage

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/LulDrako/Portfolio-V2.git
cd Portfolio-V2
```

### 2️⃣ Installer les dépendances

```bash
npm install
# ou
yarn install
```

### 3️⃣ Lancer en développement

```bash
npm run dev
# ou
yarn dev
```

➡️ Accessible à : **http://localhost:3000**

### 4️⃣ Build production

```bash
npm run build
```

---

## ✨ Fonctionnalités

- 🌐 **Internationalisation (fr/en)** via `next-intl`
- 🌀 **Vortex Modal** animé avec Tilt & effets lumineux
- 🌗 **Dark / Light mode** supporté
- 💨 **Performance** optimisée avec Next.js App Router
- 🎨 **Design responsive & animations custom**
- 🧼 **Code maintenable** en TypeScript

---

## 🔄 Ancienne version

👉 [Portfolio V1](https://luldrako.vercel.app/)

---

## 📜 Licence

Ce projet est sous licence MIT.

---

📬 **Me contacter :**  
[LinkedIn](https://www.linkedin.com/in/karim-feki-18ab66249/)  
[GitHub](https://github.com/LulDrako)
