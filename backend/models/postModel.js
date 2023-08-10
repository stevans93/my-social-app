const {Schema, model} = require('mongoose');

const TagsSchema = new Schema({
    name: {type: String, required: true},
}, {_id: false});

const validateField = (field) => field.length > 0;

const PostSchema = new Schema({
    body: {
        type: String,
        validate: {
            validator: validateField,
            message: "Body must have at least one tag"
        }
    },
    title: {type: String},
    userId: {type: Schema.Types.ObjectId, required: true},
    image: {type: String, required: true},
    isPublic: {type: Boolean, default: false},
    reactions: {type: Number, default: 0},
    createdAt: {type: Date, default: () => new Date().getTime()},
    updatedAt: {type: Date, default: null},
    tags: {
        type: [TagsSchema],
        validate: {
            validator: (tags) => {
                return tags.length > 0;
            },
            message: "Must have at least one tag"
        }
    },
});

const PostModel = model("posts", PostSchema);
module.exports = PostModel;