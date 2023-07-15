import logging

from fastapi import HTTPException

from api.models.db import UserModel
from api.models.user import User


def create_user(user: User):
    """Create a user object to the database"""
    try:
        created_user = UserModel(user.id)
        created_user.email = user.email
        created_user.name = user.name
        created_user.room = user.room
        created_user.reservations = user.reservations

        created_user.save()
        return created_user
    except Exception as e:
        logging.error(str(e))


def get_all_users():
    """Get all user objects from the database"""
    try:
        users = UserModel.scan()
        return users
    except Exception as e:
        logging.error(str(e))


def get_user_by_id(user_id: str):
    """Get a user object from the database"""
    try:
        user = UserModel.get(user_id)
        logging.info(user)
        return user.attribute_values
    except UserModel.DoesNotExist:
        logging.error("User does not exist.")
        raise HTTPException(status_code=404, detail="user_not_found")


def delete_user(user_id: str):
    """Delete a user object from the database"""
    try:
        user = UserModel.get(user_id)
        user.delete()
        return user.attribute_values
    except UserModel.DoesNotExist:
        logging.error("User does not exist.")
        raise HTTPException(status_code=404, detail="user_not_found")
