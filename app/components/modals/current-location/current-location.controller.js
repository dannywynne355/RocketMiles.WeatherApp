angular.module('WeatherApp.controllers')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, geolocationPromise) {
    // var $ctrl = this;
    /*
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };
    */
    /*
    $ctrl.ok = function () {
        console.log($modalInstance);
        // $modalInstance.close($ctrl.selected.item);
        $modalInstance.dismiss('ok');
    };

    $ctrl.cancel = function () {
        console.log('cancel');
        $modalInstance.dismiss('cancel');
        //$ctrl.dismiss({ $value: 'cancel' });
    };

    
    */
    
    $scope.ok = function () {
        // console.log(prefix + '$close returned ' + $scope.$close('ok'));
        geolocationPromise.then(
            function (response) {
                console.log(response);
                console.log(response.region);
            },
            function (response) {

            }
        );
        $scope.$close('ok')
    };

    $scope.cancel = function () {
        // console.log(prefix + '$dismiss returned ' + $scope.$dismiss('cancel'));
        $scope.$dismiss('cancel')
    };
});