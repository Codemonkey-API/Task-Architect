from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI app
app = FastAPI(
    title="Task Architect API",
    description="Backend for a distributed task system",
    version="1.0.0"
)

# Configure CORS - Essential for React to talk to Python
origins = [
    "http://localhost:5173", # Standard Vite port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    """Returns a simple welcome message."""
    return {
        "message": "Welcome to Task Architect API",
        "docs": "/docs",
        "status": "online"
    }
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",  # React is looking for 'version'
        "uptime": "stable"   # React is looking for 'uptime'
    }