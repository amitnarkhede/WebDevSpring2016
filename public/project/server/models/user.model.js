/**
 * Created by amitv on 24-Mar-16.
 */

module.exports= function(uuid,db,mongoose){

    var UserSchema = require("./user.schema.server.js")(mongoose);

    var UserModel = mongoose.model('ProjectUser',UserSchema);

    var User2UserSchema = require("./user-user.schema.server.js")(mongoose);

    var User2UserModel = mongoose.model('ProjectUser2User',User2UserSchema);

    var q = require("q");

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername:findUserByUsername,
        findUserById : findUserById,
        createNewUser :createNewUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        getAllUsers:getAllUsers,
        addFollowing:addFollowing,
        removeFollowing:removeFollowing,
        getFollowing:getFollowing,
        checkIfFollowed:checkIfFollowed,
        getFollowers:getFollowers
    };

    return api;

    function findUserByCredentials(username,password) {
        var deferred = q.defer();
        UserModel.find(
            {username: username, password : password},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    //console.log(doc);
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

    function addFollowing(details){
        var deferred = q.defer();

        User2UserModel.create(details,function(err,doc){
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

    function checkIfFollowed(userID,followingID){
        var deferred = q.defer();

        console.log(userID);
        console.log(followingID);

        User2UserModel.find({follower_id:userID,following_id:followingID},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });

        //return a promise
        return deferred.promise;
    }

    function removeFollowing(userId,followingId){
        var deferred = q.defer();

        User2UserModel.remove({follower_id:userId,following_id:followingId},
            function(err,doc){
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

    function getFollowing(userId){
        var deferred = q.defer();

        User2UserModel.find({follower_id:userId},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);

            }
        });

        return deferred.promise;
    }

    function getFollowers(userId){
        var deferred = q.defer();

        User2UserModel.find({following_id:userId},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);

            }
        });

        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();

        UserModel.find({_id:userId},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function updateUser(userId,updatedUserDetails){
        var deferred = q.defer();

        delete updatedUserDetails._id;

        UserModel.update(
            {_id : userId},
            {$set : updatedUserDetails},
            function(err,doc){
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

};