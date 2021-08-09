import {
  SkeletonText,
  Box,
  Stack,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react'

export default function ProductSkeleton() {
  return (
    <Box mx="2" p="2">
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        <Stack>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <SimpleGrid columns={3} spacing={2}>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </SimpleGrid>
        </Stack>
        <Stack>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <SimpleGrid columns={3} spacing={2}>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </SimpleGrid>
        </Stack>
        <Stack>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <SimpleGrid columns={3} spacing={2}>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </SimpleGrid>
        </Stack>
        <Stack d={['none', 'inline']}>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <SimpleGrid columns={3} spacing={2}>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </SimpleGrid>
        </Stack>
        <Stack d={['none', 'inline']}>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <SimpleGrid columns={3} spacing={2}>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </SimpleGrid>
        </Stack>
        <Stack d={['none', 'inline']}>
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
          <SimpleGrid columns={3} spacing={2}>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </SimpleGrid>
        </Stack>
      </SimpleGrid>
    </Box>
  )
}
