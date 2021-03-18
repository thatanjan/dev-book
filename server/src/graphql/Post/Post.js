import merge from 'lodash/merge'

import PostType from 'graphql/Post/PostType'
import createDeletePost from 'graphql/Post/createDeletePost'
import getPost from 'graphql/Post/getPost'
import likePost from 'graphql/Post/likePost'
import commentPost from 'graphql/Post/commentPost'
import editPost from 'graphql/Post/editPost'
import getLikes from 'graphql/Post/getLikes'

export const PostTypedefs = [PostType]

export const PostResolvers = merge(
	createDeletePost,
	getPost,
	commentPost,
	likePost,
	editPost,
	getLikes
)
