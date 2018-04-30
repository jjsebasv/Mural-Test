angular.module('mural-test-app').config([
  '$translateProvider',
  function ($translateProvider) {

    $translateProvider.translations('en', {
      TEST: {
        BY: 'By J Sebastian Vera',
        TITLE: 'Mural Test',
        REFERENCE1: 'Double click on the blue area to add a post-it.',
        REFERENCE2: 'Double click on a post-it to edit its content',
        REFERENCE3: 'Click a post-it to select it (use shift for multiselect)',
        REFERENCE4: 'Ctrl+c and Ctrl+v work on post-its too.'
      }
    });
    $translateProvider.preferredLanguage('en');
  }
]);
