import { gql } from 'apollo-server-express'

import { UserTypeDefs } from 'graphql/User/User'
import { PostTypedefs } from 'graphql/Post/Post'
import { ProfileTypedefs } from 'graphql/Profile/Profile'
import { DateTypeDefs } from 'graphql/customScalars'
import { FollowTypedefs } from 'graphql/Follow/Follow'

const Query = gql`
    type Query {
        _empty: String
    }
`

const Mutation = gql`
    type Mutation {
        _empty: String
    }
`

const typeDefs = [
    Query,
    Mutation,
    DateTypeDefs,
    ...UserTypeDefs,
    ...PostTypedefs,
    ...ProfileTypedefs,
    ...FollowTypedefs,
]

export default typeDefs
