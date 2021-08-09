import { gql } from 'apollo-server-express'

const PostTypedefs = gql`
	extend type Query {
		getSinglePost(Input: GetPostInput!): SinglePost!
		getAllPost(Input: GetAllPostInput!): ReturnAllPost!
		getAllPostNoAuth(Input: GetAllPostInput!): ReturnAllPostNoAuth!
		getNewsFeedPost(skip: Int!): ReturnAllPost!
		getTotalLikes(Input: GetPostInput!): TotalLikes!
		getTotalComments(Input: GetPostInput!): TotalComments!
		getAllComments(Input: GetAllCommentsLikesInput!): GetAllComments!
		getAllLikes(Input: GetAllCommentsLikesInput!): GetAllLikes!
		hasLiked(Input: GetPostInput!): Boolean!
	}

	extend type Mutation {
		createPost(Input: CreatePostInput!): ErrorOrMessage!
		deletePost(postID: ID!): ErrorOrMessage!
		likePost(Input: GetPostInput!): ErrorOrMessage!
		removeLikePost(Input: GetPostInput!): ErrorOrMessage!
		commentPost(Input: CommentPostInput!): ErrorOrMessage!
		removeCommentPost(Input: RemoveCommentInput!): ErrorOrMessage!
		editPost(Input: EditPostInput!): ErrorOrMessage!
	}

	type Post {
		content: String!
		_id: ID!
		image: String!
		title: String!
		markdown: Boolean!
		totalLikes: Int!
		totalComments: Int!
		date: Date!
		"""
		UserNameIDPic type is from graphql/Follow/FollowType file
		"""
		user: UserNameIDPic
		hasLiked: Boolean!
	}

	type PostNoAuth {
		content: String!
		_id: ID!
		image: String!
		title: String!
		markdown: Boolean!
		date: Date!
		user: UserNameIDPic
	}

	type SinglePost {
		post: Post
		errorMessage: String
	}

	type ReturnAllPost {
		posts: [Post]
		errorMessage: String
	}

	type ReturnAllPostNoAuth {
		posts: [PostNoAuth]
		errorMessage: String
	}

	type GetAllLikes {
		users: [UserNameIDPic]
		errorMessage: String
	}

	type Comment {
		user: UserNameIDPic!
		text: String!
		date: Date!
	}

	type GetAllComments {
		comments: [Comment]
		errorMessage: String
	}

	type TotalComments {
		totalComments: Int
		errorMessage: String
	}

	type TotalLikes {
		totalLikes: Int
		errorMessage: String
	}

	input GetAllPostInput {
		user: ID!
		skip: Int!
	}

	input GetPostInput {
		postID: ID!
		user: ID!
	}

	input CommentPostInput {
		text: String!
		postID: ID!
		user: ID!
	}

	input RemoveCommentInput {
		postID: ID!
		user: ID!
		commentID: ID!
	}

	input CreatePostInput {
		content: String!
		image: String!
		title: String!
		markdown: Boolean!
	}

	input EditPostInput {
		postID: ID!
		content: String
		image: String
		title: String
		markdown: Boolean
	}

	input GetAllCommentsLikesInput {
		skip: Int!
		postID: ID!
		user: ID!
	}
`
export default PostTypedefs
