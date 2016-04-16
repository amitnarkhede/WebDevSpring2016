/**
 * Created by amitv on 25-Mar-16.
 */

module.exports= function(uuid,db,mongoose,relationModel){

    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    var MovieModel = mongoose.model('ProjectMovie',MovieSchema);

    var q = require("q");

    var api = {
        addMovieLike:addMovieLike,
        getMovieLike:getMovieLike,
        checkIfLiked:checkIfLiked,
        updateMovieLike:updateMovieLike,
        deleteMovieUser:deleteMovieUser,
        getMovieDetails:getMovieDetails,
        getMovieComments:getMovieComments
    };

    return api;

    function addMovieLike(movieDetails){

        var deferred = q.defer();

        MovieModel.create(movieDetails,function(err,doc){
            relationModel.create(movieDetails,function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }
            })

        });

        //return a promise
        return deferred.promise;
    };

    function getMovieLike(userId){
        var deferred = q.defer();

        relationModel
            .find({userID : userId},
                function(err,doc){
                    deferred.resolve(doc);
                });

        return deferred.promise;
    };

    function checkIfLiked(userId,imdbId){

        var deferred = q.defer();
        relationModel.find(
            {userID: userId, imdbID : imdbId},
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
    };

    function updateMovieLike(userID,imdbID,comment){

        var deferred = q.defer();

        var update = {comment: comment};

        relationModel.update({userID:userID, imdbID:imdbID},
            {$set : update},
            function(err,doc){
                //console.log(doc);
                if(err){
                    deferred.reject(err);
                }else{
                    //console.log(doc);
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function deleteMovieUser(userID,imdbID){

        var deferred = q.defer();

        relationModel.remove({userID : userID , imdbID: imdbID},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    //console.log(doc);
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function getMovieDetails(imdbID){
        var deferred = q.defer();

        MovieModel.findOne({imdbID : imdbID},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function getMovieComments(imdbID){
        var deferred = q.defer();

        relationModel.find({imdbID:imdbID},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
};