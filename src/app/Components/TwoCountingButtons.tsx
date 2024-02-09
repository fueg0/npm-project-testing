// demonstrates passing props down, passing events up

import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  VStack,
} from '@chakra-ui/react';

// create two CountingButtons, and keep track of the total count.
import { CountingButton } from './CountingButton';

export default function App() {

  const [globalCount, setGlobalCount] = useState(0)

  function incrementGlobalCount() {
    setGlobalCount(globalCount + 1)
  }

  return (
    <VStack spacing='30px'>
      <Box border="1px" padding='1' >
        Total count = {globalCount}
      </Box>
      <CountingButton name="Button A" globalCount= {globalCount} onClick={incrementGlobalCount} />
      <CountingButton name="Button B" globalCount= {globalCount} onClick={incrementGlobalCount} />
    </VStack>
  )
}


