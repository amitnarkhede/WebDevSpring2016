/**
 * Created by amitv on 25-Mar-16.
 */

module.exports = function(app,movieModel,tmdbKey,$http) {
    app.get("/api/project/getmovielike/:userid", getMovieLike);
    app.get("/api/project/getallmovielike/:userid", getAllMovieActivity);
    app.get("/api/project/comments/:imdbid", getMovieComments);
    app.get("/api/project/getusermovielikes/:imdbid", getUserMovieLikes);

    app.get("/api/project/checklike/:userid/:imdbID",checkIfLiked);
    app.post("/api/project/addmovielike", addMovieLike);
    app.put("/api/project/updatecomment",updateComment);
    app.delete("/api/project/deletemovie/:userid/:imdbid",deleteMovie);
    app.delete("/api/project/deletemovieactivity/:userid/:imdbid",deleteMovieActivity);
    app.get("/api/project/getkey",getTMDBKey);
    app.get("/api/project/popular",fetchPopularMovies);

    function getMovieLike(req,res){
        var userId  = req.params.userid;

        movieModel.getMovieLike(userId)
            .then(function(movies){
                res.send(movies);
            },function(err){
                res.status(400).send(err);
            });
    };

    function getAllMovieActivity(req,res){
        var userId  = req.params.userid;

        movieModel.getAllMovieActivity(userId)
            .then(function(movies){
                res.send(movies);
            },function(err){
                res.status(400).send(err);
            });
    }

    function checkIfLiked(req,res){
        var userId = req.params.userid;
        var imdbId = req.params.imdbID;

        movieModel
            .checkIfLiked(userId,imdbId)
            .then(function(response){
                    res.send(response);
                },
                function(err){
                    res.status(400).send(err);
                });

    };

    function addMovieLike(req,res){
        var movieDetails = req.body;
        movieDetails.created = (new Date).getTime();
        movieModel
            .addMovieLike(movieDetails)
            .then(function(response){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });

    };

    function updateComment(req,res){
        var updated = req.body;

        //console.log(updated);

        var detail = {imdbID: updated.details.imdbID,
            movieTitle:updated.details.Title,
            poster:updated.details.Poster,
            userID: updated.userid,
            username: updated.username,
            comment: updated.comment,
            created: (new Date).getTime()};


        movieModel
            .updateMovieLike(detail)
            .then(function(response){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });

    };

    function deleteMovie(req,res){
        var userID  = req.params.userid;
        var imdID = req.params.imdbid;

        movieModel
            .deleteMovieUser(userID,imdID)
            .then(function(response){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });

    };

    function deleteMovieActivity(req,res){
        var userID  = req.params.userid;
        var imdID = req.params.imdbid;

        movieModel
            .deleteMovieActivity(userID,imdID)
            .then(function(response){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });

    };


    function getMovieComments(req,res){
        var imdbID = req.params.imdbid;

        movieModel
            .getMovieComments(imdbID)
            .then(function(response){
                    res.send(response);
                },
                function (err) {
                    res.status(400).send(err);
                });

    };

    function getUserMovieLikes(req,res){
        var imdbID = req.params.imdbid;

        movieModel
            .getUserMovieLikes(imdbID)
            .then(function(response){
                    res.send(response);
                },
                function (err) {
                    res.status(400).send(err);
                });

    };

    function getTMDBKey(req,res){
        res.send(tmdbKey);
    };

    function fetchPopularMovies(req,res){
        var url = "http://api.themoviedb.org/3/movie/popular?api_key=" + tmdbKey;
        res.send(url);
    }
}