
# Associations between logical tables

A database can have many tables. Each table can be considered as a list
of something; each record in the list represents an instance of an
object of some type.

 

If two tables are lists of different things, for example if one is a
list of customers and the other a list of invoices, and the two tables
have a field such as the customer number in common, this is usually a
sign that there is a relationship between the two tables. In standard
SQL query tools the two tables should almost always be joined.

The tables defined in the Qlik Sense script are called logical tables.
Qlik Sense makes associations between the tables based on the field
names, and performs the joins when a selection is made, for example
selecting a field value in a filter pane.

This means that an association is almost the same thing as a join. The
only difference is that the join is performed when the script is
executed - the logical table is usually the result of the join. The
association is made after the logical table is created - associations
are always made between the logical tables.

![](Resources/Images/ex_gen_Associations.png)

<div class="caption" data-autonumposition="none">

Four tables: a list of countries, a list of customers, a list of
transactions and a list of memberships, which are associated with each
other through the fields Country and
CustomerID.



## Qlik Sense association compared to SQL natural outer join

A Qlik Sense association resembles a SQL natural outer join. The
association is however more general: an outer join in SQL is usually a
one-way projection of one table on another. An association always
results in a full (bidirectional) natural outer
join.

## Frequency information in associating fields

There are some limitations in the use of most associating fields, that
is, fields that are common between two or more tables. When a field
occurs in more than one table, Qlik Sense has a problem knowing which of
the tables it should use for calculating data frequencies.

Qlik Sense analyzes the data to see if there is a non-ambiguous way to
identify a main table to count in (sometimes there is), but in most
cases the program can only make a guess. Since an incorrect guess could
be fatal (Qlik Sense would appear to make a calculation error) the
program has been designed not to allow certain operations when the data
interpretation is ambiguous for associating
fields.

### Limitations for associating fields

1.  It is not possible to display frequency information in a filter pane
    showing the field.
2.  Statistics boxes for the field show n/a for most statistical
    entities.
3.  In charts, it is not possible to create expressions containing
    functions that depend on frequency information (such as Sum, Count
    functions, and Average) on the field, unless the
    Distinct
    modifier is activated. After each reload, Qlik Sense will scan all
    chart expressions to see if any ambiguities have occurred as a
    result of changes in data structures. If ambiguous expressions are
    found, a warning dialog will be shown and the expression will be
    disabled. It will not be possible to enable the expression until the
    problem has been corrected. If a log file is enabled, all ambiguous
    expressions will be listed in the log.

#### Workaround

There is a simple way to overcome these limitations. Load the field an
extra time under a new name from the table where frequency counts should
be made. Then use the new field for a filter pane with frequency, for a
statistics box or for calculations in the
charts.

# What is Backus-Naur formalism?

The Qlik Sense command line syntax and script syntax are described in a
notation called Backus-Naur formalism, also known as BNF code.

The following table provides a list of symbols used in BNF code, with a
description of how they are
interpreted:

|                                                                 |                                                                                                                                                                               |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| |                                                               | Logical OR: the symbol on either side can be used.                                                                                                                            |
| ( )                                                             | Parentheses defining precedence: used for structuring the BNF syntax.                                                                                                         |
| [ ]                                                           | Square brackets: enclosed items are optional.                                                                                                                                 |
| { }                                                             | Braces: enclosed items may be repeated zero or more times.                                                                                                                    |
| Symbol                                                          | A non-terminal syntactic category, that: can be divided further into other symbols. For example, compounds of the above, other non-terminal symbols, text strings, and so on. |
| ::=                                                             | Marks the beginning of a block that defines a symbol.                                                                                                                         |
| LOAD | A terminal symbol consisting of a text string. Should be written as it is into the script.                                                                                    |

All terminal symbols are printed in a
bold face
font. For example, "(" should be interpreted as a parenthesis defining
precedence, whereas
"(" should be
interpreted as a character to be printed in the script.

 

The description of the alias statement
is:

alias fieldname as aliasname
{ ,
fieldname as aliasname}

This should be interpreted as the text string "alias", followed by an
arbitrary field name, followed by the text string "as", followed by an
arbitrary alias name. Any number of additional combinations of
"fieldname as alias" may be given, separated by commas.

The following statements are correct:

alias a as first;

alias a as first, b as second;

alias a as first, b as second, c as third;

The following statements are not correct:

alias a as first b as second;

alias a as first { , b as second
};

# BlackAndSchole - script and chart function

The Black and Scholes model is a mathematical model for financial market
derivative instruments. The formula calculates the theoretical value of
an option. In Qlik Sense, the
 **BlackAndSchole** 
function returns the value according to the Black and Scholes unmodified
formula (European style
options).

BlackAndSchole(strike
, time_left , underlying_price , vol , risk_free_rate ,
type)

numeric

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>strike</td>
<td>The future purchase price of the stock.</td>
</tr>
<tr class="even">
<td>time_left</td>
<td>The number of time periods remaining.</td>
</tr>
<tr class="odd">
<td>underlying_price</td>
<td>The current value of the stock.</td>
</tr>
<tr class="even">
<td>vol</td>
<td><p>Volatility (of the stock price) expressed as a percentage in decimal form, per time period.</p></td>
</tr>
<tr class="odd">
<td>risk_free_rate</td>
<td>The risk-free rate expressed as a percentage in decimal form, per time period.</td>
</tr>
<tr class="even">
<td>call_or_put</td>
<td><p>The type of option:</p>
<p>'c', 'call' or any non-zero numeric value for call options</p>
<p>'p', 'put' or 0 for put options.</p></td>
</tr>
</tbody>
</table>

 

The value of strike, time_left, and underlying_price must be \>0.

The value of vol and risk_free_rate must be: \<0 or \>0.

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
<td><p>BlackAndSchole(130, 4, 68.5, 0.4, 0.04, 'call')</p>
<p>This calculates the theoretical price of an option to buy a share that is worth 68.5 today, at a value of 130 in 4 years. The formula uses a volatility of 0.4 (40%) per year and a risk-free interest rate of 0.04 ( 4%).</p></td>
<td>Returns 11.245</td>
</tr>
</tbody>
</table>

# Combining tables with Join and Keep

A join is an operation that uses two tables and combines them into one.
The records of the resulting table are combinations of records in the
original tables, usually in such a way that the two records contributing
to any given combination in the resulting table have a common value for
one or several common fields, a so-called natural join. In Qlik Sense,
joins can be made in the script, producing logical tables.

It is possible to join tables already in the script. The Qlik Sense
logic will then not see the separate tables, but rather the result of
the join, which is a single internal table. In some situations this is
needed, but there are disadvantages:

  - The loaded tables often become larger, and Qlik Sense works slower.
  - Some information may be lost: the frequency (number of records)
    within the original table may no longer be available.

The
 **Keep** 
functionality, which has the effect of reducing one or both of the two
tables to the intersection of table data before the tables are stored in
Qlik Sense, has been designed to reduce the number of cases where
explicit joins need to be used.



In this documentation, the term join is usually used for joins made
before the internal tables are created. The association made after the
internal tables are created, is however essentially also a
join.



## Joins within a SQL SELECT statement

With some ODBC drivers it is possible to make a join within the
 **SELECT** 
statement. This is almost equivalent to making a join using the
 **Join** 
prefix.

However, most ODBC drivers are not able to make a full (bidirectional)
outer join. They are only able to make a left or a right outer join. A
left (right) outer join only includes combinations where the joining key
exists in the left (right) table. A full outer join includes any
combination. Qlik Sense automatically makes a full outer join.

Further, making joins in
 **SELECT** 
statements is far more complicated than making joins in Qlik Sense.

 

SELECT DISTINCTROW

[Order Details].ProductID, [Order Details].

UnitPrice, Orders.OrderID, Orders.OrderDate, Orders.CustomerID

FROM Orders

RIGHT JOIN [Order Details] ON Orders.OrderID = [Order
Details].OrderID;

This
 **SELECT** 
statement joins a table containing orders to a fictive company, with a
table containing order details. It is a right outer join, meaning that
all the records of
OrderDetails
are included, also the ones with an
OrderID
that does not exist in the table
Orders.
Orders that exist in
Orders
but not in
OrderDetails
are however not included.

## Join

The simplest way to make a join is with the
 **Join** 
prefix in the script, which joins the internal table with another named
table or with the last previously created table. The join will be an
outer join, creating all possible combinations of values from the two
tables.

 

LOAD a, b, c from table1.csv;

join LOAD a, d from table2.csv;

The resulting internal table has the fields a, b, c and d. The number of
records differs depending on the field values of the two tables.



The names of the fields to join over must be exactly the same. The
number of fields to join over is arbitrary. Usually the tables should
have one or a few fields in common. No field in common will render the
cartesian product of the tables. All fields in common is also possible,
but usually makes no sense. Unless a table name of a previously loaded
table is specified in the
 **Join** 
statement the
 **Join** 
prefix uses the last previously created table. The order of the two
statements is thus not arbitrary.



 *Join*

## Keep

The explicit
 **Join** 
prefix in the data load script performs a full join of the two tables.
The result is one table. In many cases such joins will results in very
large tables. One of the main features of Qlik Sense is its ability to
make associations between tables instead of joining them, which reduces
space in memory, increases speed and gives enormous flexibility. The
keep functionality has been designed to reduce the number of cases where
explicit joins need to be used.

The
 **Keep** 
prefix between two
 **LOAD** 
or
 **SELECT** 
statements has the effect of reducing one or both of the two tables to
the intersection of table data before they are stored in Qlik Sense. The
 **Keep** 
prefix must always be preceded by one of the keywords
, **Left
or
 **Right** .
The selection of records from the tables is made in the same way as in a
corresponding join. However, the two tables are not joined and will be
stored in Qlik Sense as two separately named tables.

 *Keep*

## Inner

The
 **Join** 
and
 **Keep** 
prefixes in the data load script can be preceded by the prefix
 **Inner** .

If used before
 **Join** ,
it specifies that the join between the two tables should be an inner
join. The resulting table contains only combinations between the two
tables with a full data set from both sides.

If used before
 **Keep** ,
it specifies that the two tables should be reduced to their common
intersection before being stored in Qlik Sense.

 

In these examples we use the source tables Table1 and Table2:

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep1.png)



<div class="caption" data-autonumposition="none">

Inner examples source
tables



###  **Inner Join** 

First, we perform an
Inner Join on the tables, resulting in VTable, containing only one row,
the only record existing in both tables, with data combined from both
tables.

VTable:

SELECT \* from Table1;

inner join SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep2.png)



<div class="caption" data-autonumposition="none">

Inner Join
example



###  **Inner Keep** 

If we perform an
Inner Keep instead, you will still have two tables. The two tables are
of course associated via the common field A.

VTab1:

SELECT \* from Table1;

VTab2:

inner keep SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep3.png)



<div class="caption" data-autonumposition="none">

Inner Keep example



 *Inner*

## Left

The
 **Join** 
and
 **Keep** 
prefixes in the data load script can be preceded by the prefix
 **left** .

If used before
 **Join** ,
it specifies that the join between the two tables should be a left join.
The resulting table only contains combinations between the two tables
with a full data set from the first table.

If used before
 **Keep** ,
it specifies that the second table should be reduced to its common
intersection with the first table before being stored in Qlik Sense.

 

In these examples we use the source tables Table1 and Table2:

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep1.png)



<div class="caption" data-autonumposition="none">

Left examples source tables



First, we perform a
Left Join on the tables, resulting in VTable, containing all rows from
Table1, combined with fields from matching rows in Table2.

VTable:

SELECT \* from Table1;

left join SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep4.png)



<div class="caption" data-autonumposition="none">

Left Join example



If we perform an
Left Keep instead, you will still have two tables. The two tables are
of course associated via the common field A.

VTab1:

SELECT \* from Table1;

VTab2:

left keep SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep5.png)



<div class="caption" data-autonumposition="none">

Left Keep example



 *Left*

## Right

The
 **Join** 
and
 **Keep** 
prefixes in the data load script can be preceded by the prefix
 **right** .

If used before
 **Join** ,
it specifies that the join between the two tables should be a right
join. The resulting table only contains combinations between the two
tables with a full data set from the second table.

If used before
 **Keep** ,
it specifies that the first table should be reduced to its common
intersection with the second table before being stored in Qlik Sense.

 

In these examples we use the source tables Table1 and Table2:

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep1.png)



<div class="caption" data-autonumposition="none">

Right examples source tables



First, we perform a
Right Join on the tables, resulting in VTable, containing all rows from
Table2, combined with fields from matching rows in Table1.

VTable:

SELECT \* from Table1;

right join SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep6.png)



<div class="caption" data-autonumposition="none">

Right Join example



If we perform an
Left Keep instead, you will still have two tables. The two tables are
of course associated via the common field A.

VTab1:

SELECT \* from Table1;

VTab2:

right keep SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep7.png)



<div class="caption" data-autonumposition="none">

Right Keep
example



 *Right*

# Combining tables with Join and Keep

A join is an operation that takes two tables and combines them into one.
The records of the resulting table are combinations of records in the
original tables, usually in such a way that the two records contributing
to any given combination in the resulting table have a common value for
one or several common fields, a so-called natural join. In Qlik Sense,
joins can be made in the script, producing logical tables.

The Qlik Sense logic will then not see the separate tables, but rather
the result of the join, which is a single internal table. In some
situations this is needed, but there are disadvantages:

  - The loaded tables often become larger, and Qlik Sense works slower.
  - Some information may be lost: the frequency (number of records)
    within the original table may no longer be available.

The
 **Keep** 
functionality, which has the effect of reducing one or both of the two
tables to the intersection of table data before the tables are stored in
Qlik Sense, has been designed to reduce the number of cases where
explicit joins needs to be used.



In this documentation, the term join is usually used for joins made
before the internal tables are created. The association, made after the
internal tables are created, is however essentially also a join.



## Join

The simplest way to make a join is with the
 **Join** 
prefix in the script, which joins the internal table with another named
table or with the last previously created table. The join will be an
outer join, creating all possible combinations of values from the two
tables.

 

LOAD a, b, c from table1.csv;

join LOAD a, d from table2.csv;

 

The resulting internal table has the fields a, b, c and d. The number of
records differs depending on the field values of the two tables.



The names of the fields to join over must be exactly the same. The
number of fields to join over is arbitrary. Usually the tables should
have one or a few fields in common. No field in common will render the
cartesian product of the tables. All fields in common is also possible,
but usually makes no sense. Unless a table name of a previously loaded
table is specified in the
 **Join** 
statement the
 **Join** 
prefix uses the last previously created table. The order of the two
statements is thus not arbitrary.



## Using Join

The explicit
 **Join** 
prefix in the Qlik Sense script language performs a full join of the two
tables. The result is one table. In many cases such joins will results
in very large tables.

Do the following:

1.  In the app, Advanced     Scripting tutorial, open the
    Data load     editor.
2.  Add a new script section by clicking on
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">P
    in the upper left corner.
3.  Give the section the name
    Transactions
    and press Enter.
4.  Click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">±
    on the Tutorial     files data connection to select a file to load data from.
5.  Select
    Transactions.csv
    and click
    <span class="ui_item" data-autonumposition="none">Select.
6.  Click Insert     script.
7.  Click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">±
    on the Tutorial     files data connection to select a file to load data from.
8.  Select
    Salesman.xlsx
    and click
    <span class="ui_item" data-autonumposition="none">Select.
9.  Select
    Salesman
    and click Insert     script.

The script looks like
this:



LOAD



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

"Transaction
ID",



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

"Salesman
ID",



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

Product,



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

"Serial
No",



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

"ID
Customer",



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

"List
Price",



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

"Gross
Margin"





FROM 'lib://Tutorial
Files/Transactions.csv'





(txt, codepage is 1252, embedded labels, delimiter is ',',
msq);





 





LOAD



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

"Salesman
ID",



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

Salesman,



<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

"Distributor
ID"





FROM 'lib://Tutorial
Files/Salesman.xlsx'





(ooxml, embedded labels, table is Salesman);



 

Clicking on Load data at this point would produce the following data model:

![](Resources/Images/ex_gen_Join1.png)

However, having the Transactions and Salesman tables separated may not
be the required result. It may be better to join the two tables.

Do the following:

1.  To set a name for the joined table, add a new row at the top of the
    script and enter the following:
2.  To join the Transactions and Salesman tables, on the empty line
    above the second
     **LOAD** 
    statement, add the following:

<!-- end list -->

1.  Click Load     data.
2.  When the script execution is finished, click
    <span class="ui_item" data-autonumposition="none">Close in
    the
    <span class="ui_item" data-autonumposition="none">Progress
    pop-up.
3.  Click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">”
    and select Data     model viewer to verify that your data is loaded.

![](Resources/Images/ex_gen_Join2.png)

All the fields of the Transactions and Salesman tables are now combined
into a single Transactions table.

## Keep

One of the main features of Qlik Sense is its ability to make
associations between tables instead of joining them, which reduces space
in memory, increases speed and gives enormous flexibility. The keep
functionality has been designed to reduce the number of cases where
explicit joins need to be used.

The
 **Keep** 
prefix between two
 **LOAD** 
or
 **SELECT** 
statements has the effect of reducing one or both of the two tables to
the intersection of table data before they are stored in Qlik Sense. The
 **Keep** 
prefix must always be preceded by one of the keywords
, **Left
or
 **Right** .
The selection of records from the tables is made in the same way as in a
corresponding join. However, the two tables are not joined and will be
stored in Qlik Sense as two separately named tables.

## Inner

The
 **Join** 
and
 **Keep** 
prefixes in the Qlik Sense script language can be preceded by the prefix
 **Inner** .

If used before
 **Join** ,
it specifies that the join between the two tables should be an inner
join. The resulting table contains only combinations between the two
tables with a full data set from both sides.

If used before
 **Keep** ,
it specifies that the two tables should be reduced to their common
intersection before being stored in Qlik Sense.

 

In these examples we use the source tables Table1 and Table2:

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep1.png)



<div class="caption" data-autonumposition="none">

Inner examples source tables



First, we perform an
Inner Join on the tables, resulting in VTable, containing only one row,
the only record existing in both tables, with data combined from both
tables.

VTable:

SELECT \* from Table1;

inner join SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep2.png)



<div class="caption" data-autonumposition="none">

Inner Join example



If we perform an
Inner Keep instead, you will still have two tables. The two tables are
of course associated via the common field A.

VTab1:

SELECT \* from Table1;

VTab2:

inner keep SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep3.png)



<div class="caption" data-autonumposition="none">

Inner Keep example



## Left

The
 **Join** 
and
 **Keep** 
prefixes in the Qlik Sense script language can be preceded by the prefix
 **Left** .

If used before
 **Join** ,
it specifies that the join between the two tables should be a Left Join.
The resulting table only contains combinations between the two tables
with a full data set from the first table.

If used before
 **Keep** ,
it specifies that the second table should be reduced to its common
intersection with the first table before being stored in Qlik Sense.

 

In these examples we use the source tables Table1 and Table2:

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep1.png)



<div class="caption" data-autonumposition="none">

Left examples source tables



First, we perform a
Left Join on the tables, resulting in VTable, containing all rows from
Table1, combined with fields from matching rows in Table2.

VTable:

SELECT \* from Table1;

left join SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep4.png)



<div class="caption" data-autonumposition="none">

Left Join example



If we perform an
Left Keep instead, you will still have two tables. The two tables are
of course associated via the common field A.

VTab1:

SELECT \* from Table1;

VTab2:

left keep SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep5.png)



<div class="caption" data-autonumposition="none">

Left Keep example



## Right

The
 **Join** 
and
 **Keep** 
prefixes in the Qlik Sense script language can be preceded by the prefix
 **Right** .

If used before
 **Join** ,
it specifies that the join between the two tables should be a Right
Join. The resulting table only contains combinations between the two
tables with a full data set from the second table.

If used before
 **Keep** ,
it specifies that the first table should be reduced to its common
intersection with the second table before being stored in Qlik Sense.

 

In these examples we use the source tables Table1 and Table2:

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep1.png)



<div class="caption" data-autonumposition="none">

Right examples source tables



First, we perform a
Right Join on the tables, resulting in VTable, containing all rows from
Table2, combined with fields from matching rows in Table1.

VTable:

SELECT \* from Table1;

right join SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep6.png)



<div class="caption" data-autonumposition="none">

Right Join example



If we perform an
Right Keep instead, you will still have two tables. The two tables are
of course associated via the common field A.

VTab1:

SELECT \* from Table1;

VTab2:

right keep SELECT \* from Table2;

<div class="picture" data-autonumposition="none">

![](Resources/Images/ex_gen_JoinKeep7.png)



<div class="caption" data-autonumposition="none">

Right Keep
example



# Creating a date interval from a single date

Sometimes time intervals are not stored explicitly with a beginning and
an end. Instead they are implied by only one field – the change
timestamp.

It could be as in the table below where you have currency rates for
multiple currencies. Each currency rate change is on its own row; each
with a new conversion rate. Also, the table contains rows with empty
dates corresponding to the initial conversion rate, before the first
change was made.

![](Resources/Images/ex_gen_Intervalmatch1.png)

This table defines a set of non-overlapping intervals, where the begin
data is called “Change Date” and the end date is defined by the
beginning of the following interval. But since the end date isn’t
explicitly stored in a column of its own, we need to create such a
column, so that the new table will become a list of intervals.

In this script example the table In_Rates is created by an inline load.
Make sure that the dates in the Change Date column are in the same
format as the local date
format.



In_Rates: LOAD \* Inline [ Currency,Change Date,Rate EUR,,8.59
EUR,28/01/2013,8.69 EUR,15/02/2013,8.45 USD,,6.50 USD,10/01/2013,6.56
USD,03/02/2013,6.30 ];



Do the following:

1.  Determine which time range you want to work with. The beginning of
    the range must be before the first date in the data and the end of
    the range must be after the
    last.
    
    
    
    Let vBeginTime =
    Num('1/1/2013');
    
    
    
    
    
    Let vEndTime =
    Num('1/3/2013');
    
    
    
    
    
    Let vEpsilon = Pow(2,-27);
    
    

<!-- end list -->

1.  Load the source data, but change empty dates to the beginning of the
    range defined in the previous bullet. The change date should be
    loaded as “From Date”.
    
    Sort the table first according to Currency, then according to the
    “From Date” descending so that you have the latest dates on
    top.
    
    
    
    Tmp_Rates:
    
    
    
    
    
    LOAD Currency,
    Rate,
    
    
    
    
    
    Date(If(IsNum([Change Date]), [Change Date], $(\#vBeginTime)))
    as
    FromDate
    
    
    
    
    
    Resident In_Rates;
    
    

2.  Run a second pass through data where you calculate the “To Date”. If
    the current record has a different currency from the previous
    record, then it is the first record of a new currency (but its last
    interval), so you should use the end of the range defined in step 1.
    If it is the same Currency, you should take the “From Date” from the
    previous record, subtract a small amount of time, and use this value
    as “To Date” in the current
    record.
    
    
    
    Rates:
    
    
    
    
    
    LOAD Currency, Rate,
    FromDate,
    
    
    
    
    
    Date(If(
    Currency=Peek(Currency),
    
    
    
    
    
    Peek(FromDate) -
    $(\#vEpsilon),
    
    
    
    
    
    $(\#vEndTime)
    
    
    
    
    
    )) as
    ToDate
    
    
    
    
    
    Resident
    Tmp_Rates
    
    
    
    
    
    Order By Currency, FromDate Desc;
    
    

3.  Drop the input table and the temporary
    table.
    
    
    
    Drop Table Tmp_Rates;
    
    

The script listed below will update the source table in the following
manner:

![](Resources/Images/ex_gen_Intervalmatch2.png)

When the script is run, you will have a table listing the intervals
correctly. Use the
<span class="ui_item" data-autonumposition="none">Preview section
of the data model viewer to view the resulting table.

![](Resources/Images/ex_gen_Intervalmatch3.png)

This table can subsequently be used in a comparison with an existing
date using the
 **Intervalmatch** 
methods.

 

The entire Qlik Sense script looks like
this:



Let vBeginTime =
Num('1/1/2013');





Let vEndTime =
Num('1/3/2013');





Let vEpsilon =
Pow(2,-27);





 





In_Rates: LOAD \* Inline [ Currency,Change Date,Rate EUR,,8.59
EUR,28/01/2013,8.69 EUR,15/02/2013,8.45 USD,,6.50 USD,10/01/2013,6.56
USD,03/02/2013,6.30
];





 





 





Tmp_Rates:





LOAD Currency,
Rate,





Date(If(IsNum([Change Date]), [Change Date], $(\#vBeginTime))) as
FromDate





Resident
In_Rates;





 





Rates:





LOAD Currency, Rate,
FromDate,





Date(If(
Currency=Peek(Currency),





Peek(FromDate) -
$(\#vEpsilon),





$(\#vEndTime)





)) as
ToDate





Resident
Tmp_Rates





Order By Currency, FromDate
Desc;





 





Drop Table Tmp_Rates;



 

*Matching intervals to discrete data*

# Data cleansing

There are times when the source data that you load into Qlik Sense is
not necessarily how you want it in the Qlik Sense app. Qlik Sense
provides a host of functions and statements that allow us to transform
our data into a format that works for us.

Mapping can be used in a Qlik Sense script to replace or modify field
values or names when the script is run, so mapping can be used to clean
up data and make it more consistent or to replace parts or all of a
field value.

When you load data from different tables, field values denoting the same
thing are not always consistently named. Since this lack of consistency
hinders associations, the problem needs to be solved. This can be done
in an elegant way by creating a mapping table for the comparison of
field values.

## Mapping tables

Tables loaded via
Mapping load or
Mapping select are treated differently from other tables. They are stored
in a separate area of the memory and used only as mapping tables when
the script is run. After the script is run these tables are
automatically dropped.

### Rules:

  - A mapping table must have two columns, the first one containing the
    comparison values and the second the desired mapping values.
  - The two columns must be named, but the names have no relevance in
    themselves. The column names have no connection to field names in
    regular internal tables.

## Using Mapping

The following mapping functions/statements will be addressed in this
tutorial:

• Mapping prefix

• ApplyMap()

• MapSubstring()

• Map … Using statement

•
 **Unmap** 
statement

### Mapping prefix

The Mapping prefix is used in a script to create a mapping table. The
mapping table can then be used with the ApplyMap() function, the
MapSubstring() function or the Map … Using statement.

Do the following:

1.  Create a new app and give it a name.
2.  Open the Data load     editor and create a new connection to the folder containing
    the tutorial sample files and give it the name
    Tutorial     Files.
3.  Enter the following
script:



CountryMap:





MAPPING LOAD \* INLINE
[





Country,
NewCountry





U.S.A.,
US





U.S.,
US





United States,
US





United States of America,
US





];



 

The CountryMap table stores two columns: Country and NewCountry. The
Country column stores the various ways country has been entered in the
Country field. The NewCountry column stores how the values will be
mapped. This mapping table will be used to store consistent US country
values in the Country field. For instance, if U.S.A. is stored in the
Country field, map it to be US.

### ApplyMap() function

ApplyMap()
allows the user to replace data in a field based on a previously created
mapping table. The mapping table need to be loaded before the
ApplyMap()
function can be used. In the sample file,
<span class="path" data-autonumposition="none">Data.xlsx, data
that includes people and the country they reside in is loaded. The raw
data looks like this:

![](Resources/Images/ex_gen_MappingData1.png)

In the table above, notice that the country is entered in various ways.
In order to make the country field consistent, the mapping table is
loaded and then the
ApplyMap()
function is used.

Do the following:

1.  In the Data load     editor, click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">±
    on the data connection you created in the previous section to select
    a file to load data from.
2.  Select
    Data.xlsx
    and click
    <span class="ui_item" data-autonumposition="none">Select.
3.  Click Insert     script.
4.  Insert a line above the newly created LOAD statement and enter the
    following:

<!-- end list -->

1.  Modify the line containing
    Country,
    as follows:

<!-- end list -->

1.  In the upper right corner, click
    <span class="ui_item" data-autonumposition="none">Load data.

<!-- end list -->

1.  Add
    'US'
    as the third parameter of the
     **ApplyMap()** 
    function, to handle such cases when the country may have been
    entered incorrectly:

<!-- end list -->

1.  Click Load     data.

Now the loaded data will look like this:

![](Resources/Images/ex_gen_MappingData3.png)

### MapSubstring() function

The
 **MapSubstring()** 
function allows you to map parts of a field.

In the table created by
 **ApplyMap()** 
we now want the numbers to be written as text, so the
 **MapSubstring()** 
function will be used to replace the numeric data with text.

In order to do this a mapping table first needs to be created.

Do the following:

1.  In the Data load     editor, add the following script lines at the end of the
    CountryMap section, but before the Data section.

<!-- end list -->

1.  In the Data section of the script modify the
    <span class="Code" data-autonumposition="none">Code statement
    as follows:

<!-- end list -->

1.  Click Load     data.

Now let us take a look at the results of the
 **MapSubstring()** 
function. The loaded data now looks like this:

![](Resources/Images/ex_gen_MappingData4.png)

Use the <span class="ui_item" data-autonumposition="none">Preview
section of the data model viewer to view the resulting table.

The numeric characters were replaced with text in the Code field. If a
number appears more than once as it does for ID=3, and ID=4, the text is
also repeated. ID=4, Susan McDaniels had a 6 in her code. Since 6 was
not mapped in the CodeMap table, it remains unchanged. ID=5, Dean Smith,
had 111 in his code. This has been mapped as 'elevenone'.

### Map … Using

The
Map … Using statement can also be used to apply a map to a field but
it works a little differently than
 **ApplyMap()** .
While
 **ApplyMap()** 
handles the mapping every time the field name is encountered,
Map … using handles the mapping when the value is stored under the
field name in the internal table.

Let’s take a look at an example. Assume we were loading the Country
field multiple times in the script and wanted to apply a map every time
the field was loaded. The ApplyMap() function could be used as
illustrated earlier in this tutorial or
Map … Using can be used.

If
Map … Using is used then the map is applied to the field when the
field is stored in the internal table. So in the example below, the map
is applied to the Country field in the Data1 table but it would not be
applied to the Country2 field in the Data2 table. This is because the
Map … using statement is only applied to fields named Country. When
the Country2 field is stored to the internal table it is no longer named
Country. If you want the map to be applied to the Country2 table then
you would need to use the
 **ApplyMap()** 
function.



Map Country Using
CountryMap;





Data1:





LOAD





ID,





Name,





Country





FROM 'lib://Tutorial
Files/Data.xlsx'





(ooxml, embedded labels, table is
Sheet1);





Data2:





LOAD





ID,





Country as
Country2





FROM 'lib://Tutorial
Files/Data.xlsx'





(ooxml, embedded labels, table is
Sheet1);





UNMAP;



 

### Unmap

The
 **Unmap** 
statement ends the
Map … Using statement so if Country were to be loaded after the
 **Unmap** 
statement, the CountryMap would not be
applied.

# Data loading in Qlik Sense

Qlik Sense uses a data load script, which is managed in the
data load editor, to connect to and retrieve data from various data
sources. In the script, the fields and tables to load are specified. It
is also possible to manipulate the data structure by using script
statements and expressions. It is also possible to load data into Qlik
Sense using the data manager, but when you want to create, edit and run
a data load script you use the data load editor.

During the data load, Qlik Sense identifies common fields from different
tables (key fields) to associate the data. The resulting data structure
of the data in the app can be monitored in the data model viewer.
Changes to the data structure can be achieved by renaming fields to
obtain different associations between tables.

After the data has been loaded into Qlik Sense, it is stored in the app.
The app is the heart of the program's functionality and it is
characterized by the unrestricted manner in which data is associated,
its large number of possible dimensions, its speed of analysis and its
compact size. The app is held in RAM when it is open.

Before we can start looking more closely at the script in the data load
editor, you need to create an empty app and a couple of data connections
to be able to load data into Qlik Sense.

The example files that you need for this tutorial
    are:

  -    - Transactions.csv
  -    - Salesman.xlsx
  -    - Events.txt
  -    - Winedistricts.txt

# Data types in Qlik Sense

Qlik Sense can handle text strings, numbers, dates, times, timestamps,
and currencies correctly. They can be sorted, displayed in a number of
different formats and they can be used in calculations. This means, for
example, that dates, times, and timestamps can be added to or subtracted
from each
other.

## Data representation inside Qlik Sense

In order to understand data interpretation and number formatting in Qlik
Sense, it is necessary to know how data is stored internally by the
program. All of the data loaded into Qlik Sense is available in two
representations: as a string and as a number.

1.  The string representation is always available and is what is shown
    in the list boxes and the other sheet objects. Formatting of data in
    list boxes (number format) only affects the string representation.
2.  The number representation is only available when the data can be
    interpreted as a valid number. The number representation is used for
    all numeric calculations and for numeric sorting.

If several data items read into one field have the same number
representation, they will all be treated as the same value and will all
share the first string representation encountered. Example: The numbers
1.0, 1 and 1.000 read in that order will all have the number
representation 1 and the initial string representation
1.0.

# Date and time interpretation

Qlik Sense stores each date, time, and timestamp found in data as a date
serial number. The date serial number is used for dates, times and
timestamps and in arithmetic calculations based on date and time
entities. Dates and times can thus be added and subtracted, intervals
can be compared, and so on.

The date serial number is the (real valued) number of days passed since
December 30, 1899, that is, the Qlik Sense format is identical to the
1900 date system used by Microsoft Excel and other programs, in the
range between March 1, 1900 and February 28, 2100. For example, 33857
corresponds to September 10, 1992. Outside this range, Qlik Sense uses
the same date system extended to the Gregorian calendar.

The serial number for times is a number between 0 and 1. The serial
number 0.00000 corresponds to 00:00:00, whereas 0.99999 corresponds to
23:59:59. Mixed numbers indicate the date and time: the serial number
2.5 represents January 1, 1900 at 12:00 noon.

The data is, however, displayed according to the format of the string.
By default, the settings made in the
Control Panel are used. It is also possible to set the format of the data
by using the number interpretation variables in the script or with the
help of a formatting function. Lastly,it is also possible to reformat
the data in the properties sheet of the sheet object.

*Number interpretation variables*

*Formatting functions*

 

|                  |               |           |
| ---------------- | ------------- | --------- |
| 1997-08-06       | is stored as: | 35648     |
| 09:00            | is stored as: | 0.375     |
| 1997-08-06 09:00 | is stored as: | 35648.375 |

and the other way around.

|       |                                          |        |
| ----- | ---------------------------------------- | ------ |
| 35648 | with number format 'D/M/YY' is shown as: | 6/8/97 |
| 0.375 | with number format 'hh.mm' is shown as:  | 09.00  |

Qlik Sense follows a set of rules to try to interpret dates, times, and
other data types. The final result, however, will be affected by a
number of factors as described here.

 

These examples assume the following default settings:

  - Number decimal separator: .
  - Short date format: YY-MM-DD
  - Time format: hh:mm

The following table shows the different representations when data is
read into Qlik Sense without the special interpretation function in the
script:

| Source data | Qlik Sense default interpretation | 'YYYY-MM-DD' date format | 'MM/DD/YYYY' date format | 'hh:mm' time format | '\# \#\#0.00' number format |
| ----------- | --------------------------------- | ------------------------ | ------------------------ | ------------------- | --------------------------- |
| 0.375       | 0.375                             | 1899-12-30               | 12/30/1899               | 09:00               | 0.38                        |
| 33857       | 33857                             | 1992-09-10               | 09/10/1992               | 00:00               | 33 857.00                   |
| 97-08-06    | 97-08-06                          | 1997-08-06               | 08/06/1997               | 00:00               | 35 648.00                   |
| 970806      | 970806                            | 4557-12-21               | 12/21/4557               | 00:00               | 970 806.00                  |
| 8/6/97      | 8/6/97                            | 8/6/97                   | 8/6/97                   | 8/6/97              | 8/6/97                      |

The following table shows the different representations when data is
read into Qlik Sense using the date\#( A, 'M/D/YY') interpretation
function in the
script:

| Source data | Qlik Sense default interpretation | 'YYYY-MM-DD' date format | 'MM/DD/YYYY' date format | 'hh:mm' time format | '\# \#\#0.00' number format |
| ----------- | --------------------------------- | ------------------------ | ------------------------ | ------------------- | --------------------------- |
| 0.375       | 0.375                             | 0.375                    | 0.375                    | 0.375               | 0.375                       |
| 33857       | 33857                             | 33857                    | 33857                    | 33857               | 33857                       |
| 97-08-06    | 97-08-06                          | 97-08-06                 | 97-08-06                 | 97-08-06            | 97-08-06                    |
| 970806      | 970806                            | 970806                   | 970806                   | 970806              | 970806                      |
| 8/6/97      | 8/6/97                            | 1997-08-06               | 08/06/1997               | 00:00               | 35 648.00                   |

# Derived fields

If you have a group of fields that are related, or if fields carry
information that can be broken up into smaller parts that are relevant
when creating dimensions or measures, you can create field definitions
that can be used to generate derived fields. One example is a date
field, from which you can derive several attributes, such as year,
month, week number, or day name. All these attributes can be calculated
in a dimension expression using Qlik Sense date functions, but an
alternative is to create a calendar definition that is common for all
fields of date type. Field definitions are stored in the data load
script.



Default calendar field definitions for Qlik Sense are included in
autoCalendar for date fields loaded using
<span class="ui_item" data-autonumposition="none">Data manager.
See *Adding data to the
app*.



## Declare the calendar field definitions

You use the
Declare
statement to create a definition of the derived fields. This is where
you define the different attributes of the field, in this case date
related attributes. Each field is described as
\<expression\> As field_name tagged tag.
Setting one or more tags is optional, but it can affect the sort order
of the derived field. Use
$1
to reference the data field from which the derived fields should be
generated.

<div class="warning" data-autonumposition="none">

Do not use autoCalendar as name for calendar field definitions, as this
name is reserved for auto-generated calendar
templates.





Calendar: DECLARE FIELD DEFINITION TAGGED '$date' Parameters
first_month_of_year = 1 Fields Year($1) As Year Tagged ('$numeric'),
Month($1) as Month Tagged ('$numeric'), Date($1) as Date Tagged
('$date'), Week($1) as Week Tagged ('$numeric'), Weekday($1) as Weekday
Tagged ('$numeric'), DayNumberOfYear($1, first_month_of_year) as
DayNumberOfYear Tagged ('$numeric') Groups Year, Week, Weekday type
drilldown as YearWeekDayName, Year, Month, Date type collection as
YearMonthDate;





 



*Declare*

## Map data fields to the calendar with Derive

The next step is to use the
Derive
statement to map existing data fields to the calendar. This will create
the derived fields. You can do this in three alternative ways in the
data load script:

  - Map specific fields by field
    name.
    
    
    
    DERIVE FIELDS FROM FIELDS OrderDate,ShippingDate USING Calendar;
    
    

  - Map all fields with one or more specific field
    tags.
    
    
    
    DERIVE FIELDS FROM EXPLICIT TAGS '$date' USING Calendar;
    
    

  - Map all fields that are tagged with one of the tags of the field
    definition ($date in the example
    above).
    
    
    
    DERIVE FIELDS FROM IMPLICIT TAG USING Calendar;
    
    

In this case, you could use any of the three examples
here.

*Derive*

## Use the derived date fields in a visualization

Qlik Sense is prepared to recognize derived date fields if you have
created a calendar definition and mapped the fields like in the example
here. They are available in the
Date & time fields section of the
<span class="ui_item" data-autonumposition="none">Fields asset
panel. You will also find all derived fields in the expression editor
and when you create or edit dimensions.

Date & time
fields

# Dollar-sign expansion using an expression

Expressions can be used in dollar-sign expansions. The content between
the brackets must then start with an equal sign:

$(=expression )

The expression will be evaluated and the value will be used in the
expansion.

 

$(=Year(Today())); // returns a string with the current
year.

$(=Only(Year)-1); // returns the year before the selected one.

### File inclusion

File inclusions are made using dollar-sign expansions. The syntax is:

$(include=filename )

The above text will be replaced by the content of the file specified
after the equal sign. This feature is very useful when storing scripts
or parts of scripts in text
files.

 

$(include=C:\\Documents\\MyScript.qvs);

# Dollar-sign expansion using parameters

Parameters can be used in dollar-sign expansions. The variable must then
contain formal parameters, such as $1, $2, $3 etc. When expanding the
variable, the parameters should be stated in a comma separated list.

 

Set
MUL=’$1\*$2’;

Set X=$(MUL(3,7)); // returns '3\*7' in
X

Let X=$(MUL(3,7)); // returns 21 in X

If the number of formal parameters exceeds the number of actual
parameters only the formal parameters corresponding to actual parameters
will be expanded. If the number of actual parameters exceeds the number
of formal parameters the superfluous actual parameters will be ignored.

 

Set
MUL=’$1\*$2’;

Set X=$(MUL); // returns '$1\*$2' in
X

Set X=$(MUL(10)); // returns '10\*$2' in
X

Let X=$(MUL(5,7,8)); // returns 35 in X

The parameter $0 returns the number of parameters actually passed by a
call.

 

set MUL='$1\*$2 $0
par'; 

set X=$(MUL(3,7)); // returns '3\*7 2 par' in
X

# Dollar-sign expansion using a variable

When using a variable for text replacement in the script or in an
expression, the following syntax is
used:

$(variablename)
     

$<span class="user_input" data-autonumposition="none">(variablename)
expands to the value in the variable. If
variablename
does not exist, the expansion will result in an empty string.

For numeric variable expansions, the following syntax is
used:

$(\#variablename)
     

It always yields a valid decimal-point representation of the numeric
value of the variable, possibly with exponential notation (for very
large/small numbers). If
variablename
does not exist or does not contain a numeric value, it will be expanded
to
0
instead.

 

SET DecimalSep=',';

LET X = 7/2;

The dollar-sign expansion
 **$(X)** 
will expand to 3,5 while
 **$(\#X)** 
will expand to 3.5.

 

Set Mypath=C:\\MyDocs\\Files\\;

...

LOAD \* from $(MyPath)abc.csv;

Data will be loaded from
C:\\MyDocs\\Files\\abc.csv.

 

Set CurrentYear=1992;

...

SQL SELECT \* FROM table1 WHERE Year=$(CurrentYear);

Rows with Year=1992 will be
selected.

 

<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

Set vConcatenate = ; For each vFile in FileList('.\\\*.txt') Data:
$(vConcatenate) LOAD \* FROM [$(vFile)]; Set vConcatenate =
Concatenate ; Next vFile



In this example, all .txt files in the directory are loaded using the
 **Concatenate** 
prefix. This may be required if the fields differ slightly, in which
case auto-concatenation does not work. The vConcatenate variable is
initially set to an empty string, as the
 **Concatenate** 
prefix cannot be used on the first load. If the directory contains three
files named
, file2.txt
and
file3.txt,
the
 **LOAD** 
statement will during the three iterations expand to:

LOAD \* FROM[.\\file1.txt];

Concatenate LOAD \* FROM[.\\file2.txt];

Concatenate LOAD \*
FROM[.\\file3.txt];

# Dollar-sign expansions

Dollar-sign expansions are definitions of text replacements used in the
script or in expressions. This process is known as expansion - even if
the new text is shorter. The replacement is made just before the script
statement or the expression is evaluated. Technically it is a macro
expansion.

The expansion always begins with '$(' and ends with ') ' and the content
between brackets defines how the text replacement will be done. To avoid
confusion with script macros we will henceforth refer to macro
expansions as dollar-sign expansions.

Dollar-sign expansions can be used with either of:

  - variables
  - parameters
  - expressions



A dollar-sign expansion is limited in how many expansions it can
calculate. Any expansion over 1000 will not be
calculated.



# Field tags

Field tags provide the possibility of adding metadata to the fields in
your data model. There are two different types of field tags:

  - System field tags
    
    System field tags are generated automatically when the script is
    executed and data is loaded. Some of the tags can be manipulated in
    the script. System tags are always preceded by a $ sign.

  - Custom field tags
    
    You can add custom tags to fields in the data load script, using the
    Tag
    statement. Custom tags may not use the same name as any system tag.
    
    *Tag*
    
    *Untag*

## System field tags

The following system field tags are generated automatically when data is
loaded.

<table>
<thead>
<tr class="header">
<th>Tag</th>
<th>Description</th>
<th>Can be manipulated in the script</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>$system</td>
<td><p>System field that is generated by Qlik Sense during script execution.</p>
<p><em>System fields</em></p></td>
<td>No</td>
</tr>
<tr class="even">
<td>$key</td>
<td>Key field providing a link between two or more tables.</td>
<td>No</td>
</tr>
<tr class="odd">
<td>$keypart</td>
<td>The field is part of one or more synthetic keys.</td>
<td>No</td>
</tr>
<tr class="even">
<td>$syn</td>
<td><p>Synthetic key</p>
<p><em>Synthetic keys</em></p></td>
<td>No</td>
</tr>
<tr class="odd">
<td><p>$hidden</p></td>
<td><p>Hidden field, that is, it is not displayed in any field selection list when creating visualizations, dimensions or measures. You can still use hidden fields in expressions, but you need to type the field name.</p>
<p>You can use the HidePrefix and HideSuffix system variables to set which fields to hide.</p>
<p><em>HidePrefix</em></p>
<p><em>HideSuffix</em></p></td>
<td>Yes</td>
</tr>
<tr class="even">
<td>$numeric</td>
<td>All (non-NULL) values in the field are numeric.</td>
<td>Yes</td>
</tr>
<tr class="odd">
<td>$integer</td>
<td>All (non-NULL) values in the field are integers.</td>
<td>Yes</td>
</tr>
<tr class="even">
<td>$text</td>
<td>No values in the field are numeric.</td>
<td>Yes</td>
</tr>
<tr class="odd">
<td>$ascii</td>
<td>Field values contain only standard ASCII characters.</td>
<td>Yes</td>
</tr>
<tr class="even">
<td>$date</td>
<td>All (non-NULL) values in the field can be interpreted as dates (integers).</td>
<td>Yes</td>
</tr>
<tr class="odd">
<td>$timestamp</td>
<td>All (non-NULL) values in the field can be interpreted as time stamps.</td>
<td>Yes</td>
</tr>
<tr class="even">
<td>$geoname</td>
<td>Field values contain names of geographical locations, related to a point field ($geopoint) and/or an area field ($geomultipolygon).</td>
<td>Yes</td>
</tr>
<tr class="odd">
<td>$geopoint</td>
<td>Field values contain geometry point data, representing points on a map in the format [longitude, latitude].</td>
<td>Yes</td>
</tr>
<tr class="even">
<td>$geomultipolygon</td>
<td>Field values contain geometry polygon data, representing areas on a map.</td>
<td>Yes</td>
</tr>
</tbody>
</table>

## Derived field tags

The following tags can be used when you declare derived fields to
specify how to use and display the fields on a contiguous axis in a line
chart. You can manipulate the tags in the data load script.

<table>
<thead>
<tr class="header">
<th>Tag</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>$axis</td>
<td>The $axis tag is used to specify that the field should generate a tick on the contiguous axis of the chart.</td>
</tr>
<tr class="even">
<td><p>$qualified</p>
<p>$simplified</p></td>
<td><p>You can specify a qualified and a simplified version of an axis label by deriving two different fields. The qualified field is displayed as label when the axis is zoomed to a deeper level, to show full context.</p>
<p>For example, you can generate two fields when showing data by the quarter:</p>
<ul>
<li>A simplified field, with the $simplified tag, showing quarter, like 'Q1'.</li>
<li>A qualified field, with the $qualified tag, showing year and quarter, like '2016-Q1'.</li>
</ul>
<p>When the time axis is zoomed out, the axis shows labels in two levels, for year (2016) and quarter (Q1), using the simplified field. When you zoom in, the axis shows labels for quarter and month, and the qualified field (2016-Q1) is used to provide full year context for the quarter.</p></td>
</tr>
<tr class="odd">
<td>$cyclic</td>
<td>The $cyclic tag is used for cyclic fields, for example quarter or month, with a dual data representation.</td>
</tr>
</tbody>
</table>

The following tags can be enabled and disabled by the user:

  - $dimension - denotes a field recommended for use in chart
    dimensions, filter panes, etc.
  - $measure - denotes a field recommended for use in expressions.

# Fields

Fields are the primary data-carrying entities in Qlik Sense. A field
typically contains a number of values, called field values. In database
terminology we say that the data processed by Qlik Sense comes from data
files. A file is composed of several fields where each data entry is a
record. The terms file, field and record are equivalent to table, column
and row respectively. The Qlik Sense AQL logic works only on the fields
and their field values.

Field data is retrieved by script via
, **SELECT
or
 **Binary** 
statements. The only way of changing data in a field is by re-executing
the script. The actual field values can not be manipulated by the user
from the layout or by means of automation. Once read into Qlik Sense
they can only be viewed and used for logical selections and
calculations.

Field values consist of numeric or alphanumeric (text) data. Numeric
values actually have dual values, the numeric value and its current,
formatted text representation. Only the latter is displayed in sheet
objects etc.

The content of a field can be represented in a filter
pane.

# Functions in scripts and chart expressions

This section describes functions that can be used in Qlik Sense data
load scripts and chart expressions to transform and aggregate data.

Many functions can be used in the same way in both data load scripts and
chart expressions, but there are a number of exceptions:

  - Some functions can only be used in data load scripts, denoted by -
    script function.
  - Some functions can only be used in chart expressions, denoted by -
    chart function.
  - Some functions can be used in both data load scripts and chart
    expressions, but with differences in parameters and application.
    These are described in separate topics denoted by - script function
    or - chart
function.

## Analytic connections for server-side extensions (SSE)

Functions enabled by analytic connections will only be visible if you
have configured the analytic connections and Qlik Sense has started. You
configure the analytic connections in the QMC, see [Creating an analytic
connection](/Subsystems/ManagementConsole/Content/Sense_QMC/create-analytic-connection.htm).

You configure the analytic connections in the QMC, see the topic "
Creating an analytic connection" in the guide Manage Qlik Sense sites.

In Qlik Sense Desktop, you configure the analytic connections by editing
the <span class="path" data-autonumposition="none">Settings.ini
file, see *Configuring analytic connections in Qlik Sense Desktop*.

In Qlik Sense Desktop, you configure the analytic connections by editing
the <span class="path" data-autonumposition="none">Settings.ini
file, see the topic " Configuring analytic connections in Qlik Sense
Desktop" in the guide Qlik Sense
Desktop.

# Functions and statements not recommended in Qlik Sense

Most functions and statements that can be used in QlikView load scripts
and chart expressions are also supported in Qlik Sense, but some of them
are not recommended for use in Qlik Sense. There are also functions and
statements available in previous versions of Qlik Sense that have been
deprecated.

For compatibility reasons they will still work as intended, but it is
advisable to update the code according to the recommendations in this
section, as they may be removed in coming
versions.

## Script statements not recommended in Qlik Sense

This list describes script statements that are not recommended for use
in Qlik
Sense.

| Statement                                                                                                         | Recommendation                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
|  instead.            | |  **CustomConnect**  | Use **Custom Connect instead. |

## Script statement parameters not recommended in Qlik Sense

This list describes script statement parameters that are not recommended
for use in Qlik Sense.

<table>
<thead>
<tr class="header">
<th>Statement</th>
<th>Parameters</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> <td><p>Use **Incremental instead of:</p>
<ul>
<li> <li>**Incr (not recommended)</li>
</ul></td>
</tr>
<tr class="even">
<td> **LOAD** </td>
<td><p>The following parameter keywords are generated by QlikView file transformation wizards. Functionality is retained when data is reloaded, but Qlik Sense does not provide guided support/wizards for generating the statement with these parameters:</p>
<ul>
<li>Bottom</li>
<li>Cellvalue</li>
<li>Col</li>
<li>Colmatch</li>
<li>Colsplit</li>
<li>Colxtr</li>
<li>Compound</li>
<li>Contain</li>
<li>Equal</li>
<li>Every</li>
<li>Expand</li>
<li>Filters</li>
<li>Intarray</li>
<li>Interpret</li>
<li>Length</li>
<li>Longer</li>
<li>Numerical</li>
<li>Pos</li>
<li>Remove</li>
<li>Rotate</li>
<li>Row</li>
<li>Rowcnd</li>
<li>Shorter</li>
<li>Start</li>
<li>Strcnd</li>
<li>Top</li>
<li>Transpose</li>
<li>Unwrap</li>
<li>XML: XMLSAX and Pattern is Path</li>
</ul></td>
</tr>
</tbody>
</table>

## Functions not recommended in Qlik Sense

This list describes script and chart functions that are not recommended
for use in Qlik Sense.

<table>
<thead>
<tr class="header">
<th>Function</th>
<th>Recommendation</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p> <p>**NumCount</p>
<p> <p>**NumMin</p>
<p> **NumSum** </p></td>
<td><p>Use Range functions instead.</p>
<p><em>Range functions</em></p></td>
</tr>
<tr class="even">
<td><p> <p>**QliktechGray</p></td>
<td><p>Use other color functions instead.  **QliktechBlue() can be replaced by RGB(8, 18, 90) and **QliktechGray**  can be replaced by RGB(158, 148, 137) to get the same colors.</p>
<p><em>Color functions</em></p></td>
</tr>
<tr class="odd">
<td> <td><p>Use **EngineVersion instead.</p>
<p><em>EngineVersion - script and chart function</em></p></td>
</tr>
<tr class="even">
<td> <td><p>Use **EngineVersion instead.</p>
<p><em>EngineVersion - script and chart function</em></p></td>
</tr>
<tr class="odd">
<td> **QVUser** </td>
<td> </td>
</tr>
<tr class="even">
<td> <td>Use **YearToDate instead.</td>
</tr>
<tr class="odd">
<td> <td>Use **Rank instead.</td>
</tr>
<tr class="even">
<td> <td>Use **WildMatch instead.</td>
</tr>
</tbody>
</table>

###  **ALL**  qualifier

In QlikView, the
 **ALL** 
qualifier may occur before an expression. This is equivalent to using
{1} TOTAL. In such a case the calculation will be made over all the
values of the field in the document, disregarding the chart dimensions
and current selections. The same value is always returned regardless of
the logical state in the document. If the
 **ALL** 
qualifier is used, a set expression cannot be used, since the
 **ALL** 
qualifier defines a set by itself. For legacy reasons, the
 **ALL** 
qualifier will still work in this version of Qlik Sense, but may be
removed in coming
versions.

 

# Handling hierarchical data

Hierarchies are an important part of all business intelligence
solutions, used to describe dimensions that naturally contain different
levels of granularity. Some are simple and intuitive whereas others are
complex and demand a lot of thinking to be modeled correctly.

From the top of a hierarchy to the bottom, the members are progressively
more detailed. For example, in a dimension that has the levels Market,
Country, State and City, the member Americas appears in the top level of
the hierarchy, the member U.S.A. appears in the second level, the member
California appears in the third level and San Francisco in the bottom
level. California is more specific than U.S.A., and San Francisco is
more specific than California.

Storing hierarchies in a relational model is a common challenge with
multiple solutions. There are several approaches:

  - The Horizontal hierarchy
  - The Adjacency list model
  - The Path enumeration method
  - The Nested sets model
  - The Ancestor list

For the purposes of this tutorial we will be creating an Ancestor list
since it presents the hierarchy in a form that is directly usable in a
query. Further information on the other approaches can be found in the
Qlik Community.

## Hierarchy prefix

The
 **Hierarchy** 
prefix is a script command that you put in front of a LOAD or
 **SELECT** 
statement that loads an adjacent nodes table. The LOAD statement needs
to have at least three fields: An ID that is a unique key for the node,
a reference to the parent and a
name.



Hierarchy (NodeID, ParentID,
NodeName)





LOAD
NodeID,





ParentID,





NodeName



 

The prefix will transform a loaded table into an expanded nodes table; a
table that has a number of additional columns; one for each level of the
hierarchy.

Do the following:

1.  Create a new app and give it a name.
2.  Open the data load editor and create a new connection to the folder
    containing the tutorial sample files and give it the name
    Tutorial     Files.

<!-- end list -->

1.  In the Data load     editor, click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">±
    on the data connection to select a file to load data from.
2.  Select
    Winedistricts.txt
    and click
    <span class="ui_item" data-autonumposition="none">Select.
3.  Uncheck the Lbound and RBound fields so they are not loaded.
4.  Click Insert     script.

<!-- end list -->

1.  Insert a new line above the
     **LOAD** 
    statement, and enter the following:

<!-- end list -->

1.  Click Load     data.

The loaded table should look like this:

![](Resources/Images/ex_gen_HierarchyTable1.png)

Use the <span class="ui_item" data-autonumposition="none">Preview
section of the data model viewer to view the resulting table.

The resulting expanded nodes table has exactly the same number of
records as its source table: One per node. The expanded nodes table is
very practical since it fulfills a number of requirements for analyzing
a hierarchy in a relational model:

  - All the node names exist in one and the same column, so that this
    can be used for searches.
  - In addition, the different node levels have been expanded into one
    field each; fields that can be used in drill-down groups or as
    dimensions in pivot tables.
  - In addition, the different node levels have been expanded into one
    field each; fields that can be used in drill-down groups.
  - It can be made to contain a path unique for the node, listing all
    ancestors in the right order.
  - It can be made to contain the depth of the node, i.e. the distance
    from the root.

## HierarchyBelongsTo prefix

Just as the
 **Hierarchy** 
prefix, the
 **HierarchyBelongsTo** 
is a script command that you put in front of a
 **LOAD** 
or
 **SELECT** 
statement that loads an adjacent nodes
table:



HierarchyBelongsTo (NodeID, ParentID, NodeName, BelongsToID,
BelongsTo)





LOAD
NodeID,





ParentID,





NodeName



 

Also here, the
 **LOAD** 
statement needs to have at least three fields: An ID that is a unique
key for the node, a reference to the parent and a name. The prefix will
transform the loaded table into an ancestor table, a table that has
every combination of an ancestor and a descendant listed as a separate
record. Hence, it is very easy to find all ancestors or all descendants
of a specific node.

Do the following:

1.  In the Data load     editor modify the
     **Hierarchy** 
    statement so that is reads as follows:

<!-- end list -->

1.  In the upper right corner, click
    <span class="ui_item" data-autonumposition="none">Load data.

The loaded table should look like this:

![](Resources/Images/ex_gen_HierarchyTable2.png)

Use the <span class="ui_item" data-autonumposition="none">Preview
section of the data model viewer to view the resulting table.

The ancestor table is very practical since it fulfills a number of
requirements for analyzing a hierarchy in a relational model:

  - If the node ID represents the single nodes, the ancestor ID
    represents the entire trees and sub-trees of the hierarchy.
  - All the node names exist both in the role as nodes and in the role
    as trees, and both can be used for searches.
  - It can be made to contain the depth difference between the node
    depth, and the ancestor depth, that is, the distance from the root
    of the sub-tree.

### Authorization

It is not uncommon that a hierarchy is used for authorization. One
example is an organizational hierarchy. Each manager should obviously
have the right to see everything pertaining to their own department,
including all its sub-departments. But they should not necessarily have
the right to see other departments.

![](Resources/Images/ex_gen_Authorization1.png)

This means that different people will be allowed to see different
sub-trees of the organization. The authorization table may look like the
following:

![](Resources/Images/ex_gen_Authorization2.png)

In this case, Carol is allowed to see everything pertaining to the CEO
and below; Larry is allowed to see the Product organization; and James
is allowed to see the Engineering organization only. Hence, this table
needs to be matched against sub-trees in the above hierarchy.

Further information on how to work with hierarchical data is available
at [community.qlik.com](http://community.qlik.com/welcome)

 

Often the hierarchy is stored in an Adjacent Nodes table, and if so, the
above problem is easy to solve: Just load the Adjacent nodes table using
a
 **HierarchyBelongsTo** 
and name the ancestor field Tree.

If you want to use
Section Access, you need to load an upper case copy of Tree and call this
new field PERMISSIONS. Finally, you need to load the authorization
table. These two last steps can be done using the following script
lines: (The TempTrees table is the table created by the
 **HierarchyBelongsTo** 
statement.)

<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-autonumposition="none">

Trees:



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-space="preserve" data-autonumposition="none">

LOAD
\*,



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-space="preserve" data-autonumposition="none">

Upper(Tree) as
PERMISSIONS



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-space="preserve" data-autonumposition="none">

Resident
TempTrees;



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-autonumposition="none">

Drop Table
TempTrees;



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-autonumposition="none">

 



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-autonumposition="none">

Section
Access;



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-autonumposition="none">

Authorization:



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-space="preserve" data-autonumposition="none">

LOAD
ACCESS,



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-space="preserve" data-autonumposition="none">

NTNAME,



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-space="preserve" data-autonumposition="none">

UPPER(Permissions) as
PERMISSIONS



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-autonumposition="none">

From
Organization;



<div class="code" data-conditions="Targets.NotToTranslate,Targets.Internal" data-space="preserve" data-autonumposition="none">

Section Application;



 

When you have done this, you should have a data model that looks like
the
following:

![](Resources/Images/ex_gen_Authorization3.png)

# Loading data with the data load script

This introduction serves as a brief presentation of how you can load
data into Qlik Sense using data load scripts.

Qlik Sense uses a data load script, which is managed in the
data load editor, to connect to and retrieve data from various data
sources. In the script, the fields and tables to load are specified. It
is also possible to manipulate the data structure by using script
statements and expressions. It is also possible to load data into Qlik
Sense using the data manager, but when you want to create, edit and run
a data load script you use the data load editor.

During the data load, Qlik Sense identifies common fields from different
tables (key fields) to associate the data. The resulting data structure
of the data in the app can be monitored in the data model viewer.
Changes to the data structure can be achieved by renaming fields to
obtain different associations between tables.

After the data has been loaded into Qlik Sense, it is stored in the app.
The app is the heart of the program's functionality and it is
characterized by the unrestricted manner in which data is associated,
its large number of possible dimensions, its speed of analysis and its
compact size. The app is held in RAM when it is open.

*Using the data load editor*

*Understanding script syntax and data structures*

*Guidelines for data and fields*

Analysis in Qlik Sense always happens while the app is not directly
connected to its data sources. So, to refresh the data, you need to run
the script to reload the
data.

## Interaction between <span class="ui_item" data-autonumposition="none">Data manager and the data load script

When you add data tables in the
<span class="ui_item" data-autonumposition="none">Data manager,
data load script code is generated. You can view the script code in the
Auto-generated section of the data load editor. You can also choose to unlock
and edit the generated script code, but if you do, the data tables will
no longer be managed in the
<span class="ui_item" data-autonumposition="none">Data manager.

By default, data tables defined in the load script are not managed in
<span class="ui_item" data-autonumposition="none">Data manager.
That is, you can see the tables in the data overview, but you cannot
delete or edit the tables in
<span class="ui_item" data-autonumposition="none">Data manager,
and association recommendations are not provided for tables loaded with
the script. If you synchronize your scripted tables with
<span class="ui_item" data-autonumposition="none">Data manager,
however, your scripted tables are added as managed scripted tables to
<span class="ui_item" data-autonumposition="none">Data manager.

<div class="warning" data-autonumposition="none">

If you have synchronized tables, you should not make changes in the data
load editor with Data manager open in another tab.



*Synchronizing scripted tables into Data manager*

You can add script sections and develop code that enhances and interacts
with the data model created in
<span class="ui_item" data-autonumposition="none">Data manager,
but there are some areas where you need to be careful. The script code
you write can interfere with the
<span class="ui_item" data-autonumposition="none">Data manager
data model, and create problems in some cases, for example:

  - Renaming or dropping tables added with
    Data     manager in the script.
  - Dropping fields from tables added with
    Data     manager.
  - Concatenation between tables added with
    Data     manager and tables loaded in the script.
  - Using the
    Qualify
    statement with fields in tables added with
    Data     manager.
  - Loading tables added with
    Data     manager using
    Resident
    in the script.
  - Adding script code after the generated code section. The resulting
    changes in the data model are not reflected in
    Data     manager.

*Edit the data load
script*

# Introduction to data loading in Qlik Sense

Qlik Sense uses a data load script, which is managed in the
data load editor, to connect to and retrieve data from various data
sources. In the script, the fields and tables to load are specified. It
is also possible to manipulate the data structure by using script
statements and expressions. It is also possible to load data into Qlik
Sense using the data manager, but when you want to create, edit and run
a data load script you use the data load editor.

During the data load, Qlik Sense identifies common fields from different
tables (key fields) to associate the data. The resulting data structure
of the data in the app can be monitored in the data model viewer.
Changes to the data structure can be achieved by renaming fields to
obtain different associations between tables.

After the data has been loaded into Qlik Sense, it is stored in the app.
The app is the heart of the program's functionality and it is
characterized by the unrestricted manner in which data is associated,
its large number of possible dimensions, its speed of analysis and its
compact size. The app is held in RAM when it is open.

Before we can start looking more closely at the script in the data load
editor, you need to create an empty app and a couple of data connections
to be able to load data into Qlik Sense. We will go through this in
detail in later sections.

The example files that you need for this tutorial
    are:

  -    - Customers.xlsx
  -    - Region.txt

# Loading data from a previously loaded table

There are two ways to load and transform data from a table that already
has been
    loaded.

  -  **Resident **LOAD** 
    - where you use the
     **Resident** 
    predicate in a subsequent
     **LOAD** 
    statement to load a new table.
  - Preceding load - where you load from the preceding
     **LOAD** 
    or
     **SELECT** 
    statement without specifying a
source.

<!-- end list -->

## Resident or preceding LOAD?

In most cases, the same result can be achieved by using either method. A
preceding
 **LOAD** 
is generally the faster option, but there are some cases where you need
to use a
 **Resident **LOAD** 
instead:

  - If you want to use the
     **Order_by** 
    clause to sort the records before processing the
     **LOAD** 
    statement.
  - If you want to use any of the following prefixes, in which cases
    preceding
     **LOAD** 
    is not
        supported:
      -        - **Join
      -  **Intervalmatch** 

## Resident LOAD

You can use the
 **Resident** 
predicate in a
 **LOAD** 
statement to load data from a previously loaded table. This is useful
when you want to perform calculations on data loaded with a
 **SELECT** 
statement where you do not have the option to use Qlik Sense functions,
such as date or numeric value handling.

 

In this example, the date interpretation is performed in the
 **Resident** 
load as it can't be done in the initial
Crosstable LOAD.

<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

PreBudget: Crosstable (Month, Amount, 1) LOAD Account, Jan, Feb, Mar, …
From Budget; Budget: Noconcatenate LOAD Account,
Month(Date\#(Month,’MMM’)) as Month, Amount Resident PreBudget; Drop
Table PreBudget;





A common case for using
 **Resident** 
is where you want to use a temporary table for calculations or
filtering. Once you have achieved the purpose of the temporary table, it
should be dropped using the
Drop table statement.



## Preceding load

The preceding load feature allows you to load a table in one pass, but
still define several successive transformations. Basically, it is a
 **LOAD** 
statement that loads from the
 **LOAD** 
or
 **SELECT** 
statement below, without specifying a source qualifier such as
 **From** 
or
 **Resident** 
as you would normally do. You can stack any number of
 **LOAD** 
statements this way. The statement at the bottom will be evaluated
first, then the statement above, and so on until the top statement has
been evaluated.

You can achieve the same result using
 **Resident** ,
but in most cases a preceding
 **LOAD** 
will be faster.

Another advantage of preceding load is that you can keep a calculation
in one place, and reuse it in
 **LOAD** 
statements placed above.



The following prefixes cannot be used in conjunction with preceding
, **Crosstable
and
 **Intervalmatch** .



Transforming data loaded by a
 **SELECT** 
statement

If you load data from a database using a
 **SELECT** 
statement, you cannot use Qlik Sense functions to interpret data in the
 **SELECT** 
statement. The solution is to add a
 **LOAD** 
statement, where you perform data transformation, above the
 **SELECT** 
statement.

In this example we interpret a date stored as a string using the Qlik
Sense function
 **Date\#** 
in a
 **LOAD** 
statement, using the previous
 **SELECT** 
statement as
source.



LOAD Date\#(OrderDate,’YYYYMMDD’) as
OrderDate;





SQL SELECT OrderDate FROM … ;



Simplifying your script by reusing calculations

In this example we use a calculation more than once in the
script:

<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

LOAD ..., Age( FromDate + IterNo() – 1, BirthDate ) as Age, Date(
FromDate + IterNo() – 1 ) as ReferenceDate Resident Policies While
IterNo() \<= ToDate - FromDate + 1 ;  

By introducing the calculation in a first pass, we can reuse it in the
Age function in a preceding
 **LOAD** :



LOAD ..., ReferenceDate, Age( ReferenceDate, BirthDate ) as Age; LOAD
\*, Date( FromDate + IterNo() – 1 ) as ReferenceDate Resident Policies
While IterNo() \<= ToDate - FromDate + 1 ;  

 

*Load*

*Drop
table*

# Logical tables

Each
 **LOAD** 
or
 **SELECT** 
statement generates a table. Normally, Qlik Sense treats the result of
each one of these as one logical table. However, there are a couple of
exceptions from this rule:

  - If two or more statements result in tables with identical field
    names, the tables are concatenated and treated as one logical table.
  - If a
     **LOAD** 
    or
     **SELECT** 
    statement is preceded by any of the following qualifiers, data is
    altered or treated differently.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 75%" />
</colgroup>
<tbody>
<tr class="odd">
<td>concatenate</td>
<td><p>This table is concatenated with (added to) another named table or with the last previously created logical table.</p>
<p><em>Concatenating tables</em></p>
<p><em>Concatenate</em></p></td>
</tr>
<tr class="even">
<td>crosstable</td>
<td><p>This table is unpivoted. That is, it is converted from crosstable format to column format.</p>
<p><em>Working with cross tables</em></p>
<p><em>Crosstable</em></p></td>
</tr>
<tr class="odd">
<td>generic</td>
<td><p>This table is split into several other logical tables.</p>
<p><em>Generic databases</em></p>
<p><em>Generic</em></p></td>
</tr>
<tr class="even">
<td>info</td>
<td><p>This table is not loaded as a logical table, but as an information table containing links to external information such as files, sounds, URLs, etc.</p>
<p> </p></td>
</tr>
<tr class="odd">
<td>intervalmatch</td>
<td><p>The table (which must contain exactly two columns) is interpreted as numeric intervals, which are associated with discrete numbers in a specified field.</p>
<p><em>Matching intervals to discrete data</em></p>
<p><em>IntervalMatch</em></p></td>
</tr>
<tr class="even">
<td>join</td>
<td><p>This table is joined by Qlik Sense with another named table or with the last previously created logical table, over the fields in common.</p>
<p><em>Combining tables with Join and Keep</em></p>
<p><em>Join</em></p></td>
</tr>
<tr class="odd">
<td>keep</td>
<td><p>This table is reduced to the fields in common with another named table or with the last previously created logical table.</p>
<p><em>Combining tables with Join and Keep</em></p>
<p><em>Keep</em></p></td>
</tr>
<tr class="even">
<td>mapping</td>
<td><p>This table (which must contain exactly two columns) is read as a mapping table, which is never associated with other tables.</p>
<p><em>Using mapping as an alternative to joining</em></p>
<p><em>Mapping</em></p></td>
</tr>
<tr class="odd">
<td>semantic</td>
<td><p>This table is not loaded as a logical table, but as a semantic table containing relationships that should not be joined, e.g. predecessor, successor and other references to other objects of the same type.</p>
<p><em>Semantic</em></p></td>
</tr>
</tbody>
</table>

When the data has been loaded, the logical tables are
associated.

# Matching intervals and iterative loading

The
 **Intervalmatch** 
prefix to a
 **LOAD** 
or
 **SELECT** 
statement is used to link discrete numeric values to one or more numeric
intervals. This is a very powerful feature which can be used, for
example, in production
environments.

##  Using the IntervalMatch prefix

The most basic interval match is when you have a list of numbers or
dates (events) in one table, and a list of intervals in a second table.
The goal is to link the two tables. In general , this is a many to many
relationship, that is, an interval can have many dates belonging to it
and a date can belong to many intervals. To solve this, you need to
create a bridge table between the two original tables. There are several
ways to do this.

By far the simplest way to solve this problem in Qlik Sense is to use
the
 **IntervalMatch** 
prefix in front of either a
 **LOAD** 
or a
 **SELECT** 
statement. The
 **LOAD/**SELECT** 
statement needs to contain two fields only, the “From” and the “To”
fields defining the intervals. The
 **IntervalMatch** 
prefix will then generate all combinations between the loaded intervals
and a previously loaded numeric field, specified as parameter to the
prefix.

Do the following:

1.  Create a new app and give it a name.
2.  Open the Data load     editor and create a new connection to the folder containing
    the tutorial sample files and give it the name
    Tutorial     Files.
3.  Load the Events table, then the Intervals table.  
    Use the
    Events.txt
    and
    Intervals.txt
    sample files provided with the tutorial.
4.  At the end of the script add an
    <span class="statement" data-conditions="Targets.NotToTranslate" style="font-weight: normal;" data-autonumposition="none">IntervalMatch
    to create a third table that bridges the two first tables using the
    following script:
5.  The complete script should look similar to this:

<!-- end list -->

1.  Click Load     data.

The data model contains a composite key (the IntervalBegin and
IntervalEnd fields) which will manifest itself as a Qlik Sense synthetic
key:

![](Resources/Images/ui_gen_Intervalmatch1.png)

The basic tables are:

  - The Events table that contains exactly one record per event.
  - The Intervals table that contains exactly one record per interval.
  - The bridge table that contains exactly one record per combination of
    event and interval, and that links the two previous tables.

Note that an event may belong to several intervals if the intervals are
overlapping. And an interval can of course have several events belonging
to it.

This data model is optimal, in the sense that it is normalized and
compact. The Events table and the Intervals table are both unchanged and
contain the original number of records. All Qlik Sense calculations
operating on these tables, for example,
<span class="statement" data-conditions="Targets.NotToTranslate" style="font-weight: normal;" data-autonumposition="none">Count(EventID),
will work and will be evaluated
correctly.

### Using a While loop and iterative loading IterNo()

You can achieve almost the same bridge table using a
 **While** 
loop and
 **IterNo()** 
that creates enumerable values between the lower and upper bounds of the
interval.

A loop inside the
 **LOAD** 
statement can be created using the
 **While** 
clause:



LOAD Date, IterNo() as Iteration From … While IterNo() \<= 4 ;  

 

Such a
 **LOAD** 
statement will loop over each input record and load this over and over
as long as the expression in the
 **While** 
clause is true. The
 **IterNo()** 
function returns “1” in the first iteration, “2” in the second, and so
on.

You have a primary key for the intervals, the IntervalID, so the only
difference in the script will be how the bridge table is
created:



BridgeTable:





LOAD distinct \* Where
Exists(EventDate);





LOAD IntervalBegin + IterNo() - 1 as EventDate,
IntervalID





Resident
Intervals





While IntervalBegin + IterNo() - 1 \<= IntervalEnd ;  



 



Do the following:

1.  Replace the existing
    <span class="statement" data-conditions="Targets.NotToTranslate" style="font-weight: normal;" data-autonumposition="none">Bridgetable
    statements with the above script.
2.  Click <span class="ui_item" data-autonumposition="none">Save
    in the toolbar.
3.  In the upper right corner, click
    <span class="ui_item" data-autonumposition="none">Load data.

<!-- end list -->

1.  Add the following script to the bottom of existing script:

<!-- end list -->

1.  Click <span class="ui_item" data-autonumposition="none">Save
    in the toolbar.
2.  In the upper right corner, click
    <span class="ui_item" data-autonumposition="none">Load data.

The data model now looks like
this:

![](Resources/Images/ui_gen_Intervalmatch3.png)

### Open and closed intervals

Whether an interval is open or closed is determined by the endpoints,
whether these are included in the interval or not.

  - If the endpoints are included, it is a closed interval:
  - If the endpoints are not included, it is an open interval:
  - If one endpoint is included, it is a half-open interval:

If you have a case where the intervals are overlapping and a number can
belong to more than one interval, you usually need to use closed
intervals.

However, in some cases you do not want overlapping intervals, you want a
number to belong to one interval only. Hence, you will get a problem if
one point is the end of one interval and, at the same time, the
beginning of next. A number with this value will be attributed to both
intervals. Hence, you want half-open intervals.

A practical solution to this problem is to subtract a very small amount
from the end value of all intervals, thus creating closed, but
non-overlapping intervals. If your numbers are dates, the simplest way
to do this is to use the function
 **DayEnd()** 
which returns the last millisecond of the
day:



Intervals:





LOAD…, DayEnd(IntervalEnd – 1) as IntervalEnd From Intervals ;



 

But you can also subtract a small amount manually. If you do, make sure
the subtracted amount isn’t too small since the operation will be
rounded to 52 significant binary digits (14 decimal digits).

If you use a too small amount, the difference will not be significant
and you will be back using the original
number.

### Creating a date interval from a single date

Sometimes time intervals are not stored explicitly with a beginning and
an end. Instead they are implied by only one field – the change
timestamp.

It could be as in the table below where you have currency rates for
multiple currencies. Each currency rate change is on its own row; each
with a new conversion rate. Also, the table contains rows with empty
dates corresponding to the initial conversion rate, before the first
change was made.

![](Resources/Images/ex_gen_Intervalmatch1.png)

This table defines a set of non-overlapping intervals, where the begin
data is called “Change Date” and the end date is defined by the
beginning of the following interval. But since the end date isn’t
explicitly stored in a column of its own, we need to create such a
column, so that the new table will become a list of intervals.

In this script example the table In_Rates is created by an inline load.
Make sure that the dates in the Change Date column are in the same
format as the local date
format.



In_Rates: LOAD \* Inline [ Currency,Change Date,Rate EUR,,8.59
EUR,28/01/2013,8.69 EUR,15/02/2013,8.45 USD,,6.50 USD,10/01/2013,6.56
USD,03/02/2013,6.30 ];



Do the following:

1.  Determine which time range you want to work with. The beginning of
    the range must be before the first date in the data and the end of
    the range must be after the
    last.
    
    
    
    Let vBeginTime =
    Num('1/1/2013');
    
    
    
    
    
    Let vEndTime =
    Num('1/3/2013');
    
    
    
    
    
    Let vEpsilon = Pow(2,-27);
    
    

<!-- end list -->

1.  Load the source data, but change empty dates to the beginning of the
    range defined in the previous bullet. The change date should be
    loaded as “From Date”.
    
    Sort the table first according to Currency, then according to the
    “From Date” descending so that you have the latest dates on
    top.
    
    
    
    Tmp_Rates:
    
    
    
    
    
    LOAD Currency,
    Rate,
    
    
    
    
    
    Date(If(IsNum([Change Date]), [Change Date], $(\#vBeginTime)))
    as
    FromDate
    
    
    
    
    
    Resident In_Rates;
    
    

2.  Run a second pass through data where you calculate the “To Date”. If
    the current record has a different currency from the previous
    record, then it is the first record of a new currency (but its last
    interval), so you should use the end of the range defined in step 1.
    If it is the same Currency, you should take the “From Date” from the
    previous record, subtract a small amount of time, and use this value
    as “To Date” in the current
    record.
    
    
    
    Rates:
    
    
    
    
    
    LOAD Currency, Rate,
    FromDate,
    
    
    
    
    
    Date(If(
    Currency=Peek(Currency),
    
    
    
    
    
    Peek(FromDate) -
    $(\#vEpsilon),
    
    
    
    
    
    $(\#vEndTime)
    
    
    
    
    
    )) as
    ToDate
    
    
    
    
    
    Resident
    Tmp_Rates
    
    
    
    
    
    Order By Currency, FromDate Desc;
    
    

3.  Drop the input table and the temporary
    table.
    
    
    
    Drop Table Tmp_Rates;
    
    

The script listed below will update the source table in the following
manner:

![](Resources/Images/ex_gen_Intervalmatch2.png)

When the script is run, you will have a table listing the intervals
correctly. Use the
<span class="ui_item" data-autonumposition="none">Preview section
of the data model viewer to view the resulting table.

![](Resources/Images/ex_gen_Intervalmatch3.png)

This table can subsequently be used in a comparison with an existing
date using the
 **Intervalmatch** 
methods.

 

The entire Qlik Sense script looks like
this:



Let vBeginTime =
Num('1/1/2013');





Let vEndTime =
Num('1/3/2013');





Let vEpsilon =
Pow(2,-27);





 





In_Rates: LOAD \* Inline [ Currency,Change Date,Rate EUR,,8.59
EUR,28/01/2013,8.69 EUR,15/02/2013,8.45 USD,,6.50 USD,10/01/2013,6.56
USD,03/02/2013,6.30
];





 





 





Tmp_Rates:





LOAD Currency,
Rate,





Date(If(IsNum([Change Date]), [Change Date], $(\#vBeginTime))) as
FromDate





Resident
In_Rates;





 





Rates:





LOAD Currency, Rate,
FromDate,





Date(If(
Currency=Peek(Currency),





Peek(FromDate) -
$(\#vEpsilon),





$(\#vEndTime)





)) as
ToDate





Resident
Tmp_Rates





Order By Currency, FromDate
Desc;





 





Drop Table
Tmp_Rates;



# NULL value handling

When no data can be produced for a certain field as a result of a
database query and/or a join between tables, the result is normally a
NULL value.

## Overview

The Qlik Sense logic treats the following as real NULL values:

  - NULL values returned from an ODBC connection

  - NULL values created as a result of a forced concatenation of tables
    in the data load script

  - NULL values created as a result of a join made in the data load
    script

  - NULL values created as a result of the generation of field value
    combinations to be displayed in a table



It is generally impossible to use these NULL values for associations and
selections, except when the
 **NullAsValue** 
statement is being employed.



*NullAsValue*

Text files per definition cannot contain NULL
values.

## Associating/selecting NULL values from ODBC

It is possible to associate and/or select NULL values from an ODBC data
source. For this purpose a script variable has been defined. The
following syntax can be used:

SET NULLDISPLAY=\<sym\>;

The symbol \<sym\> will substitute all NULL values from the ODBC data
source on the lowest level of data input. \<sym\> may be any string.

In order to reset this functionality to the default interpretation, use
the following syntax:

SET NULLDISPLAY=;



The use of
 **NULLDISPLAY** 
only affects data from an ODBC data source.



If you wish to have the Qlik Sense logic interpret NULL values returned
from an ODBC connection as an empty string, add the following to your
script before any
 **SELECT** 
statement:

SET NULLDISPLAY=";



Here '' is actually two single quotation marks without anything in
between.



*NullDisplay*

## Creating NULL values from text files

It is possible to define a symbol, which when it occurs in a text file
or an
 **inline** 
clause will be interpreted as a real NULL value. Use the following
statement:

SET NULLINTERPRET=\<sym\>;

The symbol \<sym\> is to be interpreted as NULL. \<sym\> may be any
string.

In order to reset this functionality to the default interpretation, use:

SET NULLINTERPRET=;



The use of
 **NULLINTERPRET** 
only affects data from text files and inline
clauses.



*NullInterpret*

## Propagation of NULL values in expressions

NULL values will propagate through an expression according to a few
logical and quite reasonable rules.

### Functions

The general rule is that functions return NULL when the parameters fall
outside the range for which the function is defined.

 

|            |         |      |
| ---------- | ------- | ---- |
| asin(2)    | returns | NULL |
| log(-5)    | returns | NULL |
| round(A,0) | returns | NULL |

As a result of the above follows that functions generally return NULL
when any of the parameters necessary for the evaluation are NULL.

 

|                   |         |      |
| ----------------- | ------- | ---- |
| sin(NULL)         | returns | NULL |
| chr(NULL)         | returns | NULL |
| if(NULL, A, B)    | returns | B    |
| if(True, NULL, A) | returns | NULL |
| if(True, A, NULL) | returns | A    |

The exception to the second rule are logical functions testing for type.

 

|              |         |           |
| ------------ | ------- | --------- |
| isnull(NULL) | returns | True (-1) |
| isnum(NULL)  | returns | False (0) |

### Arithmetic and string operators

If NULL is encountered on any side of these operators NULL is returned.

 

|      |    |      |         |      |
| ---- | -- | ---- | ------- | ---- |
| A    | \+ | NULL | returns | NULL |
| A    | \- | NULL | returns | NULL |
| A    | /  | NULL | returns | NULL |
| A    | \* | NULL | returns | NULL |
| NULL | /  | A    | returns | NULL |
| 0    | /  | NULL | returns | NULL |
| 0    | \* | NULL | returns | NULL |
| A    | &  | NULL | returns | A    |

### Relational operators

If NULL is encountered on any side of relational operators special rules
apply.

 

|      |                           |      |         |           |
| ---- | ------------------------- | ---- | ------- | --------- |
| NULL | (any relational operator) | NULL | returns | NULL      |
| A    | \<\>                      | NULL | returns | True (-1) |
| A    | \<                        | NULL | returns | False (0) | | A    | \<=                       | NULL | returns | False (0) | | A    | \=                        | NULL | returns | False (0) | | A    | \>=                       | NULL | returns | False (0) |
| A    | \>                        | NULL | returns | False (0) |

# Number interpretation

When you load data containing numbers, currency, or dates, it will be
interpreted differently depending on whether the data type is defined or
not. This section describes how data is interpreted in the two different
cases.

## Data with type information

Fields containing numbers with a defined data type in a database loaded
using ODBC will be handled by Qlik Sense according to their respective
formats. Their string representation will be the number with an
appropriate formatting applied.

Qlik Sense will remember the original number format of the field even if
the number format is changed for a measure under
Number formatting in the properties panel.

Properties panel

The default formats for the different data types are:

  - integer, floating point numbers: the default setting for number
  - currency: the default setting for currency
  - time, date, timestamp: ISO standard formatting

The default settings for number and currency are defined using the
script number interpretation variables or the operating system settings
(Control Panel).

*Number interpretation
variables*

## Data without type information

For data without specific formatting information from the source (for
example, data from text files or ODBC data with a general format) the
situation becomes more complicated. The final result will depend on at
least six different factors:

1.  The way data is written in the source database
2.  The operating system settings for number, time, date and so on.
    (Control     Panel)
3.  The use of optional number-interpreting variables in the script
4.  The use of optional interpretation functions in the script
5.  The use of optional formatting functions in the script
6.  The number formatting controls in the document

Qlik Sense tries to interpret input data as a number, date, time, and so
on. As long as the system default settings are used in the data, the
interpretation and the display formatting is done automatically by Qlik
Sense, and the user does not need to alter the script or any setting in
Qlik Sense.

By default, the following scheme is used until a complete match is
found. (The default format is the format such as the decimal separator,
the order between year, month and day, and so on, specified in the
operating system, that is, in the
Control Panel, or in some cases from the special number interpretation
variables in the script.

Qlik Sense will interpret the data as:

1.  A number in accordance with the default format for numbers.
2.  A date according to the default format for date.
3.  A timestamp according to the default format for time and date.
4.  A time according to the default format for time.
5.  A date according to the following format: yyyy-MM-dd.
6.  A time-stamp according to the following format: YYYY-MM-DD
    hh:mm[:ss[.fff]].
7.  A time according to the following format: hh:mm[:ss[.fff]].
8.  Money according to the default format for currency.
9.  A number with '.' as decimal separator and ',' as thousands
    separator, provided that neither the decimal separator nor the
    thousands separator are set to ','.
10. A number with ',' as decimal separator and '.' as thousands
    separator, provided that neither the decimal separator nor the
    thousands separator are set to ‘.'.
11. A text string. This last test never fails: if it is possible to read
    the data, it is always possible to interpret it as a string.

When loading numbers from text files, some interpretation problems may
occur, for example, an incorrect thousands separator or decimal
separator may cause Qlik Sense to interpret the number incorrectly. The
first thing to do is to check that the number-interpretation variables
in the script are correctly defined and that the system settings in the
Control Panel are correct.

When Qlik Sense has interpreted data as a date or time, it is possible
to change to another date or time format in the properties panel of the
visualization.

Since there is no predefined format for the data, different records may,
of course, contain differently formatted data in the same field. It is
possible for example, to find valid dates, integers, and text in one
field. The data will therefore, not be formatted, but shown in its
original
form.

# Only

The
 **Only** 
script keyword is used as an aggregation function, or as part of the
syntax in partial reload prefixes
 and Replace.

*Only - script
function*

*Add*

*Replace*

# QlikView functions and statements not supported in Qlik Sense

Most functions and statements that can be used in QlikView load scripts
and chart expressions are also supported in Qlik Sense, but there are
some exceptions, as described
here.

## Script statements not supported in Qlik Sense

This list describes QlikView script statements that are not supported in
Qlik
Sense.

| Statement                                                                                                   | Comments                                                                                                             |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
|  **Command | Use **SQL**  instead. |
| InputField                                                                                                  |                                                                                                                      |

## Functions not supported in Qlik Sense

This list describes QlikView script and chart functions that are not
supported in Qlik
Sense.

  - GetCurrentField
  - GetExtendedProperty
  - Input
  - InputAvg
  - InputSum
  - MsgBox
  - NoOfReports
  - ReportComment
  - ReportId
  - ReportName
  - ReportNumber

## Prefixes not supported in Qlik Sense

This list describes QlikView prefixes that are not supported in Qlik
Sense.

  - Bundle
  - Image_Size
  - Info

# QVD files

QVD files are one of the recognized types of files that can be used as
data connections.

## Working with QVD files

A QVD (QlikView Data) file is a file containing a table of data exported
from Qlik Sense or QlikView. QVD is a native Qlik format and can only be
written to and read by Qlik Sense or QlikView. The file format is
optimized for speed when reading data from a Qlik Sense script but it is
still very compact. Reading data from a QVD file is typically 10-100
times faster than reading from other data sources.

QVD files can be read in two modes: standard (fast) and optimized
(faster). The selected mode is determined automatically by the Qlik
Sense script engine. Optimized mode can be utilized only when all loaded
fields are read without any transformations (formulas acting upon the
fields), although renaming of fields is allowed. A
 **Where** 
clause causing Qlik Sense to unpack the records will also disable the
optimized load.

A QVD file holds exactly one data table and consists of three parts:

  - An XML header (in UTF-8 char set) describing the fields in the
    table, the layout of the subsequent information and some other
    metadata.
  - Symbol tables in a byte-stuffed format.
  - Actual table data in a bit-stuffed format.

QVD files can be used for many purposes. Four major uses can be easily
identified. More than one may apply in any given situation:

  - Increasing data load speed
  - Decreasing load on database servers
  - Consolidating data from multiple Qlik Sense applications.
  - Incremental load

## Creating QVD files

A QVD file can be created in two ways:

  - Explicit creation and naming using the
     **Store** 
    command in the Qlik Sense script.
  - Automatic creation and maintenance from script.

There is no difference between the resulting QVD files, with regard to
reading speed.

### Store

This script function creates a QVD or a CSV
file.

 



Store[ \*fieldlist from] table into filename [ format-spec ];



 

The statement will create an explicitly named QVD or CSV file. The
statement can only export fields from one data table. If fields from
several tables are to be exported, an explicit join must be made
previously in the script to create the data table that should be
exported.

The text values are exported to the CSV file in UTF-8 format. A
delimiter can be specified, see
 **LOAD** .
The store statement to a CSV file does not support BIFF
export.

 



Store mytable into xyz.qvd
(qvd);





Store \* from mytable into
xyz.qvd;





Store Name, RegNo from mytable into
xyz.qvd;





Store Name as a, RegNo as b from mytable into
xyz.qvd;





store mytable into myfile.txt
(txt);





store \* from mytable into 'lib://FolderConnection/myfile.qvd';



Do the following:

1.  In the app, Advanced     Scripting tutorial, open the
    Data load     editor.
2.  In the script section select the section
    Product.

<!-- end list -->

1.  Add a new line at the end of the script. For this tutorial we will
    take the last example above,modified for the
    Product
    script:

<!-- end list -->

1.  In the upper right corner, click
    <span class="ui_item" data-autonumposition="none">Load data.
2.  Click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">±
    on the Tutorial     files data connection to view the available files. The
    Product.qvd
    file should now be in the list of files.

This data file is the result of the
 **Crosstable** 
script and is a three-column table, one column for each category
(Product, Month, Sales). This data file could now be used to replace the
entire
Product script section.

### Buffer

QVD files can be created and maintained automatically via the
 **Buffer** 
prefix. This prefix can be used on most
 **LOAD** 
and SELECT statements in script. It indicates that QVD files are used to
cache/buffer the result of the
statement.

 



Buffer [ (option [ , option])] ( loadstatement | selectstatement
)





option::= incremental | stale [after] amount [(days | hours)]



 

If no option is used, the QVD buffer created by the first execution of
the script will be used
indefinitely.

 



Buffer select \* from
MyTable;



 

 **incremental** 

The
 **incremental** 
option enables the ability to read only part of an underlying file. The
previous size of the file is stored in the XML header in the QVD file.
This is particularly useful with log files. All records loaded at a
previous occasion are read from the QVD file whereas the following new
records are read from the original source and finally an updated QVD
file is
created.

 



Buffer (stale after 7 days) select \* from MyTable;



 

Note that the
 **incremental** 
option can only be used with
 **LOAD** 
statements and text files and that incremental load cannot be used where
old data is changed or
deleted\!

stale [after] amount [(days | hours)]

Amount is a number specifying the time period. Decimals may be used. The
unit is assumed to be days if omitted.

The
stale after option is typically used with database sources where there
is no simple timestamp on the original data. A
stale after clause simply states a time period from the creation time
of the QVD buffer after which it will no longer be considered valid.
Before that time the QVD buffer will be used as source for data and
after that the original data source will be used. The QVD buffer file
will then automatically be updated and a new period
starts.

 



Buffer (incremental) load \* from MyLog.log;



 

QVD buffers will normally be removed when no longer referenced anywhere
throughout a complete script execution in the app that created it or
when the app that created it no longer exists. The
 **Store** 
statement should be used if you wish to retain the contents of the
buffer as a QVD or
CSVfile.

## Reading data from QVD files

A QVD file can be read into or accessed by Qlik Sense by the following
methods:

  - Loading a QVD file as an explicit data source. QVD files can be
    referenced by a load statement in the Qlik Sense script just like
    any other type of text files (csv, fix, dif, biff, and so on).

<!-- end list -->

  - Automatic loading of buffered QVD files. When using the buffer
    prefix on load or select statements, no explicit statements for
    reading are necessary. Qlik Sense will determine the extent to which
    it will use data from the QVD file as opposed to acquiring data
    using the original
     **LOAD** 
    or SELECT statement.
  - Accessing QVD files from the script. A number of script functions
    (all beginning with QVD) can be used for retrieving various
    information on the data found in the XML header of a QVD file.

## Thank you\!

Now you have finished this tutorial, and hopefully you have gained some
more knowledge about scripting in Qlik Sense. Please visit our website
for more information on the further training
available.

# Renaming fields

Sometimes it is necessary to rename fields in order to obtain the
desired associations. The three main reasons for renaming fields are:

Two fields are named differently although they denote the same thing:

  - The field
    ID
    in the
    Customers
    table
  - The field
    CustomerID
    in the
    Orders
    table

The two fields denote a specific customer identification code and should
both be named the same, for example
CustomerID.

Two fields are named the same but actually denote different things:

  - The field
    Date
    in the
    Invoices
    table
  - The field
    Date
    in the
    Orders
    table

The two fields should preferably be renamed, to for example
InvoiceDate
and
OrderDate.

There may be errors such as misspellings in the database or different
conventions on upper- and lowercase letters.

Since fields can be renamed in the script, there is no need to change
the original data. There are two different ways to rename fields as
shown in the examples.

Using the
 **alias** 
statement

The
 **LOAD** 
or
 **SELECT** 
statement can be preceded by an
 **alias** 
statement.

Alias ID as CustomerID;

LOAD \* from Customer.csv;

Using the
 **as** 
specifier

The
 **LOAD** 
or
 **SELECT** 
statement can contain the
 **as** 
specifier.

LOAD ID as CustomerID, Name, Address, Zip, City, State from
Customer.csv;

 

*Alias*

*Fields*

# Replace

The
 **Replace** 
script keyword is used as a string function, or as a prefix in partial
reload.

*Replace - script and chart
function*

*Replace*

# Script expressions

Expressions can be used in both
 **LOAD** 
statements and
 **SELECT** 
statements. The syntax and functions described here apply to the
 **LOAD** 
statement, and not to the
 **SELECT** 
statement, since the latter is interpreted by the ODBC driver and not by
Qlik Sense. However, most ODBC drivers are often capable of interpreting
a number of the functions described below.

Expressions consist of functions, fields and operators, combined in a
syntax.

All expressions in a Qlik Sense script return a number and/or a string,
whichever is appropriate. Logical functions and operators return 0 for
False and -1 for True. Number to string conversions and vice versa are
implicit. Logical operators and functions interpret 0 as False and all
else as True.

The general syntax for an expression is:

|                          |                                 |   |
| ------------------------ | ------------------------------- | - |
| expression ::= (constant | constant                        | | |
|                          | fieldref                        | | |
|                          | operator1 expression            | | |
|                          | expression operator2 expression | | |
|                          | function                        | | |
|                          | ( expression )                  | ) |

where:

 **constant** 
is a string (a text, a date or a time) enclosed by single straight
quotation marks, or a number. Constants are written with no thousands
separator and with a decimal point as the decimal
separator.

 **fieldref** 
is a field name of the loaded
table.

 **operator1** 
is a unary operator (working on one expression, the one to the
right).

 **operator2** 
is a binary operator (working on two expressions, one on each side).

function ::= functionname( parameters)

parameters ::= expression { , expression }

The number and types of parameters are not arbitrary. They depend on the
function used.

Expressions and functions can thus be nested freely, and as long as the
expression returns an interpretable value, Qlik Sense will not give any
error messages.

 

*NULL value handling*

*Dollar-sign expansions*

*Using quotation marks in the
script*

# Script statements and keywords

The Qlik Sense script consists of a number of statements. A statement
can be either a regular script statement or a script control statement.
Certain statements can be preceded by prefixes.

Regular statements are typically used for manipulating data in one way
or another. These statements may be written over any number of lines in
the script and must always be terminated by a semicolon, ";".

Control statements are typically used for controlling the flow of the
script execution. Each clause of a control statement must be kept inside
one script line and may be terminated by a semicolon or the end-of-line.

Prefixes may be applied to applicable regular statements but never to
control statements. The
 **when** 
and
 **unless** 
prefixes can however be used as suffixes to a few specific control
statement clauses.

In the next subchapter, an alphabetical listing of all script
statements, control statements and prefixes, are found.

All script keywords can be typed with any combination of lower case and
upper case characters. Field and variable names used in the statements
are however case
sensitive.

# Script syntax

## Introduction to script syntax

In a script, the name of the data source, the names of the tables, and
the names of the fields included in the logic are defined. Furthermore,
the fields in the access rights definition are defined in the script. A
script consists of a number of statements that are executed
consecutively.

The Qlik Sense command line syntax and script syntax are described in a
notation called Backus-Naur Formalism, or BNF code.

*What is Backus-Naur formalism?*

<div class="SeeAlso" data-autonumposition="none">

The first lines of code are already generated when a new Qlik Sense file
is created. The default values of these number interpretation variables
are derived from the regional settings of the OS.

*Working with variables in the data load editor*

*Number interpretation variables*

The script consists of a number of script statements and keywords that
are executed consecutively. All script statements must end with a
semicolon,
";".

*Script statements and keywords*

You can use expressions and functions in the
 **LOAD** -statements
to transform the data that has been loaded.

*Script expressions*

For a table file with commas, tabs or semicolons as delimiters, a
 **LOAD** -statement
may be used. By default a
 **LOAD** -statement
will load all fields of the file.

General databases can be accessed through ODBC or OLE DBdatabase
connectors. . Here standard SQL statements are used. The SQL syntax
accepted differs between different ODBC drivers.

Additionally, you can access other data sources using custom connectors.

*Connect to data
sources*



# Step-by-step - Incrementing data loads using the Store command

This step-by-step example shows how to increment data loads using the
Store command
in Qlik Sense Cloud Business.

You can use
Store to
create a QVD file and attach that file to your app. This data can be,
for example, data records that are only available from a database for a
finite amount of time, such as a certain number days prior to the
current date. The historical data can be loaded from a QVD file that you
create in Qlik Sense Cloud Business, and combined with the latest
available data from a source database. The latest data can then be
inserted back into the QVD file. This example demonstrates this use
case.

You can also use
Store to
store data from a connection that you only want store once, and then add
new data from a database. This can reduce subsequent data load times, as
well as reduce the load on database servers, your network, and so on.
This example does not consider this use case.



The maximum attached data file size in Qlik Sense Cloud is 200 MB.
Maximum app size, including the attached data file, is 250 MB. You can
build your script to limit the growth of the attached file size for
incremental data loads, as shown using the Floor function in this
example.



In this example, we create a connection using the Standard Search
Twitter API and search for a specific text term. The search matches
against tweets for the past 7 days, the limit imposed by Twitter. In
this example, then, the Standard Search Twitter API is limiting the
amount of data that is loaded from the Twitter database.

Using Store,
we then store the Twitter data table into a QVD file and attach that
file to our app. We then make requests for the newest data from Twitter,
and load the data into our app along with the data from the QVD file.
That data is loaded back into QVD file, thereby incrementing the QVD
file.

We then publish the app, and then use the refresh published data
functionality Qlik Sense Cloud Business to reload our published app with
the latest data.

## More information

For more information about the tasks and concepts in this example, see:

  - *Store*
  - *Floor*
  - *Working with QVD files*
  - *Loading new and updated records with incremental load*
  - [Twitter Search Tweets
    overview](https://developer.twitter.com/en/docs/tweets/search/overview)
  - [Twitter Standard Search API
    reference](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)

## Prerequisites

  - Qlik Sense Cloud Business subscription.
  - Twitter account to use the Twitter API.
  - You should know how to create an app in Qlik Sense Cloud. See:
    *Creating an app*.
  - You should know how to use the data load editor. See: *Data load
    editor*.

## Tasks

The following tasks are required to complete this example:

1.  *Create an app and connect to Twitter*
2.  *Select data from Twitter*
3.  *Add script statements to create and increment QVD file from Twitter
    data*
4.  *Run script*
5.  *Set the data reload
schedule*

### Create an app and connect to Twitter

Do the following:

1.  Create an app in your Qlik Sense Cloud Business workspace.

2.  Open the script editor. The option to open the script editor is
    shown when you create a new app. You can also access the script
    editor from the data load editor.

3.  Under Data     connections in the right menu, click
    Create new     connection. The
    Create new     connection window opens.

4.  Select Twitter from the
    Data     sources drop-down list. An authentication window opens.

5.  Click
    <span class="ui_item" data-autonumposition="none">Authenticate.
    A Twitter API authentication windows opens. You may need to enable
    pop-ups in your browser.

6.  To authorize Qlik web connectors to use your Twitter account, enter
    your Twitter credentials.

7.  Click Sign     in. A Twitter window opens, displaying an access code. Copy
    the code.

8.  In the Qlik Sense Cloud authentication window, paste the code, and
    then click
    <span class="ui_item" data-autonumposition="none">Authenticate.
    The connection is authenticated.

9.  Name the connection, and then click
    <span class="ui_item" data-autonumposition="none">Create. The
    connection is created, and the data load editor opens in Qlik Sense
    Cloud. The connection is added to your
    Data     connections list in the right
menu.

### Select data from Twitter

After you have created your connection, you can select the data that you
want to load from Twitter.

Do the following:

1.  Add a new tab to your script in the script editor.

2.  Name the tab. We called our tab New Data (Twitter). Place your
    cursor in the script editor window.

3.  In the data load editor, click
    <span class="ui_item" data-autonumposition="none">Select data
    for your Twitter connection.
    
     
    
    ![](Resources/Images/ui_IncrementalSelectData.png)
    
    The Select data to     load window opens.

4.  Select the table called Search, and then select a term to search.
    For our example, we are using "BigData".
    
    ![](Resources/Images/ui_IncrementalSearch.png)

5.  Click Preview     data. The data fields for the Search table are shown.

6.  Select the fields that you want to load. For our example, we select
    the following fields: id, created_at, text, source, and user_name.
    
    ![](Resources/Images/ui_IncrementalSelect.png)

7.  Click Insert     script. The script segment is added to the
    New Data     (Twitter) tab in the script editor in the data load editor.

8.  Name the table by adding a line above the Load statement. In our
    example, we call it TwitterSearch
    
     
    
    Your tab should look similar to the following screenshot (not
    including the comments):
    
     
    
    ![](Resources/Images/ui_IncrementalNewData.png)

9.  To verify that your data load is working, click
    <span class="ui_item" data-autonumposition="none">Load data
    in the top menu. If you want, you can view data in the tables and
    fields in the data model viewer. You also create a table in your app
    to view the
data.

### Add script statements to create and increment QVD file from Twitter data

After you have set up your app to load data from Twitter, you can store
that data in a QVD file. As the Twitter Standard API only allows you to
pull data from the previous 7 days, our QVD will initially contain that
data after the data is loaded.

Do the following:

1.  Add a new tab to your script in the script editor.

2.  Name the tab. We called our tab Historical Data (QVD).

3.  Add the following script statements in the tab. The comments (//)
    are for reference. These will not be executed when you run the
    script.
    
     
    
    
    
    If you are copying and pasting from Firefox, you may need to first
    paste into another document, such as Word, for the line breaks to
    appear properly in the script editor.
    
    
    
     
    
    <div class="code" data-autonumposition="none">
    
    //Method to test QVD file size. If the file does not exist returns
    \<null\> let size = FileSize('lib://AttachedFiles/AllTweets.qvd');
    //Set the historical data pull range to a variable LET vRollingDate
    = Today()-90; //If the file exists and contains some data then the
    if statement is executed; //if the file does not exist, i.e. is
    null, then the if statement will be skipped if not isnull(size) then
    TwitterSearch: LOAD \* FROM
    ['lib://AttachedFiles/AllTweets.qvd'](qvd) //Twitter ids are
    unique; ensures only new tweets added WHERE NOT EXISTS (Search.id)
    //Load last 90 days of data from the qvd file; //QVD file provides
    historical data beyond Twitter Standard API limit of 7 days. //Also
    ensures that stored incremented qvd file does not grow too large in
    size. AND FLOOR (Date([Search.created_at]))\>=$(vRollingDate);
    end if
    
    
    
     
    
    Your tab should look similar to the following screenshot:
    
     
    
    ![](Resources/Images/ui_IncrementalLoadQVD.png)

4.  Add another new tab to your script.

5.  Name the tab. We called our tab Store to QVD.

6.  Add the following script statements in the tab.
    
     
    
    
    
    //Regardless of the QVD file existing previously or not, updated
    data gets stored into the QVD. STORE TwitterSearch INTO
    ['lib://StaticContent/AllTweets.qvd'](qvd);
    
    
    
     
    
    Your tab should look similar to the following screenshot:
    
     
    
    ![](Resources/Images/UI_IncrementalStore.png)

### Run script

When you run the script for the first time, the data is loaded from
Twitter, and the QVD file named AllTweets.qvd is created from the
Twitter data. The QVD file is attached to your app. When you run the
script again the data is loaded from Twitter and the QVD file. The
QVD file is then updated with the data that you loaded from the QVD
file, Twitter data.

1.  Click Load     data. The first time that you run the script is run the data
    is loaded from Twitter, and the AllTweets QVD file is created using
    the data. The QVD file is attached to your app, and can be viewed
    under Attached     Files in the right menu.
    
     
    
    The first time that you run the script, you should see a message
    similar to the following:
    
     
    
    ![](Resources/Images/ui_IncrementalMessage1.png)
    
     
    
    The second and subsequent times that you load data, you should see a
    message similar to the following:
    
     
    
    ![](Resources/Images/ui_IncrementalMessage2.png)

2.  Create charts and tables in your app using your
data.

### Set the data reload schedule

After you have loaded your data, you can show that data in your app. One
way to reload the data, as we have seen, is to open the script editor
and click Load data. However, you can also reload data in Qlik Sense Cloud
Business from the UI.

Do the following:

  - Right-click the app in your group workspace, and then select
    Refresh     data to reload the data immediately. You can also choose to
    reload the data on a schedule.

For more information about reloading data in Qlik Sense Cloud Business,
see *Refreshing data in group apps*.

# Synthetic keys

When two or more data tables have two or more fields in common, this
suggests a composite key relationship. Qlik Sense handles this by
creating synthetic keys automatically. These keys are anonymous fields
that represent all occurring combinations of the composite key.

If you receive a warning about synthetic keys when loading data, it is
recommended that you review the data structure in the data model viewer.
You should ask yourself whether the data model is correct or not.
Sometimes it is, but often enough the synthetic key is there due to an
error in the script.

Multiple synthetic keys are often a symptom of an incorrect data model,
but not necessarily. However, a sure sign of an incorrect data model is
if you have synthetic keys based on other synthetic keys.

<div class="warning" data-autonumposition="none">

When the number of synthetic keys increases, depending on data amounts,
table structure and other factors, Qlik Sense may or may not handle them
gracefully, and may end up using excessive amount of time and/or memory.
In such a case you need to re-work your script by removing all synthetic
keys.



![](Resources/Images/ex_gen_SyntheticKeys_dmv.png)

## Handling synthetic keys

If you need to avoid synthetic keys, there are a number of ways for
solving this in the data load script:

  - Check that only fields that logically link two tables are used as
    keys.
    
      - Fields like “Comment”, “Remark” and “Description” may exist in
        several tables without being related, and should therefore not
        be used as keys.
      - Fields like “Date”, “Company” and “Name” may exist in several
        tables and have identical values, but still have different roles
        (Order Date/Shipping Date, Customer Company/Supplier Company).
        In such cases they should not be used as keys.

  - Make sure that redundant fields aren’t used – that only the
    necessary fields connect. If for example a date is used as a key,
    make sure not to load year, month or day_of_month of the same date
    from more than one internal table.

  - If necessary, form your own non-composite keys, typically using
    string concatenation inside an AutoNumber script
function.

# System fields

In addition to the fields extracted from the data source, system fields
are also produced by Qlik Sense. These all begin with "$" and can be
displayed like ordinary fields in a visualization, such as a filter pane
or a table. System fields are created automatically when you load data,
and are primarily used as an aid in app design.

## Available system fields

The following system fields are
available:

| Field                                                                                                                         | Description                                        | Can be manipulated in the script |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------- |
|    | Contains all tables that are loaded.               | No                               | | <span data-conditions="Targets.NotToTranslate" data-autonumposition="none">$Field                                      | Contains all fields in the tables that are loaded. | No                               |
|  | Contains the number of fields in each table.       | No                               | | <span data-conditions="Targets.NotToTranslate" data-autonumposition="none">$FieldNo                                    | Contains the position of the fields in the tables. | No                               |
| <span data-conditions="Targets.NotToTranslate" data-autonumposition="none">$Rows     | Contains the number of rows in the tables          | No                               |

## Using system fields in a visualization

System field data is associated. For example, if you add two filter
panes, one with
<span data-conditions="Targets.NotToTranslate" data-autonumposition="none">$Table
and one with
<span data-conditions="Targets.NotToTranslate" data-autonumposition="none">$Field,
if you select a table, the
<span data-conditions="Targets.NotToTranslate" data-autonumposition="none">$Field
filter pane will show the fields in the selected table as possible
values.

System fields are not included in field lists in the assets panel or in
the Expression editor. If you want to use a system field, you need to
reference it by typing it manually.

In a dimension in the assets panel

<span class="user_input" data-autonumposition="none">=$Field

In the expression
editor

<span class="Code" data-autonumposition="none">$Field

# Table labels

A table can be labeled for later reference, for example by a
 **LOAD** 
statement with a
 **resident** 
clause or with expressions containing the
 **peek** 
function. The label, which can be an arbitrary string of numbers or
characters, should precede the first
 **LOAD** 
or
 **SELECT** 
statement that creates the table. The label must be followed by a colon
":".

Labels containing blanks must be quoted using single or double quotation
marks or square brackets.

 

Table1:

LOAD a,b from c.csv;

LOAD x,y from d.csv where x=peek('a',y,'Table1');

Table label containing a blank

[All Transactions]:

SELECT \* from Transtable;

LOAD Month, sum(Sales) resident [All Transactions] group by
Month;

 

*Load*

*Select*

# Table names

Qlik Sense tables are named when they are stored in the Qlik Sense
database. The table names can be used, for example, for
 **LOAD** 
statements with a
 **resident** 
clause or with expressions containing the
 **peek** 
function, and can be seen in the
$Table
system field in the layout.

Tables are named in accordance with the following rules:

1.  If a label immediately precedes a
     **LOAD** 
    or
     **SELECT** 
    statement the label is used as table name. The label must be
    followed by a colon.
    
     
    
    Table1:
    
    LOAD a,b from c.csv;
    
    *Table labels*

2.  If no label is given, the file name or table name immediately
    following the keyword
     **FROM** 
    in the
     **LOAD** 
    or
     **SELECT** 
    statement is used. A maximum of 32 characters is used. The extension
    is skipped if the file name is used.

3.  Tables loaded inline are named INLINExx, where xx is a number. The
    first inline table will be given the name
    INLINE01.

4.  Automatically generated tables are named AUTOGENERATExx, where xx is
    a number. The first autogenerated table is given the name
    AUTOGENERATE01.

5.  If a table name generated according to the rules above should be in
    conflict with a previous table name, the name is extended with -x ,
    where x is a number. The number is increased until no conflict
    remains. For example, three tables could be named
    ,     <span class="user_input" data-autonumposition="none">Budget-1
    and
    <span class="user_input" data-autonumposition="none">Budget-2.

There are three separate domains for table names:
section access,
section application and mapping tables. Table names generated in
section access and
section application are treated separately. If a table name referenced is
not found within the section, Qlik Sense searches the other section as
well. Mapping tables are treated separately and have no connection
whatsoever to the other two domains of table names.

# Transforming data

This section introduces you to basic transformation and manipulation of
data that you can perform through the
data load editor before using the data in your app.

One of the advantages to data manipulation is that you can choose to
load only a subset of the data from a file, such as a few chosen columns
from a table, to make the data handling more efficient. You can also
load the data more than once to split up the raw data into several new
logical tables. It is also possible to load data from more than one
source and merge it into one table in Qlik Sense.

In this section you will learn how to load data using
 **Resident** 
or preceding
 **LOAD** .
You will also learn how to handle table concatenation, circular
references, and synthetic keys.

## Preceding LOAD

If you load data from a database using a
 **SELECT** 
statement, you cannot use Qlik Sense functions to interpret data in the
 **SELECT** 
statement. The solution is to add a
 **LOAD** 
statement, where you perform data transformation, above the
 **SELECT** 
statement.

Basically, it is a
 **LOAD** 
statement that loads from the
 **LOAD** 
or
 **SELECT** 
statement below, without specifying a source qualifier such as
 **From** 
or
 **Resident** 
that you would normally do. You can stack any number of
 **LOAD** 
statements this way. The statement at the bottom will be evaluated
first, then the statement above that, and so on until the top statement
has been evaluated.

When we loaded data from the database earlier, we selected
Include LOAD statement. That was a preceding
 **LOAD** .
Let us take a look in the
data load editor to see what it looks like.

Do the following:

1.  Open the Data load     editor.
2.  Open the script section named
    <span class="path" data-autonumposition="none">Sales. There
    you will see the following:

LIB CONNECT TO 'Scripting tutorial ODBC';

LOAD BackOrder,

Cost,

"Customer Number",

Date\#(\`Date\`,'MM/DD/YYYY') as "Date",

GrossSales,

"Invoice Date" as "Bill Date",

"Invoice Number",

"Item Desc",

"Item Number",

Margin,

"Open Qty",

OpenOrder,

"Order Number",

"Promised Delivery Date",

Sales,

"Sales Qty",

"Sales Rep Number",

SalesKey;

SQL SELECT BackOrder,

Cost,

"Customer Number",

"Date",

GrossSales,

"Invoice Date",

"Invoice Number",

"Item Desc",

"Item Number",

Margin,

"Open Qty",

OpenOrder,

"Order Number",

"Promised Delivery Date",

Sales,

"Sales Qty",

"Sales Rep Number",

SalesKey

FROM "...\\Tutorials source\\Sales.accdb"."Sales data";

 

In the script above, you can verify how the field
Invoice Date was renamed to
Bill Date in the
 **LOAD** 
statement, using
 **as** .

You can also do transformations like these using
 **Resident** ,
but in most cases a preceding
 **LOAD** 
will be faster. In the next section you will learn when
 **Resident** 
is a better choice.

## Resident LOAD

You can use the
 **Resident** 
source qualifier in a
 **LOAD** 
statement to load data from a previously loaded table. This is useful
when you want to perform calculations on data loaded with a
 **SELECT** 
statement where you do not have the option to use Qlik Sense functions,
such as date or numeric value handling.

There are some cases where you need to use a
 **Resident** 
load instead:

  - If you want to use the
    Order     by clause to sort the records before processing the
     **LOAD** 
    statement.
  - If you want to use any of the following prefixes, in which cases,
    preceding
     **LOAD** 
    is not
        supported:
      -        - **Join
      -  **Intervalmatch** 

 

This example is not related to the data we are loading in this tutorial.
It is only used to show an example of what a
 **Resident** 
load can look like. In the example script below, the date interpretation
is performed in the
 **Resident** 
load as it cannot be done in the initial
 **Crosstable** 
load.

PreBudget:

Crosstable (Month, Amount, 1)

LOAD Account,

Jan,

Feb,

Mar,

…

From Budget;

Budget:

Noconcatenate

LOAD

Account,

Month(Date\#(Month,’MMM’)) as “Month”,

Amount

Resident PreBudget;

Drop Table PreBudget;

# Transforming data

This section introduces you to the transformation and manipulation of
data that you can perform through the
data load editor before using the data in your app.

One of the advantages to data manipulation is that you can choose to
load only a subset of the data from a file, such as a few chosen columns
from a table, to make the data handling more efficient. You can also
load the data more than once to split up the raw data into several new
logical tables. It is also possible to load data from more than one
source and merge it into one table in Qlik Sense.

In this section you will learn how to load data using
 **Crosstable** .
You will also learn how to join tables, use inter-record functions such
as Peek and Previous, and load the same row several times using While
Load.

# Using the Crosstable prefix

Cross tables are a common type of table featuring a matrix of values
between two orthogonal lists of header data. Whenever you have a cross
table of data, the Crosstable prefix can be used to transform the data
and create the desired fields.

## Crosstable prefix

In the input table below you have one column per month and one row per
product.

<div data-autonumposition="none">

![](Resources/Images/ex_gen_Crosstable1.png)



If this table is simply loaded into Qlik Sense the result is a table
with one field for Product and one field for each of the months. But if
you want to analyze this data, it is much easier to have all numbers in
one field and all months in another,that is,in a three-column table, one
for each category
(, <span class="path" data-autonumposition="none">Month,
<span class="path" data-autonumposition="none">Sales).

The Crosstable prefix converts the data to a table with one column for
Month and another for Sales. Another way to express it is to say that it
takes field names and converts these to field values.

Example:

<span class="Code" data-autonumposition="none">Crosstable (Month, Sales)
LOAD Product, [Jan 2014], [Feb 2014], [Mar 2014], … From …
;

Do the following:

1.  In the app, Advanced     Scripting tutorial, open the
    Data load     editor.

2.  Click Create new     connection and select
    <span class="ui_item" data-autonumposition="none">All files.

3.  Locate the folder where the tutorial file
    <span class="path" data-autonumposition="none">Product.xlsx
    is stored, and give it the name
    Tutorial     Files.

4.  Click <span class="ui_item" data-autonumposition="none">Save.

5.  Add a new script section by clicking on
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">P
    in the upper left corner.

6.  Give the section the name
    Product
    and press Enter.

7.  Click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">±
    on the Tutorial     Files data connection you created earlier to select a file to
    load data from.

8.  Select
    Product.xlsx
    and click
    <span class="ui_item" data-autonumposition="none">Select.

9.  Select
    Product.

10. Click Insert     script.

11. In the upper right corner, click
    <span class="ui_item" data-autonumposition="none">Load data.

12. When the script execution is finished, click
    <span class="ui_item" data-autonumposition="none">Close.

13. To view the table, select
    Data model     viewer, click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">s
    to expand the table and verify your data.

14. Click <span class="ui_item" data-autonumposition="none">Save.

15. Select Data load     editor and open the
    Product
    script.

16. Add a new row at the top of the script and add the following to that
    row:

17. In the upper right corner, click
    <span class="ui_item" data-autonumposition="none">Load data.

18. When the script execution is finished, click
    <span class="ui_item" data-autonumposition="none">Close.

19. Click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">”
    and select Data     model viewer to verify that your data is loaded.

The loaded table is a three-column table, one column for each category
(Product, Month, Sales):

![](Resources/Images/ui_gen_ProductFinal.png)

Usually the input data has only one column as a qualifier field; as an
internal key (Product in the above example). But you can have several.
If so, all qualifying fields must be listed before the attribute fields
in the
 **LOAD** 
statement, and the third parameter to the
 **Crosstable** 
prefix must be used to define the number of qualifying fields.

It is not possible to have a preceding
 **LOAD** 
or a prefix in front of the
 **Crosstable** 
keyword. Auto-concatenate can, however, be used.

The numeric interpretation will not work for the attribute fields. This
means that if you have months as column headers, these will not be
automatically interpreted. The work-around is to use the crosstable
prefix to create a temporary table, and to run a second pass through it
to make the interpretations as in the following example:

tmpData:

Crosstable (MonthText, Sales)

LOAD Product, [Jan 2014], [Feb 2014], … From 'lib://Tutorial
Files/Product.xlsx'



(ooxml, embedded labels, table is Product);



 

Final:

LOAD Product,

Date(Date\#(MonthText,'MMM YYYY'),'MMM YYYY') as Month,

Sales

Resident tmpData;

Drop Table tmpData;

 

## Clearing the memory cache

We need sometimes to delete tables we have created during the script to
clear the memory cache. When you load into a temporary table as in the
previous section then you should drop it when it is not needed anymore.

The following examples show the various options available with
Drop Table:



DROP TABLE Name1[, Name2 [,Name3
…]];





DROP TABLES Name1[, Name2 [,Name3 …]];



 

The command
 **Drop** 
also lets you delete one or several
fields:



DROP FIELD Name1[, Name2 [, Name3 …]]
;





DROP FIELDS Name1[, Name2 [, Name3 …]] ;



 

As you may notice, the keyword FIELD or TABLE can set in plural (FIELDS,
TABLES) even if you have to delete one single table or
field.

# Using inter-record functions

These functions are used when a value from previously loaded records of
data is needed for the evaluation of the current record.

In this part of the tutorial we will be examining the
, Previous and
Exists
functions. More detailed information on these functions can be found on
the Qlik Sense help
site.

## Peek

 **Peek()** 
finds the value of a field in a table for a row that has already been
loaded or that exists in internal memory. The row number can be
specified, as can the table.

 

Peek(fieldname [ , row [ , tablename ] ] )

 

Row must be an integer. 0 denotes the first record, 1 the second and so
on. Negative numbers indicate order from the end of the table. -1
denotes the last record read.

If no row is stated, -1 is assumed.

Tablename is a table label, see Table Labels, without the ending colon.
tablename is
a table label without the ending colon. If no
tablename is
stated, the current table is assumed. If used outside the
LOAD
statement or referring to another table, the
tablename
must be
included.

## Previous

 **Previous()** 
finds the value of the
 **expr** 
expression using data from the previous input record that has not been
discarded because of a
 **where** 
clause. In the first record of an internal table, the function will
return NULL.

 

Previous(expression)

 

The Previous
function may be nested in order to access records further back. Data are
fetched directly from the input source, making it possible to refer also
to fields which have not been loaded into Qlik Sense, that is, even if
they have not been stored in the associated
database.

## Exists

 **Exists()** 
determines whether a specific field value has already been loaded into
the field in the data load script. The function returns TRUE or FALSE,
so can be used in the
 **where** 
clause of a
 **LOAD**  statement
or an
 **IF** 
statement.

 

Exists(field [ , expression ] )

 

The field must exist in the data loaded so far by the script.
Expression is
an expression evaluating to the field value to look for in the specified
field. If omitted, the current record’s value in the specified field
will be
assumed.

## Using Peek() and Previous()

In their simplest form,
 and Previous()
are used to identify specific values within a table. The following
example is based on the simple table
Employees.

![](Resources/Images/ex_gen_InterRecord1.png)

Currently this only collects data for month, hires and terminations, so
we are going to add fields for Employee Count and Employee Var, using
the  and Previous
functions, to see the monthly difference in total employees.

Do the following:

1.  In the app, Advanced     Scripting tutorial, open the
    Data load     editor.
2.  Add a new script section by clicking on
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">P
    in the upper left corner.
3.  Give the section the name
    Employees
    and press Enter.
4.  Click
    <span class="icon-font" data-conditions="Targets.NotToTranslate" data-autonumposition="none">±
    on the Tutorial     files data connection to select a file to load data from.
5.  Select
    Employees.xlsx
    and click
    <span class="ui_item" data-autonumposition="none">Select.
6.  Click Insert     script.

<!-- end list -->

1.  Modify the script so that it now looks like this:

<!-- end list -->

1.  Click <span class="ui_item" data-autonumposition="none">Save.

<!-- end list -->

1.  Add the following below the script you have just modified

<!-- end list -->

1.  In the upper right corner, click
    <span class="ui_item" data-autonumposition="none">Load data.

If, in a new sheet in the app overview, you now create a standard table
using Date, Hired, Terminated, Employee Count and Employee Var as the
columns of the table, you should get a result similar to this:

![](Resources/Images/ui_gen_InterRecord1.png)

 and Previous()
allow users to target defined rows within a table. The biggest
difference between the two functions is that the
Peek()
function allows the user to look into a field that was not previously
loaded into the script whereas the
Previous()
function can only look into a previously loaded field.
Previous()
operates on the Input to the
LOAD
statement, whereas
Peek()
operates on the output of the
LOAD
statement. (Same as the difference between RecNo() and RowNo().) This
means that the two functions will behave differently if you have a
Where-clause.

So the
Previous()
function would be better suited for when a user needs to show the
current value versus the previous value. In the example we calculated
the employee variance from month to month.

The Peek()
function would be better suited when the user is targeting either a
field that has not been previously loaded into the table or if the user
needs to target a specific row. This was shown in the example where we
calculated the Employee Count by peeking into the previous month’s
Employee Count and adding the difference between the hired and
terminated employees for the current month. Remember that Employee Count
was not a field in the original file.

## Using Exists()

The Exists()
function is often used with the
Where clause
in the script in order to load data if related data has already been
loaded in the data model.

In the following example we are also using the
Dual()
function to assign numeric values to strings.

Do the following:

1.  Create a new app and give it a name.
2.  Open the Data load     editor and enter the following script:

<!-- end list -->

1.  Click Load     data.

<!-- end list -->

1.  In the App     overview, create a new sheet and give it a name.
2.  Open the new sheet and click
    <span class="ui_item" data-autonumposition="none">Edit.
3.  Add a standard table to the sheet with the dimension AgeBucket and
    name the visualization
    Age     Groups.

<!-- end list -->

1.  Add a bar chart to the sheet with the dimension AgeBucket, and the
    measure Count([AgeBucket]) and name the visualization
    Number of     people in each age group.
2.  Adjust the properties of the table and bar chart to your preference
    and click
    <span class="ui_item" data-autonumposition="none">Done.

You should now have a sheet similar to this:

![](Resources/Images/ui_gen_InterRecord.png)

The Dual()
function is very useful in the script, or in a chart expression, when
there is the need to assign a numeric value to a
string.



LOAD





PersonID,





Age,





If(IsNull(Age) or Age='', Dual('No age',
5),





If(Age\<25, Dual('Under 25', 1),  



If(Age \>=25 and Age \<35, Dual('25-34', 2),  



If(Age\>=35 and Age\<50, Dual('35-49' , 3),  



If(Age\>=50, Dual('50 or over',
4)





))))) as
AgeBucket





Resident
AgeTemp





Where Exists(PersonID);



 

In the script you have an application that loads ages, and you have
decided to put those ages in buckets so that you can create
visualizations based on the age buckets versus the actual ages. There is
a bucket for people under 25, between 25 and 35, and so on. By using the
Dual()
function, the age buckets can be assigned a numeric value that can later
be used to sort the age buckets in a list box or in a chart. So, as in
the app sheet, the sort puts "No age" at the end of the
list.

# Using mapping as an alternative to joining

The
 **Join** 
prefix in Qlik Sense is a powerful way of combining several data tables
in the data model. One disadvantage is that the combined tables can
become large and create performance problems. An alternative to
 **Join** 
in situations where you need to look up a single value from another
table is to use mapping instead. This can save you from loading
unnecessary data that slows down calculations and potentially can create
calculation errors, as joins can change the number of records in the
tables.

A mapping table consists of two columns: a comparison field (input) and
a mapping value field (output).

In this example we have a table of orders (Orders), and need to know the
countries of the customers, which are stored in the customer table
(Customers).

<div class="caption" data-autonumposition="none">

Orders data table



|         |            |           |         |            |
| ------- | ---------- | --------- | ------- | ---------- |
| OrderID | OrderDate  | ShipperID | Freight | CustomerID |
| 12987   | 2007-12-01 | 1         | 27      | 3          |
| 12988   | 2007-12-01 | 1         | 65      | 4          |
| 12989   | 2007-12-02 | 2         | 32      | 2          |
| 12990   | 2007-12-03 | 1         | 76      | 3          |

<div class="caption" data-autonumposition="none">

Customers data table



|            |              |         |     |
| ---------- | ------------ | ------- | --- |
| CustomerID | Name         | Country | ... |
| 1          | DataSales    | Spain   | ... |
| 2          | BusinessCorp | Italy   | ... |
| 3          | TechCo       | Germany | ... |
| 4          | Mobecho      | France  | ... |

In order to look up the country (Country) of a customer, we need a
mapping table that looks like this:

|            |         |
| ---------- | ------- |
| CustomerID | Country |
| 1          | Spain   |
| 2          | Italy   |
| 3          | Germany |
| 4          | France  |

The mapping table, which we name MapCustomerIDtoCountry, is defined in
the script as
follows:



MapCustomerIDtoCountry: Mapping LOAD CustomerID, Country From Customers
;



The next step is to apply the mapping, by using the
 **ApplyMap** 
function when loading the order
table:



Orders: LOAD \*, ApplyMap('MapCustomerIDtoCountry', CustomerID, null())
as Country From Orders ;



The third parameter of the
 **ApplyMap** 
function is used to define what to return when avalue is not found in
the mapping table, in this case
 **Null()** .

The resulting table will look like this:

|         |            |           |         |            |         |
| ------- | ---------- | --------- | ------- | ---------- | ------- |
| OrderID | OrderDate  | ShipperID | Freight | CustomerID | Country |
| 12987   | 2007-12-01 | 1         | 27      | 3          | Germany |
| 12988   | 2007-12-01 | 1         | 65      | 4          | France  |
| 12989   | 2007-12-02 | 2         | 32      | 2          | Italy   |
| 12990   | 2007-12-03 | 1         | 76      | 3          | Germany |

 

*ApplyMap - script
function*

*Mapping*

# Using quotation marks in the script

You can use quotation marks in script statements in a number of
different ways.

## Inside LOAD statements

In a
 **LOAD** 
statement the following symbols should be used as quotation
marks:

|                 |                        |        |            |            |
| --------------- | ---------------------- | ------ | ---------- | ---------- |
|                 | Description            | Symbol | Code point | Example    |
| Field names     | double quotation marks | " "    | 34         | "string"   |
|                 | square brackets        | [ ]  | 91, 93     | [string] |
|                 | grave accents          | \` \`  | 96         | \`string\` |
| String literals | single quotation marks | ' '    | 39         | 'string'   |

## In SELECT statements

For a
 **SELECT** 
statement interpreted by an ODBC driver, usage may vary. Usually, you
should use the straight double quotation marks (Alt + 0034) for field
and table names, and the straight single quotation marks (Alt + 0039)
for literals, and avoid using grave accents. However, some ODBC drivers
not only accept grave accents as quotation marks, but also prefer them.
In such a case, the generated
 **SELECT** 
statements contain grave accent quotation
marks.

### Microsoft Access quotation marks example

Microsoft Access ODBC Driver 3.4 (included in Microsoft Access 7.0)
accepts the following quotation marks when analyzing the
 **SELECT** 
statement:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>Field names and table names:</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>[ ]</p></td>
<td>&quot; &quot;</td>
<td>` `</td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td><p>String literals:</p></td>
<td><p>' '</p></td>
</tr>
</tbody>
</table>

Other databases may have different conventions.

## Outside LOAD statements

Outside a
 **LOAD** 
statement, in places where Qlik Sense expects an expression, double
quotation marks denote a variable reference and not a field reference.
If you use double quotation marks, the enclosed string will be
interpreted as a variable and the value of the variable will be
used.

## Out-of-context field references and table references

Some script functions refer to fields that have already been created, or
are in the output of a
 **LOAD** 
statement, for
example Exists() and
 **Peek()** .
These field references are called out-of-context field references, as
opposed to source field references that refer to fields that are in
context, that is, in the input table of the
 **LOAD** 
statement.

Out-of-context field references and table references should be regarded
as literals and therefore need single quotation
marks.

## Difference between names and literals

The difference between names and literals becomes clearer comparing the
following examples:

 

'Sweden' as Country

When this expression is used as a part of the field list in a
 **LOAD** 
or
 **SELECT** 
statement, the text string
"Sweden"
will be loaded as field value into the Qlik Sense field
"Country".

 

"land" as Country

When this expression is used as a part of the field list in a
 **LOAD** 
or
 **SELECT** 
statement, the content of the database field or table column named
"land"
will be loaded as field values into the Qlik Sense field
"Country".
This means. that
land
will be treated as a field
reference.

## Difference between numbers and string literals

The difference between numbers and string literals becomes clearer
comparing the following examples.

 

<span data-autonumposition="none">'12/31/96'

When this string is used as a part of an expression, it will in a first
step be interpreted as the text string "12/31/96", which in turn may be
interpreted as a date if the date format is ‘MM/DD/YY’. In that case it
will be stored as a dual value with both a numeric and a textual
representation.

 

<span data-autonumposition="none">12/31/96

When this string is used as a part of an expression, it will be
interpreted numerically as 12 divided by 31 divided by
96.

## Using quotation marks in a string

When a string contains characters that can be used as quotation marks,
it is important to clearly indicate where a string begins and where it
ends when quoting the string. If the string is not properly quoted, the
script will fail or it will load data incorrectly.

There are two methods for quoting a string that contains quotation
marks.

### Use a specific quotation mark to quote the string

Choose a quotation mark that is not used inside the string, and use it
to quote the entire string. Qlik Sense will use that specific quotation
mark to determine where the string begins and ends.

Any of the following quotation marks can be used to quote the entire
string:

  - Double quotation marks " "
  - Square brackets [ ]
  - Grave accents \` \`
  - Single quotation marks ' '

 

[Table '1 "2"]

Square brackets are used to quote the string. The string loads as :
<span class="user_input" data-autonumposition="none">Table '1 "2"

'string \`Name1\` "Name2'

Single quotation marks are used to quote the string. The string loads
as: string
\`Name1\` "Name2

### Use escape characters

Escape characters are an additional instance of the quotation mark that
is used to quote the string. They must be added beside every instance of
the quotation mark that appears within the string. When all quotation
marks are used inside a string, you need to add escape characters beside
the same type of quotation mark used to quote the string. Escape
characters can also be used if you want to use a quotation mark that is
already in use in a string.

Only the following marks can be used as escape characters:

  - Double quotation marks " "
  - Square brackets [ ]
  - Single quotation marks ' '

 

"Michael said ""It's a beautiful day""."

If you quote the string using the double quotation marks " ", then you
must add an extra double quotation mark beside every double quotation
mark used inside the string.

This string is loaded as
Michael said "It's a beautiful day". By using the escape character
<span class="Code" data-autonumposition="none">"", the Qlik Sense
Data load editor understands which double quotation marks are part of
the string and which quotation mark indicates the end of the string. The
single quotation mark ' used in the abbreviation
<span class="user_input" data-autonumposition="none">It's does
not need to be escaped because it is not the mark used to quote the
string.

 

'Michael said: "It''s a beautiful day".'

If you quote this string using single quotation marks, then you must add
an extra single quotation mark beside each single quotation mark used
inside the string.

This string is loaded as
Michael said "It's a beautiful day". The double quotation mark " used for quoting
what Michael said does not need to be escaped because it is not the mark
used to quote the string.

 

[Michael said [It's a "beautiful day]].]

Square brackets [ ] behave differently from the other two quotation
marks. If you want to use brackets as an escape character, you must add
an extra bracket beside the right square bracket ] only, and not beside
the left square bracket [.

This string is loaded as
Michael said [It's a "beautiful day]. Only the right square bracket ] is escaped.
The single quotation mark ' and the double quotation mark " used in the
string do not need to be escaped as they are not used to quote the
string.

 

*Load*

*Select*

*Script statements and
keywords*

# Working with QVD files

A QVD (QlikView Data) file is a file containing a table of data exported
from Qlik Sense. QVD is a native Qlik format and can only be written to
and read by Qlik Sense or QlikView. The file format is optimized for
speed when reading data from a script but it is still very compact.
Reading data from a QVD file is typically 10-100 times faster than
reading from other data
sources.





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



QVD files can be read in two modes: standard (fast) and optimized
(faster). The selected mode is determined automatically by the script
engine. Optimized mode can only be employed when all loaded fields are
read without any transformations (formulas acting upon the fields),
although the renaming of fields is allowed. A
 **where** 
clause causing Qlik Sense to unpack the records will also disable the
optimized load.

## Purpose of QVD files

QVD files can be used for many purposes. At least four major uses can be
easily identified. More than one may apply in any given situation.

<table>
<tbody>
<tr class="odd">
<td>Increasing load speed</td>
<td><p>By buffering non-changing or slowly-changing blocks of input data in QVD files, script execution becomes considerably faster for large data sets.</p></td>
</tr>
<tr class="even">
<td>Decreasing load on database servers</td>
<td><p>The amount of data fetched from external data sources can also be greatly reduced. This reduces the workload on external databases and network traffic. Furthermore, when several scripts share the same data, it is only necessary to load it once from the source database into a QVD file. Other apps can make use of the same data through this QVD file.</p></td>
</tr>
<tr class="odd">
<td>Consolidating data from multiple apps</td>
<td>With the  **binary**  script statement, data can be loaded from a single app into another app, but with QVD files a script can combine data from any number of apps. This makes it possible for apps to consolidate similar data from different business units, for example.</td>
</tr>
<tr class="even">
<td>Incremental load</td>
<td><p>In many common cases, the QVD functionality can be used for incremental load by loading only new records from a growing database.</p>
<p><em>Using QVD files for incremental load</em></p></td>
</tr>
</tbody>
</table>

## Creating QVD files

A QVD file can be created in two ways:

1.  Explicit creation and naming using the
    store
    command in the script. State in the script that a previously-read
    table, or part thereof, is to be exported to an explicitly-named
    file at a location of your choice.
    
    See: *Store*

2.  Automatic creation and maintenance from script. When you precede a
     or     **SELECT
    statement with the
    buffer
    prefix, Qlik Sense will automatically create a QVD file, which,
    under certain conditions, can be used instead of the original data
    source when reloading data.
    
    See: *Buffer*

There is no difference between the resulting QVD files with regard to
reading speed.

A QVD file can be created by explicitly creating and naming the file
using the
Store command
in the script.

For more information about the
Store command
in Qlik Sense Cloud see
*Store*.

## Reading data from QVD files

A QVD file can be read or accessed by the following methods:

1.  Loading a QVD file as an explicit data source. QVD files can be
    referenced by a
     **LOAD** 
    statement in the script, just like any other type of text files
    (csv, fix, dif, biff etc).
2.  Automatic loading of buffered QVD files. When you use the
    buffer
    prefix on
     **LOAD** 
    or
     **SELECT** 
    statements, no explicit statements for reading are necessary. Qlik
    Sense will determine the extent to which it will use data from the
    QVD file as opposed to acquiring data using the original
     **LOAD** 
    or
     **SELECT** 
    statement.
3.  Accessing QVD files from the script. A number of script functions
    (all beginning with
     **qvd** )
    can be used for retrieving various information on the data found in
    the XML header of a QVD file.

A QVD file can be read or accessed by loading the QVD file as an
explicit data source in Qlik Sense Cloud Business. QVD files can be
referenced by a
 **LOAD** 
statement in the script.

 

LOAD \* from [lib://AttachedFiles/xyz.qvd](qvd);

LOAD Name, RegNo from [lib://AttachedFiles/xyz.qvd](qvd);

LOAD Name as a, RegNo as b from [lib://AttachedFiles/xyz.qvd](qvd);

## QVD format

A QVD file holds exactly one data table and consists of three parts:

1.  Header.
    
    
    
    If the QVD file was generated with QlikView the header is a
    well-formed XML header (in UTF-8 char set) describing the fields in
    the table, the layout of the subsequent information and other
    metadata.
    
    

2.  Symbol tables in a byte-stuffed format.

3.  Actual table data in a bit-stuffed
format.

# Working with variables in the data load editor

A variable in Qlik Sense is a container storing a static value or a
calculation, for example a numeric or alphanumeric value. When you use
the variable in the app, any change made to the variable is applied
everywhere the variable is used. You can define variables in the
variables overview, or in the script using the data load editor. You set
the value of a variable using
 **Let** 
or
 **Set** 
statements in the data load script.



You can also work with the Qlik Sense variables from the variables
overview when editing a sheet. *Working with variables in the variables
dialog (page 1)*.



## Overview

If the first character of a variable value is an equals sign ' = ' Qlik
Sense will try to evaluate the value as a formula (Qlik Sense
expression) and then display or return the result rather than the actual
formula text.

When used, the variable is substituted by its value. Variables can be
used in the script for dollar sign expansion and in various control
statements. This is very useful if the same string is repeated many
times in the script, for example, a path.

Some special system variables will be set by Qlik Sense at the start of
the script execution regardless of their previous values.

## Defining a variable

When defining a variable, the
syntax:

 **set variablename** 
=
string

or

 variable = expression

is used. The
 **Set** 
command assigns the text to the right of the equal sign to the variable,
whereas the
 **Let** 
command evaluates the expression.

Variables are case sensitive.



It is not recommended to name a variable identically to a field or a
function in Qlik
Sense.



 

set HidePrefix = $ ; // the variable will get the character ‘$’ as
value.

let vToday = Num(Today()); // returns the date serial number of
today.

## Deleting a variable

If you remove a variable from the script and reload the data, the
variable stays in the app. If you want to fully remove the variable from
the app, you must also delete the variable from the variables overview.

*Deleting a
variable*

## Loading a variable value as a field value

If you want to load a variable value as a field value in a
LOAD statement and the result of the dollar expansion is text rather
than numeric or an expression then you need to enclose the expanded
variable in single quotes.

 

This example loads the system variable containing the list of script
errors to a table. You can note that the expansion of ScriptErrorCount
in the If
clause does not require quotes, while the expansion of ScriptErrorList
requires
quotes.



IF $(ScriptErrorCount) \>= 1
THEN





LOAD '$(ScriptErrorList)' AS Error AutoGenerate 1; END IF



## Variable calculation

There are several ways to use variables with calculated values in Qlik
Sense, and the result depends on how you define it and how you call it
in an expression.

In this example we load some inline
data:



LOAD \* INLINE [ Dim, Sales A, 150 A, 200 B, 240 B, 230 C, 410 C, 330
];



Let's define two
variables:



Let vSales = 'Sum(Sales)'
;





Let vSales2 = '=Sum(Sales)' ;



In the second variable, we add an equal sign before the expression. This
will cause the variable to be calculated before it is expanded and the
expression is evaluated.

If you use the vSales variable as it is, for example in a measure, the
result will be the string Sum(Sales), that is, no calculation is
performed.

If you add a dollar-sign expansion and call $(vSales) in the expression,
the variable is expanded, and the sum of Sales is displayed.

Finally, if you call $(vSales2), the variable will be calculated before
it is expanded. This means that the result displayed is the total sum of
Sales. The difference between using =$(vSales) and =$(vSales2) as
measure expressions is seen in this chart showing the results:

|     |           |            |
| --- | --------- | ---------- |
| Dim | $(vSales) | $(vSales2) |
| A   | 350       | 1560       |
| B   | 470       | 1560       |
| C   | 740       | 1560       |

As you can see, $(vSales) results in the partial sum for a dimension
value, while $(vSales2) results in the total sum.

The following script variables are
available:

|                                     |                                   |
| ----------------------------------- | --------------------------------- |
| **Error variables**                 | *Error variables*                 |
| **Number interpretation variables** | *Number interpretation variables* |
| **System variables**                | *System variables*                |
| **Value handling variables**        | *Value handling variables*        |

 

*Dollar-sign expansions*

*Working with variables in the variables dialog (page
1)*

# Working directory

If you are referencing a file in a script statement and the path is
omitted, Qlik Sense searches for the file in the following order:

1.  The directory specified by a
     **Directory** 
    statement (only supported in legacy scripting mode).
    
    *Directory*

2.  If there is no
     **Directory** 
    statement, Qlik Sense searches in the working directory.

*File system access
restriction*

## Qlik Sense Desktop working directory

In Qlik Sense Desktop, the working directory is
C:\\Users\\{user}\\Documents\\Qlik\\Sense\\Apps.

## Qlik Sense working directory

In a Qlik Sense server installation, the working directory is specified
in Qlik Sense Repository Service, by default it is
C:\\ProgramData\\Qlik\\Sense\\Apps.
See the Qlik Management Console help for more information.
