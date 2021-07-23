Tool to calculate distances with Google Distance Matrix throught a csv file

## Installation and usage

npm install -g

dcalculator --key 'your Google's distance matrix key here' --origin '420, Paper St. Wilmington, DE 19886' --destinations 'path_of_destinations_file'

The CSV with distances will need headers and a column with the header "destination" (capitalization is important). All additional headers will be output in the results CSV file.

TO-DO: what to do with origin? I think the one passed in command line is ignored

## Development

npm link -> to crete the link during development to the bin file

