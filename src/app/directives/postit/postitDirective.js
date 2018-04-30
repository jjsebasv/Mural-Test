angular.module('mural-test-app').directive('postit', [function() {
  return {
    restrict: 'E',
    scope: { element: '=' },
    templateUrl: '../app/directives/postit/postit.html',
    controller: 'PostitController',
    controllerAs: 'postitCtrl'
  };
}]);
