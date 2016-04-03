module.exports= function(uuid,db,mongoose){
    // load user schema

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('User',UserSchema);

    var q = require("q");

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        createNewUser :createNewUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        getAllUsers:getAllUsers
    };

    return api;

    function findUserByCredentials(username,password) {
        var deferred = q.defer();
        UserModel.findOne(
            {username: username, password : password},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }


    function findUserByUsername(userName){
        var deferred = q.defer();
        UserModel.find(
            {username: userName},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function createNewUser(userDetails){
        var deferred = q.defer();

        UserModel.create(userDetails,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);

            }
        });
        //return a promise
        return deferred.promise;
    }

    function updateUser(userId,updatedUserDetails){
        var deferred = q.defer();
        if(!Array.isArray(updatedUserDetails.email)) {
            updatedUserDetails.email = updatedUserDetails.email.split(",");
        }
        if(!Array.isArray(updatedUserDetails.phone)) {
            updatedUserDetails.phone = updatedUserDetails.phone.split(",");
        }

        UserModel.update(
            {_id : userId},
            {$set : updatedUserDetails},
            function(err,stats){
                if(err){
                    deferred.reject();
                }
                else{
                    deferred.resolve(stats);
                }
            });
        //return a promise
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        UserModel.remove(
            {_id : userId},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function getAllUsers(){
        var deferred = q.defer();
        UserModel.find(
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
}