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
        deleteMovieUser:deleteMovieLike,
        getMovieDetails:getMovieDetails,
        getMovieComments:getMovieComments
    };

    return api;

    function addMovieLike(movieDetails){

        var deferred = q.defer();

        movieDetails.isLiked = true;

        var imdbID = movieDetails.imdbID;
        var userID = movieDetails.userID;

        relationModel.find({ imdbID: imdbID , userID : userID},function(err,doc){

            if(!doc[0]){
                relationModel.create(movieDetails,function(err,doc){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc);
                    }
                });
            }else{

                relationModel.update({imdbID : imdbID , userID : userID},{$set : movieDetails},function(err,doc){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc);
                    }
                })
            }
        });



        //return a promise
        return deferred.promise;
    };

    function getMovieLike(userId){
        var deferred = q.defer();

        relationModel
            .find({
                    $and:[{userID : userId},
                        {$or: [{isLiked: true},{comment:{'$ne':""}}]}
                    ]
                },
                function(err,doc){
                    deferred.resolve(doc);
                });

        return deferred.promise;
    };

    function checkIfLiked(userId,imdbId){

        var deferred = q.defer();
        relationModel.find(
            {userID: userId, imdbID : imdbId, isLiked : true},
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

    function deleteMovieLike(userID,imdbID){

        var deferred = q.defer();

        relationModel.update({userID : userID , imdbID: imdbID},{$set : {isLiked : false}},
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

        relationModel.find({imdbID:imdbID,comment:{'$ne':""}},
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