//handler.js must be imported at FIRST due to error handling functions
//that needs to be initialized when lambda functions are first invoked

//a handler function that serves as a wrapper
//around our Lambda functions
export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        try {
        // Run the Lambda
        body = await lambda(event, context);
        statusCode = 200;
        } catch (e) {
        //prints the full error
        console.error(e);
        body = { error: e.message };
        statusCode = 500;
        }

      // Return HTTP response
        return {
        statusCode,
        body: JSON.stringify(body),
        };
    };
    }