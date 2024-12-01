import { Box, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Category } from './CategoryBoard'

interface CategoryProps {
	category: Category
}

const CategoryCard: React.FC<CategoryProps> = ({ category }) => {
	const navigate = useNavigate()
	return (
		<Box
			bg="brand.0"
			p="6"
			borderRadius="lg"
			shadow="md"
			borderWidth="1px"
			borderColor="brand.300"
			_hover={{
				shadow: 'xl',
				transform: 'scale(1.05)',
				transition: 'all 0.2s ease-in-out'
			}}
			transition="transform 0.2s ease-in-out"
		>
			<VStack
				align="start"
				spacing={3}
				onClick={() => navigate(`/category/${category.id}/posts`)}
			>
				<Text fontSize="2xl" fontWeight="bold" color="brand.400" mb="2">
					{category.title}
				</Text>
				<Text fontSize="lg" fontWeight="medium" color="brand.400" mb="4">
					{category.description}
				</Text>
			</VStack>
		</Box>
	)
}

export default CategoryCard
