interface Props {
  zoomLevel: number;
  position: { x: number; y: number };
  children: React.ReactNode;
}

const SideSlider: React.FC<Props> = ({ zoomLevel, position, children }) => {
  return (
    <div className={'float-right'} style={{ transform: `translateY(${position.y}px)` }}>
      <div className={'smoothTransform'} style={{ transform: `scaleY(${zoomLevel})` }}>
        {children}
      </div>
    </div>
  )
};

export default SideSlider;
