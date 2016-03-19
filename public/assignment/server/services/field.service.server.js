module.exports = function(app,fieldModel) {
    app.get("/api/assignment/form/:formId/field",getFieldsForForm);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldFromForm);
    app.put("/api/assignment/form/:formId+/field/:fieldId",updateField);


    function getFieldsForForm(req,res){
        var formId= req.params.formId;
        var setOfFields=fieldModel.getFieldsForForm(formId);
        res.json(setOfFields);
    }

    function createFieldForForm(req,res) {
        var formId=req.params.formId;
        var field=req.body;
        var allFields=fieldModel.createFieldForForm(formId,field);
        return res.json(allFields);

    }

    function deleteFieldFromForm(req,res) {
        var formId= req.params.formId;
        var fieldId= req.params.fieldId;
        var afterDeletion=fieldModel.deleteFieldFromForm(formId,fieldId);
        res.json(afterDeletion);
    }

    function updateField(req,res){
        console.log("hola");
        var formId= req.params.formId;
        var fieldId= req.params.fieldId;
        var updatedField=req.body;
        console.log(formId);
        console.log(fieldId);
        console.log(updatedField);
        var afterUpdation=fieldModel.updateField(formId,fieldId,updatedField);
        res.json(afterUpdation);
    }

}