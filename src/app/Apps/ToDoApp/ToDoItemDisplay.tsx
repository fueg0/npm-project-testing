import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Button, Box,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  VStack, Tr, Td, Table, Tbody, TableContainer, HStack
} from '@chakra-ui/react';
import { AiFillDelete, AiFillHeart, AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import { nanoid } from 'nanoid';

import { ToDoItem } from './types'

export function ToDoItemDisplay (props: {item: ToDoItem, key:number, onDelete:(key:number) => void} ) {
    const [item, setItem] = useState(props.item)
  
    function handleDelete() {
      console.log('deleting:', item)
      props.onDelete(item.key)
    }
  
  return (
    <Tr>
      <Td>{item.title}</Td>
      <Td>{item.priority}</Td>
      <Td><ItemDeleteButton onClick={handleDelete} /></Td>
    </Tr>
  )
}
 
function ItemDeleteButton(props: { onClick: () => void }) {
  return (
    <IconButton aria-label='delete' icon={<AiOutlineDelete />} onClick={props.onClick} />
  )
}