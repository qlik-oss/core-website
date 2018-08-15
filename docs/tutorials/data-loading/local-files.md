# Local files

In this tutorial, learn how to load data from local files, such as CSV files or Excel files, into
Qlik Associative Engine with a data load script.

!!! Note
    [halyard.js](https://github.com/qlik-oss/halyard.js) provides functionality to load different kinds of data
    into Qlik Associative Engine without having to write load scripts. This tutorial however focuses on direct use of
    load scripts in order to explain and show their potential.

## Prerequisites

To follow along in this tutorial, you should have basic understanding of Docker.

You need the following software installed:

* Git
* Docker
* docker-compose
* Node.js

!!! Note
    Shell commands should be run in a Bash shell.
    If you are using Windows, we recommend using Git Bash.

## Setup

To run the example code, clone the [qlik-oss/core-data-loading](https://github.com/qlik-oss/core-data-loading) Git
repository. Before you continue, look at the documentation to get familiar with the content and structure of
the repository.

For this example, you only need a single instance of Qlik Associative Engine. All necessary data files are mounted when
you start Qlik Associative Engine.

To begin, you must accept the `ACCEPT_EULA`.

Run the following command:

```sh
ACCEPT_EULA=<yes/no> docker-compose up -d
```

Now install dependencies:

```sh
npm install
```

## Sample data files

The data in this tutorial is loaded from the following files:

* [airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) -
  Headers on first row, comma-separated data
* [airports.xlsx](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.xlsx) -
  Headers on first row, MS Excel Open XML

The files are mounted into Qlik Associative Engine, and they are made available on
the file system that is visible from the container.

## Examples

### CSV file

In this example, use the [load-csv-file](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-csv-file)
load script to load data from the
[airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) file into Qlik Associative
Engine.

Script characteristics:

* Names the resulting table `Airports`.
* Loads data from all headers (`*` notation).
* Specifies that the file is in text format and `utf8` encoded.
* Sets the value delimiter to the `,` character.
* Uses embedded labels from the CSV file itself as field names, reading labels from the first line by default.

To load the data, run the following command:

```sh
npm start load-csv-file
```

The expected output is a list of airport entries based on the headers in the CSV file.

!!!Tip
    Take a look at the [code](https://github.com/qlik-oss/core-data-loading/blob/master/index.js)
    to see how you would invoke the load script using [enigma.js](https://github.com/qlik-oss/enigma.js/).

### Excel file

In this example, use the [load-xlsx-file](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-xlsx-file)
load script to load data from the
[airports.xlsx](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.xlsx) file into Qlik
Associative Engine. The file contains the same data as in the previous CSV example, but in `ooxml` format.

Script characteristics:

* Names the resulting table `Airports`.
* Loads data from all headers (`*` notation).
* Specifies that the file is in in Excel format (`ooxml`).
* Uses embedded labels from the Excel file itself as field names.
* Specifies that the table data is retrieved from the `Airports` sheet of the Excel file.

To load the data, run the following command:

```sh
npm start load-xlsx-file
```

The expected output is a list of airport entries based on the headers in the Microsoft Excel file.

### Subset of fields

In this example, use the
[load-subset-of-fields](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-subset-of-fields) script
to load a subset of the fields from the
[airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) file.

Before you run the script in this example, compare the _load-subset-of-fields_ script to the _load-csv-file_ script.
Notice that the `LOAD` statements are different. To load all fields, you can use the `*` notation. To load a subset
of fields, you explicitly list the headers from the data file. In this example,
the script explicitly lists `Airport`, `City`, `Country`, and `TimeZone`.

Script characteristics:

* Names the resulting table `Airports`.
* Loads data from explicitly listed headers: `Airport`, `City`, `Country`, and `TimeZone`.
* Specifies that the file is in text format and `utf8` encoded.
* Sets the value delimiter to the `,` character.
* Uses embedded labels from the CSV file itself as field names, reading labels from the first line by default.

To load the data, run the following command:

```sh
npm start load-subset-of-fields
```

The expected output is a list of airport entries consisting of only the explicitly listed headers in the CSV file.
The other fields are not loaded into engine memory.

### Renaming fields

In this example, use the
[load-renamed-fields](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-renamed-fields) script
to load a subset of fields and rename some of the fields by providing aliases for the header names.

To rename fields with a load script, use the `AS` keyword in the `LOAD` statement. In this example,
the `rowID` header is renamed to `ID`, `Airport` is renamed to `Name`, and `City` is left unchanged.
Other headers are not loaded.

Script characteristics:

* Names the resulting table `Airports`.
* Loads data from explicitly listed headers: `rowID`, `Airport`, and `City`.
* Renames the header `rowID` as `ID` and `Airport` as `Name`.
* Specifies that the file is in in Excel format (ooxml).
* Uses embedded labels from the Excel file itself as field names.
* Specifies that the table data is retrieved from the Airports sheet of the Excel file.

Run the following command:

```sh
npm start load-renamed-fields
```

The expected output is a list of airport entries, with the renamed fields,
with only the explicitly listed headers in the CSV file.
The other fields are not loaded into engine memory.
