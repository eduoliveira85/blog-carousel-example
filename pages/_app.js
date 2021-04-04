import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1600px',
  '2xl': '2100px',
})

const overrides = extendTheme({
  breakpoints,
  styles: {
    global: {
      'html': {
        fontSize: '21px',
        lineHeight: '32px',
      }
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={overrides}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
