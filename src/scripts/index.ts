(function (): void {

	/*
    Private Functions
  */

	function handleOnDOMContentLoaded(event: Event): void {
		console.log(event);
	};

	/*
    Events
  */

	document.addEventListener("DOMContentLoaded", handleOnDOMContentLoaded, false);

})();