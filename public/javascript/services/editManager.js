angular.module('vbiApp').service('editManager', function() {

  var tabDetails;
  var tabIndex;

  var setTabDetails = function(tabs, index) {
    tabDetails = tabs;
    tabIndex = index;
  };

  var getTabIndex = function() {
    return tabIndex;
  }

  var getTabDetails = function() {
    return tabDetails;
  };

  return {
    setTabDetails: setTabDetails,
    getTabDetails: getTabDetails,
    getTabIndex: getTabIndex
  };
});
