import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import {
  curveLinear,
  curveBundle,
  curveCardinal,
  curveCatmullRom,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3-shape';
import { nodes, clusters, links } from '../../mocks/ngx-diagram-data';

@Component({
  selector: 'app-ngx-diagram',
  templateUrl: './ngx-diagram.component.html',
  styleUrls: ['./ngx-diagram.component.scss'],
})
export class NgxDiagramComponent implements OnInit {
  public nodes: Node[] = nodes;
  public clusters: ClusterNode[] = clusters;
  public links: Edge[] = links;
  public selectedLayout: string | Layout = 'dagreCluster';
  public layouts: any[] = [
    {
      label: 'Dagre',
      value: 'dagre',
    },
    {
      label: 'Dagre Cluster',
      value: 'dagreCluster',
      isClustered: true,
    },
    {
      label: 'Cola Force Directed',
      value: 'colaForceDirected',
      isClustered: true,
    },
    {
      label: 'D3 Force Directed',
      value: 'd3ForceDirected',
    },
  ];

  // line interpolation
  curveType: string = 'Bundle';
  curve: any = curveLinear;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before',
  ];

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false;

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  ngOnInit() {
    this.setInterpolationType(this.curveType);
  }

  setInterpolationType(curveType: string) {
    this.curveType = curveType;

    switch (curveType) {
      case 'Bundle':
        this.curve = curveBundle.beta(1);
        break;
      case 'Cardinal':
        this.curve = curveCardinal;
        break;
      case 'Catmull Rom':
        this.curve = curveCatmullRom;
        break;
      case 'Linear':
        this.curve = curveLinear;
        break;
      case 'Monotone X':
        this.curve = curveMonotoneX;
        break;
      case 'Monotone Y':
        this.curve = curveMonotoneY;
        break;
      case 'Natural':
        this.curve = curveNatural;
        break;
      case 'Step':
        this.curve = curveStep;
        break;
      case 'Step After':
        this.curve = curveStepAfter;
        break;
      case 'Step Before':
        this.curve = curveStepBefore;
        break;
      default:
        this.curve = this.curve;
    }
  }

  setLayout(layoutName: string): void {
    const layout = this.layouts.find((l) => l.value === layoutName);
    this.selectedLayout = layoutName;
    if (!layout.isClustered) {
      this.clusters = [];
    } else {
      this.clusters = clusters;
    }
  }
}
