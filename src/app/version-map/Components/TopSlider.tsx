interface Props {
  zoomLevel: number;
  position: { x: number; y: number };
  children: React.ReactNode;
}

const TopSlider: React.FC<Props> = ({ zoomLevel, position, children }) => {
  return (
    <div className={'float-right'} style={{ transform: `translateX(${position.x}px) scaleX(${zoomLevel})` }}>
      {children}
    </div>
  );
};

export default TopSlider;
