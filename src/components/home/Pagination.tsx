import { Button, Flex, IconButton } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { getVisiblePages } from './PaginationHelpers'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange
}) => {
	const visiblePages = getVisiblePages(currentPage, totalPages)

	return (
		<Flex justifyContent="center" alignItems="center" mt="6" gap="2">
			<IconButton
				aria-label="Previous Page"
				icon={<FiChevronLeft />}
				isDisabled={currentPage === 1}
				variant="outline"
				bg="brand.0"
				onClick={() => onPageChange(currentPage - 1)}
				size="sm"
				borderWidth="0"
			/>

			{visiblePages[0] !== 1 && (
				<>
					<Button
						variant="outline"
						size="sm"
						bg="brand.0"
						onClick={() => onPageChange(1)}
						_hover={{ bg: 'brand.300' }}
						borderWidth="0"
						color="brand.500"
					>
						1
					</Button>
					{visiblePages[0] > 2 && <span>...</span>}
				</>
			)}

			{visiblePages.map(page => (
				<Button
					key={page}
					variant={page === currentPage ? 'solid' : 'outline'}
					bg={page === currentPage ? 'brand.500' : 'brand.0'}
					color={page === currentPage ? 'brand.50' : 'brand.500'}
					_hover={{ bg: 'brand.300' }}
					onClick={() => onPageChange(page)}
					size="sm"
					borderWidth="0"
				>
					{page}
				</Button>
			))}

			{visiblePages[visiblePages.length - 1] !== totalPages && (
				<>
					{visiblePages[visiblePages.length - 1] < totalPages - 1 && (
						<span>...</span>
					)}
					<Button
						variant="outline"
						size="sm"
						bg="brand.0"
						onClick={() => onPageChange(totalPages)}
						_hover={{ bg: 'brand.300' }}
						borderWidth="0"
						color="brand.500"
					>
						{totalPages}
					</Button>
				</>
			)}

			<IconButton
				aria-label="Next Page"
				icon={<FiChevronRight />}
				isDisabled={currentPage === totalPages}
				variant="outline"
				bg="brand.0"
				onClick={() => onPageChange(currentPage + 1)}
				size="sm"
				borderWidth="0"
			/>
		</Flex>
	)
}

export default Pagination
