import { Edge } from '@swimlane/ngx-graph';
import { FlowChartData, RaxNode } from 'src/app/common/flowchart';

const links: Edge[] = [
  {
    source: '1',
    target: '2',
    label: 'Manager of',
  },
  {
    source: '1',
    target: '3',
    label: 'Manager of',
  },
  {
    source: '1',
    target: '4',
    label: 'Manager of',
  },
  {
    source: '4',
    target: '5',
    label: 'Manager of',
  },
];

const nodes: RaxNode[] = [
  {
    id: '1',
    type: 'connector',
    label: 'Manager',
    nodeStyle: {
      backgroundColor: '#ffccd6',
    },
  },
  {
    id: '2',
    type: 'process',
    label: 'Engineer',
    nodeStyle: {
      backgroundColor: '#ff8061',
      color: '#ffffff',
    },
  },
  {
    id: '3',
    type: 'merge',
    label: 'Engineer',
    nodeStyle: {
      backgroundColor: '#3f98b5',
      color: '#ffffff',
    },
  },
  {
    id: '4',
    type: 'preparation',
    label: 'Engineer',
    nodeStyle: {
      backgroundColor: '#8bfbaf',
    },
  },
  {
    id: '5',
    type: 'terminator',
    label: 'Student',
    nodeStyle: {
      backgroundColor: '#FADB5F',
    },
  },
];

export const flowChartData: FlowChartData = {
  nodes,
  links,
};
