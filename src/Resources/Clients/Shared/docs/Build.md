# Build Of This Project

_CRA_

The create react app build simply uses the react-scripts build option
which gives us an optimized gzipped minifed and uglifed build.

This project does'nt make use of the React.lazy and dynamic imports
(code splitting), because as is, it is not a big project so if you
want to make a more optimized build you can learn more about it
[here](https://reactjs.org/docs/code-splitting.html)

_NEXT_

The next build also uses the default build given by the library
which gives us an optimized gzipped minifed and uglifed build in the `.next` folder.

_WEBPACK_

The webpack build is done by running the webpack command on production mode and it uses the settings from the `webpack.config.json`. This command also gives us an optimized gzipped minifed and uglifed build.
