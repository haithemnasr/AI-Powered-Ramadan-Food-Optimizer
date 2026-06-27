# B9itlek Backend - AI-Powered Ramadan Food Optimizer 🌙

AI assistant that helps Tunisian families reduce food waste during Ramadan by suggesting recipes based on leftovers.

## 🆓 Using FREE Google Gemini API!

This project uses **Google Gemini API** which is **completely FREE** with generous limits!

## 🚀 Setup Instructions

### 1. Get Your FREE API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy your API key

**That's it! No credit card needed! 🎉**

### 2. Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Mac/Linux)
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Setup API Key
1. Create a `.env` file in the backend folder:
```bash
cp .env.example .env
```
2. Edit `.env` and add your FREE Gemini API key:
```
GEMINI_API_KEY=your-actual-key-here
```

### 5. Run the Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

## 📡 API Endpoints

### `GET /`
Returns API info and status

### `POST /optimize`
Generate AI suggestions based on leftovers

**Request body:**
```json
{
  "today": "كسكسي، شوربة",
  "leftovers": "صحن كسكسي، دجاج"
}
```

**Response:**
```json
{
  "suggestions": "AI generated suggestions in Tunisian Darja..."
}
```

### `GET /health`
Health check endpoint

## 🧠 AI Features

✅ Generates personalized recipes using leftovers
✅ Detects potential food waste
✅ Provides storage and preservation tips
✅ Estimates waste reduction in kg
✅ Responds in authentic Tunisian Darja
✅ Suggests traditional Tunisian dishes

## 🛠️ Tech Stack

- **FastAPI**: Modern Python web framework
- **Google Gemini**: FREE AI for generating suggestions
- **Python-dotenv**: Environment variable management
- **Uvicorn**: ASGI server

## 💰 Cost

**100% FREE!** 🎉
- Google Gemini API is completely free
- 15 requests per minute
- 1500 requests per day
- No credit card required

## 📝 Notes

- The AI uses Gemini 1.5 Flash, which is fast and good at understanding Arabic
- API is completely free for personal projects
- Perfect for students and developers

## 🔒 Security

- Never commit your `.env` file
- Add `.env` to your `.gitignore`
- Keep your API keys private

## 💡 Future Improvements

- [ ] Add user accounts and history
- [ ] Track waste reduction statistics per user
- [ ] Add voice input support
- [ ] Multi-language support (French, English)
- [ ] Meal planning for the whole week
- [ ] Mobile app version

## ❓ Troubleshooting

**Error: "API key not found"**
- Make sure you created `.env` file
- Check that `GEMINI_API_KEY=` has your actual key
- No quotes needed around the key

**Error: "Module not found"**
- Run: `pip install -r requirements.txt`
- Make sure virtual environment is activated

**Frontend can't connect**
- Make sure backend is running on port 8000
- Check CORS is enabled in main.py