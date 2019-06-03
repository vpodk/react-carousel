import React from 'react';
import './App.css';

const IMAGES = [
  "https://images.freeimages.com/images/large-previews/05e/on-the-road-6-1384796.jpg",
  "https://images.freeimages.com/images/large-previews/535/natural-wonders-1400924.jpg",
  "https://images.freeimages.com/images/large-previews/89a/one-tree-hill-1360813.jpg",
  "https://images.freeimages.com/images/large-previews/6e2/mountain-reflection-1386071.jpg",
  "https://images.freeimages.com/images/large-previews/4e9/lostpond-1364354.jpg"
];

class Carousel extends React.Component {
  constructor (props) {
    super(props);

    this.state = { currentImageIndex: 0 };

    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.nextSlide, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  previousSlide () {
    const lastIndex = IMAGES.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({ currentImageIndex: index });
  }

  nextSlide () {
    const lastIndex = IMAGES.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({ currentImageIndex: index });
  }

  render () {
    return (
      <div className="carousel">
        <Arrow direction="left" clickFunction={ this.previousSlide } />
        <ImageSlide url={ IMAGES[this.state.currentImageIndex] } />
        <Arrow direction="right" clickFunction={ this.nextSlide } />
      </div>
    );
  }
}

const Arrow = ({ direction, clickFunction }) => (
  <div
    className={ `slide-arrow ${direction}` }
    onClick={ clickFunction }>
    { 'left' === direction ? '◀' : '▶' }
  </div>
);

const ImageSlide = ({ url }) => {
  const styles = { backgroundImage: `url(${url})` };

  return (
    <div className="image-slide" style={styles}></div>
  );
}

export default Carousel;
