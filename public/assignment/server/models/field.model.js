module.exports= function(formModel,db,mongoose){

    var q = require("q");

    var api = {
        getFieldsForForm:getFieldsForForm,
        createFieldForForm:createFieldForForm,
        deleteFieldFromForm:deleteFieldFromForm,
        updateField:updateField

    }
    return api;

    function getFieldsForForm(formId){

        var deferred = q.defer();
        formModel
            .findFormById(formId)
            .then(function(doc){
                deferred.resolve(doc[0].fields);
            });

        return deferred.promise;
    }

    function createFieldForForm(formId,field){

        formModel
            .findFormById(formId)
            .then(function(doc){
                var fields = doc[0].fields;
                fields.push(field);
                doc[0].fields = fields;

                doc[0].save();
            });
    }

    function deleteFieldFromForm(formId,fieldId){

        formModel
            .findFormById(formId)
            .then(function(doc){
                var fields = doc[0].fields;

                for(var f in fields){
                    if(fields[f]._id == fieldId){
                        fields.splice(f,1);
                    }
                }

                doc[0].fields = fields;
                doc[0].save();
            });
    }

    function updateField(formId,fieldId,updatedField){
        console.log(formId);
        formModel
            .findFormById(formId)
            .then(function(doc){

                var fields = doc[0].fields;

                for(var f in fields){
                    if(fields[f]._id == fieldId){
                        fields[f]=updatedField;
                    }
                }

                doc[0].fields = fields;

                doc[0].save();
            });

    }

}


