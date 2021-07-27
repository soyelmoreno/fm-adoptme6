import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

// Want to put ErrorBoundary component above (in the hierarchy).

/* A class component */
class Details extends Component {
  state = { loading: true };

  // Calls when the React component is rendered for the first time
  async componentDidMount() {
    // this refers to the Details component
    // props are passed down from parent
    // match, params, come from React Router. Lets you get the :id.
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    // We could do this:
    // this.setState({
    //   loading: false,
    //   name: json.pets[0].name,
    //   animal: json.pets[0].animal,
    //   breed: json.pets[0].breed,
    //   description: json.pets[0].description,
    //   city: json.pets[0].city,
    // });

    // But a bit verbose and cumbersome. Since our properties match those from
    // the API, just use Object.assign to merge them all together
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    const { animal, breed, city, state, description, name, images } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          {/* Could have done this: <h2>{animal} - {breed} - {city}, {state}</h2> */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
