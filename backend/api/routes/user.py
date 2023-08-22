from fastapi import APIRouter, Depends

import api.repos.reservation as reservation_repo
import api.repos.user as user_repo
from api.schemas.payload import Payload
from api.schemas.user import User
from api.core.dependencies import verify_token

router = APIRouter(tags=["User"])


@router.get("/user", response_model=list[User])
def get_all_user():
    """Get all user objects from the database"""
    return user_repo.get_all_users()


@router.post("/user", response_model=User)
def post_user(user: User):
    """Create a user object to the database"""
    return user_repo.create_user(user)


@router.get("/user/{user_id}", response_model=User)
def get_user(user_id: str, token: Payload = Depends(verify_token)):
    """Get a user object from the database"""
    return user_repo.get_user_by_id(user_id)


@router.patch("/user/{user_id}", response_model=User)
def update_user(user_id: str, user: User, token: Payload = Depends(verify_token)):
    """Update a user object from the database"""
    return user_repo.update_user(user_id, user)


@router.get("/user/{user_id}/reservation", response_model=list[str])
def get_reservation_date(user_id: str, token: Payload = Depends(verify_token)):
    """Get a user's reservation dates"""
    return reservation_repo.get_reservation_date(user_id)


@router.patch("/user/{user_id}/reservation", response_model=list[str])
def update_user_reservation(
    user_id: str,
    reservation_date: list[str],
    token: Payload = Depends(verify_token),
):
    """Update a user's reservation dates"""
    return reservation_repo.update_user_reservation(user_id, reservation_date)


@router.delete("/user/{user_id}")
def delete_user(user_id: str, token: Payload = Depends(verify_token)):
    """Delete a user object from the database"""
    return user_repo.delete_user(user_id)
