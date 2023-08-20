import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { changeCarouselColor } from '../store/carousel-reducer';
import { Button, ColorPicker as Picker } from 'antd';

const ColorPicker = () => {
  const color = useSelector((state: RootState) => state.carousel.color);
  const dispatch = useDispatch();

	const onColorPicked = (color: any) => {
		dispatch(changeCarouselColor(color.toHexString()));
	}

  return (
    <Picker value={color} showText={true} onChangeComplete={onColorPicked}>
      <Button
        className='settings-btn color-picker-btn' 
        style={{ backgroundColor: color, color: '#FFFFFF' }}
      >
        Pick Color
      </Button>
    </Picker>
  );
};

export default ColorPicker;