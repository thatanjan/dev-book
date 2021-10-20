import * as React from 'react'
import dynamic from 'next/dynamic'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import { Theme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Cookies from 'js-cookie'
import { mutate } from 'swr'

import { getTotalComments } from 'graphql/queries/postQueries'
import CircularLoader from 'components/Loaders/CircularLoader'

import createRequest from 'utils/createRequest'
import showAlert from 'utils/showAlert'
import { commentPost } from 'graphql/mutations/postMutations'

const AutoExpandField = dynamic(
	() => import('components/TextFields/AutoExpandField'),
	{ loading: () => <CircularLoader /> }
)

interface Values {
	comment: string
}

interface Props {
	postID: string
	postUserID: string
	setNewCommentAdded: (val: boolean) => void
	setShowAlert: (val: boolean) => void
}

function CommentForm({
	postID,
	setNewCommentAdded,
	postUserID,
	setShowAlert,
}: Props) {
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	return (
		<Formik
			initialValues={{
				comment: Cookies.get('comment') || '',
			}}
			validate={(values: Values) => {
				const errors: Partial<Values> = {}
				const { comment } = values

				if (!comment) errors.comment = 'Required'

				if (comment.length > 1000)
					errors.comment = 'Comment has to be under 1000 characters long'

				return errors
			}}
			onSubmit={async ({ comment }, { resetForm }) => {
				try {
					const values = { text: comment, postID, user: postUserID }
					const res = await createRequest({ key: commentPost, values })
					Cookies.remove('comment')

					const {
						commentPost: { message, errorMessage },
					} = res

					if (message) {
						setNewCommentAdded(true)
						resetForm()
						mutate([getTotalComments, postID])
					}

					if (errorMessage) {
						showAlert(setShowAlert)
					}
				} catch (_) {
					showAlert(setShowAlert)
				}
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Field component={AutoExpandField} name='comment' />
					<br />
					<Button
						size={matches ? 'medium' : 'small'}
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
						style={{
							marginTop: '1rem',
						}}
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default CommentForm
