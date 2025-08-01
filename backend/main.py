from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # allow GET, POST, OPTIONS
    allow_headers=["*"],  # allow all headers
)

class RecipeRequest(BaseModel):
    height: float
    weight: float
    requiredIngredient: str
    estimatedTime: int
    numResults: int
    
@app.get("/")
async def root():
    return {"message": "NutriGenius Backend is running!"}

@app.post("/recommend")
async def recommend(data: RecipeRequest):
    print("Received data: ", data.dict())
    return{
        "message": "Data received successfully!",
        "received_data": data.dict()
    }