import { getTranslations } from 'next-intl/server';
import appConfig from '../../../../config/appConfig';
import Image from 'next/image';
import { Software } from '@/misc/types';

const SupportedSoftwares: React.FC = async () => {
  const t = await getTranslations('components.supportedSoftwares');

  return (
    <div>
      <div className={'flex flex-wrap items-center'}>
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
    </div>
  );
};

export default SupportedSoftwares;
