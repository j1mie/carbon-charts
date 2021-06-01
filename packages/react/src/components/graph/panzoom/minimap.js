import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import {min} from 'd3-array';

const { prefix } = settings;

export default ({
		children,
		containerDimensions,
		contentDimensions,
		mapHeight = 180,
		mapWidth = 172,
		onZoomIn = () => {},
		onZoomOut = () => {},
		onReset = () => {},
		transform = {}
	}) =>
{
	const namespace = `${prefix}--cc--mini-map`;

	const {k,x,y} = transform;

	const invertMatrix = (scale, translateX, translateY) => {
		const denominator = scale * scale;

		return {
		scale: scale / denominator,
		translateX: (scale * translateX) / -denominator,
		translateY: (scale * translateY) / -denominator
	};
	}

	const inverse = invertMatrix(k, x, y);
	const { translateX, translateY, scale } = inverse;

	const scaleFactor = min([mapHeight / contentDimensions.height, mapWidth / contentDimensions.width]);

	const scalePercentage = Math.round(k * 100);

	// Todo: investigate whether we can add in a ref to calculate the content dimensions for us

	return (
		<div className={namespace}>
			<div style={{ display: "flex" }}>
				<span>{`${scalePercentage}%`}</span>
				<button onClick={onZoomIn}>+</button>
				<button onClick={onZoomOut}>-</button>
				<button onClick={onReset}>=</button>
			</div>

			<div
				style={{
					height: mapHeight,
					width: mapWidth,
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
		</div>
	);
};
