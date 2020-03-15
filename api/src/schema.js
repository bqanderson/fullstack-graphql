const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
  }

  input PetInput {
    type: String
    name: String
  }

  type Query {
    user: User!
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet!
  }
`

module.exports = typeDefs
