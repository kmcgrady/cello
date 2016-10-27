class TasksService {
  constructor($http) {
    this.tasks = {};
    this.$http = $http;
  }

  fetchTasks(boardId, columnId) {
    return this.$http.get('/api/tasks', {
      params: {
        boardId: boardId,
        columnId: columnId
      }
    })
    .then((res) => {
      this.tasks[columnId] = res.data;
    })
    .catch((res) => {
      console.error(res);
    });
  }

  tasksForColumn(boardId, columnId) {
    if (this.tasks[columnId]) {
      return this.tasks[columnId];
    }

    return [];
  }

  addTask(task) {
    return this.$http.post('/api/tasks', task)
      .then((res) => {
        this.tasks[task.columnId].push(res.data);
        return res.data;
      })
      .catch((res) => {
        console.error(res);
      })
  }
}

export default TasksService;
