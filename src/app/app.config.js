angular.module('mural-test-app').config([
  'localStorageServiceProvider',
  function (localStorageServiceProvider) {

    // Local Storage Setup
    localStorageServiceProvider.setPrefix(window.btoa('mural-test-app-/* @echo environment */'));
  }
]);
