from fastapi import APIRouter

from .. import crud
from ..database import DatabaseSession
from ..models import Assignment
from ..schemas import AssignmentRead, AssignmentWrite, RecordId


router = APIRouter(prefix="/assignments", tags=["Задания"])


@router.post("", response_model=AssignmentRead, status_code=201)
def create_assignment(data: AssignmentWrite, session: DatabaseSession) -> Assignment:
    return crud.save_assignment(session, data)


@router.get("", response_model=list[AssignmentRead])
def list_assignments(session: DatabaseSession) -> list[Assignment]:
    return crud.list_records(session, Assignment)


@router.get("/{assignment_id}", response_model=AssignmentRead)
def get_assignment(assignment_id: RecordId, session: DatabaseSession) -> Assignment:
    return crud.get_record(session, Assignment, assignment_id)


@router.put("/{assignment_id}", response_model=AssignmentRead)
def update_assignment(
    assignment_id: RecordId, data: AssignmentWrite, session: DatabaseSession,
) -> Assignment:
    return crud.save_assignment(session, data, assignment_id)


@router.delete("/{assignment_id}", status_code=204)
def delete_assignment(assignment_id: RecordId, session: DatabaseSession) -> None:
    crud.delete_record(session, Assignment, assignment_id)
