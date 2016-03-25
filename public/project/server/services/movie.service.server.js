/**
 * Created by amitv on 25-Mar-16.
 */

module.exports = function(app,movieModel) {
    app.get("/api/project/getmovielike/:userid", getMovieLike);
    app.post("/api/project/addmovielike", addMovieLike);

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
}