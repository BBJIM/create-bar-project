import React, { ImgHTMLAttributes } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import styled from 'styled-components';

type Props = ImgHTMLAttributes<any> &
	LazyLoadImageProps & {
		nextGen?: boolean;
		lazy?: boolean;
		format?: 'png' | 'jpeg';
	};

const Picture = styled.picture`
	display: flex;
`;

const Img = ({
	children,
	src,
	alt,
	height,
	width,
	nextGen = false,
	lazy = true,
	threshold = 300,
	effect = 'opacity',
	onClick,
	placeholder,
	format = 'png',
	...rest
}: Props): JSX.Element => {
	const path = `${process.env.PUBLIC_URL}/${src}`;

	const NextGenImage = ({ img }: { img: any }): JSX.Element => (
		<Picture>
			<source type='image/webp' srcSet={`${path}.webp`} />
			<source type='image/jp2' srcSet={`${path}.jp2`} />
			<source type='image/jxr' srcSet={`${path}.jxr`} />
			{img}
		</Picture>
	);

	const LazyLoadedImage = (): JSX.Element => (
		<LazyLoadImage
			src={`${path}.${format}`}
			alt={alt}
			height={height}
			width={width}
			threshold={threshold}
			effect={effect}
			placeholder={placeholder}
			{...rest}
		/>
	);

	const Image = (): JSX.Element => (
		<img src={`${path}.${format}`} alt={alt} onClick={onClick} {...rest}>
			{children}
		</img>
	);

	return lazy ? (
		nextGen ? (
			<NextGenImage img={<LazyLoadedImage />} />
		) : (
			<LazyLoadedImage />
		)
	) : nextGen ? (
		<NextGenImage img={<Image />} />
	) : (
		<Image />
	);
};

export default Img;
