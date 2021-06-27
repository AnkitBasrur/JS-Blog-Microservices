import ListingsService from "#root/adapters/ListingsService";

const createListingResolver = async (obj, {title, description}, context) => {
    if(!context.res.locals.userSession)
        throw new Error("User not logged in!!");
    
        return await ListingsService.createListing({description, title});
}

export default createListingResolver;