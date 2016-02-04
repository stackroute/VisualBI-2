angular.module('vbiApp').directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                console.log(viewValue);
                console.log(scope.form.password.$viewValue);
                var noMatch = viewValue != scope.form.password.$viewValue;
                console.log(noMatch);
                console.log(ctrl.$setValidity('noMatch', !noMatch));
            })
        }
    }
})