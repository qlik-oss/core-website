# Script Regular Statements

Regular statements are typically used for manipulating data in one way
or another. These statements may be written over any number of lines in
the script and must always be terminated by a semicolon, ";".

All script keywords can be typed with any combination of lower case and
upper case characters. Field and variable names used in the statements
are however case
sensitive.

## Alias

The **alias** statement is used for setting an alias according to which a field will
be renamed whenever it occurs in the script that follows.

**Syntax**:
`aliasname {,fieldname as aliasname}`

| Argument  | Description                               |
| --------- | ----------------------------------------- |
| fieldname | The name of the field in your source data |
| aliasname | An alias name you want to use instead     |

**Example**:

| Example | Result |
| ------- |------- |
| Alias ID_N as NameID; | |
| Alias A as Name, B as Number, C as Date; | The name changes defined through this statement are used on all subsequent SELECT and LOAD statements. A new alias can be defined for a field name by a new alias statement at any subsequent position in the script. |

See also [Load](##load) and [Select](##select)

## AutoNumber

This statement creates a unique integer value for each distinct
evaluated value in a field encountered during the script execution.

You can also use the *autonumber - script function* function inside a LOAD statement,
but this has some limitations when you want to use an optimized load.
You can create an optimized load by loading the data
from a QVD file first, and then using the AutoNumber statement to convert values to symbol keys.

**Syntax**:

`AutoNumber *fieldlist [Using namespace] ]`

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| *fieldlist | A comma-separated list of the fields where the values should be replaced by a symbol key. You can use wildcard characters ? and `*` in the field names to include all fields with matching names. You can also use * to include all fields. You need to quote field names when wildcards are used. |
| namespace | Using namespace is optional. You can use this option if you want to create a namespace, where identical values in different fields share the same key. If you do not use this option all fields will have a separate key index. |

When you have several **LOAD** statements in the script,
you need to place the **AutoNumber** statement after the final **LOAD** statement.

**Example**:

In this example we replace field values with symbol table keys using the **AutoNumber** statement to conserve memory.
The example is brief for demonstration purpose,
but would be meaningful with a table containing a large number of rows.

| Region | Year | Month | Sales |
| ------ | ---- | ----- | ----- |
| North  | 2014 | May   | 245   |
| North  | 2014 | May   | 347   |
| North  | 2014 | June  | 127   |
| South  | 2014 | June  | 645   |
| South  | 2013 | May   | 367   |
| South  | 2013 | May   | 221   |

The source data is loaded using inline data. Then we add an
 **AutoNumber**
statement with the Region, Year and Month
fields.

```code
RegionSales:
LOAD * INLINE
[ Region, Year, Month, Sales
North, 2014, May, 245
North, 2014, May, 347
North, 2014, June, 127
South, 2014, June, 645
South, 2013, May, 367
South, 2013, May, 221
];

AutoNumber Region, Year, Month;
```

The resulting table would look like this:

| Region | Year | Month | Sales |
| ------ | ---- | ----- | ----- |
| 1      | 2    | 1     | 245   |
| 1      | 2    | 1     | 347   |
| 1      | 2    | 2     | 127   |
| 2      | 2    | 2     | 645   |
| 2      | 1    | 1     | 367   |
| 2      | 1    | 1     | 221   |

## Binary

The **binary**
statement is used for loading the data from another app or
QlikView 11.2 or earlier document, including section access data. Other
elements of the app are not included, for example, sheets, stories,
visualizations, master items or variables.

Only one binary statement is allowed in the script. The binary statement
must be the first statement of the script, even before the SET
statements usually located at the beginning of the
script.

**Syntax**:

`[path] filename`

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| filename | The name of the file, including the file extension .qvw or .qvf. |
| path | The path to the file which should be a reference to a folder data connection. This is required if the file is not located in the Qlik Associative Engine working directory. |

**Examples**:

| Example | Result |
| ------- | ------ |
| Binary lib://MyData/customer.qvw; | In this example,  must be in located in the folder connected to the MyData data connection. | | Binary customer.qvf;              | In this example, customer.qvf must be in located in the working directory.                   |
| Binary c:\\qv\\customer.qvw;      | This example using an absolute file path will only work in legacy scripting mode.                                                                                                                      |

## Comment table

Provides a way of displaying the table comments (metadata) from
databases or spreadsheets.

Table names not present in the app are ignored. If multiple occurrences
of a table name are found, the last value is used. The keyword can be
used to read comments from a data source.

**Syntax**:

`comment [tables] tablelist using mapname`

`comment [table] tablename with comment`

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| tablelist | `(table{,table})` |
| mapname | The name of a mapping table previously read in a mapping **LOAD** or mapping **SELECT** statement. |
| tablename | The name of the table that should be commented. |
| comment | The comment that should be added to the table. |

**Example 1**:

```code
Commentmap:

mapping LOAD * inline [

a,b

Main,This is the fact table

Currencies, Currency helper table

];

comment tables using Commentmap;
```

**Example 2**:

`comment table Main with 'Main fact table';`

## Comment field

Provides a way of displaying the field comments (metadata) from
databases and spreadsheets. Field names not present in the app will be
ignored. If multiple occurrences of a field name are found, the last
value is used.

**Syntax**:

`comment [fields] *fieldlist using mapname`

`comment [field] fieldname with comment`

The map table used should have two columns, the first containing field
names and the second the
comments.

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| *fieldlist | A comma separated list of the fields to be commented. Using * as field list indicates all fields. The wildcard characters `*` and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used.|
| mapname | The name of a mapping table previously read in a mapping **LOAD** or mapping **SELECT** statement. |
| fieldname | The name of the field that should be commented. |
| comment | The comment that should be added to the table. |

**Example 1**:

```code
commentmap:

mapping LOAD * inline [

a,b

Alpha,This field contains text values

Num,This field contains numeric values

];

comment fields using commentmap;
```

**Example 2**:

```code
comment field Alpha with AFieldContainingCharacters;

comment field Num with '*A field containing numbers';

comment Gamma with 'Mickey Mouse field';
```

## Connect

The
 **CONNECT**
statement is used to define access to a general database
through the OLE DB/ODBC interface. For ODBC, the data source first needs
to be specified using the ODBC administrator.

**Syntax**:

`ODBC CONNECT TO connect-string`

`OLEDB CONNECT TO connect-string`

`CUSTOM CONNECT TO connect-string`

`LIB CONNECT TO connection`

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| connect-string | `connect-string ::= datasourcename { ; conn-spec-item }`<br> The connection string is the data source name and an optional list of one or more connection specification items. If the data source name contains blanks, or if any connection specification items are listed, the connection string must be enclosed by quotation marks.</br><p>**datasourcename** must be a defined ODBC data source or a string that defines an OLE DB provider.<p>`conn-spec-item ::=DBQ=database_specifier |DriverID=driver_specifier |UID=userid |PWD=password`</p>The possible connection specification items may differ between different databases. For some databases, also other items than the above are possible. For OLE DB, some of the connection specific items are mandatory and not optional. |
| connection | The name of a data connection stored in the data load editor. |

If the **ODBC** is placed before **CONNECT** ,
the ODBC interface will be used; else, OLE DB will be used.

Using **LIB CONNECT TO** connects to a database using a stored data connection.

**Example 1**:

```code
ODBC CONNECT TO 'Sales

DBQ=C:\Program Files\Access\Samples\Sales.mdb';
```

The data source defined through this statement is used by subsequent Select (SQL) statements,
until a new CONNECT statement is made.

**Example 2**:

`LIB CONNECT TO 'MyDataConnection';`

## Declare

The **Declare**
statement is used to create field and group definitions, where you can
define relations between fields or functions. A set of field definitions
can be used to automatically generate derived fields, which can be used
as dimensions. For example, you can create a calendar definition, and
use that to generate related dimensions, such as year, month, week and
day, from a date field.

You can use **Declare**
to either set up a new field definition, or to create a field definition
based on an already existing
definition.

### Setting up a new field definition

**Syntax**:

`definition_name: Declare [Field[s]] Definition [Tagged tag_list ] [Parameters parameter_list ] Fields field_list`

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| definition_name | Name of the field definition, ended with a colon. |
| tag_list | A comma separated list of tags to apply to fields derived from the field definition. Applying tags is optional, but if you do not apply tags that are used to specify sort order, such as $date, $numeric or $text, the derived field will be sorted by load order as default. |
| parameter_list | A comma separated list of parameters. A parameter is defined in the form `name=value` and is assigned a start value, which can be overridden when a field definition is re-used. Optional. |
| field_list | A comma separated list of fields to generate when the field definition is used. A field is defined in the form `<expression>` **As** _field_name_ tagged _tag_. Use $1 to reference the data field from which the derived fields should be generated. |

**Example**:

```code
Calendar:
DECLARE FIELD DEFINITION TAGGED '$date'
   Parameters
      first_month_of_year = 1
   Fields
      Year($1) As Year Tagged ('$numeric'),
      Month($1) as Month Tagged ('$numeric'),
      Date($1) as Date Tagged ('$date'),
      Week($1) as Week Tagged ('$numeric'),
      Weekday($1) as Weekday Tagged ('$numeric'),
      DayNumberOfYear($1, first_month_of_year) as DayNumberOfYear Tagged ('$numeric')
;
```

The calendar is now defined, and you can apply it to the date fields that have been loaded,
in this case OrderDate and ShippingDate, using a **Derive** clause.

### Re-using an existing field definition

**Syntax**:

`<definition name>: Declare [Field][s] Definition  Using <existing_definition>  [With <parameter_assignment> ]`

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| definition_name | Name of the field definition, ended with a colon. |
| existing_definition | The field definition to re-use when creating the new field definition. The new field definition will function the same way as the definition it is based on, with the exception if you use parameter_assignment to change a value used in the field expressions. |
| parameter_assignment | A comma separated list of parameter assignments. A parameter assignment is defined in the form name=value and overrides the parameter value that is set in the base field definition. Optional. |

**Example**:

In this example we re-use the calendar definition that was created in the previous example.
In this case we want to use a fiscal year that starts in April.
This is achieved by assigning the value 4 to the first_month_of_year parameter,
which will affect the DayNumberOfYear field that is defined.

The example assumes that you use the sample data and field definition from the previous example.

```code
MyCalendar:
DECLARE FIELD DEFINITION USING Calendar WITH first_month_of_year=4;

DERIVE FIELDS FROM FIELDS OrderDate,ShippingDate USING MyCalendar;
```

When you have reloaded the data script, the generated fields are available in the sheet editor,
with names OrderDate.MyCalendar.* and ShippingDate.MyCalendar.*.

See also [Derive](##derive).

## Derive

The **Derive** statement is used to generate derived fields based on a field definition created with a  **Declare** statement.
You can either specify which data fields to derive fields for, or derive them explicitly or implicitly based on field tags.

**Syntax**:

`Derive [Field[s]] From [Field[s]] field_list Using definition`

`Derive [Field[s]] From Explicit [Tag[s]] tag_list Using definition`

`Derive [Field[s]] From Implicit [Tag[s]] Using definition`

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| definition | Name of the field definition to use when deriving fields. |
| field_list | A comma separated list of data fields from which the derived fields should be generated, based on the field definition. The data fields should be fields you have already loaded in the script. |
| tag_list | A comma separated list of tags. Derived fields will be generated for all data fields with any of the listed tags. |

**Examples**:

- Derive fields for specific data fields. In this case we specify the OrderDate and ShippingDate fields.

```code
DERIVE FIELDS FROM FIELDS OrderDate,ShippingDate USING Calendar;
```

- Derive fields for all fields with a specific tag. In this case we derive fields based on Calendar for all fields with

a $date tag.

```code
DERIVE FIELDS FROM EXPLICIT TAGS '$date' USING Calendar;
```

- Derive fields for all fields with the field definition tag.

In this case we derive fields for all data fields with the same tag
as the Calendar field definition, which in this case is $date.

```code
DERIVE FIELDS FROM IMPLICIT TAG USING Calendar;
```

See also [Declare](##declare)

## Direct Discovery field lists

A field list is a comma-separated list of field specifications,
fieldname {, fieldname}. A field specification can be a field name, in
which case the same name is used for the database column name and the
field name. Or a field specification can be a field alias, in which case
a database expression or column name is given a field name.

Field names can be either simple names or quoted names. A simple name
begins with an alphabetic Unicode character and is followed by any
combination of alphabetic or numeric characters or underscores. Quoted
names begin with a double quotation mark and contain any sequence of
characters. If a quoted name contains double quotation marks, those
quotation marks are represented using two adjacent double quotation
marks.

Field names are case-sensitive. Database field names may or
may not be case-sensitive, depending on the database. A Direct Discovery
query preserves the case of all field identifiers and aliases. In the
following example, the alias "MyState" is used internally to store the
data from the database column "STATEID".

`DIRECT QUERY Dimension STATEID as MyState Measure AMOUNT from SALES_TABLE;`

This differs from the result of an SQL Select statement with an alias.
If the alias is not explicitly quoted, the result contains the default
case of column returned by the target database. In the following
example, the SQL Select statement to an Oracle database creates
"MYSTATE," with all upper case letters, as the internal alias
even though the alias is specified as mixed case. The SQL Select
statement uses the column name returned by the database, which in the
case of Oracle is all upper
case.

`SQL Select STATEID as MyState, STATENAME from STATE_TABLE;`

To avoid this behavior, use the LOAD statement to specify the
alias.

```code
Load STATEID as MyState, STATENAME;
SQL Select STATEID, STATEMENT from STATE_TABLE;
```

In this example, the "STATEID" column is stored internally in Qlik Associative Engine as "MyState".

Most database scalar expressions are allowed as field specifications.
Function calls can also be used in field specifications. Expressions can
contain constants that are boolean, numeric, or strings contained in
single quotation marks (embedded single quotation marks are represented
by adjacent single quotation
marks).

Direct Discovery does not support using aggregations in
 **LOAD**
statements. If aggregations are used, the results are unpredictable. A
 **LOAD**
statement such as the following should not be
used:

```code
DIRECT QUERY DIMENSION stateid, SUM(amount*7) AS MultiFirst MEASURE amount FROM sales_table;
```

The
 **SUM**
should not be in the
 **LOAD**
statement.

Direct Discovery also does not support functions in Direct
Query statements. For example, the following specification for a
 **DIMENSION**
field results in a failure when the "Mth" field is used as a dimension
in a
visualization:

`month(ModifiedDate) as Mth`

## Direct Query

The DIRECT QUERY statement allows you to access tables through an ODBC or
OLE DB connection using the Direct Discovery function.

`DIRECT QUERY DIMENSION fieldlist [MEASURE fieldlist] [DETAIL fieldlist] FROM tablelist [WHERE where_clause]`

The DIMENSION, MEASURE, and DETAIL keywords can be used in any order.

The DIMENSION and FROM keyword clauses are required on all DIRECT QUERY statements.
The FROM keyword must appear after the DIMENSION keyword.

The fields specified directly after the DIMENSION keyword are loaded in memory,
and can be used to create associations between in-memory and Direct Discovery data.

!!! NOTE
    The DIRECT QUERY statement cannot contain or GROUP BY clauses.

Using the MEASURE keyword you can define fields that is aware of on a “meta level”.
The actual data of a measure field resides only in the database during the data load process,
and is retrieved on an ad hoc basis driven by the chart expressions that are used in a visualization.

Typically, fields with discrete values that will be used as dimensions should be loaded with the DIMENSION keyword,
whereas numbers that will be used in aggregations only should be selected with the MEASURE keyword.

DETAIL fields provide information or details, like comment fields,
that a user may want to display in a drill-to-details table box.
DETAIL fields cannot be used in chart expressions.

By design, the DIRECT QUERY statement is data-source neutral for data sources that support SQL.
For that reason, the same DIRECT QUERY statement can be used for different SQL databases without change.
Direct Discovery generates database-appropriate queries as needed.

Native data-source syntax can be used when the user knows the database to be queried,
and wants to exploit database-specific extensions to SQL.
Native data-source syntax is supported:

- As field expressions in **DIMENSION** and **MEASURE** clauses
- As the content of the **WHERE** clause

!!! NOTE
    The following terms are used as keywords and so cannot be used as column
    or field names without being quoted: and, as, detach, detail, dimension,
    distinct, from, in, is, like, measure, native, not, or, where

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| fieldlist | A comma-separated list of field specifications, fieldname {, fieldname}. A field specification can be a field name, in which case the same name is used for the database column name and the field name. Or a field specification can be a field alias, in which case a database expression or column name is given a field name. [Direct Discovery field lists](##direct-discovery-field-lists) |
| tablelist | A list of the names of tables or views in the database from which data will be loaded. Typically, it will be views that contain a JOIN performed on the database. |
| where_clause | he full syntax of database WHERE clauses is not defined here, but most SQL "relational expressions" are allowed, including the use of function calls, the LIKE operator for strings, IS NULL and IS NOT NULL, and IN. BETWEEN is not included. NOT is a unary operator, as opposed to a modifier on certain keywords. |

**Example**:

In this example, a database table called TableName, containing fields
Dim1, Dim2, Num1, Num2 and Num3, is used. Dim1 and Dim2 will be loaded
into the dataset.

`DIRECT QUERY DIMENSION Dim1, Dim2 MEASURE Num1, Num2, Num3 FROM TableName;`

Dim1 and Dim2 will be available for use as dimensions. Num1, Num2 and
Num3 will be available for aggregations. Dim1 and Dim2 are also
available for aggregations. The type of aggregations for which Dim1 and
Dim2 can be used depends on their data types. For example, in many cases
**DIMENSION** fields contain string data such as names or account numbers.Those fields
cannot be summed, but they can be counted:
count(Dim1).

To simplify construction of **DIRECT QUERY** statements,
you can generate a **SELECT** statement from a data connection,
and then edit the generated script to change it into a **DIRECT QUERY** statement.
For example, the **SELECT** statement:

```code
SQL SELECT
SalesOrderID,
RevisionNumber,
OrderDate,
SubTotal,
TaxAmt
FROM MyDB.Sales.SalesOrderHeader;
```

could be changed to the following **DIRECT QUERY** statement:

```code
DIRECT QUERY
DIMENSION
SalesOrderID,
RevisionNumber

MEASURE
SubTotal,
TaxAmt

DETAIL
OrderDate

FROM MyDB.Sales.SalesOrderHeader;
```

## Directory

The **Directory** statement defines which directory to look in for data files in
subsequent **LOAD** statements,
until a new **Directory** statement is made.

**Syntax**:

`Directory[path]`

**Arguments**:

If the **Directory** statement is issued without a path or left out,
Qlik Assocative Engine will look in the working directory.

| Argument | Description |
| -------- | ----------- |
| path | A text that can be interpreted as the path to the qvf file. The path is the path to the file, either: <br>**absolute** e.g. `C:\data\`<br>**relative** to working directory e.g. `data\`<br>**URL** (HTTP or FTP), pointing to a location on the Internet or an intranet e.g. `https:///www.qlik.com` |

See also [Load](##load).

## Disconnect

The **Disconnect** statement terminates the current ODBC/OLE DB/Custom connection.
This statement is optional.

**Syntax**:

`Disconnect`

The connection will be automatically terminated when a new **connect** statement is executed,
or when the script execution is finished.

**Example**:

`Disconnect;`

## Drop field

One or several fields can be dropped from the data model,
and thus from memory, at any time during script execution,
by means of a drop field statement.

Both drop field and drop fields are allowed forms with no difference in effect.
If no table is specified, the field will be dropped from all tables where it occurs.

**Syntax**:

`Drop field fieldname { , fieldname2 ...}[from tablename1 { , tablename2 ...}]`

`Drop fields fieldname { , fieldname2 ...}[from tablename1 { , tablename2 ...}]`

**Examples**:

`Drop field A;`

`Drop fields A,B;`

`Drop field A from X`

`Drop fields A,B from X,Y;`

## Drop table

One or several Qlik Associative Engine internal tables can be dropped from the data model,
and thus from memory, at any time during script execution,
by means of a drop table statement.

**Syntax**:

`drop table tablename {, tablename2 ...}`

`drop tables tablename {, tablename2 ...}`

The forms drop table and drop tables are both accepted.

The following items will be lost as a result of this:

- The actual table(s).
- All fields which are not part of remaining tables.
- Field values in remaining fields, which came exclusively from the dropped table(s).

**Examples**:

| Example | Result |
| ------- | ------ |
| `drop table Orders, Salesmen, T456a;` | This line results in three tables being dropped from memory. |
| <code><br>Tab1:</br><br>Load * Inline [</br><br>Customer, Items, UnitPrice</br><br>Bob, 5, 1.50</br><br>];</br><br>Tab2:</br><br>LOAD Customer, Sum( Items * UnitPrice ) as Sales</br><br>resident Tab1</br><br>group by Customer;</br><br>drop table Tab1;</br></code> | Once the table **Tab2** is created, the table **Tab1** is dropped. |

## FlushLog

The **FlushLog** statement forces Qlik Associative Engine to write the content of the script buffer to
the script log file.

**Syntax**:

`FlushLog`

The content of the buffer is written to the log file.
This command can be useful for debugging purposes,
as you will receive data that otherwise may have been lost in a failed script execution.

**Example**:

`FlushLog;`

## Force

The **force** statement forces Qlik Associative Engine to interpret field names
and field values of subsequent **LOAD** and **SELECT** statements as written with only upper case letters,
with only lower case letters,
as always capitalized or as they appear (mixed).
This statement makes it possible to associate field values from tables made according
to different conventions.

**Syntax**:

`Force ( capitalization | case upper | case lower | case mixed )`

If nothing is specified, force case mixed is assumed.
The force statement is valid until a new force statement is made.

The **force** statement has no effect in the access section: all field values loaded
are case insensitive.

**Examples**:

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<td><br>This example shows how to force capitalization.</br>
<code>
FORCE Capitalization;</br>
Capitalization:</br>
LOAD * Inline [</br>
ab</br>
Cd</br>
eF</br>
GH</br>
];</br></td>
</code>
<td><br>The  <b>Capitalization</b> table contains the following values:</br>
<code>
Ab</br>
Cd</br>
Ef</br>
Gh</br>
</code>
<br>All values are capitalized.</br></td>
</tr>
<td><br>This example shows how to force case upper.</br>
<code>
FORCE Case Upper;</br>
CaseUpper:</br>
LOAD * Inline [</br>
ab</br>
Cd</br>
eF</br>
GH</br>
];</br></td>
<td><br>The <b>CaseUpper</b> table contains the following values:</br>
<code>
AB</br>
CD</br>
EF</br>
GH</br>
</code>
<br>All values are upper case.</br></td>
</tr>
<tr class="odd">
<td><br>This example shows how to force case lower.</br>
<code>
<br>FORCE Case Lower;</br>
CaseLower:</br>
LOAD * Inline [</br>
ab</br>
Cd</br>
eF</br>
GH</br>
];</br></td>
</code>
<td><br>The <b>CaseLower</b> table contains the following values:</br>
<code>
ab</br>
cd</br>
ef</br>
gh</br>
</code>
<br>All values are lower case.</br></td>
</tr>
<td><br>This example shows how to force case mixed.</br>
<code>
<br>FORCE Case Mixed;</br>
CaseMixed:</br>
LOAD * Inline [</br>
ab</br>
Cd</br>
eF</br>
GH</br>
];</br></td>
</code>
<td><br>The <b>CaseMixed</b> table contains the following values:</br>
<code>
ab</br>
Cd</br>
eF</br>
GH</br>
</code>
<br>All values are as they appear in the script.</br></td>
</tr>
</tbody>
</table>

See also [Load](##load) and [Select](##select).

## From

The **From** script keyword is used in **Load** statements to refer to a file,
and in **Select** statements to refer to a database table or view.

## Let

The **let** statement is a complement to the **set** statement,
used for defining script variables.
The **let** statement, in opposition to the **set** statement,
evaluates the expression on the right side of the ' =' before
it is assigned to the variable.

**Syntax**:

`Let variablename=expression`

The word **let** may be omitted, but the statement then becomes a control statement.
Such a statement without the keyword **let**
must be contained within a single script row and may be terminated
either with a semicolon or end-of-line.

**Examples**:

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
</thead>
<tbody>
<code>
<td><br>Set x=3+4;</br>
<br>Let y=3+4;</br>
<br>z=$(y)+1;</br></td>
</code>
<td><br> <br>$(y) will be evaluated as ' 7 '</br>
<br>$(z) will be evaluated as ' 8 '</br></td>
</tr>
<code><td>Let T=now( );</td></code>
<td>$(T) will be given the value of the current time.</td>
</tbody>
</table>

## Load

The **LOAD** statement loads fields from a file, from data defined in the script,
from a previously loaded table, from a web page, from the result of a
subsequent **SELECT** statement or by generating data automatically.
It is also possible to load data from analytic connections.

**Syntax**:

```code
LOAD [ distinct ] fieldlist [( from file [ format-spec ] |  from_field fieldassource [format-spec]|
inline data [ format-spec ] |  resident table-label |
autogenerate size ) |extension pluginname.functionname([script] tabledescription)
[ where criterion | while criterion ] [ group by groupbyfieldlist ] [order by orderbyfieldlist ]
```

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| distinct | **distinct** is a predicate used if only the first of duplicate records should be loaded. |
| fieldlist | <br>`fieldlist ::= ( * | field {, * | field } )` A list of the fields to be loaded. Using * as a field list indicates all fields in the table.</br><br>`field ::= ( fieldref | expression ) [as aliasname ]` The field definition must always contain a literal, a reference to an existing field, or an expression.</br><br>`fieldref ::= ( fieldname |@fieldnumber |@startpos:endpos [ I | U | R | B | T] )`</br><br>`fieldname` is a text that is identical to a field name in the table. Note that the field name must be enclosed by straight double quotation marks or square brackets if it contains e.g. spaces. Sometimes field names are not explicitly available. Then a different notation is used:</br><br>`@fieldnumber` represents the field number in a delimited table file. It must be a positive integer preceded by "@". The numbering is always made from 1 and up to the number of fields.</br><br>`@startpos:endpos` represents the start and end positions of a field in a file with fixed length records. The positions must both be positive integers. The two numbers must be preceded by "@" and separated by a colon. The numbering is always made from 1 and up to the number of positions. In the last field, n is used as end position.</br><br>* If `@startpos:endpos` is immediately followed by the characters I or U, the bytes read will be interpreted as a binary signed (I) or unsigned (U) integer (Intel byte order). The number of positions read must be 1, 2 or 4.</br><br>* If `@startpos:endpos` is immediately followed by the character R, the bytes read will be interpreted as a binary real number (IEEE 32-bit or 64 bit floating point). The number of positions read must be 4 or 8.</br><br>* If `@startpos:endpos` is immediately followed by the character B, the bytes read will be interpreted as a BCD (Binary Coded Decimal) numbers according to the COMP-3 standard. Any number of bytes may be specified.</br><br>`expression` can be a numeric function or a string function based on one or several other fields in the same table. For further information, see the syntax of expressions.</br><br>**as** is used for assigning a new name to the field.</br> |
| from | **from** is used if data should be loaded from a file using a folder or a web file data connection.<br>`file ::= [ path ] filename`</br><br>**Example: 'lib://Table Files/'**</br><br>If the path is omitted, Qlik Associative Engine  searches for the file in the directory specified by the Directory statement. If there is no Directory statement, Qlik Associative Engine searches in the working directory. |
| from_field | **from_field** is used if data should be loaded from a previously loaded field. <br>`fieldassource::=(tablename, fieldname)`</br><br>The field is the name of the previously loaded tablename and fieldname.</br><br>`format-spec ::= ( fspec-item {, fspec-item } )`</br>The format specification consists of a list of several format specification items, within brackets.|
| inline | **inline** is used if data should be typed within the script, and not loaded from a file.<br>`data ::= [ text ]`</br> Data entered through an inline clause must be enclosed by double quotation marks or by square brackets. The text between these is interpreted in the same way as the content of a file. Hence, where you would insert a new line in a text file, you should also do it in the text of an inline clause, i.e. by pressing the Enter key when typing the script. The number of columns are defined by the first line.<br>`format-spec ::= ( fspec-item {, fspec-item } )`</br> The format specification consists of a list of several format specification items, within brackets. |
| resident | **resident** is used if data should be loaded from a previously loaded table. _table label_ is a label preceding the **LOAD** or **SELECT** statement(s) that created the original table. The label should be given with a colon at the end. |
| autogenerate | **autogenerate** is used if data should be automatically generated by Qlik Associative Engine.<br>`size ::= number`</br> Number is an integer indicating the number of records to be generated. The field list must not contain expressions which require data from an external data source or a previously loaded table, unless you refer to a single field value in a previously loaded table with the **Peek** function. |
| extension | You can load data from analytic connections. You need to use the extension clause to call a function defined in the server-side extension (SSE) plugin, or evaluate a script.You can send a single table to the SSE plugin, and a single data table is returned. If the plugin does not specify the names of the fields that are returned, the fields will be named Field1, Field2, and so on. <br>`Extension pluginname.functionname( tabledescription );`</br><br>* Loading data using a function in an SSE plugin</br><br>`tabledescription ::= (table { ,tablefield} )`</br><br>If you do not state table fields, the fields will be used in load order.</br><br>* Loading data by evaluating a script in an SSE plugin</br><br>`tabledescription ::= ( script, table { ,tablefield} )`</br><br>**Data type handling in the table field definition**</br>Data types are automatically detected in analytic connections. If the data has no numeric values and at least one non-NULL text string, the field is considered as text. In any other case it is considered as numeric.<br>You can force the data type by wrapping a field name with **String()** or **Mixed()**.</br><br>**String()** forces the field to be text. If the field is numeric, the text part of the dual value is extracted, there is no conversion performed.</br><br>**Mixed()** forces the field to be dual.</br><br>**String()** or **Mixed()** cannot be used outside extension table field definitions, and you cannot use other functions in a table field definition.</br><br>You can read more about analytic connections in the [GitHub repository](https://github.com/qlik-oss/server-side-extension) |
| where | **where** is a clause used for stating whether a record should be included in the selection or not. The selection is included if _criterion_ is True.<p>_criterion_ is a logical expression.</p> |
| while | **while** is a clause used for stating whether a record should be repeatedly read. The same record is read as long as _criterion_ is True. In order to be useful, a **while** clause must typically include the **IterNo()** function.<p>_criterion_ is a logical expression.</p> |
| group by | **group by** is a clause used for defining over which fields the data should be aggregated (grouped). The aggregation fields should be included in some way in the expressions loaded. No other fields than the aggregation fields may be used outside aggregation functions in the loaded expressions.<p>`groupbyfieldlist ::= (fieldname { ,fieldname } )`</p> |
| order by | **order by** is a clause used for sorting the records of a resident table before they are processed by the **load** statement. The resident table can be sorted by one or more fields in ascending or descending order. The sorting is made primarily by numeric value and secondarily by national collation order. This clause may only be used when the data source is a resident table.<br> The ordering fields specify which field the resident table is sorted by. The field can be specified by its name or by its number in the resident table (the first field is number 1).</br><p>`orderbyfieldlist ::= fieldname [ sortorder ] { , fieldname [ sortorder ] }`</p>_sortorder_ is either _asc_ for ascending or _desc_ for descending. If no _sortorder_ is specified, _asc_ is assumed.<p>_fieldname_, _path_, _filename_ and _aliasname_ are text strings representing what the respective names imply. Any field in the source table can be used as fieldname. However, fields created through the as clause (_aliasname_) are out of scope and cannot be used inside the same **load** statement.</p> |

If no source of data is given by means of a from, inline, resident, from_field, extension or autogenerate clause,
data will be loaded from the result of the immediately succeeding **SELECT** or **LOAD** statement.
The succeeding statement should not have a prefix.

## Loosen Table

One or more internal data tables can be explicitly declared
loosely coupled during script execution by using a
Loosen Table statement. When a table is loosely coupled, all
associations between field values in the table are removed. A similar
effect could be achieved by loading each field of the loosely coupled
table as independent, unconnected tables. Loosely coupled can be useful
during testing to temporarily isolate different parts of the data
structure. A loosely coupled table can be identified in the table viewer
by the dotted lines. The use of one or more
Loosen Table statements in the script will make disregard any
setting of tables as loosely coupled made before the script execution.

**Syntax**:

`Loosen Tabletablename [ , tablename2 ...] Loosen Tablestablename [ , tablename2 ...]`

Either syntax: **Loosen Table** or **Loosen Tables** can be used.

**Example**:

```code
Tab1:
SELECT * from Trans;
Loosen Table Tab1;
```

## Map

The **map ... using** statement is used for mapping a certain field value
or expression to the values of a specific mapping table.
The mapping table is created through the **Mapping** statement.

**Syntax**:

`Map fieldlist Using  mapname`

The automatic mapping is done for fields loaded after the **Map … Using** statement until the end of the script
or until an **Unmap** statement is encountered.

The mapping is done last in the chain of events leading up to the field
being stored in the internal table. This means that
mapping is not done every time a field name is encountered as part of an
expression, but rather when the value is stored under the field name in
the internal table. If mapping on the expression level is required, the
 **Applymap()** function has to be used instead.

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| _fieldlist_ | A comma separated list of the fields that should be mapped from this point in the script. Using `*` as field list indicates all fields. The wildcard characters * and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |
| _mapname_ | The name of a mapping table previously read in a **mapping load** or **mapping select** statement. |

**Examples**:

| Example | Result |
| ------- | ------ |
| `Map Country Using Cmap;` | Enables mapping of the field Country using the map Cmap. |
| `Map A, B, C Using X;` | Enables mapping of the fields A, B and C using the map X. |
| `Map * Using GenMap;` | Enables mapping of all fields using GenMap. |

## NullAsNull

The **NullAsNull** statement turns off the conversion of NULL values to string values
previously set by a **NullAsValue** statement.

**Syntax**:

`NullAsNull *fieldlist`

The **NullAsValue** statement operates as a switch and can be turned on or off several times in the script,
using either a **NullAsValue** or a **NullAsNull** statement.

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| *fieldlist | A comma separated list of the fields for which  **NullAsNull**  should be turned on. Using `*` as field list indicates all fields. The wildcard characters * and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

**Example**:

```code
NullAsNull A,B;

LOAD A,B from x.csv;
```

## NullAsValue

The **NullAsValue** statement specifies for which fields that NULL should be converted to a value.

**Syntax**:

`NullAsValue *fieldlist`

By default, Qlik Associative Engine considers NULL values to be missing or undefined
entities. However, certain database contexts imply that NULL values are
to be considered as special values rather than simply missing values.
The fact that NULL values are normally not allowed to link to other NULL
values can be suspended by means of the **NullAsValue** statement.

The **NullAsValue** statement operates as a switch and will operate on subsequent loading statements.
It can be switched off again by means of the **NullAsNull** statement.

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| *fieldlist | A comma separated list of the fields for which **NullAsValue** should be turned on. Using `*` as field list indicates all fields. The wildcard characters * and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

**Example**:

```code
NullAsValue A,B;
Set NullValue = 'NULL';
LOAD A,B from x.csv;
```

## Qualify

The **Qualify** statement is used for switching on the qualification of field names,
i.e. field names will get the table name as a prefix.

**Syntax**:

`Qualify *fieldlist`

The automatic join between fields with the same name
in different tables can be suspended by means of the **qualify** statement,
which qualifies the field name with its table name.
If qualified, the field name(s) will be renamed when found in a table.
The new name will be in the form of _tablename.fieldname_.
Tablename is equivalent to the label of the current table, or, if no label exists,
to the name appearing after **from** in **LOAD** and **SELECT** statements.

The qualification will be made for all fields loaded after the **qualify** statement.

Qualification is always turned off by default at the beginning of script execution.
Qualification of a field name can be activated at any time using a **qualify** statement.
Qualification can be turned off at any time using an **Unqualify** statement.

The **qualify** statement should not be used in conjunction with partial reload.

**Arguments**:

| Argument | Description |
| -------- | ----------- |
| *fieldlist | A comma separated list of the fields for which qualification should be turned on. Using `*` as field list indicates all fields. The wildcard characters * and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

**Example 1**:

```code
Qualify B;
LOAD A,B from x.csv;
LOAD A,B from y.csv;
```

The two tables **x.csv** and **y.csv** are associated only through **A**.
Three fields will result: A, x.B, y.B.

**Example 2**:

In an unfamiliar database, it is often useful to start out by making
sure that only one or a few fields are associated, as illustrated in
this example:

```code
qualify *;
unqualify TransID;
SQL SELECT * from tab1;
SQL SELECT * from tab2;
SQL SELECT * from tab3;
```

Only **TransID** will be used for associations between the tables, tab2 and tab3.

## Rem

The **rem** statement is used for inserting remarks, or comments, into the script,
or to temporarily deactivate script statements without removing
them.

**Syntax**:

`Rem string`

Everything between the **rem** and the next semicolon **;** is considered to be a comment.

There are two alternative methods available for making comments in the script:

1. It is possible to create a comment anywhere in the script by placing the section in question between **/\*** and **\*/**.
1. When typing **//** in the script, all text that follows to the right on the same row becomes a comment.

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| string   | An arbitrary text. |

**Example**:

```code
Rem ** This is a comment **;

/* This is also a comment */

// This is a comment as well
```

## Rename field

This script function renames one or more existing field(s) after they have been loaded.

It is not recommended to name a variable identically to a field or a function in Qlik Associative Engine.

Either syntax: **rename field** or **rename fields** can be used.

**Syntax**:

`Rename Field (using mapname | oldname to newname{ , oldname to newname })`

`Rename Fields (using mapname | oldname to newname{ , oldname to newname })`

**Arguments**:

| Argument | Description                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| mapname  | The name of a previously loaded mapping table containing one or more pairs of old and new field names. |
| oldname  | The old field name.                                                                                    |
| newname  | The new field name.                                                                                    |

You cannot rename two fields to having the same name.

**Example 1**:

`Rename Field XAZ0007 to Sales;`

**Example 2**:

```code
FieldMap:

Mapping SQL SELECT oldnames, newnames from datadictionary;

Rename Fields using FieldMap;
```

## Rename table

This script function renames one or more existing table(s) after they have been loaded.

Either syntax: **rename table** or **rename tables** can be used.

**Syntax**:

`Rename Table (using mapname | oldname to newname{ , oldname to newname })`

`Rename Tables (using mapname | oldname to newname{ , oldname to newname })`

**Arguments**:

| Argument | Description                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| mapname  | The name of a previously loaded mapping table containing one or more pairs of old and new table names. |
| oldname  | The old table name.                                                                                    |
| newname  | The new table name.                                                                                    |

Two differently named tables cannot be renamed to having the same name.
The script will generate an error if you try to rename a table to the same name as an existing table.

**Example 1**:

```code
Tab1:
SELECT * from Trans;
Rename Table Tab1 to Xyz;
```

**Example 2**:

```code
TabMap:
Mapping LOAD oldnames, newnames from tabnames.csv;
Rename Tables using TabMap;
```

## Search

The **Search** statement is used for including or excluding fields in smart search.

**Syntax**:

`Search Include *fieldlist Search Exclude *fieldlist`

You can use several Search statements to refine your selection of fields to include.
The statements are evaluated from top to bottom.

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| *fieldlist | A comma separated list of the fields to include or exclude from searches in smart search. Using `*` as field list indicates all fields. The wildcard characters * and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

**Examples**:

| Example | Result |
| ------- | ------ |
| Search Include *; | Include all fields in searches in smart search. |
| Search Exclude [*ID]; | Exclude all fields ending with ID from searches in smart search. |
| Search Exclude '*ID'; | Exclude all fields ending with ID from searches in smart search. |
| Search Include ProductID; | Include the field ProductID in searches in smart search. |

The combined result of these three statements, in this sequence,
is that all fields ending with ID except ProductID are excluded from searches in smart search.

## Section

With the **section** statement, it is possible to define whether the subsequent **LOAD** and **SELECT** statements
should be considered as data or as a definition of the access rights.

**Syntax**:

`Section (access | application)`

If nothing is specified, **section application** is assumed.
The **section** definition is valid until a new **section** statement is made.

**Example**:

```code
Section access;

Section application;
```

## Select

The selection of fields from an ODBC data source or OLE DB provider is made through standard SQL **SELECT** statements.
However, whether the **SELECT** statements are accepted depends on the ODBC driver or OLE DB provider used.

**Syntax**:

```code
Select [all | distinct | distinctrow | top n [percent] ] fieldlist

From tablelist

[where criterion ]

[group by fieldlist [having criterion ] ]

[order by fieldlist [asc | desc] ]

[ (Inner | Left | Right | Full) join tablename on fieldref = fieldref ]
```

Furthermore, several **SELECT** statements can sometimes be concatenated into one through the use of a **union** operator:

`selectstatement Union selectstatement`

The **SELECT** statement is interpreted by the ODBC driver or OLE DB provider,
so deviations from the general SQL syntax might occur depending on the capabilities of the ODBC drivers or OLE DB provider,
for example:

- **as** is sometimes not allowed, i.e. _aliasname_ must follow immediately after _fieldname_.
- **as** is sometimes compulsory if an _aliasname_ is used.
- _distinct_, _as_, _where_, _group by_, _order by_, or _union_ is sometimes not supported.
- The ODBC driver sometimes does not accept all the different quotation marks listed above.

!!! NOTE
    This is not a complete description of the SQL **SELECT** statement!
    E.g. **SELECT** statements can be nested, several joins can be made in one **SELECT** statement,
    the number of functions allowed in expressions is sometimes large, etc.

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| distinct | **distinct** is a predicate used if duplicate combinations of values in the selected fields only should be loaded once. |
| distinctrow | **distinctrow** is a predicate used if duplicate records in the source table only should be loaded once. |
| fieldlist | `fieldlist ::= (*| field ) {, field }`<br>A list of the fields to be selected. Using * as field list indicates all fields in the table.</br><p>`fieldlist ::= field {, field }`<br>A list of one or more fields, separated by commas.</br></p><p>`field ::= ( fieldref | expression ) [as aliasname ]`<br>The expression can e.g. be a numeric or string function based on one or several other fields. Some of the operators and functions usually accepted are: +, -, *, /, & (string concatenation), sum(fieldname), count(fieldname), avg(fieldname)(average), month(fieldname), etc. See the documentation of the ODBC driver for more information.</br></p><p>`fieldref ::= [ tablename. ] fieldname`<br>The tablename and the fieldname are text strings identical to what they imply. They must be enclosed by straight double quotation marks if they contain e.g. spaces.</br></p>The **as** clause is used for assigning a new name to the field. |
| from | `tablelist ::= table {, table }`<br>The list of tables that the fields are to be selected from.</br><p>`table ::= tablename [ [as ] aliasname ]`<br>The tablename may or may not be put within quotes.</br></p> |
| where | **where** is a clause used for stating whether a record should be included in the selection or not. _criterion_ is a logical expression that can sometimes be complex. Some of the operators accepted are: numeric operators and functions, =,　<> or #(not equal), >,　>=,　<,　<=,　and, or, not, exists, some, all, in and also new SELECT statements. See the documentation of the ODBC driver or OLE DB providerfor more information. |
| group by | **group by** is a clause used for aggregating (group) several records into one. Within one group, for a certain field, all the records must either have the same value, or the field can only be used from within an expression, e.g. as a sum or an average. The expression based on one or several fields is defined in the expression of the field symbol. |
| having | **having** is a clause used for qualifying groups in a similar manner to how the where clause is used for qualifying records. |
| order by | **order by** is a clause used for stating the sort order of the resulting table of the **SELECT** statement. |
| join | **join** is a qualifier stating if several tables are to be joined together into one. Field names and table names must be put within quotes if they contain blank spaces or letters from the national character sets. When the script is automatically generated, the quotation mark used is the one preferred by the ODBC driver or OLE DB provider specified in the data source definition of the data source in the **Connect** statement. |

**Example 1**:

```code
SELECT * FROM `Categories`;
```

**Example 2**:

```code
SELECT `Category ID`, `Category Name` FROM `Categories`;
```

**Example 3**:

```code
SELECT `Order ID`, `Product ID`,
`Unit Price` * Quantity * (1-Discount) as NetSales
FROM `Order Details`;
```

**Example 4**:

```code
SELECT `Order Details`.`Order ID`,
Sum(`Order Details`.`Unit Price` * `Order Details`.Quantity) as `Result`
FROM `Order Details`, Orders
where Orders.`Order ID` = `Order Details`.`Order ID`
group by `Order Details`.`Order ID`;
```

## Set

The set statement is used for defining script variables.
These can be used for substituting strings, paths, drives, and so on.

**Syntax**:

`Set variablename=string`

**Example 1**:

`Set FileToUse=Data1.csv`

**Example 2**:

`Set Constant="My string";`

**Example 3**:

`Set BudgetYear=2012;`

## Sleep

The **sleep** statement pauses script execution for a specified time.

**Syntax**:

`Sleep n`

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| n | Stated in milliseconds, where n is a positive integer no larger than 3600000 (i.e. 1 hour). The value may be an expression. |

**Example 1**:

`Sleep 10000`

**Example 2**:

`Sleep t*1000`

## SQL

The **SQL** statement allows you to send an arbitrary SQL command through an ODBC or OLE DB connection.

**Syntax**:

`SQL sql_command`

Sending SQL statements which update the database will return an error if the ODBC connection is opened in read-only mode.

The syntax `SQL SELECT * from tab1;` is allowed, and is the preferred syntax for **SELECT**,for reasons of consistency.
The SQL prefix will, however, remain optional for **SELECT** statements.

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| sql_command | A valid SQL command. |

**Example 1**:

`SQL leave;`

**Example 2**:

`SQL Execute <storedProc>;`

See also [Select](##select)

## SQLColumns

The **sqlcolumns** statement returns a set of fields describing the columns of an ODBC or OLE DB data source,
to which a **connect** has been made.

**Syntax**:

`SQLcolumns`

The fields can be combined with the fields generated by the **sqltables** and **sqltypes** commands
in order to give a good overview of a given database.
The twelve standard fields are:

- TABLE_QUALIFIER
- TABLE_OWNER
- TABLE_NAME
- COLUMN_NAME
- DATA_TYPE
- TYPE_NAME
- PRECISION
- LENGTH
- SCALE
- RADIX
- NULLABLE
- REMARKS

For a detailed description of these fields, see an ODBC reference handbook.

**Example**:

```code
Connect to 'MS Access 7.0 Database; DBQ=C:\Course3\DataSrc\QWT.mbd';

SQLcolumns;
```

!!! NOTE
    Some ODBC drivers may not support this command. Some ODBC drivers may produce additional fields.

## SQLTables

The **sqltables** statement returns a set of fields describing the tables of an ODBC or OLE DB data source,
to which a **connect** has been made.

**Syntax**:

`SQLTables`

The fields can be combined with the fields generated by the **sqlcolumns** and **sqltypes** commands
in order to give a good overview of a given database. The five standard fields are:

- TABLE_QUALIFIER
- TABLE_OWNER
- TABLE_NAME
- TABLE_TYPE
- REMARKS

For a detailed description of these fields, see an ODBC reference handbook.

**Example**:

```code
Connect to 'MS Access 7.0 Database; DBQ=C:\Course3\DataSrc\QWT.mbd';

SQLTables;
```

!!! NOTE
    Some ODBC drivers may not support this command. Some ODBC drivers may produce additional fields.

## SQLTypes

The **sqltypes** statement returns a set of fields describing the types of an ODBC or OLE DB data source,
to which a **connect** has been made.

**Syntax**:

`SQLTypes`

The fields can be combined with the fields generated by the **sqlcolumns** and **sqltables** commands
in order to give a good overview of a given database.
The fifteen standard fields are:

- TYPE_NAME
- DATA_TYPE
- PRECISION
- LITERAL_PREFIX
- LITERAL_SUFFIX
- CREATE_PARAMS
- NULLABLE
- CASE_SENSITIVE
- SEARCHABLE
- UNSIGNED_ATTRIBUTE
- MONEY
- AUTO_INCREMENT
- LOCAL_TYPE_NAME
- MINIMUM_SCALE
- MAXIMUM_SCALE

For a detailed description of these fields, see an ODBC reference handbook.

**Example**:

```code
Connect to 'MS Access 7.0 Database; DBQ=C:\Course3\DataSrc\QWT.mbd';

SQLTypes;
```

!!! NOTE
    Some ODBC drivers may not support this command. Some ODBC drivers may produce additional fields.

## Star

The string used for representing the set of all the values of a field in the database can be set through the star statement.
It affects the subsequent **LOAD** and **SELECT** statements.

**Syntax**:

`Star is[ string ]`

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| string | An arbitrary text. Note that the string must be enclosed by quotation marks if it contains blanks. <br>If nothing is specified, **star is**; is assumed, i.e. there is no star symbol available unless explicitly specified. This definition is valid until a new **star** statement is made.</br> |

**Example**:

The example below is an extract of a data load script featuring section access.

```code
Star is *;
Section Access;
LOAD * INLINE [
ACCESS, USERID, OMIT
ADMIN, ADMIN,
USER, USER1, SALES
USER, USER2, WAREHOUSE
USER, USER3, EMPLOYEES
USER, USER4, SALES
USER, USER4, WAREHOUSE
USER, USER5, *
];

Section Application;
LOAD * INLINE [
SALES, WAREHOUSE, EMPLOYEES, ORDERS
1, 2, 3, 4
];
```

The following applies:

- The _Star_ sign is *.
- The user _USER1_ is not able to see the field _SALES_.
- The user _USER2_ is not able to see the field _WAREHOUSE_ .
- The user _USER3_ cannot see the field _EMPLOYEES_.
- The user _USER4_ is added twice to the solution to OMIT two fields for this user, _SALES_ and _WAREHOUSE_.
- The _USER5_ has a “*” added which means that all listed fields in OMIT are unavailable.
    The star sign * means all listed values, not all values of the field.
    This means that the user _USER5_ cannot see the fields _SALES_, _WAREHOUSE_ and _EMPLOYEES_
    but this user can see the field _ORDERS_.

## Store

This script function creates a QVD or a CSV file.

**Syntax**:

`Store [ fieldlist from] table into filename [ format-spec ];`

The statement will create an explicitly named QVD or CSV file.

The statement can only export fields from one data table.
If fields from several tables are to be exported,
an explicit join must be made previously in the script to create the data table that should be exported.

The text values are exported to the CSV file in UTF-8 format. A delimiter can be specified, see LOAD.
The store statement to a CSV file does not support BIFF export.

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| `fieldlist::= ( * | field ) { , field } )` | A list of the fields to be selected. Using * as field list indicates all fields.<p>`field::= fieldname [as aliasname ]`<br>_fieldname_ is a text that is identical to a field name in table. (Note that the field name must be enclosed b straight double quotation marks or square brackets if it contains spaces or other non-standard characters.)</br>_aliasname_ is an alternate name for the field to be used in the resulting QVD or CSV file.</p> |
| table | A script label representing an already loaded table to be used as source for data. |
| filename | The name of the target file including a valid path to an existing folder data connection.<br>**Example: 'lib://Table Files/target.qvd'**</br>In legacy scripting mode, the following path formats are also supported; **absolute** and **relative**. If the path is omitted, the engine stores the file in the directory specified by the Directory statement. If there is no Directory statement, the working directory of Qlik Associative Engine will be used. |
| `format-spec ::=( ( txt | qvd ) )` | The format specification consists of the text txt for text files, or the text qvd for qvd files. If the format specification is omitted, qvd is assumed. |

**Example**:

```code
Store mytable into xyz.qvd (qvd);
Store * from mytable into 'lib://FolderConnection/myfile.qvd';
Store Name, RegNo from mytable into xyz.qvd;
Store Name as a, RegNo as b from mytable into 'lib://FolderConnection/myfile.qvd';
store mytable into myfile.txt (txt);
store * from mytable into 'lib://FolderConnection/myfile.qvd';
```

## Tag

This script function provides a way of assigning tags to one or more fields.
If an attempt to tag a field name not present in the app is made, the tagging will be ignored.
If conflicting occurrences of a field or tag name are found, the last value is used.

**Syntax**:

`Tag fields fieldlist using mapname Tag field fieldname with tagname`

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| fieldlist | A comma separated list of the fields that should be tagged from this point in the script. |
| mapname | The name of a mapping table previously loaded in a mapping Load or mapping Select statement. |
| fieldname | The name of the field that should be tagged. |
| tagname | The name of the tag that should be applied to the field. |

**Example 1**:

```code
tagmap:
mapping LOAD * inline [
a,b
Alpha,MyTag
Num,MyTag
];
tag fields using tagmap;
```

**Example 2**:

```code
tag field Alpha with 'MyTag2';
```

## Trace

The trace statement writes a string to the script log file, when used. It is useful for debugging purposes.
Using $-expansions of variables that are calculated prior to the trace statement, you can customize the message.

**Syntax**:

`Trace string`

**Example 1**:

```code
Trace Main table loaded;
```

**Example 2**:

```code
Let MyMessage = NoOfRows('MainTable') & ' rows in Main Table';

Trace $(MyMessage);
```

## Unmap

The **Unmap** statement disables field value mapping specified by a previous **Map … Using** statement
for subsequently loaded fields.

**Syntax**:

`Unmap *fieldlist`

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| *fieldlist | a comma separated list of the fields that should no longer be mapped from this point in the script. Using `*` as field list indicates all fields. The wildcard characters * and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

**Example**:

| Example | Result |
| ------- | ------ |
| Unmap Country; | Disables mapping of field Country. |
| Unmap A, B, C; | Disables mapping of fields A, B and C. |
| Unmap * ; | Disables mapping of all fields. |

See also [Map](##map).

## Unqualify

The **Unqualify** statement is used for switching off the qualification of field names
that has been previously switched on by the **Qualify** statement.

**Syntax**:

`Unqualify *fieldlist`

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| *fieldlist | A comma separated list of the fields for which qualification should be turned on. Using `*` as field list indicates all fields. The wildcard characters * and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

**Example 1**:

```code
Unqualify *;
```

**Example 2**:

```code
Unqualify TransID;
```

See also [Qualify](##qualify).

## Untag

Provides a way of removing tags from one or more fields.
If an attempt to untag a Field name not present in the app is made, the untagging will be ignored.
If conflicting occurrences of a field or tag name is found, the last value is used.

**Syntax**:

`Untag fields fieldlist using mapname Untag field fieldname with tagname`

**Arguments**:

| Argument | Description        |
| -------- | ------------------ |
| fieldlist | A comma separated list of the fields which tags should be removed. |
| mapname | The name of a mapping table previously loaded in a mapping **LOAD** or mapping **SELECT** statement. |
| fieldname | The name of the field that should be untagged. |
| tagname | The name of the tag that should be removed from the field. |

**Example 1**:

```code
tagmap:
mapping LOAD * inline [
a,b
Alpha,MyTag
Num,MyTag
];

Untag fields using tagmap;
```

**Example 2**:

`Untag field Alpha with MyTag2;`
