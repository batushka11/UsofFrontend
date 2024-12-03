import { EditIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import MarkdownIt from 'markdown-it'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import ReactSelect from 'react-select'
import apiClient from '../../../helpers/axios'
import { useAppSelector } from '../../../hooks/reduxHooks'

const mdParser = new MarkdownIt()

interface PostFormData {
	title: string
	categories: string[]
	content: string
	status: string
}

interface Category {
	id: string
	title: string
	description: string
}

const UpdatePost: React.FC<any> = ({ post, initialSelectedCategories }) => {
	const { user } = useAppSelector(state => state.auth)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [loading, setLoading] = useState<boolean>(false)
	const { register, handleSubmit, reset } = useForm<PostFormData>()
	const [markdown, setMarkdown] = useState<string>(post.content || '')
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategories, setSelectedCategories] = useState<Category[]>(
		initialSelectedCategories?.map((item: { category: any }) => item.category)
	)
	const toast = useToast()

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await apiClient.get('/categories')
				setCategories(response.data)
			} catch (error: any) {
				toast({
					title: error?.response?.data?.message || 'Failed to fetch categories',
					status: 'error',
					duration: 3000,
					isClosable: true
				})
			}
		}
		fetchCategories()
	}, [toast])

	const onSubmit = async (data: PostFormData) => {
		setLoading(true)
		try {
			const postData = {
				...data,
				content: markdown,
				categories: selectedCategories.map(category => category.title)
			}
			if (postData.title.trim() === '' || postData.content.trim() === '') {
				toast({
					title: 'Title or content cannot contain only whitespaces',
					status: 'error',
					duration: 3000,
					isClosable: true
				})
				return
			}
			await apiClient.patch(`/posts/${post.id}`, postData)

			toast({
				title: 'Post updated successfully!',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
		} catch (error: any) {
			toast({
				title: error?.response?.data?.message || 'Failed to update post',
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		} finally {
			setLoading(false)
			reset()
			onClose()
			window.location.reload()
		}
	}

	return (
		<>
			<IconButton
				icon={<EditIcon />}
				aria-label="Edit Post"
				variant="ghost"
				color="brand.500"
				fontSize="22px"
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose} size="90%">
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="lg">
					<ModalHeader>
						<Heading size="md" color="brand.400">
							Update Post
						</Heading>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							{user.id === post?.authorId && (
								<>
									<FormControl mb={4}>
										<FormLabel color="brand.300">Title</FormLabel>
										<Input
											defaultValue={post?.title}
											{...register('title', { required: true })}
											placeholder="Enter the post title"
											size="lg"
											borderColor="brand.200"
											_focus={{
												borderColor: 'brand.400',
												boxShadow: '0 0 0 2px #7F5539'
											}}
										/>
									</FormControl>

									<FormControl mb={4}>
										<FormLabel color="brand.300">Categories</FormLabel>
										<Box border="1px" borderColor="brand.200" borderRadius="md">
											<ReactSelect
												isMulti
												options={categories.map(category => ({
													value: category.id,
													label: category.title
												}))}
												value={selectedCategories.map(category => ({
													value: category.id,
													label: category.title
												}))}
												onChange={selectedOptions =>
													setSelectedCategories(
														selectedOptions.map(option => ({
															id: option.value,
															title: option.label,
															description: ''
														}))
													)
												}
												placeholder="Select categories"
												styles={{
													control: base => ({
														...base,
														borderColor: '#7F5539',
														boxShadow: '0 0 0 2px #7F5539',
														background: 'whitesmoke'
													})
												}}
											/>
										</Box>
									</FormControl>

									<FormControl mb={4}>
										<FormLabel color="brand.300">Content</FormLabel>
										<Box
											border="1px"
											borderColor="brand.200"
											borderRadius="md"
											p={4}
											bg="brand.100"
										>
											<MdEditor
												value={markdown}
												renderHTML={text => mdParser.render(text)}
												onChange={({ text }) => setMarkdown(text)}
												style={{ height: '400px' }}
											/>
										</Box>
									</FormControl>
								</>
							)}

							<FormControl mb={4}>
								<FormLabel color="brand.300">Status</FormLabel>
								<Select {...register('status', { required: true })}>
									<option value="ACTIVE">Active</option>
									<option value="INACTIVE">Inactive</option>
								</Select>
							</FormControl>

							<Button
								type="submit"
								bg="brand.300"
								color="brand.0"
								size="lg"
								w="100%"
								_hover={{ bg: 'brand.400' }}
								_active={{ bg: 'brand.500' }}
								isLoading={loading}
							>
								Update post
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default UpdatePost
