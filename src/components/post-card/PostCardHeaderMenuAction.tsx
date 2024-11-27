import {
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useToast
} from '@chakra-ui/react'
import { FiBell, FiBookmark, FiMoreVertical } from 'react-icons/fi'
import apiClient from '../../helpers/axios'
import { Post } from '../posts/FetchPosts'

const MenuActions: React.FC<{ post: Post }> = ({ post }) => {
	const toast = useToast()
	const handleBookmarkClick = async () => {
		try {
			await apiClient.post(`/posts/${post.id}/favorite`)
			toast({
				title: 'Successfully added to bookmark',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
		} catch (error: any) {
			toast({
				title: error.response?.data?.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	const handleSubscribeClick = async () => {
		try {
			await apiClient.post(`/posts/${post.id}/subscribe`)
			toast({
				title: `Successfully subscribed to this post`,
				status: 'success',
				duration: 3000,
				isClosable: true
			})
		} catch (error: any) {
			toast({
				title: error.response?.data?.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	return (
		<Menu placement="auto">
			<MenuButton
				as={IconButton}
				aria-label="settings"
				icon={<FiMoreVertical />}
				variant="ghost"
				fontWeight="bold"
				size="lg"
				mt="-50px"
			/>
			<MenuList>
				<MenuItem icon={<FiBookmark />} onClick={() => handleBookmarkClick()}>
					Add to Bookmark
				</MenuItem>
				<MenuItem icon={<FiBell />} onClick={() => handleSubscribeClick()}>
					Subscribe
				</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default MenuActions
