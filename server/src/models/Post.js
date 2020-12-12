import mongoose from 'mongoose'

import User from 'models/User'

const Schema = mongoose.Schema

const objectId = Schema.Types.ObjectId

const user = {
    type: objectId,
    ref: User,
}

const LikedUserSchema = new Schema({
    user,
})

const CommentedUserSchema = new Schema({
    user,
    text: { type: String, required: true },
    name: { type: String },
    date: { type: Date, default: Date.now() },
})

const schema = {
    text: { type: String, required: true },
    likes: [LikedUserSchema],
    comments: [CommentedUserSchema],
    public: {
        type: Boolean,
        default: true,
    },
    date: { type: Date, default: Date.now() },
}

export const PostSchema = new Schema(schema, { versionKey: '1' })

const PostModel = (modelName) => {
    const connection = mongoose.createConnection(process.env.POSTS_DB_URI)

    const Post = connection.model(modelName, PostSchema)

    return Post
}

export default PostModel