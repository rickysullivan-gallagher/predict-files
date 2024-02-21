# Predict Files CLI

A node.js-based command-line interface (CLI) tool to predict the types of files using [Magika](https://google.github.io/magika/).

## Installation

Before using the CLI, make sure you have [Node.js](https://nodejs.org/) installed on your machine.

1. Clone this repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd predict-files
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

Run the CLI using the following command:

```bash
npm run predict -- <files...>
```

Replace `<files...>` with the paths to the files you want to predict.

### Options

- `-p, --pretty`: Pretty print the output.
- `--format <format>`: Output format (`json` or `text`). Default format is `json`.

### Examples

Predict the types of a file:

```bash
❯ npm run predict -- files/cat

[
  { file: 'files/cat', prediction: { label: 'gif', score: 1 } }
]

```

Predict the types of multiple files and pretty print the output:

```bash
❯ npm run predict -- -p files/table files/zippedcat

[
  {
    "file": "files/table",
    "prediction": {
      "label": "csv",
      "score": 0.9918680787086487
    }
  },
  {
    "file": "files/zippedcat",
    "prediction": {
      "label": "zip",
      "score": 0.9999768733978271
    }
  }
]

```

Predict the types of all files in a folder and output in text format:

```bash
❯ npm run predict -- --format text files/*

File: files/cat
Label: gif
Score: 1
---
File: files/demo
Label: txt
Score: 1
---
File: files/table
Label: csv
Score: 0.9918680787086487
---
File: files/zippedcat
Label: zip
Score: 0.9999768733978271

```


## License

This project is licensed under the [MIT License](LICENSE).