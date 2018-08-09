# Loading data from simple files

This tutorial gives examples of how to write scripts to load data from simple files such as CSV and Excel files into
Qlik Associative Engine. It also shows some basic capabilities of load scripts.

!!! Note
    [halyard.js](https://github.com/qlik-oss/halyard.js) provides functionality to load different kinds of data
    into the engine without having to write load scripts. The tutorial however, focuses on direct use+ of load scripts
    in order to explain and show their potential.

## Prerequisites

To follow along in this tutorial, you should have basic understanding of Docker. You need Node.js and npm installed.

!!! Note
    In the examples that follow, all shell commands should be run in a Bash shell.
    If you are using Windows, we recommend using Git Bash.

## Git repository

To run the example code, clone the [qlik-oss/core-data-loading](https://github.com/qlik-oss/core-data-loading) git
repository. Check out the repo documentation to get familiar with the content and structure.

All data files are made available to the running engine instance by mounting the files into the docker container in
the provided [docker-compose.yml](https://github.com/qlik-oss/core-data-loading/blob/master/docker-compose.yml) file.

The examples also consist of several [script files](https://github.com/qlik-oss/core-data-loading/tree/master/scripts)
containing statements to load data into the data model of Qlik Associative Engine.

## Examples

### Setup

Below follows some sections describing how to run each example and what it achieves. Only one engine instance is needed
and it is started with all necessary data files mounted by running, from the repo root:

```sh
ACCEPT_EULA=<yes/no> docker-compose up -d
```

Change ACCEPT_EULA as applicable.

Now, install the Node.js dependencies by running, from the repo root:

```sh
npm install
```

### Data files

The examples uses a number of different data files:

File | Format  | Content
---- | ------- | -------
[airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) | <ul><li>Headers on first row<li>comma-separated data</ul> | TODO
[airports.xlsx](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.xlsx) | <ul><li>MS Excel Open XML</ul> | TODO

### Loading data from a CSV file

This example uses the [load-csv-file](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-csv-file)
load script to load data from the
[airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) file into Qlik Associative
Engine.

Characteristics of the script:

* Names the resulting table `Airports`
* Loads data from all headers (`*` notation)
* Specifies that the file is in text format and utf8 encoded
* Sets the value delimiter to the ',' character
* Uses embedded lables from the CSV file itself as field names

To run:

```sh
npm start load-csv-file
```

The exepected output is a list of all airports loaded with field names as given by the headers in the CSV file. Also
study the [code](https://github.com/qlik-oss/core-data-loading/blob/master/index.js) for invoking the load script using
[enigma.js](https://github.com/qlik-oss/enigma.js/).

### Loading data from an Excel file

This example is similar to the previous example, but now uses the
[load-xlsx-file](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-xlsx-file) load script to load
the same airport data from the
[airports.xlsx]((https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.xlsx)) Excel file instead.

Characteristics of the script:

* Names the resulting table `Airports`
* Loads data from all headers (`*` notation)
* Specifies that the file is in in Excel format (`ooxml`)
* Uses embedded lables from the CSV file itself as field names
* Specifies that the table data shall be retrieved from the `Airports` sheet of the Excel file

To run:

```sh
npm start load-xlsx-file
```

TODO: Exp output.


### Loading a subset of fields

This example shows how the
[load-subset-of-fields](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-subset-of-fields) script
only loads a subset of the fields from the
[airports.csv](https://github.com/qlik-oss/core-data-loading/blob/master/data/airports.csv) file.

Using the `*` notation in the `LOAD` statement is convenient when loading all data but Sometimes you may want to only a
subset of the data, specifying which fields to load.

The script achieves this buy _not_ using the `*` notation and instead explicitly lists the headers from the CSV file to
load into the engine as fields of the same name. In this example, the fields loaded are `Airport`, `City`, `Country`,
and `TimeZone`.

To run:

```sh
npm start load-subset-of-fields
```

TODO: Exp output.

### Loading data and renaming fields

This example shows how the
[load-renamed-fields](https://github.com/qlik-oss/core-data-loading/blob/master/scripts/load-renamed-fields) renames
some fields and does not use the header names in the data file.

The script achieves this by using using the `AS` keyword in the `LOAD` statement. In this example, the `rowID` header is
renamed to `ID`, `Airport` is renamed to `Name`, and `City` is left unchanged. Other headers are not loaded.

To run:

```sh
npm start load-renamed-fields
```

TODO: Exp output.


## Next steps

TODO
