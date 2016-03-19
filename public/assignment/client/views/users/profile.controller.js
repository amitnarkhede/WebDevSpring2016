(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$rootScope){

        var currentUser= $rootScope.currentUser;
        var vm=this;
        vm.message= null;
        vm.update=update;

        vm.user = currentUser;

        function init(){

        }
        init;

        function update(userUpdate){

            userUpdate._id=currentUser._id;
            UserService.updateUser(userUpdate)
                .then(
                    function(response){
                        if(response){
                            console.log("the resoponse is");
                            console.log(response);
                            UserService.setCurrentUser(response.data);

                            vm.message="Profile Update";
                        }
                        else{
                            vm.message="Couldn't update the profile";
                        }
                    }
                );
        }
    }
})();
