import React from 'react';
import Select from 'react-select';

// Fixed sidebar with selector and DALI lab logo. Logo taken from http://dali.dartmouth.edu/.
export const Fixed = (props) =>
  <div className="fixed-pos">
    <div className="title">
      <a width="10%" href="http://dali.dartmouth.edu/">
        <img alt="DALI Lab" style={{width: '200px'}} src="https://bit.ly/2HE3bfy"/>
      </a>
      <a className="code" href="https://github.com/k-rathi/DaliChallenge2">code on github</a>
    </div>
    <div className="selector">
      <Select
        autofocus
        name="select"
        defaultValue='17'
        value={props.value}
        onChange={props.onChange}
        options={[
          {value: '17W', label: '17W'},
          {value: '17S', label: '17S'},
          {value: '17', label: 'All' }
        ]}
      />
    </div>
  </div>;
