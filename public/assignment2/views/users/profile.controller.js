(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope,$scope,UserService){
        currentUser = $rootScope.user;
        $scope.update = update;

        function update(updatedUser){
            //console.log($scope.user);
            userId = $rootScope.user._id;
            //console.log(userId);
            UserService.updateUser(userId,updatedUser,function(res){
                $rootScope.user = res;
                console.log($rootScope.user);
            });
        };
    };
})();