from pynamodb.attributes import ListAttribute, UnicodeAttribute
from pynamodb.models import Model

from api.core.config import Settings, get_settings

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
