/**
 * Created by amitv on 25-Mar-16.
 */

module.exports = function(app,movieModel) {
    app.get("/api/project/getmovielike/:userid", getMovieLike);
    app.get("/api/project/comments/:imdbid", getMovieComments);
    app.get("/api/project/checklike/:userid/:imdbID",checkIfLiked);
    app.post("/api/project/addmovielike", addMovieLike);
    app.put("/api/project/updatecomment",updateComment);
    app.delete("/api/project/deletemovie/:userid/:imdbid",deleteMovie);

    function getMovieLike(req,res){
        var userId  = req.params.userid;

        movieModel.getMovieLike(userId)
            .then(function(movies){
                res.send(movies);
            },function(err){
                res.status(400).send(err);
            });
    };

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
        var userid = updated.userid;
        var imdbID = updated.imdbID;
        var comment = updated.comment;

        movieModel.updateMovieLike(userid,imdbID,comment);
        res.send(200);
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

    function getMovieComments(req,res){
        var imdbID = req.params.imdbid;
        console.log(imdbID);

        movieModel
            .getMovieComments(imdbID)
            .then(function(response){
                    console.log(response);
                    res.send(response);
                },
                function (err) {
                    res.status(400).send(err);
                });

    }
}