import React, { MutableRefObject, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { IStage } from "../types";
import { getCarouselStyles } from "../utils/carousel-utils";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/es/carousel";

const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  textAlign: 'center',
};

interface CarouselProps {
	carouselItems: IStage[];
}

function CarouselComponent({
	carouselItems,
}: CarouselProps) {
  const { size, color } = useSelector((state: RootState) => state.carousel);
	const carouselRef: MutableRefObject<CarouselRef | null> = useRef(null);
	const slides: IStage[] = useMemo(() => {
		if (!carouselItems || !carouselItems.length) {
			return [{
				id: 'empty',
				title: 'Create your first stage',
				index: 1,
			}];
		}

		return carouselItems;
	}, [carouselItems]);

	// @ts-ignore 
	const carouselStyles: React.CSSProperties = useMemo(() => {
		const styles = getCarouselStyles(size);

		return styles;
	}, [size]);

	const isArrowDisabled = slides.length < 2;

	const carouselProps = {
		dots: false,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	const handlePrev = () => {
		if (carouselRef && carouselRef.current) {
			carouselRef.current.prev();
		}
	}

	const handleNext = () => {
		if (carouselRef && carouselRef.current) {
			carouselRef.current.next();
		}
	}

	return (
		<div className='carousel-container' style={{...carouselStyles, backgroundColor: color}}>
			<LeftOutlined 
				disabled={isArrowDisabled}
				className={`arrow arrow-left ${isArrowDisabled ? 'hidden' : ''}`} 
				onClick={handlePrev} 
			/>

			<Carousel className='carousel' ref={carouselRef} {...carouselProps}>
				{slides.map(slide => (
					<div key={slide.id}>
						<div className='carousel-slide' style={{ height: carouselStyles.height }}>
							<h1 style={contentStyle}>{slide.title}</h1>
						</div>
					</div>	
				))}
			</Carousel>
			
			<RightOutlined 
				disabled={isArrowDisabled}
				className={`arrow arrow-right ${isArrowDisabled ? 'hidden' : ''}`} 
				onClick={handleNext}
			/>
		</div>
	);
}

export default CarouselComponent;
