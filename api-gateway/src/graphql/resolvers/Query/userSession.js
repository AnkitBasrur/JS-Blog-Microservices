
const userSessionResolver = async(obj, args, context) => {
    if(args.me !== true) throw new Error("Unsupported Argument value");
    return context.res.locals.userSession;
}

export default userSessionResolver;