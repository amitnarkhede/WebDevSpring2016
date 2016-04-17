(function(){
    angular
        .module("TheFilmDBApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,$rootScope,$location){

        $scope.logout = logout;
        $scope.visitProfile = visitProfile;

        function logout(){
            $rootScope.currentUser = null;
            $location.url("/home");
        };

        function visitProfile(){
            //console.log("Inside profile visit");
            $location.url("/profile/"+$rootScope.currentUser._id)
        }
    }
})();