import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
export default function HomeLoggedIn(props) {
  const auth = useSelector((state) => state.user.auth)
  useEffect(() => {
    if (!auth) {
      props.history.push('/')
    }
  }, [props, auth])
  return <div>Home page after login</div>
}
