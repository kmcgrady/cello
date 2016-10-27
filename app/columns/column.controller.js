class ColumnCtrl {
  constructor(boardSvc, columnsSvc, tasksSvc) {
    this.boardSvc = boardSvc;
    this.columnsSvc = columnsSvc;
    this.tasksSvc = tasksSvc;
    this.isAddingTask = false;
    this.addedTaskDescription = '';
  }

  addTask() {
    this.isAddingTask = true;
  }

  saveTask(columnId) {
    this.tasksSvc.addTask({
      boardId: this.boardSvc.board.id,
      shortDescription: this.addedTaskDescription,
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
