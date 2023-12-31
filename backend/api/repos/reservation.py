import logging
from typing import List

from fastapi import HTTPException

from api.models.db import UserModel


def get_reservation_date(user_id: str):
    """Get a user's reservation dates"""
    try:
        user = UserModel.get(user_id)
        logging.info(f"User {user_id} reservation retrieved.")

        return user.reservations
    except UserModel.DoesNotExist:
        logging.error("User does not exist.")
        raise HTTPException(status_code=404, detail="user_not_found")


def update_user_reservation(user_id: str, reservation_date: List[str]):
    """Update a user's reservation dates"""
    try:
        user = UserModel.get(user_id)
        user.update(actions=[UserModel.reservations.set(reservation_date)])
        logging.info(f"User {user_id} reservation updated.")

        return user.attribute_values
    except UserModel.DoesNotExist:
        logging.error("User does not exist.")
        raise HTTPException(status_code=404, detail="user_not_found")
