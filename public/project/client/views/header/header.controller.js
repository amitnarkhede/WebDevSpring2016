(function(){
    angular
        .module("TheFilmDBApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,$rootScope,$location){

        vm = this;
        vm.logout = logout;
        vm.visitProfile = visitProfile;
        vm.checkCollapsed = checkCollapsed;

        //$scope.logout = logout;
        //$scope.visitProfile = visitProfile;

        function logout(){
            $rootScope.currentUser = null;
            $location.url("/home");
        };

        function visitProfile(){
            //console.log("Inside profile visit");
            $location.url("/profile/"+$rootScope.currentUser._id);
            vm.isCollapsed = !vm.isCollapsed;
        };

        function checkCollapsed(){
            vm.isCollapsed = !vm.isCollapsed;
            console.log(vm.isCollapsed);
            return vm.isCollapsed;
        }
    };
})();