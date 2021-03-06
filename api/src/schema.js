const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    pets(input: FindPetInput): [Pet]!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    img: String
    owner: User!
  }

  input FindPetInput {
    type: String
    name: String
  }

  input CreatePetInput {
    name: String!
    type: String!
  }

  input CreateUserInput {
    username: String!
  }

  type Query {
    user: User!
    pets(input: FindPetInput): [Pet]!
    pet(input: FindPetInput): Pet!
  }

  type Mutation {
    createPet(input: CreatePetInput!): Pet!
    createUser(input: CreateUserInput!): User!
  }
`

module.exports = typeDefs
