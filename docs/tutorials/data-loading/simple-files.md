# Simple files

This tutorial gives examples of how to write scripts to load data from simple files such as CSV and Excel files into
Qlik Associative Engine. It also shows some basic capabilities of load scripts.

!!! Note
    [halyard.js](https://github.com/qlik-oss/halyard.js) provides functionality to load different kinds of data
    into the engine without having to write load scripts. The tutorial however, focuses on direct use+ of load scripts
    in order to explain and show their potential.

## Prerequisites

To follow along in this tutorial, you should have basic understanding of Docker.

You need the following software installed:

* git
* Docker
* docker-compose
* Node.js

## Setup

To run the example code, clone the [qlik-oss/core-data-loading](https://github.com/qlik-oss/core-data-loading) git
repository. Check out the repo documentation to get familiar with the content and structure.

Only one instance of Qlik Associative Engine is needed and it is started with all necessary data files mounted.
Change `ACCEPT_EULA` as applicable and run:

```sh
ACCEPT_EULA=<yes/no> docker-compose up -d
```

Now install dependencies:

```sh
npm install
```

## Sample data files

The examples use these files to load data from:

* [airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) - Headers on first row, comma-separated data
* [airports.xlsx](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.xlsx) - Headers on first row, MS Excel Open XML

## Examples

### CSV file

This example uses the [load-csv-file](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-csv-file)
load script to load data from the
[airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) file into Qlik Associative
Engine.

Script characteristics:

* Names the resulting table `Airports`
* Loads data from all headers (`*` notation)
* Specifies that the file is in text format and `utf8` encoded
* Sets the value delimiter to the `,` character
* Uses embedded lables from the CSV file itself as field names

```sh
npm start load-csv-file
```

The exepected output is a list of all airports loaded with field names as given by the headers in the CSV file. Also
study the [code](https://github.com/qlik-oss/core-data-loading/blob/master/index.js) for invoking the load script using
[enigma.js](https://github.com/qlik-oss/enigma.js/).

### Excel file

This example is similar to the previous example, but now uses the
[load-xlsx-file](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-xlsx-file) load script to load
the same airport data from the
[airports.xlsx]((https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.xlsx)) Excel file instead.

Script characteristics:

* Names the resulting table `Airports`
* Loads data from all headers (`*` notation)
* Specifies that the file is in in Excel format (`ooxml`)
* Uses embedded lables from the CSV file itself as field names
* Specifies that the table data shall be retrieved from the `Airports` sheet of the Excel file

```sh
npm start load-xlsx-file
```

The expected output is the list of all airports just as in the previous example.

### Subset of fields

This example shows how the
[load-subset-of-fields](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-subset-of-fields) script
only loads a subset of the fields from the
[airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) file.

Using the `*` notation in the `LOAD` statement is convenient when loading all data but sometimes you may want to only
load a subset of the data, specifying which fields to load.

The script achieves this buy _not_ using the `*` notation and instead explicitly lists the headers from the CSV file to
load into the engine as fields of the same name. In this example, the fields loaded are `Airport`, `City`, `Country`,
and `TimeZone`.

```sh
npm start load-subset-of-fields
```

The expected output is the list of all airports but only the specified fields available, the other fields have not been
loaded into engine memory.

### Renaming fields

This example shows how the
[load-renamed-fields](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-renamed-fields) renames
some fields and does not use the header names in the data file.

The script achieves this by using using the `AS` keyword in the `LOAD` statement. In this example, the `rowID` header is
renamed to `ID`, `Airport` is renamed to `Name`, and `City` is left unchanged. Other headers are not loaded.

```sh
npm start load-renamed-fields
```

The expected output is the list of airports with fields renamed to `ID` and `Name`.

## Next steps

TODO
