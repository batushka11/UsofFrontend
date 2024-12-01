import {
	Avatar,
	AvatarBadge,
	Flex,
	HStack,
	Text,
	VStack
} from '@chakra-ui/react'
import React from 'react'
import { check_activity, get_date } from '../post-card/PostCardHelpers'

interface PostPageHeaderProps {
	author: {
		avatarPath?: string
		fullname?: string
		login?: string
		lastActive: string
	}
	post: {
		publishAt?: string
	}
}

const PostPageHeader: React.FC<PostPageHeaderProps> = ({ author, post }) => {
	return (
		<Flex
			justify="space-between"
			align="center"
			marginBottom={6}
			padding={4}
			backgroundColor="brand.100"
			borderRadius="md"
			shadow="md"
		>
			<HStack spacing={4}>
				<Avatar
					size="lg"
					src={author.avatarPath}
					boxShadow="md"
					mr="4"
					borderWidth="3px"
				>
					{check_activity(author.lastActive) ? (
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
				<VStack align="start" spacing={0}>
					<Text fontWeight="bold" color="brand.500">
						{author?.fullname || 'Unknown Author'}
					</Text>
					<Text fontSize="sm" color="brand.500">
						@{author?.login || 'unknown'}
					</Text>
				</VStack>
			</HStack>
			<Text fontSize="sm" color="brand.500">
				{post?.publishAt ? get_date(post.publishAt) : 'Unknown Date'}
			</Text>
		</Flex>
	)
}

export default PostPageHeader
