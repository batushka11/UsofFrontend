import { useNavigate } from 'react-router-dom'

const Logo = () => {
	const navigate = useNavigate()
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="150"
			height="80"
			viewBox="0 0 400 150"
			fill="none"
			onClick={() => navigate('/')}
		>
			<path
				d="M51.46,93.86c12.9,12.44,31.14,16.2,49.38,8.43l15.31,6-5.07-12.06c17-13.63,14-32.35,1.44-45.11A44.05,44.05,0,0,1,107.65,65,51.25,51.25,0,0,1,93.58,81,62.69,62.69,0,0,1,73.92,91a70.44,70.44,0,0,1-22.46,2.9ZM31.58,54.07a3.11,3.11,0,0,1,0-6.21H61.51a3.11,3.11,0,0,1,0,6.21Zm0-17.22a3.11,3.11,0,0,1,0-6.21H74.34a3.11,3.11,0,0,1,0,6.21ZM54.28,0h0C68.81.47,81.8,5.62,91.09,13.59c9.49,8.13,15.17,19.2,14.82,31.27v0C105.54,57,99.19,67.71,89.22,75.28,79.44,82.7,66.15,87.07,51.66,86.65A63.91,63.91,0,0,1,40,85.24a60.48,60.48,0,0,1-9.87-3L6.69,91.44l7.83-18.63A44,44,0,0,1,4,59.5,36.67,36.67,0,0,1,0,41.79C.38,29.7,6.73,19,16.7,11.4,26.48,4,39.78-.4,54.26,0Zm-.15,6.18h-.05C41,5.83,29.14,9.72,20.44,16.32,11.92,22.78,6.5,31.84,6.2,42A30.49,30.49,0,0,0,9.55,56.71,38.76,38.76,0,0,0,20.17,69.47L22,70.93,18.08,80.3l12.08-4.75,1.17.5a55.08,55.08,0,0,0,9.91,3.13,58.52,58.52,0,0,0,10.59,1.29c13,.38,25-3.51,33.66-10.12C94,63.89,99.42,54.84,99.73,44.72v0c.29-10.11-4.56-19.45-12.66-26.4C78.79,11.19,67.16,6.61,54.15,6.21Z"
				fill="#B08968"
			/>
			<text
				x="150"
				y="60"
				fontFamily="Arial, sans-serif"
				fontSize="36"
				fontWeight="700"
				fill="#7F5539"
			>
				Speak
			</text>
			<text
				x="150"
				y="110"
				fontFamily="Arial, sans-serif"
				fontSize="36"
				fontWeight="700"
				fill="#B08968"
			>
				AboutIt
			</text>
		</svg>
	)
}

export default Logo
