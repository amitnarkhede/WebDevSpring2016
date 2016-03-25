/**
 * Created by amitv on 25-Mar-16.
 */

module.exports = function(app,movieModel) {
    app.get("/api/project/getmovielike/:userid", getMovieLike);
    app.post("/api/project/addmovielike", addMovieLike);
    app.put("/api/project/updatecomment",updateComment);
    app.delete("/api/project/deletemovie/:userid/:imdbid",deleteMovie);

    function getMovieLike(req,res){
        var userId  = req.params.userid;
        var movies = movieModel.getMovieLike(userId);
        //console.log(movies);
        res.send(movies);
    };

    function addMovieLike(req,res){
        var movieDetails = req.body;
        movieModel.addMovieLike(movieDetails);
        res.send(200);
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

        movieModel.deleteMovieUser(userID,imdID);
        res.send(200);
    };
}