# Software Versions Timeline

## Description
- UI tool offering a broad overview of essential software release versions, making it easy for users to compare different versions in time

## Requirements
 - Node.js v22.3.0+

## Setup
  - Run `npm install`

## Usage
#### Run Dev Server
  - Run `npm run dev` (app available on `http://localhost:3000`)
#### Build & Run Prod Server
  - Run `npm run build` to build the app for production
  - Run `npm start` to start the production server

## Configurations
  - App can be configured through the `config/appConfig.ts` file
  - Software version data sources are located in `data/<software>.json` file(s)
#### How to Add a New Software
- provide a data file with version history in `data` directory (see other files for the format)
- provide the software logo in `public/softwareLogos` directory (size: 256x256 - 512x512, extenstion: .png or .webp)
- add the new software as enum member and configure it in `config/supportedSoftwares.ts` file
- configure timeline colors on `twTimelineStyle` in `src/app/version-map/Components/GridFrame.tsx` Component
- update sitemap.xml file's `<lastmod>YYYY-MM-DD</lastmod>` field
