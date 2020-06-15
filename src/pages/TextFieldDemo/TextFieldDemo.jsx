import React from 'react';
import { TextField, Slider } from '../../components';
import { MyStyle } from './style';
import { BANNERS, DEFAULT_BANNER_IMAGE, DURATION } from '../../configs/constants';

const TextFieldDemo = () => (
  <MyStyle>
    <Slider banners={BANNERS} defaultBanner={DEFAULT_BANNER_IMAGE} duration={DURATION} />
    <p>
      <b> This is a Disabled Input </b>
    </p>
    <TextField disabled="disabled" value="Disabled Input" />
    <br />
    <br />
    <p>
      <b> A Valid Input </b>
    </p>
    <TextField value="Accessible" />
    <br />
    <br />
    <p>
      <b>An Input with error</b>
    </p>
    <TextField value="101" error="Could not be greater than" />
  </MyStyle>
);
export default TextFieldDemo;
