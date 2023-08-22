import logging
from api.models.user import UserModel


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
