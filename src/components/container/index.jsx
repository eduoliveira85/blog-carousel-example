import { Box } from '@chakra-ui/react'

export const Container = ({ children, h, ...props }) => {
  return (
    <Box
      w="100%"
      maxW={[
        "100%", // mobile > 600px
        , // portrait tablet > 900px
        "1100px", // landscape tablet > 1200px
        "1220px", // small desktop > 1600px
        "1440px"  // big desktop > 2100px
      ]}
      h={h || "100%"}
      px={[4, 6, 8, 0]}
      mx="auto"
      className="container"
      {...props}
    >{children}</Box>
  )
}