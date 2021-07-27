import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
export default function HomeLoggedIn(props) {
  const auth = useSelector((state) => state.user.auth)
  const userName = useSelector((state) => state.user.client.username)

  useEffect(() => {
    if (!auth) {
      props.history.push('/')
    }
  }, [props, auth])
  return (
    <div>
      <p>Home page after login</p>
      {userName}
    </div>
  )
}
