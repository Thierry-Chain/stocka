import {Route,Switch} from 'react-router-dom'
import {Container,Flex} from '@chakra-ui/react'
import NavBar from 'components/NavBar'

function App() {
  return (
     <Flex direction={['column','column','row']} h="100vh"  maxW="container.xl" overflow="hidden" className="App">

     <Flex bg="#020202" w={['100vw','100vw','25%']}>
       <NavBar  />
     </Flex>

     <Flex>
       section 2
     </Flex>
    
     </Flex>
    
  );
}

export default App;
