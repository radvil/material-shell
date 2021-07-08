import { Component, Input } from '@angular/core';
import { NodePosition, NodeDimension } from '@swimlane/ngx-graph';
import { RaxNodeComponent, RaxNodeStyle } from 'src/app/common/flowchart';

@Component({
  selector: '[nodeEllipse]',
  template: `
    <svg:ellipse
      [attr.cx]="position.x + dimension.width / 2 + nodeStyle.borderWidth!"
      [attr.cy]="position.y + dimension.height / 2 + nodeStyle.borderWidth!"
      [attr.rx]="dimension.width / 2"
      [attr.ry]="dimension.height / 2"
      [attr.fill]="nodeStyle.backgroundColor"
      [attr.stroke]="nodeStyle.border"
      [attr.stroke-width]="nodeStyle.borderWidth"
    />
    <svg:text
      [attr.fill]="nodeStyle.color"
      [attr.font-size]="nodeStyle.fontSize"
      [attr.font-family]="nodeStyle.fontFamily"
      [attr.text-anchor]="nodeStyle.textAlign"
      [attr.x]="position.x + dimension.width / 2 + nodeStyle.borderWidth!"
      [attr.y]="position.y + dimension.height / 2 + nodeStyle.borderWidth!"
    >
      {{ label }}
    </svg:text>
  `,
})
export class NodeShapeEllipse implements RaxNodeComponent {
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
