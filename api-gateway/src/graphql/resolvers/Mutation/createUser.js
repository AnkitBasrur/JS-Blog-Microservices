import usersService from "#root/adapters/UsersService";


const createUser = async(obj, {email, password}) => {
    return await usersService.createUser({email, password});
}

export default createUser;