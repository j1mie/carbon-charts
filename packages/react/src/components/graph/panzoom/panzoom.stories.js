import React, {useRef, useState, useLayoutEffect} from 'react';
import { storiesOf } from '@storybook/react';
import PanZoom, {D3PanZoom} from './panzoom';
import MiniMap from './minimap';
import Card from '../card/card';

const stories = storiesOf('Experimental|PanZoom', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Default', () => (
	<div style={{ border: "1px solid #e0e0e0", overflow: "hidden", height: 400, width: 600 }}>
		<PanZoom>
			<div style={{ padding: "2rem", width: 300 }}>
				<Card title="Title" description="Description" />
			</div>
		</PanZoom>
	</div>
));

stories.add('D3', () => (
		<div style={{ border: "1px solid #e0e0e0", overflow: "hidden", height: 400, width: 600 }}>
			<D3PanZoom>
				<div style={{ height: "100%", width: "100%" }}>
					<div style={{ height: 64, width: 300 }}>
						<Card title="Title" description="Description" />
					</div>
				</div>
			</D3PanZoom>
		</div>
));

stories.add('Mini map', () => {

	const [transform, setTransform] = useState();

	const handleTransform = (transform) => {
		setTransform(transform);
	};

	// Dimensions for the parent element of the zoom container
	const containerDimensions = {
		height: 400,
		width: 600
	};

	// Dimensions for the actual content that will be zoomed (this can exceed the parent dimensions)
	const contentDimensions = {
		height: 1000,
		width: 1000
	};

	const content = (
		<div style={{ height: contentDimensions.height, width: contentDimensions.width }}>
			<div style={{ height: 64, width: 300 }}>
				<Card title="Title" description="Description" />
			</div>
		</div>
	);

	return (
		<React.Fragment>
			<div style={{ border: "1px solid #e0e0e0", overflow: "hidden", height: containerDimensions.height, width: containerDimensions.width }}>
				<D3PanZoom onTransform={handleTransform}>
					{content}
				</D3PanZoom>
			</div>
			<div style={{ marginTop: "1rem" }}>
				<MiniMap
					contentDimensions={contentDimensions}
					containerDimensions={containerDimensions}
					transform={transform}
				>
					{content}
				</MiniMap>
			</div>
		</React.Fragment>
	)
});

stories.add('Mini map (using refs  to calculate width)', () => {

	const [transform, setTransform] = useState(null);
	const [innerDimensions, setInnerDimensions] = useState(null);
	const [containerDimensions, setContainerDimensions] = useState(null);

	const containerRef = useRef(null);
	const innerRef = useRef(null);

	const handleTransform = (transform) => {
		setTransform(transform);
	};

	useLayoutEffect(() => {
		const { offsetHeight, offsetWidth } = innerRef.current;
		setInnerDimensions({offsetHeight, offsetWidth});
	}, []);

	useLayoutEffect(() => {
		const { offsetHeight, offsetWidth } = containerRef.current;
		setContainerDimensions({offsetHeight, offsetWidth});
	}, []);

	return (
		<div ref={containerRef} style={{ border: "1px solid #e0e0e0", overflow: "hidden", height: 400, width: 600 }}>
			<D3PanZoom onTransform={handleTransform}>
				<div ref={innerRef} style={{ height: "100%", width: "100%" }}>
					<div style={{ height: 64, width: 300 }}>
						<Card title="Title" description="Description" />
					</div>
				</div>
			</D3PanZoom>
		</div>
	)
});
