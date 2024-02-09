// illustrates 'key' attribute
import * as React from 'react';
import {
    Table, Th, Tbody, Tr, Box, Button,
} from '@chakra-ui/react';

import { ToDoItem } from './types'
import { ToDoItemDisplay } from './ToDoItemDisplay'

function handleSort(event, title) {
  event.preventDefault()  // magic, sorry.
  
  if (title === '') {return}   // ignore blank button presses
}

export function ToDoListDisplay(props: { items: ToDoItem[] , onDelete:(key:number) => void }) {
  return (
    <Table>      
      <Tbody>
      <Tr>
        <Th>Title</Th>
        <Th>Priority</Th>
        <Th>Delete</Th>
        <Box>
          <Button bg='lightgreen' type="button" onClick={handleSort} width={100}> Sort</Button>
        </Box>
      </Tr>
        {
          props.items.map((eachItem) => 
              <ToDoItemDisplay item={eachItem} key={eachItem.key} onDelete={props.onDelete} />)
        }
      </Tbody>
    </Table>
  )
}




