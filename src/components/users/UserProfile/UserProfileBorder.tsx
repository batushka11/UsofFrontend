import { Button, Spinner, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../../helpers/axios'
import PostsPart from './PostPart'
import ProfilePart from './ProfilePart'

const UserProfileBoard = () => {
	const navigate = useNavigate()
	const toast = useToast()
	const { id } = useParams<{ id: string }>()
	const [loading, setLoading] = useState<boolean>(false)
	const [user, setUser] = useState<any>()

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true)
			try {
				const response = await apiClient.get(`/users/${id}`)
				setUser(response.data)
			} catch (error) {
				toast({
					title: 'Error fetching user',
					status: 'error',
					duration: 5000,
					isClosable: true
				})
			} finally {
				setLoading(false)
			}
		}
		fetchUser()
	}, [id, toast])

	if (loading) return <Spinner />
	if (!user) return <Text>No user data available</Text>

	return (
		<>
			<Button
				bg="brand.200"
				color="brand.400"
				_hover={{ bg: 'brand.300', color: 'bg.500' }}
				onClick={() => navigate(-1)}
			>
				Back
			</Button>
			<ProfilePart user={user} />
			<PostsPart />
		</>
	)
}

export default UserProfileBoard
