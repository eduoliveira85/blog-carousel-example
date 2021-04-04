import { useState, useEffect } from 'react'
import { useBreakpointValue, HStack, AspectRatio, LinkOverlay, IconButton, Flex, Grid, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Stack, Box, LinkBox, Button } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Container } from '../src/components/container'
import { postFeed } from '../lib/postFeed'
import Image from 'next/image'
import kebabCase from 'lodash/kebabCase'

const cats = [
  { title: 'category 1' },
  { title: 'category 2' },
  { title: 'category 3' },
  { title: 'category 4' },
]

export default function Home() {

  const NavButton = ({ ...props }) => {
    return (
      <IconButton
        {...props}
        borderRadius="full"
        bgColor="gray.200"
        color="gray.300"
        display={[
          'hidden',
          ,
          'inherit'
        ]}
        w={4}
        p={2}
        cursor="pointer"
        _hover={{
          color: 'gray.300',
          bgColor: 'gray.400'
        }}
      />
    )
  }

  const PostBox = ({ post, ...props }) => {
    return (
      <LinkBox
        {...props}
        as="article"
      >
        <Flex
          flexDir="column"
          justifyContent="space-between"
          h="100%"
          bgColor="gray.50"
          p={2}
          borderBottomStartRadius="lg"
          borderTopEndRadius="lg"
          pos="relative"
          role="group"
          transition="all .2s ease-in-out"
          _hover={{
            bgColor: "gray.100"
          }}
        >
          <Box
            as={AspectRatio}
            w="100%"
            ratio={16 / 12}
            borderBottomStartRadius="md"
            borderTopEndRadius="md"
            overflow="hidden"
          >
            <Image src={`/images/${kebabCase(post.title)}.jpg`} priority layout="fill" objectFit="cover" />
          </Box>
          <Stack
            spacing={1}
            mt={2}
          >

            <LinkOverlay
              href={'#'}>
              <Box
                textStyle="h4"
                fontWeight="semibold"
                color="primary.500"
                my={0}
                textTransform="capitalize"
              >{post.title}</Box>
            </LinkOverlay>
          </Stack>
          <LinkOverlay
            mt="auto"
            href={'#'}
          >
            <Button size="sm" ml="auto" mt={3} colorScheme="blue">Ler Mais</Button>
          </LinkOverlay>
        </Flex>
      </LinkBox>
    )
  }

  const PanelContent = ({ postFeed, selected }) => {
    // this first const will fetch posts based on the selected cat, passed by props to this component
    const postsByCategories = postFeed.filter(el => el.categories.find(item => item.title === selected))
    // this sets how many posts should be visible in each breakpoing
    const breakpointValue = useBreakpointValue({ base: 1, sm: 2, lg: 3, xl: 4 })
    // I'm using this state to count the number of "pages" for each category
    const [maxValue, setMaxValue] = useState(1);
    // another state to record the counting that is used in the logic for pagination
    const [count, setCount] = useState(1);

    console.log('maxValue', maxValue) // this proves maxValue works and returns a number of pages

    useEffect(() => { // this will set the n# of pages on mount
      setMaxValue(Math.ceil(postsByCategories.length / breakpointValue));
    })

    // simple controllers that change the value of count. this value is used by transform to slide the pages
    const handleClickUp = () => {
      if (count == maxValue) {
        null
      } else {
        setCount(count + 1)
      }
    }
    const handleClickDown = () => {
      if (count == 1) {
        null
      } else {
        setCount(count - 1)
      }
    }
    return (
      <>
        <Stack direction={'row'} alignItems="center">
          <NavButton as={ChevronLeftIcon} onClick={handleClickDown} />
          <Box
            className="carousel-wrapper"
            w="100%"
            overflow="hidden"
          >
            <Flex
              className="carousel-items"
              flexDir={[
                'column',
                ,
                'row'
              ]}
              wrap="nowrap"
              justifyContent="flex-start"
              transition="all .15s ease-in-out"
              transform={[
                `translateX(calc(-100% * ${count - 1}))`
              ]}
              w={maxValue > 1 ? "auto" : '100%'}
            >
              {postsByCategories.map((post, i) => {
                return (
                  <PostBox
                    key={i}
                    post={post}
                    flex={[
                      '0 0 100%',
                      ,
                      '0 0 calc(50% - .5rem)',
                      '0 0 calc(33% - .5rem)',
                      '0 0 calc(25% - .5rem)',
                    ]}
                    mx={1}
                  />
                )
              })}
            </Flex>
          </Box>
          <NavButton as={ChevronRightIcon} onClick={handleClickUp} />
        </Stack>
        <HStack mt={3} w="fit-content" mx="auto">
          {[...Array(3)].map((item, i) => { // here is where the problem lies: I can set a value for ...Array() to work with but when I try to use maxValue, it breaks.
          //!! {[...Array(maxValue)].map((item, i) => {  // this should work, I guess. But it doesn't.
            return (
              <Box
                key={i}
                id={item}
                w={2}
                h={2}
                borderRadius="full"
                bgColor={count - 1 == i ? "gray.700" : "gray.500"}
                cursor="pointer"
                transition="all .2s ease-in-out"
                _hover={{
                  bgColor: 'blue.400'
                }}
              />)
          })}

        </HStack>
      </>
    )
  }
  return (
    <Grid
      as="section"
      placeItems="center"
      minH="100vh"
    >
      <Container maxH="50%">
        <Heading as="h3">Categories</Heading>
        <Tabs mt={4} isLazy>
          <TabList>
            {cats.map((cat, i) => {
              return (
                <Tab key={i} px={[2, , 3]}>{cat.title}</Tab>
              )
            })}
          </TabList>
          <TabPanels>
            {cats.map((cat, i) => {
              return (
                <TabPanel key={i}>
                  <Heading as="h1" textTransform="capitalize" mb={4}>{cat.title}</Heading>
                  <PanelContent postFeed={postFeed} selected={cat.title} />
                </TabPanel>
              )
            })}
          </TabPanels>
        </Tabs>
      </Container>
    </Grid>
  )
}
