import apiClient from '../../helpers/axios'

interface Category {
	title: string
	description: string
}

export interface Post {
	id: number
	title: string
	content: string
	publishAt: string
	rating: number
	status: string
	author: {
		login: string
		avatar: string
		activity: string
	}
	categories: Category[]
	commentsCount: number
}

const fetchPostsWithDetails = async (
	page: number,
	path: string
): Promise<Post[]> => {
	const response = await apiClient.get(`${path}?page=${page}&limit=10`)
	const posts = response.data.posts

	const detailedPosts = await Promise.all(
		posts.map(async (post: any) => {
			try {
				const [author, categoriesResponse, commentsResponse] =
					await Promise.all([
						apiClient.get(`/users/${post.authorId}`),
						apiClient.get(`/posts/${post.id}/categories`),
						apiClient.get(`/posts/${post.id}/comments`)
					])

				const categories =
					categoriesResponse?.data?.map((c: any) => ({
						title: c.category?.title,
						description: c.category?.description
					})) || []
				const commentsCount = commentsResponse?.data?.totalComments
				return {
					...post,
					author: {
						login: author.data.login,
						avatar: author.data.avatarPath,
						activity: author.data.lastActive
					},
					categories,
					commentsCount
				}
			} catch (error) {
				return {
					...post,
					author: { login: 'Unknown', avatar: '' },
					categories: [],
					commentsCount: 0
				}
			}
		})
	)

	return detailedPosts
}

export default fetchPostsWithDetails
