class BoardService {
  constructor($http) {
    this.$http = $http;
    this.board = {};
  }

  fetchBoard(boardId) {
    return this.$http.get(`/api/boards/${boardId}`)
    .then((res) => {
      this.board = res.data;
    })
    .catch((res) => {
      console.error(res);
    });
  }
}

export default BoardService;
