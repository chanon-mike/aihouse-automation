from datetime import date, datetime
from typing import List

from pydantic import BaseModel


class UserAccount(BaseModel):
    id: str
    email: str
    name: str
    room: str


class UserReservation(UserAccount):
    reservations: List[str]


class UserProfile(UserAccount):
    birthday: date
    gender: str
    country: str
    hobby: str
    bio: str
    social_medias: dict
    student_status: str
    is_public: bool

    stayed_from: date
    stayed_until: date
    created_at: datetime
    updated_at: datetime
