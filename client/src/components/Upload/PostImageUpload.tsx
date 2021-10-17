import React, { useEffect } from 'react'
import cookie from 'js-cookie'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'

import ImageUploadModal from 'components/Modals/ImageUploadModal'
import ImagePreview from 'components/Images/ImagePreview'
import {
	POST_CONTENT,
	POST_TITLE,
} from 'components/Post/CreatePost/CreatePostModal'

import { useGetNewsFeedPost } from 'hooks/useGetPost'

import UploadAlert, { Props as AlertProps } from 'components/Alerts/Alert'

import {
	openUploadModal,
	closePreviewModal,
	closeUploadModal,
	makeBase64Image,
	openPreviewModal,
	resetState,
} from 'redux/slices/createPost'
import { useAppSelector, useAppDispatch } from 'redux/hooks/hooks'

const useStyles = makeStyles(() => ({
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

export type Base64 = ArrayBuffer | string | null

const ProfilePictureUpload = () => {
	const dispatch = useAppDispatch()

	const { mutate } = useGetNewsFeedPost()

	const { editIconStyle } = useStyles()

	const {
		uploading,
		alertProps,
		uploadModal,
		previewModal,
		previewLink,
		successful,
		failed,
	} = useAppSelector(state => state.createPost)

	useEffect(() => {
		if (successful) {
			mutate()
			cookie.remove(POST_TITLE)
			cookie.remove(POST_CONTENT)
		}

		if (successful || failed) {
			setTimeout(() => {
				dispatch(resetState())
			}, 3000)
		}
	}, [successful, failed])

	const closeReset = () => {
		dispatch(resetState())
	}

	const uploadModalProps = {
		closeModal: () => dispatch(closeUploadModal()),
		uploadModal,
		makeImage: (base64: Base64) => dispatch(makeBase64Image(base64)),
		openPreviewModal: (link: string) => dispatch(openPreviewModal(link)),
		closeReset,
	}

	const handleDiscard = () => {
		dispatch(closePreviewModal())
		dispatch(openUploadModal())
	}

	const handleAccept = () => {
		dispatch(closePreviewModal())
	}

	const imagePreviewProps = {
		previewLink,
		previewModal,
		handleDiscard,
		handleAccept,
	}

	return (
		<>
			<IconButton
				onClick={() => dispatch(openUploadModal())}
				className={editIconStyle}
			>
				<EditIcon />
			</IconButton>

			{uploadModal && <ImageUploadModal {...uploadModalProps} />}

			{previewModal && <ImagePreview {...imagePreviewProps} />}

			{(uploading || successful || failed) && (
				<UploadAlert {...(alertProps as AlertProps)} />
			)}
		</>
	)
}

export default ProfilePictureUpload
