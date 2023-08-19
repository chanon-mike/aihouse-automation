from typing import List

from pydantic import BaseModel


class User(BaseModel):
    id: str
    email: str
    name: str
    room: str
    reservations: List[str]
