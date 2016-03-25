(function() {
    angular
        .module("TheFilmDBApp")
        .factory("FormService",FormService);

    function FormService() {
        var forms = [];

        var model={
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };

        return model;

        function createFormForUser(userId,form,callback){
            var newForm = {
                _id:(new Date).getTime(),
                title:form.title,
                userId:userId
            };
            forms.push(newForm);
            callback(newForm);
        };

        function findAllFormsForUser(userId,callback){
            var userForms = [];
            for(var f in forms) {
                if (forms[f].userId == userId) {
                    userForms.push(forms[f]);
                }
            }
            callback(userForms);
        };

        function deleteFormById(formId,currentUserForms,callback){
            forms = currentUserForms;
            for(var f in forms) {
                if (forms[f].imdbID == formId) {
                    forms.splice(f, 1);
                    break;
                }
            }
            callback(forms);
        };

        function updateFormById(formId, newForm,currentUserForms, callback){
            forms = currentUserForms;
            for(var f in forms) {
                if (forms[f].imdbID == formId) {
                    forms[f].comments  = newForm.comments;
                    break;
                }
            }
            callback(forms);
        };
    }
})();