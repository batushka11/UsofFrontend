import {
	Box,
	Code,
	Heading,
	Image,
	Link,
	List,
	ListItem,
	Table,
	TableCaption,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react'

export const chakraMarkdownComponents = {
	h1: (props: any) => <Heading as="h1" size="xl" my={4} {...props} />,
	h2: (props: any) => <Heading as="h2" size="lg" my={4} {...props} />,
	h3: (props: any) => <Heading as="h3" size="md" my={4} {...props} />,
	p: (props: any) => <Text my={2} {...props} />,
	a: (props: any) => <Link color="teal.500" {...props} />,
	code: (props: any) => (
		<Code
			display="inline-block"
			backgroundColor="brand.100"
			p={3}
			borderRadius="md"
			{...props}
		/>
	),
	ul: (props: any) => <List styleType="disc" pl={4} my={2} {...props} />,
	ol: (props: any) => <List styleType="decimal" pl={4} my={2} {...props} />,
	li: (props: any) => <ListItem my={1} {...props} />,
	blockquote: (props: any) => (
		<Box
			pl={4}
			borderLeft="4px solid"
			borderColor="gray.300"
			fontStyle="italic"
			bg="brand.100"
			my={2}
			{...props}
		/>
	),
	table: (props: any) => (
		<Table variant="simple" size="sm" my={4} bg="brand.100" {...props} />
	),
	thead: (props: any) => <Thead bg="brand.100" {...props} />,
	tbody: (props: any) => <Tbody {...props} />,
	tr: (props: any) => <Tr bg="brand.100" {...props} />,
	th: (props: any) => (
		<Th
			bg="brand.500"
			fontWeight="bold"
			textAlign="left"
			color="brand.100"
			{...props}
		/>
	),
	td: (props: any) => (
		<Td borderColor="gray.300" py={2} borderWidth="2px" {...props} />
	),
	caption: (props: any) => (
		<TableCaption fontSize="sm" fontStyle="italic" {...props} />
	),
	img: (props: any) => (
		<Box display="inline-block" boxShadow="md" borderRadius="md">
			<Image borderRadius="md" {...props} />
		</Box>
	)
}
