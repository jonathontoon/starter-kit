const ExampleService = (function () {
    
  /*
    Private Variables
  */

  const _exampleVariable = "Hello World";

  /*
    Private Functions
  */

  function _referenceExampleVariable() {
    return _exampleVariable;
  };

  /*
    Public Functions
  */

  const _controller = {
    initialize: function () {
      return _referenceExampleVariable();
    }
  };

  return _controller;

})();

export default ExampleService;
