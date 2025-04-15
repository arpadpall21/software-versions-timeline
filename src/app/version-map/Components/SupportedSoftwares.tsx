import { getTranslations } from 'next-intl/server';
import appConfig from '../../../../config/appConfig';

const SupportedSoftwares: React.FC = async () => {
  const t = await getTranslations('components.supportedSoftwares');

  return (
    <div>
      <p>{t('supportedSoftwares')} :</p>
      {Object.keys(appConfig.supportedSoftwares).map((software) => (
        <p>TEST</p>
      ))}
    </div>
  )
};

export default SupportedSoftwares;
