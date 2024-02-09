import * as React from 'react';
import { ChakraProvider,
  Box, Heading,
  VStack
} from '@chakra-ui/react';

export default function HelloWorld() {
    return (
        <VStack>
            <Heading>Hello World</Heading>
        </VStack>
  )
}