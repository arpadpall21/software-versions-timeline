interface Props {
  height: number;
}

const AddNewTimelineButton: React.FC<Props> = ({ height }) => {
  return (
    <div className={'bg-red-300'} style={{ height }} />
  )
}

export default AddNewTimelineButton;
