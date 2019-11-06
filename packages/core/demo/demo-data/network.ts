import { getTheme } from "./themes";
import AddIcon from '@carbon/icons/es/add/20';
import BugIcon from '@carbon/icons/es/debug/20';
import ScreenIcon from '@carbon/icons/es/screen/20';

const nodeData = [
	{ id: "a", x: 0, y: 0, icon: AddIcon },
	{ id: "b", x: 350, y: 0 },
	{ id: "c", x: 350, y: 300, kind: "warning", icon: ScreenIcon },
	{ id: "d", x: 700, y: 300, kind: "error", icon: BugIcon },
];

const linkData = [
	{ source: "a", target: "b" },
	{ source: "c", target: "b", kind: "warning", dash: "8 4" },
	{ source: "d", target: "c", kind: "error" }];

const linkMapped = linkData.map(link => {
	const sourceNode = nodeData.find(node => node.id === link.source);
	const targetNode = nodeData.find(node => node.id === link.target);

	return {
		...link,
		source: sourceNode,
		target: targetNode
	};
});

export const networkOption = {
	title: "Network diagram",
	// Todo: try out axis logic here...
	theme: getTheme()
};

export const networkData = {
	labels: [], // Todo: Add these as swimlanes?
	datasets: [
		{
			label: "nodes",
			data: nodeData
		},
		{
			label: "links",
			data: linkMapped // Todo: decide whether to parse this in the component or not, or give the option to do both
		},
	]
};
