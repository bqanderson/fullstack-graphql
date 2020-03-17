const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    shoes: [Shoe]!
  }

  interface Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    user: User!
  }

  type Trainer implements Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    sport: String
    user: User!
  }

  type Casual implements Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    style: String
    user: User!
  }

  type Dress implements Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    occation: String
    user: User!
  }

  type Boot implements Shoe {
    type: ShoeType!
    brand: String!
    size: Int!
    eyeholes: Int
    user: User!
  }

  enum ShoeType {
    TRAINER
    CASUAL
    DRESS
    BOOT
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
const user = {
  id: 1,
  email: 'yoda@masters.com',
  avatar: 'http://yoda.png',
  shoes: [],
}

const shoes = [
  { type: 'TRAINER', brand: 'Nike', size: 12, sport: 'Baseball', user: 1 },
  { type: 'TRAINER', brand: 'Adiddas', size: 14, sport: 'Basketball', user: 1 },
  { type: 'TRAINER', brand: 'New Balance', size: 9, sport: 'Tennis', user: 1 },
  { type: 'TRAINER', brand: 'Converse All-Stars', size: 10, sport: 'Basketball', user: 1 },
  { type: 'BOOT', brand: 'Doc Martins', size: 11, eyeholes: 8, user: 1 },
  { type: 'CASUAL', brand: 'Dockers', size: 11, style: 'Boatshoe', user: 1 },
]

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return shoes
    },
    me() {
      return user
    },
  },

  Mutation: {
    createShoe(_, { input }) {
      return input
    },
  },

  User: {
    shoes() {
      return shoes
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

  Trainer: {
    user(shoe) {
      return user
    },
  },

  Casual: {
    user(shoe) {
      return user
    },
  },

  Boot: {
    user(shoe) {
      return user
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4000).then(() => console.log('on port 4000'))
