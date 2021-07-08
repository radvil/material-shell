import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DxDiagramComponent as DxDiagram } from 'devextreme-angular';
import { DxDiagramData } from '../../mocks/dx-diagram-data';

@Component({
  selector: 'app-dx-diagram',
  templateUrl: './dx-diagram.component.html',
  styleUrls: ['./dx-diagram.component.scss'],
  preserveWhitespaces: true,
})
export class DxDiagramComponent implements AfterViewInit {
  @ViewChild(DxDiagram, { static: false }) diagram!: DxDiagram;

  constructor() {}

  ngAfterViewInit(): void {
    const data = DxDiagramData;
    this.diagram.instance.import(JSON.stringify(data));
  }

  onContentReady(): void {
    console.log('Content is ready');
  }

  onCustomCommand(e: any) {
    if (e.name === 'importData') {
      console.log(this.diagram.instance.getNodeDataSource());
      alert('on custom command importData triggered!');
    } else if (e.name === 'exportData') {
      alert('on custom command exportData triggered!');
    }
  }
}
