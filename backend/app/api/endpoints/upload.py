from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uuid
from typing import List

router = APIRouter()

UPLOAD_DIR = "app/static/uploads"

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=dict)
async def upload_image(file: UploadFile = File(...)):
    """
    Upload an image file and return its URL.
    """
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    try:
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Construct URL (assuming mounting at /static)
        # In production, this might need to be a full URL depending on setup, 
        # but relative path or path from root is usually fine if frontend handles domain
        # or we return full URL if we know the domain. For now, relative to API root.
        
        # We'll return the full URL assuming localhost:8000 for now, or relative path
        # Better to return a path that the frontend can use.
        # If we mount /static at /static, then URL is /static/uploads/filename
        
        url = f"http://localhost:8000/static/uploads/{unique_filename}"
        
        return {"url": url, "filename": unique_filename}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")
