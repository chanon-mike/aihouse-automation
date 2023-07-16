
import requests


url = (
    "https://docs.google.com/forms/d/e/"
    "1FAIpQLSd9MLFnSCaCnBn9gURoZMXIpKfm1Eazk6FVgflTFNQQ3JcR8Q/formResponse"
)
form_data = {
    "entry.218414735": 'test',
    "entry.1464116213": 'name',
    "entry.1849050919": '2023-1-11',
}

response = requests.post(url, data=form_data)