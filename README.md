# 🚂 PDF-Compression-Engine

Compress the PDF files locally using Node.js, GhostScript and Docker. No more cloud tensions for private PDF(s). Your PDF would't even leave your PC while compressing.

## Tech Stack

**🖥️ Client:** HTML, TailwindCSS

**💿 Server:** Node, Express, Docker\*

_\*\* Docker is required for running the engine_

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd pdf-compress-engine
```

Build local docker image

```bash
  docker build -t pdf-compress-engine .
```

Start a container

```bash
  docker run -d -p 4000:4000 -v [Your desired output path]:/app/downloads --name pdf-compressor pdf-compress-engine
```

Visit the server URL in your browser

```bash
  http://localhost:4000
```

_\*\* Please keep the port `4000` to avoid CORS error_

_\*\* Please use an `absolute path` for output_

## Authors

- [@Sandeep](https://www.github.com/sandeep-shome)
