import {getUsers, getUserById, createUser, getUserDataMap} from './databases/db.js'
import {getAuthUser} from './databases/authdb.js'
import jwt from 'jsonwebtoken'

export const resolvers = {
    Query: {
        getAllData: (parent, args, context) => {
            if (!context.user)
                throw new Error('Unauthorized access')
            return getUsers()
        },
        getDataById: (parent, args) => getUserById(Number(args.id)),
        getUserData: (parent, args) => {
            const userId = getUserDataMap(args.username)
            if(!userId) return []
            const data = getUsers()
            return data.filter(person => userId.includes(person.id))
        },
        searchUsers: (parent, args) => {
            const data = getUsers()
            const matchedUsers = data.filter(person => person.forename.toLowerCase() === args.forename.toLowerCase())
            return matchedUsers
        }
    },
   User: {
        userOwnData: (parent) => {
            const userId = getUserDataMap(parent.username)
            if(!userId) return []    
            const data = getUsers()
            return data.filter(person => userId.includes(person.id)) 
        }
    },
    Mutation: {
        addData: (parent, args) => {
            const id = Number(args.id)
            if( getUserById(id) )
                throw new Error('Record already exist')
            else {
                const newUser = createUser({...args, id})
                return newUser
            }
        },
        login: (parent, {username, password}) => {
            const user = getAuthUser(username)
            if( user && (user.password === password)) {
                const token = jwt.sign({username: username}, "my_secret_key", {
                    expiresIn: '1h'
                }) 

                return {
                    "username": username,
                    "access_token": token,
                    "token_type": "Bearer",
                    "expires_in": "1h"
                }
            } else
                throw new Error('Unauthorized') 
        },
        deleteData: (parent, args) => {
            const id = Number(args.id)
            const user = getUserById(id)
            if(!user)
                throw new Error('Record not found')
            const data = getUsers()
            const index = data.findIndex(person => person.id === id)
            if(index > -1) {
                const deletedUser = data.splice(index, 1)[0]
                return deletedUser
            }
        },
        updateData: (parent, args) => {
            const id = Number(args.id)
            const user = getUserById(id)
            if(!user)
                throw new Error('Record not found')
            const updatedUser = {id, ...user, ...args}
            const data = getUsers()
            const index = data.findIndex(person => person.id === id)
            if(index > -1) {
                data[index] = updatedUser
                return updatedUser
            }
        }
    }
}