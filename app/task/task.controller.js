class TaskCtrl {
  constructor(taskSvc, columnsSvc) {
    this.taskSvc = taskSvc;
    this.columnsSvc = columnsSvc;
    this.isEditingShortDescription = false;
    this.isEditingLongDescription = false;
    this.newShortDescription = '';
    this.newLongDescription = '';
  }

  saveShortDescription() {
    this.taskSvc.updateTask(Object.assign({}, this.taskSvc.task, {
      shortDescription: this.newShortDescription
    }))
    .then((task) => {
      this.isEditingShortDescription = false;
    })
    .catch((res) => {
      console.error(res);
    });
  }

  editShortDescription() {
    this.newShortDescription = this.taskSvc.task.shortDescription;
    this.isEditingShortDescription = true;
  }

  saveLongDescription() {
    this.taskSvc.updateTask(Object.assign({}, this.taskSvc.task, {
      longDescription: this.newLongDescription
    }))
    .then((task) => {
      this.isEditingLongDescription = false;
    })
    .catch((res) => {
      console.error(res);
    });
  }

  editLongDescription() {
    this.newLongDescription = this.taskSvc.task.longDescription;
    this.isEditingLongDescription = true;
  }

  task() {
    return this.taskSvc.task;
  }

  columns() {
    return this.columnsSvc.columns;
  }

  columnName() {
    return this.columnsSvc.getColumnName(this.taskSvc.task.columnId);
  }
}

export default TaskCtrl;
