import { Box, Stack, Tag, Text, Tooltip } from '@chakra-ui/react'
import MarkdownIt from 'markdown-it'
import { Post } from '../FetchPosts'
import PostCardFooter from './PostCardFooter'
import PostCardHeader from './PostCardHeader'

const mdParser = new MarkdownIt()

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
	return (
		<Box
			bg="brand.0"
			p="4"
			borderRadius="md"
			shadow="md"
			borderWidth="1px"
			borderColor="brand.300"
			_hover={{ shadow: 'lg' }}
		>
			<PostCardHeader post={post} />
			<Text fontSize="xl" fontWeight="bold" color="brand.400" mb="2" mt="2">
				{post.title}
			</Text>

			<Box
				bg="brand.0"
				mb="4"
				dangerouslySetInnerHTML={{
					__html: mdParser.render(post?.content || '')
				}}
				noOfLines={4}
			/>
			<Stack direction="row" spacing="2" mb="4">
				{post.categories.map((category, index) => (
					<Tooltip
						key={index}
						label={category.description}
						fontSize="sm"
						bg="brand.200"
						color="brand.500"
						borderRadius="5px"
					>
						<Tag bg="brand.500" color="white" fontSize="sm" cursor="pointer">
							{category.title}
						</Tag>
					</Tooltip>
				))}
			</Stack>
			<PostCardFooter post={post} />
		</Box>
	)
}

export default PostCard
