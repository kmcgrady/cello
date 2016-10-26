import angular from 'angular';
import angularMaterialize from 'angular-materialize';

import BoardCtrl from './board/board.controller';
import BoardService from './board/board.service';
import ColumnsService from './board/columns.service';
import TasksService from './board/tasks.service';

angular.module('cello', [angularMaterialize])
  .service('TasksService', ['$http', TasksService])
  .service('ColumnsService', ['$http', ColumnsService])
  .service('BoardService', ['$http', BoardService])
  .controller('BoardCtrl', [
    'BoardService',
    'ColumnsService',
    'TasksService',
    BoardCtrl
  ]);
