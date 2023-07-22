import datetime
import logging

import requests

import api.repos.reservation as reservation_repo
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
        current_date = datetime.datetime.strptime(date, "%Y-%m-%d")
        if current_date.date() != datetime.datetime.now().date():
            return

        logger.info(f"Reserving dinner for {user.name} on {date}")
        if settings.STAGE == "dev" or settings.STAGE == "local" or settings.STAGE == "HEAD":
            url = (
                "https://docs.google.com/forms/d/e/"
                "1FAIpQLSd9MLFnSCaCnBn9gURoZMXIpKfm1Eazk6FVgflTFNQQ3JcR8Q/formResponse"
            )
            form_data = {
                "entry.218414735": user.room,
                "entry.1464116213": user.name,
                "entry.1849050919_year": current_date.date().year,
                "entry.1849050919_month": current_date.date().month,
                "entry.1849050919_day": current_date.date().day,
            }
        else:
            url = (
                "https://docs.google.com/forms/d/e/"
                "1FAIpQLSd14yq1hROVw4VX5g38JBcxUdjLKPugGD2hWRKu3wsVQiWqDQ/formResponse"
            )
            form_data = {
                "entry.1988794669": user.room,
                "entry.2135268448": user.name,
                "entry.1785016385_year": current_date.date().year,
                "entry.1785016385_month": current_date.date().month,
                "entry.1785016385_day": current_date.date().day,
            }

        response = requests.post(url, data=form_data)
        logger.info(f"Response from google form: {response.status_code} {response.reason}")

        # Delete the date from the user's reservation
        user.reservations.remove(date)

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
        reservation_repo.update_user_reservation(user.id, user.reservations)

    return {"message": f"Successfully reserved for date: {currrent_time.date()}!"}
