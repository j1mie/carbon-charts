import React, {useRef, useLayoutEffect, useReducer} from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import { zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import { select, event } from 'd3-selection';
import panzoom from 'panzoom';

const { prefix } = settings;

const D3PanZoom = ({ children, containerDimensions, onTransform = () => {}, scaleExtent = [0.25, 1], transform = {} }) => {
	const namespace = `${prefix}--cc--panzoom`;
	const containerRef = useRef(null);
	const innerRef = useRef(null);
	const panZoomRef = useRef(null);

	const {k,x,y} = transform;

	useLayoutEffect(() => {
		const element = select(containerRef.current);

		panZoomRef.current = zoom()
			.scaleExtent(scaleExtent);

		panZoomRef.current.on("zoom", () => {
			const {x,y,k} = event.transform;
			innerRef.current.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
			innerRef.current.style.transformOrigin = "0 0";

			onTransform(event.transform);
		});

		element
			.call(panZoomRef.current)
			.call(panZoomRef.current.transform, zoomIdentity)

		element.call(panZoomRef.current.transform, zoomIdentity.translate(x, y).scale(k));

		return () => {
			panZoomRef.current.on("zoom", null);
		}
	}, []);

	useLayoutEffect(() => {
		const element = select(containerRef.current);
		element.call(panZoomRef.current.transform, zoomIdentity.translate(x, y).scale(k));
	}, [x,y,k]);

	return (
		<div ref={containerRef} className={namespace} style={{ height: containerDimensions.height, width: containerDimensions.width, overflow: "hidden" }}>
			<div ref={innerRef} style={{ height: "100%", width: "100%" }}>
				{children}
			</div>
		</div>
	);
};

export default ({ children, onTransform = () => {}, options = {
	minZoom: .25,
	maxZoom: 1,
	bounds: true
} }) => {
	const namespace = `${prefix}--cc--panzoom`;
	const elementRef = useRef(null);
	const panzoomRef = useRef(null);

	useLayoutEffect(() => {
		panzoomRef.current = panzoom(elementRef.current, options);

		onTransform(panzoomRef.current.getTransform())

		panzoomRef.current.on('transform', (e) => {
			onTransform(e.getTransform())
		});

		return () => {
			panzoomRef.current.dispose();
		}
}, []);

	return (
		<div ref={elementRef} className={namespace}>
			{children}
		</div>
	);
};

export { D3PanZoom };
