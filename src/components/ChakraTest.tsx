import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'

/**
 * Chakra UI v3 Test Component
 *
 * This component tests that Chakra UI v3 is properly integrated.
 * It showcases various Chakra UI components with the custom theme.
 *
 * Usage:
 * 1. Import this component: import { ChakraTest } from './components/ChakraTest'
 * 2. Add it to any page: <ChakraTest />
 * 3. Remove after verification
 *
 * Things to check:
 * - Plus Jakarta Sans font is applied
 * - Brand colors match the site theme
 * - Components render correctly
 * - Responsive design works
 * - No console errors
 */
export function ChakraTest() {
  return (
    <Box
      padding="8"
      maxWidth="container.md"
      marginX="auto"
      marginTop="8"
      marginBottom="8"
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Box
            bg="green.50"
            color="green.800"
            padding={2}
            marginBottom={2}
            borderRadius="md"
            borderWidth="1px"
            borderColor="green.200"
            display="inline-block"
          >
            ✓ Chakra UI v3 is Working!
          </Box>
          <Heading fontSize="2xl" color="brand.700" marginTop={3}>
            Chakra UI Integration Test
          </Heading>
          <Text color="gray.600" marginTop={2}>
            All components are rendering with the custom theme
          </Text>
        </Box>

        <Box height="1px" bg="gray.200" />

        {/* Buttons */}
        <Box>
          <Text fontWeight="bold" marginBottom={3} fontSize="lg">
            Buttons
          </Text>
          <HStack spacing={3} wrap="wrap">
            <Button colorPalette="brand" size="xs">
              Extra Small
            </Button>
            <Button colorPalette="brand" size="sm">
              Small
            </Button>
            <Button colorPalette="brand" size="md">
              Medium
            </Button>
            <Button colorPalette="brand" size="lg">
              Large
            </Button>
            <Button colorPalette="brand" variant="outline">
              Outline
            </Button>
            <Button colorPalette="brand" variant="ghost">
              Ghost
            </Button>
          </HStack>
        </Box>

        {/* Input Fields */}
        <Box>
          <Text fontWeight="bold" marginBottom={3} fontSize="lg">
            Input Fields
          </Text>
          <VStack spacing={3} align="stretch">
            <Input placeholder="Small input" size="sm" />
            <Input placeholder="Medium input" size="md" />
            <Input placeholder="Large input" size="lg" />
            <Input placeholder="With error" size="md" borderColor="red.500" />
          </VStack>
        </Box>

        {/* Color Palette */}
        <Box>
          <Text fontWeight="bold" marginBottom={3} fontSize="lg">
            Brand Colors
          </Text>
          <HStack spacing={3} wrap="wrap">
            <Box bg="brand.50" padding={4} borderRadius="md" borderWidth="1px">
              <Text fontSize="xs">brand.50</Text>
            </Box>
            <Box bg="brand.100" padding={4} borderRadius="md" borderWidth="1px">
              <Text fontSize="xs">brand.100</Text>
            </Box>
            <Box bg="brand.500" padding={4} borderRadius="md" color="white">
              <Text fontSize="xs">brand.500</Text>
            </Box>
            <Box bg="brand.700" padding={4} borderRadius="md" color="white">
              <Text fontSize="xs">brand.700</Text>
            </Box>
            <Box bg="brand.900" padding={4} borderRadius="md" color="white">
              <Text fontSize="xs">brand.900</Text>
            </Box>
          </HStack>
        </Box>

        {/* Semantic Colors */}
        <Box>
          <Text fontWeight="bold" marginBottom={3} fontSize="lg">
            Semantic Colors
          </Text>
          <HStack spacing={3} wrap="wrap">
            <Button colorPalette="green" size="sm">
              Success
            </Button>
            <Button colorPalette="orange" size="sm">
              Warning
            </Button>
            <Button colorPalette="red" size="sm">
              Error
            </Button>
            <Button colorPalette="blue" size="sm">
              Info
            </Button>
          </HStack>
        </Box>

        <Box height="1px" bg="gray.200" />

        {/* Typography */}
        <Box>
          <Text fontWeight="bold" marginBottom={3} fontSize="lg">
            Typography (Plus Jakarta Sans)
          </Text>
          <VStack spacing={2} align="start">
            <Heading fontSize="4xl">Heading 4xl (36px)</Heading>
            <Heading fontSize="3xl">Heading 3xl (28px)</Heading>
            <Heading fontSize="2xl">Heading 2xl (24px)</Heading>
            <Heading fontSize="xl">Heading xl (20px)</Heading>
            <Heading fontSize="lg">Heading lg (18px)</Heading>
            <Text fontSize="md">Body text md (16px)</Text>
            <Text fontSize="sm">Body text sm (14px)</Text>
            <Text fontSize="xs">Body text xs (12px)</Text>
          </VStack>
        </Box>

        {/* Info Box */}
        <Box
          padding={4}
          bg="blue.50"
          borderRadius="md"
          borderWidth="1px"
          borderColor="blue.200"
        >
          <Text fontSize="sm" color="blue.800">
            <strong>Version:</strong> Chakra UI v3.30.0<br />
            <strong>Font:</strong> Plus Jakarta Sans<br />
            <strong>Theme:</strong> Custom chakraTheme v3
          </Text>
        </Box>

        {/* Success Message */}
        <Box
          padding={4}
          bg="green.50"
          borderRadius="md"
          borderWidth="1px"
          borderColor="green.200"
          textAlign="center"
        >
          <Text color="green.800" fontWeight="semibold">
            🎉 Chakra UI v3 is successfully integrated!
          </Text>
          <Text fontSize="sm" color="green.700" marginTop={1}>
            You can now use Chakra UI components throughout the application.
          </Text>
        </Box>

        {/* Cleanup Instructions */}
        <Box
          padding={3}
          bg="yellow.50"
          borderRadius="md"
          borderWidth="1px"
          borderColor="yellow.200"
        >
          <Text fontSize="xs" color="yellow.800">
            <strong>Note:</strong> This is Chakra UI v3 with updated API. Remove this
            ChakraTest component and start migrating your existing components.
            See plan.md for the migration roadmap (note: v3 API differences from v2).
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

