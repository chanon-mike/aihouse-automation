import jwt

from fastapi import HTTPException
from starlette.requests import Request as StarletteRequest
from .. import core


def validate(req: StarletteRequest):
    auth0_issuer_url: str = f"https://{core.Settings.AUTH0_DOMAIN}/"
    auth0_audience: str = core.Settings.AUTH0_AUDIENCE
    algorithm: str = "RS256"
    jwk_uri: str = f"{auth0_issuer_url}.well-known/jwks.json"
    auth_header = req.headers.get("Authorization")

    if auth_header:
        try:
            auth_scheme, bearer_token = auth_header.split()
        except ValueError:
            raise HTTPException(401, "bad credentials")

    valid = auth_scheme.lower() == "bearer" and bool(bearer_token.strip())
    if valid:
        try:
            jwks_client = jwt.PyJWKClient(jwk_uri)
            jwt_signing_key = jwks_client.get_signing_key_from_jwt(
                bearer_token
            ).key
            payload = jwt.decode(
                bearer_token,
                jwt_signing_key,
                algorithms=algorithm,
                audience=auth0_audience,
                issuer=auth0_issuer_url
            )
        except jwt.exceptions.PyJWKClientError:
            raise HTTPException(500, "unable to verify credentials")
        except jwt.exceptions.InvalidTokenError:
            raise HTTPException(401, "bad credentials")
        yield payload
    else:
        raise HTTPException(401, "bad credentials")
