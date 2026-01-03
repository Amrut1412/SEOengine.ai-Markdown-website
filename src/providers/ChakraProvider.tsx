import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface ChakraProviderWrapperProps {
  children: ReactNode
}

/**
 * Chakra UI v3 Provider Wrapper
 *
 * Wraps the application with Chakra UI's provider to enable:
 * - Chakra UI components throughout the app
 * - Default theme tokens
 * - Color mode switching (light/dark)
 * - Responsive design utilities
 *
 * Note: This provider coexists with existing ThemeProvider and FontProvider
 * We use defaultSystem which provides all Chakra UI functionality
 */
export const ChakraProviderWrapper: FC<ChakraProviderWrapperProps> = ({
  children,
}) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}
