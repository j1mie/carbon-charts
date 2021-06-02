import React from 'react';
import { ZoomIn16, ZoomOut16, ZoomReset16 } from "@carbon/icons-react";
import { Button } from "carbon-components-react";
import settings from 'carbon-components/src/globals/js/settings';
import {min} from 'd3-array';

const { prefix } = settings;

export default ({
		children,
		outerDimensions,
		innerDimensions,
		maxHeight = 136,
		maxWidth = 176,
		onZoomIn = () => {},
		onZoomOut = () => {},
		onReset = () => {},
		transform = {}
	}) =>
{
	const namespace = `${prefix}--cc--pan-zoom-map`;

	const {k,x,y} = transform;

	const invertMatrix = (scale, translateX, translateY) => {
		const denominator = scale * scale;

		return {
		scale: scale / denominator,
		translateX: (scale * translateX) / -denominator,
		translateY: (scale * translateY) / -denominator
	};}

	const inverse = invertMatrix(k, x, y);
	const { translateX, translateY, scale } = inverse;

	const scaleFactor = min([maxHeight / innerDimensions.height, maxWidth / innerDimensions.width]);

	const scalePercentage = Math.round(k * 100);

	return (
		<div className={namespace}>
			<div className={`${namespace}__toolbar`}>
				<div className={`${namespace}__percentage`}>
					{`${scalePercentage}%`}
				</div>
				<div className={`${namespace}__controls`}>
					<div className={`${namespace}__control`}>
						<Button onClick={onZoomIn} hasIconOnly kind={`ghost`} size={`small`} renderIcon={ZoomIn16} />
					</div>
					<div className={`${namespace}__control`}>
						<Button onClick={onZoomOut} hasIconOnly kind={`ghost`} size={`small`} renderIcon={ZoomOut16} />
					</div>
					<div className={`${namespace}__control`}>
						<Button onClick={onReset} hasIconOnly kind={`ghost`} size={`small`} renderIcon={ZoomReset16} />
					</div>
				</div>
			</div>

			<div style={{ height: maxHeight, width: maxWidth, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
			<div
				style={{
					height: innerDimensions.height * scaleFactor,
					width: innerDimensions.width * scaleFactor,
					boxSizing: "border-box",
					position: "relative"
				}}
			>
					<div style={{
						pointerEvents: "none",
						userSelect: "none",
						height: innerDimensions.height,
						width: innerDimensions.width,
						transform: `scale(${scaleFactor})`,
						transformOrigin: '0 0' }}
					>
						{children}

						<div className={`${namespace}__screen`}
							style={{
								height: outerDimensions.height,
								width: outerDimensions.width,
								transformOrigin: '0 0',
								transform: `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`,
							}}/>
					</div>
			</div>
			</div>
		</div>
	);
};
