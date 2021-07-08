import { Component, Input } from '@angular/core';
import { NodeDimension, NodePosition } from '@swimlane/ngx-graph';
import { RaxNodeComponent, RaxNodeStyle } from 'src/app/common/flowchart';

@Component({
  selector: '[nodeProcess]',
  template: `
    <svg:rect
      [attr.width]="dimension.width"
      [attr.height]="dimension.height"
      [attr.transform]="'translate(' + position.y + ',' + position.x + ')'"
      [ngStyle]="{
        fill: nodeStyle.backgroundColor,
        stroke: nodeStyle.border,
        strokeWidth: nodeStyle.borderWidth
      }"
    />
    <svg:text
      [attr.font-size]="nodeStyle.fontSize"
      [attr.font-family]="nodeStyle.fontFamily"
      [attr.fill]="nodeStyle.color"
      [attr.x]="dimension.width / 2 + position.x + nodeStyle.borderWidth!"
      [attr.y]="dimension.height / 2 + position.y + nodeStyle.borderWidth!"
      [attr.text-anchor]="nodeStyle.textAlign"
    >
      {{ label }}
    </svg:text>
  `,
})
export class NodeShapeProcess implements RaxNodeComponent {
  constructor() {}

  @Input() label: string = 'Default Text';

  @Input() position: NodePosition = { x: 0, y: 0 };

  @Input() dimension: NodeDimension = { width: 200, height: 150 };

  private _nodeStyle: RaxNodeStyle = {
    color: '#666',
    fontFamily: 'Roboto',
    fontSize: 18,
    textAlign: 'middle',
    backgroundColor: 'white',
    border: '#666',
    borderWidth: 2,
  };
  @Input()
  set nodeStyle(newStyle: RaxNodeStyle) {
    this._nodeStyle = { ...this._nodeStyle, ...newStyle };
  }
  get nodeStyle(): RaxNodeStyle {
    return this._nodeStyle;
  }
}
