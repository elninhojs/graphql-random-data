
export const typeDefs = `#graphql  
  
type Health {
  status: Int
  text: String
  version: String
}

type Address {
  city: String,
  street_name: String,
  street_address: String,
  zip_code: String,
  state: String,
  country: String
}

type User {
  id: Int
  uid: String,
  first_name: String,
  last_name: String,
  username: String,
  email: String
  avatar: String,
  gender: String,
  phone_number: String,
  social_insurance_number: String,
  date_of_birth: String,
  address: Address
}

input UserFilter {
  size: Int
}

type Query {
    users(filter: UserFilter):[User]
    "It only checks if the GQL Layer is ok"
    healthCheck: Health
  }
`