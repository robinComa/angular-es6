'use strict';

import Es6Controller from './src/es6/Es6Controller';
import TodoController from './src/todo/TodoController';

angular
    .module('app', [
        'ngAnimate',
        'angular-growl'
    ])
    .controller('Es6Controller', Es6Controller)
    .controller('TodoController', TodoController);