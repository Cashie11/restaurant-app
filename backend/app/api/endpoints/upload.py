from fastapi import APIRouter, UploadFile, File, HTTPException, Request, Depends
import shutil
import os
import uuid

from app.api.deps import get_current_admin_user
from app.models.user import User

router = APIRouter()

UPLOAD_DIR = "app/static/uploads"

# Ensure upload directory exists
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/", response_model=dict)
async def upload_image(
    request: Request,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_admin_user),
):
    """
    Upload an image file and return its URL. (Admin only)
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

        # Build a full URL using the request's base URL so the frontend can
        # load the image regardless of host/port (works locally and in Docker).
        base_url = str(request.base_url).rstrip("/")
        url = f"{base_url}/static/uploads/{unique_filename}"

        return {"url": url, "filename": unique_filename}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")
