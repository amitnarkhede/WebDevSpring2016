
module.exports = function(app,formModel) {
    app.post("/api/assignment/findFormByTitle/:title", findFormByTitle);
    app.get("/api/assignment/findAllFormsForUser/:id/form",findAllFormsForUser);
    app.post("/api/assignment/addForm/user/:id/form",addForm);
    app.delete("/api/assignment/form/:formId/:userId", deleteForm);
    app.put("/api/assignment/form/:formToBeUpdatedId",updateForm);

    function findFormByTitle(req,res){
        var title= req.params.title;
        var formsWithGivenTitle=formModel.findFormByTitle(title);
        res.json(formsWithGivenTitle);
    }

    function findAllFormsForUser(req,res){
        var userId=req.params.id;
        var allForms=formModel.findAllFormsForUser(userId);
        res.json(allForms);
    }

    function addForm(req,res){
        var userId= req.params.id;
        var form=req.body;
        var newSetOfForms=formModel.addForm(userId,form);
        res.json(newSetOfForms);
    }

    function deleteForm(req,res){
        var formId=req.params.formId;
        var userId=req.params.userId;
        var newSetOfForms=formModel.deleteForm(formId,userId);
        res.json(newSetOfForms);

    }

    function updateForm(req,res){
        var formId=req.params.formToBeUpdatedId;
        var newForm=req.body;
        var updatedForm=formModel.updateForm(formId,newForm);
        res.json(updatedForm);
    }
}