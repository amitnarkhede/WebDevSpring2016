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
                    console.log(response);
                    vm.existingFields=response.data;
                })
        }

        init();

        function addField(fieldType) {

            var field = null;
            //Set default field information
            if (fieldType == "Single Line Text Field") {
                field = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            }
            else if (fieldType == "Multi Line Text Field") {
                field = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            }
            else if (fieldType == "Date Field") {
                field = {"label": "New Date Field", "type": "DATE"};
            }
            else if (fieldType == "Dropdown Field") {
                field = {"label": "New Dropdown", "type": "OPTIONS",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
            }
            else if (fieldType == "Checkboxes Field") {
                field = {"label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            }
            else {
                field = {"label": "New Radio Buttons", "type": "RADIO", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            }

            FieldService.createFieldForForm(formId, field);
            init();


        }

        function removeField(field){
            FieldService.deleteFieldFromForm(formId, field._id);
            init();
        }

        function editField(field){
            //console.log("Selected field : ",field);
            vm.selectedField=field;
            init();
        }

        function okayField(field){
            FieldService.updateField(formId,vm.selectedField._id,field);
            init();
        }

    }
})();


