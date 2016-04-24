(function(){
    angular
        .module("TheFilmDBApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope,$location,UserService){

        vm = this;
        vm.logout = logout;
        vm.visitProfile = visitProfile;

        //$scope.logout = logout;
        //$scope.visitProfile = visitProfile;

        function logout(){
            UserService
                .logout()
                .then(
                    function(){
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    },
                    function(err){
                        console.log(err);
                    }
                )

            $location.url("/home");
        };

        function visitProfile(){
            vm.isCollapsed = !vm.isCollapsed;
            $location.url("/profile/"+$rootScope.currentUser._id);
        };

    };
})();