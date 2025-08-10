import { type SupportedSoftwares, type DisplayedSoftwares } from '../src/misc/types';

export enum Software {
  CHROME = 'CHROME',
  MOZILLA = 'MOZILLA',
  OPERA = 'OPERA',
  EDGE = 'EDGE',
  SAFARI = 'SAFARI',
  INTERNET_EXPLORER = 'INTERNET_EXPLORER',
  REACT = 'REACT',
  NODE = 'NODE',
  PYTHON = 'PYTHON',
  FASTAPI = 'FASTAPI',
  MYSQL = 'MYSQL',
  POSTGRESQL = 'POSTGRESQL',
  MONGODB = 'MONGODB',
  REDIS = 'REDIS',
  NGINX = 'NGINX',
}

export const defaultDisplayedSoftwares: DisplayedSoftwares = [
  Software.CHROME,
  Software.MOZILLA,
  Software.OPERA,
  Software.EDGE,
  Software.SAFARI,
];

const supportedSoftwares: SupportedSoftwares = {
  [Software.CHROME]: {
    displayName: 'Google Chrome',
    logoPath: '/softwareLogos/chrome.png',
    dataFile: 'chrome.ts',
    source: 'https://developer.chrome.com/release-notes',
  },
  [Software.MOZILLA]: {
    displayName: 'Mozilla Firefox',
    logoPath: '/softwareLogos/mozilla.webp',
    dataFile: 'mozilla.ts',
    source: 'https://www.mozilla.org/en-US/firefox/releases/',
  },
  [Software.OPERA]: {
    displayName: 'Opera',
    logoPath: '/softwareLogos/opera.png',
    dataFile: 'opera.ts',
    source: 'https://en.wikipedia.org/wiki/History_of_the_Opera_web_browser',
  },
  [Software.EDGE]: {
    displayName: 'Microsoft Edge',
    logoPath: '/softwareLogos/edge.webp',
    dataFile: 'edge.ts',
    source: 'https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel',
  },
  [Software.SAFARI]: {
    displayName: 'Safari',
    logoPath: '/softwareLogos/safari.png',
    dataFile: 'safari.ts',
    source: 'https://developer.apple.com/documentation/safari-release-notes',
  },
  [Software.INTERNET_EXPLORER]: {
    displayName: 'Internet Explorer',
    logoPath: '/softwareLogos/internetExplorer.png',
    dataFile: 'internetExplorer.ts',
    source: 'https://en.wikipedia.org/wiki/Internet_Explorer_version_history#Microsoft_Internet_Explorer_1.x',
  },
  [Software.REACT]: {
    displayName: 'React.js',
    logoPath: '/softwareLogos/react.webp',
    dataFile: 'react.ts',
    source: 'https://react.dev/versions',
  },
  [Software.NODE]: {
    displayName: 'Node.js',
    logoPath: '/softwareLogos/nodeJs.png',
    dataFile: 'nodeJs.ts',
    source: 'https://nodejs.org/en/about/previous-releases',
  },
  [Software.PYTHON]: {
    displayName: 'Python',
    logoPath: '/softwareLogos/python.webp',
    dataFile: 'python.ts',
    source: 'https://www.python.org/downloads/source/',
  },
  [Software.FASTAPI]: {
    displayName: 'FastAPI',
    logoPath: '/softwareLogos/FastApi.png',
    dataFile: 'fastApi.ts',
    source: 'https://fastapi.tiangolo.com/release-notes/',
  },
  [Software.MYSQL]: {
    displayName: 'MySQL',
    logoPath: '/softwareLogos/mysql.webp',
    dataFile: 'mySql.ts',
    source: 'https://dev.mysql.com/doc/relnotes/mysql/8.0/en/',
  },
  [Software.POSTGRESQL]: {
    displayName: 'PostgreSQL',
    logoPath: '/softwareLogos/postgreSql.png',
    dataFile: 'postgreSql.ts',
    source: 'https://www.postgresql.org/docs/release/',
  },
  [Software.MONGODB]: {
    displayName: 'MongoDB',
    logoPath: '/softwareLogos/mongoDb.png',
    dataFile: 'mongoDb.ts',
    source: 'https://www.mongodb.com/docs/manual/release-notes/',
  },
  [Software.REDIS]: {
    displayName: 'Redis',
    logoPath: '/softwareLogos/redis.png',
    dataFile: 'redis.ts',
    source: 'https://redis.io/docs/latest/operate/rs/release-notes/',
  },
  [Software.NGINX]: {
    displayName: 'NGINX',
    logoPath: '/softwareLogos/nginx.png',
    dataFile: 'nginx.ts',
    source: 'https://nginx.org/en/CHANGES',
  },
};

export default supportedSoftwares;
