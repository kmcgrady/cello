class TaskService {
  constructor($http, boardSvc) {
    this.$http = $http;
    this.boardSvc = boardSvc;
    this.task = null;
  }

  fetchTaskForBoard(taskId, boardId) {
    return this.$http.get(`/api/tasks/${taskId}`, { params: { boardId } })
      .then((res) => {
        this.task = res.data;
        this.task.members = [];

        this.$http.get(`/api/members`, { params: { boardId, taskId } })
          .then((res) => {
            this.task.members = res.data;
          })
          .catch((res) => {
            console.error(res);
          })

        return res.data;
      })
      .catch((res) => {
        console.error(res);
      });
  }

  updateTask(task) {
    const boardId = this.boardSvc.board.id;

    return this.$http.put(`/api/tasks/${task.id}?boardId=${boardId}`, task)
    .then((res) => {
      this.task = res.data;

      return this.task;
    })
    .catch((res) => {
      console.error(res.data);
    });
  }

}

export default TaskService;
