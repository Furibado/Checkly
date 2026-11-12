from typing import Annotated

from fastapi import APIRouter, Query

from .. import crud
from ..database import DatabaseSession
from ..models import Submission
from ..schemas import MAX_ID, RecordId, SubmissionRead, SubmissionWrite


router = APIRouter(prefix="/submissions", tags=["Сданные работы"])


@router.post("", response_model=SubmissionRead, status_code=201)
def create_submission(data: SubmissionWrite, session: DatabaseSession) -> Submission:
    return crud.save_submission(session, data)


@router.get("", response_model=list[SubmissionRead])
def list_submissions(
    session: DatabaseSession,
    assignment_id: Annotated[int | None, Query(gt=0, le=MAX_ID)] = None,
) -> list[Submission]:
    if assignment_id is None:
        return crud.list_records(session, Submission)
    return crud.list_records(session, Submission, Submission.assignment_id == assignment_id)


@router.get("/{submission_id}", response_model=SubmissionRead)
def get_submission(submission_id: RecordId, session: DatabaseSession) -> Submission:
    return crud.get_record(session, Submission, submission_id)


@router.put("/{submission_id}", response_model=SubmissionRead)
def update_submission(
    submission_id: RecordId, data: SubmissionWrite, session: DatabaseSession,
) -> Submission:
    return crud.save_submission(session, data, submission_id)


@router.delete("/{submission_id}", status_code=204)
def delete_submission(submission_id: RecordId, session: DatabaseSession) -> None:
    crud.delete_record(session, Submission, submission_id)
