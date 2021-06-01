import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import {min} from 'd3-array';

const { prefix } = settings;

const inverseMatrix = (scale, translateX, translateY) => {
	const denominator = scale * scale;

	return {
	scale: scale / denominator,
	translateX: (scale * translateX) / -denominator,
	translateY: (scale * translateY) / -denominator
	};
}

export default ({ children, contentDimensions, height = 180, width = 172, containerDimensions, transform = {} }) => {
	const namespace = `${prefix}--cc--mini-map`;

	const {k,x,y} = transform;

	const inverse = inverseMatrix(k, x, y);
	const { translateX, translateY, scale } = inverse;

	const scaleFactor = min([height / contentDimensions.height, width / contentDimensions.width]);

	const scalePercentage = Math.round(k * 100);

	// Todo: investigate whether we can add in a ref to calculate the content dimensions for us

	return (
		<div
			className={namespace}
			style={{
				height,
				width,
				border: "1px solid red",
				boxSizing: "border-box",
				overflow: "hidden",
				position: "relative"
			}}
		>
			<div style={{
				backgroundColor: "yellow",
				pointerEvents: "none",
				userSelect: "none",
				height: contentDimensions.height,
				width: contentDimensions.width,
				transform: `scale(${scaleFactor})`,
				transformOrigin: '0 0' }}
			>
				{children}

				<div className={`mini-map__screen`}
					style={{
						position: 'absolute',
						backgroundColor: 'blue',
						opacity: 0.5,
						zIndex: 1,
						top: 0,
						left: 0,
						height: containerDimensions.height,
						width: containerDimensions.width,
						transformOrigin: '0 0',
						transform: `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`,
					}}/>
			</div>
		</div>
	);
};
