/**
 * parseCSV.ts
 *
 * This file handles ingesting, reading, and organizing data from a CSV file
 * with the 'csv-parse' npm package.
 */
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { promisify } from "util";
import { pipeline } from "stream";
const asyncPipeline = promisify(pipeline);
/**
 * Parses a CSV file as an input stream.
 *
 * @param {string} filePath The path to the CSV file
 * @returns {Startup[]} An array of startup company data
 */
export async function parseCSVStream(filePath) {
    try {
        console.log("Reading from CSV file...");
        const startups = [];
        //A pipeline that chains mutliple stream operations together and allows for asynchronous operation
        await asyncPipeline(fs.createReadStream(filePath), //Reads raw CSV
        parse({
            //Parses CSV lines into JS objects
            columns: true,
            skip_empty_lines: true,
            trim: true,
        }), async function* (source) {
            //Transforms each object to match our 'Startup' data interface
            for await (const record of source) {
                const filtered = {
                    name: record.name,
                    founder: record.gp_owner,
                    tagline: record.tagline,
                    stage: record.stage,
                    description: record.description,
                    foundingYear: record.founding_year,
                    country: record.country,
                    verticals: record.verticals,
                    website: record.website,
                    heroImageURL: record.hero_image,
                    logoURL: record.logo,
                    backgroundImageURL: record.background_image,
                };
                startups.push(filtered);
            }
        });
        console.log("Succesfully parsed data from CSV! ✅");
        return startups;
    }
    catch (error) {
        console.error(`❌ Error: The file [ ${filePath} ] does not exist or is of the wrong type.\n`);
        process.exit(1);
    }
}
/**
 * Main function used for testing.
 */
async function testFunction() {
    try {
        //Validate command-line input
        if (process.argv.length < 3) {
            console.error("Improper usage: Please provide a CSV file path: node ./build/parseCSV.js <file.csv>");
            process.exit(1);
        }
        //Reads the file path from the command line
        const file = process.argv[2];
        if (!file) {
            console.error("Improper usage: Please provide a CSV file path: node ./build/parseCSV.js <file.csv>");
            process.exit(1);
        }
        const filePath = path.resolve(process.cwd(), file);
        //Parses the CSV data
        const startups = await parseCSVStream(filePath);
        console.log("✅ Succesfully parsed CSV data...");
    }
    catch (err) {
        console.error("Error parsing CSV:", err);
    }
}
// testFunction().catch((error) => {
//   throw new Error(`Fatal error at testFunction(): \n${error}`);
// });
