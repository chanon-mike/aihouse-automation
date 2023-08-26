import logging

from fastapi import HTTPException

from api.models.user import UserModel
from api.schemas.user import UserAccount as UserAccountSchema


def get_all_users() -> list[UserModel]:
    """Get all user objects from the database"""
    users = UserModel.scan()
    return users


def get_user_by_id(user_id: str) -> UserAccountSchema:
    """Get a user object from the database"""
    try:
        user = UserModel.get(user_id)
        return user.attribute_values
    except UserModel.DoesNotExist:
        logging.error("User does not exist.")
        raise HTTPException(status_code=404, detail="user_not_found")


def create_user(user: UserAccountSchema) -> UserAccountSchema:
    """Create a user object to the database"""
    created_user = UserModel(user.id)
    created_user.email = user.email
    created_user.name = user.name
    created_user.room = user.room
    created_user.reservations = []

    created_user.save()
    return created_user


def update_user(user_id: str, user: UserAccountSchema) -> UserAccountSchema:
    """Update a user object from the database"""
    try:
        updated_user = UserModel.get(user_id)
        updated_user.email = user.email
        updated_user.name = user.name
        updated_user.room = user.room

        updated_user.save()
        return updated_user.attribute_values
    except UserModel.DoesNotExist:
        logging.error("User does not exist.")
        raise HTTPException(status_code=404, detail="user_not_found")


def delete_user(user_id: str) -> UserAccountSchema:
    """Delete a user object from the database"""
    try:
        user = UserModel.get(user_id)
        user.delete()
        return user.attribute_values
    except UserModel.DoesNotExist:
        logging.error("User does not exist.")
        raise HTTPException(status_code=404, detail="user_not_found")
