import _ from 'lodash';
import React, { ReactNode } from 'react';
import { Colors, SuperParagraph } from '../../../shared';
import type { TextPropsType } from './TextComponentTypes';

const moderateScale = (size : any) => `${size}px`;

class TextComponent extends SuperParagraph<TextPropsType> {
  render(): ReactNode {
    const { title, render } = this.props;

    const containerStyle = {
      borderWidth: moderateScale(1),
      borderRadius: moderateScale(14),
      padding: '16px',
      marginTop: '8px',
      borderColor: render?.borderHex ? render?.borderHex : Colors.primary,
      backgroundColor: render?.backgroundHex ? render?.backgroundHex : Colors.lightBlue,
      borderStyle: 'solid',
    };

    const titleStyle = {
      fontSize: moderateScale(render?.titleFontSize ?? 16),
      color: render?.titleHexColour ? render?.titleHexColour : Colors.primary,
    };

    const textContentStyle = {
      marginTop: '12px',
      fontSize: moderateScale(render?.textFontSize ? render?.textFontSize : 14),
      color: render?.textHexColour ? render?.textHexColour : Colors.black,
    };

    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>
          {title}
        </h1>
        {!_.isEmpty(render?.text) && (
          <p style={textContentStyle}>
            {render?.text}
          </p>
        )}
      </div>
    );
  }
}

export default TextComponent;
