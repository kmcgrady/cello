class ColumnCtrl {
  constructor(boardSvc, tasksSvc, taskSvc) {
    this.boardSvc = boardSvc;
    this.tasksSvc = tasksSvc;
    this.isAddingTask = false;
    this.newTaskDescription = '';
    this.taskSvc = taskSvc;
    this.openModal = false;
  }

  openTask(taskId) {
    this.taskSvc.fetchTaskForBoard(taskId, this.boardSvc.board.id)
      .then((task) => {
        this.openModal = true;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  addTask() {
    this.isAddingTask = true;
  }

  saveTask(columnId) {
    this.tasksSvc.addTask({
      boardId: this.boardSvc.board.id,
      shortDescription: this.newTaskDescription,
      columnIndex: this.tasksSvc.tasksForColumn(columnId).length + 1,
      columnId
    })
    .then((task) => {
      this.isAddingTask = false;
      this.addedTaskDescription = '';
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

export default ColumnCtrl;
