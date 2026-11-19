import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://flyby-router-demo.herokuapp.com/',
    cache: new InMemoryCache(),
});

export type Location = {
	id: number
	name: string
	description: string
	photo: string
}

const GET_LOCATIONS = gql`
	query GetLocations {
		locations {
			id
			name
			description
			photo
		}
	}
`;

function DisplayLocations() {
	const { loading, error, data } = useQuery(GET_LOCATIONS);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return data.locations.map(({ id, name, description, photo }: Location) => (
		<div key={id}>
			<h3>{name}</h3>
			<img width="400" height="250" alt="location-reference" src={`${photo}`} />
			<br />
			<b>About this location:</b>
			<p>{description}</p>
			<br />
		</div>
	));
}

export default function RemoteServer() {
    return (
        <>
            <ApolloProvider client={client}>
                <h1>Showing 'Locations' from Remote GraphQL Server</h1>
                <DisplayLocations/>
            </ApolloProvider>
        </>
    );
}