import angular from 'angular';
import angularMaterialize from 'angular-materialize';

import BoardCtrl from './board/board.controller';
import BoardService from './board/board.service';
import ColumnsService from './board/columns.service';
import TasksService from './board/tasks.service';

import ColumnCtrl from './column/column.controller';
import TaskCtrl from './task/task.controller';
import TaskService from './task/task.service';

angular.module('cello', [angularMaterialize])
  .service('TasksService', ['$http', TasksService])
  .service('TaskService', ['$http', 'BoardService', TaskService])
  .service('ColumnsService', ['$http', ColumnsService])
  .service('BoardService', ['$http', BoardService])
  .controller('BoardCtrl', [
    'BoardService',
    'ColumnsService',
    'TasksService',
    BoardCtrl
  ])
  .controller('ColumnCtrl', [
    'BoardService',
    'TasksService',
    'TaskService',
    ColumnCtrl
  ])
  .controller('TaskCtrl', [
    'TaskService',
    'ColumnsService',
    TaskCtrl
  ]);
