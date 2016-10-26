class BoardCtrl {
  constructor(boardSvc, columnsSvc, tasksSvc) {
    this.boardSvc = boardSvc;
    this.columnsSvc = columnsSvc;
    this.tasksSvc = tasksSvc;

    boardSvc.fetchBoard(1)
      .then(() => {
        return this.columnsSvc.fetchColumns(this.boardSvc.board.id);
      })
      .then(() => {
        return Promise.all(this.columns().map((column) => {
          return this.tasksSvc.fetchTasks(this.boardSvc.board.id, column.id);
        }));
      })
      .catch((err) => {
        console.error(log);
      });
  }

  boardName() {
    return this.boardSvc.name || '';
  }

  columns() {
    return this.columnsSvc.columns;
  }

  tasksForColumn(columnId) {
    return this.tasksSvc.tasksForColumn(this.boardSvc.board.id, columnId);
  }
}

export default BoardCtrl;
