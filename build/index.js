/**
 * 'index.js' is the entry file for the project.
 *
 * TODO:
 * - Input & Read a CSV file (that also includes images)
 * - Create a presentation and output a universal shareable link using
 *   the Google service account (PptxGenJs)
 * - Attach CSV data to JSON object and produce slides
 */
import path from "path";
import { parseCSVStream } from "./parseCSV.js";
import { generateDecks } from "./createPresentation.js";
async function main() {
    try {
        console.log("Pitch Deck Tool Prototype:");
        //Validate command-line input
        if (process.argv.length < 2) {
            console.error("Improper usage: Please provide a CSV file path: npm run start -- <file.csv>\n");
            process.exit(1);
        }
        //Reads the file path from the command line
        const file = process.argv[2];
        if (!file) {
            console.error("Improper usage: Please provide a CSV file path: npm run start -- <file.csv>\n");
            process.exit(1);
        }
        const filePath = path.resolve(process.cwd(), file);
        //Parses the CSV data from file
        const startups = await parseCSVStream(filePath);
        //Creates presentation using the parsed data
        const presentation = await generateDecks(startups);
    }
    catch (err) {
        console.error("Error parsing CSV:", err);
    }
}
main().catch((error) => {
    throw new Error(`Fatal error in entry file's main function: \n ${error}`);
});
