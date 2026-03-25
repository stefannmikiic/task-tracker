from datetime import datetime

from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
import database_models
from sqlalchemy.orm import Session


Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📌 Request body model
class TaskCreate(BaseModel):
    title: str
    description: str = ""

class TaskUpdate(BaseModel):
    title: str


# 🔹 GET all tasks
@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(database_models.Task).all()


# 🔹 POST create task
@app.post("/tasks")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = database_models.Task(
        title=task.title,
        description=task.description
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(database_models.Task).filter(database_models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404)

    task.title = updated.title
    task.updatedAt = datetime.utcnow()

    db.commit()
    db.refresh(task)

    return task


# 🔹 PATCH mark done
@app.patch("/tasks/{id}/done")
def done(id: int, db: Session = Depends(get_db)):
    task = db.query(database_models.Task).filter(database_models.Task.id == id).first()

    if not task:
        raise HTTPException(404)

    task.status = "done"
    task.updatedAt = datetime.utcnow()

    db.commit()
    return task


@app.patch("/tasks/{task_id}/progress")
def mark_progress(task_id: int, db: Session = Depends(get_db)):
    task = db.query(database_models.Task).filter(database_models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404)

    if task.status == "done":
        raise HTTPException(status_code=400, detail="Task already done")

    task.status = "in-progress"
    task.updatedAt = datetime.utcnow()

    db.commit()
    db.refresh(task)

    return task


@app.delete("/tasks/{id}")
def delete_task(id: int, db: Session = Depends(get_db)):
    task = db.query(database_models.Task).filter(database_models.Task.id == id).first()

    if not task:
        raise HTTPException(404)

    db.delete(task)
    db.commit()

    return {"message": "deleted"}