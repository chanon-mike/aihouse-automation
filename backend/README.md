# Installation

```
poetry env use python
poetry install
```

## Running a server

Run from server/, where pyproject.toml exist

```
poetry shell
uvicorn api.main:app --reload
```

## Coding rule

Using below command to check code before push

```
isort .
black api
flake api
```

## Serverless cron task

Running task from local

```
sls invoke local -f reservationHandler
```

## Bio data

Maybe adding furigana to name (only for japanese) and separating first name and last name (maybe middle name is required?) (last name is nullable because some doesn't have it?)

How should generation be added? (1 期生、2 期生 or enter the date and calculate it?)

As the privacy problem, we maybe not showing room, social media, etc. for other user not logging in.

```mermaid
erDiagram
  User {
    string id
    string name
    string email
    string room
    date[] reservations
    date birthday
    string gender "male | female | others"
    string country
    string hobby
    string bio
    json[] social_media "[{media: 'Instagram', account_name: '@xxx'}, ...]"
    string student_status "international student, exchange student, full-time student"
    date stayed_from "date of entering dorm"
    date stayed_until "date of leaving dorm | not decided"
    boolean is_public "show bio to other users or not"
    datetime created_at
    datetime updated_at
  }
```
