import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import { FOLLOWEES } from 'variables/global'

const checkIfUserExist = async (field, myID, otherUserID) => {
	const filter = {}
	filter[field] = { $in: otherUserID }

	const query = await Follow.findOne({ user: myID, ...filter }, 'user')

	return query
}

const unfollowUser = async (_, { user }, { user: { id } }) => {
	try {
		const filter = {}
		filter.followees = { $in: user }

		const followeesQuery = await checkIfUserExist(FOLLOWEES, id, user)

		if (!followeesQuery) {
			return sendErrorMessage('You are not following the user')
		}

		const followeesUpdate = await Follow.updateOne(
			{ user: id },
			{ $pull: { followees: user }, $inc: { totalFollowees: -1 } }
		)

		const followersUpdate = await Follow.updateOne(
			{ user },
			{ $pull: { followers: id }, $inc: { totalFollowers: -1 } }
		)

		if (followeesUpdate.nModified === 1 && followersUpdate.nModified === 1)
			return sendMessage('you have unfollowed this user')

		return sendErrorMessage('something went wrong')
	} catch (error) {
		return sendErrorMessage(error)
	}
}

const followUser = async (_, { user }, { user: { id } }) => {
	try {
		const filter = {}
		filter.followees = { $in: user }

		const followeesQuery = await checkIfUserExist(FOLLOWEES, id, user)

		if (followeesQuery) {
			return sendErrorMessage('You are already following the user')
		}

		const followeesUpdate = await Follow.updateOne(
			{ user: id },
			{ $push: { followees: user }, $inc: { totalFollowees: 1 } }
		)

		const followersUpdate = await Follow.updateOne(
			{ user },
			{ $push: { followers: id }, $inc: { totalFollowers: 1 } }
		)

		if (followeesUpdate.nModified === 1 && followersUpdate.nModified === 1)
			return sendMessage('you are now following this user')

		return sendErrorMessage('something went wrong')
	} catch (error) {
		return sendErrorMessage(error)
	}
}

const resolver = {
	Mutation: {
		followUser,
		unfollowUser,
	},
}

export default resolver
