(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($rootScope,$routeParams,FieldService) {

        var vm = this;
        vm.currentUser = $rootScope.currentUser;
        vm.message = null;
        vm.addField=addField;
        vm.removeField=removeField;
        vm.editField=editField;
        vm.okayField=okayField;

        var formId=$routeParams.formId;

        function init(){
            FieldService.getFieldsForForm(formId)
                .then(function(response){
                    vm.existingFields=response.data;
                })
        }
        init();

        var fieldMap = {};

        function addField(fieldType) {
            console.log("in the add function ");
            var field = null;
            //Set default field information
            if (fieldType == "Single Line Text Field") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            else if (fieldType == "Multi Line Text Field") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType == "Date Field") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType == "Dropdown Field") {
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
            }
            else if (fieldType == "Checkboxes Field") {
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            }
            else {
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIO", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            }

            FieldService.createFieldForForm(formId, field)
                .then(function(response){
                    if (response.data) {
                        vm.existingFields = response.data;
                    }
                });
        }

        function removeField(field){
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function (response) {
                    if (response.data) {
                        vm.existingFields = response.data;
                    }
                });
        }

        function editField(field){
            vm.selectedField=field;
        }

        function okayField(field){
            console.log("okayfunction",formId,field);
            FieldService.updateField(formId,vm.selectedField._id,field)
                .then(function(response){
                    vm.existingFields=response.data;
                });
        }

    }
})();


