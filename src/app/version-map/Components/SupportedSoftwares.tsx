import { getTranslations } from 'next-intl/server';
import appConfig from '../../../../config/appConfig';
import Image from 'next/image';
import { Software } from '../../../../config/supportedSoftwares';

const SupportedSoftwares: React.FC = async () => {
  const t = await getTranslations('components.supportedSoftwares');

  return (
    <div className={'flex flex-wrap items-center text-fgSec dark:text-fgSecD'}>
      {t('supportedSoftwares')} :
      {Object.keys(appConfig.supportedSoftwares).map((software, i) => (
        <Image
          className={'ml-1'}
          src={appConfig.supportedSoftwares[software as Software].logoPath}
          width={60}
          height={60}
          alt={appConfig.supportedSoftwares[software as Software].displayName}
          title={appConfig.supportedSoftwares[software as Software].displayName}
          key={i}
        />
      ))}
    </div>
  );
};

export default SupportedSoftwares;
