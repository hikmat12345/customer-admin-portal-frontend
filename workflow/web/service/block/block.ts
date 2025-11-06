
export class Block {
  protected readonly RESOURCE_JS = 'js';
  protected readonly RESOURCE_HTML = 'html';
  protected readonly RESOURCE_CSS = 'css';

  protected uuid: string;
  protected blockModel: any;
  protected workflow: any;
  protected renderMode: string;
  protected user: any;

  constructor(
    blockModel: any,
    workflow: any,
    renderMode: string,
    user: any,
  ) {
    this.blockModel = blockModel;
    this.workflow = workflow;
    this.renderMode = renderMode;
    this.user = user;
    this.uuid = this.blockModel.getId();
  }

  protected loadExternalResource(link: string, tag: string): void {
    if (tag === this.RESOURCE_JS) {
      console.log(
        `<script src='${link}' type='text/javascript' defer></script>`,
      );
      return;
    }

    if (tag === this.RESOURCE_CSS) {
      console.log(`<link rel='stylesheet' href='${link}'>`);
      return;
    }
  }

  getDefaultValueFieldIdentifier(): string {
    return `${this.blockModel.getId()}_value`;
  }

  readCustomFieldValue(
    identifier: string,
    defaultValue: any,
  ): any {
    if (this.blockModel.getProperties() && Object.keys(this.blockModel.getProperties()).length > 0) {
      const properties = this.blockModel.getProperties();
      if (properties[identifier]?.value) {
        return properties[identifier].value;
      }
    }
    return defaultValue;
  }

  protected getTimezoneAndFormat(): [string, string] {
    let timezone = 'Europe/London';
    let timeFormat = 'd/m/Y';

    return [timezone, timeFormat];
  }

  renderGroupStart(): string {
    return `<div class='workflow-block-group-${this.blockModel.getGroup()}'>`;
  }

  renderGroupEnd(): string {
    return '</div>';
  }
}
