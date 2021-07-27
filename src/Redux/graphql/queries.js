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
const signUpQuery = gql`
  mutation(
    $username: String!
    $email: String!
    $phone: String!
    $password: String!
    $confirmPassword: String!
    $role: Role!
    $gender: String!
  ) {
    RegisterClient(
      client: {
        username: $username
        email: $email
        phone: $phone
        password: $password
        confirmPassword: $confirmPassword
        role: $role
        gender: $gender
      }
    ) {
      username
      email
      phone
      role
      active
      createdAt
    }
  }
`

export { loginQuery, signUpQuery }
