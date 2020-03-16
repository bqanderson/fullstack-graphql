const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  enum ShoeType {
    TRAINER
    CASUAL
    DRESS
    BOOT
  }

  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  type Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
  }

  input FindShoesInput {
    type: ShoeType
    brand: String
    size: Int
  }

  input CreateShoeInput {
    type: ShoeType!
    brand: String!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: FindShoesInput): [Shoe]!
  }

  type Mutation {
    createShoe(input: CreateShoeInput!): Shoe!
  }
`

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return [
        { type: TRAINER, brand: 'Nike', size: 12 },
        { type: TRAINER, brand: 'Adiddas', size: 14 },
        { type: TRAINER, brand: 'New Balance', size: 9 },
        { type: TRAINER, brand: 'Converse All-Stars', size: 10 },
      ].filter(shoe => shoe.brand === input.brand)
    },
    me() {
      return {
        email: 'yoda@masters.com',
        avatar: 'http://yoda.png',
        friends: [],
      }
    },
  },
  Mutation: {
    createShoe(_, { input }) {
      return input
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4000).then(() => console.log('on port 4000'))
