interface Props {
  scrollZoomEnabled: boolean;
  setScrollZoomEnabled: (scrollZoomEnabled: boolean) => void;
}

const ScrollZoomButton: React.FC<Props> = ({ scrollZoomEnabled, setScrollZoomEnabled }) => {
  return (
    <button
      className={`absolute z-10 left-[50%] shadow-md px-2 font-semibold w-[180px]
        text-btnFg dark:text-btnFgD
        border-b-2 border-x-2 border-borPri dark:border-borPriD rounded-b-md
        ${scrollZoomEnabled ? 'text-btnFgPop dark:text-btnFgPopD' : 'text-btnFg dark:text-btnFgD'}
        ${scrollZoomEnabled ? 'bg-btnBgPop dark:bg-btnBgPopD' : 'bg-btnBg dark:bg-btnBgD'}
        ${
          scrollZoomEnabled
            ? 'hover:bg-btnBgHovPop dark:hover:bg-btnBgHovPopD'
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
