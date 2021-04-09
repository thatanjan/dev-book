import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar/Avatar'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { cloudinaryURL } from 'variables/global'

import CircularLoader from 'components/Loaders/CircularLoader'

import { useGetSinglePost } from 'hooks/useGetPost'
import { useGetPersonalData } from 'hooks/useGetProfileData'
import { useOwnUserId } from 'hooks/userhooks'

import Post from 'interfaces/post'

const Alert = dynamic(() => import('components/Alerts/Alert'), {
	loading: () => <CircularLoader />,
})

const CommentList = dynamic(() => import('components/Comment/CommentList'), {
	loading: () => <CircularLoader />,
})

const CommentForm = dynamic(() => import('components/Forms/CommentForm'), {
	loading: () => <CircularLoader />,
})

const SinglePost = dynamic(() => import('./SinglePost'), {
	loading: () => <CircularLoader />,
})

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,

		'& form ': {
			flex: '1 1 auto',
		},
	},
}))

const SinglePostPage = () => {
	const [newCommentAdded, setNewCommentAdded] = useState(false)
	const [showAlert, setShowAlert] = useState(false)

	const { root } = useStyles()

	const ownUserID = useOwnUserId()
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error } = useGetSinglePost({
		user: postUser as string,
		postID: postID as string,
	})

	const { data: myData, error: myError } = useGetPersonalData(ownUserID)

	useEffect(() => {
		if (newCommentAdded) {
			setTimeout(() => {
				setNewCommentAdded(false)
			}, 2000)
		}
	}, [newCommentAdded])

	if (error || myError) return <div>failed to load</div>
	if (!data || !myData) return <div>loading...</div>

	const commentListProps = {
		postID: postID as string,
		postUserID: postUser as string,
		newCommentAdded,
	}

	const {
		getSinglePost: { post },
	} = data

	const {
		getPersonalData: { name, profilePicture },
	} = myData

	const commentFormProps = {
		postID: postID as string,
		ownUserID,
		setNewCommentAdded,
		postUserID: postUser as string,
		setShowAlert,
	}

	return (
		<>
			<SinglePost {...(post as Post)} postPage />

			{showAlert && (
				<Alert checked severity='error' message='Posting comment failed' />
			)}

			<List className={root}>
				<ListItem alignItems='flex-start'>
					<ListItemAvatar>
						<Avatar alt={name} src={cloudinaryURL(profilePicture)} />
					</ListItemAvatar>

					<CommentForm {...commentFormProps} />
				</ListItem>
			</List>

			<CommentList {...commentListProps} />
		</>
	)
}

export default SinglePostPage
