/**
 * Created by amitv on 14-Apr-16.
 */

module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ProjectMovieSchema = mongoose.Schema({
        imdbID: String,
        title: String,
        poster: String
    }, {collection: 'project.movie'});
    return ProjectMovieSchema;
};