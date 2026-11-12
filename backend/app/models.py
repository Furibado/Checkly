from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Assignment(Base):
    __tablename__ = "assignments"
    __table_args__ = (
        CheckConstraint(
            "review_deadline >= submission_deadline",
            name="ck_assignments_deadline_order",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text)
    submission_deadline: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    review_deadline: Mapped[datetime] = mapped_column(DateTime(timezone=True))


class Submission(Base):
    __tablename__ = "submissions"

    id: Mapped[int] = mapped_column(primary_key=True)
    assignment_id: Mapped[int] = mapped_column(
        ForeignKey("assignments.id", name="fk_submissions_assignment", ondelete="RESTRICT"),
        index=True,
    )
    file_name: Mapped[str] = mapped_column(String(255))
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(),
    )


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = (
        CheckConstraint("completeness_score BETWEEN 0 AND 5", name="ck_reviews_completeness"),
        CheckConstraint("correctness_score BETWEEN 0 AND 5", name="ck_reviews_correctness"),
        CheckConstraint("usability_score BETWEEN 0 AND 5", name="ck_reviews_usability"),
        CheckConstraint(
            "(reviewed_at IS NULL AND strengths IS NULL AND remarks IS NULL "
            "AND recommendations IS NULL AND completeness_score IS NULL "
            "AND correctness_score IS NULL AND usability_score IS NULL) OR "
            "(reviewed_at IS NOT NULL AND strengths IS NOT NULL AND remarks IS NOT NULL "
            "AND recommendations IS NOT NULL AND completeness_score IS NOT NULL "
            "AND correctness_score IS NOT NULL AND usability_score IS NOT NULL)",
            name="ck_reviews_feedback_state",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    submission_id: Mapped[int] = mapped_column(
        ForeignKey("submissions.id", name="fk_reviews_submission", ondelete="RESTRICT"),
        index=True,
    )
    reviewer_code: Mapped[str] = mapped_column(String(50))
    strengths: Mapped[str | None] = mapped_column(Text)
    remarks: Mapped[str | None] = mapped_column(Text)
    recommendations: Mapped[str | None] = mapped_column(Text)
    completeness_score: Mapped[int | None]
    correctness_score: Mapped[int | None]
    usability_score: Mapped[int | None]
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    @property
    def completed(self) -> bool:
        return self.reviewed_at is not None

    @property
    def total_score(self) -> int | None:
        if not self.completed:
            return None
        return sum(score for score in (
            self.completeness_score, self.correctness_score, self.usability_score,
        ) if score is not None)
