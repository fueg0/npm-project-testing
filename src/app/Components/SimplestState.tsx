'use client;' // this file is client-side only
// simplest app, demonstrates useState, Button

import * as React from 'react';
import { useState } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';


// turn on console to demonstrate asynchrony
// In console, set levels to 'default'

// for style parameters, see https://chakra-ui.com/docs/styled-system/style-props 

export default function SimplestState() {
  const [count, setCount] = useState(0)

  function handleClick() { setCount(count + 1) }

  return (
    <VStack>
      <Box>
        count = {count}
      </Box>
      <Button onClick={handleClick}>
        Increment Count!
      </Button>
    </VStack>
  )

}

Box.defaultProps = {
  border: "2px",
  borderColor: "green",
  padding: "1",
}

Button.defaultProps = {
  textColor: "red",
  border: "2px",
  borderColor: "black",
}