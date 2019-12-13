import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import DashBoard from './DashBoard';
import { GameAreaWrapper } from './style';

const GameArea = ({ buttonClickSound }) => (
  <GameAreaWrapper>
    <DashBoard buttonClickSound={buttonClickSound} />
    <Field />
  </GameAreaWrapper>
);

GameArea.propTypes = {
  buttonClickSound: PropTypes.shape({
    play: PropTypes.func.isRequired,
  }).isRequired,
};

export default GameArea;
