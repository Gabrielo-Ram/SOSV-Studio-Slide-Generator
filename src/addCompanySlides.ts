/**
 * 'addCompanySlides.js
 *
 * This file contains re-usable logic that handles creating slides for
 * a company in the CSV file.
 */

import * as PptxGen from "pptxgenjs";
import { Startup } from "./types.js";

//Default images
const defaultLogo = "https://static.thenounproject.com/png/504708-200.png";
const defaultBackgroundImage =
  "https://img.freepik.com/free-vector/abstract-pattern-design_1053-534.jpg";

/**
 * Creates a 'cover' slide for a startup company
 *
 * @param {any} presentation The pptxgenjs instance of the presentation
 * @param {string} companyName The name of the company
 * @param {string} tagline The company's tag line
 * @param {string} logoURL An image URL of the company's logo
 * @param {string} heroImageURL An image URL of the company's hero image
 */
export function companyCoverSlide(
  presentation: any,
  companyName: string,
  tagline: string,
  logoURL?: string,
  heroImageURL?: string
) {
  let slide = presentation.addSlide();

  //Sets the background image
  slide.background = {
    path:
      heroImageURL === "" || !heroImageURL
        ? defaultBackgroundImage
        : heroImageURL,
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
  };

  slide
    .addImage({
      // Company logo
      path: logoURL === "" || !logoURL ? defaultLogo : logoURL,
      x: "12%",
      y: "20%",
      w: "30%",
      h: "25%",
      sizing: {
        type: "contain",
        w: "30%",
        h: "25%",
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
 * @param {string} logoURL An URL of the company's logo
 * @param {string} backgroundImage An URL of the company's hero image
 */
export function addOverviewSlide(
  presentation: any,
  verticals: string,
  country: string,
  description: string,
  logoURL?: string,
  backgroundImage?: string
) {
  let slide = presentation.addSlide();

  slide.background = {
    path:
      backgroundImage === "" || !backgroundImage
        ? defaultBackgroundImage
        : backgroundImage,
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
  };

  slide
    .addImage({
      //Company Logo
      path: logoURL === "" || !logoURL ? defaultLogo : logoURL,
      x: "87%",
      y: "85%",
      w: "10%",
      //h: "10%",
      sizing: {
        type: "contain",
      },
    })
    .addText(verticals, {
      //Title of the Slide
      fontSize: 36,
      x: "5%",
      y: "8%",
      w: "90%",
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
 * @param {string} logoURL The URL image of the logo
 * @param {string} backgroundImage An image URL of the background
 */
export function theAskSlide(
  presentation: any,
  founder: string,
  website: string,
  logoURL?: string,
  backgroundImage?: string
) {
  let slide = presentation.addSlide();

  slide.background = {
    path:
      backgroundImage === "" || !backgroundImage
        ? defaultBackgroundImage
        : backgroundImage,
    x: 0,
    y: 0,
    w: "100%",
    h: "100%",
  };

  slide
    .addImage({
      //Company Logo
      path: logoURL === "" || !logoURL ? defaultLogo : logoURL,
      x: "87%",
      y: "85%",
      w: "10%",
      //h: "10%",
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
    .addText(
      `${founder} is looking for... \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in purus non orci consequat rhoncus sed sed turpis. Pellentesque metus quam, placerat vitae ipsum non, eleifend convallis magna. Donec sapien urna, aliquam quis iaculis et, scelerisque eu ligula. Pellentesque ultricies maximus risus, a dapibus ligula. Mauris vehicula venenatis sapien, eu ultrices ipsum tristique`,
      {
        //Country of founding
        fontSize: 20,
        x: "5%",
        y: "23%",
        w: "80%",
        h: "60%",
        align: "left",
      }
    );
}
