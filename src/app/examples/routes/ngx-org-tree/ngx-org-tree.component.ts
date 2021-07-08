import { Component, OnInit, Input } from '@angular/core';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './custom-dagre-nodes-only';
import * as shape from 'd3-shape';

export interface Employee {
  id: string;
  name: string;
  office: string;
  role: string;
  backgroundColor: string;
  upperManagerId?: string;
}

@Component({
  selector: 'app-ngx-org-tree',
  templateUrl: './ngx-org-tree.component.html',
  styleUrls: ['./ngx-org-tree.component.scss'],
})
export class NgxOrgTreeComponent implements OnInit {
  @Input() employees: Employee[] = [];

  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: 'TB',
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  constructor() {
    this.employees = [
      {
        id: '1',
        name: 'Employee 1',
        office: 'Office 1',
        role: 'Manager',
        backgroundColor: '#DC143C',
      },
      {
        id: '2',
        name: 'Employee 2',
        office: 'Office 2',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1',
      },
      {
        id: '3',
        name: 'Employee 3',
        office: 'Office 3',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1',
      },
      {
        id: '4',
        name: 'Employee 4',
        office: 'Office 4',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1',
      },
      {
        id: '5',
        name: 'Employee 5',
        office: 'Office 5',
        role: 'Student',
        backgroundColor: '#8A2BE2',
        upperManagerId: '4',
      },
    ];
  }

  ngOnInit(): void {
    for (const employee of this.employees) {
      const node: Node = {
        id: employee.id,
        label: employee.name,
        data: {
          office: employee.office,
          role: employee.role,
          backgroundColor: employee.backgroundColor,
        },
      };

      this.nodes.push(node);
    }

    for (const employee of this.employees) {
      if (!employee.upperManagerId) {
        continue;
      }

      const edge: Edge = {
        source: employee.upperManagerId,
        target: employee.id,
        label: '',
        data: {
          linkText: 'Manager of',
        },
      };

      this.links.push(edge);
    }
  }

  getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor,
    };
  }
}
