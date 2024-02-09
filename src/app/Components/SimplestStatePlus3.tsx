// simplest app, demonstrates useState, Button

import * as React from 'react';
import { useState } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';


// turn on console to demonstrate asynchrony
// In console, set levels to 'default'

// for style parameters, see https://chakra-ui.com/docs/styled-system/style-props 

export default function SimplestStatePlus3() {
  const [count, setCount] = useState(0)

  function handleClick() { 
    setCount(count + 1) 
    setCount(count + 1)
    setCount(count + 1)}

  return (
    <VStack>
      <Box border='2px' borderColor="pink" padding='1'>
        count = {count}
      </Box>
      <Button border='2px' borderColor="black" textColor='red'
        onClick={handleClick}
      >
        Increment Count by 3
      </Button>
    </VStack>
  )

}
