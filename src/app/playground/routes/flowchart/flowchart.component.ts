import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Layout } from '@swimlane/ngx-graph';
import { CurveFactory, curveLinear } from 'd3-shape';

import { DagreNodesLayout, FlowChartData, NodeShapeType, RaxNode } from 'src/app/common/flowchart';
import { flowChartData } from '../../mocks/flowchart-data.mocks';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss'],
})
export class FlowchartComponent implements OnInit {
  constructor() {}

  public flowchartData!: FlowChartData;
  public curve: CurveFactory = curveLinear;
  public layoutSettings = { orientation: 'TB' };
  public dagreLayout: Layout = new DagreNodesLayout();

  public contextMenuPosition = { x: '0px', y: '0px' };
  @ViewChild(MatMenuTrigger, { static: true }) contextMenu!: MatMenuTrigger;

  ngOnInit(): void {
    this.flowchartData = flowChartData;
  }

  editNode(node: RaxNode): void {
    const nodes = Array.from(this.flowchartData.nodes);
    const foundIdx = nodes.findIndex((n) => n.id === node.id);
    if (~foundIdx) {
      const updatedNode: Partial<RaxNode> = {
        ...node,
        type: this.getRandomValue('nodeTypes'),
        label: this.getRandomValue('labels'),
        nodeStyle: {
          ...node.nodeStyle,
          backgroundColor: this.getRandomValue('bgColors'),
          color: '#ffffff',
        },
      };
      nodes[foundIdx] = {
        ...nodes[foundIdx],
        ...updatedNode,
      };
    }

    this.flowchartData = {
      ...this.flowchartData,
      nodes,
    };
  }

  public isRandoming = false;
  private handleInterval!: any;
  public toggleRandomNodes(): void {
    this.isRandoming = !this.isRandoming;
    if (!this.isRandoming) {
      console.log('shuffle stopped!');
      clearInterval(this.handleInterval);
    } else {
      console.log('shuffle started!');
      this.handleInterval = setInterval(() => {
        this.editNode(this.getRandomValue('nodes'));
      }, 500);
    }
  }

  private getRandomValue(arrayName: 'nodeTypes' | 'labels' | 'bgColors' | 'nodes'): any {
    let array: NodeShapeType[] | string[] | RaxNode[] = [];
    if (arrayName === 'nodeTypes') {
      array = [
        'connector',
        'data',
        'decision',
        'eight-edges',
        'ellipse',
        'merge',
        'preparation',
        'process',
        'squircle',
      ];
    } else if (arrayName === 'labels') {
      array = [
        'Writer',
        'Student',
        'Backend\nDeveloper',
        'FrontEnd\nDeveloper',
        'DevOps',
        'Something else',
      ];
    } else if (arrayName === 'bgColors') {
      array = ['#ffccd6', '#ff8061', '#3f98b5', '#8bfbaf', '#FADB5F', '#DD0031', 'deeppink'];
    } else if (arrayName === 'nodes') {
      array = this.flowchartData.nodes;
    } else {
      array = ['undefinedValue'];
    }
    return array[Math.floor(Math.random() * array.length)];
  }

  removeNode(node: RaxNode): void {
    console.log(node);
    const nodes = this.flowchartData.nodes.filter((n) => n.id !== node.id);
    const links = this.flowchartData.links.filter((l) => l.target !== node.id);
    this.flowchartData = {
      ...this.flowchartData,
      nodes,
      links,
    };
  }

  onContextMenu(event: MouseEvent, customer: RaxNode) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: customer };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
