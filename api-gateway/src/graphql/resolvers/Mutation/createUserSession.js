import usersService from "#root/adapters/UsersService";


const createUserSessionResolver = async(obj, {email, password}, context) => {
    const userSession = await usersService.createUserSessions({email, password});

    context.res.cookie("userSessionId", userSession.id, { httpOnly: true });

    return userSession;
}

export default createUserSessionResolver;