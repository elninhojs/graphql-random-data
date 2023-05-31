# GraphQL random data

This is a GraphQL API on top of [Random data api](https://random-data-api.com/documentation)

## Useful commands (inside vscode dev container)

Start a mock api usign [flat-white-mock](https://github.com/elninhojs/flat-white/)

```sh
npm run start:mock
```

Starting the dev instance
```sh
npm run start:dev
```

Starting prod instance 
```sh
npm run start:prod
```

Testing it 

```sh
npm test
```

## Useful commands (dockerized)

Building the dev version
```sh
docker build --target dev -t graphql-random-data:dev .
```

Building the production version
```sh
docker build --target production -t graphql-random-data:production .
```

Starting dockerized dev version
```sh
docker run --network="host" graphql-random-data:dev
```

Starting dockerized production version
```sh
docker run --network="host" graphql-random-data:production
```
## Release
 
Under construction...