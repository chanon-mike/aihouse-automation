import logging

from pynamodb.attributes import ListAttribute, UnicodeAttribute
from pynamodb.models import Model

from api.config import Settings, get_settings

settings: Settings = get_settings()


class UserModel(Model):
    class Meta:
        table_name = "User"
        region = settings.AWS_REGION
        aws_access_key_id = settings.AWS_KEY
        aws_secret_access_key = settings.AWS_SECRET
        if settings.STAGE == "local":
            host = "http://localhost:8000"

    id = UnicodeAttribute(hash_key=True, null=False)
    email = UnicodeAttribute(null=False)
    name = UnicodeAttribute(null=False)
    room = UnicodeAttribute(null=False)
    reservations = ListAttribute()


def create_table_if_not_exist():
    """
    Will creates the table if not exists
    @return: True/False
    """
    if not UserModel.exists():
        try:
            UserModel.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)
        except Exception as e:
            logging.error(str(e))
            return False
    return True
