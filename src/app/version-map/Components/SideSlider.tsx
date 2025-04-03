interface Props {
  zoomLevel: number;
  position: { x: number; y: number };
  children: React.ReactNode;
}

const SideSlider: React.FC<Props> = ({ zoomLevel, position, children }) => {
  return <div style={{ transform: `translateY(${position.y}px) scaleY(${zoomLevel})` }}>{children}</div>;
};

export default SideSlider;
