angular.module('mural-test-app').controller('PostitController', [
  function () {
    // Auto expand post-its when content is larger
    this.autoexpand = ($event) => {
      const element = $event.currentTarget;
      const scrollHeight = element.scrollHeight;
      element.style.height = `${scrollHeight}px`;
    };
  }
]);
