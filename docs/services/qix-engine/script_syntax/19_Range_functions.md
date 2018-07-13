# Range functions

## RangeAvg

RangeAvg() returns the average of a range. Input to the function can be either a range of values or an expression.

`RangeAvg(first_expr[, Expression])`

**Return data type:** numeric

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be measured. |
| Expression | Optional expressions or fields containing the range of data to be measured. |

**Limitations:**
If no numeric value is found, NULL is returned.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeAvg(1,2,4)</td>
<td>Returns 2.33333333</td>
</tr>
<tr class="even">
<td>RangeAvg(1,'xyz)</td>
<td>Returns 1</td>
</tr>
<tr class="odd">
<td>RangeAvg(null(), 'abc')</td>
<td>Returns NULL</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.</p>
RangeTab3:<br/>
LOAD recno() as RangeID, RangeAvg(Field1,Field2,Field3) as MyRangeAvg INLINE [<br/>
Field1, Field2, Field3<br/>
10,5,6<br/>
2,3,7<br/>
8,2,8<br/>
18,11,9<br/>
5,5,9<br/>
9,4,2<br/>
];
</td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of MyRangeAvg for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>MyRangeAvg</td>
</tr>
<tr class="even">
<td>1</td>
<td>7</td>
</tr>
<tr class="odd">
<td>2</td>
<td>4</td>
</tr>
<tr class="even">
<td>3</td>
<td>6</td>
</tr>
<tr class="odd">
<td>4</td>
<td>12.666</td>
</tr>
<tr class="even">
<td>5</td>
<td>6.333</td>
</tr>
<tr class="odd">
<td>6</td>
<td>5</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Example with expression:

`RangeAvg(Above(MyField),0,3))`

Returns a sliding average of the result of the range of three values of MyField calculated on the current row and two rows above the current row. By specifying the third argument as 3, the Above() function returns three values, where there are sufficient rows above, which are taken as input to the RangeAvg() function.

Data used in examples:
| MyField | RangeAvg(Above(MyField,0,3)) | Explanation |
| ---------- | --------------------------------------------------------------------------- | - |
| 10 | 10 | Because this is the top row, the range consists of one value only. |
| 2 | 6 | There is only one row above this row, so the range is: 10,2. |
| 8 | 6.6666666667 | The equivalent to RangeAvg(10,2,8) |
| 18 | 9.333333333 | |
| 5 | 10.333333333 | |
| 9 | 10.6666666667 | |
| <p>RangeTab: <br/>LOAD \* INLINE [<br/>MyField<br/>10<br/>2<br/>8<br/>18<br/>5<br/>9<br/>] ;|| |

## RangeCorrel

RangeCorrel() returns the correlation coefficient for two sets of data. The correlation coefficient is a measure of the relationship between the data sets.

`RangeCorrel(x_value, y_value[, Expression])`

**Return data type:** numeric

Data series should be entered as (x,y) pairs. For example, to evaluate two series of data, array 1 and array 2, where the array 1 = 2,6,9 and array 2 = 3,8,4 you would write RangeCorrel (2,3,6,8,9,4) which returns 0.269.

| Argument | Description |
| - | - |
| x-value, y-value | Each value represents a single value or a range of values as returned by an inter-record functions with a third optional parameter. Each value or range of values must correspond to an x-value or a range of y-values. |
| Expression | Optional expressions or fields containing the range of data to be measured. |

**Limitations:**

The function needs at least two pairs of coordinates to be calculated.<br/>
Text values, NULL values and missing values return NULL.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeCorrel (2,3,6,8,9,4,8,5)</td>
<td>Returns 0.2492. This function can be loaded in the script or added into a visualization in the expression editor.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.</p>
Load * Inline [<br/>
ID1|x1|y1|x2|y2|x3|y3|x4|y4|x5|y5|x6|y6<br/>
01|46|60|70|13|78|20|45|65|78|12|78|22<br/>
02|65|56|22|79|12|56|45|24|32|78|55|15<br/>
03|77|68|34|91|24|68|57|36|44|90|67|27<br/>
04|57|36|44|90|67|27|57|68|47|90|80|94<br/>
] (delimiter is '|');

XY:<br/>
LOAD recno() as RangeID, \* Inline [<br/>
X|Y<br/>
2|3<br/>
6|8<br/>
9|4<br/>
8|5<br/>
](delimiter is '|');</td>

<td><table>
<tbody>
<tr class="odd">
<td>In a table with ID1 as a dimension and the measure: RangeCorrel(x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6)), the RangeCorrel() function finds the value of Correl over the range of six x,y pairs, for each of the ID1 values.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>ID1</td>
<td>MyRangeCorrel</td>
</tr>
<tr class="even">
<td>01</td>
<td>-0.9517</td>
</tr>
<tr class="odd">
<td>02</td>
<td>-0.5209</td>
</tr>
<tr class="even">
<td>03</td>
<td>-0.5209</td>
</tr>
<tr class="odd">
<td>04</td>
<td>-0.1599</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>
</td>
<tr>
<td>
<p>XY:<br/>
LOAD recno() as RangeID, * Inline [<br/>
X|Y<br/>2|3<br/>6|8<br/>9|4<br/>8|5<br/>
](delimiter is '|');
</td>
<td>In a table with RangeID as a dimension and the measure: RangeCorrel(Below(X,0,4,BelowY,0,4)), the RangeCorrel() function uses the results of the Below() functions, which because of the third argument (count) set to 4, produce a range of four x-y values from the loaded table XY.
<table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>MyRangeCorrel2</td>
</tr>
<tr class="even">
<td>01</td>
<td>0.2492</td>
</tr>
<tr class="odd">
<td>02</td>
<td>-0.9959</td>
</tr>
<tr class="even">
<td>03</td>
<td>-1.0000</td>
</tr>
<tr class="odd">
<td>04</td>
<td>-</td>
</tr>
</tbody>
</table>
The value for RangeID 01 is the same as manually entering RangeCorrel(2,3,6,8,9,4,8,5). For the other values of RangeID, the series produced by the Below() function are: (6,8,9,4,8,5), (9,4,8,5), and (8,5), the last of which produces a null result.
</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## RangeCount

RangeCount() returns the number of values, both text and numeric, in the expression or field.

`RangeCount(first_expr[, Expression])`
**Return data type:** integer

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be counted. |
| Expression | Optional expressions or fields containing the range of data to be counted. |

**Limitations:**
NULL values are not counted.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeCount (1,2,4)</td>
<td>Returns 3</td>
</tr>
<tr class="even">
<td>RangeCount(2,'xyz')
</td>
<td>Returns 2</td>
</tr>
<tr class="odd">
<td>RangeCount(null( ))</td>
<td>Returns 0</td>
</tr>
<tr class="even">
<td>RangeCount(2,'xyz', null())</td>
<td>Returns 2</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.</p>
RangeTab3:<br/>
LOAD recno() as RangeID, RangeCount(Field1,Field2,Field3) as MyRangeCount INLINE [<br/>
Field1, Field2, Field3<br/>
10,5,6<br/>
2,3,7<br/>
8,2,8<br/>
18,11,9<br/>
5,5,9<br/>
9,4,2<br/>
];
</td>
<td>The resulting table shows the returned values of MyRangeCount for each of the records in the table.
<table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>MyRangeCount</td>
</tr>
<tr class="even">
<td>1</td>
<td>3</td>
</tr>
<tr class="odd">
<td>2</td>
<td>3</td>
</tr>
<tr class="even">
<td>3</td>
<td>3</td>
</tr>
<tr class="odd">
<td>4</td>
<td>3</td>
</tr>
<tr class="even">
<td>5</td>
<td>3</td>
</tr>
<tr class="odd">
<td>6</td>
<td>3</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Example with expression:

`RangeCount(Above(MyField,1,3))`

Returns the number of values contained in the three results of MyField. By specifying the second and third arguments of the Above() function as 3, it returns the values from the three fields above the current row, where there are sufficient rows, which are taken as input to the RangeSum() function.

Data used in examples:
| MyField | RangeCount(Above(MyField,1,3)) |
| - | - |
| 10 | 0 |
| 2 | 1 |
| 8 | 2 |
| 18 | 3 |
| 5 | 3 |
| 9 | 3 |

RangeTab:<br/>
LOAD \* INLINE [<br/>
MyField<br/>
10<br/>2<br/>8<br/>18<br/>5<br/>9<br/>];

## RangeFractile

RangeFractile() returns the value that corresponds to the n-th fractile (quantile) of a range of numbers.

!!! Tip
    RangeFractile() uses linear interpolation between closest ranks when calculating the fractile.

`RangeFractile(fractile, first_expr[, Expression])`

**Return data type:** numeric

The arguments of this function may contain inter-record functions which in themselves return a list of values.

<table>
<thead>
<th>Argument</th>
<th>Description</th>
</thead>
<tbody>
<tr>
<td>fractile</td>
<td>A number between 0 and 1 corresponding to the fractile (quantile expressed as a fraction) to be calculated.</td>
</tr>
<tr>
<td>first_expr</td>
<td>The expression or field containing the data to be measured.</td>
</tr>
<tr>
<td>Expression</td>
<td>Optional expressions or fields containing the range of data to be counted.</td>
</tr>
<tr>
<td><p>Add the example script to your app and run it.</p> RangeTab:<br/>LOAD recno() as RangeID, <br/>RangeFractile(0.5,Field1,Field2,Field3)<br/> as MyRangeFrac INLINE [<br/>Field1, Field2, Field3<br/>10,5,6<br/>2,3,7<br/>8,2,8<br/>18,11,9<br/>5,5,9<br/>9,4,2<br/>];
</td>
<td>The resulting table shows the returned values of MyRangeFrac for each of the records in the table.
<table>
<tr><td>RangeID</td><td>MyRangeFrac</td></tr>
<tr><td>1</td><td>6</td></tr>
<tr><td>2</td><td>3</td></tr>
<tr><td>3</td><td>8</td></tr>
<tr><td>4</td><td>11</td></tr>
<tr><td>5</td><td>5</td></tr>
<tr><td>6</td><td>4</td></tr>
</table>
</td>
</tr>
</tbody>
</table>

Examples:

| Examples | Results |
| - | - |
| RangeFractile(0.24,1,2,4,6) | Returns 1.72 |
| RangeFractile(0.5,1,2,3,4,6) | Returns 3 |
| RangeFractile (0.5,1,2,5,6) | Returns 3.5 |

Example with expression:

`RangeFractile (0.5, Above(Sum(MyField),0,3))`

In this example, the inter-record function Above() contains the optional offset and count arguments. This produces a range of results that can be used as input to the any of the range functions. In this case, Above(Sum(MyField),0,3) returns the values of MyField for the current row and the two rows above. These values provide the input to the RangeFractile() function. So, for the bottom row in the table below, this is the equivalent of RangeFractile(0.5, 3,4,6), that is, calculating the 0.5 fractile for the series 3, 4, and 6. The first two rows in the table below, the number of values in the range is reduced accordingly, where there no rows above the current row. Similar results are produced for other inter-record functions.

| MyField | RangeFractile(0.5, Above(Sum(MyField),0,3)) |
| - | - |
| 1 | 1 |
| 2 | 1.5 |
| 3 | 2 |
| 4 | 3 |
| 5 | 4 |
| 6 | 5 |

Data used in examples:
<br/>RangeTab:<br/>
LOAD \* INLINE [<br/>MyField<br/>1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>];

## RangeIRR

RangeIRR() returns the internal rate of return for a series of cash flows
represented by the input values.

The internal rate of return is the interest rate received for an
investment consisting of payments (negative values) and income (positive
values) that occur at regular periods.

`RangeIRR(value[, value][, Expression])`

**Return data type:** numeric

| Argument | Description |
| - | - |
| value | A single value or a range of values as returned by an inter record function with a third optional parameter. The function needs at least one positive and one negative value to be calculated. |
| Expression | Optional expressions or fields containing the range of data to be measured. |

**Limitations:** Text values, NULL values and missing values are disregarded.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeIRR(-70000,12000,15000,18000,21000,26000)</td>
<td>Returns 0.0866</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.</p>
RangeTab3:<br/>LOAD *, recno() as RangeID,<br/>
RangeIRR(Field1,Field2,Field3) as RangeIRR;<br/>
LOAD * INLINE [<br/>Field1|Field2|Field3<br/>-10000|5000|6000<br/>-2000|NULL|7000<br/>
-8000|'abc'|8000<br/>-1800|11000|9000<br/>-5000|5000|9000<br/>-9000|4000|2000<br/>
<span class="Code" data-autonumposition="none">] (delimiter is '|');</td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of RangeIRR for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>RangeIRR</td>
</tr>
<tr class="even">
<td>1</td>
<td>0.0639</td>
</tr>
<tr class="odd">
<td>2</td>
<td>0.8708</td>
</tr>
<tr class="even">
<td>3</td>
<td>-</td>
</tr>
<tr class="odd">
<td>4</td>
<td>5.8419</td>
</tr>
<tr class="even">
<td>5</td>
<td>0.9318</td>
</tr>
<tr class="odd">
<td>6</td>
<td>-0.2566</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## RangeKurtosis

RangeKurtosis() returns the value that corresponds to the kurtosis of a range of numbers.

`RangeKurtosis(first_expr[, Expression])`

**Return data type:** numeric

The arguments of this function may contain inter-record functions which in themselves return a list of values.
| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be measured. |
| Expression | Optional expressions or fields containing the range of data to be measured.|

**Limitations:** If no numeric value is found, NULL is returned.

| Examples | Results |
| - | - |
| RangeKurtosis (1,2,4,7) | Returns -0.28571428571429 |

## RangeMax

RangeMax() returns the highest numeric values found within the expression or field.

`RangeMax(first_expr[, Expression])`

**Return data type:** numeric

| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be measured. |
| Expression | Optional expressions or fields containing the range of data to be measured. |

**Limitations:** If no numeric value is found, NULL is returned.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeMax(1,2,4)</td>
<td>Returns 4</td>
</tr>
<tr class="even">
<td>RangeMax(1,'xyz')</td>
<td>Returns 1</td>
</tr>
<tr class="odd">
<td>RangeMax(null(), 'abc')</td>
<td>Returns NULL</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.
<p>RangeTab3:<br/>LOAD recno() as RangeID,<br/>
RangeMax(Field1,Field2,Field3) as MyRangeMax;<br/>
INLINE [<br/>Field1,Field2,Field3<br/>10,5,6<br/>2,3,7<br/>
8,2,8<br/>18,11,9<br/>5,5,9<br/>9,4,2<br/>];</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of MyRangeMax for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>MyRangeMax</td>
</tr>
<tr class="even">
<td>1</td>
<td>10</td>
</tr>
<tr class="odd">
<td>2</td>
<td>7</td>
</tr>
<tr class="even">
<td>3</td>
<td>8</td>
</tr>
<tr class="odd">
<td>4</td>
<td>18</td>
</tr>
<tr class="even">
<td>5</td>
<td>9</td>
</tr>
<tr class="odd">
<td>6</td>
<td>9</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Example with expression:

`RangeMax(Above(MyField,0,3))`

Returns the maximum value in the range of three values of MyField calculated on the current row and two rows above the current row. By specifying the third argument as 3, the Above() function returns three values, where there are sufficient rows above, which are taken as input to the RangeMax() function.

Data used in examples:
| MyField | RangeMax(Above(Sum(MyField),1,3)) |
| - | - |
| 10 | 10 |
| 2 | 10 |
| 8 | 10 |
| 18 | 18 |
| 5 | 18 |
| 9 | 18 |
| <p>RangeTab: <br/>LOAD \* INLINE [<br/>MyField<br/>10<br/>2<br/>8<br/>18<br/>5<br/>9<br/>] ;||

## RangeMaxString

RangeMaxString() returns the last value in the text sort order that it finds in the expression or field.

`RangeMaxString(first_expr[, Expression])`

**Return data type:** string

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be measured. |
| Expression | Optional expressions or fields containing the range of data to be measured. |

Examples:

| Examples | Results |
| - | - |
| RangeMaxString(1,2,4) | Returns 4 |
| RangeMaxString('xyz','abc') | Returns 'xyz' |
| RangeMaxString(5,'abc') | Returns 'abc' |
| RangeMaxString(null()) | Returns NULL |

Example with expression:

`RangeMaxString(Above(MaxString(MyField),0,3))`

Returns the last (in text sort order) of the three results of the MaxString(MyField) function evaluated on the current row and two rows above the current row.

Data used in examples:
| MyField | RangeMaxString(Above(MaxString(MyField),0,3)) |
| - | - |
| 10 | 10 |
| abc | abc |
| 8 | abc |
| def | def |
| xyz | xyz |
| 9 | xyz |
| <p>RangeTab: <br/>LOAD \* INLINE [<br/>MyField<br/>10<br/>'abc'<br/>8<br/>'def'<br/>'xyz'<br/>9<br/>] ;||

## RangeMin

RangeMin() returns the lowest numeric values found within the expression or field.

`RangeMin(first_expr[, Expression])`

**Return data type:** numeric

| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be measured. |
| Expression | Optional expressions or fields containing the range of data to be measured. |

**Limitations:** If no numeric value is found, NULL is returned.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeMin(1,2,4)</td>
<td>Returns 1</td>
</tr>
<tr class="even">
<td>RangeMin(1,'xyz')</td>
<td>Returns 1</td>
</tr>
<tr class="odd">
<td>RangeMax(null(), 'abc')</td>
<td>Returns NULL</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.
<p>RangeTab3:<br/>LOAD recno() as RangeID,<br/>
RangeMin(Field1,Field2,Field3) as MyRangeMin;<br/>
INLINE [<br/>Field1,Field2,Field3<br/>10,5,6<br/>2,3,7<br/>
8,2,8<br/>18,11,9<br/>5,5,9<br/>9,4,2<br/>];</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of MyRangeMin for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>MyRangeMin</td>
</tr>
<tr class="even">
<td>1</td>
<td>5</td>
</tr>
<tr class="odd">
<td>2</td>
<td>2</td>
</tr>
<tr class="even">
<td>3</td>
<td>2</td>
</tr>
<tr class="odd">
<td>4</td>
<td>9</td>
</tr>
<tr class="even">
<td>5</td>
<td>5</td>
</tr>
<tr class="odd">
<td>6</td>
<td>2</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Example with expression:

`RangeMin (Above(MyField,0,3)`

Returns the minimum value in the range of three values of MyField calculated on the current row and two rows above the current row. By specifying the third argument as 3, the Above() function returns three values, where there are sufficient rows above, which are taken as input to the RangeMin() function.

Data used in examples:
| MyField | RangeMin(Above(MyField,0,3)) |
| - | - |
| 10 | 10 |
| 2 | 2 |
| 8 | 2 |
| 18 | 2 |
| 5 | 5 |
| 9 | 5 |
| <p>RangeTab: <br/>LOAD \* INLINE [<br/>MyField<br/>10<br/>2<br/>8<br/>18<br/>5<br/>9<br/>] ;||

## RangeMinString

RangeMinString() returns the first value in the text sort order that it finds in the expression or field.

`RangeMinString(first_expr[, Expression])`

**Return data type:** string

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be measured. |
| Expression | Optional expressions or fields containing the range of data to be measured. |

Examples:

| Examples | Results |
| - | - |
| RangeMinString(1,2,4) | Returns 1 |
| RangeMinString('xyz','abc') | Returns 'abc' |
| RangeMinString(5,'abc') | Returns 5 |
| RangeMinString(null()) | Returns NULL |

Example with expression:

`RangeMinString(Above(MinString(MyField),0,3))`

Returns the first (in text sort order) of the three results of the MinString(MyField) function evaluated on the current row and two rows above the current row.

Data used in examples:
| MyField | RangeMinString(Above(MinString(MyField),0,3)) |
| - | - |
| 10 | 10 |
| abc | 10 |
| 8 | 8 |
| def | 8 |
| xyz | 8 |
| 9 | 9 |
| <p>RangeTab: <br/>LOAD \* INLINE [<br/>MyField<br/>10<br/>'abc'<br/>8<br/>'def'<br/>'xyz'<br/>9<br/>] ;||

## RangeMissingCount

RangeMissingCount() returns the number of non-numeric values (including NULL) in the expression or field.

`RangeMissingCount(first_expr[, Expression])`

**Return data type:** string

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be counted. |
| Expression | Optional expressions or fields containing the range of data to be counted. |

Examples:

| Examples | Results |
| - | - |
| RangeMissingCount(1,2,4)   | Returns 0 |
| RangeMissingCount(5,'abc') | Returns 1 |
| RangeMissingCount(null())  | Returns 1 |

Example with expression:

`RangeMissingCount(Above(MinString(MyField),0,3))`

Returns the number of non-numeric values in the three results of the MinString(MyField) function evaluated on the current row and two rows above the current row.

| MyField | RangeMissingCount(Above(MinString(MyField),0,3)) | Explanation |
| - | - | - |
| 10 | 2 | Returns 2 because there are no rows above this row so 2 of the 3 values are missing. |
| abc | 2 | Returns 2 because there is only 1 row above the current row and the current row is non-numeric ('abc'). |
| 8 | 1 | Returns 1 because 1 of the 3 rows includes a non-numeric ('abc'). |
| def | 2 | Returns 2 because 2 of the 3 rows include non-numeric values ('def' and 'abc'). |
| xyz | 2 | Returns 2 because 2 of the 3 rows include non-numeric values (' xyz' and 'def'). |
| 9 | 2 | Returns 2 because 2 of the 3 rows include non-numeric values (' xyz' and 'def'). |

Data used in examples:

<p>RangeTab: <br/>LOAD * INLINE [<br/>MyField<br/>10<br/>'abc'<br/>8<br/>'def'<br/>'xyz'<br/>9<br/>];

## RangeMode

RangeMode() finds the most commonly occurring value (mode value) in the expression or field.

`RangeMax(first_expr[, Expression])`

**Return data type:** numeric

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument   | Description                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| first_expr | The expression or field containing the data to be measured.                 |
| Expression | Optional expressions or fields containing the range of data to be measured. |

**Limitations:** If more than one value shares the highest frequency, NULL is returned.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeMode(1,2,9,2,4)</td>
<td>Returns 2</td>
</tr>
<tr class="even">
<td>RangeMode('a',4,'a',4)</td>
<td>Returns NULL</td>
</tr>
<tr class="odd">
<td>RangeMode(null())</td>
<td>Returns NULL</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.
<p>RangeTab3:<br/>LOAD recno() as RangeID,<br/>
RangeMode(Field1,Field2,Field3) as MyRangeMode;<br/>
INLINE [<br/>Field1,Field2,Field3<br/>10,5,6<br/>2,3,7<br/>
8,2,8<br/>18,11,9<br/>5,5,9<br/>9,4,2<br/>];</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of MyRangeMode for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>MyRangeMode</td>
</tr>
<tr class="even">
<td>1</td>
<td>-</td>
</tr>
<tr class="odd">
<td>2</td>
<td>-</td>
</tr>
<tr class="even">
<td>3</td>
<td>8</td>
</tr>
<tr class="odd">
<td>4</td>
<td>-</td>
</tr>
<tr class="even">
<td>5</td>
<td>5</td>
</tr>
<tr class="odd">
<td>6</td>
<td>-</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Example with expression:

`RangeMode(Above(MyField,0,3))`

Returns the most commonly occurring value in the three results of MyField evaluated on the current row and two rows above the current row. By specifying the third argument as 3, the Above() function returns three values, where there are sufficient rows above, which are taken as input to the RangeMode() function.

Data used in examples:
| MyField | RangeMode(Above(MyField,0,3)) |
| ------- | ----------------------------- |
| 10 | Returns 10 because there are no rows above so the single value is the most commonly occurring. |
| 2 | -|
| 8 | - |
| 18 | - |
| 5 | - |
| 9 | - |
RangeTab: <br/>LOAD \* INLINE [<br/>MyField<br/>10<br/>2<br/>8<br/>18<br/>5<br/>9<br/>];

## RangeNPV

RangeNPV()
returns the net present value of an investment based on a discount rate
and a series of future periodic payments (negative values) and incomes
(positive values). The result has a default number format of
**money** .

For cash flows that are not necessarily periodic, see _RangeXNPV_
function.

`RangeNPV(discount_rate, value[,value][, Expression])`

**Return data type:** numeric

| Argument | Description |
| - | - |
| discount_rate | The interest rate per period. |
| value | A payment or income occurring at the end of each period. Each value may be a single value or a range of values as returned by an inter-record function with a third optional parameter. |
| Expression | Optional expressions or fields containing the range of data to be measured.|

**Limitations:** Text values, NULL values and missing values are disregarded.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeNPV(0.1,-10000,3000,4200,6800)</td>
<td>Returns 1188.44</td>
</tr>
<tr class="even">
<td>Add the example script to your app and run it.<br/>
RangeTab3:<br/>
LOAD *,<br/>
recno() as RangeID,<br/>
RangeNPV(Field1,Field2,Field3) as RangeNPV;<br/>
LOAD * INLINE [<br/>
Field1|Field2|Field3<br/>
10|5|-6000<br/>
2|NULL|7000<br/>
8|'abc'|8000<br/>
18|11|9000<br/>
5|5|9000<br/>
9|4|2000<br/>
] (delimiter is '|');</td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of RangeNPV for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>RangeNPV</td>
</tr>
<tr class="even">
<td>1</td>
<td>$-49.13</td>
</tr>
<tr class="odd">
<td>2</td>
<td>$777.78</td>
</tr>
<tr class="even">
<td>3</td>
<td>$98.77</td>
</tr>
<tr class="odd">
<td>4</td>
<td>$25.51</td>
</tr>
<tr class="even">
<td>5</td>
<td>$250.83</td>
</tr>
<tr class="odd">
<td>6</td>
<td>$20.40</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>


## RangeNullCount

RangeNullCount() finds the number of NULL values in the expression or field.

`RangeNullCount(first_expr [, Expression])`

**Return data type:** integer

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument   | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| first_expr | The expression or field containing the data to be counted.                 |
| Expression | Optional expressions or fields containing the range of data to be counted. |

Examples:

| Examples                   | Results   |
| -------------------------- | --------- |
| RangeNullCount(1,2,4)  | Returns 0 |
| RangeNullCount(5,'abc') | Returns 0 |
| RangeNullCount(null(), null())  | Returns 2 |

Example with expression:

`RangeNullCount (Above(Sum(MyField),0,3))`

Returns the number of NULL values in the three results of the Sum(MyField) function evaluated on the current row and two rows above the current row.

| MyField | 	RangeNullCount(Above(Sum(MyField),0,3))|
| - | - |
| 10 | Returns 2 because there are no rows above this row so 2 of the 3 values are missing (=NULL).|
| 'abc' | Returns 1 because there is only one row above the current row, so one of the three values is missing (=NULL).|
| 8 | 	Returns 0 because none of the three rows is a NULL value.| 

Data used in examples:

<p>RangeTab: <br/>LOAD * INLINE [<br/>MyField<br/>10<br/>'abc'<br/>8<br/>];

## RangeNumericCount

RangeNumericCount() finds the number of numeric values in an expression or field.

`RangeNumericCount(first_expr[, Expression])`

**Return data type:** integer

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument | Description |
| - | - |
| first_expr | The expression or field containing the data to be measured. |
| Expression | Optional expressions or fields containing the range of data to be measured.|

Examples:

| Examples                   | Results   |
| -------------------------- | --------- |
| RangeNumericCount(1,2,4)   | Returns 3 |
| RangeNumericCount(5,'abc') | Returns 1 |
| RangeNumericCount(null())  | Returns 0 |

Example with expression:

`RangeNumericCount(Above(MaxString(MyField),0,3))`

Returns the number of numeric values in the three results of the MaxString(MyField) function evaluated on the current row and two rows above the current row.

| MyField | RangeNumericCount(Above(MaxString(MyField),0,3)) |
| ------- | ------------------------------------------------ | 
| 10      | 1 |
| abc     | 1 |
| 8       | 2 |
| def     | 1 |
| xyz     | 1 |
| 9       | 1 |

Data used in examples:

<p>RangeTab: <br/>LOAD * INLINE [<br/>MyField<br/>10<br/>'abc'<br/>8<br/>'def'<br/>'xyz'<br/>9<br/>];

## RangeOnly
RangeOnly() is a dual function that returns a value if the expression evaluates to one unique value. If this is not the case then NULL is returned.

`RangeOnly(first_expr[, Expression])`

**Return data type:** dual

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument   | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| first_expr | The expression or field containing the data to be measured.                |
| Expression | Optional expressions or fields containing the range of data to be measured.|

Examples:

| Examples | Results |
| - | - |
| RangeOnly(1,2,4) | Returns NULL |
| RangeOnly(5,'abc') | Returns NULL |
| RangeOnly(null(), 'abc')  | Returns 'abc' |
| RangeOnly(10,10,10) | Returns 10 |


## RangeSkew

RangeSkew() returns the value corresponding to the skewness of a range of numbers.

`RangeSkew(first_expr[, Expression])`

**Return data type:** numeric

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument   | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| first_expr | The expression or field containing the data to be measured.                |
| Expression | Optional expressions or fields containing the range of data to be measured.|

**Limitations:** If no numeric value is found, NULL is returned.

| Examples | Results |
| - | - |
| RangeSkew(1,2,4) | Returns 0.93521952958283 |
| RangeSkew(above(SalesValue,0,3)) | Returns a sliding skewness of the range of three values returned from the above() function calculated on the current row and the two rows above the current row. |

Data used in example:

| CustID | RangeSkew(Above(SalesValue,0,3)) |
| - | - |
| 1-20 | -, -, 0.5676, 0.8455, 1.0127, -0.8741, 1.7243, -1.7186, 1.5518, 1.4332, 0, 1.1066, 1.3458, 1.5636, 1.5439, 0.6952, -0.3766 |
| SalesTable:<br/>LOAD recno() as CustID, * inline [<br/>SalesValue<br/>101<br/>163<br/>126<br/>139<br/>167<br/>86<br/>83<br/>22<br/>32<br/>70<br/>108<br/>124<br/>176<br/>113<br/>95<br/>32<br/>42<br/>92<br/>61<br/>21<br/>];| |


## RangeStDev

RangeStdev() finds the standard deviation of a range of numbers.

`RangeStdev(first_expr[, Expression])`

**Return data type:** numeric

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument   | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| first_expr | The expression or field containing the data to be measured.                |
| Expression | Optional expressions or fields containing the range of data to be measured.|

**Limitations:** If no numeric value is found, NULL is returned.

| Examples | Results |
| - | - |
| RangeStdev(1,2,4)| Returns 1.5275252316519 |
| RangeStdev(null()) | Returns NULL |
| RangeStdev (above(SalesValue),0,3)) | Returns a sliding standard of the range of three values returned from the above() function calculated on the current row and the two rows above the current row. |

Data used in example:

| CustID | RangeStdev(SalesValue, 0,3)) |
| - | - |
| 1-20 | -,43.841, 34.192, 18.771, 20.953, 41.138, 47.655, 36.116, 32.716, 25.325,38,000, 27.737, 35.553, 33.650, 42.532, 33.858, 32.146, 25.239, 35.595 |
| SalesTable:<br/>LOAD recno() as CustID, * inline [<br/>SalesValue<br/>101<br/>163<br/>126<br/>139<br/>167<br/>86<br/>83<br/>22<br/>32<br/>70<br/>108<br/>124<br/>176<br/>113<br/>95<br/>32<br/>42<br/>92<br/>61<br/>21<br/>];| |


## RangeSum

RangeSum() returns the sum of a range of values.All non-numeric values are treated as 0, unlike the + operator.

`RangeSum(first_expr[, Expression])`

**Return data type:** numeric

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument   | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| first_expr | The expression or field containing the data to be measured.                |
| Expression | Optional expressions or fields containing the range of data to be measured.|

**Limitations:** The RangeSumfunction treats all non-numeric values as 0, unlike the + operator.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeSum(1,2,4)</td>
<td>Returns 7</td>
</tr>
<tr class="even">
<td>RangeSum(5,'abc')</td>
<td>Returns 5</td>
</tr>
<tr class="odd">
<td>RangeSum(null())</td>
<td>Returns 0</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.
<p>RangeTab3:<br/>LOAD recno() as RangeID,<br/>
RangeSum(Field1,Field2,Field3) as MyRangeSum;<br/>
INLINE [<br/>Field1,Field2,Field3<br/>10,5,6<br/>2,3,7<br/>
8,2,8<br/>18,11,9<br/>5,5,9<br/>9,4,2<br/>];</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of MyRangeMode for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>MyRangeSum</td>
</tr>
<tr class="even">
<td>1</td>
<td>21</td>
</tr>
<tr class="odd">
<td>2</td>
<td>12</td>
</tr>
<tr class="even">
<td>3</td>
<td>18</td>
</tr>
<tr class="odd">
<td>4</td>
<td>38</td>
</tr>
<tr class="even">
<td>5</td>
<td>19</td>
</tr>
<tr class="odd">
<td>6</td>
<td>15</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Example with expression:

`RangeSum(Above(MyField,0,3))`

Returns the sum of the three values of MyField): from the current row and two rows above the current row. By specifying the third argument as 3, the Above() function returns three values, where there are sufficient rows above, which are taken as input to the RangeSum() function.

Data used in examples:
| MyField | RangeSum(Above(MyField,0,3)) |
| - | - |
| 10 | 10 |
| 2 | 12 |
| 8 | 20 |
| 18 | 28 |
| 5 | 31 |
| 9 | 32 |
| RangeTab:<br/>LOAD * INLINE [<br/>MyField<br/>10<br/>2<br/>8<br/>18<br/>5<br/>9<br/>];|


## RangeTextCount

RangeTextCount() returns the number of text values in an expression or field.

`RangeTextCount(first_expr[, Expression])`

**Return data type:** numeric

The arguments of this function may contain inter-record functions which in themselves return a list of values.

| Argument   | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| first_expr | The expression or field containing the data to be measured.                |
| Expression | Optional expressions or fields containing the range of data to be measured.|

Examples:
| Examples | Results |
| - | - |
| RangeTextCount(1,2,4) | Returns 0 |
| RangeTextCount(5,'abc')| Returns 1 |
| RangeTextCount(null()) | Returns 0 |

Example with expression:

`RangeTextCount(Above(MaxString(MyField),0,3))`

Returns the number of text values within the three results of the MaxString(MyField) function evaluated over the current row and two rows above the current row.

Data used in examples:

| MyField | MaxString(MyField)|	RangeTextCount(Above(Sum(MyField),0,3)) |
| - | - | - |
| 10 | 10 | 0 |
| abc | abc| 1 |
| 8 | 8 | 1 |
| def | def | 2 |
| xyz | xyz | 2 |
| 9 | 9 | 2 |

Data used in examples:

<p>RangeTab: <br/>LOAD * INLINE [<br/>MyField<br/>10<br/>'abc'<br/>8<br/>null()<br/>'xyz'<br/>9<br/>];


## RangeXIRR

RangeXIRR()
returns the internal rate of return for a schedule of cash flows that is
not necessarily periodic. To calculate the internal rate of return for a
series of periodic cash flows, use the
**RangeIRR**
function.

`RangeXIRR(value,date{, value,date})`

**Return data type:** numeric

| Argument | Description                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value    | A cash flow or a series of cash flows that correspond to a schedule of payments in dates. The series of values must contain at least one positive and one negative value. |
| date     | A payment date or a schedule of payment dates that corresponds to the cash flow payments.                                                                                 |
**Limitations:**

Text values, NULL values and missing values are disregarded.<br/>
All payments are discounted based on a 365-day
year.

| Examples                                        | Results        |
| ----------------------------------------------- | -------------- |
| RangeXIRR(-2500,'2008-01-01',2750,'2008-09-01') | Returns 0.1532 |

## RangeXNPV

RangeXNPV()
returns the net present value for a schedule of cash flows that is not
necessarily periodic. The result has a default number format of money.
To calculate the net present value for a series of periodic cash flows,
use the
**RangeNPV**
function.

`RangeXNPV(discount_rate,values, dates[,Expression])`

**Return data type:** numeric

| Argument      | Description                                                                                                                                                                                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| discount_rate | The interest rate per period.                                                                                                                                                                                                                                                                             |
| values        | A cash flow or a series of cash flows that corresponds to a schedule of payments in dates. Each value may be a single value or a range of values as returned by an inter-record function with a third optional parameter. The series of values must contain at least one positive and one negative value. |
| dates         | A payment date or a schedule of payment dates that corresponds to the cash flow payments.                                                                                                                                                                                                                 |
**Limitations:**

Text values, NULL values and missing values are disregarded.<br/>
All payments are discounted based on a 365-day year.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>RangeXNPV(0.1, -2500,'2008-01-01',2750,'2008-09-01')</td>
<td>Returns 80.25</td>
</tr>
<tr class="even">
<td>Add the example script to your app and run it.<br/>RangeTab3:
LOAD *,<br/>
recno() as RangeID,<br/>
RangeXNPV(Field1,Field2,Field3) as RangeNPV;<br/>
LOAD * INLINE [<br/>
Field1|Field2|Field3<br/>
10|5|-6000<br/>
2|NULL|7000<br/>
8|'abc'|8000<br/>
18|11|9000</br>
5|5|9000</br>
9|4|2000</br>
] (delimiter is '|');</td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of RangeXNPV for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>RangeID</td>
<td>RangeXNPV</td>
</tr>
<tr class="even">
<td>1</td>
<td>$-49.13</td>
</tr>
<tr class="odd">
<td>2</td>
<td>$777.78</td>
</tr>
<tr class="even">
<td>3</td>
<td>$98.77</td>
</tr>
<tr class="odd">
<td>4</td>
<td>$25.51</td>
</tr>
<tr class="even">
<td>5</td>
<td>$250.83</td>
</tr>
<tr class="odd">
<td>6</td>
<td>$20.40</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>
