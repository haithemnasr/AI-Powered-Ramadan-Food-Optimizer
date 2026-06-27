from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai import generate_suggestions

app = FastAPI(title="B9itlek API", description="Ramadan Food Optimizer API")

# Add CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    today: str
    leftovers: str

@app.get("/")
def root():
    return {
        "message": "B9itlek API - Ramadan Food Optimizer",
        "status": "running",
        "endpoints": {
            "POST /optimize": "Get AI-powered food suggestions based on leftovers"
        }
    }

@app.post("/optimize")
def optimize(data: UserInput):
    """
    Generate AI-powered food suggestions based on what was prepared today and leftovers
    """
    if not data.today and not data.leftovers:
        return {
            "error": "Please provide either today's food or leftovers",
            "suggestions": "🙏 رجاءً اكتب شنو حضرت اليوم ولا شنو بقا من الماكلة."
        }
    
    result = generate_suggestions(data.today, data.leftovers)
    return {"suggestions": result}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "B9itlek API"}