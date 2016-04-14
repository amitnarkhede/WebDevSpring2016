/**
 * Created by amitv on 14-Apr-16.
 */

module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ProjectRelationSchema = mongoose.Schema({
        imdbID: String,
        userID: String,
        comment: String,
        created: Date
    }, {collection: 'project.user2movie'});
    return ProjectRelationSchema;
};