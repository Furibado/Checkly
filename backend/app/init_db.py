from .database import Base, engine
from .models import Assignment, Review, Submission


def main() -> None:
    tables = [Assignment.__table__, Submission.__table__, Review.__table__]
    Base.metadata.create_all(bind=engine, tables=tables)


if __name__ == "__main__":
    main()
