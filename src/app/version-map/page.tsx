import '@/app/globals.css';
import GridFrame from '@/app/version-map/Components/GridFrame';
import SupportedSoftwares from '@/app/version-map/Components/SupportedSoftwares';

const VersionMapPage = () => {
  return (
    <>
      <GridFrame />
      <div className={'max-sm:hidden md:block my-7'}>
        <SupportedSoftwares />
      </div>
    </>
  );
};

export default VersionMapPage;
