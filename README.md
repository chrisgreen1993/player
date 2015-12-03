# Player

Music player built with web technologies, leveraging [nw.js](nwjs.io) and [React](https://facebook.github.io/react/) and following the [Flux](https://facebook.github.io/flux/docs/overview.html) application architecture.

![player](player.png)

Implemented features:

* Library with filtering
* Play queue
* Shuffle
* Repeat
* Seek

Issues: [see here](https://github.com/chrisgreen1993/player/labels/high%20priority)

## Usage

#### Note: currently only tested on OSX

`git clone git@github.com:chrisgreen1993/player.git where/to/clone`

`cd where/to/clone`

`npm install`

Run tests:

`npm test`

Rebuild on changes:

`gulp dev`

Start app:

`gulp run`

Inside app, hit `F1` to reload the app and `F2` to display dev tools. (Although it should auto reload on changes anyway).
