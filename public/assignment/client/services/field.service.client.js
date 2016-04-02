(function(){
    angular.module("FormBuilderApp")
        .factory("FieldService",FieldService);

    function FieldService($http){


        var model = {

            createFieldForForm:createFieldForForm,
            getFieldsForForm:getFieldsForForm,
            getFieldForForm:getFieldForForm,
            deleteFieldFromForm:deleteFieldFromForm,
            updateField:updateField
        };

        return model;


        function createFieldForForm(formId,field){
            //console.log("am in field service");
            return $http.post("/api/assignment/form/"+formId+"/field",field);
        }

        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function getFieldForForm(formId,fieldId){
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId,fieldId){
            console.log("in clien service",formId,fieldId);
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function updateField(formId,fieldId,field){
            formId = formId.toString();
            console.log("client side",formId);

            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field);
        }
    }
})();
