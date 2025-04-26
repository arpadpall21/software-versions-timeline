# Version History

## Description
- Application displaying different software version history on a timeline


## How to add new software
- provide a json file with version history data in `data` directory (see other files for the format)
- provide the software logo in `public/softwareLogos` directory (size: 256x256 - 512x512, extenstion: .png or .webp) 
- add the new software as enum member to the `Software` enum in `src/misc/types.ts` file
- configure the new software on `supportedSoftwares` in `config/appConfig.ts` file
- configure timeline colors on `twTimelineStyle` in `src/app/version-map/Components/GridFrame.tsx` Component
