import ExampleService from "./services/exampleService";

(function () {

  /*
    Private Functions
  */

  function _handleOnDOMContentLoaded() {
    ExampleService.initialize();
  };

  /*
    Events
  */

  document.addEventListener("DOMContentLoaded", _handleOnDOMContentLoaded, false);

})();