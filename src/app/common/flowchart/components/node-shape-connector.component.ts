import { Component, Input } from '@angular/core';
import { NodePosition, NodeDimension } from '@swimlane/ngx-graph';
import { RaxNodeComponent, RaxNodeStyle } from 'src/app/common/flowchart';

@Component({
  selector: '[nodeConnector]',
  template: `
    <svg:circle
      [attr.cx]="position.x + dimension.width / 2 + nodeStyle.borderWidth!"
      [attr.cy]="position.y + dimension.height / 2 + nodeStyle.borderWidth!"
      [attr.r]="dimension.height / 2"
      [attr.stroke]="nodeStyle.border"
      [attr.stroke-width]="nodeStyle.borderWidth"
      [attr.fill]="nodeStyle.backgroundColor"
    />

    <svg:text
      [attr.fill]="nodeStyle.color"
      [attr.font-size]="nodeStyle.fontSize"
      [attr.font-family]="nodeStyle.fontFamily"
      [attr.text-anchor]="nodeStyle.textAlign"
      [attr.x]="dimension.width / 2 + position.x + nodeStyle.borderWidth!"
      [attr.y]="dimension.height / 2 + position.y + nodeStyle.borderWidth!"
    >
      {{ label }}
    </svg:text>
  `,
  preserveWhitespaces: true,
})
export class NodeShapeConnector implements RaxNodeComponent {
  constructor() {}

  @Input() label: string = 'Default Label';

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
