interface Props {
  scrollZoomEnabled: boolean;
  setScrollZoomEnabled: (scrollZoomEnabled: boolean) => void;
}

const ScrollZoomButton: React.FC<Props> = ({ scrollZoomEnabled, setScrollZoomEnabled }) => {
  return (
    <button
      className={`absolute z-10 left-[50%] text-fgPop dark:text-fgPopD shadow-md px-2 font-semibold w-[180px]
        border-b-2 border-x-2 border-borPri dark:border-borPriD rounded-b-md
        ${scrollZoomEnabled ? 'bg-bgWarn dark:bg-bgWarnD' : 'bg-bgPri dark:bg-bgPriD'}
        hover:bg-bgWarnHover hover:dark:bg-bgWarnHoverD`}
      style={{ transform: 'translateX(-50%)' }}
      onClick={() => setScrollZoomEnabled(!scrollZoomEnabled)}
    >
      Scroll Zoom {scrollZoomEnabled ? 'Enabled' : 'Disabled'}
    </button>
  );
};

export default ScrollZoomButton;
