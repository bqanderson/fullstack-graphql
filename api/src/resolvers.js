/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    user(_, __, { models }) {
      return models.User.findOne()
    },
    pets(_, { input }, { models }) {
      return models.Pet.findMany(input)
    },
    pet(_, { input }, { models }) {
      return models.Pet.findOne(input)
    },
  },
  Mutation: {
    createPet(_, { input }, { models }) {
      return models.Pet.create(input)
    },
    createUser(_, { input }, { models }) {
      return models.User.create(input)
    },
  },
  Pet: {
    owner(_, __, { models }) {
      return models.User.findOne()
    },
  },
  User: {
    pets(_, { input }, { models }) {
      return models.Pet.findMany(input)
    },
  },
}
