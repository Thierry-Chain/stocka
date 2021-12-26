import { gql } from 'graphql-request'

const loginQuery = () => {
  return gql`
    query ($email: String!, $password: String!) {
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
  mutation (
    $username: String!
    $email: String!
    $phone: String!
    $password: String!
    $confirmPassword: String!
    $gender: String!
  ) {
    RegisterClient(
      client: {
        username: $username
        email: $email
        phone: $phone
        password: $password
        confirmPassword: $confirmPassword
        gender: $gender
      }
    ) {
      username
      email
      phone
      active
      createdAt
    }
  }
`
const getShortTermProdQuery = gql`
  query ($clientId: ID!) {
    ShortTermProducts(clientId: $clientId) {
      productId
      name
      buyingPrice
      amount
      pricePerUnit
      dateOfEntry
      description
      dateOfExpry
    }
  }
`
const getLongTermProdQuery = gql`
  query ($clientId: ID!) {
    LongTermProducts(clientId: $clientId) {
      productId
      name
      buyingPrice
      amount
      pricePerUnit
      dateOfEntry
      description
    }
  }
`
const payStateQuery = gql`
  query ($clientId: ID!) {
    PaymentStatus(clientId: $clientId) {
      paid
      expryDate
      refund
    }
  }
`
const getNotifiedQuery = gql`
  query ($clientId: ID!) {
    Notifications(clientId: $clientId) {
      notificationId
      source
      message
      createdAt
      destination {
        __typename
        ... on Destination {
          destination
        }
        ... on Client {
          clientId
          username
          email
        }
      }
    }
  }
`
const delNotifyQuery = gql`
  mutation ($clientId: ID!, $notificationId: ID!) {
    DeleteNotification(clientId: $clientId, notificationId: $notificationId) {
      success
    }
  }
`
const addShortTermProdQuery = gql`
  mutation (
    $buyingPrice: Float!
    $name: String!
    $amount: Float!
    $pricePerUnit: Float!
    $description: String
    $dateOfExpry: String!
    $clientId: ID!
  ) {
    AddShortTermProduct(
      product: {
        name: $name
        buyingPrice: $buyingPrice
        amount: $amount
        pricePerUnit: $pricePerUnit
        description: $description
        dateOfExpry: $dateOfExpry
      }
      clientId: $clientId
    ) {
      name
      buyingPrice
      amount
      pricePerUnit
      dateOfEntry
      description
      dateOfExpry
    }
  }
`
const addLongTermProdQuery = gql`
  mutation (
    $name: String!
    $buyingPrice: Float!
    $amount: Float!
    $pricePerUnit: Float!
    $description: String
    $clientId: ID!
  ) {
    AddLongTermProduct(
      product: {
        name: $name
        buyingPrice: $buyingPrice
        amount: $amount
        pricePerUnit: $pricePerUnit
        description: $description
      }
      clientId: $clientId
    ) {
      name
      amount
      buyingPrice
      pricePerUnit
      description
    }
  }
`
const editLongProdQuery = gql`
  mutation (
    $name: String!
    $buyingPrice: Float!
    $amount: Float!
    $pricePerUnit: Float!
    $description: String
    $clientId: ID!
    $productId: ID!
  ) {
    UpdateLongTermProduct(
      product: {
        name: $name
        buyingPrice: $buyingPrice
        amount: $amount
        pricePerUnit: $pricePerUnit
        description: $description
      }
      clientId: $clientId
      productId: $productId
    ) {
      name
      buyingPrice
      amount
      pricePerUnit
      description
    }
  }
`
const editShortProdQuery = gql`
  mutation (
    $buyingPrice: Float!
    $name: String!
    $amount: Float!
    $pricePerUnit: Float!
    $description: String
    $dateOfExpry: String!
    $clientId: ID!
    $productId: ID!
  ) {
    UpdateShortTermProduct(
      product: {
        name: $name
        buyingPrice: $buyingPrice
        amount: $amount
        pricePerUnit: $pricePerUnit
        description: $description
        dateOfExpry: $dateOfExpry
      }
      clientId: $clientId
      productId: $productId
    ) {
      name
      description
      buyingPrice
      amount
      dateOfExpry
      pricePerUnit
    }
  }
`
const delLongProdQuery = gql`
  mutation ($clientId: ID!, $productId: ID!, $sellingPrice: Float!) {
    DeleteLongTermProduct(
      clientId: $clientId
      productId: $productId
      sellingPrice: $sellingPrice
    ) {
      success
      message
      product
    }
  }
`
const delShortProdQuery = gql`
  mutation ($clientId: ID!, $productId: ID!, $sellingPrice: Float!) {
    DeleteShortTermProduct(
      clientId: $clientId
      productId: $productId
      sellingPrice: $sellingPrice
    ) {
      success
      message
      product
    }
  }
`
const addProdToRecordQuery = gql`
  mutation (
    $name: String!
    $sellingPrice: Float!
    $productType: String!
    $amount: Float!
    $clientId: ID!
  ) {
    AddProductToRecord(
      record: {
        name: $name
        sellingPrice: $sellingPrice
        productType: $productType
        amount: $amount
      }
      clientId: $clientId
    ) {
      name
      buyingPrice
      sellingPrice
      amount
    }
  }
`
const shortTermProdRecordsQuery = gql`
  query ($clientId: ID!) {
    ShortTermProductRecords(clientId: $clientId) {
      recordId
      name
      productType
      buyingPrice
      sellingPrice
      amount
      dateOfEntry
      dateRecorded
      description
    }
  }
`
const longTermProdRecordsQuery = gql`
  query ($clientId: ID!) {
    LongTermProductRecords(clientId: $clientId) {
      recordId
      name
      productType
      buyingPrice
      sellingPrice
      amount
      dateOfEntry
      dateRecorded
      description
    }
  }
`
const deleteSelectedRecQuery = gql`
  mutation ($records: [ID!]!, $clientId: ID!) {
    DeleteSelectedRecords(records: $records, clientId: $clientId) {
      success
      message
      deletedRecords
    }
  }
`
const updateUserCredentialsQuery = gql`
  mutation (
    $clientId: ID!
    $username: String!
    $email: String!
    $phone: String!
    $gender: String!
    $password: String!
  ) {
    UpdateCredentials(
      clientId: $clientId
      username: $username
      email: $email
      phone: $phone
      gender: $gender
      password: $password
    ) {
      clientId
      username
      email
      phone
      role
      active
      gender
      createdAt
    }
  }
`
const updatePasscodeQuery = gql`
  mutation (
    $clientId: ID!
    $newPassword: String!
    $oldPassword: String!
    $confirmPassword: String!
  ) {
    UpdatePassword(
      clientId: $clientId
      oldPassword: $oldPassword
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      clientId
      username
      email
      phone
      role
      active
      gender
      createdAt
    }
  }
`
const deleteAccQuery = gql`
  mutation ($clientId: ID!, $confirmPassword: String!) {
    DeleteAccount(clientId: $clientId, confirmPassword: $confirmPassword) {
      success
      message
      accountId
    }
  }
`
const forgotPasswordQuery = gql`
  query ($email: String!) {
    ForgotPassword(email: $email) {
      success
      email
      message
    }
  }
`
const resetPasswordQuery = gql`
  mutation ($token: String!, $newPassword: String!, $confirmPassword: String!) {
    ResetPassword(
      token: $token
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      success
      email
      message
    }
  }
`
export {
  loginQuery,
  signUpQuery,
  getShortTermProdQuery,
  getLongTermProdQuery,
  payStateQuery,
  forgotPasswordQuery,
  getNotifiedQuery,
  delNotifyQuery,
  addShortTermProdQuery,
  addLongTermProdQuery,
  editLongProdQuery,
  resetPasswordQuery,
  editShortProdQuery,
  addProdToRecordQuery,
  delShortProdQuery,
  delLongProdQuery,
  shortTermProdRecordsQuery,
  longTermProdRecordsQuery,
  deleteSelectedRecQuery,
  updateUserCredentialsQuery,
  updatePasscodeQuery,
  deleteAccQuery,
}
