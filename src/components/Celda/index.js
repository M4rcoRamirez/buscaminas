import React from "react";

const Cell = props => {
  let renderCell = () => {
    if(props.data.isOpen) {
      if (props.data.hasMine ) {

        return (
          <div className="cell open" onClick={() => props.open(props.data)} onContextMenu={e => {
            e.preventDefault();
          }}>
            mina
          </div>
        );
      }  else if(props.data.count === 0) {

        return (
          <div className="cell open" onClick={() => props.open(props.data)} onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}/>
        );
      } else {

        return ( 
          <div className="cell open" onClick={() => props.open(props.data)} onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}>
            {props.data.count}
          </div>
        );
      }
    } else if(props.data.hasFlag) {
      return (
        <div 
          className="cell open" 
          onClick={() => props.open(props.data)} 
          onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}
        >
          band
        </div>
      );
    } else {

     return (
      <div 
        className="cell" 
        onClick={() => props.open(props.data)} 
        onContextMenu={e => {
          e.preventDefault();
          props.flag(props.data);
        }} 
      />
     );
    }
  };
  return renderCell();
};

export default Cell;