import _ from 'lodash';

const formatGraphQlErrors = error => {
    const errorDetails = _.get(error, "originalError.response.body");

    try{
        if(errorDetails){
            console.log("heyyyyyyyy")
            return JSON.parse(errorDetails);
        }
    }
    catch(err){}

    return error;
}

export default formatGraphQlErrors;