import { type SupportedSoftwares, Software } from '../src/misc/types';

const supportedSoftwares: SupportedSoftwares = {
  [Software.CHROME]: {
    displayName: 'Google Chrome',
    logoPath: '/softwareLogos/chrome.png',
    dataPath: 'data/chrome.json',
    sources: ['https://developer.chrome.com/release-notes'],
  },
  [Software.FIREFOX]: {
    displayName: 'Mozilla Firefox',
    logoPath: '/softwareLogos/firefox.webp',
    dataPath: 'data/firefox.json',
    sources: ['https://www.mozilla.org/en-US/firefox/releases/'],
  },
  [Software.OPERA]: {
    displayName: 'Opera',
    logoPath: '/softwareLogos/opera.png',
    dataPath: 'data/chrome.json',       // TODO
  },
  [Software.EDGE]: {
    displayName: 'Microsoft Edge',
    logoPath: '/softwareLogos/edge.webp',
    dataPath: 'data/chrome.json',       // TODO
  },
  [Software.SAFARI]: {
    displayName: 'Safari',
    logoPath: '/softwareLogos/safari.png',
    dataPath: 'data/chrome.json',       // TODO
  },
  [Software.NODE]: {
    displayName: 'Node.js',
    logoPath: '/softwareLogos/nodeJs.png',
    dataPath: 'data/chrome.json',       // TODO
  },
  [Software.REACT]: {
    displayName: 'React.js',
    logoPath: '/softwareLogos/react.webp',
    dataPath: 'data/chrome.json',       // TODO
  },
  [Software.PYTHON]: {
    displayName: 'Python',
    logoPath: '/softwareLogos/python.webp',
    dataPath: 'data/chrome.json',       // TODO
  },
};

export default supportedSoftwares;
