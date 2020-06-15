import React from 'react';
import {
  SelectField, TextField, RadioGroup, Button,
} from '../../components';
import {
  SELECT_OPTIONS, CRICKET_OPTIONS, FOOTBALL_OPTIONS, CRICKET, INPUT_DEMO_SCHEMA,
} from '../../configs/constants';
import { MyStyle } from './style';

export class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      nameError: '',
      sportError: '',
      cricketError: '',
      footballError: '',
    };
  }

  handleNameChange = (event) => {
    const { value } = event.target;
    this.getError('name', value)
      .then((nameError) => this.setState({
        nameError,
        name: value,
      }))
      .catch((err) => console.log(err));
  }

  handleSportChange = (event) => {
    const { value } = event.target;
    this.getError('sport', value)
      .then((sportError) => this.setState({
        sportError,
        sport: value,
        football: '',
        cricket: '',
        footballError: '',
        cricketError: '',
      }))
      .catch((Error) => console.log(Error));
  }

  handleSportBlur = (event) => {
    const { value } = event.target;
    this.getError('sport', value)
      .then((sportError) => this.setState({
        sportError,
        sport: value,
      }))
      .catch((Error) => console.log(Error));
  }

  handleSpecialtyChange = (event) => {
    const { value } = event.target;
    const { sport } = this.state;
    const key = `${sport}Error`;
    this.getError([sport], value)
      .then((sportError) => this.setState({
        [key]: sportError,
        [sport]: value,
      }))
      .catch((err) => console.log(err));
  }

  handleSpecialtyBlur = () => {
    const { sport, [sport]: specialty } = this.state;
    const key = `${sport}Error`;
    this.getError([sport], specialty)
      .then((sportError) => this.setState({
        [key]: sportError,
      }))
      .catch((err) => console.log(err));
  }

  onClick = () => console.log(this.state);

  getRadioOptions = () => {
    const { sport } = this.state;
    return ((sport === CRICKET) ? CRICKET_OPTIONS : FOOTBALL_OPTIONS);
  }

  hasErrors = () => {
    const {
      nameError, emailError, passwordError, confirmPasswordError,
    } = this.state;
    return (nameError || emailError || passwordError || confirmPasswordError);
  }

  isTouched = () => {
    const {
      name, sport, cricket, football,
    } = this.state;
    return !!(name || sport || cricket || football);
  }

  getError = async (label, value) => {
    try {
      await INPUT_DEMO_SCHEMA.validateAt(label, { [label]: value });
      return '';
    } catch (error) {
      return error.errors;
    }
  }

  isDisabled = () => {
    const {
      name, sport, cricket, football,
    } = this.state;
    const isFilled = !!(name && sport && (cricket || football));
    return (!this.isTouched() || this.hasErrors() || !isFilled) ? 'disabled' : '';
  }

  render() {
    console.log(this.state);
    const {
      sport, name, nameError, sportError, cricketError, footballError, [sport]: specialty,
    } = this.state;
    return (
      <MyStyle>
        <p><b>Name</b></p>
        <TextField
          onChange={this.handleNameChange}
          value={name}
          error={String(nameError)}
          onBlur={this.handleNameChange}
        />
        <p><b>Select the game you play </b></p>
        <SelectField
          options={SELECT_OPTIONS}
          onChange={this.handleSportChange}
          defaultText="Select"
          value={String(sport)}
          error={String(sportError)}
          onBlur={this.handleSportBlur}
        />
        {
          sport && (
            <>
              <p><b>What you Do</b></p>
              <RadioGroup
                options={this.getRadioOptions()}
                onChange={this.handleSpecialtyChange}
                value={String([specialty])}
                error={String(cricketError || footballError)}
                onBlur={this.handleSpecialtyBlur}
              />
            </>
          )
        }
        <div align="right">
          <Button onClick={this.onClick} value=" CANCEL " />
          &nbsp;&nbsp;&nbsp;
          <Button
            value=" SUBMIT "
            disabled={this.isDisabled()}
            onClick={this.onClick}
            success={(this.isDisabled()) ? 'disabled' : 'success'}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </MyStyle>
    );
  }
}
