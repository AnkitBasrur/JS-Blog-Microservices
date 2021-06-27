(()=>{"use strict";var e={n:s=>{var r=s&&s.__esModule?()=>s.default:()=>s;return e.d(r,{a:r}),r},d:(s,r)=>{for(var t in r)e.o(r,t)&&!e.o(s,t)&&Object.defineProperty(s,t,{enumerable:!0,get:r[t]})},o:(e,s)=>Object.prototype.hasOwnProperty.call(e,s),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},s={};e.r(s),e.d(s,{Listings:()=>w,userSession:()=>U});var r={};e.r(r),e.d(r,{createListing:()=>m,createUser:()=>v,createUserSession:()=>h,deleteUserSession:()=>j}),require("@babel/polyfill"),require("dotenv/config");const t=require("apollo-server-express"),i=require("cookie-parser");var n=e.n(i);const o=require("cors");var a=e.n(o);const c=require("express");var l=e.n(c);const d=require("got");var u=e.n(d);const p={},g=(e,s)=>{if(!(e in process.env)){if(s)return s;throw new Error(`${e} not found in process.env!`)}return p[e]?p[e]:(p[e]=process.env[e],process.env[e])},y=g("LISTINGS_SERVICE_URI");class S{static async fetchAllListings(){return(await u().get(`${y}/listings`).json()).listings}static async createListing({title:e,description:s}){return await u().post(`${y}/listings`,{json:{title:e,description:s}}).json()}}const w=async()=>await S.fetchAllListings(),U=async(e,s,r)=>{if(!0!==s.me)throw new Error("Unsupported Argument value");return r.res.locals.userSession},f=g("USERS_SERVICE_URI");class I{static async createUser({email:e,password:s}){return await u().post(`${f}/users`,{json:{email:e,password:s}}).json()}static async fetchUser({userId:e}){return await u().get(`${f}/users/${e}`).json()}static async createUserSessions({email:e,password:s}){return await u().post(`${f}/sessions`,{json:{email:e,password:s}}).json()}static async deleteUserSession({sessionId:e}){return await u().delete(`${f}/sessions/${e}`).json()}static async fetchUserSession({sessionId:e}){return await u().get(`${f}/sessions/${e}`).json()}}const v=async(e,{email:s,password:r})=>await I.createUser({email:s,password:r}),m=async(e,{title:s,description:r},t)=>{if(!t.res.locals.userSession)throw new Error("User not logged in!!");return await S.createListing({description:r,title:s})},h=async(e,{email:s,password:r},t)=>{const i=await I.createUserSessions({email:s,password:r});return t.res.cookie("userSessionId",i.id,{httpOnly:!0}),i},j=async(e,{sessionId:s},r)=>(await I.deleteUserSession({sessionId:s}),r.res.clearCookie("userSessionId"),!0),L={Mutation:r,Query:s,UserSession:{user:async e=>await I.fetchUser({userId:e.userId})}},$=require("apollo-server").gql`
    scalar Date

    type Listing {
        description: String!
        id: ID!
        title: String!
    }

    type User{
        email: String!
        id: ID!
    }

    type UserSession{
        createdAt: Date!
        expiresAt: Date!
        id: ID!
        user: User!
    }

    type Mutation{
        createListing(title: String!, description: String!): Listing!
        createUser(email: String!, password: String!): User!
        createUserSession(email: String!, password: String!): UserSession!
        deleteUserSession(sessionId: ID!): Boolean!
    }

    type Query {
        Listings: [Listing!]!
        userSession(me: Boolean!): UserSession
    }
`,b=require("lodash");var q=e.n(b);const E=g("PORT",7e3),D=new t.ApolloServer({context:e=>e,formatError:e=>{const s=q().get(e,"originalError.response.body");try{if(s)return console.log("heyyyyyyyy"),JSON.parse(s)}catch(e){}return e},resolvers:L,typeDefs:$}),O=l()();O.use(n()()),O.use(a()({origin:(e,s)=>s(null,!0),credentials:!0})),O.get("/",((e,s)=>{s.send({msg:"hello"})})),O.use((async(e,s,r)=>{if(e.cookies.userSessionId){const r=await I.fetchUserSession({sessionId:e.cookies.userSessionId});s.locals.userSession=r}return r()})),D.applyMiddleware({app:O,cors:!1,path:"/graphql"}),O.listen(E,"0.0.0.0",(()=>{console.info(`api gateway listening on ${E}`)}))})();