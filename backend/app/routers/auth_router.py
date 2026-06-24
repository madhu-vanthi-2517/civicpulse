import os
from fastapi import HTTPException
from app.database import SessionLocal
from app.models import User


@router.put("/make-admin/{email}")
def make_admin(email: str, secret: str):
    if secret != os.getenv("SECRET_KEY"):
        raise HTTPException(status_code=403, detail="Not allowed")

    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.role = "admin"
        db.commit()

        return {
            "message": "User role updated to admin",
            "email": user.email,
            "role": user.role
        }
    finally:
        db.close()