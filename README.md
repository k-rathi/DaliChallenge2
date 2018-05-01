###README

###DALI Challenge 2 - Mappy

This App was built using Create React App. Dependencies are listed in package.json.


## Instructions

To run development server, run

`yarn start`. 

To bundle and minify the javascript and css for production builds, run

`yarn build`.

There will be a static build in the `/builds` folder that can be served through any webhosting setup.

## Hosting and Complications

Due to issues with the members.json being deployed on an http server rather than https, had to use something other than github pages for hosting.

If you want to see what the https hosting looks like with the static local .json, i deployed the github pages here: <https://k-rathi.github.io/DaliChallenge2/>

To see a working http server deployment, I also used surge to deploy one with the .json data here: <http://mappy-challenge.surge.sh>

Components have been split up into a overarching container (App.js) and several presentational components (map.jsx, Fixed.jsx, ModalContainer.jsx)

I have included the .json file in case https deployment is preferred. To rely on the local data, you can go to App.js and comment out the following lines:
```
7 // import * as members from './members.json';

35     // this.setState({datasent: members, data: members});
36     // Modal.setAppElement('body');

```
and comment out lines 38-46 in componentDidMount.
