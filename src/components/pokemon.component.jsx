import React from 'react';

export default ({ id, name, sprite }) => {
    return (
        <>
          <p>
            id: {id}
            nome:{name}
            <img src={sprite}></img>
          </p>
        </>
      )
}