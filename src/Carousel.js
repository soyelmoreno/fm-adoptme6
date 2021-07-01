import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // Default props
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };
  // What is static? Can do Carousel.defaultProps. Callable on the abstract
  // class.

  // handleIndexClick = (event) {
  // Use an arrow function so that `this` is set to this class, not from where
  // it gets called.
  handleIndexClick = (event) => {
    this.setState({
      // Coerce string from DOM element attribute into a number
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state; // mutable (changeable)
    const { images } = this.props; // immutable, coming from parents, read-only

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              data-index={index}
              // onClick={this.handleIndexClick} // doesn't work
              onClick={this.handleIndexClick.bind(this)}
              className={index === active ? active : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
