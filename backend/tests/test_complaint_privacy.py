import os
import sys
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import Mock, patch

from fastapi import HTTPException
from fastapi.routing import APIRoute

os.environ.setdefault("DATABASE_URL", "sqlite://")
sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.dependencies import get_current_user, require_authority, require_citizen
from app.models import ComplaintReporter
from app.routers import complaints


def get_dependency_calls(dependant):
    calls = []
    for dependency in dependant.dependencies:
        calls.append(dependency.call)
        calls.extend(get_dependency_calls(dependency))
    return calls


class ComplaintPrivacyTests(unittest.TestCase):
    def setUp(self):
        self.routes = {
            route.path: route
            for route in complaints.router.routes
            if isinstance(route, APIRoute)
        }

    def test_complaint_routes_require_role_appropriate_authentication(self):
        expected_dependencies = {
            "/complaint": require_citizen,
            "/complaints": require_authority,
            "/complaints/mine": require_citizen,
            "/complaint/{complaint_id}": require_authority,
            "/complaint/{complaint_id}/image": require_authority,
            "/complaint/{complaint_id}/status": require_authority,
            "/analytics": require_authority,
        }

        for path, required_dependency in expected_dependencies.items():
            with self.subTest(path=path):
                route = self.routes[path]
                self.assertIn(
                    required_dependency,
                    get_dependency_calls(route.dependant),
                )
                self.assertIn(
                    get_current_user,
                    get_dependency_calls(route.dependant),
                )

    def test_public_complaint_list_route_is_removed(self):
        self.assertNotIn("/complaints/public", self.routes)

    def test_citizen_cannot_use_authority_only_functions(self):
        citizen = SimpleNamespace(id=7, role="citizen")

        with self.assertRaises(HTTPException) as authority_error:
            require_authority(citizen)
        self.assertEqual(authority_error.exception.status_code, 403)

        authority = SimpleNamespace(id=8, role="authority")
        with self.assertRaises(HTTPException) as citizen_error:
            require_citizen(authority)
        self.assertEqual(citizen_error.exception.status_code, 403)

    def test_personal_complaint_query_uses_authenticated_user_id(self):
        citizen = SimpleNamespace(id=7, role="citizen")
        db = Mock()
        db.query.return_value.filter.return_value.all.return_value = []

        with patch.object(complaints, "SessionLocal", return_value=db):
            result = complaints.get_my_complaints(current_user=citizen)

        self.assertEqual(result, [])
        filter_expression = db.query.return_value.filter.call_args.args[0]
        self.assertEqual(str(filter_expression.left), "complaint_reporters.user_id")
        self.assertEqual(filter_expression.right.value, citizen.id)

    def test_invalid_bearer_token_is_rejected(self):
        with patch("app.dependencies.SessionLocal") as session_factory:
            with self.assertRaises(HTTPException) as error:
                get_current_user("not-a-valid-token")

        self.assertEqual(error.exception.status_code, 401)
        session_factory.assert_not_called()


if __name__ == "__main__":
    unittest.main()
