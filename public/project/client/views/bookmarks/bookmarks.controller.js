(function() {
    angular
        .module("TheFilmDBApp")
        .controller("BookmarkController",BookmarkController);

    function BookmarkController($scope,FormService,$rootScope,$location,UserService) {

        $scope.alertMessage = null;
        var formIndexSelected;
        var currentUserForms = [];
        var user;

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function init(){
            if($rootScope.user == null) {
                $location.url("/login");
            }else{
                UserService
                    .getMovieLike($rootScope.user._id)
                    .then(function(res){
                        renderMovies(res.data);
                    });
            }
        };

        init();

        function renderMovies(movies){
            $scope.forms = movies;
            currentUserForms = movies;
        }

        function addForm(formName) {
            if (formName != null) {
                var newForm = {
                    "_id": null,
                    "title": formName,
                    "userId": null
                };
                FormService.createFormForUser(user._id, newForm, renderAddForm);
            }else{
                //$scope.alertMessage = "Please enter a name for the form";
            }
        }

        function renderAddForm(newForm){
            $scope.newFormName = null;
            currentUserForms.push(newForm);
            $scope.forms = currentUserForms;
        }

        function updateForm(newFormName) {
            if (newFormName != null) {
                $scope.alertMessage = null;
                var formSelected = currentUserForms[formIndexSelected];
                formSelected.comments = newFormName;
                FormService.updateFormById(formSelected.imdbID, formSelected,currentUserForms, renderFormAfterAction);
                $scope.newFormName = null;
                $scope.movieName = null;
            }else {
                $scope.alertMessage = "Please select a movie comment to update";
            }
        }

        function deleteForm(index){
            $scope.alertMessage = null;
            formIndexSelected = index;
            FormService.deleteFormById(currentUserForms[index].imdbID,currentUserForms,renderFormAfterAction);
        }

        function renderFormAfterAction(userforms){
            //console.log("After update :");
            //console.log(userforms);
            //FormService.findAllFormsForUser(currentUser._id,renderMovies);
            renderMovies(userforms);
            //$scope.newFormName = null;
            //$scope.movieName = null;
        }

        function selectForm(index){
            //console.log(index);
            $scope.alertMessage = null;
            formIndexSelected = index;
            //console.log(currentUserForms);
            //console.log("Hello");
            $scope.newFormName = currentUserForms[index].comments;
            $scope.movieName = currentUserForms[index].movieTitle;
        }
    }

})();