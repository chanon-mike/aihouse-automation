from starlette.testclient import TestClient

import api.repos.user as user_repo
from api.schemas.user import User as UserSchema


def test_get_all_users(client: TestClient, mock_user: UserSchema):
    user = user_repo.create_user(mock_user)
    response = client.get("/user/")

    assert response.status_code == 200
    assert response.json() == [user.attribute_values]


def test_get_user(client: TestClient, mock_user: UserSchema, access_token: str):
    user = user_repo.create_user(mock_user)

    response = client.get(
        f"/user/{mock_user.id}", headers={"Authorization": f"Bearer {access_token}"}
    )

    assert response.status_code == 200
    assert response.json() == user.attribute_values

    failed_response = client.get(
        "/user/non_existent_id", headers={"Authorization": f"Bearer {access_token}"}
    )

    assert failed_response.status_code == 404
    assert failed_response.json() == {"detail": "user_not_found"}

    response = client.get("/user/non_existent_id")

    assert response.status_code == 403
    assert response.json() == {"detail": "Not authenticated"}


def test_post_user(client: TestClient, mock_user: UserSchema):
    response = client.post("/user/", json=mock_user.model_dump())

    assert response.status_code == 200
    assert response.json() == mock_user.model_dump()


def test_update_user(client: TestClient, mock_user: UserSchema, access_token: str):
    user_repo.create_user(mock_user)

    updated_user = mock_user
    updated_user.name = "new_name"

    response = client.patch(
        f"/user/{mock_user.id}",
        json=updated_user.model_dump(),
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert response.status_code == 200
    assert response.json()["name"] == updated_user.name

    non_existent_response = client.patch(
        "/user/non_existent_id",
        json=updated_user.model_dump(),
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert non_existent_response.status_code == 404
    assert non_existent_response.json() == {"detail": "user_not_found"}

    unauthorized_response = client.patch(
        f"/user/{mock_user.id}",
        json=updated_user.model_dump(),
    )

    assert unauthorized_response.status_code == 403
    assert unauthorized_response.json() == {"detail": "Not authenticated"}

    invalid_response = client.patch(
        f"/user/{mock_user.id}",
        json={"name": "new_name"},
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert invalid_response.status_code == 422


def test_delete_user(client: TestClient, mock_user: UserSchema, access_token: str):
    user_repo.create_user(mock_user)

    response = client.delete(
        f"/user/{mock_user.id}", headers={"Authorization": f"Bearer {access_token}"}
    )

    assert response.status_code == 200
    assert response.json() == {"message": "user_deleted"}

    non_existent_response = client.delete(
        "/user/non_existent_id", headers={"Authorization": f"Bearer {access_token}"}
    )

    assert non_existent_response.status_code == 404
    assert non_existent_response.json() == {"detail": "user_not_found"}

    unauthorized_response = client.delete(f"/user/{mock_user.id}")

    assert unauthorized_response.status_code == 403
    assert unauthorized_response.json() == {"detail": "Not authenticated"}


def test_get_reservation_date(client: TestClient, mock_user: UserSchema, access_token: str):
    user_repo.create_user(mock_user)

    response = client.get(
        f"/user/{mock_user.id}/reservation",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert response.status_code == 200
    assert response.json() == mock_user.reservations

    non_existent_response = client.get(
        "/user/non_existent_id/reservation",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert non_existent_response.status_code == 404
    assert non_existent_response.json() == {"detail": "user_not_found"}

    unauthorized_response = client.get(f"/user/{mock_user.id}/reservation")

    assert unauthorized_response.status_code == 403
    assert unauthorized_response.json() == {"detail": "Not authenticated"}


def test_update_user_reservation(client: TestClient, mock_user: UserSchema, access_token: str):
    user_repo.create_user(mock_user)

    response = client.patch(
        f"/user/{mock_user.id}/reservation",
        json=["2023-8-10", "2023-8-11"],
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert response.status_code == 200
    assert response.json() == ["2023-8-10", "2023-8-11"]

    non_existent_response = client.patch(
        "/user/non_existent_id/reservation",
        json=["2023-8-10"],
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert non_existent_response.status_code == 404
    assert non_existent_response.json() == {"detail": "user_not_found"}

    unauthorized_response = client.patch(
        f"/user/{mock_user.id}/reservation",
        json=["2023-8-10"],
    )

    assert unauthorized_response.status_code == 403
    assert unauthorized_response.json() == {"detail": "Not authenticated"}

    invalid_response = client.patch(
        f"/user/{mock_user.id}/reservation",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    assert invalid_response.status_code == 422
