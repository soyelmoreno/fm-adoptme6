import ReactDOM from "react-dom";
import Pet from "./Pet";
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

const App = () => {
  return (
    <div>
      <h1>Adopt Me ---</h1>
      <Pet name="Luna" animal="Dog" breed="Havanese" />
      <Pet name="Pepper" animal="Bird" breed="Cockatiel" />
      <Pet name="Sudo" animal="Dog" breed="Wheaten Terrier" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
