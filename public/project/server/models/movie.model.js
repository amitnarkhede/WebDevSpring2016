/**
 * Created by amitv on 25-Mar-16.
 */

var mock = require("./movie.mock.json");

module.exports= function(){

    var api = {
        addMovieLike:addMovieLike,
        getMovieLike:getMovieLike
    };

    return api;

    function addMovieLike(movieDetails){
        mock.push(movieDetails);
    };

    function getMovieLike(userId){
        var movies = [];

        for(index = 0; index < mock.length; index++){
            if(mock[index].user_id == userId){
                movies.push(mock[index]);
            }
        }

        return movies;
    };
};