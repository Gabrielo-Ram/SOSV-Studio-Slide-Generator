//Defines an interface type of company data
export interface Startup {
  name: string;
  founder: string;
  tagline: string;
  stage: string;
  description: string;
  foundingYear: string;
  country: string;
  verticals: string;
  website: string;
  heroImageURL?: string;
  logoURL?: string;
  backgroundImageURL?: string;
}
