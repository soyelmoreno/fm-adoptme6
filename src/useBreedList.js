import { useState, useEffect } from "react";

// Once we load a set of breeds, save it in this cache, so we don't have to
// re-fetch it.
const localCache = {};

/** Custom hook (not that special, just a function that calls other hooks) */
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  // status is an enumerate type. String that represents one of a few statuses.
  // unloaded, loading, loaded.
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
