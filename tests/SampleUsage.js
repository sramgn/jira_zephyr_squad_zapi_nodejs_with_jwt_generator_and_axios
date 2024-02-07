/**
 * Just a test js to explore various operations like creating the JWT & calling the respecting ZAPI operations.
 * @author Ram Sivasubramaniam
 */

//1. Include
const Client = require("zapi_nodejs");

//2. Imports / Constants
const properties = require("../src/utils/ProjectProperties.js");
const zapioperations = require("../src/helpers/ZAPIOperations.js");

//3. Just for debugging purposes in case you don't want to run the actual methods and just want to get the JWT. If so set to 'false'. No biggie :-).
const RUN_METHODS = true;

//4. Define the operation (Get cycles, create folder, add test, etc.) (‼️ NOTE - Change this as needed per the operation desired. This does not to dictate how you should call your these sample methods. For testing purposes only :-))
const OPERATION = "ADD_TEST_TO_FOLDER";

//5. Create the JWT Client
const JWTClient = new Client(
  properties.BASE_URL,
  properties.ACCESS_KEY,
  properties.SECRET_KEY,
  properties.ACCOUNT_ID
);

//6. ZAPI Operation(s)
let METHOD, OPERATION_URI, QUERY_STRING, CONTENT_TYPE;

switch (OPERATION) {
  case "GET_CYCLES":
    METHOD = properties.GET_CYCLES_METHOD;
    OPERATION_URI = properties.GET_CYCLES_OPERATION_URI;
    QUERY_STRING = properties.GET_CYCLES_QUERY_STRING.replace(
      "<JIRA_PROJECT_ID>",
      properties.JIRA_PROJECT_ID
    ).replace("<RELEASE_VERSION_ID>", properties.RELEASE_VERSION_ID);
    CONTENT_TYPE = properties.GET_CYCLES_CONTENT_TYPE;
    break;
  case "CREATE_FOLDER":
    METHOD = properties.CREATE_FOLDER_METHOD;
    OPERATION_URI = properties.CREATE_FOLDER_OPERATION_URI;
    QUERY_STRING = properties.CREATE_FOLDER_QUERY_STRING;
    CONTENT_TYPE = properties.CREATE_FOLDER_CONTENT_TYPE;
    break;
  case "ADD_TEST_TO_FOLDER":
    METHOD = properties.ADD_TEST_TO_FOLDER_METHOD;
    OPERATION_URI = properties.ADD_TEST_TO_FOLDER_OPERATION_URI.replace(
      "<FOLDER_ID>",
      properties.FOLDER_ID
    );
    QUERY_STRING = properties.ADD_TEST_TO_FOLDER_QUERY_STRING;
    CONTENT_TYPE = properties.ADD_TEST_TO_FOLDER_CONTENT_TYPE;
    break;
  default:
    throw (
      "ZAPI operation " +
      "'" +
      OPERATION +
      "'" +
      " that was passed is not defined. Exiting...!!!"
    );
}

//7. Define the Final URI to be used by the JWT Atlassian JWT Generator
//Please note the split / sort / join for the Query String. If this is not sorted in the alphabetical order then you will get this error --> "Expecting claim 'qsh' to have value"

const FINAL_URI =
  properties.BASE_URL +
  OPERATION_URI +
  QUERY_STRING.split("&").sort().join("&");

//8. Define the JWT Expiration (E.g. 60 mins)
const JWT_EXPIRATION_IN_SECS = 3600;

//8. Generate the JWT
const token =
  "JWT " + JWTClient.generateJWT(METHOD, FINAL_URI, JWT_EXPIRATION_IN_SECS);

//9. Log the values in the term
console.log("FINAL URI --> " + FINAL_URI);
console.log("JWT --> " + token);

//10. Send the request and get the response back for further manipulation(s) per your requirement(s) - E.g. Get Cycles / Create Folder / Add Test to Folder / Update Status / etc.
if (RUN_METHODS) {
  switch (OPERATION) {
    case "GET_CYCLES":
      // Get the list of all cycles
      zapioperations.getCycles(
        token,
        FINAL_URI,
        CONTENT_TYPE,
        properties.ACCESS_KEY
      );
      break;

    case "CREATE_FOLDER":
      // Create a new folder under the release --> desired cycle (E.g. Get the cycle ID that you desire to use from the above Get Cycles Response Body in your final impl as needed. Cycle ID is hardcoded here for ease of use. )
      // E.g. Using FORM DATA to send the request body
      const CFRequestBody = new FormData();
      CFRequestBody.append("cycleId", properties.CYCLE_ID);
      CFRequestBody.append(
        "name",
        "Test Folder - " + Math.random().toString(36).slice(2)
      ); //Change this (or) randomize this as desired.
      CFRequestBody.append("projectId", properties.JIRA_PROJECT_ID);
      CFRequestBody.append("versionId", properties.RELEASE_VERSION_ID);
      console.log(CFRequestBody);

      zapioperations.createFolder(
        token,
        FINAL_URI,
        CFRequestBody,
        CONTENT_TYPE,
        properties.ACCESS_KEY
      );
      break;

    case "ADD_TEST_TO_FOLDER":
      // Add a test to a folder --> (E.g. You can call "create new folder request" & use that folder to add the test case as part of this test. But in this e.g. an existing folder is being used to keep the test simple. )
      // E.g. Using RAW DATA to send to request body
      const ATRequestBody = {
        issues: ["PROJECT-12345", "PROJECT-67890"],
        assigneeType: "currentUser",
        method: 1,
        versionId: properties.RELEASE_VERSION_ID,
        projectId: properties.JIRA_PROJECT_ID,
        cycleId: properties.CYCLE_ID,
      };
      console.log(ATRequestBody);

      zapioperations.addTestToFolder(
        token,
        FINAL_URI,
        ATRequestBody,
        CONTENT_TYPE,
        properties.ACCESS_KEY
      );
      break;
    default:
      throw (
        "ZAPI operation " +
        "'" +
        OPERATION +
        "'" +
        " that was passed is not defined. Exiting...!!!"
      );
  }
}
// End of the test
