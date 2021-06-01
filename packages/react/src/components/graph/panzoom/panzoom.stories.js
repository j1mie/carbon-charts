import React, {useRef, useState, useLayoutEffect} from 'react';
import { storiesOf } from '@storybook/react';
import PanZoom from './panzoom';
import MiniMap from '../minimap/minimap';
import Card from '../card/card';

const stories = storiesOf('Experimental|PanZoom', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('PanZoom', () => (
		<div style={{ border: "1px solid #e0e0e0", overflow: "hidden", height: 400, width: 600 }}>
			<PanZoom>
				<div style={{ height: "100%", width: "100%" }}>
					<div style={{ height: 64, width: 300 }}>
						<Card title="Title" description="Description" />
					</div>
				</div>
			</PanZoom>
		</div>
));

stories.add('With mini map', () => {

	const [transform, setTransform] = useState(
		{ x:0, y:0, k: 1 }
	);

	const handleTransform = (transform) => {
		setTransform(transform);
	};

	// Dimensions for the parent element of the panzoom container
	const containerDimensions = {
		height: 400,
		width: 600
	};

	// Dimensions for the actual content that will be zoomed (this can exceed the parent dimensions)
	const contentDimensions = {
		height: 1000,
		width: 1000
	};

	// Controls how much you can zoom in or out
	const minZoom = 0.5;
	const maxZoom = 1.5;

	const content = (
		<div style={{ height: contentDimensions.height, width: contentDimensions.width }}>
			<div style={{ height: 64, width: 300 }}>
				<Card title="Title" description="Description" />
			</div>
		</div>
	);

	const handleZoomOut = () => {
		if (transform.k > minZoom) {
			setTransform({
				...transform,
				k: transform.k - 0.1
			})
		}
	}

	const handleZoomIn = () => {
		if (transform.k < maxZoom) {
			setTransform({
				...transform,
				k: transform.k + 0.1
			})
		}
	}

	const handleReset = () => {
		setTransform({
			x: 0,
			y: 0,
			k: 1
		})
	};

	return (
		<React.Fragment>
			<div style={{ border: "1px solid #eee", height: containerDimensions.height, width: containerDimensions.width }}>
				<PanZoom
					containerDimensions={containerDimensions}
					onTransform={handleTransform}
					scaleExtent={[minZoom, maxZoom]}
					transform={transform}
				>
					{content}
				</PanZoom>
			</div>
			<div style={{ marginTop: "1rem" }}>
				<MiniMap
					containerDimensions={containerDimensions}
					contentDimensions={contentDimensions}
					onZoomOut={handleZoomOut}
					onZoomIn={handleZoomIn}
					onReset={handleReset}
					transform={transform}
				>
					{content}
				</MiniMap>
			</div>
		</React.Fragment>
	)
});
