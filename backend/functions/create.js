import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event) {
  // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
    //read the name of the DynamoDB table    
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      userId: "123", // The id of the author (123 is just hard coding for now)
      noteId: uuid.v1(), // A unique uuid
      //the event body contains the contents of the note as a string
      content: data.content, // Parsed from request body
      //attachment is the filename of a file that will be uploaded to S3 bucket
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
    };

    try {
    await dynamoDb.put(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };
    } catch (e) {
    return {
        statusCode: 500,
        body: JSON.stringify({ error: e.message }),
    };
    }
}