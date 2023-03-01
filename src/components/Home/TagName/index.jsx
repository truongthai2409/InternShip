import './styles.scss';

const TagName = (props) => {
  return (
    props.title && (
      <div className='tagName__container'>
        <p>{props.title}</p>
      </div>
    )
  );
};

export default TagName;
