module.exports = {
  client: {
    includes: ['./utilities/**/*.ts'],
    service: {
      name: 'OSPC',
      url: `http://localhost:3000/graphql`,
    },
  },
};
