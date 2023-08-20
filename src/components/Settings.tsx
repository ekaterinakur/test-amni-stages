import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { changeCarouselSize } from '../store/carousel-reducer';
import { CarouselSize, CarouselSizes } from '../types';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ColorPicker from './ColorPicker';

function Settings() {
  const currentSize = useSelector((state: RootState) => state.carousel.size);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

	const getSizeButton = (size: CarouselSize) => 
		<Button
			className={`settings-btn ${currentSize === size ? 'active' : ''}`}
			onClick={() => onSizeSelected(size)}
		>{CarouselSizes[size]}</Button>

	const getSizeOptions = () => {
		const sizeOptions = Object.keys(CarouselSizes).map(size => ({
			key: size,
			label: getSizeButton(size as CarouselSize),
		}));

		return sizeOptions;
	}

	const items: MenuProps['items'] = [
		{
			key: 'size',
			type: 'group',
			label: 'Carousel Size',
			children: getSizeOptions(),
		},
		{
			key: 'color',
			label: 'Carousel Color',		
			type: 'group',
			children: [
				{
					key: 'colorPicker',
					label: <ColorPicker />
				},
			],
		},
	];

	const onSizeSelected = (size: CarouselSize) => {
		dispatch(changeCarouselSize(size));
	}

	const handleMenuClick: MenuProps['onClick'] = (e) => {
		// do not close for color picker
    if (e.key !== 'colorPicker') {
      setOpen(false);
    }
  };

	const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  return (
		<Dropdown
			open={open}
			menu={{ 
				items,
				onClick: handleMenuClick,
			}}
			trigger={['click']}
      onOpenChange={handleOpenChange}
		>
			<SettingOutlined color='primary' size={60} style={{ fontSize: '20px' }}/>
		</Dropdown>
  );
};

export default Settings;
