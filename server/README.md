# Installation

```
poetry env use python
poetry install
```

## Running a server

Run from server/, where pyproject.toml exist

```
poetry shell
uvicorn app.main:app --reload
```

## Coding rule

Using isort before push

```
isort .
```
