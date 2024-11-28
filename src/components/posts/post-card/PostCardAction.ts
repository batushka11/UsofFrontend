import { useToast } from '@chakra-ui/react'
import apiClient from '../../../helpers/axios'

export const usePostActions = () => {
	const toast = useToast()

	const handleBookmarkClick = async (
		postId: number,
		setIsBookmarked: (value: boolean) => void
	) => {
		try {
			await apiClient.post(`/posts/${postId}/favorite`)
			setIsBookmarked(true)
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

	const handleSubscribeClick = async (
		postId: number,
		setIsSubscribed: (value: boolean) => void
	) => {
		try {
			await apiClient.post(`/posts/${postId}/subscribe`)
			setIsSubscribed(true)
			toast({
				title: 'Successfully subscribed to this post',
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

	const handleUnBookmarkClick = async (
		postId: number,
		setIsBookmarked: (value: boolean) => void
	) => {
		try {
			await apiClient.delete(`/posts/${postId}/favorite`)
			setIsBookmarked(false)
			toast({
				title: 'Successfully remove post from bookmark',
				status: 'success',
				duration: 3000,
				isClosable: true
			})

			if (window.location.href.includes('bookmark')) {
				window.location.reload()
			}
		} catch (error: any) {
			toast({
				title: error.response?.data?.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	const handleUnSubscribeClick = async (
		postId: number,
		setIsSubscribed: (value: boolean) => void
	) => {
		try {
			await apiClient.delete(`/posts/${postId}/subscribe`)
			setIsSubscribed(false)
			toast({
				title: 'Successfully removed post from subscribe',
				status: 'success',
				duration: 3000,
				isClosable: true
			})

			if (window.location.href.includes('subscribes')) {
				window.location.reload()
			}
		} catch (error: any) {
			toast({
				title: error.response?.data?.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	return {
		handleBookmarkClick,
		handleSubscribeClick,
		handleUnBookmarkClick,
		handleUnSubscribeClick
	}
}
