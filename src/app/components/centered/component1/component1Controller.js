angular.module('mural-test-app').controller('Component1Controller', [
  '$scope', '$window',
  function ($scope, $window) {
    this.test = 'Hello World!';
    this.postits = [];
    this.selectedElements = [];
    this.clipboard = [];

    this.ctrlDown = false;
    this.shiftDown = false;
    this.editing = false;

    const ctrlKey = 17;
    const vKey = 86;
    const cKey = 67;
    const shiftKey = 16;

    // Check when a keyboard key is no longer pressed
    angular.element($window).bind('keyup', ($event) => {
      if ($event.keyCode === ctrlKey) {
        this.ctrlDown = false;
      }
      if ($event.keyCode === shiftKey) {
        this.shiftDown = false;
      }
      $scope.$apply();
    });

    // Check when a keyboard key is pressed
    angular.element($window).bind('keydown', ($event) => {
      // Ctrl is being pressed
      if ($event.keyCode === ctrlKey) {
        this.ctrlDown = true;
      }
      // Shift is being pressed
      if ($event.keyCode === shiftKey) {
        this.shiftDown = true;
      }
      // Ctrl + c is being pressed while not editing a post-it
      if (!this.editing && this.ctrlDown && $event.keyCode === cKey) {
        this.clipboard = [];
        angular.forEach(this.selectedElements, (obj) => {
          this.clipboard.push(angular.fromJson(obj[0].attributes.elem.value));
        });
      }
      // Ctrl + v is being pressed while not editing a post-it
      if (!this.editing && this.ctrlDown && $event.keyCode === vKey) {
        angular.forEach(this.clipboard, (obj) => {
          this.postits.push(obj);
        });
      }
      $scope.$apply();
    });

    // Add new post-it to the mural
    this.addNew = ($event) => {
      $event.preventDefault();
      this.postits.push({
        title: 'REMINDER',
        text: 'Default text',
        x: $event.layerX - 150,
        y: $event.layerY - 25,
        editable: false
      });
    };

    // Clear the post-it selection
    this.clearSelect = ($event) => {
      $event.preventDefault();
      angular.forEach(this.selectedElements, (selected) => {
        selected.css({
          border: 'none'
        });
      });
      this.editing = false;
      this.selectedElements = [];
    };
  }
]);
