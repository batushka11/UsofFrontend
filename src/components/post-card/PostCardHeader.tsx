import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react'
import { Post } from '../posts/FetchPosts'
import MenuActions from './PostCardHeaderMenuAction'

const check_activity = (date: string): boolean => {
	const givenDate = new Date(date)
	const currentDate = new Date()

	const differenceInMs = currentDate.getTime() - givenDate.getTime()

	const differenceInMinutes = differenceInMs / (1000 * 60)

	return differenceInMinutes <= 15
}

const getRandomColor = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

const PostCardHeader: React.FC<{ post: Post }> = ({ post }) => {
	return (
		<Flex align="center" mt="4" justify="space-between" ml="2">
			<Flex align="center" mb="4">
				<Avatar
					size="lg"
					src={post.author.avatar}
					boxShadow="md"
					mr="4"
					borderColor={getRandomColor()}
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
						Published: {new Date(post.publishAt).toLocaleDateString()}
					</Text>
				</Flex>
			</Flex>
			<MenuActions post={post} />
		</Flex>
	)
}

export default PostCardHeader
