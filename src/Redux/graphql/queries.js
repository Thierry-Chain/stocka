import { gql } from 'graphql-request'

const loginQuery = () => {
  return gql`
    query($email: String!, $password: String!) {
      LoginClient(email: $email, password: $password) {
        token
        client {
          clientId
          username
          email
          phone
          role
          active
          gender
        }
      }
    }
  `
}
export { loginQuery }
