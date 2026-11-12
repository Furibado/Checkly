from datetime import UTC, datetime
from typing import Annotated, Self

from pydantic import (
    AwareDatetime, BaseModel, ConfigDict, Field, PlainSerializer, StringConstraints, model_validator,
)


MAX_ID = 2_147_483_647
RecordId = Annotated[int, Field(gt=0, le=MAX_ID)]
TEXT_PATTERN = r"^[^\x00]+$"
ShortText = Annotated[str, StringConstraints(strip_whitespace=True, max_length=200, pattern=TEXT_PATTERN)]
LongText = Annotated[str, StringConstraints(strip_whitespace=True, max_length=5000, pattern=TEXT_PATTERN)]
FileName = Annotated[str, StringConstraints(strip_whitespace=True, max_length=255, pattern=TEXT_PATTERN)]
ReviewerCode = Annotated[str, StringConstraints(strip_whitespace=True, max_length=50, pattern=TEXT_PATTERN)]
Score = Annotated[int, Field(strict=True, ge=0, le=5)]


def to_utc(value: datetime) -> datetime:
    return value.astimezone(UTC)


Timestamp = Annotated[AwareDatetime, PlainSerializer(to_utc, when_used="json")]


class AssignmentWrite(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: ShortText
    description: LongText
    submission_deadline: Timestamp
    review_deadline: Timestamp

    @model_validator(mode="after")
    def validate_deadlines(self) -> Self:
        if self.review_deadline < self.submission_deadline:
            raise ValueError("Срок проверки должен быть не раньше срока сдачи.")
        return self


class AssignmentRead(AssignmentWrite):
    model_config = ConfigDict(from_attributes=True)

    id: RecordId


class SubmissionWrite(BaseModel):
    model_config = ConfigDict(extra="forbid")

    assignment_id: RecordId
    file_name: FileName


class SubmissionRead(SubmissionWrite):
    model_config = ConfigDict(from_attributes=True)

    id: RecordId
    submitted_at: Timestamp


class ReviewWrite(BaseModel):
    model_config = ConfigDict(extra="forbid")

    submission_id: RecordId
    reviewer_code: ReviewerCode
    strengths: LongText | None = None
    remarks: LongText | None = None
    recommendations: LongText | None = None
    completeness_score: Score | None = None
    correctness_score: Score | None = None
    usability_score: Score | None = None

    @model_validator(mode="after")
    def validate_feedback(self) -> Self:
        feedback = (
            self.strengths, self.remarks, self.recommendations,
            self.completeness_score, self.correctness_score, self.usability_score,
        )
        if any(value is not None for value in feedback) and any(
            value is None for value in feedback
        ):
            raise ValueError("Заполните все три поля отзыва и все три оценки.")
        return self


class ReviewRead(ReviewWrite):
    model_config = ConfigDict(from_attributes=True)

    id: RecordId
    completed: bool
    reviewed_at: Timestamp | None
    total_score: Annotated[int, Field(ge=0, le=15)] | None
