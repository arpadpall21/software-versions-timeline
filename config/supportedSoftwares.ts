import { type SupportedSoftwares, Software } from '../src/misc/types';

const supportedSoftwares: SupportedSoftwares = {
  [Software.CHROME]: {
    displayName: 'Google Chrome',
    logoPath: '/softwareLogos/chrome.png',
    dataPath: 'data/chrome.json',
    source: 'https://developer.chrome.com/release-notes',
  },
  [Software.FIREFOX]: {
    displayName: 'Mozilla Firefox',
    logoPath: '/softwareLogos/firefox.webp',
    dataPath: 'data/firefox.json',
    source: 'https://www.mozilla.org/en-US/firefox/releases/',
  },
  [Software.OPERA]: {
    displayName: 'Opera',
    logoPath: '/softwareLogos/opera.png',
    dataPath: 'data/opera.json',
    source: 'https://en.wikipedia.org/wiki/History_of_the_Opera_web_browser',
  },
  [Software.EDGE]: {
    displayName: 'Microsoft Edge',
    logoPath: '/softwareLogos/edge.webp',
    dataPath: 'data/edge.json',
    source: 'https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel',
  },
  [Software.SAFARI]: {
    displayName: 'Safari',
    logoPath: '/softwareLogos/safari.png',
    dataPath: 'data/safari.json',
    source: 'https://developer.apple.com/documentation/safari-release-notes',
  },
  [Software.NODE]: {
    displayName: 'Node.js',
    logoPath: '/softwareLogos/nodeJs.png',
    dataPath: 'data/nodeJs.json',
    source: 'https://nodejs.org/en/about/previous-releases',
  },
  [Software.REACT]: {
    displayName: 'React.js',
    logoPath: '/softwareLogos/react.webp',
    dataPath: 'data/react.json',
    source: 'https://react.dev/versions',
  },
  [Software.PYTHON]: {
    displayName: 'Python',
    logoPath: '/softwareLogos/python.webp',
    dataPath: 'data/python.json',
    source: 'https://www.python.org/downloads/source/',
  },
};

export default supportedSoftwares;
