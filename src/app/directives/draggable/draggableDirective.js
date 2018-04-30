angular.module('mural-test-app').directive('draggable', [
  '$document',
  function($document) {
    return {
      restrict: 'A',
      link: (scope, elem, attr) => {

        elem.css({
          top: `${angular.fromJson(attr.elem).y}px`,
          left: `${angular.fromJson(attr.elem).x}px`
        });
        let startX;
        let startY;
        let x = 0;
        let y = 0;

        const id = 'container';
        const container = document.getElementById(id).getBoundingClientRect();

        const width = elem[0].offsetWidth;
        const height = elem[0].offsetHeight;

        // Bind mousedown event
        elem.on('mousedown', (e) => {
          e.preventDefault();
          startX = e.clientX - elem[0].offsetLeft;
          startY = e.clientY - elem[0].offsetTop;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        // On click event to select
        elem.on('click', (e) => {
          e.preventDefault();
          // Avoid the click event reaching the mural
          e.stopPropagation();
          scope.editing = false;
          // Multiselect disable
          if (!e.shiftKey) {
            angular.forEach(scope.$parent.comp1Ctrl.selectedElements, (selected) => {
              selected.css({
                border: 'none'
              });
            });
            scope.$parent.comp1Ctrl.selectedElements = [];
          }
          // Add border to look like selected
          elem.css({
            border: '1px solid black'
          });
          scope.$parent.comp1Ctrl.selectedElements.push(elem);
        });

        // Double click event to make content editable
        elem.on('dblclick', (e) => {
          e.preventDefault();
          // Avoid the double click event reaching the mural
          e.stopPropagation();
          e.currentTarget.childNodes[3].focus();
          scope.$parent.comp1Ctrl.editing = true;
        });

        // Handle drag event
        const mousemove = (e) => {
          y = e.clientY - startY;
          x = e.clientX - startX;
          setPosition();
        };

        // Unbind drag events
        const mouseup = () => {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        };

        // Move element, within container if provided
        const setPosition = () => {
          if (container) {
            if (x < container.left) {
              x = container.left - 18;
            } else if (x > container.right - width - 22) {
              x = container.right - width - 22;
            }
            if (y < container.top - 141) {
              y = container.top - 141;
            } else if (y > container.bottom - 2 * height - 95) {
              y = container.bottom - 2 * height - 95;
            }
          }

          elem.css({
            top: `${y}px`,
            left: `${x}px`
          });
        };
      }
    };
  }
]);
