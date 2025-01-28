interface Props {
  timelineZoomLevel: number;
  position: { x: number; y: number };
  children: React.ReactNode;
}

const SideSlider: React.FC<Props> = ({ timelineZoomLevel, position, children }) => {
  return <div style={{ transform: `translateY(${position.y}px) scaleY(${timelineZoomLevel})` }}>{children}</div>;
};

export default SideSlider;
