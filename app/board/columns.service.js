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

  addColumn(column) {
    return this.$http.post('/api/columns', column)
      .then((res) => {
        this.columns.push(res.data);

        return res.data;
      })
      .catch((res) => {
        console.error(res);
      });
  }
}

export default ColumnsService;
