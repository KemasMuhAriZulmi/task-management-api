import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './interfaces/graphql/schema.js';
import { resolvers } from './interfaces/graphql/resolvers.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});





// import express from 'express';
// import { graphqlHTTP } from 'express-graphql';
// import { buildSchema } from 'graphql';
// import { taskResolvers } from './interfaces/graphql/resolvers.js';
// import { dependencies } from './config/container.js';
// import fs from 'fs';
// import path from 'path';
// import { errorMiddleware } from './utils/middleware/error.middleware.js';

// // Load GraphQL schema
// const schema = buildSchema(
//   fs.readFileSync(path.resolve('src/interfaces/graphql/schema.graphql'), 'utf-8')
// );

// const app = express();

// // GraphQL middleware
// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue: taskResolvers(dependencies),
//   graphiql: true,
//   context: ({ req }) => {
//     // Contoh autentikasi sederhana (implementasi JWT bisa ditambahkan)
//     const token = req.headers.authorization || '';
//     return { user: token ? { id: 1 } : null }; // Mock user
//   }
// }));

// // Error handling middleware
// app.use(errorMiddleware);

// // Start server
// app.listen(4000, () => {
//   console.log('Server running on http://localhost:4000/graphql');
// });