import Follow from 'models/Follow'
import { FOLLOWEE, FOLLOWERS } from 'variables/global'

export const getUsers = field => async (_, { Input: { otherUserID } }) => {
	const query = await Follow.findOne({ user: otherUserID }, field).populate(
		field,
		'name _id'
	)

	const users = query[field]

	users.forEach(user => {
		// eslint-disable-next-line
		user.anyUserID = user._id
	})

	return users
}

const checkIfUser = field => async (
	_,
	{ Input: { otherUserId } },
	{ user: { id: ownerId } }
) => {
	if (otherUserId === ownerId) {
		return false
	}
	const query = await Follow.findOne({ user: ownerId }, field)

	const ifUserExist = query[field].includes(otherUserId)

	const result = {}

	if (field === FOLLOWEE) {
		result.isFollowee = ifUserExist
	} else {
		result.isFollower = ifUserExist
	}

	return result
}

const resolver = {
	Query: {
		getFollowers: getUsers(FOLLOWERS),
		getFollowees: getUsers(FOLLOWEE),
		getIsFollower: checkIfUser(FOLLOWERS),
		getIsFollowee: checkIfUser(FOLLOWEE),
	},
}

export default resolver
