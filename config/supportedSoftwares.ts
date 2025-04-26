import { type SupportedSoftwares, Software } from '../src/misc/types';

const supportedSoftwares: SupportedSoftwares = {
  [Software.CHROME]: {
    displayName: 'Google Chrome',
    logoPath: '/softwareLogos/chrome.png',
    dataPath: 'data/chrome.json',
  },
  [Software.FIREFOX]: {
    displayName: 'Mozilla Firefox',
    logoPath: '/softwareLogos/firefox.webp',
    dataPath: 'data/firefox.json',
  },
  [Software.OPERA]: {
    displayName: 'Opera',
    logoPath: '/softwareLogos/opera.png',
    dataPath: 'data/opera.json',
  },
  [Software.EDGE]: {
    displayName: 'Microsoft Edge',
    logoPath: '/softwareLogos/edge.webp',
    dataPath: 'data/edge.json',
  },
  [Software.SAFARI]: {
    displayName: 'Safari',
    logoPath: '/softwareLogos/safari.png',
    dataPath: 'data/safari__dummy.json',
  },
  [Software.NODE]: {
    displayName: 'Node.js',
    logoPath: '/softwareLogos/nodeJs.png',
    dataPath: 'data/nodeJs.json',
  },
  [Software.REACT]: {
    displayName: 'React.js',
    logoPath: '/softwareLogos/react.webp',
    dataPath: 'data/react__dummy.json',
  },
  [Software.PYTHON]: {
    displayName: 'Python',
    logoPath: '/softwareLogos/python.webp',
    dataPath: 'data/python__dummy.json',
  },
};

export default supportedSoftwares;
