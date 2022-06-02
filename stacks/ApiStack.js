import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

//create a new stack for API
export function ApiStack({ stack, app }) {
    //reference the table resource from the StorageStack
    const { table } = use(StorageStack);

  // Create the API with SST's Api construct
    const api = new Api(stack, "Api", {
    defaults: {
        function: {
        //giving API permission to access the DynamoDB table
        permissions: [table],
        environment: { //passing the name of the DynamoDB table as an environment variable called TABLE_NAME
            TABLE_NAME: table.tableName,
        },
        },
    },
    routes: { //route to create a note
        "POST /notes": "functions/create.main",
        "GET /notes/{id}": "functions/get.main",
        "GET /notes": "functions/list.main",
        "PUT /notes/{id}": "functions/update.main",
        "DELETE /notes/{id}": "functions/delete.main",
    },
    });

  // Show the API endpoint in the output
    stack.addOutputs({
    ApiEndpoint: api.url,
    });

  // Return the API resource
    return {
    api,
    };
}