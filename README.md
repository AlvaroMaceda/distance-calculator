Tool to calculate distances with Google Distance Matrix throught a csv file

## Installation and usage

Needs at least node 21, because of the use of fetch API.

`yarn install -g`

```
Usage: dcalculator --key 'your Google's distance matrix key here' --file 'path_of_destinations_file' [--mode 'driving|walking|bicycling|transit'] [--origin 'origin position']

Options:
  -o, --origin <text>  Text with the origin position
  -f, --file <file>    CSV with the destinations
  -k, --key <key>      Google distance matrix key
  -m, --mode <mode>    Mode of transport (choices: "driving", "walking", "bicycling", "transit")
  -h, --help           display help for command
```

The CSV with distances will need headers, a column "destination" and a column "origin" (capitalization is important). All additional headers will be output in the results CSV file. There are
some examples in the root directory. The column "origin" will take precedence over the command line parameter if it is not empty in the CSV.

The distance matrix key can be obtained in the [Google Cloud console](https://console.cloud.google.com/)

## Development

npm link -> to crete the link during development to the bin file

Tests of `DistanteCalculator` are pending
