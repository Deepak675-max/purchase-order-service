const httpErrors = require('http-errors');
const notAuthorized = "Request not Authorized";
const moment = require('moment');
const { default: axios } = require('axios');


const verifyAccessToken = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers[process.env.JWT_ACCESS_TOKEN_HEADER];

        if (!authorizationHeader) {
            throw httpErrors[401]('Unauthorized');
        }

        // Split the header value to separate the "Bearer" keyword from the token
        const [bearer, accessToken] = authorizationHeader.split(' ');

        if (bearer !== 'Bearer' || accessToken === null) {
            throw httpErrors[401]('Invalid jwtAccessToken format.');
        }

        const requestBody = {
            accessToken: accessToken
        }

        const response = await axios.post('http://localhost:5000/v1/auth/authorize-user', requestBody);

        console.log(response.status);

        if (response.status === 200) {
            req.user = response.data.data.user;
            next();
        }
        else {
            const response = await axios.post('http://localhost:5000/v1/auth/authorize-vendor', requestBody);

            console.log(response.status);
            if (response.status === 200) {
                req.vendor = response.data.data.vendor;
                next();
            }
            else {
                throw response.data.error.message;
            }
        }

    } catch (error) {
        next(httpErrors.Unauthorized(notAuthorized));
    }
}

module.exports = {
    verifyAccessToken
}