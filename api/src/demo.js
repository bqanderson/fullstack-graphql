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

  interface Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
  }

  type Trainer implements Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    sport: String
  }

  type Casual implements Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    style: String
  }

  type Dress implements Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    occation: String
  }

  type Boot implements Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    eyeholes: Int
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
        { type: 'TRAINER', brand: 'Nike', size: 12, sport: 'Baseball' },
        { type: 'TRAINER', brand: 'Adiddas', size: 14, sport: 'Basketball' },
        { type: 'TRAINER', brand: 'New Balance', size: 9, sport: 'Tennis' },
        { type: 'TRAINER', brand: 'Converse All-Stars', size: 10, sport: 'Basketball' },
        { type: 'BOOT', brand: 'Doc Martins', size: 11, eyeholes: 8 },
        { type: 'CASUAL', brand: 'Dockers', size: 11, style: 'Boatshoe' },
      ]
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

  Shoe: {
    __resolveType(shoe) {
      switch (shoe.type) {
        case 'BOOT':
          return 'Boot'
        case 'CASUAL':
          return 'Casual'
        default:
          return 'Trainer'
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4000).then(() => console.log('on port 4000'))
