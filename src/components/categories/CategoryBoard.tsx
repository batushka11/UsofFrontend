import {
	Box,
	Button,
	Flex,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Spinner,
	Text,
	Textarea,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import apiClient from '../../helpers/axios'
import { useAppSelector } from '../../hooks/reduxHooks'
import CategoryCard from './CategoryCard'

export interface Category {
	id: number
	title: string
	description: string
}

interface FormData {
	title: string
	description: string
}

const CategoryBoard: React.FC = () => {
	const { register, handleSubmit, reset } = useForm<FormData>()
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const toast = useToast()
	const { user } = useAppSelector(state => state.auth)

	const {
		isOpen: isCreateOpen,
		onOpen: onCreateOpen,
		onClose: onCreateClose
	} = useDisclosure()

	useEffect(() => {
		const fetchCategories = async () => {
			setLoading(true)
			try {
				const response = await apiClient('/categories')
				setCategories(response.data)
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
		fetchCategories()
	}, [toast])

	const onSubmit: SubmitHandler<FormData> = async data => {
		setLoading(true)
		try {
			await apiClient.post('/categories', data)
			toast({
				title: 'Category created successfully!',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			onCreateClose()
			reset()
			const response = await apiClient('/categories')
			setCategories(response.data)
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
				Categories
			</Text>
			{user.role === 'ADMIN' && (
				<IconButton
					aria-label="Create new category"
					icon={<MdOutlineCreateNewFolder fontSize="30" />}
					variant="ghost"
					color="brand.500"
					_hover={{ color: 'brand.300', bg: 'brand.100' }}
					onClick={onCreateOpen}
					fontSize="20px"
					mb="2"
				/>
			)}
			{loading ? (
				<Flex justify="center" align="center" minH="200px">
					<Spinner size="xl" />
				</Flex>
			) : (
				<SimpleGrid columns={3} spacing="6">
					{categories.map(category => (
						<CategoryCard key={category.id} category={category} />
					))}
				</SimpleGrid>
			)}

			<Modal isOpen={isCreateOpen} onClose={onCreateClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="lg">
					<ModalHeader color="brand.500">Create Category</ModalHeader>
					<ModalCloseButton />
					<form id="category-form" onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<Input
								placeholder="Category Title"
								borderColor="brand.300"
								mb="4"
								{...register('title', { required: 'Title is required' })}
								_focus={{
									borderColor: 'brand.400',
									boxShadow: '0 0 0 2px brand.400'
								}}
							/>
							<Textarea
								placeholder="Category Description"
								borderColor="brand.300"
								mb="4"
								{...register('description', {
									required: 'Description is required'
								})}
								_focus={{
									borderColor: 'brand.400',
									boxShadow: '0 0 0 2px brand.400'
								}}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								isLoading={loading}
								bg="brand.300"
								color="brand.0"
								_hover={{ bg: 'brand.400' }}
								type="submit"
								form="category-form"
							>
								Save
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default CategoryBoard
