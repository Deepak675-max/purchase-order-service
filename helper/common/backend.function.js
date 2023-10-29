const httpErrors = require("http-errors");
const mongoose = require("mongoose");
const _ = require('lodash');

function stringToObjectId(rawData) {
    if (/^[0-9a-fA-F]{24}$/.test(rawData)) {
        try {
            return new mongoose.Types.ObjectId(rawData);
        } catch (error) {
            console.error('Error typecasting string to object-id:', error);
            throw httpErrors.UnprocessableEntity('Error typecasting string to object-id');
        }
    } else {
        throw httpErrors.UnprocessableEntity('Invalid ObjectId format');
    }
}


module.exports = {
    stringToObjectId
}