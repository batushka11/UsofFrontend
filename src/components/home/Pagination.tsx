import { Button, Flex, IconButton } from '@chakra-ui/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

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
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

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
			/>

			{pageNumbers.map(page => (
				<Button
					key={page}
					variant={page === currentPage ? 'solid' : 'outline'}
					bg="brand.0"
					onClick={() => onPageChange(page)}
					size="sm"
				>
					{page}
				</Button>
			))}

			<IconButton
				aria-label="Next Page"
				icon={<FiChevronRight />}
				isDisabled={currentPage === totalPages}
				variant="outline"
				bg="brand.0"
				onClick={() => onPageChange(currentPage + 1)}
				size="sm"
			/>
		</Flex>
	)
}

export default Pagination
