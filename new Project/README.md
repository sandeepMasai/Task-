# Travel Places Explorer (TravelVerse)

A modern, beginner-friendly **React + Tailwind** travel app built as an
internship-ready portfolio project. Browse curated destinations, save
favourites, view interactive maps and plan trip budgets — with a polished
glassmorphism UI and dark / light themes.

## ✨ Features

- 🌍 **Explore** 12 curated destinations with images, ratings & details
- 🔎 **Search**, **filter** (category, price), **sort** (rating, price, name)
- ❤️ **Save favourites** with localStorage persistence
- 🗺️ **Interactive Leaflet maps** with markers per destination
- 💰 **Budget Planner** with live breakdown chart
- 🌙 **Dark / Light** theme via Context API (system-aware)
- 📱 Fully **responsive** mobile-first design
- 🌐 Live country info via REST Countries API (Axios)
- 🔔 Toast notifications, loading skeletons, smooth Framer Motion animations

## 🧠 React concepts demonstrated

| Hook / API     | Where it is used                                                      |
| -------------- | --------------------------------------------------------------------- |
| `useState`     | Search query, filters, theme, budget inputs                           |
| `useEffect`    | Theme sync, fetching country info, simulated loading                  |
| `useRef`       | "Focus Search" button on Explore page                                 |
| `useMemo`      | Filtered/searched places, total saved budget, breakdown               |
| `useCallback`  | `savePlace`, `removePlace`, `toggleTheme`                             |
| `useContext`   | Theme, Saved Places, Toast providers                                  |
| `React.memo`   | `PlaceCard` component                                                 |
| `useParams`    | Dynamic `/places/:placeId` route                                      |
| `useNavigate`  | Hero search redirect, "Back" button                                   |

## 🗂️ Folder structure

```
src/
├── components/      Reusable UI (Navbar, Footer, PlaceCard, MapView…)
├── pages/           Route pages (Home, Explore, PlaceDetails…)
├── context/         Theme, SavedPlaces, Toast providers
├── data/            Static places dataset
├── hooks/           Custom hooks (useDebounce)
├── routes/          Centralised route config
├── utils/           Helpers (api.js, format.js)
├── App.jsx
└── main.jsx
```

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

## 🔑 Optional API keys

Some integrations require free API keys. Create a `.env` file at the project
root with:

```
VITE_OPENWEATHER_KEY=your_openweather_key
```

The app falls back gracefully if no keys are provided.

## 🛠️ Tech stack

React 18 · React Router 6 · Tailwind CSS 3 · Framer Motion · Leaflet ·
React-Leaflet · Axios · React Icons · Vite.

---

Built for learning. Customise, extend and ship it. ✈️
