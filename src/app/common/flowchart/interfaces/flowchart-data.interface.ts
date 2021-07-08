import { Edge, Node } from '@swimlane/ngx-graph';

export type RaxNodeStyle = Partial<{
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: string;
  backgroundColor: string;
  border: string;
  borderWidth: number;
}>;

export interface RaxNodeComponent extends Pick<Node, 'position' | 'dimension' | 'transform'> {
  label: string;
  nodeStyle?: RaxNodeStyle;
}

export type RaxNode = RaxNodeComponent &
  Node & {
    type: NodeShapeType;
  };

export type NodeShapeType =
  | 'connector'
  | 'data'
  | 'decision'
  | 'eight-edges'
  | 'ellipse'
  | 'merge'
  | 'preparation'
  | 'process'
  | 'squircle'
  | 'terminator';

export interface FlowChartData {
  nodes: RaxNode[];
  links: Edge[];
}