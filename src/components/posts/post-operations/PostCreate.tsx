import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	useToast,
	VStack
} from '@chakra-ui/react'
import MarkdownIt from 'markdown-it'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import apiClient from '../../../helpers/axios'

const mdParser = new MarkdownIt()

interface PostFormData {
	title: string
	categories: string[]
	content: string
}

interface Category {
	id: string
	title: string
	description: string
}

const CreatePost: React.FC = () => {
	const { register, handleSubmit, reset } = useForm<PostFormData>()
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
	const [markdown, setMarkdown] = useState<string>('')
	const toast = useToast()
	const navigate = useNavigate()

	const onSubmit = async (data: PostFormData) => {
		try {
			const postData = {
				...data,
				content: markdown,
				categories: selectedCategories.map(category => category.title)
			}

			const response = await apiClient.post('/posts', postData)

			toast({
				title: 'Post created successfully!',
				status: 'success',
				duration: 3000,
				isClosable: true
			})

			reset()
			setMarkdown('')
			setSelectedCategories([])
			navigate(`/post/${response.data.id}`)
		} catch (error: any) {
			toast({
				title: error?.response?.data?.message || 'Failed to create post',
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await apiClient.get('/categories')
				setCategories(response.data)
			} catch (error: any) {
				toast({
					title: error?.response?.data?.message || 'Failed to load categories',
					status: 'error',
					duration: 3000,
					isClosable: true
				})
			}
		}
		fetchCategories()
	}, [toast])

	return (
		<VStack
			spacing={8}
			p={8}
			maxW="800px"
			mx="auto"
			bg="brand.50"
			borderRadius="lg"
			boxShadow="lg"
		>
			<Heading color="brand.400">Create a New Post</Heading>
			<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
				<FormControl mb={4}>
					<FormLabel color="brand.300">Title</FormLabel>
					<Input
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
						<Select
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

				<Button
					type="submit"
					bg="brand.300"
					color="brand.0"
					size="lg"
					w="100%"
					_hover={{ bg: 'brand.400' }}
					_active={{ bg: 'brand.500' }}
				>
					Publish Post
				</Button>
			</form>
		</VStack>
	)
}

export default CreatePost
