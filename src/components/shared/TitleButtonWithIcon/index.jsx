import React from 'react';

const TitleButton = (props) => {
  const { icon, name } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {icon} {name}
    </div>
  );
};

export default TitleButton;
