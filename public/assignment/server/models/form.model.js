var formMock = require("./form.mock.json");

module.exports= function(){

    var api = {
        findFormByTitle:findFormByTitle,
        findAllFormsForUser:findAllFormsForUser,
        addForm:addForm,
        deleteForm:deleteForm,
        updateForm:updateForm
    }
    return api;


    function findFormByTitle(title) {
        for (var u in formMock) {
            if (mock[u].title == title) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId){
        var userForms =[]
        for (var u in formMock) {
            if (formMock[u].userId == userId) {
                userForms.push(formMock[u]);}
        }
        return userForms;
    }

    function addForm(id,form){
        //set the id of the form using guid library
        form.userId=id;
        formMock.push(form);
        var allForms = findAllFormsForUser(id);
        return allForms;
    }

    function deleteForm(formId,userId){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                formMock.splice(u,1);
                var allForms = findAllFormsForUser(userId);
                return allForms;
            }
        }
    }

    function updateForm(formId,newForm){
        for (var u in formMock) {
            if (formMock[u]._id == formId) {
                formMock[u]=newForm;
                console.log("the updated",formMock[u]);
                return formMock[u];
            }
        }
    }

}


