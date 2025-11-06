import React from 'react';

const RenderTextComponent = ({ value, title, isMargin } : any) => {
  return (
    <>
      <div className="text-black text-base font-medium">{title}</div>
      <div className="text-black text-base font-normal">{value || 'N/A'}</div>
    </>
  );
};

export default RenderTextComponent;
