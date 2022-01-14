export interface SliderSlide {
  [key: string]: any;

  src: string;
  title: string;
  description?: string;
  route?: string;
}

export interface SliderOptions {
  [key: string]: any;

  slides: SliderSlide[];
  active: number;
  hide: number | null;
  interval: number;
  indicators: boolean;
  scrollAnchor?: string;
}