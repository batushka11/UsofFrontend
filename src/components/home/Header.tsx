import { InfoIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
	Avatar,
	AvatarBadge,
	Box,
	Flex,
	HStack,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Tooltip,
	useColorMode,
	useToast,
	VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../helpers/axios'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logout } from '../../redux/auth/authSlice'
import LogoHome from './LogoHome'

const Header: React.FC = () => {
	const { user } = useAppSelector((state: any) => state.auth)
	const dispatch = useAppDispatch()
	const toast = useToast()
	const navigate = useNavigate()
	const { colorMode, toggleColorMode } = useColorMode()

	const [query, setQuery] = useState('')

	const handleSearch = () => {
		if (query === 'Categories') {
			navigate('/categories')
		} else if (query === 'Bookmarks') {
			navigate('/bookmarks/1')
		} else if (query === 'Subscribes') {
			navigate('/subscribes/1')
		} else if (query === 'My posts') {
			navigate('/my-posts/1')
		} else if (query === 'Posts') {
			navigate('/home/1')
		} else if (query === 'Create') {
			navigate('/create-post')
		} else if (query === 'Home') {
			navigate('/home/1')
		} else if (query === 'Users') {
			navigate('/users/1')
		} else if (query === 'Profile') {
			navigate('/my-profile')
		} else {
			navigate('/not-found')
		}
	}

	const handleLogout = async () => {
		await apiClient.post('/auth/logout')
		toast({
			title: 'Sign out successfully',
			status: 'success',
			duration: 3000,
			isClosable: true
		})
		dispatch(logout())
		navigate('/login')
	}

	const handleProfile = () => {
		navigate('/my-profile')
	}

	return (
		<Flex
			px="6"
			height="20"
			alignItems="center"
			bg="brand.400"
			borderBottomWidth="1px"
			borderBottomColor="brand.200"
			justifyContent="space-between"
			position="fixed"
			top="0"
			left="0"
			right="0"
			zIndex="1000"
		>
			<LogoHome />
			<Box flex="1" px={4}>
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						children={<Icon as={FiSearch} color="brand.400" />}
					/>
					<Input
						width="500px"
						borderRadius="full"
						placeholder="Search..."
						bg="brand.50"
						borderColor="brand.200"
						_focus={{ borderColor: 'brand.300' }}
						value={query}
						onChange={e => setQuery(e.target.value)}
						onKeyPress={e => {
							if (e.key === 'Enter') {
								handleSearch()
							}
						}}
					/>
					<Tooltip
						label={
							<Box borderRadius="25px">
								<Text>
									<strong>Type this → Go to:</strong>
								</Text>
								<Text>Categories → `categories`</Text>
								<Text>Bookmarks → `bookmarks`</Text>
								<Text>Subscribes → `subscribes`</Text>
								<Text>My posts → `my-posts`</Text>
								<Text>Posts → `posts`</Text>
								<Text>Create → `create-post`</Text>
								<Text>Home → `home`</Text>
								<Text>Users → `users`</Text>
								<Text>Profile → `my-profile`</Text>
							</Box>
						}
						fontSize="md"
						placement="right"
						hasArrow
					>
						<IconButton
							aria-label="Info"
							icon={<InfoIcon />}
							variant="ghost"
							size="24"
							ml="2"
						/>
					</Tooltip>
				</InputGroup>
			</Box>

			<HStack spacing="6">
				<IconButton
					aria-label="Switch color mode"
					icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					onClick={toggleColorMode}
					variant="ghost"
					size="lg"
				/>
				<FaStar color="#ECC94B" fontSize="lg" />
				<Text fontSize="lg" color="brand.100" fontWeight="bold" ml="-4">
					{user.rating}
				</Text>
				<Flex alignItems="center">
					<Menu>
						<MenuButton>
							<HStack>
								<Avatar
									size="lg"
									src={user.avatarPath}
									boxShadow="md"
									borderWidth="3px"
									mr="4"
								>
									<AvatarBadge
										boxSize="18"
										bg="green.500"
										borderWidth="2px"
										borderColor="brand.400"
									/>
								</Avatar>
								<VStack
									display="flex"
									alignItems="flex-start"
									spacing="1px"
									ml="3"
								>
									<Text fontSize="lg" fontWeight="bold" color="brand.100">
										{user.login}
									</Text>
									<Text fontSize="md" color="brand.50">
										{user.role}
									</Text>
								</VStack>
							</HStack>
						</MenuButton>
						<MenuList bg="brand.200" borderColor="brand.50">
							<MenuItem
								bg="brand.200"
								color="brand.500"
								_hover={{ bg: 'brand.100' }}
								onClick={handleProfile}
								fontSize="18px"
							>
								Profile
							</MenuItem>
							<MenuItem
								bg="brand.200"
								color="brand.500"
								_hover={{ bg: 'brand.100' }}
								onClick={handleLogout}
								fontSize="18px"
							>
								Sign Out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	)
}

export default Header
