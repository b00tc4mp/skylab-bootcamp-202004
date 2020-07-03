import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import { retrieveUser } from 'termometro-client-logic'
import { tileProps } from './shared/propTypes';
const moment = require('moment')

function getValue(nextProps, prop) {
  const { activeStartDate, date, view } = nextProps;

  return typeof prop === 'function'
    ? prop({ activeStartDate, date, view })
    : prop;
}

export default class Tile extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { tileClassName, tileContent } = nextProps;

    const nextState = {};

    if (tileClassName !== prevState.tileClassNameProps) {
      nextState.tileClassName = getValue(nextProps, tileClassName);
      nextState.tileClassNameProps = tileClassName;
    }

    if (tileContent !== prevState.tileContentProps) {
      nextState.tileContent = getValue(nextProps, tileContent);
      nextState.tileContentProps = tileContent;
    }

    return nextState;
  }

  state = {};

  render() {
    const {
      activeStartDate,
      children,
      classes,
      date,
      formatAbbr,
      locale,
      maxDate,
      maxDateTransform,
      minDate,
      minDateTransform,
      onClick,
      onMouseOver,
      style,
      tileDisabled,
      view,
      mood,
    } = this.props;
    const { tileClassName, tileContent } = this.state;

    if (mood) {
      let filteredDate = mood.filter(element => moment(element.date).format('LL') === moment(date).format('LL'))
      if(filteredDate.length === 2){
        if((filteredDate[0].score+filteredDate[1].score)/2 > 7) style.backgroundColor = 'rgba(147, 225, 57, 0.5)'
        else if((filteredDate[0].score+filteredDate[1].score)/2 > 4) style.backgroundColor = 'rgba(255, 187, 129, 0.5)'
        else if((filteredDate[0].score+filteredDate[1].score)/2 > 0) style.backgroundColor = 'rgba(211, 52, 20, 0.5)'
      }
    }


    return (
      <button
        className={mergeClassNames(classes, tileClassName)}
        disabled={
          (minDate && minDateTransform(minDate) > date)
          || (maxDate && maxDateTransform(maxDate) < date)
          || (tileDisabled && tileDisabled({ activeStartDate, date, view }))
        }
        onClick={onClick && (event => onClick(date, event))}
        onFocus={onMouseOver && (() => onMouseOver(date))}
        onMouseOver={onMouseOver && (() => onMouseOver(date))}
        style={style}
        type="button"
      >
        {
          formatAbbr
            ? (
              <abbr aria- label={formatAbbr(locale, date)}>
                {children}
              </abbr >
            )
            : children}
        {tileContent}
      </button >
    );
  }
}

Tile.propTypes = {
  ...tileProps,
  children: PropTypes.node.isRequired,
  formatAbbr: PropTypes.func,
  maxDateTransform: PropTypes.func.isRequired,
  minDateTransform: PropTypes.func.isRequired,
};
