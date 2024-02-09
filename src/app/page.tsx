'use client'; // this app is client-side only.

import * as React from 'react';
import { useState } from 'react';
import { ChakraProvider,
  Box, Heading,
  VStack
} from '@chakra-ui/react';

// import App from './Components/HelloWorld'
// import App from './Components/SimplestState'
// import App from './Components/SimplestStatePlus3'
// import App './Components/HelloWorldAveryAndDave'
// import App from    './Components/TwoCountingButtons'
import App from './Apps/ToDoApp/ToDoApp'

export default function Root() {
    return (
    <ChakraProvider> 
      <App/>
      </ChakraProvider>)
}