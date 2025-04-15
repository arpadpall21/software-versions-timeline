import '@/app/globals.css';
import GridFrame from '@/app/version-map/Components/GridFrame';
import SupportedSoftwares from '@/app/version-map/Components/SupportedSoftwares';

const VersionMapPage = () => {
  return (
    <>
      <GridFrame />
      <SupportedSoftwares />
    </>
  );
};

export default VersionMapPage;
