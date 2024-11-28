export const getVisiblePages = (currentPage: number, totalPages: number) => {
	const pages: number[] = []
	const visibleRange = 2

	if (currentPage <= visibleRange + 1) {
		for (let i = 1; i <= Math.min(visibleRange * 2 + 1, totalPages); i++) {
			pages.push(i)
		}
	} else if (currentPage >= totalPages - visibleRange) {
		for (
			let i = Math.max(1, totalPages - visibleRange * 2);
			i <= totalPages;
			i++
		) {
			pages.push(i)
		}
	} else {
		for (
			let i = currentPage - visibleRange;
			i <= currentPage + visibleRange;
			i++
		) {
			pages.push(i)
		}
	}

	return pages
}
