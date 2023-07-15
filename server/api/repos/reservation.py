import logging

from fastapi import HTTPException

from api.models.db import UserModel


def update_user_reservation(user_id: str, reservation_date: str):
    """Update a user's reservation dates"""
    try:
        user = UserModel.get(user_id)
        user.update(actions=[UserModel.reservations.set(reservation_date)])

        return user.attribute_values
    except UserModel.DoesNotExist:
        logging.error("User does not exist.")
        raise HTTPException(status_code=404, detail="user_not_found")
