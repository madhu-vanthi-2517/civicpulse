from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.auth import ALGORITHM, SECRET_KEY
from app.database import SessionLocal
from app.models import User


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
        email = payload.get("sub")
        if not isinstance(user_id, int) or not isinstance(email, str):
            raise unauthorized
    except JWTError as exc:
        raise unauthorized from exc

    db = SessionLocal()
    try:
        user = db.query(User).filter(
            User.id == user_id,
            User.email == email,
        ).first()
    finally:
        db.close()

    if user is None:
        raise unauthorized
    return user


def require_citizen(current_user: User = Depends(get_current_user)) -> User:
    if (current_user.role or "").strip().lower() != "citizen":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Citizen access is required",
        )
    return current_user


def require_authority(current_user: User = Depends(get_current_user)) -> User:
    if (current_user.role or "").strip().lower() not in {"authority", "admin"}:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Authority access is required",
        )
    return current_user
