from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from .crud import RecordNotFound, RelatedRecordsExist
from .routers import assignments, reviews, submissions


app = FastAPI(title="Checkly API", version="0.1.0")
app.include_router(assignments.router, prefix="/api")
app.include_router(submissions.router, prefix="/api")
app.include_router(reviews.router, prefix="/api")


@app.exception_handler(RecordNotFound)
def handle_not_found(_request: Request, error: RecordNotFound) -> JSONResponse:
    return JSONResponse(status_code=404, content={"detail": str(error)})


@app.exception_handler(RelatedRecordsExist)
def handle_conflict(_request: Request, error: RelatedRecordsExist) -> JSONResponse:
    return JSONResponse(status_code=409, content={"detail": str(error)})
