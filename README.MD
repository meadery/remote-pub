# Ye ~Olde~ Moderne Remote Pub
Web app for running a remote pub.

Currently running at: https://the-ponderous-snail.herokuapp.com/

## Development
Built with typescript on node.

### Installation
1. clone repo
2. `npm install`

### Running locally
`npm run dev`

### Testing
`npm test && npm run lint`
if linting fails:
`npm run lint-fix`

### Running & Testing without Node (using Docker)
To run the tests: `docker-compose run remote-pub npm test`
To run a local server: `docker-compose run remote-pub`

## Design goals
(These are a bit work in progress).

 * Be portable - so others can set one up.
 * The pub should not run things - it enables people to come together but chat/games/whatever is delegated to other services.
 * Provide a nice developer experience - we want it to be easy to contribute to.
