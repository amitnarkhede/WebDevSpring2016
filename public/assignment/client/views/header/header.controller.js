(function(){
    angular.module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,UserService){
        $scope.logout=logout;

        function logout(){
            UserService.setCurrentUser(null);
        }
    }
})();

