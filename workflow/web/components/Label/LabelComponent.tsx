import type { ReactNode } from 'react';
import { SuperLabel } from '../../../shared';
import type { LabelPropsType } from './LabelComponentType';
import { Block } from '../../service/block/block';
import { BlockModel } from '../../service/block/block-model';
import React from 'react';

class LabelComponent extends SuperLabel<LabelPropsType> {
  render(): ReactNode {
    
    const model = new BlockModel();
    model.setValueFromArray(this.props);

    const block = new Block(model,'', '', '');
    let output = this.generateHtmlContent(block, model);
    return <div dangerouslySetInnerHTML={{ __html: output }} />;
  }

  protected generateHtmlContent(block: Block, model: BlockModel): string {
    let top = block.readCustomFieldValue('marginTop', '');
    let below = block.readCustomFieldValue('marginBelow', '');

    let padding = block.readCustomFieldValue('padding', '');
    let rounding = block.readCustomFieldValue('rounding', '');

    let titleColourHex = block.readCustomFieldValue('titleColourHex', '#2e78bc');
    let textColourHex = block.readCustomFieldValue('textColourHex', '#000000');
    let backgroundColourHex = block.readCustomFieldValue('backgroundColourHex', '#BFEFFF');
    let borderColourHex = block.readCustomFieldValue('borderColourHex', '#2e78bc');

    let backgroundColour = '';
    if (block.readCustomFieldValue('backgroundColour', '') === '1') {
        backgroundColour = `background-color:${backgroundColourHex};border: 1px solid ${borderColourHex};`;
    }
    const css = `border-radius:${rounding}px;padding:${padding}px;${backgroundColour}`;

    let result = `<script>$('.collapsible').collapsible();</script>`;
    result += `<div style='margin-top:${top}px;margin-bottom:${below}px;${css}'>`;

    let textPadding = '';
    let titleClass = '';
    if (block.readCustomFieldValue('collapsible', '') === '1') {
        textPadding = ';padding-left: 15px;';
        titleClass = 'collapsible-header';
        result += "<ul class='collapsible collapsible-accordion' style='border:0px !important; box-shadow: none; !important;'>";
    }

    if (model.getTitle() !== '') {
        if (block.readCustomFieldValue('collapsible', '') === '1') {
            result += "<li>";
        }

        result += `<h6 class='${titleClass} font-size-20' style='color:${titleColourHex}; ${backgroundColour} border:0px;'><strong>${model.getTitle()}</strong>`;

        if (block.readCustomFieldValue('collapsible', '') === '1') {
            result += "<i class='material-icons right black-text'>arrow_drop_down</i>";
        }
        result += "</h6>";
    }

    const text = block.readCustomFieldValue('text', '');

    if (block.readCustomFieldValue('collapsible', '') === '1') {
        result += `<div class='collapsible-body' style='color:${textColourHex}; border:0px;'>`;
    }

    result += `<ul style='color:${textColourHex};${textPadding};'>${text}</ul>`;

    if (block.readCustomFieldValue('collapsible', '') === '1') {
        result += "</div></li></ul>";
    }
    result += "</div>";

    return result;
  }
}

export default LabelComponent;
