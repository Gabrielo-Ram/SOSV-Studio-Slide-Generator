/**
 * createSlides.js
 *
 * I use the 'PptxGenJS' Node library to create and style a slide presentation.
 * I am NOT using the Google Slides API. This file handles creating
 * and styling a presentation. Presentations are exported as .pptx
 * files.
 */
import * as PptxGen from "pptxgenjs";
import { addOverviewSlide, companyCoverSlide } from "./addCompanySlides.js";
//TODO: Import addCompanySlides.js!
let todaysDate = new Date().toDateString();
todaysDate = todaysDate.split(" ").slice(1).join(" ");
//Global presentation variable and setter function
let presentation = null;
function setPresentation(newPresentation) {
    presentation = newPresentation;
}
//HAX THEMES COLORS
const haxGreen = "03FF9A";
/**
 * Acts as the 'main' function of this file. Handles creating a new .pptx file,
 * and registers the placeholder template to the presentation.
 * - Handles creating a new .pptx presentation
 * - Registers the placeholder template
 * - Adds the universal 'cover' slide
 *
 * @param {string} filename An optional parameter that sets the name of the .pptx file.
 *
 * @returns {PptxGen} Returns an instance of the created presentation.
 */
async function createPresentation(filename = "PitchDeck.pptx") {
    try {
        //Initiates the presentation
        presentation = await new PptxGen.default();
        presentation.layout = "LAYOUT_16x9";
        //Sets this presentation instance as the global vairable
        setPresentation(presentation);
        //Creates and adds a new 'cover' slide
        let coverSlide = presentation.addSlide();
        coverSlide.background = {
            path: "https://hax.co/wp-content/uploads/2024/03/HAX_Inv_Background__0000_Bg01.jpg",
            x: 0,
            y: 0,
            w: 10,
            h: 5.625,
        };
        coverSlide
            .addImage({
            // 'HAX' Logo
            path: "https://sosv.com/wp-content/uploads/2024/02/hax-logo-green-cropped.png",
            x: "16%",
            y: "36%",
            w: "25%",
            h: "25%",
        })
            .addImage({
            //'We Are SOSV' Logo
            path: "https://sosv.com/wp-content/uploads/2022/07/we-are-sosv-negative.png",
            x: "16%",
            y: "85%",
            w: "12%",
            h: "7%",
        })
            .addText("Pitch Deck Report", {
            fontSize: 46,
            x: "58%",
            y: "26%",
            w: "30%",
            h: "50%",
            color: "FFFFFF",
            align: "right",
        })
            .addText(`${todaysDate}`, {
            fontSize: 17,
            x: "40%",
            y: "88%",
            // w: "30%",
            // h: "50%",
            color: "05FFA6",
            align: "center",
        });
        return presentation;
    }
    catch (error) {
        throw new Error(`Failed to create presentation: \n${error}`);
    }
}
//Creates a slide show for a company
async function addCompanyDeck(data) {
    try {
        await companyCoverSlide(presentation, "Test Company", "A test company that literally fulfills ALL of your testing needs");
        await addOverviewSlide(presentation, "Healthcare/Dentistry/Other Things", "France", "A really really really really really really really really really really really really really really really really really really really really really really really really really really long description.");
    }
    catch (error) {
        throw new Error(`Failed to add company slides: \n${error}`);
    }
}
/**
 * Used to test the functions in this file
 */
export async function generateDecks(data) {
    console.log("Creating .pptx file...");
    await createPresentation();
    console.log("Adding slides for each company...");
    //for (const company in data) {}
    await addCompanyDeck(data);
    //Saves presentation. writeFile() will write over any file that has
    //the same name.
    await presentation.writeFile({ fileName: "demo.pptx" });
    console.log("Pitch Decks were created succesfully! ✅ ");
}
