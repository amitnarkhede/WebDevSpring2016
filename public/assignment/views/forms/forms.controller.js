(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,FormService,$rootScope,$location) {
        $scope.alertMessage = null;
        var formIndexSelected;
        var currentUserForms = [];
        var user;

        if($rootScope.user == null){
            $location.url("/home");
        }
        else{
            user = $rootScope.user;
            FormService.findAllFormsForUser(currentUser._id,renderForms);
        }

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function renderForms(userforms){
            $scope.forms = userforms;
            currentUserForms = userforms;
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
                $scope.alertMessage = "Please enter a name for the form";
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
                formSelected.title = newFormName;
                FormService.updateFormById(formSelected._id, formSelected, renderFormAfterAction);
                $scope.newFormName = null;
            }else {
                $scope.alertMessage = "Please select a form to update";
            }
        }

        function deleteForm(index){
            $scope.alertMessage = null;
            formIndexSelected = index;
            FormService.deleteFormById(currentUserForms[index]._id,renderFormAfterAction);
        }

        function renderFormAfterAction(userforms){
            FormService.findAllFormsForUser(currentUser._id,renderForms);
        }
        function selectForm(index){
            $scope.alertMessage = null;
            formIndexSelected = index;
            console.log(currentUserForms);
            $scope.newFormName = currentUserForms[index].title;
        }
    }

})();