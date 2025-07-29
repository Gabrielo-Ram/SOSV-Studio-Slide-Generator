/**
 * 'addCompanySlides.js
 *
 * This file contains re-usable logic that handles creating slides for
 * a company in the CSV file.
 */
//Default images
const defaultLogo = "https://static.thenounproject.com/png/504708-200.png";
const defaultBackgroundImage = "https://img.freepik.com/free-vector/abstract-pattern-design_1053-534.jpg";
/**
 * Creates a 'cover' slide for a startup company
 *
 * @param {any} presentation The pptxgenjs instance of the presentation
 * @param {string} companyName The name of the company
 * @param {string} tagline The company's tag line
 * @param {string} logoURL An image URL of the company's logo
 * @param {string} heroImageURL An image URL of the company's hero image
 */
export function companyCoverSlide(presentation, companyName, tagline, logoURL = defaultLogo, heroImageURL = defaultBackgroundImage) {
    let slide = presentation.addSlide();
    //Sets the background image
    slide.background = {
        path: heroImageURL,
        x: 0,
        y: 0,
        w: "100%",
        h: "100%",
    };
    slide
        .addImage({
        // Company logo
        path: logoURL,
        x: "12%",
        y: "20%%",
        w: "30%",
        h: "25%",
        sizing: {
            type: "contain",
        },
    })
        .addText(companyName, {
        fontSize: 40,
        x: "12%",
        y: "45%",
        w: "37%",
        h: "15%",
    })
        .addText(tagline, {
        fontSize: 20,
        x: "60%",
        y: "65%",
        w: "37%",
        h: "30%",
        align: "center",
    });
}
/**
 * Creates an 'Overview' slide for a company. Includes data
 * on a company's
 * - verticals
 * - country of origin
 * - description
 *
 * @param {any} presentation The current presentation instance
 * @param {string} verticals The company's verticals
 * @param {string} country  The company's country or origin
 * @param {string} description A description of the company's goals/solution
 * @param {string} backgroundImage An URL of the company's hero image
 * @param {string} logoURL An URL of the company's logo
 */
export function addOverviewSlide(presentation, verticals, country, description, backgroundImage = defaultBackgroundImage, logoURL = defaultLogo) {
    let slide = presentation.addSlide();
    slide.background = {
        path: backgroundImage,
        x: 0,
        y: 0,
        w: "100%",
        h: "100%",
    };
    slide
        .addImage({
        //Company Logo
        path: logoURL,
        x: "87%",
        y: "87%",
        w: "10%",
        h: "10%",
        sizing: {
            type: "contain",
        },
    })
        .addText(verticals, {
        //Title of the Slide
        fontSize: 36,
        x: "5%",
        y: "8%",
        w: "80%",
        h: "8%",
        align: "left",
    })
        .addText(country, {
        //Country of founding
        fontSize: 20,
        x: "5%",
        y: "17%",
        w: "80%",
        h: "4%",
        align: "left",
    })
        .addText(description, {
        //Country of founding
        fontSize: 20,
        x: "5%",
        y: "23%",
        w: "80%",
        h: "60%",
        align: "left",
    });
}
/**
 * Creates a final 'The Ask' slide
 *
 * @param {any} presentation The Pptxgenjs presentation instance
 * @param {string} founder The company's founder
 * @param {string} website The company's website URL
 * @param {string} backgroundImage An image URL of the background
 * @param {string} logoURL The URL image of the logo
 */
export function theAskSlide(presentation, founder, website, backgroundImage = defaultBackgroundImage, logoURL = defaultLogo) {
    let slide = presentation.addSlide();
    slide.background = {
        path: backgroundImage,
        x: 0,
        y: 0,
        w: "100%",
        h: "100%",
    };
    slide
        .addImage({
        //Company Logo
        path: logoURL,
        x: "87%",
        y: "87%",
        w: "10%",
        h: "10%",
        sizing: {
            type: "contain",
        },
    })
        .addText("The Ask", {
        //Title of the Slide
        fontSize: 36,
        x: "5%",
        y: "8%",
        w: "80%",
        h: "8%",
        align: "left",
    })
        .addText(website, {
        //Country of founding
        fontSize: 20,
        x: "5%",
        y: "17%",
        w: "80%",
        h: "4%",
        align: "left",
    })
        .addText(`${founder} is looking for...`, {
        //Country of founding
        fontSize: 20,
        x: "5%",
        y: "23%",
        w: "80%",
        h: "60%",
        align: "left",
    });
}
