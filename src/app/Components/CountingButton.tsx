import * as React from "react";
import { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";


export function CountingButton(props: {
  name: string;        // display name of the button
  globalCount: number; // global count from parent
  onClick: () => void; // event handler to call when clicked
}) {
  // useState persists when you change the code,
  // resets when you hit the reload button
  const [localCount, setLocalCount] = useState(0);

  function handleClick() {
    setLocalCount(localCount + 1);
    props.onClick(); // propagate to parent
  }

  return (
    <VStack>
      <Box>
        local count for {props.name} = {localCount}
      </Box>
      <Box> 
        globalCount = {props.globalCount}
      </Box>
      <Button onClick={handleClick}>
        Increment {props.name}!
      </Button>
    </VStack>
  );
}

Button.defaultProps = {
  textColor: "red",
  border: "2px",
  borderColor: "black",
}

Box.defaultProps = {
  border: "2px",
  borderColor: "green",
  padding: "1",
}
