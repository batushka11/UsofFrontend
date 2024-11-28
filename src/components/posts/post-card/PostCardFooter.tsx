import { Flex, Icon, Text } from '@chakra-ui/react'
import { AiFillFire } from 'react-icons/ai'
import { FaBook, FaPoop } from 'react-icons/fa'
import { FiMessageCircle } from 'react-icons/fi'
import { Post } from '../FetchPosts'

const PostCardFooter: React.FC<{ post: Post }> = ({ post }) => {
	return (
		<Flex align="center" mt="4" justify="space-between" ml="2">
			<Flex
				align="center"
				gap="2"
				mr={5}
				_hover={{
					color: 'brand.500',
					cursor: 'pointer'
				}}
			>
				<Text
					fontSize="lr"
					fontWeight="bold"
					color="brand.300"
					_hover={{
						color: 'brand.500',
						cursor: 'pointer'
					}}
				>
					Read more
				</Text>
				<Icon as={FaBook} boxSize="5" color="brand.400" />
			</Flex>

			<Flex align="center" gap="4">
				<Flex align="center" gap="2">
					{post.rating < 0 ? (
						<Icon as={FaPoop} color="#5f1e06" boxSize="4" />
					) : (
						<Icon as={AiFillFire} color="orange.500" boxSize="5" />
					)}
					<Text fontSize="sm" fontWeight="bold" color="brand.400">
						{post.rating}
					</Text>
				</Flex>
				<Flex align="center" gap="2">
					<Icon as={FiMessageCircle} boxSize="5" color="brand.400" />
					<Text fontSize="sm" fontWeight="medium" color="brand.400">
						{post.commentsCount} Comments
					</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default PostCardFooter
