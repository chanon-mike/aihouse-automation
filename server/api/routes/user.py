from typing import List

from fastapi import APIRouter, Body, Depends

import api.repos.reservation as reservation_repo
import api.repos.user as user_repo
from api.models.payload import Payload
from api.models.user import User
from api.security.dependencies import verify_token

router = APIRouter(tags=["User"])


@router.get("/user")
def get_all_user():
    """Get all user objects from the database"""
    return user_repo.get_all_users()


@router.post("/user")
def post_user(user: User = Body(...)):
    """Create a user object to the database"""
    return user_repo.create_user(user)


@router.get("/user/{user_id}")
def get_user(user_id: str, token: Payload = Depends(verify_token)):
    """Get a user object from the database"""
    return user_repo.get_user_by_id(user_id)


@router.put("/user/{user_id}/reservation")
def update_user_reservation(
    user_id: str,
    reservation_date: List[str] = Body(...),
    token: Payload = Depends(verify_token),
):
    """Update a user's reservation dates"""
    return reservation_repo.update_user_reservation(user_id, reservation_date)


@router.delete("/user/{user_id}")
def delete_user(user_id: str, token: Payload = Depends(verify_token)):
    """Delete a user object from the database"""
    return user_repo.delete_user(user_id)
