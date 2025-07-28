/**
 * createSlides.js
 *
 * I use the 'PptxGenJS' Node library to create and style a slide presentation.
 * I am NOT using the Google Slides API. This file handles creating
 * and styling a presentation. Presentations are exported as .pptx
 * files.
 */
import * as PptxGen from "pptxgenjs";
let todaysDate = new Date().toDateString();
todaysDate = todaysDate.split(" ").slice(1).join(" ");
//Global presentation variable and setter function
let presentation = null;
function setPresentation(newPresentation) {
    presentation = newPresentation;
}
//HAX THEMES COLORS
const haxGreen = "03FF9A";
//A defined 'Placeholder Slide' that is used as a template for all custom slides.
const PLACEHOLDER_SLIDE = {
    title: "PLACEHOLDER_SLIDE",
    background: { color: "FFFFFF" },
    objects: [
        { rect: { x: 0, y: 0, w: "100%", h: 0.75, fill: { color: "F1F1F1" } } },
        { text: { text: "Status Report", options: { x: 0, y: 0, w: 6, h: 0.75 } } },
        {
            placeholder: {
                options: { name: "body", type: "body", x: 0.6, y: 1.5, w: 12, h: 5.25 },
                text: "(custom placeholder text!)",
            },
        },
    ],
    slideNumber: { x: 0.3, y: "95%" },
};
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
export async function generatePitchDeck(filename = "PitchDeck.pptx") {
    try {
        //Initiates the presentation
        presentation = await new PptxGen.default();
        presentation.layout = "LAYOUT_16x9";
        //Registers the placeholder template
        presentation.defineSlideMaster(PLACEHOLDER_SLIDE);
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
            y: "86%",
            // w: "30%",
            // h: "50%",
            color: "05FFA6",
            align: "center",
        });
        console.log("✅ Succesfully created presentation...");
    }
    catch (error) {
        throw new Error(`Failed to create presentation: \n${error}`);
    }
}
/**
 * Used to test the functions in this file
 */
async function testFunction() {
    await generatePitchDeck();
    //Saves presentation. writeFile() will write over any file that has
    //the same name.
    await presentation.writeFile({ fileName: "demo.pptx" });
    console.log("✅ Succesfully ran testFunction()");
}
testFunction().catch((error) => {
    throw new Error(`Fatal error in testFunction(): \n${error}`);
});
