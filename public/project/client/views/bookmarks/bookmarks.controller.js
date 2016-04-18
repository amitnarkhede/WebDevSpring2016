(function() {
    angular
        .module("TheFilmDBApp")
        .controller("BookmarkController",BookmarkController);

    function BookmarkController($scope,FormService,$rootScope,$location,UserService) {

        $scope.alertMessage = null;
        var formIndexSelected;
        var currentUserForms = [];
        $scope.username = $rootScope.currentUser.username;


        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.isHidden = isHidden;
        $scope.isEditing = isEditing;


        function init(){
            if($rootScope.currentUser == null) {
                $location.url("/login");
            }else{
                UserService
                    .getMovieLike($rootScope.currentUser._id)
                    .then(function(res){
                        renderMovies(res.data);
                        $scope.selected = -1;
                        $scope.editing = -1;
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

        function updateForm(imdbID,comment) {
            if (imdbID != null) {
                $scope.alertMessage = null;

                FormService.updateFormById($rootScope.currentUser._id,imdbID,comment);

                clearSelection();
                init();
            }else {
                $scope.alertMessage = "Please select a movie comment to update";
            }
        }

        function clearSelection(){
            $scope.simdbID = null;
            $scope.sMovieTitle = null;
            $scope.sComments = null;
        }

        function deleteForm(imdbID){
            $scope.alertMessage = null;
            FormService.deleteFormById($rootScope.currentUser._id,imdbID);
            init();
        }

        function renderFormAfterAction(userforms){
            renderMovies(userforms);
        }

        function selectForm(index){
            $scope.selected = index;

            $scope.alertMessage = null;
            formIndexSelected = index;
            var selected = currentUserForms[index];
            $scope.sMovieTitle = selected.movieTitle;
            $scope.sComments = selected.comment;
            $scope.simdbID = selected.imdbID;
            $scope.sPoster = selected.poster;

        }

        function isHidden(index,selectedIndex){
            if(index == selectedIndex){
                $scope.editing = index;
                return true;
            }else{
                return false;
            }
        }

        function isEditing(index,editingIndex){
            if(index == editingIndex){
                return true;
            }else{
                return false;
            }
        }
    }

})();