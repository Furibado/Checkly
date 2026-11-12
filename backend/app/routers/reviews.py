from typing import Annotated

from fastapi import APIRouter, Query

from .. import crud
from ..database import DatabaseSession
from ..models import Review
from ..schemas import MAX_ID, RecordId, ReviewRead, ReviewWrite


router = APIRouter(prefix="/reviews", tags=["Рецензии"])


@router.post("", response_model=ReviewRead, status_code=201)
def create_review(data: ReviewWrite, session: DatabaseSession) -> Review:
    return crud.save_review(session, data)


@router.get("", response_model=list[ReviewRead])
def list_reviews(
    session: DatabaseSession,
    submission_id: Annotated[int | None, Query(gt=0, le=MAX_ID)] = None,
) -> list[Review]:
    if submission_id is None:
        return crud.list_records(session, Review)
    return crud.list_records(session, Review, Review.submission_id == submission_id)


@router.get("/{review_id}", response_model=ReviewRead)
def get_review(review_id: RecordId, session: DatabaseSession) -> Review:
    return crud.get_record(session, Review, review_id)


@router.put("/{review_id}", response_model=ReviewRead)
def update_review(review_id: RecordId, data: ReviewWrite, session: DatabaseSession) -> Review:
    return crud.save_review(session, data, review_id)


@router.delete("/{review_id}", status_code=204)
def delete_review(review_id: RecordId, session: DatabaseSession) -> None:
    crud.delete_record(session, Review, review_id)
