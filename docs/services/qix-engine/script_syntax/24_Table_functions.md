# Table functions

The table functions return information about the data table which is currently being read. If no table name is specified and the function is used within a LOAD statement, the current table is assumed.

All functions can be used in the data load script, while only NoOfRows can be used in a chart expression.
## FieldName

The  **FieldName** script function returns the name of the field with the specified number
within a previously loaded table. If the function is used within a
 **LOAD** statement, it must not reference the table currently being loaded.

`FieldName(field_number, table_name)`

| Argument      | Description                                           |
| ------------- | ----------------------------------------------------- |
| field_number  | The field number of the field you want to reference.  |
| table_name    | The table containing the field you want to reference. |

**Example:**

`LET a = FieldName(4,'tab1');`

## FieldNumber

The **FieldNumber** script function returns the number of a specified field within a
previously loaded table. If the function is used within a
 **LOAD** statement, it must not reference the table currently being loaded.

`FieldNumber(field_name, table_name)`

| Argument    | Description                                 |
| ----------- | ------------------------------------------- |
| field_name  | The name of the field.                      |
| table_name  | The name of the table containing the field. |

If the field field_name does not exist in table_name, or table_name
does not exist, the function returns 0.
**Example:**

`LET a = FieldNumber('Customer','tab1');`

## NoOfFields

The **NoOfFields**  script function returns the number of fields in a previously loaded
table. If the function is used within a **LOAD** statement, it must not reference the table currently being loaded.

`NoOfFields(table_name)`

| Argument    | Description            |
| ----------- | ---------------------- |
| table_name  | The name of the table. |

**Example:**

`LET a = NoOfFields('tab1');`

## NoOfRows

The **NoOfRows** function returns the number of rows (records) in a previously loaded
table. If the function is used within a
 **LOAD** statement, it must not reference the table currently being loaded.

`NoOfRows(table_name)`

| Argument    | Description            |
| ----------- | ---------------------- |
| table_name  | The name of the table. |

**Example!:**

`LET a = NoOfRows('tab1');`

## NoOfTables

This script function returns the number of tables previously loaded.

`NoOfTables()`

## TableName

This script function returns the name of the table with the specified
number.

`TableName(table_number)`

## TableNumber

This script function returns the number of the specified table. The
first table has number 0.

If table_name does not exist, NULL is returned.

`TableNumber(table_name)`

In this example, we want to create a table with information about the
tables and fields that have been loaded.

First we load some sample data. This creates the two tables that will be
used to illustrate the table functions described in this
section.

```
Characters:
Load Chr(RecNo()+Ord('A')-1) as Alpha, RecNo() as Num
autogenerate 26;

ASCII:
Load if(RecNo()\>=65 and
  RecNo()\<=90,RecNo()-64) as Num, 
  Chr(RecNo()) as AsciiAlpha, 
  RecNo() as AsciiNum 
autogenerate 255 
  Where (RecNo()\>=32 and RecNo()\<=126) or RecNo()\>=160 ;
```

Next, we iterate through the tables that have been loaded, using the
 **NoOfTables** function, and then through the fields of each table, using the
 **NoOfFields** function, and load information using the table
functions.

```
// Iterate through the loaded tables 
For t = 0 to NoOfTables() - 1

// Iterate through the fields of table 
For f = 1 to NoOfFields(TableName($(t))) 
  Tables: 
  Load 
    TableName($(t)) as Table,
    TableNumber(TableName($(t))) as TableNo, 
    NoOfRows(TableName($(t))) as TableRows, 
    FieldName($(f),TableName($(t))) as Field,
    FieldNumber(FieldName($(f), TableName($(t))), TableName($(t))) as FieldNo
    Autogenerate 1; 
  Next f 
Next t;
```

The resulting table Tables will look like this:

| Table      | TableNo | TableRows | Field      | FieldNo |
| ---------- | ------- | --------- | ---------- | ------- |
| Characters | 0       | 26        | Alpha      | 1       |
| Characters | 0       | 26        | Num        | 2       |
| ASCII      | 1       | 191       | Num        | 1       |
| ASCII      | 1       | 191       | AsciiAlpha | 2       |
| ASCII      | 1       | 191       | AsciiNum   | 3       |
