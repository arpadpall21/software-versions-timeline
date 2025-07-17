import { getTranslations } from 'next-intl/server';
import appConfig from '../../../../config/appConfig';
import Image from 'next/image';
import { Software } from '../../../../config/supportedSoftwares';

const SupportedSoftwares: React.FC = async () => {
  const t = await getTranslations('components.supportedSoftwares');

  return (
    <div className={'flex flex-wrap items-center text-fgSec dark:text-fgSecD'}>
      <span className={'mr-1 max-md:hidden'}>{t('supportedSoftwares')}:</span>
      {Object.keys(appConfig.supportedSoftwares).map((software, i) => (
        <a href={appConfig.supportedSoftwares[software as Software].source} target={'_blank'} key={i}>
          <Image
            className={'mr-1'}
            src={appConfig.supportedSoftwares[software as Software].logoPath}
            width={60}
            height={60}
            alt={appConfig.supportedSoftwares[software as Software].displayName}
            title={appConfig.supportedSoftwares[software as Software].displayName}
          />
        </a>
      ))}
    </div>
  );
};

export default SupportedSoftwares;
