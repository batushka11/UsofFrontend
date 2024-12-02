import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { get_date } from '../posts/post-card/PostCardHelpers'
import { Category } from './CategoryBoard'
import CategoryDelete from './CategoryDelete'
import CategoryUpdate from './CategoryUpdate'

interface CategoryProps {
	category: Category
}

const CategoryCard: React.FC<CategoryProps> = ({ category }) => {
	const { user } = useAppSelector(state => state.auth)
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
			height="260px"
			display="flex"
			flexDirection="column"
		>
			<VStack align="start" spacing={3} flex="1">
				<Flex justifyContent="space-between" alignItems="center" width="100%">
					<Text fontSize="2xl" fontWeight="bold" color="brand.400">
						{category.title}
					</Text>
					{user.role === 'ADMIN' && (
						<Flex gap="0">
							<CategoryUpdate category={category} />
							<CategoryDelete id={category.id} />
						</Flex>
					)}
				</Flex>

				<Text
					fontSize="lg"
					fontWeight="medium"
					color="brand.400"
					mb="4"
					noOfLines={4}
					flex="1"
				>
					{category.description}
				</Text>
			</VStack>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				mt="auto"
				pt="2"
				borderTop="1px solid"
				borderColor="brand.200"
			>
				<Text fontSize="md" fontWeight="medium" color="brand.400">
					Created: {get_date(category.createdAt)}
				</Text>
				<Text
					fontSize="md"
					fontWeight="medium"
					color="brand.300"
					onClick={() => navigate(`/category/${category.id}/posts/1`)}
					_hover={{ color: 'brand.500' }}
				>
					Explore posts
				</Text>
			</Flex>
		</Box>
	)
}

export default CategoryCard
