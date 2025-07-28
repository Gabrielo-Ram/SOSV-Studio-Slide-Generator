/**
 * [ Deprecated ]
 * googleAuth.js
 *
 * This file handles logic related to the Google Cloud project and the
 * related Service Account. Here, I use the Service Account to upload .pptx
 * files up to a shared Google Drive folder.
 *
 * We designate the appropriate Google Drive folder with the enviornment
 * variable: SHARED_FOLDER_ID.
 *
 * Service Account details:
 * pitch-deck-report-service@sosv-studio-pitch-deck-project.iam.gserviceaccount.com
 */

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { google, drive_v3 } from "googleapis";

//Dotenv configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const KEY_PATH = path.resolve(
  __dirname,
  "../serviceCredentials/service-account-key.json"
);

//Authenticates the service account from my Google Cloud Project with
//appropriate scopes and a 'secret' credentials.json file.
const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: SCOPES,
});

/**
 * Changes the permissions of the inputted presentation to allow 'anyone with
 * the link' to edit.
 *
 * @param {string} presentationID The presentationID string of the deck we want to make public
 * @param {drive_v3.Drive} drive The Drive client instance
 *
 * @returns {string} The link to view/edit the presentation
 */
async function makePresentationPublic(
  presentationID: string,
  drive: drive_v3.Drive
) {
  try {
    //Changes permissions to allow 'anyone [with the link]' to view the presentation
    await drive.permissions.create({
      fileId: presentationID,
      requestBody: {
        role: "writer",
        type: "anyone",
      },
    });

    //Returns a link to the presentation
    const link = `https://docs.google.com/presentation/d/${presentationID}/edit?usp=sharing`;
    console.log("Deck is publicly editable at: ", link);

    return link;
  } catch (error) {
    throw new Error(
      `Could not change permissions for presentation: \n${error}`
    );
  }
}

/**
 * Deletes all saved files in Service Account's memory.
 * Used for testing.
 *
 * @param {drive_v3.Drive} drive The Drive Client instance
 */
async function deleteAllOwnedFiles(drive: drive_v3.Drive) {
  //Searches through Service-Account's drive
  const res = await drive.files.list({
    q: "'me' in owners",
    fields: "files(id, name)",
  });

  const files = res.data.files;
  if (!files || files.length === 0) {
    console.log("No files to delete");
    return;
  }

  console.log(
    `Found ${files.length} ${
      files.length === 1 ? "file" : "files"
    }. Deleting...`
  );

  //Deletes any files found
  for (const file of files) {
    await drive.files.delete({ fileId: file.id! });
  }

  console.log("Cleanup complete.");
}

//TESTING:
async function main() {
  console.log("\nRunning test function: ");

  //Creates a Google Drive API Client
  const authClient = await auth.getClient();
  const driveClient = google.drive({ version: "v3", auth: authClient as any });
}

//main();
