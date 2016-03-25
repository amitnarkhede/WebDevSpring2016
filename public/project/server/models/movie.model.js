/**
 * Created by amitv on 25-Mar-16.
 */

var mock = require("./movie.mock.json");

module.exports= function(){

    var api = {
        addMovieLike:addMovieLike,
        getMovieLike:getMovieLike,
        updateMovieLike:updateMovieLike,
        deleteMovieUser:deleteMovieUser
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

    function updateMovieLike(userID,imdbID,comment){

        for(index = 0; index < mock.length; index++){
            if(mock[index].user_id == userID && mock[index].imdbID == imdbID){
                //movies.push(mock[index]);
                mock[index].comments = comment;
            }
        }
    }

    function deleteMovieUser(userID,imdbID){
        var removed = -1;
        for(index = 0; index < mock.length; index++){
            if(mock[index].user_id == userID && mock[index].imdbID == imdbID){
                removed = index;
                break;
            }
        }

        if(removed>=0){
            mock.splice(removed,1);
        }
    }
};