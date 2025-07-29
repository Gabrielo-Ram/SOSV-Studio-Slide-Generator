# SOSV Studio Pitch Deck Tool (Prototype)

A CLI tool that generates a PowerPoint pitch deck from a CSV file of startup companies. Designed for VC analysts and studio teams who need to share curated batches of startups with investors in a polished, presentation-ready format.

## Why This Exists

Venture Capitalists frequently handpick startups from their portfolios to pitch to prospective investors. While tools exist to share these companies via web links or internal dashboards, there's currently no automated way to generate a clean, presentable **.pptx file** tailored for investor meetings. This tool fills that gap.

## ❓ What It Does

- Reads a CSV file of startup metadata (name, tagline, logo, hero image, etc.)
- Generates a PowerPoint slide for each selected company
- Saves the output as a `.pptx` presentation file
- Designed for use with handpicked company batches

## 📦 Tech Stack

- **TypeScript** (for type safety and maintainability)
- **Node.js** (CLI execution and file system access)
- **PptxGenJS** (presentation generation)

## ⚙️ Getting Started

### 1. Clone the Repo

```
git clone https://github.com/your-username/sosv-pitchdeck-tool.git
cd sosv-pitchdeck-tool
```

### 2. Set up Environment

```
npm install                         # Install dependencies
npm run build                       # Typescript build command
npm run start -- pathTo/file.csv    # Run program
```

Replace `pathTo/file.csv` with the actual file path to your CSV. The CSV file can live anywhere — just provide the correct path when running the command.

## 🖥️ Company Data Typescript Interface

This program is dependent on the following Typescript Type-Interface:

```
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
```

It is vital the CSV includes at least the columns specified in this interface. More fields can be added as the templates evolve.

## 💾 Output

The script generates a `.pptx` file (PowerPoint format) saved to the local project directory.

> Look for a `demo.pptx` file in the project root directory

## ◾️ Project Structure

```
/src
  ├── parseCSV.ts          # Parses the input CSV into Startup objects
  ├── createSlides.ts      # Contains slide logic (cover, content, etc.)
  ├── index.ts             # Main entry point, handles CLI args
  └── types/startup.ts     # Type definition for Startup

```

## ⚠️ Important Drawbacks/Weaknesses

I use the PptxGenJS npm package to create and style the presentation. This package supports uploading images to the presentation via a web-URL or by providing a direct path to a local file.

When uploading an image by providing an image url, **it is absolutely vital the URL be valid, public, and of a `.png` or a `.jpeg` file**. If these conditions are not met, PptxGenJS fails silently and outputs a corrupted .pptx file.

If this tool produces a corrupted `.pptx` file, double-check your image links/files.

## Author

Made with care by _Gabe Ramirez_.
