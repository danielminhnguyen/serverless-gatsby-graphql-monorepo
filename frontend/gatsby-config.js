module.exports = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    // {
    //   // The name of the plugin
    //   resolve: 'gatsby-source-mongodb',
    //   options: {
    //     server: {
    //       address: 'cluster0-shard-00-00.cqcjd.mongodb.net',
    //       port: 27017,
    //     },
    //     dbName: 'gatsby',
    //     collection: 'kohaclub',
    //     auth: {
    //       user: 'gatsby',
    //       password: 'hBNWt650IxGpSDJI',
    //     },
    //     extraParams: {
    //       replicaSet: 'atlas-2s5kyf-shard-0',
    //       ssl: true,
    //       authSource: 'admin',
    //       retryWrites: true,
    //     },
    //   },
    // },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'RMAPI',
        fieldName: 'rickAndMorty',
        url: 'https://rickandmortyapi.com/graphql',
      },
    },
    `gatsby-plugin-material-ui`,
  ],
};
