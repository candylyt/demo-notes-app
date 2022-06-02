//create a object that exposes the DynamoDB client method

import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

export default {
    get: (params) => client.get(params).promise(),
    put: (params) => client.put(params).promise(),
    query: (params) => client.query(params).promise(),
    update: (params) => client.update(params).promise(),
    delete: (params) => client.delete(params).promise(),
};