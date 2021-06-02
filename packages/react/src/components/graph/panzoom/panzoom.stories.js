import React from 'react';
import { storiesOf } from '@storybook/react';
import PanZoomWrapper from './PanZoomWrapper';
import PanZoomBody from './PanZoomBody';
import PanZoomMap from './PanZoomMap';
import Card from '../card/card';
import Edge from '../edge/edge';
import Circle from '../circle/circle';
import { User16, Wikis16 } from '@carbon/icons-react';

const stories = storiesOf('Experimental|PanZoom', module);
stories.addDecorator((story) => (
	<div className="container theme--white" style={{ display: "flex" }}>{story()}</div>
));

const graphHeight = 800;
const graphWidth = 1000;

const GraphExample = ({simple = false}) => {
	const nodeHeight = 64;
	const nodeWidth = 200;
	const circleSize = 64;

	return (
		<div style={{ height: graphHeight, width: graphWidth, backgroundColor: "#fff" }}>
			<svg height="100%" width="100%">
				<Edge
					source={{ x: 200, y: 132 }}
					target={{ x: 600, y: 132 }}
					variant={!simple && 'dash-sm'}
				/>

				<foreignObject
					style={{ overflow: 'visible' }}
					transform={`translate(${100},${100})`}
					height={nodeHeight}
					width={nodeWidth}>
					<Card
						title={!simple && 'Title'}
						description={!simple && 'Description'}
						renderIcon={!simple && <User16 />}
					/>
				</foreignObject>

				<foreignObject
					style={{ overflow: 'visible' }}
					transform={`translate(${600},${100})`}>
					<Circle title={!simple && 'Title'} size={circleSize} renderIcon={!simple && <Wikis16 />} />
				</foreignObject>
			</svg>
		</div>
	)
}

stories.add('Default', () => (
	<PanZoomBody>
		<GraphExample />
	</PanZoomBody>
));

stories.add('With map', () => (
		<PanZoomWrapper
			outerDimensions={{ height: 400, width: 600 }}
			innerDimensions={{ width: graphWidth, height: graphHeight }}
		>
			{ ({...rest}) =>
				<React.Fragment>
					<div style={{ border: "1px solid #e0e0e0" }}>
						<PanZoomBody {...rest}>
							<GraphExample />
						</PanZoomBody>
					</div>
					<div style={{ margin: "1rem" }}>
						<PanZoomMap {...rest}>
							<GraphExample simple />
						</PanZoomMap>
					</div>
				</React.Fragment>
			}
		</PanZoomWrapper>
));
