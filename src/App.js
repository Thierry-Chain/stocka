import { Route, Switch } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import NavBar from 'components/NavBar'
import Home from 'components/Home'
import Login from 'components/Login'
import SignUp from 'components/SignUp'
import About from 'components/About'
import HomeLoggedIn from 'components/loggedIn/HomeLoggedIn'
import ErrorPage from 'components/ErrorPage'

function App() {
  return (
    <Flex
      direction={['column', 'column', 'row']}
      h={['auto', 'auto', '100vh']}
      maxW="container"
      overflow="hidden"
      className="App"
    >
      <Flex bg="#020202" overflow="auto" w={['100vw', '100vw', '25%']}>
        <NavBar />
      </Flex>

      <Flex
        bg="#e0dbdb83"
        w={['100vw', '100vw', '75%']}
        h="auto"
        overflow="auto"
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/about" component={About} />
          <Route path="/loggedIn" component={HomeLoggedIn} />
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </Flex>
    </Flex>
  )
}

export default App
