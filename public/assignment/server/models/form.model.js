module.exports= function(uuid,db,mongoose){

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model('Form',FormSchema);

    var q = require("q");

    var api = {
        findFormByTitle:findFormByTitle,
        findAllFormsForUser:findAllFormsForUser,
        addForm:addForm,
        deleteForm:deleteForm,
        updateForm:updateForm
    }
    return api;


    function findFormByTitle(title) {

        var deferred = q.defer();

        FormModel.find(title , function(err,doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc[0]);
            }
        });

        return deferred.promise;
    }

    function findAllFormsForUser(userId){
        //var userForms =[]
        //for (var u in formMock) {
        //    if (formMock[u].userId == userId) {
        //        userForms.push(formMock[u]);
        //    }
        //}
        //return userForms;

        var deferred = q.defer();

        FormModel.find({userId : userId}, function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function addForm(form){

        var deferred = q.defer();
        var existing = findFormByTitle(form.title);
        form.created = (new Date).getTime();
        form.updated = (new Date).getTime();

        if(existing){
            FormModel.create(form,function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        } else{
            deferred.resolve(existing);
        }

        return deferred.promise;
    }

    function deleteForm(formId){

        var deferred = q.defer();
        FormModel.remove({_id : formId},function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function updateForm(formId,newForm){

        var deferred = q.defer();
        FormModel.update({_id : formId}, newForm, function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

}


