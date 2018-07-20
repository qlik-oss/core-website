# InterRecordFunctions

Inter-record functions are used when a value from previously loaded
records of data is needed for the evaluation of the current record.

## Exists

 **Exists()** determines whether a specific field value has already been
 loaded into the field in the data load script. The function returns TRUE
 or FALSE, so can be used in the **where** clause of a **LOAD**  statement
or an **IF** statement.

Exists(field_name[,expr])

**Return data type:** Boolean

| Argument    | Description  |
| ----------- | ------------ |
| field_name  | A name or a string expression evaluating to a field name to be searched for. The field must exist in the data loaded so far by the script. |
| expr        | An expression evaluating to the field value to look for in the field specified in  **field-name** . If omitted, the current record’s value in the specified field is assumed. |

<table>
<thead>
<tr class="header">
<th>Example</th><th>Result</th>
</thead>
<tbody>
<tr><td>Exists (Employee)</td>
    <td> Returns -1 (True) if the value of the field Employee in the current record already exists in any previously
    read record containing that field.
    </td>
</tr>
<tr>
    <td>Exists(Employee, 'Bill')</td>
    <td>Returns -1 (True) if the field value 'Bill' is found in the current content of the field Employee.
    The statements `Exists (Employee, Employee)` and `Exists (Employee)` are equivalent.
    </td>
</tr>
<tr>
    <td><code>
        <p>Employees:<br>
        LOAD * inline [<br>
        Employee|ID|Salary<br>
        Bill|001|20000<br>
        John|002|30000<br>
        Steve|003|35000<br>
        ] (delimiter is '|');<br>
        <br>
        Citizens:<br>
        Load * inline [<br>
        Name|Address<br>
        Bill|New York<br>
        Mary|London<br>
        Steve|Chicago<br>
        Lucy|Paris<br>
        John|Miami<br>
        ] (delimiter is '|');<br>
        EmployeeAddresses:<br>
        <br>
        Load Name as Employee, Address Resident Citizens where Exists (Employee, Name);<br>
        <br>
        Drop Tables Employees, Citizens;<br>
        Exists (Employee)</p>
        </code>
    </td>
    <td>
        <table>
        <tbody>
        <tr>
        <td><p>This results in a table called EmployeeAddresses in the data model, which can be viewed as a table
        visualization using the dimensions Employee and Address.</p>
        <p>The where clause: where Exists (Employee, Name), means only the names from the tableCitizens that are also in
        Employees are loaded into the new table. The Drop statement removes the temporary tables Employees and Citizens
        to avoid confusion.</p></td>
        </tr>
        <tr>
        <td><table>
        <tbody>
        <tr>
        <td>Employee</td>
        <td>Address</td>
        </tr>
        <tr>
        <td>Bill</td>
        <td>New York</td>
        </tr>
        <tr>
        <td>John</td>
        <td>Miami</td>
        </tr>
        <tr>
        <td>Steve</td>
        <td>Chicago</td>
        </tr>
        </tbody>
        </table></td>
        </tr>
        </tbody>
        </table>
    </td>
<tr>
    <td>
        Replacing the statement in the sample data in the previous example that
        builds the table EmployeeAddresses with the following, using
        where not Exists.
        NonEmployee:
        Load Name as Employee, Address Resident Citizens where not Exists
        (Employee, Name);
    </td>
    <td>
        The where clause includes not:
        where not Exists (Employee, Name), means only the names from the table
        Citizens that are not in Employees are loaded into the new table.
        <table>
        <tr><th>Employee</th><th>Address</th></tr>
        <tr><td>Mary</td><td>London</td></tr>
        <tr><td>Lucy</td><td>Paris</td></tr>
        </table>
    </td>
</tr>
</tbody>
</table>

Data used in example:

```qlik
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
```

## LookUp

 **Lookup()** looks into a table that is already loaded and returns the value of
 **field_name** corresponding to the first occurrence of the value
 **match_field_value** in the field **match_field_name** . The table can be the
 current table or another table previously loaded.

`lookup(field_name, match_field_name, match_field_value [,table_name])`

**Return data type:** dual

| Arguments  | Description |
| ---------- | ----------- |
| field_name | Name of the field for which the return value is required.Input value must be given as a string (for example, quoted literals).|
| match_field_name | Name of the field to look up match_field_value in. Input value must be given as a string (for example, quoted literals).|
| match_field_value | Value to look up in match_field_name field.|
| table_name | Name of the table in which to look up the value. Input value must be given as a string (for example quoted literals). If table_name is omitted the current table is assumed.|

!!! Note
    Arguments without quotes refer to the current table. To refer to other
    tables, enclose an argument in single quotes.

## Limitations

The order in which the search is made is the load order, unless the
table is the result of complex operations such as joins, in which case,
the order is not well defined. Both  **field_name** and **match_field_name**
must be fields in the same table, specified by  **table_name**.

If no match is found, NULL is returned.

Examples and results:

<table>
<thead>
<tr class='header'>
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td><p>The sample data uses the  <p>Lookup('Category', 'ProductID', ProductID, 'ProductList')</p>
<p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a
sheet in your app to see the result.</p>
<p><code>ProductList:<br>
Load * Inline [<br>
ProductID|Product|Category|Price<br>
1|AA|1|1<br>
2|BB|1|3<br>
3|CC|2|8<br>
4|DD|3|2<br>
] (delimiter is '|');<br>
 <br>
OrderData:<br>
Load *, Lookup('Category', 'ProductID', ProductID, 'ProductList') as CategoryID<br>
Inline [<br>
InvoiceID|CustomerID|ProductID|Units<br>
1|Astrida|1|8<br>
1|Astrida|2|6<br>
2|Betacab|3|10<br>
3|Divadip|3|5<br>
4|Divadip|4|10<br>
] (delimiter is '|');<br>
 <br>
Drop Table ProductList</code></p></td>
<td><table>
<tbody>
<tr>
<td><p>The  <p>The <b>Lookup()</b> function is used to build the <b>OrderData</b> table. It specifies the third argument
as <b>ProductID</b>. This is the field for which the value is to be looked up in the second argument <b>'ProductID'</b>
in the <b>ProductList</b>, as denoted by the enclosing single quotes.</p>
<p>The function returns the value for <b>'CategoryID</b> (in the <b>ProductList</b> table), loaded as <b>CategoryID</b>.
The <b>drop</b> statement deletes the <b>ProductList</b> table from the data model, because it is not required, which
leaves the <b>OrderData</b> table with the following result:</p></td>
</tr>
<tr>
<td><table>
<tbody>
<tr>
<td>ProductID</td>
<td>InvoiceID</td>
<td>CustomerID</td>
<td>Units</td>
<td>CategoryID</td>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>Astrida</td>
<td>8</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td>Astrida</td>
<td>6</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>2</td>
<td>Betacab</td>
<td>10</td>
<td>2</td>
</tr>
<tr>
<td>3</td>
<td>3</td>
<td>Divadip</td>
<td>5</td>
<td>2</td>
</tr>
<tr>
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

!!! Note
    The Lookup() function is flexible and can access any previously loaded
    table. However, it is slow compared with the Applymap() function.

## Peek

 **Peek()** finds the value of a field in a table for a row that has already been
loaded or that exists in internal memory. The row number can be
specified, as can the table.

`Peek(field_name[, row_no[, table_name]])`

**Return data type:** dual

| Argument   | Description |
| ---------- | ----------- |
| field_name | Name of the field for which the return value is required.Input value must be given as a string (for example, quoted literals).}
| row_no     | The row in the table that specifies the field required. Can be an expression, but must resolve to an integer. 0 denotes the first record, 1 the second, and so on. Negative numbers indicate order from the end of the table. -1 denotes the last record read. <br>If no row is stated, -1 is assumed.|
| table_name | A table label without the ending colon. If no table_name is stated, the current table is assumed. If used outside the LOAD statement or referring to another table, the table_name must be included.|

## Limitations

In the first record of an internal table, the function returns NULL.

**Examples and results:**

<table>
    <thead>
    <th>Example</th><th>Result</th>
    </thead>
    <tbody>
        <tr>
            <td>Add the example script to your app and run it. Then add, at least, the fields listed in the column to a
            sheet in your app to see the result.<code><p>
            EmployeeDates:<br>
            Load * Inline [<br>
            EmployeeCode|StartDate|EndDate<br>
            101|02/11/2010|23/06/2012<br>
            102|01/11/2011|30/11/2013<br>
            103|02/01/2012|<br>
            104|02/01/2012|31/03/2012<br>
            105|01/04/2012|31/01/2013<br>
            106|02/11/2013|<br>
            ] (delimiter is '|');<p>
            FirstEmployee:<br>
            Load EmployeeCode, Peek(EmployeeCode,0) As EmpCode<br>
            Resident EmployeeDates;<br>
            </code>
            </td>
            <td>
            EmpCode = 101, because Peek(EmployeeCode,0) returns the first value of EmployeeCode in the table EmployeeDates.<br>
            Substituting the value of the argument row_no returns the values of other rows in the table, as follows:
            Peek(EmployeeCode,2) returns the third value in the table: 102.<br>
            However, note that without specifying the table as the third argument table_no, the function references the
            current (in this case, internal) table. The result of Peek(EmployeeCode,-2) is multiple values:
                <table>
                <thead>
                    <th>EmployeeCode</th><th>EmpCode</th>
                </thead>
                <tbody>
                <tr><td>101</td><td>-</td></tr>
                <tr><td>102</td><td>-</td></tr>
                <tr><td>103</td><td>101</td></tr>
                <tr><td>104</td><td>102</td></tr>
                <tr><td>105</td><td>103</td></tr>
                <tr><td>106</td><td>104</td></tr>
                </tr>
                </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td><code>
            FirstEmployee:<br>
            Load EmployeeCode, Peek(EmployeeCode,-2,'EmployeeDates') As EmpCode <br>
            Resident EmployeeDates;
            </code>
            </td>
            <td>
                By specifying the argument table_no as 'EmployeeDates', the function returns the second-to-last value of
                EmployeeCode in the table EmployeeDates: 105.
            </td>
        </tr>
        <tr>
            <td>
                The Peek() function can be used to reference data that is not yet loaded.<br>
                Add the example script to your app and run it. Then add, at least, the fields listed in the results
                column to a sheet in your app to see the result.
                <code>
                T1:<br>
                LOAD * inline [<br>
                ID|Value<br>
                1|3<br>
                1|4<br>
                1|6<br>
                3|7<br>
                3|8<br>
                2|1<br>
                2|11<br>
                5|2<br>
                5|78<br>
                5|13<br>
                ] (delimiter is '|');<br>
                T2:<br>
                LOAD<br>
                *,<br>
                IF(ID=Peek(ID), Peek(List)&','&Value,Value) AS List<br>
                RESIDENT T1<br>
                ORDER BY ID ASC;<br>
                DROP TABLE T1;
            </td>
            <td>
                Create a table in a sheet in your app with ID, List, and Value as the dimensions.
                <table>
                <thead>
                <th>ID</th><th>List</th><th>Value</th>
                </thead>
                <tbody>
                <tr><td>
                <tr><td>1</td><td>6</td><td>6</td>
                <tr><td>1</td><td>6,3</td><td>3</td>
                <tr><td>1</td><td>6,3,4</td><td>4</td>
                <tr><td>2</td><td>11</td><td>11</td>
                <tr><td>2</td><td>11,10</td><td>10</td>
                <tr><td>2</td><td>11,10,1</td><td>1</td>
                <tr><td>3</td><td>8</td><td>8</td>
                <tr><td>3</td><td>8,7</td><td>7</td>
                <tr><td>5</td><td>13</td><td>13</td>
                <tr><td>5</td><td>13,2</td><td>2</td>
                <tr><td>5</td><td>13,2,78</td><td>78</td>
                </tbody>
                </table>
                The IF() statement is built from the temporary table T1.
                Peek(ID) references the field ID in the previous row in the current table T2.
                Peek(List) references the field List in the previous row in the table T2, currently being built as the
                expression is evaluated.<br>
                The statement is evaluated as follows:<br>
                If the current value of ID is the same as the previous value of ID, then write the value of Peek(List)
                concatenated with the current value of Value. Otherwise, write the current value of Value only.
                If Peek(List) already contains a concatenated result, the new result of Peek(List) will be concatenated
                to it.
                <p>
                Note the Order by clause. This specifies how the table is ordered (by ID in ascending order). Without
                this, the Peek() function will use whatever arbitrary ordering the internal table has, which can lead to
                npredictable results.
                </p>
            </td>
    </tbody>
</table>

## Previous

 **Previous()** finds the value of the  **expr** expression using data from
the previous input record that has not been discarded because of a  **where**
clause. In the first record of an internal table, the function will return NULL.

`Previous(expr)`

**Return data type:** dual

| Argument | Description |
| -------- | ----------- |
| expr     | The expression or field containing the data to be measured. <p>The expression can contain nested
**previous()** functions in order to access records further back. Data are fetched directly from the input source,
making it possible to refer also to fields that have not been loaded, that is,even if they have not been
stored in its associative database.|

In the first record of an internal table, the function returns NULL.

**Examples and results:**

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>
Sales2013:<br>
Load *, (Sales - Previous(Sales) )as Increase Inline [<br>
Month|Sales<br>
1|12<br>
2|13<br>
3|15<br>
4|17<br>
5|21<br>
6|21<br>
7|22<br>
8|23<br>
9|32<br>
10|35<br>
11|40<br>
12|41<br>
] (delimiter is '|');</code></td>
<td><table>
<tbody>
<tr>
<td><p>By using the  **Previous() function in the **Load**  statement, we can compare the current value of Sales with
the preceding value, and use it in a third field, Increase.</p></td>
</tr>
<tr>
<td><table>
<tbody>
<tr>
    <td><p>Month<br>
    1<br>
    2<br>
    3<br>
    4<br>
    5<br>
    6<br>
    7<br>
    8<br>
    9<br>
    10<br>
    11<br>
    12</p></td>
    <td>Sales<br>
    12<br>
    13<br>
    15<br>
    17<br>
    21<br>
    21<br>
    22<br>
    23<br>
    32<br>
    35<br>
    40<br>
    41<br>
    </td>
    <td>Increase<br>
    -<br>
    1<br>
    2<br>
    2<br>
    4<br>
    0<br>
    1<br>
    1<br>
    9<br>
    3<br>
    5<br>
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
