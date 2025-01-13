import { redirect } from 'next/navigation';

const NotFound = () => {
  redirect('/version-map')
}

export default NotFound;
