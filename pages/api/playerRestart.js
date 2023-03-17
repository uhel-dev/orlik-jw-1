import hygraphClient from "../../lib/hygraphClient";
import {gql} from "graphql-request";

export default async function handler(req, res) {
    // Define your GraphQL query
    const query = gql`
    mutation MyQuery {
      deleteManyPlayersConnection(after: "clfcmnj860ijm0bmjwelr7ly7") {
        edges {
          node {
            id
          }
        }
      }
    }`;
    // Call the GraphQL API with your query
    try {
        await hygraphClient.request(query)
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}