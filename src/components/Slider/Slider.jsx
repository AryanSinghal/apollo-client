import PropTypes from 'prop-types';
import React from 'react';
import { PUBLIC_IMAGE_FOLDER, TOTAL } from '../../configs/constants';
import { getNextRoundRobin, getRandomNumber } from '../../lib/utils/math';
import ImageStyle from './style';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: -1,
    };
  }

  componentDidMount() {
    const { duration, random } = this.props;
    let { current } = this.state;
    this.id = setInterval(() => {
      if (random) {
        current = getRandomNumber(TOTAL);
      } else {
        current = getNextRoundRobin(TOTAL, current);
      }
      this.setState({ current });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const { current } = this.state;
    const { altText, height } = this.props;
    const { banners, defaultBanner } = this.props;
    if (current === -1) {
      return (
        <>
          <div align="center">
            <ImageStyle src={`${PUBLIC_IMAGE_FOLDER}${defaultBanner}`} alt={altText} title={defaultBanner} height={height} />
          </div>
        </>
      );
    }
    return (
      <>
        <div align="center">
          <ImageStyle src={`${PUBLIC_IMAGE_FOLDER}${banners[current]}`} alt={altText} title={banners[current]} height={height} />
        </div>
      </>
    );
  }
}

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.array.isRequired,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultBanner: 'banners/default.png',
  duration: 2000,
  height: 200,
  random: false,
};
export default Slider;
