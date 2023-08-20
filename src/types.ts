
export interface IStage {
	id: string;
	name?: string;
	label?: string;
	title: string;
	index: number;
}

export enum CarouselSizes {
	small = 'Small',
	medium = 'Medium',
	large = 'Large',
	narrow = 'Narrow',
	hidden = 'Hidden',
}

export type CarouselSize = keyof typeof CarouselSizes;
