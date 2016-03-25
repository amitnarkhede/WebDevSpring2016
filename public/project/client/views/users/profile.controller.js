(function(){
    angular
        .module("TheFilmDBApp")
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
                $scope.message = "Profile updated successfully!";
                //console.log($rootScope.user);
            });
        };
    };
})();