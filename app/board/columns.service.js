class ColumnsService {
  constructor() {
    this.columns = [
      {
        id: 1,
        name: 'To Do',
        tasks: [{
          shortDescription: 'This is a short description - col 1'
        }, {
          shortDescription: 'This is a short description - col 1'
        }, {
          shortDescription: 'This is a short description - col 1'
        }]
      },
      {
        id: 2,
        name: 'Doing',
        tasks: [{
          shortDescription: 'This is a short description - col 2'
        }, {
          shortDescription: 'This is a short description - col 2'
        }, {
          shortDescription: 'This is a short description - col 2'
        }]
      },
      {
        id: 3,
        name: 'Done',
        tasks: [{
          shortDescription: 'This is a short description - col 3'
        }, {
          shortDescription: 'This is a short description - col 3'
        }, {
          shortDescription: 'This is a short description - col 3'
        }]
      }
    ];
  }

  tasksForColumn(columnId) {
    return this.columns.filter((col) => col.id === columnId)[0].tasks;
  }
}

export default ColumnsService;
