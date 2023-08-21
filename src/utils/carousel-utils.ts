import React from "react";
import type { CarouselSize } from "../types";

export function getCarouselStyles(size: CarouselSize): React.CSSProperties {
	switch(size) {
		case 'small':
			return { maxWidth: '600px', width: '100%', height: '85px' };
		case 'medium':
			return { width: '80%', height: '100px' };
		case 'large':
			return { width: '100%', height: '160px' };
		case 'narrow':
			return { width: '100%', height: '85px' };
		case 'hidden':
			return { visibility: 'hidden', height: '0' };
		default:
			return { width: '100%', height: '160px' };
	}
}
