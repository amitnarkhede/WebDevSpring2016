/**
 * Created by amitv on 01-Apr-16.
 */

module.exports = function(mongoose) {
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        created: Date,
        updated: Date
        //fields: [String]
    }, {collection: 'assignment.form'});

    return FormSchema;
}