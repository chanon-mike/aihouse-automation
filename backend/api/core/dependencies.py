from fastapi import HTTPException, status
from fastapi.params import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from api.core.security import VerifyToken

token_auth_scheme = HTTPBearer()


def verify_token(token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    result = VerifyToken(token.credentials).verify()
    if result.get("status"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=result.get("msg", ""))
    return result
