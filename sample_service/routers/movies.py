from fastAPI import APIRouter


router = APIRouter()


@router.get("/movies")
def get_movies():
