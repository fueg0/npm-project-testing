// illustrates failure of 'key' attribute
import * as React from 'react';
import {
    Table, Th, Tbody, Tr,
} from '@chakra-ui/react';

import { ToDoItem } from './types'
import { ToDoItemDisplay } from './ToDoItemDisplay'

export function ToDoListDisplay(props: { items: ToDoItem[] , onDelete:(key:number) => void }) {
  return (
    <Table>      
      <Tbody>
      <Tr>
        <Th>Title</Th>
        <Th>Priority</Th>
        <Th>Delete</Th>
      </Tr>
        {
          props.items.map((eachItem,index) => <ToDoItemDisplay item={eachItem} key={index} onDelete={props.onDelete} />)
        }
      </Tbody>
    </Table>
  )
}




