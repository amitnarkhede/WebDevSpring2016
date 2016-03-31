/**
 * Created by amitv on 31-Mar-16.
 */

module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'assignment.user'});
    return UserSchema;
};