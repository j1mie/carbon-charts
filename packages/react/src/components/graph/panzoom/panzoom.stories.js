import React from 'react';
import { storiesOf } from '@storybook/react';
import PanZoom, {D3PanZoom} from './panzoom';
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
