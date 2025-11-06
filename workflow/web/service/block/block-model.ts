export class BlockModel {
  private id: string;
  private type: string;
  private title: string;
  private order: string;
  private group: number;
  private tag: string;
  private properties: any;
  private render: any;
  private required: boolean;

  constructor() {
    this.id = '';
    this.type = '';
    this.title = '';
    this.order = '';
    this.group = 0;
    this.tag = '';
    this.properties = {};
    this.render = {};
    this.required = false;
  }

  public setValueFromArray(data: Record<string, any>): void {
    this.id = data['id'];
    this.type = data['type'];
    this.title = data['title'];
    this.order = data['order'];
    this.properties = data['properties'];
    this.render = data['render'];
    this.group = data.hasOwnProperty('group') ? data['group'] : 0;
    this.tag = data.hasOwnProperty('tag') ? data['tag'] : '';
    this.required = data['mandatory'] === true ? true : false;
  }

  public getIdForFunctionName(): string {
    return this.id.replace(/-/g, '_');
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): BlockModel {
    this.id = id;
    return this;
  }

  public getType(): string {
    return this.type;
  }

  public setType(type: string): BlockModel {
    this.type = type;
    return this;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): BlockModel {
    this.title = title;
    return this;
  }

  public getOrder(): string {
    return this.order;
  }

  public setOrder(order: string): BlockModel {
    this.order = order;
    return this;
  }

  public getProperties(): any {
    return this.properties;
  }

  public setProperties(properties: any): BlockModel {
    this.properties = properties;
    return this;
  }

  public getRender(): any {
    return this.render;
  }

  public setRender(render: any): BlockModel {
    this.render = render;
    return this;
  }

  public getRequired(): boolean {
    return this.required;
  }

  public setRequired(required: boolean): void {
    this.required = required;
  }

  public getGroup(): number {
    return this.group;
  }

  public setGroup(group: number): void {
    this.group = group;
  }

  public getTag(): string {
    return this.tag;
  }

  public setTag(tag: string): void {
    this.tag = tag;
  }
}
