import { createContext } from "react";

// You can provide a default value for context...similar to hooks. In fact you
// should almost always do this. We're gonna give it a hook as a default value.
// We pass an array with a string and an empty function. We do that for
// Typescript, so that it can infer what types are supposed to be passed in (in
// this case, an array with a string and a function, just like what gets
// returned from useState()).
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
