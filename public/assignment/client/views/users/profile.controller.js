(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$rootScope){

        var currentUser= $rootScope.currentUser;
        var vm=this;

        function init(){
            vm.message=null;
            vm.update=update;

            vm.firstName=currentUser.firstName;
            vm.lastName=currentUser.lastName;
            vm.username=currentUser.username;
            vm.password=currentUser.password;
            vm.email=currentUser.email;
            vm.phone=currentUser.phone;
        }

        init();

        function update(username,password,firstName,lastName,email,phone){

            vm.message=null;

            //prepare new user object that needs to be sent to remote
            var newDetails= {"_id":currentUser._id, "username" : username, "firstName": firstName,
                "lastName":lastName , "email" :email ,"password" :password, "phone" : phone};

            UserService
                .updateUser(newDetails)
                .then(
                    function(response){
                        if(response.data.ok){
                            //console.log(response.data.ok)
                            UserService.setCurrentUser(newDetails);
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