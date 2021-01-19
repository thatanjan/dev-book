import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { mutate } from 'swr'

import createRequest from 'utils/createRequest'
import { useIsFollower, useIsFollowing } from 'hooks/useFollow'
import { useUserId } from 'hooks/profileContextHooks'
import { useUserID as useOwnerId } from 'hooks/userhooks'
import { follow, unfollow } from 'graphql/mutations/FollowMutations'
import { getIsFollower, getIsFollowing } from 'graphql/queries/followQueries'

export const useStyles = makeStyles(({ spacing }) => ({
	buttonStyle: {
		padding: spacing(1),
	},
}))

const FollowButton = () => {
	const { buttonStyle } = useStyles()

	let buttonText: string

	const userId = useUserId()
	const ownerId = useOwnerId()

	const { data: follower } = useIsFollower(userId)
	const { data: following } = useIsFollowing(userId)

	if (!follower) return <div> ...loading </div>
	if (!following) return <div> ...loading </div>

	let clickHandeler: () => void

	const {
		getIsFollower: { isFollower },
	} = follower

	const {
		getIsFollowing: { isFollowing },
	} = following

	const UNFOLLOW = 'unfollow'

	const mutateData = () => {
		mutate([getIsFollowing, userId])
		mutate([getIsFollower, userId])
	}
	if (!isFollowing && !isFollower) {
		buttonText = 'follow'
		clickHandeler = async () => {
			const data = await createRequest({
				mutation: follow,
				values: { userId },
			})
			mutateData()
		}
	}

	if (isFollowing && isFollower) {
		buttonText = UNFOLLOW
	}

	if (!isFollowing && isFollower) {
		buttonText = 'follow back'
	}

	if (!isFollower && isFollowing) {
		buttonText = UNFOLLOW
		clickHandeler = async () => {
			const data = await createRequest({
				mutation: unfollow,
				values: { userId },
			})
			mutateData()
		}
	}

	return (
		<Button
			className={buttonStyle}
			color='secondary'
			variant='contained'
			onClick={() => clickHandeler()}
		>
			{buttonText}
		</Button>
	)
}

export default FollowButton
