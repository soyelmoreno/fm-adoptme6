import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";
/* could do this, but don't need to: global React ReactDOM */

/* 
Tools in this course:
- Prettier. npm i -D prettier. New file: /.prettierrc with just {}. Could also
  add this to scripts in package.json: "format": "prettier --write \"src/**
  /*.{js,jsx}\"" but the Prettier vscode extension is autoformatting on save, so
  no need. Go to settings (CTRL + ,) and make sure `format on save` and
  `Prettier: Require Config` are both checked. 

- ESLint. npm install -D eslint eslint-config-prettier Unopinionated version of
  ESLint. Config is in /.eslintrc.json. And add "lint" to scripts in
  package.json. Install ESLint vscode extension.

- Git. git init.

- Parcel. npm i -D parcel. In scripts: "dev": "parcel src/index.html"

- Can now delete unpkg.com script tags from index.html. Instead load react and
react-dom from npm like this: npm install react react-dom, and then import
them.

- Now that we have the Parcel bundler, can do npm run dev to start a local
  server. And move Pet into it's own file, then import it.

- Babel. Transpiler. (With Parcel 2 you don't have to do this.) Add /.babelrc
  with some config that allows us to use the most recent version of JSX. Install
  like this: npm install -D @babel/core @babel/preset-react

- Add browserslist to package.json. Check strings on browserslist.dev. Using
  'defaults' covers 92% of users. 
*/

/*
Once we start using React and JSX, we need to augment ESLint's capabilities so
that it can understand them. npm install -D eslint-plugin-import
eslint-plugin-jsx-a11y eslint-plugin-react. Also add some stuff to
.eslintrc.json: plugin:import/errors, plugin:react/recommended,
plugin:jsx-a11y/recommended, prettier
*/

/*
Tell ESLint that we're using React hooks. npm install -D
eslint-plugin-react-hooks. And add to extends array in scripts:
"plugin:react-hooks/recommended"
*/

/*
Make an animal dropdown so we can choose what kind of animal. Also make a breed
dropdown.
*/

/*
React Router. Uses route matching. Partial matching from left to right.
*/

/*
Class properties. Need to modify Babel configs. Woot.
npm i -D @babel/plugin-proposal-class-properties @babel/preset-env
@babel/eslint-parser@7.13.4
- @babel/plugin-proposal-class-properties: lets us use class properties
- @babel/preset-env
- @babel/eslint-parser: tells eslint how to handle class properties

So, instead of using a constructor and making this.state with tons of
properties, we can use class properties to skip the constructor, just put `state
=` in the class definition.
*/

/*
Manage state with onClick handlers. In a class component, to get `this` to work
correctly inside a class method, you need to tell it the context it's operating
in, aka, you need to define what `this` is. You can do that three ways: 
  - In JSX, append `.bind(this)` to onClick, like this: onClick =
    {this.handleClick.bind(this)}
  - Do pretty much the same thing in the class constructor, like this:
    this.handleClick = this.handleClick.bind(this);
  - But the easiest to make the method an arrow function. That's because arrow
    functions do not create their own `this`, instead they use the `this` from
    where they were created: this.handleClick = (event) => {}
*/

/*
Error boundaries: for unreliable APIs, nice to wrap in an <ErrorBoundary>
components. Note: can only do this from a class component.

Redirect on error: Click here to go back to home page, or wait five seconds. Set
state with redirect: true inside the componentDidCatch. In render(), just render
a <Redirect> component from react-router-dom;
*/

/*
Context: it's a sledgehammer, so don't use it all the time. It adds
indirection...something happened here but it was actually defined way over here.
Example: a theme, e.g., dark mode. It affects every component in your
application, a universal, global state for your application. Or if a user logs
in, you're gonna store that user information in Context, because almost every
component probably needs to know something about the user. Don't put stuff in
Context that only applies within a single component (e.g., which pet picture is
showing). Only global stuff that multiple components need.

Create a ThemeContext. Pass in a signature of expected types for Typescript. In
App, call useState with default theme string, get the returned them, then wrap
entire app in ThemeContext.Provider. This means that every component inside can
access this context. Avoids the need to do "prop-drilling"; passing props from
parent to child over and over again until the component that needs it can get
it.

You can have multiple contexts. Just wrap different components in different
<Theme.Provider>s.  Nearest ancestor wins. But basically never do this.

Cna also use inside a class component, just a little less convenient. See
Details.js. Wrap a component in a <ThemeContext.Consumer>
*/

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me ---</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              {/* Show a details page */}
              <Details />
            </Route>
            <Route path="/">
              {/* Search params page */}
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
