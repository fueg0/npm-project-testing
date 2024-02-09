// illustrates forms, lists, etc.
// THE WHOLE POINT OF THIS IS THE ATTRIBUTE 'key' ON LINE

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Heading, Table, Th, Tbody, Tr,
  Td,
  VStack, 
} from '@chakra-ui/react';

import { ToDoItem } from './types'
import { ToDoItemEntryForm } from './ToDoItemEntryForm'
import { ToDoItemPurgeForm } from './ToDoItemPurgeForm'
import { ToDoListDisplay } from './ToDoListDisplay'
// import { ToDoListDisplay } from './ToDoListDisplayBad';

export default function ToDoApp () {
  const [todoList,setTodolist] = useState<ToDoItem[]>([])
  const [itemKey,setItemKey] = useState<number>(0)   // first unused key

  function handleAdd (title:string, priority:number) {
    if (title === '') {return}   // ignore blank button presses
    
    setTodolist(todoList.concat({title: title, priority: priority, key: itemKey}))
    setItemKey(itemKey + 1)
  }

  function handleDelete(targetKey:number) {
    const newList = todoList.filter(item => item.key != targetKey)
    setTodolist(newList)
  }

  function handlePurge(targetPriority:number) {
    const newList = todoList.filter(item => item.priority <= targetPriority)
    setTodolist(newList)
  }

  function handleSort() {
    const sortedList = todoList.sort((a, b) => a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0)
    console.log("handleSort:\n", sortedList)
    
    setTodolist(sortedList)
    handleAdd("handleSort", -1000)
    handleDelete(itemKey)
  }

  return (
  <VStack>
    <Heading>TODO List</Heading>
    <ToDoItemEntryForm onAdd={handleAdd} onSort={handleSort}/>
    <ToDoItemPurgeForm onPurge={handlePurge}/>
    <ToDoListDisplay items={todoList} onDelete={handleDelete} onSort={handleSort}/>
  </VStack>
  )
}





