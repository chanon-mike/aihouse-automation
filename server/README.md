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
