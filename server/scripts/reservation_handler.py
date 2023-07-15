import datetime
import logging
import requests

import api.repos.user as user_repo
from api.config import Settings, get_settings

settings: Settings = get_settings()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def reserve_dinner(user, date):
    """
    Reserve a date for a user.
    """
    try:
        if datetime.datetime.strptime(date, "%Y-%m-%d").date() != datetime.datetime.now().date():
            return

        logger.info(f"User {user.name} has a reservation today! Date: {date}")
        if settings.ENV == "dev":
            url = (
                "https://docs.google.com/forms/d/"
                "1FuoWmx0xPkorwx4vaX9bUcFSUCzbkdKnt3vn5NAf9pw/formResponse"
            )
            form_data = {
                "entry.218414735": user.room,
                "entry.1464116213": user.name,
                "entry.1849050919": date,
            }
        else:
            url = (
                "https://docs.google.com/forms/d/e/"
                "1FAIpQLSd14yq1hROVw4VX5g38JBcxUdjLKPugGD2hWRKu3wsVQiWqDQ/formResponse"
            )
            form_data = {
                "entry.1988794669": user.room,
                "entry.2135268448": user.name,
                "entry.1785016385": date,
            }
        requests.post(url, data=form_data)

    except Exception as e:
        # Exception if date is not in the correct format
        logger.error(str(e))


def handler(event, context):
    """
    Lambda handler for reservation.
    """
    currrent_time = datetime.datetime.now()
    name = context.function_name
    logger.info(f"Function {name} was invoked at {currrent_time}")

    # Retrieve data from database and post request to google form
    all_user = user_repo.get_all_users()
    for user in all_user:
        for date in user.reservations:
            reserve_dinner(user, date)

    return {"message": f"Successfully reserved for date: {currrent_time.date()}!"}
