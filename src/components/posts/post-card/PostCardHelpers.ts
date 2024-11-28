export const check_activity = (date: string): boolean => {
	const givenDate = new Date(date)
	const currentDate = new Date()

	const differenceInMs = currentDate.getTime() - givenDate.getTime()

	const differenceInMinutes = differenceInMs / (1000 * 60)

	return differenceInMinutes <= 15
}

export const getRandomColor = () => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

export const get_date = (date: string): string => {
	const inputDate = new Date(date)
	const now = new Date()

	const inputDay = inputDate.getDate()
	const inputMonth = inputDate.getMonth()
	const inputYear = inputDate.getFullYear()

	const nowDay = now.getDate()
	const nowMonth = now.getMonth()
	const nowYear = now.getFullYear()

	const formattedTime = inputDate.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	})

	if (inputYear === nowYear && inputMonth === nowMonth) {
		if (inputDay === nowDay) {
			return `Today ${formattedTime}`
		} else if (inputDay === nowDay - 1) {
			return `Yesterday ${formattedTime}`
		}
	}

	const formattedDate = inputDate.toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	})

	return `${formattedDate} ${formattedTime}`
}
