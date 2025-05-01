# Version History

## Description
- Application displaying different software version history on a timeline


## How to add new software
- provide a json file with version history data in `data` directory (see other files for the format)
- provide the software logo in `public/softwareLogos` directory (size: 256x256 - 512x512, extenstion: .png or .webp) 
- add the new software as enum member to the `Software` enum in `src/misc/types.ts` file
- configure the new software in `config/supportedSoftwares.ts` file
- configure timeline colors on `twTimelineStyle` in `src/app/version-map/Components/GridFrame.tsx` Component

## Design Choices
- I chose to implement server actions instead of route handlers. While this approach has the limitation that server actions execute sequentially rather than in parallel, it was selected for the following reasons:
  - Since this application lacks an authentication mechanism, this kind of avoids directly exposing version history data on the internet.
  - The data is cached on the frontend while the user remains on the page. As a result, once the version history data for a specific software is loaded, there is no need to refetch it.