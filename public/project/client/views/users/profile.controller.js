(function(){
    angular
        .module("TheFilmDBApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($rootScope,$scope,UserService){
        var currentUser = $rootScope.user;
        $scope.update = update;

        function update(updatedUser){
            var userId = currentUser._id;
            var res = UserService.updateUser(userId,updatedUser);

            if(res){
                UserService.setCurrentUser(updatedUser);
                $scope.message = "Profile updated successfully!";
            }
        };
    };
})();