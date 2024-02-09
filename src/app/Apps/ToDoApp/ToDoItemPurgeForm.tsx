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

export function ToDoItemPurgeForm (props: {onPurge:(priority:number)=>void}) {
    // state variables for this form
    const [priority,setPriority] = useState("")
  
    function handlePurge(event) {
      event.preventDefault()  // magic, sorry.
      
      if (priority === '') {return}   // ignore blank button presses
      props.onPurge(Number(priority))    // tell the parent about the new item
      setPriority("")   // resetting the values redisplays the placeholder
    }


    return (    
      <VStack spacing={0} align='left'>
        <HStack align='left'>
          <form>
            <FormControl>
              <VStack align='left' spacing={0}>
                <HStack w='400' align='left'>
                  <NumberInput
                    minW={180}
                    min={0} 
                    name="priority"
                    value={priority.replace(/\D/g,'')}
                    onChange={(value) => setPriority(value)}
                  >
                    <NumberInputField 
                    placeholder= 'purge priorities greater than...'
                    />
                  </NumberInput>
                  <Box>
                    <Button bg='salmon' type="submit" onClick={handlePurge} width={200}> Purge </Button>
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
  