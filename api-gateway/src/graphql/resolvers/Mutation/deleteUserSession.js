import usersService from "#root/adapters/UsersService";


const deleteUserSessionResolver = async(obj, {sessionId}, context) => {
    await usersService.deleteUserSession({sessionId});

    context.res.clearCookie("userSessionId");

    return true;
}

export default deleteUserSessionResolver;