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
  NumberInput,
  NumberInputField,
  VStack, Tr, Td, Table, Tbody, TableContainer, HStack
} from '@chakra-ui/react';
import { AiFillDelete, AiFillHeart, AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import { nanoid } from 'nanoid';

import { ToDoItem } from './types'

export function ToDoItemEntryForm (props: {onAdd:(title:string, priority:number)=>void, onSort:()=>void}) {
    // state variables for this form
    const [title,setTitle] = useState<string>("")
    const [priority,setPriority] = useState("")
    const [key, setKey] = useState(1)     // key is assigned when the item is created.
  
    function handleInput(event) {
      event.preventDefault()  // magic, sorry.
      
      if (title === '') {return}   // ignore blank button presses
      props.onAdd(title, Number(priority))    // tell the parent about the new item
      setTitle('')   // resetting the values redisplays the placeholder
      setPriority("")   // resetting the values redisplays the placeholder
      setKey(key + 1)   // increment the key for the next item
    }

    function handleSort(event) {
      event.preventDefault()  // magic, sorry.
      
      props.onSort()
    }
  
    return (    
      <VStack spacing={0} align='left'>
        <HStack align='left'>
          <form>
            <FormControl>
              <VStack align='left' spacing={0}>
                <FormLabel as="b">Add TODO item here:</FormLabel>
                <HStack w='400' align='left'>
                  <Input
                    buttonType="submit"
                    name="title"
                    value={title}
                    placeholder='type item name here'
                    onChange={(event => {
                      setTitle(event.target.value);
                      console.log('setting Title to:', event.target.value)
                    })}
                  />
                  <NumberInput
                    minW={180}
                    min={0} 
                    name="priority"
                    value={priority.replace(/\D/g,'')}
                    onChange={(value) => setPriority(value)}
                  >
                    <NumberInputField 
                    placeholder= 'type priority here'
                    />
                  </NumberInput>
                  <Box>
                    <Button bg='lightblue' type="submit" onClick={handleInput} width={200}> Add TODO item</Button>
                  </Box>              
                  <Box>
                    <Button bg='lightgreen' type="button" onClick={handleSort} width={100}> Sort</Button>
                  </Box>
                </HStack>
              </VStack>
            </FormControl>  
          </form>
        </HStack>
      </VStack>
    )
  
  }

  //<Box h='4'></Box>
  