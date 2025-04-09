interface Props {
  zoomLevel: number;
  position: { x: number; y: number };
  children: React.ReactNode;
}

const TopSlider: React.FC<Props> = ({ zoomLevel, position, children }) => {
  return (
    <div className={'float-right'} style={{ transform: `translateX(${position.x}px)` }}>
      <div className={'zoomTransform'} style={{ transform: `scaleX(${zoomLevel})` }}>
        {children}
      </div>
    </div>
  );
};

export default TopSlider;
