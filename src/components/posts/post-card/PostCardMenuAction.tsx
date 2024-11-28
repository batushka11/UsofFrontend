import {
	Flex,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList
} from '@chakra-ui/react'
import { useState } from 'react'
import { BsBellSlashFill } from 'react-icons/bs'
import { FaBookmark } from 'react-icons/fa'
import { FiBell, FiBookmark, FiMoreVertical } from 'react-icons/fi'
import { GoBookmarkSlashFill } from 'react-icons/go'
import { Post } from '../FetchPosts'
import { usePostActions } from './PostCardAction'

const MenuActions: React.FC<{ post: Post }> = ({ post }) => {
	const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked)
	const [isSubscribed, setIsSubscribed] = useState(post.isSubscribed)
	const {
		handleBookmarkClick,
		handleSubscribeClick,
		handleUnBookmarkClick,
		handleUnSubscribeClick
	} = usePostActions()

	return (
		<Flex align="center" gap="2" mt="-50px">
			{isSubscribed && (
				<Icon as={FiBell} boxSize="5" color="brand.400" mr="2" />
			)}
			{isBookmarked && (
				<Icon as={FaBookmark} boxSize="5" color="brand.400" mr="-2" />
			)}

			<Menu placement="auto">
				<MenuButton
					as={IconButton}
					aria-label="settings"
					icon={<FiMoreVertical />}
					variant="ghost"
					fontWeight="bold"
					size="lg"
				/>
				<MenuList bg="brand.400">
					<MenuItem
						icon={
							isBookmarked ? (
								<GoBookmarkSlashFill size="16" />
							) : (
								<FiBookmark size="16" />
							)
						}
						onClick={() =>
							isBookmarked
								? handleUnBookmarkClick(post.id, setIsBookmarked)
								: handleBookmarkClick(post.id, setIsBookmarked)
						}
						bg="brand.400"
						color="brand.50"
						_hover={{ bg: 'brand.300' }}
					>
						{isBookmarked ? 'Remove from bookmark' : 'Add to Bookmark'}
					</MenuItem>
					<MenuItem
						icon={
							isSubscribed ? (
								<BsBellSlashFill size="16" />
							) : (
								<FiBell size="16" />
							)
						}
						onClick={() =>
							isSubscribed
								? handleUnSubscribeClick(post.id, setIsSubscribed)
								: handleSubscribeClick(post.id, setIsSubscribed)
						}
						bg="brand.400"
						color="brand.50"
						_hover={{ bg: 'brand.300' }}
					>
						{isSubscribed ? 'Unsubscribe' : 'Subscribe'}
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	)
}

export default MenuActions
