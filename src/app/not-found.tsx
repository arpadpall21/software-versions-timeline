import { permanentRedirect } from 'next/navigation';

const NotFound = () => {
  permanentRedirect('/version-map');
};

export default NotFound;
