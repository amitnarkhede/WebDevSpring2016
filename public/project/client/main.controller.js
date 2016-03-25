(function(){
    angular
        .module("TheFilmDBApp")
        .controller("MainController", MainController);

    function MainController($location,$scope){
        $scope.$location = $location;
    }
})();