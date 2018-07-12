

## InterRecordFunctions

# Exists

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

 

Exists(field_name
[,
expr])

Boolean

 

| Argument    | Description                                                                                                                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field_name | A name or a string expression evaluating to a field name to be searched for. The field must exist in the data loaded so far by the script.                                                                                                                                  |
| expr        | An expression evaluating to the field value to look for in the field specified in  **field-name** . If omitted, the current record’s value in the specified field is assumed. |

Examples and
results:

Example

Result

Exists (Employee)

Returns -1 (True) if the value of the field
 **Employee** 
in the current record already exists in any previously read record
containing that
field.

Exists(Employee, 'Bill')

Returns -1 (True) if the field value
 **'Bill'** 
is found in the current content of the field
 **Employee** .

The statements
Exists (Employee, Employee) and
Exists (Employee) are equivalent.

Employees:

LOAD \* inline [

Employee|ID|Salary

Bill|001|20000

John|002|30000

Steve|003|35000

] (delimiter is '|');

 

Citizens:

Load \* inline [

Name|Address

Bill|New York

Mary|London

Steve|Chicago

Lucy|Paris

John|Miami

] (delimiter is '|');

 

EmployeeAddresses:

Load Name as Employee, Address Resident Citizens where Exists (Employee,
Name);

 

Drop Tables Employees, Citizens;

<table>
<tbody>
<tr class="odd">
<td><p>This results in a table called EmployeeAddresses in the data model, which can be viewed as a table visualization using the dimensions Employee and Address.</p>
<p>The where clause: where Exists (Employee, Name), means only the names from the tableCitizens that are also in Employees are loaded into the new table. The Drop statement removes the temporary tables Employees and Citizens to avoid confusion.</p></td>
</tr>
<tr class="even">
<td><table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Employee</td>
<td>Address</td>
</tr>
<tr class="even">
<td>Bill</td>
<td>New York</td>
</tr>
<tr class="odd">
<td>John</td>
<td>Miami</td>
</tr>
<tr class="even">
<td>Steve</td>
<td>Chicago</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Replacing the statement in the sample data in the previous example that
builds the table EmployeeAddresses with the following, using
where not Exists.

NonEmployee:

Load Name as Employee, Address Resident Citizens where not Exists
(Employee, Name);

The where clause includes not:
where not Exists (Employee, Name), means only the names from the table
Citizens that are not in Employees are loaded into the new table.

|          |         |
| -------- | ------- |
| Employee | Address |
| Mary     | London  |
| Lucy     | Paris   |

Data used in example:

Employees:

LOAD \* inline [

Employee|ID|Salary

Bill|001|20000

John|002|30000

Steve|003|35000

] (delimiter is '|');

 

Citizens:

Load \* inline [

Name|Address

Bill|New York

Mary|London

Steve|Chicago

Lucy|Paris

John|Miami

] (delimiter is '|');

 

EmployeeAddresses:

Load Name as Employee, Address Resident Citizens where Exists (Employee,
Name);

 

Drop Tables Employees,
Citizens;

# LookUp

 **Lookup()** 
looks into a table that is already loaded and returns the value of
 **field_name** 
corresponding to the first occurrence of the value
 **match_field_value** 
in the field
 **match_field_name** .
The table can be the current table or another table previously
loaded.

 

lookup(field_name,
match_field_name, match_field_value [,
table_name])

dual

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>field_name</td>
<td>Name of the field for which the return value is required.Input value must be given as a string (for example, quoted literals).</td>
</tr>
<tr class="even">
<td>match_field_name</td>
<td>Name of the field to look up  **match_field_value**  in. Input value must be given as a string (for example, quoted literals).</td>
</tr>
<tr class="odd">
<td>match_field_value</td>
<td>Value to look up in  **match_field_name**  field.</td>
</tr>
<tr class="even">
<td>table_name</td>
<td><p>Name of the table in which to look up the value. Input value must be given as a string (for example quoted literals).</p>
<p>If table_name is omitted the current table is assumed.</p></td>
</tr>
</tbody>
</table>



Arguments without quotes refer to the current table. To refer to other
tables, enclose an argument in single quotes.



 

The order in which the search is made is the load order, unless the
table is the result of complex operations such as joins, in which case,
the order is not well defined. Both
 **field_name** 
and
 **match_field_name** 
must be fields in the same table, specified by
 **table_name** .

If no match is found, NULL is returned.

Examples and results:

<table style="width:40%;">
<colgroup>
<col style="width: 40%" />
<col style="width: 0%" />
</colgroup>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>The sample data uses the  <p>Lookup('Category', 'ProductID', ProductID, 'ProductList')</p>
<p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>ProductList:</p>
<p>Load * Inline [</p>
<p>ProductID|Product|Category|Price</p>
<p>1|AA|1|1</p>
<p>2|BB|1|3</p>
<p>3|CC|2|8</p>
<p>4|DD|3|2</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>OrderData:</p>
<p>Load *, Lookup('Category', 'ProductID', ProductID, 'ProductList') as CategoryID</p>
<p>Inline [</p>
<p>InvoiceID|CustomerID|ProductID|Units</p>
<p>1|Astrida|1|8</p>
<p>1|Astrida|2|6</p>
<p>2|Betacab|3|10</p>
<p>3|Divadip|3|5</p>
<p>4|Divadip|4|10</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Drop Table ProductList</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The  <p>The ** Lookup() function is used to build the **OrderData table. It specifies the third argument as **ProductID. This is the field for which the value is to be looked up in the second argument **'ProductID'**  in the **ProductList, as denoted by the enclosing single quotes.</p>
<p>The function returns the value for ' <p>The  **drop statement deletes the **ProductList**  table from the data model, because it is not required, which leaves the **OrderData table with the following result:</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>ProductID</td>
<td>InvoiceID</td>
<td>CustomerID</td>
<td>Units</td>
<td>CategoryID</td>
</tr>
<tr class="even">
<td>1</td>
<td>1</td>
<td>Astrida</td>
<td>8</td>
<td>1</td>
</tr>
<tr class="odd">
<td>2</td>
<td>1</td>
<td>Astrida</td>
<td>6</td>
<td>1</td>
</tr>
<tr class="even">
<td>3</td>
<td>2</td>
<td>Betacab</td>
<td>10</td>
<td>2</td>
</tr>
<tr class="odd">
<td>3</td>
<td>3</td>
<td>Divadip</td>
<td>5</td>
<td>2</td>
</tr>
<tr class="even">
<td>4</td>
<td>4</td>
<td>Divadip</td>
<td>10</td>
<td>3</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>



The Lookup() function is flexible and can access any previously loaded
table. However, it is slow compared with the Applymap() function.



 

*ApplyMap - script
function*

# Peek

 **Peek()** 
finds the value of a field in a table for a row that has already been
loaded or that exists in internal memory. The row number can be
specified, as can the
table.

 

Peek(field_name[,
row_no[, table_name ]
])

dual

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>field_name</td>
<td>Name of the field for which the return value is required.Input value must be given as a string (for example, quoted literals).</td>
</tr>
<tr class="even">
<td>row_no</td>
<td><p>The row in the table that specifies the field required. Can be an expression, but must resolve to an integer. 0 denotes the first record, 1 the second, and so on. Negative numbers indicate order from the end of the table. -1 denotes the last record read.</p>
<p>If no row is stated, -1 is assumed.</p></td>
</tr>
<tr class="odd">
<td>table_name</td>
<td>A table label without the ending colon. If no table_name is stated, the current table is assumed. If used outside the LOAD statement or referring to another table, the table_name must be included.</td>
</tr>
</tbody>
</table>

 

In the first record of an internal table, the function returns NULL.

Examples and results:

Example

Result

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

EmployeeDates:

Load \* Inline [

EmployeeCode|StartDate|EndDate

101|02/11/2010|23/06/2012

102|01/11/2011|30/11/2013

103|02/01/2012|

104|02/01/2012|31/03/2012

105|01/04/2012|31/01/2013

106|02/11/2013|

] (delimiter is '|');

 

FirstEmployee:

Load EmployeeCode, Peek(EmployeeCode,0) As EmpCode

Resident EmployeeDates;

 

<table>
<tbody>
<tr class="odd">
<td><p>EmpCode = 101, because <p>Substituting the value of the argument row_no returns the values of other rows in the table, as follows:</p>
<p> <p>However, note that without specifying the table as the third argument table_no, the function references the current (in this case, internal) table. The result of  Peek(EmployeeCode,-2) is multiple values:</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td><p>EmployeeCode<br />
101<br />
102<br />
103<br />
104<br />
105<br />
106</p></td>
<td>EmpCode<br />
-<br />
-<br />
101<br />
102<br />
103<br />
104</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

FirstEmployee:

Load EmployeeCode, Peek(EmployeeCode,-2,'EmployeeDates') As EmpCode

Resident EmployeeDates;

By specifying the argument
 **table_no** 
as
'EmployeeDates',
the function returns the second-to-last value of EmployeeCode in the
table EmployeeDates: 105.

The
 **Peek()** 
function can be used to reference data that is not yet loaded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

T1:

LOAD \* inline [

ID|Value

1|3

1|4

1|6

3|7

3|8

2|1

2|11

5|2

5|78

5|13

] (delimiter is '|');

T2:

LOAD

\*,

IF(ID=Peek(ID), Peek(List)&','\&Value,Value) AS List

RESIDENT T1

ORDER BY ID ASC;

DROP TABLE T1;

Create a table in a sheet in your app with
, **List,
and Value as
the dimensions.

ID

List

Value

1

6

6

1

6,3

3

1

6,3,4

4

2

11

11

2

11,10

10

2

11,10,1

1

3

8

8

3

8,7

7

5

13

13

5

13,2

2

5

13,2,78

78

The
 **IF()** 
statement is built from the temporary table
T1.  
Peek(ID)
references the field ID in the previous row in the current table
T2.  
Peek(List)
references the field List in the previous row in the table T2, currently
being built as the expression is evaluated.

The statement is evaluated as follows:  
If the current value of ID is the same as the previous value of ID, then
write the value of Peek(List) concatenated with the current value of
Value. Otherwise, write the current value of Value only.

If Peek(List) already contains a concatenated result, the new result of
Peek(List) will be concatenated to it.

<div class="note" colspan="3" data-autonumposition="none">

Note the Order by clause. This specifies how the table is ordered (by ID in
ascending order). Without this, the Peek() function will use whatever
arbitrary ordering the internal table has, which can lead to
unpredictable results.



LOAD A, B, numsum( B, Peek( 'Bsum' ) ) as Bsum...;  

Creates an accumulation of B in Bsum.

 

*Table labels*

*Previous - script
function*

# Previous

 **Previous()** 
finds the value of the
 **expr** 
expression using data from the previous input record that has not been
discarded because of a
 **where** 
clause. In the first record of an internal table, the function will
return
NULL.

 

Previous(expr)

dual

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>expr</td>
<td>The expression or field containing the data to be measured.
<p>The expression can contain nested  **previous()**  functions in order to access records further back. Data are fetched directly from the input source, making it possible to refer also to fields that have not been loaded into Qlik Sense, that is,even if they have not been stored in its associative database.</p></td>
</tr>
</tbody>
</table>

 

In the first record of an internal table, the function returns NULL.

Examples and results:

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table style="width:40%;">
<colgroup>
<col style="width: 40%" />
<col style="width: 0%" />
</colgroup>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Sales2013:</p>
<p>Load *, (Sales - Previous(Sales) )as Increase Inline [</p>
<p>Month|Sales</p>
<p>1|12</p>
<p>2|13</p>
<p>3|15</p>
<p>4|17</p>
<p>5|21</p>
<p>6|21</p>
<p>7|22</p>
<p>8|23</p>
<p>9|32</p>
<p>10|35</p>
<p>11|40</p>
<p>12|41</p>
<p>] (delimiter is '|');</p>
<p> </p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>By using the  **Previous() function in the **Load**  statement, we can compare the current value of Sales with the preceding value, and use it in a third field, Increase.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td><p>Month<br />
1<br />
2<br />
3<br />
4<br />
5<br />
6<br />
7<br />
8<br />
9<br />
10<br />
11<br />
12</p></td>
<td>Sales<br />
12<br />
13<br />
15<br />
17<br />
21<br />
21<br />
22<br />
23<br />
32<br />
35<br />
40<br />
41<br />
</td>
<td>Increase<br />
-<br />
1<br />
2<br />
2<br />
4<br />
0<br />
1<br />
1<br />
9<br />
3<br />
5<br />
1</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

 

LOAD \*, Sales / Previous(Sales) as Increase from ...;

LOAD A, Previous(Previous( A )) as B from ...;