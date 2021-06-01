import React, {useRef, useLayoutEffect} from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import { zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import { select, event } from 'd3-selection';
import panzoom from 'panzoom';

const { prefix } = settings;

const D3PanZoom = ({ children, onTransform = () => {} }) => {
	const namespace = `${prefix}--cc--panzoom`;
	const containerRef = useRef(null);
	const innerRef = useRef(null);

	useLayoutEffect(() => {
		const element = select(containerRef.current);

		const zoomed = zoom()
			.scaleExtent([0.25, 1])
			.on("zoom", () => {
				const {x,y,k} = event.transform;
				innerRef.current.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
				innerRef.current.style.transformOrigin = "0 0";

				onTransform(event.transform);
			});

		element
			.call(zoomed)
			.call(zoomed.transform, zoomIdentity)

		onTransform(zoomTransform(element.node()));

		return () => {
			zoomed.on("zoom", null);
		}
	}, []);

	return (
		<div ref={containerRef} className={namespace} style={{ height: "100%", width: "100%" }}>
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
