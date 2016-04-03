module.exports = function(app,formModel) {
    app.post("/api/assignment/findFormByTitle/:title", findFormByTitle);
    app.get("/api/assignment/findAllFormsForUser/:id/form",findAllFormsForUser);
    app.post("/api/assignment/addForm/user/:id/form",addForm);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.put("/api/assignment/form/:formToBeUpdatedId",updateForm);

    function findFormByTitle(req,res){
        var title= req.params.title;
        var formsWithGivenTitle=formModel.findFormByTitle(title);
        res.json(formsWithGivenTitle);
    }

    function findAllFormsForUser(req,res){
        var userId=req.params.id;
        formModel
            .findAllFormsForUser(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function addForm(req,res){
        //console.log("Yeah I'm inside add form");
        var userId= req.params.id;
        var form=req.body;
        form.userId = userId;
        formModel
            .addForm(form)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

        //res.json(newSetOfForms);
    }

    function deleteForm(req,res){
        var formId=req.params.formId;
        //var userId=req.params.userId;
        formModel
            .deleteForm(formId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateForm(req,res){
        var formId=req.params.formToBeUpdatedId;
        var newForm=req.body;
        formModel
            .updateForm(formId,newForm)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
}