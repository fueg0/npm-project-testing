// illustrates 'key' attribute
import * as React from 'react';
import {
    Table, Th, Tbody, Tr, Box, Button,
} from '@chakra-ui/react';

import { ToDoItem } from './types'
import { ToDoItemDisplay } from './ToDoItemDisplay'

export function ToDoListDisplay(props: { items: ToDoItem[] , onDelete:(key:number) => void , onSort:() => void}) {
  function handleSort(event) {
    event.preventDefault()  // magic, sorry.
    
    props.onSort()
  }

  return (
    <Table>      
      <Tbody>
      <Tr>
        <Th>Title</Th>
        <Th>Priority</Th>
        <Th>Delete</Th>
      </Tr>
        {
          props.items.map((eachItem) => 
              <ToDoItemDisplay item={eachItem} key={eachItem.key} onDelete={props.onDelete}/>)
        }
      </Tbody>
    </Table>
  )
}




