import '@/app/globals.css';
import GridContainer from '@/app/version-map/Components/GridContainer';
import SupportedSoftwares from '@/app/version-map/Components/SupportedSoftwares';

const VersionMapPage = () => {
  return (
    <>
      <GridContainer />
      <div className={'max-sm:hidden md:block my-7'}>
        <SupportedSoftwares />
      </div>
    </>
  );
};

export default VersionMapPage;
