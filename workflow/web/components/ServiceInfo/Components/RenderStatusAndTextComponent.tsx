import React from 'react';

const RenderStatusAndTextComponent = ({ value, title, isMargin, status } : any) => {
  const textMarginTop = isMargin ? '10px' : '0px';
  return (
    <div  >
      <p style={{ color: '#B0B0B0' }}>{title}</p>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: "10px" }}>
        {status ?
          <div style={{ backgroundColor: '#219653', height: '31px', padding: '6px 10px', borderRadius: '5px', display: 'flex', justifyContent: 'start', alignItems: 'start', gap: '10px' }}>
          <div className="text-white text-base font-normal font-['Inter']">Live</div>
         </div>:
           <div style={{ backgroundColor: '#A40000', height: '31px', padding: '4px 10px', borderRadius: '5px', display: 'flex', justifyContent: 'start', alignItems: 'start', gap: '10px' }}>
          <div className="text-white text-base font-normal font-['Inter']">Terminated</div>
        </div>}
       </div>
    </div>
  );
};

export default RenderStatusAndTextComponent;