Tool to calculate distances with Google Distance Matrix throught a csv file

## Installation and usage

Needs at least node 21, because of the use of fetch API.

`yarn install -g`

```
Usage: index dcalculator --key 'your Google's distance matrix key here' --file 'path_of_destinations_file' [--mode 'driving|walking|bicycling|transit'] [--origin 'origin position']

Options:
  -o, --origin <text>  Text with the origin position
  -f, --file <file>    CSV with the destinations
  -k, --key <key>      Google distance matrix key
  -m, --mode <mode>    Mode of transport (choices: "driving", "walking", "bicycling", "transit")
  -h, --help           display help for command
```

The CSV with distances will need headers, a column "destination" and a column "origin" (capitalization is important). All additional headers will be output in the results CSV file.

It's planned to allow an `--origin` parameter in command line to calculate all distances from that origin, but that's not done yet.

Tests of `DistanteCalculator` are pending

## Development

npm link -> to crete the link during development to the bin file

