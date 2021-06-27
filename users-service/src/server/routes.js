import {User, UserSession } from "#root/db/models";
import generateId from "#root/helpers/generateId";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";
import { addHours } from "date-fns"

const USER_SESSION_EXPIRY_HOURS = 1;

const setupRoutes = app => {

    app.post("/sessions", async (req, res, next) => {
        if(!req.body.email || !req.body.password){
            return next(new Error("Invalid body"));
        }

        try{
            const user = await User.findOne({ attributes: {}, where: { email: req.body.email } });

            if(!user)
                return next(new Error("Invalid email!"));

            if(!passwordCompareSync(req.body.password, user.passwordHash ))
                return next(new Error("Invalid password!"));
            
            const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);

            const sessionID = generateId();

            const userSession = await UserSession.create({ 
                id: sessionID, 
                expiresAt, 
                userId: user.id
            })

            return res.json(userSession)
        }
        catch(err){
            return next(err);
        }
    });

    app.delete("/sessions/:sessionId", async(req, res, next) => {
        try{
            const userSession = await UserSession.findByPk(req.params.sessionId);

            if(!userSession)
                return next(new Error("Session not found!"));  

            await userSession.destroy();
            return res.end(); 
        }
        catch(err){
            return next(err);
        }
    })

    app.get("/sessions/:sessionID", async (req, res, next) => {
        try{
            const userSession = await UserSession.findByPk(req.params.sessionID);

            if(!userSession)
                return next(new Error("Session not found!"));

            return res.json(userSession);
        }
        catch(err){
            return next(err);
        }
    })

    app.post("/users", async (req, res, next) => {
        if(!req.body.email || !req.body.password) {
            return next(new Error("Invalid Body!!"));
        }

        try{
            const newUser = await User.create({
                email: req.body.email,
                id: generateId(),
                passwordHash: hashPassword(req.body.password)
            })

            return res.json(newUser);
        }
        catch(err){
            return next(err);
        }
    })

    app.get("/users/:userId", async (req, res, next) => {
        try{
            const user = await User.findByPk(req.params.userId);

            if(!user)   
                return next(new Error("Invalid userID!!"));

            return res.json(user);
        }
        catch(err){
            return next(err);
        }
    })
}

export default setupRoutes;