/**
 * Created by amitv on 14-Apr-16.
 */

module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ProjectUserRelationSchema = mongoose.Schema({
        follower_id: String,
        follower_username:String,
        following_id:String,
        following_username: String
    }, {collection: 'project.user2user'});
    return ProjectUserRelationSchema;
};