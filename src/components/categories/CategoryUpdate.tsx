import {
	Button,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import apiClient from '../../helpers/axios'
import { Category } from './CategoryBoard'
interface CategoryUpdateProps {
	category: Category
}

const CategoryUpdate: React.FC<CategoryUpdateProps> = ({ category }) => {
	const toast = useToast()
	const [loading, setLoading] = useState<boolean>(false)
	const { register, handleSubmit, reset } = useForm()
	const {
		isOpen: isCreateOpen,
		onOpen: onCreateOpen,
		onClose: onCreateClose
	} = useDisclosure()

	const onSubmit = async (data: any) => {
		setLoading(true)
		try {
			await apiClient.patch(`/categories/${category.id}`, data)
			toast({
				title: 'Category created successfully!',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
		} catch (error: any) {
			toast({
				title: error.response.data.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		} finally {
			setLoading(false)
			onCreateClose()
			reset()
			window.location.reload()
		}
	}

	return (
		<>
			<IconButton
				aria-label="Create new category"
				icon={<FaEdit fontSize="18" />}
				variant="ghost"
				color="brand.500"
				_hover={{ color: 'brand.300', bg: 'brand.100' }}
				onClick={onCreateOpen}
				fontSize="20px"
				mb="2"
			/>
			<Modal isOpen={isCreateOpen} onClose={onCreateClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="lg">
					<ModalHeader color="brand.500">Update category</ModalHeader>
					<ModalCloseButton />
					<form id="form" onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<Input
								defaultValue={category.title}
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
								defaultValue={category.description}
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
								form="form"
							>
								Update
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

export default CategoryUpdate
