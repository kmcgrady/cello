class BoardCtrl {
  constructor(columnsSvc) {
    this.columnsSvc = columnsSvc;
  }

  columns() {
    return this.columnsSvc.columns;
  }

  tasksForColumn(columnId) {
    return this.columnsSvc.tasksForColumn(columnId);
  }
}

export default BoardCtrl;
