import hygraphClient from "../../lib/hygraphClient";
import {gql} from "graphql-request";

export default async function handler(req, res) {
    try {
        const { players } = await hygraphClient.request(
            gql`
            query MyQuery {
              players(first: 15) {
                id
                fullName
                mobile
                playerType
                createdAt
              }
            }
        `,
        )
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch players' });
    }
}
