class BoardCtrl {
  constructor(columnsSvc) {
    this.name = 'A Sample Board';
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
