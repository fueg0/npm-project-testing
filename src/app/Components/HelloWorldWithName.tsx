import * as React from 'react';
import {
  Heading, VStack
} from '@chakra-ui/react';

export default function HelloWorldWithName(
  props: { name: string }
  ) {
  return (
    <VStack>
      <Heading>Hello, {props.name}!</Heading>
    </VStack>
  );
}

