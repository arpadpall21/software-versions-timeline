import appConfig from '../../../../config/appConfig';

const SupportedSoftwares: React.FC = () => {
  return (
    <div>
      {Object.keys(appConfig.supportedSoftwares).map((software) => (
        <p>TEST</p>
      ))}
    </div>
  )
};

export default SupportedSoftwares;
