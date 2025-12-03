export const typeDefs = `
    """
    Authentication payload returned after a successful login.
    Contains the JWT token and related metadata
    """
    type AuthPayload {
        "The access token generated for the user"
        access_token: String!
        "The username used for login"
        username: String!
        "The needed Bearer token"
        token_type: String!
        "Time until the token expires"
        expires_in: String!
    }
    
    type User {
        """
        The unique username of the user
        """
        username: String!
        userOwnData: [Data!]!   
    }

    type Data {
        """
        Unique identifier for the data
        """
        id: ID!,
        forename: String!,
        surname: String!
    }

    type Query {
        """
        Retrieve all data records from the database
        """
        getAllData: [Data!]!
        "Retrieve specific record from the database"
        getDataById(id: ID!): Data!
        "Retrieve data of a specific user"
        getUserData(username: String!): [Data!]
        """
        Return users that fit the search criteria
        """
        searchUsers(forename: String!): [Data!]!
    }

    type Mutation {
        """
        Add a new data record to the database
        """
        addData(
            id: ID!
            forename: String!
            surname: String!
        ): Data
        login(username: String!, password: String!): AuthPayload
    }
`