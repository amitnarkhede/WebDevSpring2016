(function(){
    angular.module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService($http){

        var model = {
            findAllFormsForUser:findAllFormsForUser,
            findFormByTitle:findFormByTitle,
            deleteForm:deleteForm,
            addForm:addForm,
            updateForm:updateForm
        }
        return model;

        function findFormByTitle(title){
            return $http.get("/api/assignment/findFormByTitle/"+title);
        }

        function addForm(form,id){
            return $http.post("/api/assignment/addForm/user/"+id+"/form",form);
        }

        function findAllFormsForUser(id){
            return $http.get("/api/assignment/findAllFormsForUser/"+id+"/form");
        }

        function deleteForm(formToDelete,userId){
            return $http.delete("/api/assignment/form/"+formToDelete+"/"+userId);
        }
        function updateForm(formToBeUpdatedId,form){
            return $http.put("/api/assignment/form/"+formToBeUpdatedId,form);
        }
    }
})();
