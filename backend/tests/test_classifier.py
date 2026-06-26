import sys
import unittest
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.ai.classifier import is_valid_complaint_text, predict_category, predict_department


class ComplaintClassifierTests(unittest.TestCase):
    def test_road_related_complaint_routes_to_public_works(self):
        self.assertEqual(
            predict_department("Electrical", "There are large potholes on the road near my house"),
            "Public Works Department"
        )
        self.assertEqual(
            predict_category("There are large potholes on the road near my house"),
            "Roads"
        )

    def test_invalid_spam_complaints_are_rejected(self):
        self.assertFalse(is_valid_complaint_text("asdfghjkl qwerty"))
        self.assertFalse(is_valid_complaint_text("こんにちは、何もわからない"))
        self.assertTrue(is_valid_complaint_text("There are large potholes on the road near my house"))


if __name__ == "__main__":
    unittest.main()
