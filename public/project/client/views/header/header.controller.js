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
            vm.isCollapsed = !vm.isCollapsed;
            $location.url("/profile/"+$rootScope.currentUser._id);
        };

        function checkCollapsed(){
            vm.isCollapsed = !vm.isCollapsed;
            console.log(vm.isCollapsed);
            return vm.isCollapsed;
        }
    };
})();