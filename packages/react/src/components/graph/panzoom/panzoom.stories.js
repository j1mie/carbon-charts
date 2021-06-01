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

const GraphExample = ({showText = true}) => {
	const nodeHeight = 64;
	const nodeWidth = 200;
	const circleSize = 64;

	return (
		<svg height="1000" width="1000">
				<Edge
					source={{ x: 200, y: 132 }}
					target={{ x: 600, y: 132 }}
					variant={'dash-sm'}
				/>

				<foreignObject
					style={{ overflow: 'visible' }}
					transform={`translate(${100},${100})`}
					height={nodeHeight}
					width={nodeWidth}>
					<Card
						title={showText && 'Title'}
						description={showText && 'Description'}
						renderIcon={<User16 />}
					/>
				</foreignObject>

				<foreignObject
					style={{ overflow: 'visible' }}
					transform={`translate(${600},${100})`}>
					<Circle title={showText && 'Title'} size={circleSize} renderIcon={<Wikis16 />} />
				</foreignObject>
		</svg>)
}

stories.add('PanZoom', () => (
		<PanZoomWrapper
			outerDimensions={{ height: 400, width: 600 }}
			innerDimensions={{ width: 1000, height: 1000 }}
		>
			{ ({...rest}) =>
				<React.Fragment>
					<div style={{ border: "1px solid #e0e0e0" }}>
						<PanZoomBody {...rest}>
							<GraphExample />
						</PanZoomBody>
					</div>
					<PanZoomMap {...rest}>
						<GraphExample showText={false} />
					</PanZoomMap>
				</React.Fragment>
			}
		</PanZoomWrapper>
));
