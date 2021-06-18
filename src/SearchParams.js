import { useState } from "react";

const SearchParams = () => {
  // useState() returns a tuple with a string and a dispatch method:
  // const locationTuple = useState("Seattle, WA");
  // const location = locationTuple[0];
  // const setLocation = locationTuple[1];
  // So, most of the time we destructure the array:
  const [location, setLocation] = useState("Seattle, WA");

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
