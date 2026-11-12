from datetime import UTC, datetime
from typing import TypeVar

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.sql import ColumnElement

from .models import Assignment, Review, Submission
from .schemas import AssignmentWrite, ReviewWrite, SubmissionWrite


Record = TypeVar("Record", Assignment, Submission, Review)


class RecordNotFound(Exception):
    pass


class RelatedRecordsExist(Exception):
    pass


NOT_FOUND = {
    Assignment: "Задание не найдено.",
    Submission: "Сданная работа не найдена.",
    Review: "Рецензия не найдена.",
}

FOREIGN_KEYS = {
    "fk_submissions_assignment": (
        "Задание для этой работы не найдено.",
        "Нельзя удалить задание, пока у него есть сданные работы.",
    ),
    "fk_reviews_submission": (
        "Работа для этой рецензии не найдена.",
        "Нельзя удалить работу, пока у неё есть рецензии.",
    ),
}


def list_records(
    session: Session, model: type[Record], *filters: ColumnElement[bool],
) -> list[Record]:
    statement = select(model).where(*filters).order_by(model.id)
    return list(session.scalars(statement))


def get_record(
    session: Session, model: type[Record], record_id: int, *, for_update: bool = False,
) -> Record:
    record = session.get(model, record_id, with_for_update=for_update)
    if record is None:
        raise RecordNotFound(NOT_FOUND[model])
    return record


def save_assignment(
    session: Session, data: AssignmentWrite, assignment_id: int | None = None,
) -> Assignment:
    assignment = (
        Assignment() if assignment_id is None
        else get_record(session, Assignment, assignment_id, for_update=True)
    )
    assignment.title = data.title
    assignment.description = data.description
    assignment.submission_deadline = data.submission_deadline
    assignment.review_deadline = data.review_deadline
    session.add(assignment)
    commit(session)
    return assignment


def save_submission(
    session: Session, data: SubmissionWrite, submission_id: int | None = None,
) -> Submission:
    submission = (
        Submission() if submission_id is None
        else get_record(session, Submission, submission_id, for_update=True)
    )
    submission.assignment_id = data.assignment_id
    submission.file_name = data.file_name
    session.add(submission)
    commit(session)
    return submission


def save_review(
    session: Session, data: ReviewWrite, review_id: int | None = None,
) -> Review:
    review = (
        Review() if review_id is None
        else get_record(session, Review, review_id, for_update=True)
    )
    review.submission_id = data.submission_id
    review.reviewer_code = data.reviewer_code
    review.strengths = data.strengths
    review.remarks = data.remarks
    review.recommendations = data.recommendations
    review.completeness_score = data.completeness_score
    review.correctness_score = data.correctness_score
    review.usability_score = data.usability_score
    if data.completeness_score is None:
        review.reviewed_at = None
    elif review.reviewed_at is None:
        review.reviewed_at = datetime.now(UTC)
    session.add(review)
    commit(session)
    return review


def delete_record(session: Session, model: type[Record], record_id: int) -> None:
    session.delete(get_record(session, model, record_id, for_update=True))
    commit(session, deleting=True)


def commit(session: Session, *, deleting: bool = False) -> None:
    try:
        session.commit()
    except IntegrityError as error:
        session.rollback()
        diagnostic = getattr(error.orig, "diag", None)
        constraint = getattr(diagnostic, "constraint_name", None)
        if constraint in FOREIGN_KEYS:
            missing, conflict = FOREIGN_KEYS[constraint]
            if deleting:
                raise RelatedRecordsExist(conflict) from error
            raise RecordNotFound(missing) from error
        raise
