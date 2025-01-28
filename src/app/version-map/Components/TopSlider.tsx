interface Props {
  timelineZoomLevel: number;
  position: { x: number; y: number };
  children: React.ReactNode;
}

const TopSlider: React.FC<Props> = ({ timelineZoomLevel, position, children }) => {
  return (
    <div className={'float-right'} style={{ transform: `translateX(${position.x}px) scaleX(${timelineZoomLevel})` }}>
      {children}
    </div>
  );
};

export default TopSlider;
