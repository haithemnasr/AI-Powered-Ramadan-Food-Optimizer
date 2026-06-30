# 🌙 B9atlek (بقاتلك) — AI-Powered Ramadan Food Optimizer

> **"بقاتلك؟"** — *"What do you have left?"* — A question asked every night in Tunisian kitchens, now the starting point of a smarter, greener Ramadan.

B9atlek is a Progressive Web App (PWA) that uses AI to help Tunisian families reduce food waste during Ramadan. You input what you cooked today and what leftovers you have — the AI responds in **Tunisian Darja** with authentic recipes, storage tips, and a real-time estimate of food and money saved.

---

## ✨ Key Features

- 🤖 **AI Recipe Suggestions** — Powered by Google Gemini 2.5 Flash, responding entirely in Tunisian dialect
- 🎤 **Voice Input** — Speak your leftovers in Arabic/Tunisian (ar-TN) via the Web Speech API
- 📅 **Ramadan Calendar** — Interactive 30-day Islamic calendar with decade info (Mercy / Forgiveness / Liberation), powered by the AlAdhan API
- 📊 **Impact Dashboard** — Real-time stats: kg of food saved, CO₂ avoided, and Tunisian dinars recovered
- 📱 **PWA** — Installable on any phone like a native app, with partial offline support
- 🎨 **Immersive Ramadan UI** — Shooting stars, lanterns, glassmorphism, gold/night palette, full RTL layout

---

## 📁 Project Structure

```
AI-Powered-Ramadan-Food-Optimizer/
│
├── backend/                  # FastAPI server + Gemini AI integration
│   ├── main.py               # API routes (/, /optimize, /health)
│   ├── ai.py                 # Google Gemini prompt engineering
│   ├── requirements.txt      # Python dependencies
│   ├── .env.example          # API key template
│   └── README.md             # Backend setup guide
│
├── frontend/                 # Vanilla HTML/CSS/JS client
│   ├── index.html            # Main app page
│   ├── style.css             # Ramadan-themed design system
│   ├── script.js             # Voice input, calendar, stats logic
│   ├── manifest.json         # PWA configuration
│   ├── sw.js                 # Service worker (offline caching)
│   ├── icon-192.png          # PWA icon (192×192)
│   └── icon-512.png          # PWA icon (512×512)
│
├── documentation/            # Project docs and guides
│   ├── FEATURES_README.md    # Full feature breakdown + demo script
│   ├── ICONS_README.md       # How to create/generate PWA icons
│
├── .gitignore
└── README.md                
```

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/haithemnasr/AI-Powered-Ramadan-Food-Optimizer.git
cd AI-Powered-Ramadan-Food-Optimizer
```

### 2. Start the Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Then add your Gemini API key inside .env
uvicorn main:app --reload --port 8000
```

> Get your **free** Gemini API key at: https://makersuite.google.com/app/apikey — no credit card needed.

### 3. Start the Frontend

```bash
cd ../frontend
python -m http.server 8080
```

### 4. Open the App

- **Browser:** http://localhost:8080
- **Mobile (same network):** http://[your-local-IP]:8080

---

## 🧠 How the AI Works

When a user submits today's meal and their leftovers, the backend builds a structured prompt that instructs Gemini to act as a Tunisian culinary expert. The prompt enforces strict rules:

- No repeating the main dish from today
- Leftovers are used as sides/accompaniments only
- New main dish must be varied and authentic
- Response must be in Tunisian Darja (not MSA)
- Output follows a fixed 4-section format: suggestions, waste alerts, storage tips, estimated savings

This required ~15 prompt iterations to stabilize. See [`backend/ai.py`](backend/ai.py) for the full prompt.

---

## 📡 API Endpoints

| Method | Endpoint    | Description                              |
|--------|-------------|------------------------------------------|
| GET    | `/`         | API info and status                      |
| POST   | `/optimize` | Generate AI suggestions from leftovers   |
| GET    | `/health`   | Health check                             |

**POST `/optimize` example:**
```json
{
  "today": "كسكسي، شوربة",
  "leftovers": "صحن كسكسي، دجاج"
}
```

---

## 💰 Cost

**100% free to run:**
- Google Gemini API — 15 req/min, 1,500 req/day, no credit card
- AlAdhan Islamic Calendar API — unlimited, no key required
- Web Speech API — built into the browser

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | HTML5, CSS3, Vanilla JS ES6+, PWA   |
| Backend   | Python 3.8+, FastAPI, Uvicorn       |
| AI        | Google Gemini 2.5 Flash             |
| Calendar  | AlAdhan REST API                    |
| Voice     | Web Speech API (ar-TN)              |
| Storage   | Browser LocalStorage                |

---

## 📊 Estimated Impact (1,000 users × 1 Ramadan)

| Metric             | Value              |
|--------------------|--------------------|
| Food rescued       | ~8,250 kg          |
| CO₂ avoided        | ~20,600 kg         |
| Money saved        | ~66,000 TND        |

---

## 📚 Documentation

- [`documentation/FEATURES_README.md`](documentation/FEATURES_README.md) — Full feature guide + jury demo script
- [`documentation/ICONS_README.md`](documentation/ICONS_README.md) — How to generate PWA icons
- [`backend/README.md`](backend/README.md) — Detailed backend setup and troubleshooting

---

## 🔒 Security Notes

- Your Gemini API key goes in `backend/.env` — never commit this file (it's in `.gitignore`)
- All user data stays local (LocalStorage) — nothing is stored server-side
- API calls to Gemini are anonymous (no user tracking)

---

## 🌍 Future Plans

- [ ] User accounts + cross-device sync
- [ ] Fridge scanning via computer vision
- [ ] Weekly meal planning + shopping list generation
- [ ] WhatsApp sharing of suggestions
- [ ] Expansion to Morocco, Algeria, Egypt (localized dialects)
- [ ] Freemium model (5 TND/month for unlimited suggestions)

---

## 👤 Author

**Nasr Haithem** — ICT Engineering Student at National Engineering School of Sousse (Eniso)
Academic year: 2025–2026

---

*B9atlek transforms the daily question "شنو بقا؟" (what's left?) from a source of waste into an opportunity for creativity, savings, and sustainability.*
