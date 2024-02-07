const axios = require("axios").default;
const properties = require("../utils/ProjectProperties.js");

/**
 * Contains the ZAPI operations defined under https://zephyrsquad.docs.apiary.io/#
 * @author Ram Sivasubramaniam
 */
class ZapiOperations {
  /**
   * Get all the test cycles for the defined JIRA project / Zephyr Squad
   * @param {string} token - ZAPI JWT
   * @param {string} uri - ZAPI Final Operation URI for Get Cycles
   * @param {string} contentType - Content Type
   * @param {string} accessKey - ZAPI Access Key
   * @returns The response object for the Get Cycles Request
   */
  async getCycles(token, uri, contentType, accessKey) {
    try {
      const response = await axios.get(uri, {
        headers: {
          Authorization: token,
          "Content-Type": contentType,
          zapiAccessKey: accessKey,
        },
      });
      console.log(response.status);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Create a new folder under the desired release --> test cycle
   * @param {string} token - ZAPI JWT
   * @param {string} uri - ZAPI Final Operation URI for Create Folder
   * @param {object} requestBody - Request body for creating folder
   * @param {string} contentType - Content Type
   * @param {string} accessKey - ZAPI Access Key
   * @returns The response object for the Create Folder Request
   */
  async createFolder(token, uri, requestBody, contentType, accessKey) {
    try {
      const response = await axios.post(uri, requestBody, {
        headers: {
          Authorization: token,
          "Content-Type": contentType,
          zapiAccessKey: accessKey,
        },
      });
      console.log(response.status);
      console.log(response.data);

      properties.FOLDER_NAME = response.data.name;
      properties.FOLDER_ID = response.data.id;
      console.log(properties.FOLDER_NAME);
      console.log(properties.FOLDER_ID);

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Add a test to a folder
   * @param {string} token - ZAPI JWT
   * @param {string} uri - ZAPI Final Operation URI for Add Test
   * @param {object} requestBody - Request body for adding test
   * @param {string} contentType - Content Type
   * @param {string} accessKey - ZAPI Access Key
   * @returns The response object for the Add Test Request
   */
  async addTestToFolder(token, uri, requestBody, contentType, accessKey) {
    try {
      const response = await axios.post(uri, requestBody, {
        headers: {
          Authorization: token,
          "Content-Type": contentType,
          zapiAccessKey: accessKey,
        },
      });
      console.log(response.status);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = new ZapiOperations();
