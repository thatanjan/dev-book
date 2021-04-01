import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'

import ListContainer from 'components/List/UserListContainer'
import { PostUser as User } from 'interfaces/post'
import { useGetAllLikes } from 'hooks/likeHooks'

interface Props {
	children: React.ReactNode
}

const AllLovedUser = ({ children }: Props) => {
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error, size, setSize } = useGetAllLikes({
		postID: postID as string,
		user: postUser as string,
	})

	if (error) return <div> Error Happened </div>

	let isLoadingMore = true

	let allLikers: User[] = []

	if (data) {
		if (data[size - 1]) {
			if (data[size - 1].getAllLikes?.users.length === 0) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			allLikers = [...allLikers, ...element.getAllLikes.users]
		})
	}

	return (
		<ListContainer>
			<InfiniteScroll
				dataLength={allLikers.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore}
				loader={<h4>Loading...</h4>}
			>
				{children}
			</InfiniteScroll>
		</ListContainer>
	)
}

export default AllLovedUser
