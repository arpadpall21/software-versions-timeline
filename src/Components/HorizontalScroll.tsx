'use client';

interface Props {
  twStyle?: string;
  members: React.ReactNode[];
  scrollLeftButton: React.ReactNode;
  scrollRightButton: React.ReactNode;
  direction?: 'ltr' | 'rtl';
}

const HorizontalScroll: React.FC<Props> = ({
  twStyle,
  members,
  scrollLeftButton,
  scrollRightButton,
  direction = 'ltr',
}) => {
  const sliderParentStart = direction === 'ltr' ? 'left-0' : 'right-0';

  return (
    <div className={`relative whitespace-nowrap overflow-hidden ${twStyle}`}>
      <div className={'absolute left-0 z-10'}>{scrollLeftButton}</div>
      <div className={'absolute right-0 z-10'}>{scrollRightButton}</div>
      <div className={`absolute ${sliderParentStart}`} style={{ direction }}>
        <div className={'border-2'}>{direction === 'rtl' ? [...members].reverse() : members}</div>
      </div>
    </div>
  );
};

export default HorizontalScroll;


//  const parent = child.parentElement;
//     const minX = 0; // Minimum X position (left edge of parent)
//     const maxX = parent.clientWidth - child.clientWidth; 