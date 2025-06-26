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
  return (
    <div className={`relative whitespace-nowrap overflow-hidden ${twStyle}`}>
      <div className={'absolute left-0 z-10'}>{scrollLeftButton}</div>
      <div className={'absolute right-0 z-10'}>{scrollRightButton}</div>
      <div className={'absolute right-0'} style={{ direction }}>
        {direction === 'rtl' ? [...members].reverse() : members}
      </div>
    </div>
  );
};

export default HorizontalScroll;
