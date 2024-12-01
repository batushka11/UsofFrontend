import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Post } from '../FetchPosts'
import { check_activity, get_date } from './PostCardHelpers'
import MenuActions from './PostCardMenuAction'

const PostCardHeader: React.FC<{ post: Post }> = ({ post }) => {
	const { user } = useAppSelector(state => state.auth)

	return (
		<Flex direction="column" ml="2">
			{user.role === 'ADMIN' || user.id === post.author.id ? (
				post.status === 'ACTIVE' ? (
					<Text color="green.500" fontSize="lg" mr="2">
						✅
					</Text>
				) : (
					<Text color="red.500" fontSize="lg" mr="2">
						❌
					</Text>
				)
			) : (
				''
			)}
			<Flex align="center" justify="space-between" mt="2" width="100%">
				<Flex align="center">
					<Avatar
						size="lg"
						src={post.author.avatar}
						boxShadow="md"
						mr="4"
						borderWidth="3px"
					>
						{check_activity(post.author.activity) ? (
							<AvatarBadge
								boxSize="18"
								bg="green.500"
								borderWidth="2px"
								borderColor="brand.400"
							/>
						) : (
							<AvatarBadge
								boxSize="18"
								bg="gray.500"
								borderWidth="2px"
								borderColor="brand.400"
							/>
						)}
					</Avatar>
					<Flex direction="column">
						<Text fontWeight="bold" color="brand.400">
							{post.author.login}
						</Text>
						<Text fontSize="sm" color="brand.400">
							Published: {get_date(post.publishAt)}
						</Text>
					</Flex>
				</Flex>
				<MenuActions post={post} />
			</Flex>
		</Flex>
	)
}

export default PostCardHeader
