# Counter Aggregation functions

## Count

 **Count()** returns the number of values aggregated in expression, as defined by a
group by clause.

`Count([distinct] expr)`

**Return data type:** integer

| Argument        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| distinct        | If the word  **distinct**  occurs before the expression, all duplicates are disregarded. |

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in our app to see the
result.

To get the same look as in the result column below, in the properties
panel, under Sorting, switch from Auto to Custom, then deselect
numerical and alphabetical sorting.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|UnitPrice</p>
<p>Astrida|AA|1|4|16</p>
<p>Astrida|AA|7|10|15</p>
<p>Astrida|BB|4|9|9</p>
<p>Betacab|CC|6|5|10</p>
<p>Betacab|AA|5|2|20</p>
<p>Betacab|BB|1|25| 25</p>
<p>Canutility|AA|3|8|15</p>
<p>Canutility|CC|||19</p>
<p>Divadip|CC|2|4|16</p>
<p>Divadip|DD|3|1|25</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Count1:</p>
<p>LOAD Customer,Count(OrderNumber) as OrdersByCustomer Resident Temp Group By Customer;</p></td>
<td><p>Customer OrdersByCustomer</p>
<p>Astrida 3</p>
<p>Betacab 3</p>
<p>Canutility 2</p>
<p>Divadip 2</p>
<p>As long as the dimension Customer is included in the table on the sheet,
otherwise the result for OrdersByCustomer is 3, 2.</p></td>
</tr>
<tr class="even">
<td><p>Given that the Temp table is loaded as in the previous example:</p></td>
<td><p>TotalOrderNumber</p>
<p>10</p></td>
</tr>
<tr class="odd">
<td><p>Given that the Temp table is loaded as in the first example:</p>
<p>LOAD Count(distinct OrderNumber) as TotalOrdersNumber Resident Temp;</p></td>
<td><p>TotalOrderNumber</p>
<p>9</p>
<p>Because there are two values of OrderNumber with the same value, 1.</p></td>
</tr>
</tbody>
</table>

## MissingCount

 **MissingCount()** returns the number of missing values aggregated in the expression, as
defined by a group by clause.

`MissingCount ([distinct] expr )`

**Return data type:** integer

| Argument        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| distinct        | If the word  **distinct**  occurs before the expression, all duplicates are disregarded. |

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in our app to see the
result.

To get the same look as in the result column below, in the properties
panel, under Sorting, switch from Auto to Custom, then deselect
numerical and alphabetical sorting.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|UnitPrice</p>
<p>Astrida|AA|1|4|16</p>
<p>Astrida|AA|7|10|15</p>
<p>Astrida|BB|4|9|9</p>
<p>Betacab|CC|6|5|10</p>
<p>Betacab|AA|5|2|20</p>
<p>Betacab|BB||| 25</p>
<p>Canutility|AA|||15</p>
<p>Canutility|CC| ||19</p>
<p>Divadip|CC|2|4|16</p>
<p>Divadip|DD|3|1|25</p>
<p>] (delimiter is '|');</p>
<p>MissCount1:</p>
<p>LOAD Customer,MissingCount(OrderNumber) as MissingOrdersByCustomer Resident Temp Group By Customer;</p>
<p> </p>
<p>Load MissingCount(OrderNumber) as TotalMissingCount Resident Temp;</p></td>
<td><p>Customer MissingOrdersByCustomer</p>
<p>Astrida 0</p>
<p>Betacab 1</p>
<p>Canutility 2</p>
<p>Divadip 0</p>
<p> </p>
<p>The second statement gives:</p>
<p>TotalMissingCount</p>
<p>3</p>
<p>in a table with that dimension.</p></td>
</tr>
<tr class="even">
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<p>LOAD MissingCount(distinct OrderNumber) as TotalMissingCountDistinct Resident Temp;</p></td>
<td><p>TotalMissingCountDistinct</p>
<p>1</p>
<p>Because there is only oneOrderNumber one missing value.</p></td>
</tr>
</tbody>
</table>

## NullCount

 **NullCount()** returns the number of NULL values aggregated in the expression, as
defined by a group by clause.

`NullCount([distinct] expr )`

**Return data type:** integer

| Argument        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| distinct        | If the word  **distinct**  occurs before the expression, all duplicates are disregarded. |

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in our app to see the
result.

To get the same look as in the result column below, in the properties
panel, under Sorting, switch from Auto to Custom, then deselect
numerical and alphabetical sorting.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Set NULLINTERPRET = NULL;</p>
<p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|CustomerID</p>
<p>Astrida|AA|1|10|1</p>
<p>Astrida|AA|7|18|1</p>
<p>Astrida|BB|4|9|1</p>
<p>Astrida|CC|6|2|1</p>
<p>Betacab|AA|5|4|2</p>
<p>Betacab|BB|2|5|2</p>
<p>Betacab|DD|||</p>
<p>Canutility|AA|3|8|</p>
<p>Canutility|CC|NULL||</p>
<p>] (delimiter is '|');</p>
<p>Set NULLINTERPRET=;</p>
<p>NullCount1:</p>
<p>LOAD Customer,NullCount(OrderNumber) as NullOrdersByCustomer Resident Temp Group By Customer;</p>
<p> </p>
<p>LOAD NullCount(OrderNumber) as TotalNullCount Resident Temp;</p></td>
<td><p>Customer NullOrdersByCustomer</p>
<p>Astrida 0</p>
<p>Betacab 0</p>
<p>Canutility 1</p>
<p> </p>
<p>The second statement gives:</p>
<p>TotalNullCount</p>
<p>1</p>
<p>in a table with that dimension, because only one record contains a null value.</p></td>
</tr>
</tbody>
</table>

## NumericCount

NumericCount() returns the number of numeric values found in the
expression, as defined by a group by clause.

`NumericCount([distinct] expr )`

**Return data type:** integer

| Argument        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| distinct        | If the word  **distinct**  occurs before the expression, all duplicates are disregarded. |

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in our app to see the
result.

To get the same look as in the result column below, in the properties
panel, under Sorting, switch from Auto to Custom, then deselect
numerical and alphabetical sorting.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|UnitPrice</p>
<p>Astrida|AA|1|4|16</p>
<p>Astrida|AA|7|10|15</p>
<p>Astrida|BB|4|9|9</p>
<p>Betacab|CC|6|5|10</p>
<p>Betacab|AA|5|2|20</p>
<p>Betacab|BB||| 25</p>
<p>Canutility|AA|||15</p>
<p>Canutility|CC| ||19</p>
<p>Divadip|CC|2|4|16</p>
<p>Divadip|DD|7|1|25</p>
<p>] (delimiter is '|');</p>
<p>NumCount1:</p>
<p>LOAD Customer,NumericCount(OrderNumber) as NumericCountByCustomer Resident Temp Group By Customer;</p>
<p> </p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>Customer<br />
Astrida<br />
Betacab<br />
Canutility<br />
Divadip</p></td>
<td>NumericCountByCustomer<br />
3<br />
2<br />
0<br />
2</td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td>LOAD NumericCount(OrderNumber) as TotalNumericCount Resident Temp;</td>
<td>The second statement gives:<br />
TotalNumericCount<br />
7<br />
in a table with that dimension.</td>
</tr>
<tr class="odd">
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<p>LOAD NumericCount(distinct OrderNumber) as TotalNumeriCCountDistinct Resident Temp;</p></td>
<td>TotalNumericCountDistinct<br />
6<br />
Because there is one OrderNumber that duplicates another, so the result is 6 that are not duplicates..</td>
</tr>
</tbody>
</table>

## TextCount

TextCount() returns the number of field values that are non-numeric aggregated in
the expression, as defined by a group by clause.

`TextCount ([distinct] expr )`

**Return data type:** integer

| Argument        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| distinct        | If the word  **distinct**  occurs before the expression, all duplicates are disregarded. |

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in our app to see the
result.

To get the same look as in the result column below, in the properties
panel, under Sorting, switch from Auto to Custom, then deselect
numerical and alphabetical sorting.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|UnitPrice</p>
<p>Astrida|AA|1|4|16</p>
<p>Astrida|AA|7|10|15</p>
<p>Astrida|BB|4|9|9</p>
<p>Betacab|CC|6|5|10</p>
<p>Betacab|AA|5|2|20</p>
<p>Betacab|BB||| 25</p>
<p>Canutility|AA|||15</p>
<p>Canutility|CC| ||19</p>
<p>Divadip|CC|2|4|16</p>
<p>Divadip|DD|3|1|25</p>
<p>] (delimiter is '|');</p>
<p>TextCount1:</p>
<p>LOAD Customer,TextCount(Product) as ProductTextCount Resident Temp Group By Customer;</p>
<p></p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>Customer<br />
Astrida<br />
Betacab<br />
Canutility<br />
Divadip</p></td>
<td>ProductTextCount<br />
3<br />
3<br />
2<br />
2</td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="even">
<td>LOAD Customer,TextCount(OrderNumber) as OrderNumberTextCount Resident Temp Group By Customer;</td>
<td><table>
<tbody>
<tr class="odd">
<td><p>Customer<br />
Astrida<br />
Betacab<br />
Canutility<br />
Divadip</p></td>
<td>OrderNumberTextCount<br />
0<br />
1<br />
2<br />
0</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>
