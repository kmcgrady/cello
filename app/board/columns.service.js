class ColumnsService {
  constructor($http) {
    this.$http = $http;
    this.columns = [];
  }

  fetchColumns(boardId) {
    return this.$http({
      url: '/api/columns',
      method: 'GET',
      params: { boardId }
    })
    .then((res) => {
      this.columns = res.data;
    })
    .catch((res) => {
      console.error(res);
    });
  }

  tasksForColumn(columnId) {
    return this.columns.filter((col) => col.id === columnId)[0].tasks;
  }

  addTaskForColumn(columnId, task) {
    this.columns.filter((col) => col.id === columnId)[0].tasks.push(task);
  }
}

export default ColumnsService;
