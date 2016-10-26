import angular from 'angular';
import angularMaterialize from 'angular-materialize';

import BoardCtrl from './board/board.controller';
import ColumnsService from './board/columns.service';

angular.module('cello', [angularMaterialize])
  .service('ColumnsService', ColumnsService)
  .controller('BoardCtrl', ['ColumnsService', BoardCtrl]);
