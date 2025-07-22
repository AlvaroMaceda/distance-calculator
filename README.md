Tool to calculate distances with Google Distance Matrix throught a csv file

## Installation and usage

Needs at least node 21, because of the use of fetch API.

To install the package globally, run:

```bash
npm install -g distance-calculator
```
or

```bash
yarn global add distance-calculator
```
To use the tool, you can run the following command in your terminal:

```bash
Usage: dcalculator --key 'your Google's distance matrix key here' --file 'path_of_destinations_file' [--mode 'driving|walking|bicycling|transit'] [--origin 'origin position']

Options:
  -o, --origin <text>  Text with the origin position
  -f, --file <file>    CSV with the destinations
  -k, --key <key>      Google distance matrix key
  -m, --mode <mode>    Mode of transport (choices: "driving", "walking", "bicycling", "transit")
  -h, --help           display help for command
```

The CSV with distances will need headers, a column "destination" and a column "origin"
(capitalization is important). All additional headers will be output in the results CSV file.
There are some examples in the root directory. The column "origin" will take precedence
over the command line parameter if it is not empty in the CSV.

The distance matrix key can be obtained in the [Google Cloud console](https://console.cloud.google.com/)

## Development

`npm link` -> to create the link during development to the bin file

You can run the tool with `npm start -- param1 param2 ... ` or `yarn start param1 param 2 ...` in the root directory.

Tests of `DistanteCalculator` are pending
