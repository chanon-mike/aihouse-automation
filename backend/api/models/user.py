# from datetime import datetime
from pynamodb.attributes import (
    ListAttribute,
    UnicodeAttribute,
    # UTCDateTimeAttribute,
    # JSONAttribute,
    # BooleanAttribute,
)
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

    id = UnicodeAttribute(hash_key=True)
    email = UnicodeAttribute(null=False)
    name = UnicodeAttribute(null=False)
    room = UnicodeAttribute(null=False)
    reservations = ListAttribute()

    # birthday = UTCDateTimeAttribute(null=True)
    # gender = UnicodeAttribute(null=True)
    # country = UnicodeAttribute(null=True)
    # hobby = UnicodeAttribute(null=True)
    # bio = UnicodeAttribute(null=True)
    # social_medias = JSONAttribute(null=True)
    # student_status = UnicodeAttribute(null=True)
    # is_public = BooleanAttribute(null=False, default=False)

    # stayed_from = UTCDateTimeAttribute(null=True)
    # stayed_until = UTCDateTimeAttribute(null=True)
    # created_at = UTCDateTimeAttribute(null=False, default=datetime.now())
    # updated_at = UTCDateTimeAttribute(null=False, default=datetime.now())
