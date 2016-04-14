(function(){
    angular
        .module("TheFilmDBApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,$rootScope,$location,UserService){
        //This is left blank intentionally as there is nothing to be implemented here currently
        //console.log("Hello from header")
        $scope.logout = logout;

        function logout(){
            $rootScope.currentUser = null;
            //console.log("User has been logged out!");
            $location.url("/home");
        };
    }
})();