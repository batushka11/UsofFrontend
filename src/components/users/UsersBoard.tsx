import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	SimpleGrid,
	Spinner,
	Stack,
	Text,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../helpers/axios'
import { useAppSelector } from '../../hooks/reduxHooks'
import Pagination from '../home/Pagination'
import UserCard from './UserCard'

export interface User {
	id: number
	login: string
	password: string
	fullname: string
	email: string
	avatarPath: string
	role: string
	rating: number
	createdAt: string
	lastActive: string
	postsCount: number
	reactionsCount: number
	commentsCount: number
}

const UsersBoard: React.FC = () => {
	const navigate = useNavigate()
	const { register, handleSubmit, reset } = useForm()
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const toast = useToast()
	const { user } = useAppSelector(state => state.auth)
	const { id } = useParams<{ id: string }>()
	const [totalPages, setTotalPages] = useState(1)
	const [showPassword, setShowPassword] = useState(false)

	const [sortBy, setSortBy] = useState<'rating' | 'createdAt'>('createdAt')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
	const [size, setSize] = useState<number>(15)

	const [tempSortBy, setTempSortBy] = useState<'rating' | 'createdAt'>(
		'createdAt'
	)
	const [tempSortDirection, setTempSortDirection] = useState<'asc' | 'desc'>(
		'desc'
	)
	const [tempSize, setTempSize] = useState<number>(15)

	const {
		isOpen: isCreateOpen,
		onOpen: onCreateOpen,
		onClose: onCreateClose
	} = useDisclosure()

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true)
			try {
				const response = await apiClient.get(
					`/users?page=${id}&size=${size}&sortBy=${sortBy}&order=${sortDirection}`
				)
				setTotalPages(response.data.totalPages)
				setUsers(response.data.users)
			} catch (error: any) {
				toast({
					title: error.response.data.message,
					status: 'error',
					duration: 3000,
					isClosable: true
				})
			} finally {
				setLoading(false)
			}
		}
		fetchUsers()
	}, [toast, id, size, sortBy, sortDirection])

	const handleApplyFilters = () => {
		setSortBy(tempSortBy)
		setSortDirection(tempSortDirection)
		setSize(tempSize)
	}

	const resetFilters = () => {
		setTempSortBy('createdAt')
		setTempSortDirection('desc')
		setTempSize(15)
		setSortBy('createdAt')
		setSortDirection('desc')
		setSize(15)
	}

	const onSubmit = async (data: any) => {
		setLoading(true)
		try {
			await apiClient.post('/users', data)
			toast({
				title: 'User created successfully!',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			onCreateClose()
			reset()
			const response = await apiClient.get(
				`/users?page=${id}&size=${size}&sortBy=${sortBy}&order=${sortDirection}`
			)
			setUsers(response.data.users)
		} catch (error: any) {
			toast({
				title: error.response.data.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box>
			<Text fontSize="3vh" fontWeight="extrabold" mb="2">
				Users
			</Text>
			{user.role === 'ADMIN' && (
				<IconButton
					aria-label="Create new user"
					icon={<MdOutlineCreateNewFolder fontSize="30" />}
					variant="ghost"
					color="brand.500"
					_hover={{ color: 'brand.300', bg: 'brand.100' }}
					onClick={onCreateOpen}
					fontSize="20px"
					mb="2"
				/>
			)}

			<HStack mb="4" spacing={4} alignItems="center">
				<FormControl w="auto">
					<FormLabel>Sort By</FormLabel>
					<Select
						onChange={e =>
							setTempSortBy(e.target.value as 'rating' | 'createdAt')
						}
						value={tempSortBy}
						size="sm"
					>
						<option value="rating">Rating</option>
						<option value="createdAt">Date Created</option>
					</Select>
				</FormControl>
				<FormControl w="auto">
					<FormLabel>Sort Direction</FormLabel>
					<Select
						onChange={e =>
							setTempSortDirection(e.target.value as 'asc' | 'desc')
						}
						value={tempSortDirection}
						size="sm"
					>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</Select>
				</FormControl>
				<FormControl w="auto">
					<FormLabel>Items per page</FormLabel>
					<Select
						onChange={e => setTempSize(Number(e.target.value))}
						value={tempSize}
						size="sm"
					>
						<option value={15}>15</option>
						<option value={21}>21</option>
						<option value={27}>27</option>
						<option value={33}>33</option>
					</Select>
				</FormControl>
				<Box w="auto" mt="6px">
					<Button
						mb="-6"
						colorScheme="brand"
						bg="brand.500"
						color="white"
						size="sm"
						onClick={handleApplyFilters}
					>
						Apply Filters
					</Button>
				</Box>
				<Box w="auto" mt="6px">
					<Button colorScheme="gray" size="sm" onClick={resetFilters} mb="-6">
						Reset Filters
					</Button>
				</Box>
			</HStack>

			{loading ? (
				<Flex justify="center" align="center" minH="200px">
					<Spinner size="xl" />
				</Flex>
			) : (
				<SimpleGrid columns={{ sm: 1, md: 1, lg: 3, xl: 3 }} spacing="5">
					{users.map(user => (
						<UserCard key={user.id} user_={user} />
					))}
				</SimpleGrid>
			)}

			{totalPages > 1 && (
				<Pagination
					currentPage={Number(id)}
					totalPages={totalPages}
					onPageChange={page => navigate(`/users/${page}`)}
				/>
			)}

			<Modal isOpen={isCreateOpen} onClose={onCreateClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="lg">
					<ModalHeader color="brand.500">Create User</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<Stack spacing={4}>
								<HStack>
									<FormControl id="login" isRequired>
										<FormLabel color="brand.400">Username</FormLabel>
										<Input
											type="text"
											focusBorderColor="brand.400"
											{...register('login')}
											color="brand.900"
											bg="brand.0"
										/>
									</FormControl>
									<FormControl id="fullname" isRequired>
										<FormLabel color="brand.400">Full Name</FormLabel>
										<Input
											type="text"
											focusBorderColor="brand.400"
											{...register('fullname')}
											color="brand.900"
											bg="brand.0"
										/>
									</FormControl>
								</HStack>
								<FormControl id="email" isRequired>
									<FormLabel color="brand.400">Email Address</FormLabel>
									<Input
										type="email"
										focusBorderColor="brand.400"
										{...register('email')}
										color="brand.900"
										bg="brand.0"
									/>
								</FormControl>
								<FormControl id="password" isRequired>
									<FormLabel color="brand.400">Password</FormLabel>
									<InputGroup>
										<Input
											type={showPassword ? 'text' : 'password'}
											focusBorderColor="brand.400"
											{...register('password', {
												required: 'Password is required',
												minLength: {
													value: 8,
													message: 'Password must be at least 8 characters'
												}
											})}
											color="brand.900"
											bg="brand.0"
										/>
										<InputRightElement h="full">
											<Button
												variant="ghost"
												onClick={() =>
													setShowPassword(showPassword => !showPassword)
												}
											>
												{showPassword ? <ViewOffIcon /> : <ViewIcon />}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme="blue" type="submit" isLoading={loading}>
								Create
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default UsersBoard
