## Eleventy

This HTML template is built with Eleventy. Look at the [Eleventy documentation](https://www.11ty.dev/docs/) to learn more.

## Usage

First, make sure to install the dependencies by installing npm dependencies.

```bash
npm install
```

To run development server, simply run command below.

```bash
npm run dev
```

The app should be running on `http://localhost:3000`.

To build the template, run command below.

```bash
npm run build
```

The built result can be found in `_site` directory and ready to deploy on any static hosting server.

## (Optional) Usage with Lando

[Lando](https://lando.dev/) is local development environment DevOps tool, built on Docker. The repository includes `.lando.yml` config file and is already pre-scripted.

Assumed Lando is installed, simply run command below.

```
lando start
```

Wait for the build process, and if everything goes well, the template should be virtually hosted on `http://demo-kaipia.lndo.site`. That's it.
