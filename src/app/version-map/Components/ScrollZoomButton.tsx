interface Props {
  scrollZoomEnabled: boolean;
  setScrollZoomEnabled: (scrollZoomEnabled: boolean) => void;
}

const ScrollZoomButton: React.FC<Props> = ({ scrollZoomEnabled, setScrollZoomEnabled }) => {
  return (
    <button
      className={`absolute z-10 left-[50%] shadow-md px-2 font-semibold w-[180px] h-[28px]
        text-btnFg dark:text-btnFgD
        border-b-2 border-x-2 border-borPri dark:border-borPriD rounded-b-md
        ${scrollZoomEnabled ? 'text-btnFgWarn dark:text-btnFgWarnD' : 'text-btnFg dark:text-btnFgD'}
        ${scrollZoomEnabled ? 'bg-btnBgWarn dark:bg-btnBgWarnD' : 'bg-btnBg dark:bg-btnBgD'}
        ${
          scrollZoomEnabled
            ? 'hover:bg-btnBgHovWarn hover:dark:bg-btnBgHovWarnD'
            : 'hover:bg-btnBgHov dark:hover:bg-btnBgHovD'
        }`}
      style={{ transform: 'translateX(-50%)' }}
      onClick={() => setScrollZoomEnabled(!scrollZoomEnabled)}
    >
      Scroll Zoom {scrollZoomEnabled ? 'Enabled' : 'Disabled'}
    </button>
  );
};

export default ScrollZoomButton;
