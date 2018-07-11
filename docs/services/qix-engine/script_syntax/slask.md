

## ScriptRegularStatements

# Alias

The
 **alias** 
statement is used for setting an alias according to which a field will
be renamed whenever it occurs in the script that
follows.

 

aliasname {,fieldname as aliasname}

 

| Argument  | Description                               |
| --------- | ----------------------------------------- |
| fieldname | The name of the field in your source data |
| aliasname | An alias name you want to use instead     |

Examples and
results:

| Example                                  | Result                                                                                                                                                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alias ID_N as NameID;                   |                                                                                                                                                                                                                       |
| Alias A as Name, B as Number, C as Date; | The name changes defined through this statement are used on all subsequent SELECT and LOAD statements. A new alias can be defined for a field name by a new alias statement at any subsequent position in the script. |

 

Alias ID_N as NameID;

 

Alias A as Name, B as Number, C as Date;

 

The name changes defined through this statement are used on all
subsequent SELECT and LOAD statements. A new alias can be defined for a
field name by a new alias statement at any subsequent position in the
script.

 

*Load*

*Select*

# AutoCalendar

The
 **AutoCalendar** 
statement is used for selecting which fields to include in the calendar
that is automatically created when a date or time field is identified in
the
database.

 

AutoCalendar\*fieldlist

 

Only fields that are specified in the
 **AutoCalendar** 
script statement are included in the calendar, even if they are date or
time fields. If you include a field that is not a date or time field, it
is automatically excluded from the calendar.

The calendar that is created contains different sub-dimensions depending
on whether the field is a date field or a time field.

Date fields get the sub-dimensions Year, Quarter, Month, Week and Day.
Time fields get the sub-dimensions Hours, Minutes and
Seconds.

 

| Argument                                                                                                         | Description                                                                   |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| \*fieldlist | A comma separated list of the fields that are to be included in the calendar. |

Examples and results

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>AutoCalendar [Invoice Date];</p>
<p>LOAD</p>
<p>[Shipping Date],</p>
<p>[Invoice Date]</p>
<p>From Orders;</p></td>
<td>The calendar that is created will only contain the field Invoice Date, and not both Invoice Date and Shipping Date, since Shipping Date is not included in the AutoCalendar statement.</td>
</tr>
</tbody>
</table>

 

AutoCalendar [Invoice Date];

LOAD

[Shipping Date],

[Invoice Date]

From Orders;

The calendar that is created will only contain the field Invoice Date,
and not both Invoice Date and Shipping Date, since Shipping Date is not
included in the AutoCalendar
statement.

# AutoNumber

This statement creates a unique integer value for each distinct
evaluated value in a field encountered during the script execution.

You can also use the *autonumber - script function* function inside a
LOAD
statement, but this has some limitations when you want to use an
optimized load. You can create an optimized load by loading the data
from a <span class="field-name" data-autonumposition="none">QVD
file first, and then using the
AutoNumber
statement to convert values to symbol
keys.

 

AutoNumber \*fieldlist [Using namespace] ]

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>*fieldlist</td>
<td><p>A comma-separated list of the fields where the values should be replaced by a symbol key.</p>
<p>You can use wildcard characters ? and * in the field names to include all fields with matching names. You can also use * to include all fields. You need to quote field names when wildcards are used.</p></td>
</tr>
<tr class="even">
<td>namespace</td>
<td><p>Using namespace is optional. You can use this option if you want to create a namespace, where identical values in different fields share the same key.</p>
<p>If you do not use this option all fields will have a separate key index.</p></td>
</tr>
</tbody>
</table>

 

When you have several
LOAD
statements in the script, you need to place the
AutoNumber
statement after the final
LOAD
statement.

In this example we replace field values with symbol table keys using the
 **AutoNumber** 
statement to conserve memory. The example is brief for demonstration
purpose, but would be meaningful with a table containing a large number
of rows.

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
statemenet with the Region, Year and Month
fields.



RegionSales: LOAD \* INLINE [ Region, Year, Month, Sales North, 2014,
May, 245 North, 2014, May, 347 North, 2014, June, 127 South, 2014, June,
645 South, 2013, May, 367 South, 2013, May, 221 ]; AutoNumber Region,
Year, Month;



The resulting table would look like this:

| Region | Year | Month | Sales |
| ------ | ---- | ----- | ----- |
| 1      | 2    | 1     | 245   |
| 1      | 2    | 1     | 347   |
| 1      | 2    | 2     | 127   |
| 2      | 2    | 2     | 645   |
| 2      | 1    | 1     | 367   |
| 2      | 1    | 1     | 221   |

# Binary

The
 **binary** 
statement is used for loading the data from another Qlik Sense app or
QlikView 11.2 or earlier document, including section access data. Other
elements of the app are not included, for example, sheets, stories,
visualizations, master items or variables.



Only one binary statement is allowed in the script. The binary statement
must be the first statement of the script, even before the SET
statements usually located at the beginning of the
script.



 

[path] filename

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>filename</td>
<td>The name of the file, including the file extension .qvw or .qvf.</td>
</tr>
<tr class="even">
<td>path</td>
<td><p>The path to the file which should be a reference to a folder data connection. This is required if the file is not located in the Qlik Sense working directory.</p>
<p><em>Working directory</em></p>
<p>'lib://Table Files/'</p>
<p>In legacy scripting mode, the following path formats are also supported:</p>
<ul>
<li><p>absolute</p>
<p>c:\data\</p></li>
<li><p>relative to the app containing this script line.</p>
<p>data\</p></li>
</ul>
<p>File system access restriction</p></td>
</tr>
</tbody>
</table>

 

You cannot use binary to load data from an app on the same Qlik Sense
Enterprise deployment by referring to the app ID. You can only load from
a
.qvf
file.

Examples

|                                   |                                                                                                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Binary lib://MyData/customer.qvw; | In this example,  must be in located in the folder connected to the MyData data connection. | | Binary customer.qvf;              | In this example, customer.qvf must be in located in the Qlik Sense working directory.                   |
| Binary c:\\qv\\customer.qvw;      | This example using an absolute file path will only work in legacy scripting mode.                                                                                                                      |

# Comment table

Provides a way of displaying the table comments (metadata) from
databases or spreadsheets.

Table names not present in the app are ignored. If multiple occurrences
of a table name are found, the last value is used. The keyword can be
used to read comments from a data source.

 

comment [tables] tablelist using mapname

comment [table] tablename with comment

 

| Argument                                                                                                       | Description                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  | (table{,table})                                                                                                                                                                                                                                                                                    | | mapname   | The name of a mapping table previously read in a mapping  **LOAD**  or mapping **SELECT statement. |
|  | The name of the table that should be commented.                                                                                                                                                                                                                                                    | | comment   | The comment that should be added to the table.                                                                                                                                                                                                                                                     |

 

Commentmap:

mapping LOAD \* inline [

a,b

Main,This is the fact table

Currencies, Currency helper table

];

comment tables using Commentmap;

 

comment table Main with 'Main fact table';

 

*Comment
field*

*Table/Tables*

# Comment field

Provides a way of displaying the field comments (metadata) from
databases and spreadsheets. Field names not present in the app will be
ignored. If multiple occurrences of a field name are found, the last
value is used.

 

comment [fields] \*fieldlist using mapname

comment [field] fieldname with comment

 

The map table used should have two columns, the first containing field
names and the second the
comments.

 

| Argument                                                                                                         | Description                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  | A comma separated list of the fields to be commented. Using \* as field list indicates all fields. The wildcard characters \* and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used.                                                                   | | mapname     | The name of a mapping table previously read in a mapping  **LOAD**  or mapping **SELECT statement. |
|    | The name of the field that should be commented.                                                                                                                                                                                                                                                    | | comment     | The comment that should be added to the field.                                                                                                                                                                                                                                                     |

 

commentmap:

mapping LOAD \* inline [

a,b

Alpha,This field contains text values

Num,This field contains numeric values

];

comment fields using commentmap;

 

comment field Alpha with AFieldContainingCharacters;

comment field Num with '\*A field containing numbers';

comment Gamma with 'Mickey Mouse field';

 

*Mapping*

*Field/Fields*

# Connect

The
 **CONNECT** 
statement is used to define Qlik Sense access to a general database
through the OLE DB/ODBC interface. For ODBC, the data source first needs
to be specified using the ODBC administrator.



This statement supports only folder data connections in standard mode.
See *File system access restriction*





You cannot currently connect to OLE DB/ODBC databases in Qlik Sense
Cloud.



 

ODBC CONNECT TO connect-string [ (
access_info
) ]

OLEDB CONNECT TO connect-string [ (
access_info
) ]

CUSTOM CONNECT TO connect-string [ (
access_info
) ]

LIB CONNECT TO connection

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>connect-string</td>
<td>connect-string ::= datasourcename { ; conn-spec-item }
<p>The connection string is the data source name and an optional list of one or more connection specification items. If the data source name contains blanks, or if any connection specification items are listed, the connection string must be enclosed by quotation marks.</p>
<p> <p><span class="Code" data-autonumposition="none">conn-spec-item ::=DBQ=<span class="Code" data-autonumposition="none">database_specifier |DriverID=<span class="Code" data-autonumposition="none">driver_specifier |UID=<span class="Code" data-autonumposition="none">userid |PWD=<span class="Code" data-autonumposition="none">password</p>
<p>The possible connection specification items may differ between different databases. For some databases, also other items than the above are possible. For OLE DB, some of the connection specific items are mandatory and not optional.</p></td>
</tr>
<tr class="even">
<td>access_info</td>
<td> <p><span class="Code" data-autonumposition="none">access_item ::= (userid is <span class="Code" data-autonumposition="none">userid | xuserid is <span class="Code" data-autonumposition="none">scrambledusername ) | (password is <span class="Code" data-autonumposition="none">password |xpassword is <span class="Code" data-autonumposition="none">scrambledpassword) |codepage is codepageID |  mode is <span class="Code" data-autonumposition="none">write</p>
<p>codepageID ::= ansi|oem|unicode| codepagenumber</p>
<p>If the connect statement is generated by the provided wizard any user ID and password will be generated with the scrambled  <p>The **codepage is specifier can be used if problems are encountered with national characters in specific ODBC/OLE DB drivers.</p>
<p>If  **mode is write**  is specified in the access_info, the connection will be opened in read-write mode. In all other cases the connection will be opened as read-only.</p></td>
</tr>
<tr class="odd">
<td>connection</td>
<td><p>The name of a data connection stored in the data load editor.</p></td>
</tr>
</tbody>
</table>

If the ODBC is placed before
 **CONNECT** ,
the ODBC interface will be used; else, OLE DB will be used.

Using
LIB CONNECT TO connects to a database using a stored data connection
that was created in the data load editor.

 

ODBC CONNECT TO 'Sales

DBQ=C:\\Program Files\\Access\\Samples\\Sales.mdb' (UserID is sa,
Password is admin);

The data source defined through this statement is used by subsequent
Select (SQL) statements, until a new
 **CONNECT** 
statement is made.

 

LIB CONNECT TO 'MyDataConnection';

### Connect32

This statement is used the same way as the
 **CONNECT** 
statement, but forces a 64-bit system to use a 32-bit ODBC/OLE DB
provider. Not applicable for custom connect.

### Connect64

This statement is used the same way as the as the
 **CONNECT** 
statement, but forces use of a 64-bit provider. Not applicable for
custom connect.

 

ODBC

OLE DB

*To*

# Declare

The
 **Declare** 
statement is used to create field and group definitions, where you can
define relations between fields or functions. A set of field definitions
can be used to automatically generate derived fields, which can be used
as dimensions. For example, you can create a calendar definition, and
use that to generate related dimensions, such as year, month, week and
day, from a date field.

You can use
 **Declare** 
to either set up a new field definition, or to create a field definition
based on an already existing
definition.

## Setting up a new field definition

definition_name:

Declare
[Field[s]] Definition
[Tagged tag_list ]

[Parameters parameter_list ]

Fields field_list 

[Groups group_list ]

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>definition_name</td>
<td><p>Name of the field definition, ended with a colon.</p>
<div class="warning" data-autonumposition="none">
Do not use autoCalendar as name for field definitions, as this name is reserved for auto-generated calendar templates.

<p> </p>
<p>Calendar:</p></td>
</tr>
<tr class="even">
<td>tag_list</td>
<td><p>A comma separated list of tags to apply to fields derived from the field definition. Applying tags is optional, but if you do not apply tags that are used to specify sort order, such as $date, $numeric or $text, the derived field will be sorted by load order as default..</p>
<p> </p>
<p>'$date'</p>
<p><em>Field tags</em></p></td>
</tr>
<tr class="odd">
<td>parameter_list</td>
<td><p>A comma separated list of parameters. A parameter is defined in the form <span class="Code" data-autonumposition="none">name=value and is assigned a start value, which can be overridden when a field definition is re-used. Optional.</p>
<p> </p>
<p>first_month_of_year = 1</p></td>
</tr>
<tr class="even">
<td>field_list</td>
<td><p>A comma separated list of fields to generate when the field definition is used. A field is defined in the form &lt;expression&gt; As field_name tagged tag. Use $1 to reference the data field from which the derived fields should be generated.</p>
<p> </p>
<p>Year($1) As Year tagged '$year'</p></td>
</tr>
<tr class="odd">
<td>group_list</td>
<td><p>A comma separated list of groups to generate when the field definition is used. You can define two different types of groups:</p>
<ul>
<li><p>Drilldown (drilldown)</p>
<p>Drilldown groups contain fields that are hierarchically related.</p></li>
<li><p>Collection ( **collection** )</p>
<p>Collection groups contain fields where the relation is not defined.</p></li>
</ul>
<p>A group is defined in the form &lt;field_list&gt; Type drilldown|collection As group_name . .</p>
<p> </p>
<p>Year, Month, Date Type drilldown As YearMonthDate</p></td>
</tr>
</tbody>
</table>



Calendar: DECLARE FIELD DEFINITION TAGGED '$date' Parameters
first_month_of_year = 1
Fields





Year($1) As Year Tagged ('$numeric'), Month($1) as Month Tagged
('$numeric'), Date($1) as Date Tagged ('$date'), Week($1) as Week Tagged
('$numeric'), Weekday($1) as Weekday Tagged ('$numeric'),
DayNumberOfYear($1, first_month_of_year) as DayNumberOfYear Tagged
('$numeric') Groups Year, Week, Weekday type drilldown as
YearWeekDayName, Year, Month, Date type collection as
YearMonthDate;





 



The calendar is now defined, and you can apply it to the date fields
that have been loaded, in this case OrderDate and ShippingDate, using a
 **Derive** 
clause.

*Derived fields* (full
example)

## Re-using an existing field definition

\<definition name\>:

Declare
[Field][s] Definition


Using \<existing_definition\> 

[With \<parameter_assignment\> ]

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>definition_name</td>
<td><p>Name of the field definition, ended with a colon.</p>
<p> </p>
<p>MyCalendar:</p></td>
</tr>
<tr class="even">
<td>existing_definition</td>
<td><p>The field definition to re-use when creating the new field definition. The new field definition will function the same way as the definition it is based on, with the exception if you use parameter_assignment to change a value used in the field expressions.</p>
<p> </p>
<p>Using Calendar</p></td>
</tr>
<tr class="odd">
<td>parameter_assignment</td>
<td><p>A comma separated list of parameter assignments. A parameter assignment is defined in the form <span class="Code" data-autonumposition="none">name=value and overrides the parameter value that is set in the base field definition. Optional.</p>
<p> </p>
<p>first_month_of_year = 4</p></td>
</tr>
</tbody>
</table>

In this example we re-use the calendar definition that was created in
the previous example. In this case we want to use a fiscal year that
starts in April. This is achieved by assigning the value 4 to the
first_month_of_year parameter, which will affect the DayNumberOfYear
field that is defined.

The example assumes that you use the sample data and field definition
from the previous
example.



MyCalendar: DECLARE FIELD DEFINITION USING Calendar WITH
first_month_of_year=4;





 





DERIVE FIELDS FROM FIELDS OrderDate,ShippingDate USING
MyCalendar;





 



When you have reloaded the data script, the generated fields are
available in the sheet editor, with names OrderDate.MyCalendar.\* and
ShippingDate.MyCalendar.\*.

 

*Derive*

# Derive

The
 **Derive** 
statement is used to generate derived fields based on a field definition
created with a
 **Declare** 
statement. You can either specify which data fields to derive fields
for, or derive them explicitly or implicitly based on field tags.

Derive
[Field[s]] From
[Field[s]] field_list Using definition

Derive
[Field[s]] From Explicit
[Tag[s]] tag_list Using definition

Derive
[Field[s]] From Implicit
[Tag[s]] Using definition

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>definition</td>
<td><p>Name of the field definition to use when deriving fields.</p>
<p>Calendar</p></td>
</tr>
<tr class="even">
<td>field_list</td>
<td><p>A comma separated list of data fields from which the derived fields should be generated, based on the field definition. The data fields should be fields you have already loaded in the script.</p>
<p>OrderDate, ShippingDate</p></td>
</tr>
<tr class="odd">
<td>tag_list</td>
<td><p>A comma separated list of tags. Derived fields will be generated for all data fields with any of the listed tags.</p>
<p>'$date'</p>
<p><em>Field tags</em></p></td>
</tr>
</tbody>
</table>

  - Derive fields for specific data fields.
    
    In this case we specify the OrderDate and ShippingDate
    fields.
    
    
    
    DERIVE FIELDS FROM FIELDS OrderDate,ShippingDate USING Calendar;
    
    

  - Derive fields for all fields with a specific tag.
    
    In this case we derive fields based on Calendar for all fields with
    a
    $date
    tag.
    
    
    
    DERIVE FIELDS FROM EXPLICIT TAGS '$date' USING Calendar;
    
    

  - Derive fields for all fields with the field definition tag.
    
    In this case we derive fields for all data fields with the same tag
    as the Calendar field definition, which in this case is
    $date.
    
    
    
    DERIVE FIELDS FROM IMPLICIT TAG USING Calendar;
    
    

*Derived fields* (full
example)

 

*Declare*

# Direct Discovery field lists

A field list is a comma-separated list of field specifications,
fieldname {, fieldname}. A field specification can be a field name, in
which case the same name is used for the database column name and the
field name. Or a field specification can be a field alias, in which case
a database expression or column name is given a Qlik Sense field name.

Field names can be either simple names or quoted names. A simple name
begins with an alphabetic Unicode character and is followed by any
combination of alphabetic or numeric characters or underscores. Quoted
names begin with a double quotation mark and contain any sequence of
characters. If a quoted name contains double quotation marks, those
quotation marks are represented using two adjacent double quotation
marks.

Qlik Sense field names are case-sensitive. Database field names may or
may not be case-sensitive, depending on the database. A Direct Discovery
query preserves the case of all field identifiers and aliases. In the
following example, the alias "MyState" is used internally to store the
data from the database column
"STATEID".



DIRECT QUERY Dimension STATEID as MyState Measure AMOUNT from SALES_TABLE;



<div class="code" data-autonumposition="none">

 



This differs from the result of an SQL Select statement with an alias.
If the alias is not explicitly quoted, the result contains the default
case of column returned by the target database. In the following
example, the SQL Select statement to an Oracle database creates
"MYSTATE," with all upper case letters, as the internal Qlik Sense alias
even though the alias is specified as mixed case. The SQL Select
statement uses the column name returned by the database, which in the
case of Oracle is all upper
case.



SQL Select STATEID as MyState, STATENAME from STATE_TABLE;



<div class="code" data-autonumposition="none">

 



To avoid this behavior, use the LOAD statement to specify the
alias.



Load STATEID as MyState, STATENAME;  
SQL Select STATEID, STATEMENT from STATE_TABLE;



<div class="code" data-autonumposition="none">

 



In this example, the "STATEID" column is stored internally byQlik Sense
as "MyState".

Most database scalar expressions are allowed as field specifications.
Function calls can also be used in field specifications. Expressions can
contain constants that are boolean, numeric, or strings contained in
single quotation marks (embedded single quotation marks are represented
by adjacent single quotation
marks).

 



DIRECT QUERY 





 DIMENSION 





<span class="Code" data-autonumposition="none"> SalesOrderID,
RevisionNumber






 MEASURE 





 SubTotal AS "Sub Total" 





FROM AdventureWorks.Sales.SalesOrderHeader;



 



DIRECT QUERY 





 DIMENSION 





 "SalesOrderID" AS "Sales Order ID" 





 MEASURE 





<span data-autonumposition="none"> SubTotal,TaxAmt,(SubTotal-TaxAmt) AS
"Net Total"






FROM AdventureWorks.Sales.SalesOrderHeader;



 



DIRECT QUERY 





 DIMENSION 





<span data-autonumposition="none"> (2\*Radius\*3.14159) AS
Circumference,






 Molecules/6.02e23 AS Moles 





 MEASURE 





 Num1 AS numA 





FROM TableName;



 

<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

DIRECT
QUERY



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

DIMENSION



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

concat(region, 'code') AS
region_code



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

MEASURE



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

Num1 AS
NumA



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

FROM TableName;



Direct Discovery does not support using aggregations in
 **LOAD** 
statements. If aggregations are used, the results are unpredictable. A
 **LOAD** 
statement such as the following should not be
used:



DIRECT QUERY DIMENSION stateid, SUM(amount\*7) AS MultiFirst MEASURE
amount FROM sales_table;



The
 **SUM** 
should not be in the
 **LOAD** 
statement.

Direct Discovery also does not support Qlik Sense functions in Direct
Query statements. For example, the following specification for a
 **DIMENSION** 
field results in a failure when the "Mth" field is used as a dimension
in a
visualization:



month(ModifiedDate) as Mth



# Direct Query

The DIRECT QUERY statement allows you to access tables through an ODBC or
OLE DB connection using the Direct Discovery function.



You cannot currently connect to OLE DB/ODBC databases in Qlik Sense
Cloud.



 

DIRECT QUERY DIMENSION fieldlist [MEASURE fieldlist] [DETAIL fieldlist] FROM tablelist

[WHERE where_clause]

 

The
, MEASURE, and
DETAIL
keywords can be used in any order.

The  and FROM
keyword clauses are required on all
DIRECT QUERY
statements. The
FROM keyword
must appear after the
DIMENSION
keyword.

The fields specified directly after the
DIMENSION
keyword are loaded in memory and can be used to create associations
between in-memory and Direct Discovery data.



The DIRECT QUERY statement cannot contain
 or GROUP BY
clauses.



Using the
MEASURE
keyword you can define fields that Qlik Sense is aware of on a “meta
level”. The actual data of a measure field resides only in the database
during the data load process, and is retrieved on an ad hoc basis driven
by the chart expressions that are used in a visualization.

Typically, fields with discrete values that will be used as dimensions
should be loaded with the
DIMENSION
keyword, whereas numbers that will be used in aggregations only should
be selected with the
MEASURE
keyword.

DETAIL fields
provide information or details, like comment fields, that a user may
want to display in a drill-to-details table box.
DETAIL fields
cannot be used in chart expressions.

By design, the
DIRECT QUERY
statement is data-source neutral for data sources that support SQL. For
that reason, the same
DIRECT QUERY
statement can be used for different SQL databases without change. Direct
Discovery generates database-appropriate queries as needed.

Native data-source syntax can be used when the user knows the database
to be queried and wants to exploit database-specific extensions to SQL.
Native data-source syntax is supported:

  - As field expressions in
    DIMENSION
    and
    MEASURE
    clauses
  - As the content of the
    WHERE
    clause

Examples:



DIRECT QUERY > 



> 
> 
> 
> 
> DIMENSION Dim1, Dim2 > 
> 
> 
> 
> 
> 
> MEASURE > > 
> 
> 
> 
> > 
> > 
> > 
> > 
> > <span class="Code" data-autonumposition="none">NATIVE ('X % Y') AS
> > X_MOD_Y

> > 
> > 



FROM TableName





DIRECT > QUERY



> 
> 
> 
> 
> DIMENSION Dim1, > Dim2
> 
> 
> 
> 
> 
> MEASURE X, > Y
> 
> 
> 
> 
> 
> FROM > TableName
> 
> 
> 
> 
> 
> WHERE NATIVE ('EMAIL > MATCHES "\\\*.EDU"')
> 
> 



The following terms are used as keywords and so cannot be used as column
or field names without being quoted: and, as, detach, detail, dimension,
distinct, from, in, is, like, measure, native, not, or, where



 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>fieldlist</td>
<td><p>A comma-separated list of field specifications, <span class="Italic" data-conditions="Targets.NotToTranslate" data-autonumposition="none">fieldname {, fieldname}. A field specification can be a field name, in which case the same name is used for the database column name and the Qlik Sense field name. Or a field specification can be a &quot;field alias,&quot; in which case a database expression or column name is given a Qlik Sense field name.</p>
<p><em>Direct Discovery field lists</em></p></td>
</tr>
<tr class="even">
<td>tablelist</td>
<td><p>A list of the names of tables or views in the database from which data will be loaded. Typically, it will be views that contain a JOIN performed on the database.</p></td>
</tr>
<tr class="odd">
<td>where_clause</td>
<td><p>The full syntax of database  <p>NOT is a unary operator, as opposed to a modifier on certain keywords.</p>
<p>Examples:</p>

<span class="Code" data-autonumposition="none">WHERE x &gt; 100 AND &quot;Region Code&quot; IN ('south', 'west')


<span class="Code" data-autonumposition="none">WHERE Code IS NOT NULL and Code LIKE '%prospect'


<span class="Code" data-autonumposition="none">WHERE NOT X in (1,2,3)

<p>The last example can not be written as:</p>
<div class="code" data-autonumposition="none">
WHERE X NOT in (1,2,3)
</td>
</tr>
</tbody>
</table>

 

In this example, a database table called TableName, containing fields
Dim1, Dim2, Num1, Num2 and Num3, is used.Dim1 and Dim2 will be loaded
into the Qlik Sense
dataset.



DIRECT QUERY DIMENSTION Dim1, Dim2 MEASURE Num1, Num2, Num3 FROM TableName
;





 



Dim1 and Dim2 will be available for use as dimensions. Num1, Num2 and
Num3 will be available for aggregations. Dim1 and Dim2 are also
available for aggregations. The type of aggregations for which Dim1 and
Dim2 can be used depends on their data types. For example, in many cases
DIMENSION
fields contain string data such as names or account numbers.Those fields
cannot be summed, but they can be counted:
count(Dim1).



DIRECT QUERY
statements are written directly in the script editor. To simplify
construction of
DIRECT QUERY
statements, you can generate a
SELECT
statement from a data connection, and then edit the generated script to
change it into a
DIRECT QUERY
statement.  
For example, the
SELECT
statement:  
  
   <span class="Code" data-autonumposition="none"> SalesOrderID,  
   <span class="Code" data-autonumposition="none"> OrderDate,  
,   <span class="Code" data-autonumposition="none"> TaxAmt  
FROM MyDB.Sales.SalesOrderHeader;  
  
could be changed to the following
DIRECT QUERY
statement:  
  
   <span class="Code" data-autonumposition="none"> DIMENSION   
   <span class="Code" data-autonumposition="none"> RevisionNumber  
  
   <span class="Code" data-autonumposition="none"> SubTotal,  
<span class="Code" data-autonumposition="none"> TaxAmt  
  
   <span class="Code" data-autonumposition="none">OrderDate  
  
FROM MyDB.Sales.SalesOrderHeader;



 

Accessing large data sets with Direct Discovery

Direct Discovery
variables

# Directory

The
 **Directory** 
statement defines which directory to look in for data files in
subsequent
 **LOAD** 
statements, until a new
 **Directory** 
statement is
made.

 

Directory[path]

 

If the
 **Directory** 
statement is issued without a
 path or left out, Qlik Sense will look in the Qlik Sense working
directory.

*Working directory*

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> ** path** </td>
<td><p>A text that can be interpreted as the path to the qvf file.</p>
<p>The path is the path to the file, either:</p>
<p>'lib://Table Files/'</p>
<p>In legacy scripting mode, the following path formats are also supported:</p>
<ul>
<li><p>absolute</p>
<p>c:\data\</p></li>
<li><p>relative to the Qlik Sense app working directory.</p>
<p>data\</p></li>
<li><p>URL address (HTTP or FTP), pointing to a location on the Internet or an intranet.</p>
<p>http://www.qlik.com</p></li>
</ul></td>
</tr>
</tbody>
</table>

 

Directory lib://Data/; 

Directory
c:\\userfiles\\data;

 

*Load*

# Disconnect

The
 **Disconnect** 
statement terminates the current ODBC/OLE DB/Custom connection. This
statement is optional.

 

Disconnect

 

The connection will be automatically terminated when a new
 **connect** 
statement is executed or when the script execution is
finished.

 

Disconnect;

# Drop field

One or several Qlik Sense fields can be dropped from the data model, and
thus from memory, at any time during script execution, by means of a
drop field statement.



Both
drop field and
drop fields are allowed forms with no difference in effect. If no
table is specified, the field will be dropped from all tables where it
occurs.



 

Drop field fieldname { , fieldname2 ...}
[tablename1 { , tablename2 ...}]

Drop fields fieldname { , fieldname2 ...}
[tablename1 { , tablename2 ...}]

 

Drop field A;

Drop fields A,B;

Drop field A from X;

Drop fields A,B from X,Y;

 

*Drop
table*

*Drop*

*Field/Fields*

# Drop table

One or several Qlik Sense internal tables can be dropped from the data
model, and thus from memory, at any time during script execution, by
means of a
drop table statement.

 

drop table
 tablename {, tablename2 ...}

drop tables tablename {, tablename2 ...}

 



The forms
drop table and
drop tables are both accepted.



The following items will be lost as a result of this:

  - The actual table(s).
  - All fields which are not part of remaining tables.
  - Field values in remaining fields, which came exclusively from the
    dropped table(s).

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>drop table Orders, Salesmen, T456a;</td>
<td>This line results in three tables being dropped from memory.</td>
</tr>
<tr class="even">
<td><p>Tab1:</p>
<p>Load * Inline [</p>
<p>Customer, Items, UnitPrice</p>
<p>Bob, 5, 1.50</p>
<p>];</p>
<p> </p>
<p>Tab2:</p>
<p>LOAD Customer, Sum( Items * UnitPrice ) as Sales</p>
<p>resident Tab1</p>
<p>group by Customer;</p>
<p> </p>
<p>drop table Tab1;</p></td>
<td><p>Once the table Tab2 is created, the table Tab1 is dropped.</p></td>
</tr>
</tbody>
</table>

 

drop table Orders, Salesmen, T456a;

This line results in three tables being dropped from memory.

 

Tab1:

SQL SELECT \* from Trans;

LOAD Customer, Sum( sales ) resident Tab1 group by Month;

drop table Tab1;

As a result only the aggregates remain in the memory. Trans data is
discarded.

 

*Rename table*

*Drop
field*

*Drop*

*Table/Tables*

# Drop

The
 **Drop** 
script keyword can be used to drop tables or fields from the database.

*Drop field*

*Drop
table*

# Execute

The
 **Execute** 
statement is used to run other programs while Qlik Sense is loading
data. For example, to make conversions that are necessary.



This statement is not supported in standard mode. See *File system
access restriction*





This statement is not supported in standard mode or in Qlik Sense
Cloud.



 

execute commandline

 

| Argument                                                                                                         | Description                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| commandline | A text that can be interpreted by the operating system as a command line. You can refer to an absolute file path or a lib:// folder path. |

If you want to use
 **Execute** 
the following conditions need to be met:

  - You must run in legacy mode (applicable for Qlik Sense and Qlik
    Sense Desktop).

  - You need to set OverrideScriptSecurity to 1 in
    Settings.ini
    (applicable for Qlik
    Sense).
    
    Settings.ini
    is located in
    C:\\ProgramData\\Qlik\\Sense\\Engine\\
    and is generally an empty file.

<div class="warning" data-autonumposition="none">

If you set OverrideScriptSecurity to enable
 **Execute** ,
any user can execute files on the server. For example, a user can attach
an executable file to an app, and then execute the file in the data load
script.



Do the following:

1.  Make a copy of
    Settings.ini
    and open it in a text editor.

2.  Check that the file includes
    [Settings     7] in the first line.

3.  Insert a new line and type
    OverrideScriptSecurity=1.

4.  Insert an empty line at the end of the file.

5.  Save the file.

6.  Substitute
    Settings.ini
    with your edited file.

7.  Restart Qlik Sense Engine Service (QES).



If Qlik Sense is running as a service, some commands may not behave as
expected.



 

Execute C:\\Program Files\\Office12\\Excel.exe;

Execute lib://win\\notepad.exe // win is a folder connection referring
to
c:\\windows

# Field/Fields

The
 **Field** 
and
 **Fields** 
script keywords are used in
, **Derive,
, **Comment,
 **Rename** 
and
 **Tag/Untag** 
statements.

*Drop field*

*Comment field*

*Rename
field*

*Tag*

*Untag*

*Declare*

*Derive*

# FlushLog

The
 **FlushLog** 
statement forces Qlik Sense to write the content of the script buffer to
the script log file.

 

FlushLog

 

The content of the buffer is written to the log file. This command can
be useful for debugging purposes, as you will receive data that
otherwise may have been lost in a failed script
execution.

 

FlushLog;

# Force

The
 **force** 
statement forces Qlik Sense to interpret field names and field values of
subsequent
 **LOAD** 
and
 **SELECT** 
statements as written with only upper case letters, with only lower case
letters, as always capitalized or as they appear (mixed). This statement
makes it possible to associate field values from tables made according
to different conventions.

 

Force ( capitalization |
case upper
| case lower |
case mixed )

 

If nothing is specified, force case mixed is assumed. The force
statement is valid until a new force statement is made.

The
 **force** 
statement has no effect in the access section: all field values loaded
are case insensitive.

 

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>This example shows how to force capitalization.</p>
<p>FORCE Capitalization;</p>
<p>Capitalization:</p>
<p>LOAD * Inline [</p>
<p>ab</p>
<p>Cd</p>
<p>eF</p>
<p>GH</p>
<p>];</p></td>
<td><p>The  **Capitalization ** table contains the following values:</p>
<p>Ab</p>
<p>Cd</p>
<p>Ef</p>
<p>Gh</p>
<p>All values are capitalized.</p></td>
</tr>
<tr class="even">
<td><p>This example shows how to force case upper.</p>
<p>FORCE Case Upper;</p>
<p>CaseUpper:</p>
<p>LOAD * Inline [</p>
<p>ab</p>
<p>Cd</p>
<p>eF</p>
<p>GH</p>
<p>];</p></td>
<td><p>The  **CaseUpper**  table contains the following values:</p>
<p>AB</p>
<p>CD</p>
<p>EF</p>
<p>GH</p>
<p>All values are upper case.</p></td>
</tr>
<tr class="odd">
<td><p>This example shows how to force case lower.</p>
<p>FORCE Case Lower;</p>
<p>CaseLower:</p>
<p>LOAD * Inline [</p>
<p>ab</p>
<p>Cd</p>
<p>eF</p>
<p>GH</p>
<p>];</p></td>
<td><p>The  **CaseLower**  table contains the following values:</p>
<p>ab</p>
<p>cd</p>
<p>ef</p>
<p>gh</p>
<p>All values are lower case.</p></td>
</tr>
<tr class="even">
<td><p>This example shows how to force case mixed.</p>
<p>FORCE Case Mixed;</p>
<p>CaseMixed:</p>
<p>LOAD * Inline [</p>
<p>ab</p>
<p>Cd</p>
<p>eF</p>
<p>GH</p>
<p>];</p></td>
<td><p>The  **CaseMixed**  table contains the following values:</p>
<p>ab</p>
<p>Cd</p>
<p>eF</p>
<p>GH</p>
<p>All values are as they appear in the script.</p></td>
</tr>
</tbody>
</table>

 

*Load*

*Select*

# From

The
 **From** 
script keyword is used in
 **Load** 
statements to refer to a file, and in
 **Select** 
statements to refer to a database table or
view.

*Load*

*Select*

# Let

The
 **let** 
statement is a complement to the
 **set** 
statement, used for defining script variables. The
 **let** 
statement, in opposition to the
 **set** 
statement, evaluates the expression on the right side of the ' =' before
it is assigned to the
variable.

 

Let variablename=expression

 

The word
 **let** 
may be omitted, but the statement then becomes a control statement. Such
a statement without the keyword
 **let** 
must be contained within a single script row and may be terminated
either with a semicolon or end-of-line.

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Set x=3+4;</p>
<p>Let y=3+4;</p>
<p>z=$(y)+1;</p></td>
<td><p> <p>$(y) will be evaluated as ' 7 '</p>
<p>$(z) will be evaluated as ' 8 '</p></td>
</tr>
<tr class="even">
<td>Let T=now( );</td>
<td>$(T) will be given the value of the current time.</td>
</tr>
</tbody>
</table>

 

Set x=3+4;

Let
y=3+4;

z=$(y)+1;

$(x)
will be evaluated as ' 3+4
'

$(y)
will be evaluated as ' 7
'

$(z)
will be evaluated as ' 8 '

 

Let T=now(
);

$(T)
will be given the value of the current time.

 

*Set*

*Working with variables in the data load editor*.

#  Load

The
 **LOAD** 
statement loads fields from a file, from data defined in the script,
from a previously loaded table, from a web page, from the result of a
subsequent
 **SELECT** 
statement or by generating data automatically.It is also possible to
load data from analytic connections.

 

 [ distinct ] fieldlist

[(
file [ format-spec ]
|

fieldassource [format-spec]|

inline data
[ format-spec ] |


resident table-label
|


autogenerate size
)
|[script] tabledescription)]

[
where criterion
|
while criterion
]

[ group by groupbyfieldlist
]

[order by orderbyfieldlist
]

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>distinct</td>
<td> **distinct**  is a predicate used if only the first of duplicate records should be loaded.</td>
</tr>
<tr class="even">
<td>fieldlist</td>
<td><span class="user_input" data-autonumposition="none">fieldlist ::= ( * | field {,<span class="user_input" data-autonumposition="none"> * | field } )
<p>A list of the fields to be loaded. Using * as a field list indicates all fields in the table.</p>
<span class="user_input" data-autonumposition="none">field ::= ( fieldref |<span class="user_input" data-autonumposition="none"> expression ) [as<span class="user_input" data-autonumposition="none"> aliasname ]
<p>The field definition must always contain a literal, a reference to an existing field, or an expression.</p>
] ) <p>fieldname is a text that is identical to a field name in the table. Note that the field name must be enclosed by straight double quotation marks or square brackets if it contains e.g. spaces. Sometimes field names are not explicitly available. Then a different notation is used:</p>
<p>@ <p>@<span class="user_input" data-autonumposition="none">startpos:<span class="user_input" data-autonumposition="none">endpos represents the start and end positions of a field in a file with fixed length records. The positions must both be positive integers. The two numbers must be preceded by &quot;@&quot; and separated by a colon. The numbering is always made from 1 and up to the number of positions. In the last field, **n is used as end position.</p>
<ul>
<li>If @ <li>If @<span class="user_input" data-autonumposition="none">startpos:<span class="user_input" data-autonumposition="none">endpos is immediately followed by the character **R, the bytes read will be interpreted as a binary real number (IEEE 32-bit or 64 bit floating point). The number of positions read must be 4 or 8.</li>
<li>If @<span class="user_input" data-autonumposition="none">startpos:<span class="user_input" data-autonumposition="none">endpos is immediately followed by the character  **B** , the bytes read will be interpreted as a BCD (Binary Coded Decimal) numbers according to the COMP-3 standard. Any number of bytes may be specified.</li>
</ul>
<p> <p>**as is used for assigning a new name to the field.</p></td>
</tr>
<tr class="odd">
<td>from</td>
<td><p> <p><span class="user_input" data-autonumposition="none">file ::= [ path ] filename</p>
<p> <p><strong>Example, attached file in Qlik Sense Cloud Business:</strong> <span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">'lib://AttachedFiles/target.qvd'</p>
<p>If the path is omitted, Qlik Sense searches for the file in the directory specified by the  **Directory statement. If there is no **Directory statement, Qlik Sense searches in the working directory, C:\Users\{user}\Documents\Qlik\Sense\Apps** .</p>
<p><em>Directory</em></p>
<div class="note" data-conditions="Targets.NotInCloud" data-autonumposition="none">
In a Qlik Sense server installation, the working directory is specified in Qlik Sense Repository Service, by default it is C:\ProgramData\Qlik\Sense\Apps. See the Qlik Management Console help for more information.

<p>The  format-spec ::= ( fspec-item { , fspec-item } )
<p>The format specification consists of a list of several format specification items, within brackets.</p>
<p><em>Format specification items</em></p>

You can use the <em>URL is</em> format specification to override the URL of a web file data connection, for example if you need to create a dynamic URL based on other data that was loaded.

<p>Legacy scripting mode</p>
<p>In legacy scripting mode, the following path formats are also supported:</p>
<ul>
<li><p>absolute</p>
<p>c:\data\</p></li>
<li><p>relative to the Qlik Sense app working directory.</p>
<p>data\</p></li>
<li><p>URL address (HTTP or FTP), pointing to a location on the Internet or an intranet.</p>
<p>http://www.qlik.com</p></li>
</ul></td>
</tr>
<tr class="even">
<td>from_field</td>
<td> is used if data should be loaded from a previously loaded field. <p><span class="user_input" data-autonumposition="none">fieldassource::=(<span class="user_input" data-autonumposition="none">tablename, fieldname)</p>
<p>The field is the name of the previously loaded  format-spec ::= ( fspec-item {, fspec-item } )
<p>The format specification consists of a list of several format specification items, within brackets.</p></td>
</tr>
<tr class="odd">
<td>inline</td>
<td> is used if data should be typed within the script, and not loaded from a file. <p><span class="user_input" data-autonumposition="none">data ::= [ text ]</p>
<p>Data entered through an  format-spec ::= ( fspec-item {, fspec-item } )
<p>The format specification consists of a list of several format specification items, within brackets.</p></td>
</tr>
<tr class="even">
<td>resident</td>
<td> is used if data should be loaded from a previously loaded table. <p>table label is a label preceding the  **LOAD**  or **SELECT statement(s) that created the original table. The label should be given with a colon at the end.</p>
<p><em>Loading data from a previously loaded table</em></p>
<p><em>Table labels</em></p></td>
</tr>
<tr class="odd">
<td>autogenerate</td>
<td> is used if data should be automatically generated by Qlik Sense. <p><span class="user_input" data-autonumposition="none">size ::= number</p>
<p> <p>The field list must not contain expressions which require data from an external data source or a previously loaded table, unless you refer to a single field value in a previously loaded table with the Peek function.</p></td>
</tr>
<tr class="even">
<td>extension</td>
<td><p>You can load data from analytic connections. You need to use the extension clause to call a function defined in the server-side extension (SSE) plugin, or evaluate a script.</p>
<p>You can send a single table to the SSE plugin, and a single data table is returned. If the plugin does not specify the names of the fields that are returned, the fields will be named Field1, Field2, and so on.</p>
<p>Extension pluginname.functionname( tabledescription );</p>
<ul>
<li><p>Loading data using a function in an SSE plugin</p>
<p><span class="user_input" data-autonumposition="none">tabledescription ::= (table { ,tablefield} )</p>
<p>If you do not state table fields, the fields will be used in load order.</p></li>
<li><p>Loading data by evaluating a script in an SSE plugin</p>
<p><span class="user_input" data-autonumposition="none">tabledescription ::= ( script, table { ,tablefield} )</p></li>
</ul>
<p>Data type handling in the table field definition</p>
<p>Data types are automatically detected in analytic connections. If the data has no numeric values and at least one non-NULL text string, the field is considered as text. In any other case it is considered as numeric.</p>
<p>You can force the data type by wrapping a field name with String() or Mixed().</p>
<ul>
<li> <li>Mixed() forces the field to be dual.</li>
</ul>
<p>String() or Mixed() cannot be used outside extension table field definitions, and you cannot use other Qlik Sense functions in a table field definition.</p>
<p>More about analytic connections</p>
<p>You need to configure analytic connections before you can use them.</p>
<p>Qlik Sense Enterprise: <a href="/Subsystems/ManagementConsole/Content/Sense_QMC/create-analytic-connection.htm">Creating an analytic connection</a></p>
<p>Qlik Sense Desktop: <em>Configuring analytic connections in Qlik Sense Desktop</em>.</p>
<p>You can read more about analytic connections in the GitHub repository. <a href="https://github.com/qlik-oss/server-side-extension" class="see-also-link-external">qlik-oss/server-side-extension</a></p></td>
</tr>
<tr class="odd">
<td>where</td>
<td> is True. <p>criterion is a logical expression.</p></td>
</tr>
<tr class="even">
<td>while</td>
<td><p> <p>criterion is a logical expression.</p></td>
</tr>
<tr class="odd">
<td>group by</td>
<td><p> <p><span class="user_input" data-autonumposition="none">groupbyfieldlist ::= (fieldname { ,fieldname } )</p></td>
</tr>
<tr class="even">
<td>order by</td>
<td> **order by is a clause used for sorting the records of a resident table before they are processed by the **load**  statement. The resident table can be sorted by one or more fields in ascending or descending order. The sorting is made primarily by numeric value and secondarily by national collation order. This clause may only be used when the data source is a resident table.
<p>The ordering fields specify which field the resident table is sorted by. The field can be specified by its name or by its number in the resident table (the first field is number 1).</p>
<p>orderbyfieldlist ::= fieldname [ sortorder ] { , fieldname [ sortorder ] }</p>
<p> <p>fieldname, path, filename and aliasname are text strings representing what the respective names imply. Any field in the source table can be used as fieldname. However, fields created through the as clause (aliasname) are out of scope and cannot be used inside the same **load statement.</p></td>
</tr>
</tbody>
</table>

If no source of data is given by means of a
, **inline,
, **from_field, extension or
 **autogenerate** 
clause, data will be loaded from the result of the immediately
succeeding
 **SELECT** 
or
 **LOAD** 
statement. The succeeding statement should not have a prefix.

*Loading data from a previously loaded table*

 

Loading different file formats

Load a delimited data file with default options:

LOAD \* from data1.csv;

 

Load a delimited data file from a library connection (MyData):

LOAD \* from 'lib://MyData/data1.csv';

 

Load all delimited data files from a library connection (MyData):

LOAD \* from 'lib://MyData/\*.csv';

 

Load a delimited file, specifying comma as delimiter and with embedded
labels:

LOAD \* from 'c:\\userfiles\\data1.csv' (ansi, txt, delimiter is ',',
embedded labels);

 

Load a delimited file specifying tab as delimiter and with embedded
labels:

LOAD \* from 'c:\\userfiles\\data2.txt' (ansi, txt, delimiter is '\\t',
embedded labels);

 

Load a dif file with embedded headers:

LOAD \* from file2.dif (ansi, dif, embedded labels);

 

Load three fields from a fixed record file without headers:

LOAD @1:2 as ID, @3:25 as Name, @57:80 as City from data4.fix (ansi,
fix, no labels, header is 0, record is 80);

 

Load a QVX file, specifying an absolute path:

LOAD \* from C:\\qdssamples\\xyz.qvx (qvx);

 

Loading web files

Load from the default URL set in the web file data connection:

LOAD \* from [lib://MyWebFile];

 

Load from a specific URL, and override the URL set in the web file data
connection:

LOAD \* from [lib://MyWebFile] (URL is
'http://localhost:8000/foo.bar');

 

Load from a specific URL set in a variable using dollar-sign expansion:

SET dynamicURL = 'http://localhost/foo.bar';

LOAD \* from [lib://MyWebFile] (URL is '$(dynamicURL)');

Selecting certain fields, renaming and calculating fields

Load only three specific fields from a delimited file:

LOAD FirstName, LastName, Number from data1.csv;

 

Rename first field as A and second field as B when loading a file
without labels:

LOAD @1 as A, @2 as B from data3.txt (ansi, txt, delimiter is '\\t', no
labels);

 

Load Name as a concatenation of FirstName, a space character, and
LastName:

LOAD FirstName&' '\&LastName as Name from data1.csv;

 

Load Quantity, Price and Value (the product of Quantity and Price):

LOAD Quantity, Price, Quantity\*Price as Value from data1.csv;

Selecting certain records

Load only unique records, duplicate records will be discarded:

LOAD distinct FirstName, LastName, Number from data1.csv;

 

Load only records where the field Litres has a value above zero:

LOAD \* from Consumption.csv where Litres\>0;

Loading data not on file and auto-generated data

Load a table with inline data, two fields named CatID and Category:

LOAD \* Inline

[CatID, Category

0,Regular

1,Occasional

2,Permanent];

 

Load a table with inline data, three fields named UserID, Password and
Access:

LOAD \* Inline [UserID, Password, Access

A, ABC456, User

B, VIP789, Admin];

 

Load a table with 10 000 rows. Field A will contain the number of the
read record (1,2,3,4,5...) and field B will contain a random number
between 0 and 1:

LOAD RecNo( ) as A, rand( ) as B autogenerate(10000);



The parenthesis after autogenerate is allowed but not required.



Loading data from a previously loaded table

First we load a delimited table file and name it tab1:

tab1:

SELECT A,B,C,D from 'lib://MyData/data1.csv';

 

Load fields from the already loaded tab1 table as tab2:

tab2:

LOAD A,B,month(C),A\*B+D as E resident tab1;

 

Load fields from already loaded table tab1 but only records where A is
larger than B:

tab3:

LOAD A,A+B+C resident tab1 where A\>B;

 

Load fields from already loaded table tab1 ordered by A:

LOAD A,B\*C as E resident tab1 order by A;

 

Load fields from already loaded table tab1, ordered by the first field,
then the second field:

LOAD A,B\*C as E resident tab1 order by 1,2;

 

Load fields from already loaded table tab1 ordered by C descending, then
B in ascending order, and then the first field in descending order:

LOAD A,B\*C as E resident tab1 order by C desc, B asc, 1 des;

Loading data from previously loaded fields

Load field Types from previously loaded table Characters as A:

LOAD A from_field (Characters, Types);

Loading data from a succeeding table (preceding load)

Load A, B and calculated fields X and Y from Table1 that is loaded in
succeeding
SELECT
statement:

LOAD A, B, if(C\>0,'positive','negative') as X, weekday(D) as Y;

SELECT A,B,C,D from Table1;

 

Grouping data

Load fields grouped (aggregated) by ArtNo:

LOAD ArtNo, round(Sum(TransAmount),0.05) as ArtNoTotal from table.csv
group by ArtNo;

 

Load fields grouped (aggregated) by Week and ArtNo:

LOAD Week, ArtNo, round(Avg(TransAmount),0.05) as WeekArtNoAverages from
table.csv group by Week, ArtNo;

 

Reading one record repeatedly

In this example we have a input file Grades.csv containing the grades
for each student condensed in one field:

Student,Grades

Mike,5234

John,3345

Pete,1234

Paul,3352

The grades, in a 1-5 scale, represent subjects Math, English, Science
and History. We can separate the grades into separate values by reading
each record several times with a
 **while** 
clause, using the
IterNo( ) function as a counter. In each read, the grade is extracted
with the
 **Mid** 
function and stored in Grade, and the subject is selected using the
 **pick** 
function and stored in Subject. The final
 **while** 
clause contains the test to check if all grades have been read (four per
student in this case), which means next student record should be read.

MyTab:

LOAD Student,

mid(Grades,IterNo( ),1) as Grade,

pick(IterNo( ), 'Math', 'English', 'Science', 'History') as Subject from
Grades.csv

while IsNum(mid(Grades,IterNo(),1));

 

The result is a table containing this data:

![](Resources/Images/ex_gen_LoadRepeated.png)

Loading from analytic connections

The following sample data is used.



Values: Load Rand() as A, Rand() as B, Rand() as C AutoGenerate(50);



 

Loading data using a function

In these examples, we assume that we have an analytic connection plugin
named <span class="user_input" data-autonumposition="none">P that
contains a custom function
Calculate(Parameter1, Parameter2). The function returns the table
<span class="user_input" data-autonumposition="none">Results that
contains the fields
 and <span class="user_input" data-autonumposition="none">Field2.



Load \* Extension P.Calculate( Values{A, C} );



Load all fields that are returned when sending the fields A and C to the
function.



Load Field1 Extension P.Calculate( Values{A, C} );



Load only the Field1 field when sending the fields A and C to the
function.



Load \* Extension P.Calculate( Values );



Load all fields that are returned when sending the fields A and B to the
function. As fields are not specified, A and B are used as they are the
first in order in the table.



Load \* Extension P.Calculate( Values {C, C});



Load all fields that are returned when sending the field C to both
parameters of the function.



Load \* Extension P.Calculate( Values {String(A), Mixed(B)});



Load all fields that are returned when sending the field A forced as a
string and B forced as a numeric to the function.

Loading data by evaluating a script

<div class="code" data-autonumposition="none">

Load A as A_echo, B as B_echo Extension R.ScriptEval( 'q;', Values{A,
B} );



Load the table returned by the script q when sending the values of A and
B.

<div class="code" data-autonumposition="none">

Load \* Extension R.ScriptEval( '$(My_R_Script)', Values{A, B} );



Load the table returned by the script stored in the My_R_Script
variable when sending the values of A and B.



Load \* Extension R.ScriptEval( '$(My_R_Script)', Values{B as D, \*}
);



Load the table returned by the script stored in the My_R_Script
variable when sending the values of B renamed to D, A and C. Using \*
sends the remaining unreferenced fields.

 

*Best practices for data
modeling*

# Loosen Table

One or more Qlik Sense internal data tables can be explicitly declared
loosely coupled during script execution by using a
Loosen Table statement. When a table is loosely coupled, all
associations between field values in the table are removed. A similar
effect could be achieved by loading each field of the loosely coupled
table as independent, unconnected tables. Loosely coupled can be useful
during testing to temporarily isolate different parts of the data
structure. A loosely coupled table can be identified in the table viewer
by the dotted lines. The use of one or more
Loosen Table statements in the script will make Qlik Sense disregard any
setting of tables as loosely coupled made before the script execution.

 

Loosen Tabletablename [ ,
tablename2
...]

Loosen Tablestablename [ ,
tablename2
...]

 

Either syntax:
Loosen Table or
Loosen Tables can be used.



Should Qlik Sense find circular references in the data structure which
cannot be broken by tables declared loosely coupled interactively or
explicitly in the script, one or more additional tables will be forced
loosely coupled until no circular references remain. When this happens,
the Loop Warning dialog, gives a warning.



 

Tab1:

SELECT \* from Trans;

Loosen Table
Tab1;

# Map

The
map ... using statement is used for mapping a certain field value or
expression to the values of a specific mapping table. The mapping table
is created through the
 **Mapping** 
statement.

 

 mapname

 

The automatic mapping is done for fields loaded after the
Map … Using statement until the end of the script or until an
 **Unmap** 
statement is encountered.

The mapping is done last in the chain of events leading up to the field
being stored in the internal table in Qlik Sense. This means that
mapping is not done every time a field name is encountered as part of an
expression, but rather when the value is stored under the field name in
the internal table. If mapping on the expression level is required, the
 **Applymap()** 
function has to be used
instead.

 

| Argument                                                                                                       | Description                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  | A comma separated list of the fields that should be mapped from this point in the script. Using \* as field list indicates all fields. The wildcard characters \* and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used.                               | | mapname   | The name of a mapping table previously read in a  **mapping load**  or **mapping select statement. |

Examples and
results:

| Example                 | Result                                                    |
| ----------------------- | --------------------------------------------------------- |
| Map Country Using Cmap; | Enables mapping of the field Country using the map Cmap.  |
| Map A, B, C Using X;    | Enables mapping of the fields A, B and C using the map X. |
| Map \* Using GenMap;    | Enables mapping of all fields using GenMap.               |

 

*Mapping*

*Unmap*

*Mapping
functions*

# NullAsNull

The
 **NullAsNull** 
statement turns off the conversion of NULL values to string values
previously set by a
 **NullAsValue** 
statement.

 

NullAsNull \*fieldlist

 

The
 **NullAsValue** 
statement operates as a switch and can be turned on or off several times
in the script, using either a
 **NullAsValue** 
or a
 **NullAsNull** 
statement.

 

| Argument    | Description                                                                                                                                                                                                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \*fieldlist | A comma separated list of the fields for which  **NullAsNull**  should be turned on. Using \* as field list indicates all fields. The wildcard characters \* and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

 

NullAsNull A,B;

LOAD A,B from
x.csv;

 

*NullAsValue*

# NullAsValue

The
 **NullAsValue** 
statement specifies for which fields that NULL should be converted to a
value.

 

NullAsValue \*fieldlist

 

By default, Qlik Sense considers NULL values to be missing or undefined
entities. However, certain database contexts imply that NULL values are
to be considered as special values rather than simply missing values.
The fact that NULL values are normally not allowed to link to other NULL
values can be suspended by means of the
 **NullAsValue** 
statement.

The
 **NullAsValue** 
statement operates as a switch and will operate on subsequent loading
statements. It can be switched off again by means of the
 **NullAsNull** 
statement.

 

| Argument    | Description                                                                                                                                                                                                                                                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \*fieldlist | A comma separated list of the fields for which  **NullAsValue**  should be turned on. Using \* as field list indicates all fields. The wildcard characters \* and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

 

NullAsValue A,B;

Set NullValue = 'NULL';

LOAD A,B from x.csv;

 

*NULL value
handling*

*NullAsNull*

# Qualify

The
 **Qualify** 
statement is used for switching on the qualification of field names,
i.e. field names will get the table name as a
prefix.

 

Qualify \*fieldlist

 

The automatic join between fields with the same name in different tables
can be suspended by means of the
 **qualify** 
statement, which qualifies the field name with its table name. If
qualified, the field name(s) will be renamed when found in a table. The
new name will be in the form of
. Tablename
is equivalent to the label of the current table, or, if no label exists,
to the name appearing after
 **from** 
in
 **LOAD** 
and
 **SELECT** 
statements.

The qualification will be made for all fields loaded after the
 **qualify** 
statement.

Qualification is always turned off by default at the beginning of script
execution. Qualification of a field name can be activated at any time
using a
 **qualify** 
statement. Qualification can be turned off at any time using an
 **Unqualify** 
statement.



The
 **qualify** 
statement should not be used in conjunction with partial
reload.



 

| Argument    | Description                                                                                                                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \*fieldlist | A comma separated list of the fields for which qualification should be turned on. Using \* as field list indicates all fields. The wildcard characters \* and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

 

Qualify B;

LOAD A,B from x.csv;

LOAD A,B from y.csv;

The two tables
 **x.csv** 
and
 **y.csv** 
are associated only through
 **A** .
Three fields will result: A, x.B, y.B.

 

In an unfamiliar database, it is often useful to start out by making
sure that only one or a few fields are associated, as illustrated in
this example:

qualify \*;

unqualify TransID;

SQL SELECT \* from tab1;

SQL SELECT \* from tab2;

SQL SELECT \* from tab3;

Only
 **TransID** 
will be used for associations between the tables
, tab2
and
tab3.

 

*Unqualify*

# Rem

The
 **rem** 
statement is used for inserting remarks, or comments, into the script,
or to temporarily deactivate script statements without removing
them.

 

Rem string

 

Everything between the
 **rem** 
and the next semicolon
 **;** 
is considered to be a comment.

There are two alternative methods available for making comments in the
script:

1.  It is possible to create a comment anywhere in the script - except
    between two quotes - by placing the section in question between
     **/\*** 
    and
     **\*/** .
2.  When typing
     **//** 
    in the script, all text that follows to the right on the same row
    becomes a comment. (Note the exception //: that may be used as part
    of an Internet address.)

 

| Argument | Description        |
| -------- | ------------------ |
| string   | An arbitrary text. |

 

Rem \*\* This is a comment \*\*;

/\* This is also a comment \*/

// This is a comment as
well

# Rename field

This script function renames one or more existing Qlik Sense field(s)
after they have been loaded.



It is not recommended to name a variable identically to a field or a
function in Qlik Sense.



Either syntax:
rename field or
rename fields can be used.

 

Rename Field (using mapname
|
oldname to newname{
,
oldname newname })

Rename Fields (using mapname
|
oldname to newname{
,
oldname newname })

 

| Argument | Description                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| mapname  | The name of a previously loaded mapping table containing one or more pairs of old and new field names. |
| oldname  | The old field name.                                                                                    |
| newname  | The new field name.                                                                                    |

 

You cannot rename two fields to having the same name.

 

Rename Field XAZ0007 to Sales;

 

FieldMap:

Mapping SQL SELECT oldnames, newnames from datadictionary;

Rename Fields using FieldMap;

 

*Rename
table*

*Rename*

*Field/Fields*

*To*

# Rename table

This script function renames one or more existing Qlik Sense internal
table(s) after they have been loaded.

Either syntax:
rename table or
rename tables can be used.

 

Rename Table (using mapname
|
oldname to newname{
,
oldname newname })

Rename Tables (using mapname
|
oldname to newname{
,
oldname newname })

 

| Argument | Description                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------ |
| mapname  | The name of a previously loaded mapping table containing one or more pairs of old and new table names. |
| oldname  | The old table name.                                                                                    |
| newname  | The new table name.                                                                                    |

 

Two differently named tables cannot be renamed to having the same name.
The script will generate an error if you try to rename a table to the
same name as an existing table.

 

Tab1:

SELECT \* from Trans;

Rename Table Tab1 to Xyz;

 

TabMap:

Mapping LOAD oldnames, newnames from tabnames.csv;

Rename Tables using TabMap;

 

*Rename
field*

*Rename*

*To*

*Table/Tables*

# Rename

The
 **Rename** 
script keyword can be used to rename tables or fields that are already
loaded.

*Rename field*

*Rename
table*

# Script regular statements

Regular statements are typically used for manipulating data in one way
or another. These statements may be written over any number of lines in
the script and must always be terminated by a semicolon, ";".

All script keywords can be typed with any combination of lower case and
upper case characters. Field and variable names used in the statements
are however case
sensitive.

## Script regular statements overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

Alias

The
 **alias** 
statement is used for setting an alias according to which a field will
be renamed whenever it occurs in the script that
follows.

aliasname {,fieldname as aliasname}

AutoCalendar

The
 **AutoCalendar** 
statement is used for selecting which fields to include in the calendar
that is automatically created when a date or time field is identified in
the
database.

**AutoCalendar3862937065** \*fieldlist

Autonumber

This statement creates a unique integer value for each distinct
evaluated value in a field encountered during the script
execution.

**autonumber4002365188** fields [Using namespace] ]

Binary

The
 **binary** 
statement is used for loading the data from another Qlik Sense app or
QlikView 11.2 or earlier document, including section access data. Other
elements of the app are not included, for example, sheets, stories,
visualizations, master items or
variables.

**Binary587055** file

file ::= [ path ] filename

comment

Provides a way of displaying the field comments (metadata) from
databases and spreadsheets. Field names not present in the app will be
ignored. If multiple occurrences of a field name are found, the last
value is
used.

**comment2893310068** \*fieldlist using mapname

**comment2893310068** fieldname with comment

comment table

Provides a way of displaying the table comments (metadata) from
databases or
spreadsheets.

**comment-table113397434** tablelist using mapname

**comment-table113397434** tablename with comment

Connect

The
 **CONNECT** 
statement is used to define Qlik Sense access to a general database
through the OLE DB/ODBC interface. For ODBC, the data source first needs
to be specified using the ODBC administrator.

ODBC
**CONNECT246437466**
TO
connect-string [
(
access_info
) ]

OLEDB CONNECT TO
connect-string [
(
access_info
) ]

CUSTOM CONNECT TO
connect-string [
(
access_info
) ]

LIB CONNECT TO connection

Declare

The
 **Declare** 
statement is used to create field and group definitions, where you can
define relations between fields or functions. A set of field definitions
can be used to automatically generate derived fields, which can be used
as dimensions. For example, you can create a calendar definition, and
use that to generate related dimensions, such as year, month, week and
day, from a date field.

definition_name:

Declare
[Field[s]] Definition
[Tagged tag_list ]

[Parameters parameter_list ]

Fields field_list 

[Groups group_list ]

 

\<definition name\>:

Declare
[Field][s] Definition


Using \<existing_definition\> 

[With \<parameter_assignment\> ]

Derive

The
 **Derive** 
statement is used to generate derived fields based on a field definition
created with a
 **Declare** 
statement. You can either specify which data fields to derive fields
for, or derive them explicitly or implicitly based on field tags.

Derive
[Field[s]] From
[Field[s]] field_list Using definition

Derive
[Field[s]] From Explicit
[Tag[s]] (tag_list) Using definition

Derive
[Field[s]] From Implicit
[Tag[s]] Using definition

Direct Query

The DIRECT QUERY statement allows you to access tables through an ODBC or
OLE DB connection using the Direct Discovery
function.

**direct-query3627014545** [path]

Directory

The
 **Directory** 
statement defines which directory to look in for data files in
subsequent
 **LOAD** 
statements, until a new
 **Directory** 
statement is
made.

**Directory2239355130** [path]

Disconnect

The
 **Disconnect** 
statement terminates the current ODBC/OLE DB/Custom connection. This
statement is optional.

**Disconnect3536794951**

drop field

One or several Qlik Sense fields can be dropped from the data model, and
thus from memory, at any time during script execution, by means of a
drop field statement.



Both
drop field and
drop fields are allowed forms with no difference in effect. If no
table is specified, the field will be dropped from all tables where it
occurs.



**drop-field3663431198** fieldname
[ , fieldname2
...] [tablename1 [ , tablename2 ...]]

drop fields fieldname
[ , fieldname2
...] [tablename1 [ , tablename2 ...]]

drop table

One or several Qlik Sense internal tables can be dropped from the data
model, and thus from memory, at any time during script execution, by
means of a
drop table statement.



The forms
drop table and
drop tables are both
accepted.



**drop-table2091484950**
tablename [, tablename2 ...]

drop tables[
tablename [, tablename2 ...]

Execute

The
 **Execute** 
statement is used to run other programs while Qlik Sense is loading
data. For example, to make conversions that are
necessary.

**Execute3345185163** commandline

FlushLog

The
 **FlushLog** 
statement forces Qlik Sense to write the content of the script buffer to
the script log
file.

**FlushLog1790730555**

Force

The
 **force** 
statement forces Qlik Sense to interpret field names and field values of
subsequent
 **LOAD** 
and
 **SELECT** 
statements as written with only upper case letters, with only lower case
letters, as always capitalized or as they appear (mixed). This statement
makes it possible to associate field values from tables made according
to different
conventions.

**Force2606809715** ( capitalization |
case upper
| case lower |
case mixed )

LOAD

The
 **LOAD** 
statement loads fields from a file, from data defined in the script,
from a previously loaded table, from a web page, from the result of a
subsequent
 **SELECT** 
statement or by generating data automatically. It is also possible to
load data from analytic
connections.

**Load2463641932**
[ distinct ] \*fieldlist

[( from file [ format-spec ] |

from_field fieldassource [format-spec]

inline data [ format-spec ] |

resident table-label |

autogenerate size )]

[ where criterion | while criterion ]

[ group_by groupbyfieldlist ]

[order_by orderbyfieldlist
]

[<span data-autonumposition="none">extension pluginname.functionname(tabledescription)]

Let

The
 **let** 
statement is a complement to the
 **set** 
statement, used for defining script variables. The
 **let** 
statement, in opposition to the
 **set** 
statement, evaluates the expression on the right side of the ' =' before
it is assigned to the
variable.

**Let328910794** variablename=expression

Loosen Table

One or more Qlik Sense internal data tables can be explicitly declared
loosely coupled during script execution by using a
Loosen Table statement. When a table is loosely coupled, all
associations between field values in the table are removed. A similar
effect could be achieved by loading each field of the loosely coupled
table as independent, unconnected tables. Loosely coupled can be useful
during testing to temporarily isolate different parts of the data
structure. A loosely coupled table can be identified in the table viewer
by the dotted lines. The use of one or more
Loosen Table statements in the script will make Qlik Sense disregard any
setting of tables as loosely coupled made before the script execution.

**loosen-table2284941061** tablename [ , tablename2 ...]

Loosen Tables tablename [ , tablename2 ...]

Map ... using

The
map ... using statement is used for mapping a certain field value or
expression to the values of a specific mapping table. The mapping table
is created through the
 **Mapping** 
statement.

 mapname

NullAsNull

The
 **NullAsNull** 
statement turns off the conversion of NULL values to string values
previously set by a
 **NullAsValue** 
statement.

**NullAsNull736697588** \*fieldlist

NullAsValue

The
 **NullAsValue** 
statement specifies for which fields that NULL should be converted to a
value.

**NullAsValue1111504015** \*fieldlist

Qualify

The
 **Qualify** 
statement is used for switching on the qualification of field names,
i.e. field names will get the table name as a
prefix.

**Qualify2436431574** \*fieldlist

Rem

The
 **rem** 
statement is used for inserting remarks, or comments, into the script,
or to temporarily deactivate script statements without removing
them.

**Rem322003439** string

Rename Field

This script function renames one or more existing Qlik Sense field(s)
after they have been
loaded.

**rename-field3588878079** (using mapname
|
oldname to newname{
,
oldname newname })

Rename Fields (using mapname
|
oldname to newname{
,
oldname newname })

Rename Table

This script function renames one or more existing Qlik Sense internal
table(s) after they have been
loaded.

**rename-table1598879959** (using mapname |
 to newname{ , oldname to newname })

Rename Tables (using mapname
|
oldname to newname{
,
oldname newname })

Section

With the
 **section** 
statement, it is possible to define whether the subsequent
 **LOAD** 
and
 **SELECT** 
statements should be considered as data or as a definition of the access
rights.

 (access |
application)

Select

The selection of fields from an
ODBC data source or OLE DB provider is made through standard SQL
 **SELECT** 
statements. However, whether the
 **SELECT** 
statements are accepted depends on the ODBC driver or OLE DB provider
used.

<div class="syntax" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

 [all |
 | distinctrow |
 n [percent]
] \*fieldlist

From
tablelist

[Where
criterion ]

[Group by
fieldlist
[having
criterion ] ]

[Order by
fieldlist
[ | desc] ]

[ ( | Left |
 | Full)Join
tablename on
fieldref = fieldref ]



Set

The
 **set** 
statement is used for defining script variables. These can be used for
substituting strings, paths, drives, and so
on.

**Set1625966163** variablename=string

Sleep

The
 **sleep** 
statement pauses script execution for a specified
time.

**Sleep2210039786** n

SQL

The
 **SQL** 
statement allows you to send an arbitrary SQL command through an ODBC or
OLE DB connection.

**SQL4021175115** sql_command

SQLColumns

The
 **sqlcolumns** 
statement returns a set of fields describing the columns of an ODBC or
OLE DB data source, to which a
 **connect** 
has been made.

**SQLColumns2169932749**

SQLTables

The
 **sqltables** 
statement returns a set of fields describing the tables of an ODBC or
OLE DB data source, to which a
 **connect** 
has been
made.

**SQLTables2348105401**

SQLTypes

The
 **sqltypes** 
statement returns a set of fields describing the types of an ODBC or OLE
DB data source, to which a
 **connect** 
has been
made.

**SQLTypes1359342470**

Star

The string used for representing the set of all the values of a field in
the database can be set through the
 **star** 
statement. It affects the subsequent
 **LOAD** 
and
 **SELECT** 
statements.

**Star3297892761** is [ string ]

Store

This script function creates a QVD or a CSV
file.

**Store1592258079** [
\*fieldlist
] table into
filename [ format-spec ];

Tag

This script function provides a way of assigning tags to one or more
fields. If an attempt to tag a field name not present in the app is
made, the tagging will be ignored. If conflicting occurrences of a field
or tag name are found, the last value is used.

**Tag552057863** fields fieldlist using mapname

Tag field fieldname with tagname

Trace

The
 **trace** 
statement writes a string to the
Script Execution Progress window and to the script log file, when used. It is very
useful for debugging purposes. Using $-expansions of variables that are
calculated prior to the
 **trace** 
statement, you can customize the message.

**Trace4021049716** string

Unmap

The
 **Unmap** 
statement disables field value mapping specified by a previous
Map … Using statement for subsequently loaded
fields.

**Unmap474108764** \*fieldlist

Unqualify

The
 **Unqualify** 
statement is used for switching off the qualification of field names
that has been previously switched on by the
 **Qualify** 
statement.

 \*fieldlist

Untag

Provides a way of removing tags from one or more fields. If an attempt
to untag a Field name not present in the app is made, the untagging will
be ignored. If conflicting occurrences of a field or tag name is found,
the last value is
used.

**Untag4171185788** fields fieldlist using mapname

Untag field fieldname with tagname

# Search

The
 **Search** 
statement is used for including or excluding fields in smart search.

 

Search Include \*fieldlist

Search Exclude \*fieldlist

 

You can use several Search statements to refine your selection of fields
to include. The statements are evaluated from top to
bottom.

 

| Argument    | Description                                                                                                                                                                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \*fieldlist | A comma separated list of the fields to include or exclude from searches in smart search. Using \* as field list indicates all fields. The wildcard characters \* and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

 

|                           |                                                                  |
| ------------------------- | ---------------------------------------------------------------- |
| Search Include \*;        | Include all fields in searches in smart search.                  |
| Search Exclude [\*ID];  | Exclude all fields ending with ID from searches in smart search. |
| Search Exclude '\*ID';    | Exclude all fields ending with ID from searches in smart search. |
| Search Include ProductID; | Include the field ProductID in searches in smart search.         |

The combined result of these three statements, in this sequence, is that
all fields ending with ID except ProductID are excluded from searches in
smart search.

 

Using the smart search
tool

# Section

With the
 **section** 
statement, it is possible to define whether the subsequent
 **LOAD** 
and
 **SELECT** 
statements should be considered as data or as a definition of the access
rights.



This statement is not supported in Qlik Sense
Cloud.



 

Section (access
|
application)

 

If nothing is specified,
section application is assumed. The
 **section** 
definition is valid until a new
 **section** 
statement is made.

 

Section access;

Section
application;

 

# Select

The selection of fields from an
ODBC data source or OLE DB provider is made through standard SQL
 **SELECT** 
statements. However, whether the
 **SELECT** 
statements are accepted depends on the ODBC driver or OLE DB provider
used.

 

<div class="syntax" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

 [all |
 | distinctrow
|
 [percent]
]
fieldlist

From tablelist

[where criterion
]

[group by fieldlist
[having criterion
] ]

[order by fieldlist
[ | desc] ]

[ ( | Left |
 | Full)
fieldref = fieldref ]



 

Furthermore, several
 **SELECT** 
statements can sometimes be concatenated into one through the use of a
 **union** 
operator:

selectstatement
Union
selectstatement

 

The
 **SELECT** 
statement is interpreted by the ODBC driver or OLE DB provider, so
deviations from the general SQL syntax might occur depending on the
capabilities of the ODBC drivers or OLE DB provider, for
    example:.

  -  **as** 
    is sometimes not allowed, i.e.
    aliasname
    must follow immediately after
    .   - **as
    is sometimes compulsory if an
    aliasname
    is
    used.
  - ,     **as,
     **where** ,
    group     by,
    order     by, or
     **union** 
    is sometimes not supported.
  - The ODBC driver sometimes does not accept all the different
    quotation marks listed above.



This is not a complete description of the SQL
 **SELECT** 
statement\! E.g.
 **SELECT** 
statements can be nested, several joins can be made in one
 **SELECT** 
statement, the number of functions allowed in expressions is sometimes
very large, etc.



 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>distinct</td>
<td> **distinct**  is a predicate used if duplicate combinations of values in the selected fields only should be loaded once.</td>
</tr>
<tr class="even">
<td>distinctrow</td>
<td> **distinctrow**  is a predicate used if duplicate records in the source table only should be loaded once.</td>
</tr>
<tr class="odd">
<td>fieldlist</td>
<td>fieldlist ::= (*| field ) {, field }
<p>A list of the fields to be selected. Using * as field list indicates all fields in the table.</p>
fieldlist ::= field {, field }
<p>A list of one or more fields, separated by commas.</p>
field ::= ( fieldref | expression ) [as aliasname ]
<p>The expression can e.g. be a numeric or string function based on one or several other fields. Some of the operators and functions usually accepted are: +, -, *, /, &amp; (string concatenation), sum(fieldname), count(fieldname), avg(fieldname)(average), month(fieldname), etc. See the documentation of the ODBC driver for more information.</p>
fieldref ::= [ tablename. ] fieldname
<p>The tablename and the fieldname are text strings identical to what they imply. They must be enclosed by straight double quotation marks if they contain e.g. spaces.</p>
The  **as**  clause is used for assigning a new name to the field.</td>
</tr>
<tr class="even">
<td>from</td>
<td><span class="script_token" data-conditions="Targets.NotToTranslate" data-autonumposition="none">tablelist ::= table {<span class="script_token" data-conditions="Targets.NotToTranslate" data-autonumposition="none">,<span class="script_token" data-conditions="Targets.NotToTranslate" data-autonumposition="none"> table }
<p>The list of tables that the fields are to be selected from.</p>
<p> <p>The **tablename may or may not be put within quotes.</p>
<p><em>From</em></p></td>
</tr>
<tr class="odd">
<td>where</td>
<td> is a clause used for stating whether a record should be included in the selection or not. <p> **criterion is a logical expression that can sometimes be very complex. Some of the operators accepted are: numeric operators and functions, **=,　**&lt;&gt; or **#(not equal), **&gt;,　**&gt;=,　**&lt;,　**&lt;=,　**and, **or, **not, **exists, **some, **all, **in**  and also new **SELECT statements. See the documentation of the ODBC driver or OLE DB providerfor more information.</p></td>
</tr>
<tr class="even">
<td>group by</td>
<td> **group by**  is a clause used for aggregating (group) several records into one. Within one group, for a certain field, all the records must either have the same value, or the field can only be used from within an expression, e.g. as a sum or an average. The expression based on one or several fields is defined in the expression of the field symbol.</td>
</tr>
<tr class="odd">
<td>having</td>
<td> **having is a clause used for qualifying groups in a similar manner to how the **where**  clause is used for qualifying records.</td>
</tr>
<tr class="even">
<td>order by</td>
<td> **order by is a clause used for stating the sort order of the resulting table of the **SELECT**  statement.</td>
</tr>
<tr class="odd">
<td>join</td>
<td> **join is a qualifier stating if several tables are to be joined together into one. Field names and table names must be put within quotes if they contain blank spaces or letters from the national character sets. When the script is automatically generated by Qlik Sense, the quotation mark used is the one preferred by the ODBC driver or OLE DB provider specified in the data source definition of the data source in the **Connect**  statement.</td>
</tr>
</tbody>
</table>

 

SELECT \* FROM \`Categories\`;

 

SELECT \`Category ID\`, \`Category Name\` FROM \`Categories\`;

 

SELECT \`Order ID\`, \`Product ID\`,

\`Unit Price\` \* Quantity \* (1-Discount) as NetSales

FROM \`Order Details\`;

 

SELECT \`Order Details\`.\`Order ID\`,

Sum(\`Order Details\`.\`Unit Price\` \* \`Order Details\`.Quantity) as
\`Result\`

FROM \`Order Details\`, Orders

where Orders.\`Order ID\` = \`Order Details\`.\`Order ID\`

group by \`Order Details\`.\`Order
ID\`;

 

*Connect*

*Join*

# Set

The
 **set** 
statement is used for defining script variables. These can be used for
substituting strings, paths, drives, and so
on.

 

Set variablename=string

 

Set FileToUse=Data1.csv;

 

Set Constant="My string";

 

Set BudgetYear=2012;

 

*Let*

*Working with variables in the data load
editor*

# Sleep

The
 **sleep** 
statement pauses script execution for a specified
time.

 

Sleep n

 

| Argument | Description                                                                                                                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| n        | Stated in milliseconds, where n is a positive integer no larger than 3600000 (i.e. 1 hour). The value may be an expression. |

 

Sleep 10000;

 

 

Sleep
t\*1000;

# SQL

The
 **SQL** 
statement allows you to send an arbitrary SQL command through an ODBC or
OLE DB connection.

 

SQL
sql_command

 

Sending SQL statements which update the database will return an error if
Qlik Sense has opened the ODBC connection in read-only mode.

The syntax:

SQL SELECT \* from tab1;

is allowed, and is the preferred syntax for
 **SELECT** ,
for reasons of consistency. The SQL prefix will, however, remain
optional for
 **SELECT** 
statements.

 

| Argument                                                                                                          | Description          |
| ----------------------------------------------------------------------------------------------------------------- | -------------------- |
| sql_command | A valid SQL command. |

 

SQL leave;

 

SQL Execute
\<storedProc\>;

 

*Select*

# SQLColumns

The
 **sqlcolumns** 
statement returns a set of fields describing the columns of an ODBC or
OLE DB data source, to which a
 **connect** 
has been made.

 

SQLcolumns

 

The fields can be combined with the fields generated by the
 **sqltables** 
and
 **sqltypes** 
commands in order to give a good overview of a given database. The
twelve standard fields are:

TABLE_QUALIFIER

TABLE_OWNER

TABLE_NAME

COLUMN_NAME

DATA_TYPE

TYPE_NAME

PRECISION

LENGTH

SCALE

RADIX

NULLABLE

REMARKS

For a detailed description of these fields, see an ODBC reference
handbook.

 

Connect to 'MS Access 7.0 Database; DBQ=C:\\Course3\\DataSrc\\QWT.mbd';

SQLcolumns;



Some ODBC drivers may not support this command. Some ODBC drivers may
produce additional
fields.



 

*SQLTables*

*SQLTypes*

# SQLTables

The
 **sqltables** 
statement returns a set of fields describing the tables of an ODBC or
OLE DB data source, to which a
 **connect** 
has been made.

 

SQLTables

 

The fields can be combined with the fields generated by the
 **sqlcolumns** 
and
 **sqltypes** 
commands in order to give a good overview of a given database. The five
standard fields are:

TABLE_QUALIFIER

TABLE_OWNER

TABLE_NAME

TABLE_TYPE

REMARKS

For a detailed description of these fields, see an ODBC reference
handbook.

 

Connect to 'MS Access 7.0 Database; DBQ=C:\\Course3\\DataSrc\\QWT.mbd';

SQLTables;



Some ODBC drivers may not support this command. Some ODBC drivers may
produce additional
fields.



 

*SQLColumns*

*SQLTypes*

# SQLTypes

The
 **sqltypes** 
statement returns a set of fields describing the types of an ODBC or OLE
DB data source, to which a
 **connect** 
has been made.

 

SQLTypes

 

The fields can be combined with the fields generated by the
 **sqlcolumns** 
and
 **sqltables** 
commands in order to give a good overview of a given database. The
fifteen standard fields are:

TYPE_NAME

DATA_TYPE

PRECISION

LITERAL_PREFIX

LITERAL_SUFFIX

CREATE_PARAMS

NULLABLE

CASE_SENSITIVE

SEARCHABLE

UNSIGNED_ATTRIBUTE

MONEY

AUTO_INCREMENT

LOCAL_TYPE_NAME

MINIMUM_SCALE

MAXIMUM_SCALE

For a detailed description of these fields, see an ODBC reference
handbook.

 

Connect to 'MS Access 7.0 Database; DBQ=C:\\Course3\\DataSrc\\QWT.mbd';

SQLTypes;



Some ODBC drivers may not support this command. Some ODBC drivers may
produce additional
fields.



 

*SQLColumns*

*SQLTables*

# Star

The string used for representing the set of all the values of a field in
the database can be set through the
 **star** 
statement. It affects the subsequent
 **LOAD** 
and
 **SELECT** 
statements.

 

Star is[ string ]

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>string</td>
<td><p>An arbitrary text. Note that the string must be enclosed by quotation marks if it contains blanks.</p>
<p>If nothing is specified,  **star is; is assumed, i.e. there is no star symbol available unless explicitly specified. This definition is valid until a new **star**  statement is made.</p></td>
</tr>
</tbody>
</table>

 

The example below is an extract of a data load script featuring section
access.

Star is \*;

 

Section Access;

LOAD \* INLINE [

ACCESS, USERID, OMIT

ADMIN, ADMIN,

USER, USER1, SALES

USER, USER2, WAREHOUSE

USER, USER3, EMPLOYEES

USER, USER4, SALES

USER, USER4, WAREHOUSE

USER, USER5, \*

];

 

Section Application;

LOAD \* INLINE [

SALES, WAREHOUSE, EMPLOYEES, ORDERS

1, 2, 3, 4

];

 

The following applies:

  - The
    Star     sign is \*.
  - The user
    USER1     is not able to see the field
    SALES.
  - The user
    USER2     is not able to see the field
    WAREHOUSE     .
  - The user
    USER3     cannot see the field
    EMPLOYEES.
  - The user
    USER4     is added twice to the solution to OMIT two fields for this
    user,
    SALES     and
    WAREHOUSE.
  - The
    USER5     has a “\*” added which means that all listed fields in OMIT
    are unavailable. The star sign \* means all listed values, not all
    values of the field. This means that the user
    USER5     cannot see the fields
    SALES,
    WAREHOUSE     and
    EMPLOYEES     but this user can see the field
    ORDERS.

# Store

This script function creates a QVD or a CSV
file.

<div class="note" data-conditions="Targets.NotInEnterprise" data-autonumposition="none">

This function is not supported in Qlik Sense Cloud.





In Qlik Sense Cloud, the
Store command
is only supported in Qlik Sense Cloud Business.





The file must be written to a specific directory in Qlik Sense Cloud
Business. The file is attached to your app when it is written to the
directory. To store the file, use
<span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">lib://StaticContent,
for example:
<span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">'lib://StaticContent/target.qvd'.
To load the file, use
<span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">lib://AttachedFiles,
for example:
<span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">'lib://AttachedFiles/target.qvd'.
Do not store to AttachedFiles, or load from StaticContent, as this may
cause the loss of data.





The maximum attached data file size is 200 MB in Qlik Sense Cloud
Business. The maximum app size is 250 MB, including attached files. You
can build your load script to limit the growth of the attached file size
for incremental data loads. For an example, see *Step-by-step -
Incrementing data loads using the Store command*.



 

Store
[ fieldlist from]
table  filename [ format-spec ];

 

The statement will create an explicitly named QVD or CSV file. The
statement will create an explicitly named QVD or comma separated TXT
file. The file is attached to the app in which you are working.

The statement can only export fields from one data table. If fields from
several tables are to be exported, an explicit join must be made
previously in the script to create the data table that should be
exported.

The text values are exported to the CSV file in UTF-8 format. A
delimiter can be specified, see
 **LOAD** .
The
 **store** 
statement to a CSV file does not support BIFF export.

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>fieldlist::= ( <span style="font-size: 11pt;" data-autonumposition="none">* | field ) { , field } )</td>
<td><p>A list of the fields to be selected. Using * as field list indicates all fields. </p>
<p> <p>fieldname is a text that is identical to a field name in table. (Note that the field name must be enclosed b straight double quotation marks or square brackets if it contains spaces or other non-standard characters.)</p>
<p>aliasname is an alternate name for the field to be used in the resulting QVD or CSV file.</p></td>
</tr>
<tr class="even">
<td>table</td>
<td>A script label representing an already loaded table to be used as source for data.</td>
</tr>
<tr class="odd">
<td>filename</td>
<td><p>The name of the target file including a valid path to an existing folder data connection.</p>
<p>'lib://Table Files/target.qvd'</p>
<p>In legacy scripting mode, the following path formats are also supported:</p>
<ul>
<li><p>absolute</p>
<p>c:\data\sales.qvd</p></li>
<li><p>relative to the Qlik Sense app working directory.</p>
<p> <p>If the path is omitted, Qlik Sense stores the file in the directory specified by the  **Directory statement. If there is no **Directory**  statement, Qlik Sense stores the file in the working directory, C:\Users\{user}\Documents\Qlik\Sense\Apps.</p></li>
</ul>
<p>The file must be written to a specific directory in Qlik Sense Cloud Business. The file is attached to your app when it is written to the directory. To store the file, use <span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">lib://StaticContent, for example: <span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">'lib://StaticContent/target.qvd'. To load the file, use <span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">lib://AttachedFiles, for example: <span class="path" data-conditions="Targets.NotToTranslate" style="font-weight: bold;" data-autonumposition="none">'lib://AttachedFiles/target.qvd'. Do not store to AttachedFiles, or load from StaticContent, as this may cause the loss of data.</p></td>
</tr>
<tr class="even">
<td> <td>The format specification consists of the text  **txt for text files, or the text **qvd**  for qvd files. If the format specification is omitted, **qvd is assumed.</td>
</tr>
</tbody>
</table>

 

Store mytable into xyz.qvd (qvd);

Store \* from mytable into 'lib://FolderConnection/myfile.qvd';

Store Name, RegNo from mytable into xyz.qvd;

Store Name as a, RegNo as b from mytable into
'lib://FolderConnection/myfile.qvd';

store mytable into myfile.txt (txt);

store \* from mytable into 'lib://FolderConnection/myfile.qvd';

Store mytable into 'lib://StaticContent/xyz.qvd' (qvd);

Store \* from mytable into 'lib://StaticContent/xyz.qvd' (qvd);

Store Name, RegNo from mytable into 'lib://StaticContent/xyz.qvd' (qvd);

Store Name as a, RegNo as b from mytable into
'lib://StaticContent/xyz.qvd' (qvd);

store mytable into 'lib://StaticContent/myfile.txt' (txt);

store \* from mytable into 'lib://StaticContent/myfile.qvd'
(qvd);

# Table/Tables

The
 **Table** 
and
 **Tables** 
script keywords are used in
, **Comment
and
 **Rename** 
statements, as well as a format specifier in
 **Load** 
statements.

*Drop table*

*Comment table*

*Rename table*

*Format specification
items*

# Tag

This script function provides a way of assigning tags to one or more
fields. If an attempt to tag a field name not present in the app is
made, the tagging will be ignored. If conflicting occurrences of a field
or tag name are found, the last value is used.

 

Tag fields fieldlist using mapname

Tag field fieldname with tagname

 

A field tagged with dimension will be displayed at the top of all field
selection controls in Qlik Sense except in the
<span class="ui_item" data-autonumposition="none">Edit Expression
dialog.

A field tagged with measure will be displayed at the top of all field
selection controls in the
<span class="ui_item" data-autonumposition="none">Edit Expression
dialog.

 

| Argument  | Description                                                                                                                                                                                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fieldlist | A comma separated list of the fields that should be tagged from this point in the script.                                                                                                                                                                                                            |
| mapname   | The name of a mapping table previously loaded in a  **mapping Load or **mapping Select**  statement. |
| fieldname | The name of the field that should be tagged.                                                                                                                                                                                                                                                         |
| tagname   | The name of the tag that should be applied to the field.                                                                                                                                                                                                                                             |

 

tagmap:

mapping LOAD \* inline [

a,b

Alpha,MyTag

Num,MyTag

];

tag fields using tagmap;

 

tag field Alpha with 'MyTag2';

 

*Field
tags*

*Mapping*

*Field/Fields*

# Trace

The
 **trace** 
statement writes a string to the
Script Execution Progress window and to the script log file, when used. It is very
useful for debugging purposes. Using $-expansions of variables that are
calculated prior to the
 **trace** 
statement, you can customize the
message.

 

Trace string

 

Trace Main table loaded;

 

Let MyMessage = NoOfRows('MainTable') & ' rows in Main Table';

Trace
$(MyMessage);

# Unmap

The
 **Unmap** 
statement disables field value mapping specified by a previous
Map … Using statement for subsequently loaded
fields.

 

Unmap \*fieldlist

 

| Argument    | Description                                                                                                                                                                                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \*fieldlist | a comma separated list of the fields that should no longer be mapped from this point in the script. Using \* as field list indicates all fields. The wildcard characters \* and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used. |

Examples and results:

| Example        | Result                                 |
| -------------- | -------------------------------------- |
| Unmap Country; | Disables mapping of field Country.     |
| Unmap A, B, C; | Disables mapping of fields A, B and C. |
| Unmap \* ;     | Disables mapping of all fields.        |

 

*Map*

# Unqualify

The
 **Unqualify** 
statement is used for switching off the qualification of field names
that has been previously switched on by the
 **Qualify** 
statement.

 

Unqualify \*fieldlist

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>*fieldlist</td>
<td><p>A comma separated list of the fields for which qualification should be turned on. Using * as field list indicates all fields. The wildcard characters * and ? are allowed in field names. Quoting of field names may be necessary when wildcards are used.</p>
<p>Refer to the documentation for the  **Qualify**  statement for further information.</p></td>
</tr>
</tbody>
</table>

 

Unqualify \*;

 

Unqualify
TransID;

 

*Qualify*

# Untag

Provides a way of removing tags from one or more fields. If an attempt
to untag a Field name not present in the app is made, the untagging will
be ignored. If conflicting occurrences of a field or tag name is found,
the last value is used.

 

Untag fields fieldlist using mapname

Untag field fieldname with tagname

 

| Argument  | Description                                                                                                                                                                                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fieldlist | A comma separated list of the fields which tags should be removed.                                                                                                                                                                                                                                   |
| mapname   | The name of a mapping table previously loaded in a mapping  **LOAD or mapping **SELECT**  statement. |
| fieldname | The name of the field that should be untagged.                                                                                                                                                                                                                                                       |
| tagname   | The name of the tag that should be removed from the field.                                                                                                                                                                                                                                           |

 

tagmap:

mapping LOAD \* inline [

a,b

Alpha,MyTag

Num,MyTag

];

Untag fields using tagmap;

 

Untag field Alpha with
MyTag2;

 

*Mapping*

*Field/Fields*

## ScriptSpecifiers

# Character set

Character set is a file specifier for the
 **LOAD** 
statement that defines the character set used in the file.

The
 **ansi** ,
oem and
mac specifiers were used in QlikView and will still work. However,
they will not be generated when creating the
 **LOAD** 
statement with Qlik Sense.

 

utf8 | unicode |
ansi | oem | mac | codepage
is

 

| Argument                                                                                                        | Description                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         | UTF-8 character set                                                                                                                                                                                                                             | | **unicode     | Unicode character set                                                                                                                                                                                                                           |
|         | Windows, codepage 1252                                                                                                                                                                                                                          | | **oem         | DOS, OS/2, AS400 and others                                                                                                                                                                                                                     |
|          | Codepage 10000                                                                                                                                                                                                                                  | |  **codepage is | With the **codepage ** specifier, it is possible to use any Windows codepage as <span class="user_input" data-autonumposition="none"> N . |

 

Conversion from the
 **oem** 
character set is not implemented for MacOS. If nothing is specified,
codepage 1252 is assumed under Windows.

 

LOAD \* from a.txt (utf8, txt, delimiter is ',' , embedded labels)

LOAD \* from a.txt (unicode, txt, delimiter is ',' , embedded labels)

LOAD \* from a.txt (codepage is 10000, txt, delimiter is ',' , no
labels)

 

*Load*

# Delimiter is

<span id="For_delimited_table_files,_an_arbitrary_ delimiter_can_be_specified_through_t...">For delimited table
files, an arbitrary delimiter can be specified through the
delimiter is specifier. This specifier is relevant only for delimited .txt
files.

 

delimiter is char

 

| Argument                                                                                                 | Description                                                 |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
|  **char**  | Specifies a single character from the 127 ASCII characters. |

Additionally, the following values can be
used:

|                                                                                                              |                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | representing a tab sign, with or without quotation marks.                                                                                                                   | | **'\\\\'   | representing a backslash ( \\ ) character.                                                                                                                                  |
|  **'spaces'**  | representing all combinations of one or more spaces. Non-printable characters with an ASCII-value below 32, with the exception of CR and LF, will be interpreted as spaces. |

If nothing is specified,
delimiter is ',' is assumed.

 

LOAD \* from a.txt (utf8, txt, delimiter is ',' , embedded
labels);

 

*Load*

# Format specification items

Each format specification item defines a certain property of the table
file:

fspec-item ::= [ ansi |
oem | mac | UTF-8 | Unicode | txt | fix | dif | biff | ooxml | html |
xml | kml | qvd | qvx |
delimiter
is char
| no eof | embedded
labels | explicit labels | no labels | table is
[tablename]
| header is n
| header is line
| header is n lines
| comment is string
| record is n
| record is line
| record is n lines
| no quotes |msq | URL is string
| userAgent is string]

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

Character set

Character set is a file specifier for the
 **LOAD** 
statement that defines the character set used in the file.

ansi | oem | mac | UTF-8 | Unicode | codepage is |

*Character set*

Table format

The table format is a file specifier for the
 **LOAD** 
statement that defines the file type. If nothing is specified, a
.txt
file is assumed.

txt | fix | dif | biff | ooxml | html | xml | qvd | qvx 

*Table format*

Delimiter is

For delimited table files, an arbitrary delimiter can be specified
through the
delimiter is specifier. This specifier is relevant only for delimited .txt
files.

**Delimiter247229519** char

Header is

Specifies the header size in table files. An arbitrary header length can
be specified through the
header is specifier. A header is a text section not used by Qlik
Sense.

**header-is3580858443** n

Header is line

Header is n lines

Comment is

If you have lines in your source data file that are comments, you can
define a comment prefix with
Comment is. Set commentprefix to the character or string that comment
lines start with, and these lines will be ignored when you load data.

Comment is commentprefix 

labels

Labels is a file specifier for the
 **LOAD** 
statement that defines where in a file the field names can be
found.

embedded
**Labels2907545920**
|
explicit
labels|no labels

no eof

The
no eof specifier is used to disregard end-of-file character when
loading delimited
 **.txt** 
files.

**no-eof3978917948**

quotes

 **Quotes** 
is a file specifier for the
 **LOAD** 
statement that defines whether quotes can be used and the precedence
between quotes and separators. For text files
only.

no **Quotes3273250975**

msq

Record is

For fixed record length files, the record length must be specified
through the
record is
specifier.

**record-is2376626610** n

Record is line

Record is n lines

XML

This script specifier is used when loading xml files. Valid options for
the
 **XML** 
specifier are listed in syntax.

xmlsimple

*XML*

KML

This script specifier is used when loading KML files to use in a map
visualization.

**KML2483341399**

URL is

This script specifier is used to set the URL of a web file data
connection when loading a web
file.

**url827508784** is

userAgent is

This script specifier is used to set the browser user agent when loading
a web
file.

**userAgent1237062281** is

 

*Load*

*Select*

# Header is

Specifies
the header size in table files. An arbitrary header length can be
specified through the
header is specifier. A header is a text section not used by Qlik Sense.

 

header is n

header is line

header is n lines

 

The header length can be given in bytes
(header is n), or in lines
(header is line or
header is n lines).
 **n** 
must be a positive integer, representing the header length. If not
specified,
header is 0 is assumed. The
header is specifier is only relevant for table files.

 

This is an example of a data source table containing a header text line
that should not be interpreted as data by Qlik
Sense.



 





\*Header line Col1,Col2 a,B
c,D





 



Using the
header is 1 lines specifier, the first line will not be loaded as data.
In the example, the embedded labels specifier tells Qlik Sense to
interpret the first non-excluded line as containing field
labels.

<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

 



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

LOAD Col1, Col2 FROM 'lib://files/header.txt' (txt, embedded labels,
delimiter is ',', msq, header is 1
lines);



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

 



The result is a table with two fields, Col1 and
Col2.

 

*Load*

# KML

This
script specifier is used when loading KML files to use in a map
visualization.

 

kml

 

The KML file can represent either area data (for example, countries or
regions) represented by polygons, or point data (for example, cities or
places) represented by points in the form [long,
lat].

 

*Load*

# Labels

Labels
is a file specifier for the
 **LOAD** 
statement that defines where in a file the field names can be
found.

 

embedded labels|explicit labels|no labels

 

The field names can be found in different places of the file. If the
first record contains the field names,
embedded labels should be used. If there are no field names to be found,
no labels should be used. In
dif
files, a separate header section with explicit field names is sometimes
used. In such a case,
explicit labels should be used. If nothing is specified,
embedded labels is assumed, also for
dif
files.

 

LOAD \* from a.txt (unicode, txt, delimiter is ',' , embedded labels

 

LOAD \* from a.txt (codePage is 1252, txt, delimiter is ',' , no
labels)

 

*Load*

# No eof

The
no eof specifier is used to disregard end-of-file character when
loading delimited
 **.txt** 
files.

 

no eof

 

If the
no eof specifier is used, characters with code point 26, which
otherwise denotes end-of-file, are disregarded and can be part of a
field value.

It is relevant only for delimited text files.

 

LOAD \* from a.txt (txt, utf8, embedded labels, delimiter is ' ', no
eof);

 

*Load*

# Quotes

 **Quotes** 
is a file specifier for the
 **LOAD** 
statement that defines whether quotes can be used and the precedence
between quotes and separators. For text files
only.

 

no quotes

msq

 

If the specifier is omitted, standard quoting is used, that is, the
quotes " " or ' ' can be used, but only if they are the first and last
non blank character of a field value.

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>no quotes</td>
<td>Used if quotation marks are not to be accepted in a text file.</td>
</tr>
<tr class="even">
<td>msq</td>
<td><p>Used to specify modern style quoting, allowing multi-line content in fields. Fields containing end-of-line characters must be enclosed within double quotes.</p>
<p>One limitation of the msq option is that single double-quote (&quot;) characters appearing as first or last character in field content will be interpreted as start or end of multi-line content, which may lead to unpredicted results in the data set loaded. In this case you should use standard quoting instead, omitting the specifier.</p></td>
</tr>
</tbody>
</table>

 

*Using quotation marks in the script*

*Load*

*Script regular
statements*

# Record is

<span id="For_fixed_record_length_files,_the_record_ _length_must_be_specified_through_...">For fixed record length
files, the record length must be specified through the
record is specifier.

 

Record is n

Record is line

Record is n lines

 

| Argument | Description                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------- |
| n        | Specifies the record length in bytes.                                                              |
| line     | Specifies the record length as one line.                                                           |
| n lines  | Specifies the record length in lines where n is a positive integer representing the record length. |

 

The
record is specifier is only relevant for
 **fix** 
files.

 

*Load*

# Table format

The table format is a file specifier for the
 **LOAD** 
statement that defines the file type. If nothing is specified, a
.txt
file is assumed.

<table>
<tbody>
<tr class="odd">
<td>txt</td>
<td><p>In a delimited text file the columns in the table are separated by a delimiter character.</p>
<p><em>Delimiter is</em></p></td>
</tr>
<tr class="even">
<td>fix</td>
<td><p>In a fixed record file, each field is exactly a certain number of characters.</p>
<p>Typically, many fixed record length files contains records separated by a linefeed, but there are more advanced options to specify record size in bytes or to span over more than one line with Record is.</p>
<p><em>Record is</em></p>

If the data contains multi-byte characters, field breaks can become misaligned as the format is based on a fixed length in bytes.
</td>
</tr>
<tr class="odd">
<td>dif</td>
<td>In a .dif file, (Data Interchange Format) a special format for defining the table is used.</td>
</tr>
<tr class="even">
<td>biff</td>
<td>Qlik Sense can also interpret data in standard Excel files by means of the biff format (Binary Interchange File Format).</td>
</tr>
<tr class="odd">
<td>ooxml</td>
<td>Excel 2007 and later versions use the ooxml <span class="path" data-autonumposition="none">.xslx format.</td>
</tr>
<tr class="even">
<td>html</td>
<td>If the table is part of an html page or file, html should be used.</td>
</tr>
<tr class="odd">
<td>xml</td>
<td>xml (Extensible Markup Language) is a common markup language that is used to represent data structures in a textual format.</td>
</tr>
<tr class="even">
<td>qvd</td>
<td>The format qvd is the proprietary QVD files format, exported from a Qlik Sense app.</td>
</tr>
<tr class="odd">
<td>qvx</td>
<td>qvx is a file/stream format for high performance output to Qlik Sense.</td>
</tr>
<tr class="even">
<td>json</td>
<td>json (JavaScript Object Notation) is a language-independent data format.</td>
</tr>
</tbody>
</table>

 

*Load*

*Working with QVD
files*

# URL is

This
script specifier is used to set the URL of a web file data connection
when loading a web file.

 

URL is string

 

| Argument | Description                                                                                                    |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| string   | Specifies the URL of the file to load. This will override the URL set in the web file connection that is used. |

 

The
URL is specifier is only relevant for web files. You need to use an
existing web file data
connection.

 

*Load*

# userAgent is

This
script specifier is used to set the browser user agent when loading a
web file.

 

userAgent is string

 

| Argument | Description                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------- |
| string   | Specifies the browser user agent string. This will override the default browser user agent "Mozilla/5.0". |

 

The
userAgent is specifier is only relevant for web
files.

 

*Load*

# XML

This
script specifier is used when loading xml files. Valid options for the
 **XML** 
specifier are listed in syntax.



You cannot load DTD files in Qlik
Sense.



 

xmlsimple

 

 

*Load*

## Security

# Managing security with section access

You can use section access in the data load script to handle security.
In this way, a single file can be used to hold the data for a number of
users or user groups. Qlik Sense uses the information in the section
access for authentication and authorization, and dynamically reduces the
data, so that users only see their own data.

The security is built into the file itself, which means a downloaded
file is also protected, to some extent. However, if security demands are
high, downloading of files and offline use should be prevented, and
files should be published by the Qlik Sense server only. As all data is
kept in one file, the size of this file can potentially be very
large.

<div class="note" data-conditions="Targets.NotInEnterprise" data-autonumposition="none">

Qlik Sense Cloud does not support section access.



<div class="warning" data-autonumposition="none">

To avoid exposing restricted data, remove all attached files with
section access settings before publishing the app.

Attached files are included when the app is published. If the published
app is copied, the attached files are included in the copy. However, if
section access restrictions have been applied to the attached data
files, the section access settings are not retained when the files are
copied, so users of the copied app will be able to see all the data in
the attached files.



<div class="warning" data-autonumposition="none">

A snapshot shows data according to the access rights of the user who
takes the snapshot, and the snapshot can then be shared in a story.
However, when users return to a visualization from a story to see the
live data in the app, they are restricted by their own access rights.



<div class="warning" data-autonumposition="none">

You must not assign colors to master dimension values if you use section
access or work with sensitive data because the values may be exposed.



## Sections in the script

Access control is managed through one or several security tables loaded
in the same way that Qlik Sense normally loads data. This makes it
possible to store these tables in a normal database. The script
statements managing the security tables are given within the access
section, which in the script is initiated by the statement
Section Access.

If an access section is defined in the script, the part of the script
loading the app data must be put in a different section, initiated by
the statement
Section Application.

 



Section
Access;





LOAD \*
inline





[ACCESS,USERID





USER,U
];





Section
Application;





LOAD... ... from...
...



### Section access system fields

The access levels are assigned to users in one or several tables loaded
within the section access. These tables can contain several different
user-specific system fields, typically USERID, and the field defining
the access level, ACCESS. All section access system fields will be used
for authentication or authorization. The full set of section access
system fields is described below.

<table>
<tbody>
<tr class="odd">
<td>ACCESS</td>
<td><p>Defines what access the corresponding user should have.</p>
<p>Access to Qlik Sense apps can be authorized for specified users or groups of users. In the security table, users can be assigned to the access levels ADMIN or USER. If no valid access level is assigned, the user cannot open the app.</p>
<p>A person with ADMIN privileges has access to all data in the app. A person with USER privileges can only access data as defined in the security table.</p></td>
</tr>
<tr class="even">
<td>USERID</td>
<td>Contains a string corresponding to a Qlik Sense user name. Qlik Sense will get the login information from the proxy and compare it to the value in this field.</td>
</tr>
<tr class="odd">
<td>GROUP</td>
<td><p>Contains a string corresponding to a group in Qlik Sense. Qlik Sense will resolve the user supplied by the proxy against this group.</p>

When you use groups to reduce data, the INTERNAL\SA_SCHEDULER account user is still required to enable reload of the script in a Qlik Management Console task.
</td>
</tr>
<tr class="even">
<td>OMIT</td>
<td><p>Contains the name of the field that is to be omitted for this specific user. Wildcards may be used and the field may be empty. An easy way of doing this is to use a subfield.</p>

We recommend that you do not apply OMIT on key fields. Key fields that are omitted are visible in the data model viewer, but the content is not available, which can be confusing for a user. Additionally, applying OMIT on fields that are used in a visualization can result in an incomplete visualization for users that do not have access to the omitted fields.
</td>
</tr>
</tbody>
</table>

Qlik Sense will compare the user supplied by the proxy with UserID and
resolve the user against groups in the table. If the user belongs to a
group that is allowed access, or the user matches, they will get access
to the
app.

<div class="note" data-conditions="Targets.NotInCloud" data-autonumposition="none">

If you have locked yourself out of an app by setting section access, you
can open the app without data, and edit the access section in the data
load script. This requires that you have access to edit and reload the
data load script.

*Opening an app without data*



As the same internal logic that is the hallmark of Qlik Sense is also
used in the access section, the security fields can be put in different
tables. All the fields listed in
 **LOAD** 
or
 **SELECT** 
statements in the section access must be written in UPPER CASE. Convert
any field name containing lower case letters in the database to upper
case using the
Upper
function before reading the field by the
 **LOAD** 
or
 **SELECT** 
statement.

*Upper - script and chart function*

A wildcard, \*, is interpreted as all (listed) values of this field,
that is. a value listed elsewhere in this table. If used in one of the
system fields (USERID, GROUP) in a table loaded in the access section of
the script, it is interpreted as all (also not listed) possible values
of this field.



When loading data from a QVD file, the use of the upper function will
slow down the loading speed.





If you have enabled section access, you cannot use the section access
system field names listed here as field names in your data model.



In this example, only users in the finance group can open the document.

|        |         |
| ------ | ------- |
| ACCESS | GROUP   |
| USER   | Finance |

## Dynamic data reduction

Qlik Sense supports dynamic data reduction, in which some of the data in
an app can be hidden from a user, based on the section access login:

  - Fields (columns) can be hidden by using the system field OMIT.
  - Records (rows) can be hidden by linking the section access data with
    the real data: The selection of values to be shown or excluded is
    controlled by having one or more fields with common names in section
    access and section application. After user login, Qlik Sense will
    attempt to match the selections in fields in the section access to
    any fields in the section application with exactly the same field
    names (the field names must be written in UPPER CASE). After the
    selections have been made, Qlik Sense will permanently hide all data
    excluded by these selections from the user.



All field names used in the transfer described above and all field
values in these fields must be upper case, because all field names and
field values are, by default, converted to upper case in section
access.



<div class="note" data-conditions="Targets.NotInCloud" data-autonumposition="none">

The INTERNAL\\SA_SCHEDULER account user with ADMIN access is required
to enable reload of the script in a Qlik Management Console task.



Data reduction based on user
id



section
access;



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

LOAD \* inline
[





ACCESS, USERID,REDUCTION,
OMIT





USER,
AD_DOMAIN\\ADMIN,\*,





USER,
AD_DOMAIN\\A,1,





USER, AD_DOMAIN\\B,
2,NUM





USER, AD_DOMAIN\\C, 3,
ALPHA





ADMIN,
INTERNAL\\SA_SCHEDULER,\*,





];





section
application;





T1:



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

LOAD
\*,





NUM AS
REDUCTION;





LOAD





Chr( RecNo()+ord('A')-1) AS
ALPHA,





RecNo() AS
NUM





AUTOGENERATE 3;



The field REDUCTION (upper case) now exists in both section access and
section application (all field values are also upper case). The two
fields would normally be totally different and separated, but using
section access, these fields are linked and the number of records
displayed to the user is reduced.

The field OMIT, in section access, defines the fields that should be
hidden from the user.

The result will be:

  - User ADMIN can see all fields and only those records other users can
    see in this example when REDUCTION is 1,2, or 3.
  - User A can see all fields, but only those records associated to
    REDUCTION=1.
  - User B can see all fields except NUM, and only those records
    associated to REDUCTION=2.
  - User C can see all fields except ALPHA, and only those records
    associated to REDUCTION=3.

Data reduction based on user groups

section access;

LOAD \* inline [

ACCESS, USERID, GROUP, REDUCTION, OMIT

USER, \*, ADMIN, \*,

USER, \*, A, 1,

USER, \*, B, 2, NUM

USER, \*, C, 3, ALPHA

USER, \*, GROUP1, 3,

ADMIN, INTERNAL\\SA_SCHEDULER, \*, \*,

];

section application;

T1:

LOAD \*,

NUM AS REDUCTION;

LOAD

Chr( RecNo()+ord('A')-1) AS ALPHA,

RecNo() AS NUM

AUTOGENERATE 3;

The result will be:

  - Users belonging to the ADMIN group are allowed to see all data and
    all fields.

  - Users belonging to the A group are allowed to see data associated to
    REDUCTION=1 across all fields.

  - Users belonging to the B group are allowed to see data associated to
    REDUCTION=2, but not in the NUM field

  - Users belonging to the C group are allowed to see data associated to
    REDUCTION=3, but not in the ALPHA field

  - Users belonging to the GROUP1 group are allowed to see data
    associated to REDUCTION=3 across all fields

  - The user INTERNAL\\SA_SCHEDULER does not to belong to any groups
    but is allowed to see all data in all fields.
    
    
    
    The wildcard, character \*, in this row refers only to all values
    within the section access table. If there are values in the section
    application that are not available in the REDUCTION field in section
    access, they will be
reduced.
    
    

## Inherited access restrictions

A binary load will cause the access restrictions to be inherited by the
new Qlik Sense
app.