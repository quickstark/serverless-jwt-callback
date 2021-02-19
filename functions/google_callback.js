const { google } = require("googleapis");
const fs = require("fs");

const sheets = google.sheets("v4");
console.log("Starting Google Callback Function");

exports.handler = function (context, event, callback) {
  // First, get the path for the Asset
  let keyfile = Runtime.getAssets()["/key.json"].path;
  console.log(keyfile);

  //Read JSON from file ... have used require() in the past, but it will toss a ":" token error
  //after deploying the Function to Twilio
  let data = fs.readFileSync(keyfile).toString("utf-8");
  let KEY = JSON.parse(data);
  console.log(KEY.type);

  //twiml for testing
  const twiml = new Twilio.twiml.MessagingResponse();

  //the event we're processing
  console.log("***** RAW Event *****");
  console.log(Object.values(event));

  let values = [Object.values(event)];

  //Setup Google JWT
  const jwtClient = new google.auth.JWT(
    KEY.client_email,
    null,
    KEY.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"],
    null
  );

  async function getGoogleSheetData() {
    await jwtClient.authorize();
    const request = {
      // The ID of the spreadsheet to retrieve data from.
      spreadsheetId: "1t3WgEnkpGbPEZFH4yjR4IIRM_OTz4O7usUllo_uWHg4",

      // The A1 notation of the values to retrieve.
      range: "A1:D1",
      auth: jwtClient,
    };
    return await sheets.spreadsheets.values.get(request);
  }

  async function postGoogleSheetData() {
    await jwtClient.authorize();
    const request = {
      // The ID of the spreadsheet to post data to.
      spreadsheetId: "1t3WgEnkpGbPEZFH4yjR4IIRM_OTz4O7usUllo_uWHg4",
      auth: jwtClient,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      resource: { values },
    };
    return await sheets.spreadsheets.values.append(request);
  }
  /*
  getGoogleSheetData().then((res) => {
    console.log(res.data.values[0][0]);
    twiml.message(res.data.values[0][0]);
    callback(null, twiml);
  });
*/

  postGoogleSheetData(event)
    .then((res) => {
      console.log(res);
      twiml.message("Finished Posting");
      callback(null, twiml);
    })
    .catch((err) => {
      console.log(err);
    });
};
