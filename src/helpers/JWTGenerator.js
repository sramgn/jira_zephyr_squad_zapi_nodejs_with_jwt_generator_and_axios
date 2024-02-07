/**
 * Create the ZAPI JWT based on the information provided
 * @param {string} BASE_URL - ZAPI Base URL
 * @param {string} ACCESS_KEY - ZAPI Access Key
 * @param {string} SECRET_KEY - ZAPI Secret Key
 * @param {string} ACCOUNT_ID - JIRA Account ID for the user
 * @author Ram Sivasubramaniam
 */

const jwt = require("atlassian-jwt");
const { SHA256 } = require("jshashes");

function Client(BASE_URL, ACCESS_KEY, SECRET_KEY, ACCOUNT_ID) {
  if (!BASE_URL || !ACCESS_KEY || !SECRET_KEY || !ACCOUNT_ID) {
    throw new Error(
      "Please provide all the arguments: BASE_URL, ACCESS_KEY, SECRET_KEY, and ACCOUNT_ID are required."
    );
  }

  this.BASE_URL = BASE_URL;
  this.ACCESS_KEY = ACCESS_KEY;
  this.SECRET_KEY = SECRET_KEY;
  this.ACCOUNT_ID = ACCOUNT_ID;
  this.HASH_LIB = new SHA256();

  return this;
}

Client.prototype.generateJWT = function (METHOD, URI, JWT_EXPIRATION) {
  if (!METHOD || !URI || !JWT_EXPIRATION) {
    throw new Error("METHOD, URI, and JWT_EXPIRATION are required.");
  }

  const [RELATIVE_PATH, QUERY_STRING] = URI.split(this.BASE_URL)[1].split("?");
  const CANONICAL_PATH = `${METHOD}&${RELATIVE_PATH}&${QUERY_STRING || ""}`;

  const jwt_payload = {
    sub: this.ACCOUNT_ID,
    qsh: this.HASH_LIB.hex(CANONICAL_PATH),
    iss: this.ACCESS_KEY,
    exp: new Date().getTime() + JWT_EXPIRATION,
    iat: new Date().getTime(),
  };

  return jwt.encode(jwt_payload, this.SECRET_KEY);
};

module.exports = Client;
