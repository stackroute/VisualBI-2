angular.module('vbiApp').service('editManager', function() {

  var tabDetails = [];

  var setTabDetails = function(tab) {
    tabDetails.pop();
    tabDetails.push(tab);
  };

  var getTabDetails = function() {
    return tabDetails;
  };

  return {
    setTabDetails: setTabDetails,
    getTabDetails: getTabDetails
  };
});
