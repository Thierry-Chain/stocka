import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
function CheckUp(props) {
  const auth = useSelector((state) => state.user.auth)
  const active = useSelector((state) => state?.user?.client?.active)
  //console.log(auth, active)
  useEffect(() => {
    if (!auth) props.history.push('/')
  }, [auth, props])
  useEffect(() => {
    if (!active && auth) props.history.push('/loggedIn/pay')
  }, [active, props, auth])
  return <></>
}
export default withRouter(CheckUp)
