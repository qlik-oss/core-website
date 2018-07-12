# Basic aggregation functions

## FirstSortedValue

 **FirstSortedValue()** returns the value from the expression specified in value that corresponds to the result of sorting the **sort_weight** argument, for example, the name of the product with the lowest unit price. The nth value in the sort order, can be specified in **rank**.
If more than one resulting value shares the same **sort_weight** for the specified **rank** , the function returns NULL. The sorted values are iterated over a number
of records, as defined by a group by clause, or aggregated across the full data set if no group by clause is defined.

`FirstSortedValue( [distinct] value, sort-weight [, rank] )`

**Return data type:** dual

| Argument               | Description|
| ---------------------- | ------------------------------------------ |
| value Expression       | The function finds the value of the expression value that corresponds to the result of sorting .|
| sort-weight Expression | The expression containing the data to be sorted. The first (lowest) value of  **sort_weight** is found, from which the corresponding value of the **value**  expression is determined. If you place a minus sign in front of **sort_weight**, the function returns the last (highest) sorted value instead. |
| rank Expression        | By stating a  "n" larger than 1, you get the nth sorted value.|
| distinct               | If the word **DISTINCT** occurs before the function arguments, duplicates resulting from the evaluation of the function arguments are disregarded.|

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
<p>Customer|Product|OrderNumber|UnitSales|CustomerID</p>
<p>Astrida|AA|1|10|1</p>
<p>Astrida|AA|7|18|1</p>
<p>Astrida|BB|4|9|1</p>
<p>Astrida|CC|6|2|1</p>
<p>Betacab|AA|5|4|2</p>
<p>Betacab|BB|2|5|2</p>
<p>Betacab|DD|12|25|2</p>
<p>Canutility|AA|3|8|3</p>
<p>Canutility|CC|13|19|3</p>
<p>Divadip|AA|9|16|4</p>
<p>Divadip|AA|10|16|4</p>
<p>Divadip|DD|11|10|4</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>FirstSortedValue:</p>
<p>LOAD Customer,FirstSortedValue(Product, UnitSales) as MyProductWithSmallestOrderByCustomer Resident Temp Group By Customer;</p></td>
<td><p>Customer MyProductWithSmallestOrderByCustomer</p>
<p>Astrida CC</p>
<p>Betacab AA</p>
<p>Canutility AA</p>
<p>Divadip DD</p>
<p>The function sorts UnitSales from smallest to largest, looging for the value of Customer with the smallest value of UnitSales, the smallest order.</p>
<p>Because CC corresponds to the smallest order (value of UnitSales=2) for customer Astrida. AA corresponds to the smallest order (4) for customer Betacab, CC corresponds to the smallest order (8) for customer Canutility, and DD corresponds to the smallest order (10) for customer Divadip..</p></td>
</tr>
<tr class="even">
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<p>LOAD Customer,FirstSortedValue(Product, -UnitSales) as MyProductWithLargestOrderByCustomer Resident Temp Group By Customer;</p></td>
<td><p>Customer MyProductWithLargestOrderByCustomer</p>
<p>Astrida AA</p>
<p>Betacab DD</p>
<p>Canutility CC</p>
<p>Divadip -</p>
<p>A minus sign precedes the sort_weight argument, so the function sorts the largest first.</p>
<p>Because AA corresponds to the largest order (value of UnitSales:18) for customer Astrida, DD corresponds to the largest order (12) for customer Betacab, and CC corresponds to the largest order (13) for customer Canutility. There are two identical values for the largest order (16) for customer Divadip, therefore this produces a null result.</p></td>
</tr>
<tr class="odd">
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<p>LOAD Customer,FirstSortedValue(distinct Product, -UnitSales) as MyProductWithSmallestOrderByCustomer Resident Temp Group By Customer;</p></td>
<td><p>Customer MyProductWithLargestOrderByCustomer</p>
<p>Astrida AA</p>
<p>Betacab DD</p>
<p>Canutility CC</p>
<p>Divadip AA</p>
<p>This is the same as the previous example, except the distinct qualifier is used. This causes the duplicate result for Divadip to be disregarded, allowing a non-null value to be returned.</p></td>
</tr>
</tbody>
</table>

## Max

 **Max()** finds the highest numeric value of the aggregated data in the
expression, as defined by a group by clause. By specifying a
**rank** n, the nth highest value can be found.

`Max( expr[, rank] )`

**Return data type:** numeric

| Argument        | Description                  |
| --------------- | ---------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| rank Expression | The default value of  **rank** is 1, which corresponds to the highest value. By specifying **rank** as 2, the second highest value is returned. If **rank** is 3, the third highest value is returned, and so on. |

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
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|CustomerID</p>
<p>Astrida|AA|1|10|1</p>
<p>Astrida|AA|7|18|1</p>
<p>Astrida|BB|4|9|1</p>
<p>Astrida|CC|6|2|1</p>
<p>Betacab|AA|5|4|2</p>
<p>Betacab|BB|2|5|2</p>
<p>Betacab|DD</p>
<p>Canutility|DD|3|8</p>
<p>Canutility|CC</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Max:</p>
<p>LOAD Customer, Max(UnitSales) as MyMax, Resident Temp Group By Customer;</p></td>
<td><p>Customer</p>
<p>Astrida</p>
<p>Betacab</p>
<p>Canutility</p></td>
<td><p>MyMax</p>
<p>18</p>
<p>5</p>
<p>8</p></td>
</tr>
<tr class="even">
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<p>LOAD Customer, Max(UnitSales,2) as MyMaxRank2 Resident Temp Group By Customer;</p></td>
<td><p>Customer</p>
<p>Astrida</p>
<p>Betacab</p>
<p>Canutility</p></td>
<td><p>MyMaxRank2</p>
<p>10</p>
<p>4</p>
<p>-</p></td>
</tr>
</tbody>
</table>

## Min

 **Min()** returns the lowest numeric value of the aggregated data in the
expression, as defined by a group by clause. By specifying a
**rank** n, the nth lowest value can be found.

`Min( expr[, rank] )`

**Return data type:** numeric

| Argument        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| rank Expression | The default value of  **rank** is 1, which corresponds to the lowest value. By specifying **rank** as 2, the second lowest value is returned. If **rank**  is 3, the third lowest value is returned, and so on. |

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
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|CustomerID</p>
<p>Astrida|AA|1|10|1</p>
<p>Astrida|AA|7|18|1</p>
<p>Astrida|BB|4|9|1</p>
<p>Astrida|CC|6|2|1</p>
<p>Betacab|AA|5|4|2</p>
<p>Betacab|BB|2|5|2</p>
<p>Betacab|DD</p>
<p>Canutility|DD|3|8</p>
<p>Canutility|CC</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Min:</p>
<p>LOAD Customer, Min(UnitSales) as MyMin Resident Temp Group By Customer;</p></td>
<td><p>Customer</p>
<p>Astrida</p>
<p>Betacab</p>
<p>Canutility</p></td>
<td><p>MyMin</p>
<p>2</p>
<p>4</p>
<p>8</p></td>
</tr>
<tr class="even">
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<p>LOAD Customer, Min(UnitSales,2) as MyMinRank2 Resident Temp Group By Customer;</p></td>
<td><p>Customer</p>
<p>Astrida</p>
<p>Betacab</p>
<p>Canutility</p></td>
<td><p>MyMinRank2</p>
<p>9</p>
<p>5</p>
<p>-</p></td>
</tr>
</tbody>
</table>

### Mode

 **Mode()** returns the most commonly-occurring value, the mode value, of the
aggregated data in the expression, as defined by a
group by clause. The **Mode()** function can return numeric values as well as text values.

`Mode ( expr )`

**Return data type:** dual

| Argument        | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured. |

If more than one value is equally commonly occurring, NULL is returned.

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
<p>Customer|Product|OrderNumber|UnitSales|CustomerID</p>
<p>Astrida|AA|1|10|1</p>
<p>Astrida|AA|7|18|1</p>
<p>Astrida|BB|4|9|1</p>
<p>Astrida|CC|6|2|1</p>
<p>Betacab|AA|5|4|2</p>
<p>Betacab|BB|2|5|2</p>
<p>Betacab|DD</p>
<p>Canutility|DD|3|8</p>
<p>Canutility|CC</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Mode:</p>
<p>LOAD Customer, Mode(Product) as MyMostOftenSoldProduct Resident Temp Group By Customer;</p></td>
<td><p>MyMostOftenSoldProduct</p>
<p>AA</p>
<p>because AA is the only product sold more than once.</p></td>
</tr>
</tbody>
</table>

## Only

 **Only()** returns a value if there is one and only one possible result from the
aggregated data. If records contain only one value then that value is
returned, otherwise NULL is returned. Use the
group by clause to evaluate over multiple records. The **Only()** 
function can return numeric and text values.

`Only ( expr )`

**Return data type:** dual

| Argument        | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured. |

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
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|CustomerID</p>
<p>Astrida|AA|1|10|1</p>
<p>Astrida|AA|7|18|1</p>
<p>Astrida|BB|4|9|1</p>
<p>Astrida|CC|6|2|1</p>
<p>Betacab|AA|5|4|2</p>
<p>Betacab|BB|2|5|2</p>
<p>Betacab|DD</p>
<p>Canutility|DD|3|8</p>
<p>Canutility|CC</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Only:</p>
<p>LOAD Customer, Only(CustomerID) as MyUniqIDCheck Resident Temp Group By Customer;</p></td>
<td><p>Customer</p>
<p>Astrida</p>
<p> </p></td>
<td><p>MyUniqIDCheck</p>
<p>1</p>
<p>because only customer Astrida has complete records that include CustomerID.</p></td>
</tr>
</tbody>
</table>

## Sum

 **Sum()**  calculates the total of the values aggregated in the expression, as defined by a group by clause.

`sum( [ distinct] expr )`

| Argument        | Description                                                                                  |
| --------------- |--------------------------------------------------------------------------------------------- |
| distinct        | If the word  **distinct**  occurs before the expression, all duplicates will be disregarded. |
| expr Expression | The expression or field containing the data to be measured.|

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
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Temp:</p>
<p>LOAD * inline [</p>
<p>Customer|Product|OrderNumber|UnitSales|CustomerID</p>
<p>Astrida|AA|1|10|1</p>
<p>Astrida|AA|7|18|1</p>
<p>Astrida|BB|4|9|1</p>
<p>Astrida|CC|6|2|1</p>
<p>Betacab|AA|5|4|2</p>
<p>Betacab|BB|2|5|2</p>
<p>Betacab|DD</p>
<p>Canutility|DD|3|8</p>
<p>Canutility|CC</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Sum:</p>
<p>LOAD Customer, Sum(UnitSales) as MySum Resident Temp Group By Customer;</p></td>
<td><p>Customer</p>
<p>Astrida</p>
<p>Betacab</p>
<p>Canutility</p></td>
<td><p>MySum</p>
<p>39</p>
<p>9</p>
<p>8</p></td>
</tr>
</tbody>
</table>

# Counter Aggregation functions

## Count

 **Count()** returns the number of values aggregated in expression, as defined by a
group by clause.

`Count( [distinct] expr)`

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
<p>As long as the dimension Customer is included in the table on the sheet, otherwise the result for OrdersByCustomer is 3, 2.</p></td>
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

### MissingCount

 **MissingCount()** returns the number of missing values aggregated in the expression, as
defined by a group by clause.

`MissingCount ( [distinct] expr )`

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

`NullCount( [distinct] expr )`

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

# NumericCount

NumericCount() returns the number of numeric values found in the
expression, as defined by a group by clause.

`NumericCount( [distinct] expr )`

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

`TextCount ( [distinct] expr )`

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
<p> </p></td>
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

# Financial aggregation functions

## IRR

 **IRR()** 
returns the aggregated internal rate of return for a series of cash
flows represented by the numbers in the expression iterated over a
number of records as defined by a group by clause.

These cash flows do not have to be even, as they would be for an
annuity. However, the cash flows must occur at regular intervals, such
as monthly or annually. The internal rate of return is the interest rate
received for an investment consisting of payments (negative values) and
income (positive values) that occur at regular periods.The function
needs at least one positive and one negative value to
calculate.

`IRR( value )`

**Return data type:** numeric

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| value    | The expression or field containing the data to be measured. |

Text values, NULL values and missing values are disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Cashflow:</p>
<p>LOAD 2013 as Year, * inline [</p>
<p>Date|Discount|Payments</p>
<p>2013-01-01|0.1|-10000</p>
<p>2013-03-01|0.1|3000</p>
<p>2013-10-30|0.1|4200</p>
<p>2014-02-01|0.2|6800</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Cashflow1:</p>
<p>LOAD Year,IRR(Payments) as IRR2013 Resident Cashflow Group By Year;</p></td>
<td><p>Year</p>
<p>2013</p></td>
<td><p>IRR2013</p>
<p>0.1634</p></td>
</tr>
</tbody>
</table>

## NPV

NPV() returns the aggregated net present value of an investment based on a
 **discount_rate** per period and a series of future payments (negative values) and incomes
(positive values), represented by the numbers in **value** ,
iterated over a number of records, as defined by a group by clause. The
payments and incomes are assumed to occur at the end of each period.

`NPV( discount_rate, value )`

**Return data type:** numeric. The result has a default number format of money. 

| Argument       | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| discount_rate  |  **discount_rate**  is the rate of discount over the length of the period. |
| value          | The expression or field containing the data to be measured.                |

Text values, NULL values and missing values are disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

Example:
```
Cashflow:
LOAD 2013 as Year, * inline [
Date|Discount|Payments
2013-01-01|0.1|-10000
2013-03-01|0.1|3000
2013-10-30|0.1|4200
2014-02-01|0.2|6800
] (delimiter is '|');

Cashflow1:
LOAD Year,NPV(0.2, Payments) as NPV1_2013 Resident Cashflow Group By Year;
```

Result:
**Year 2013**
NPV1_2013 -$540.12

Given that the Cashflow table is loaded as in the previous example:

```
LOAD Year,NPV(Discount, Payments) as NPV2_2013 Resident Cashflow Group
By Year, Discount;
```

Note that the Group By clause sorts the results by Year and Discount.
The first argument, discount_rate, is given as a field (Discount),
rather than a specific number, and therefore, a second sorting criterion
is required. A field can contain a different values, so the aggregated
records must be sorted to allow for different values of Year and
Discount.

<table>
<tbody>
<tr class="odd">
<td><p>Year</p>
<p>2013<br />
2013</p></td>
<td><p>Discount</p>
<p>0.1<br />
0.2</p></td>
<td>NPV2_2013
<p><br />
-$3456.05<br />
$5666.67</p></td>
</tr>
</tbody>
</table>

## XIRR

 **XIRR()** returns the aggregated internal rate of return for a schedule of cash
flows (that is not necessarily periodic) represented by paired numbers
in **pmt** and **date** iterated over a number of records as defined by a group by clause. All
payments are discounted based on a 365-day year.

`XIRR( pmt, date )`

**Return data type:** numeric

| Argument | Description                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| pmt      | Payments.The expression or field containing the cash flows corresponding to the payment schedule given in date. |
| date     | The expression or field containing the schedule of dates corresponding to the cash flow payments given in pmt.  |

Text values, NULL values and missing values in any or both pieces of a
data-pair will result in the entire data-pair to be disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Cashflow:</p>
<p>LOAD 2013 as Year, * inline [</p>
<p>Date|Discount|Payments</p>
<p>2013-01-01|0.1|-10000</p>
<p>2013-03-01|0.1|3000</p>
<p>2013-10-30|0.1|4200</p>
<p>2014-02-01|0.2|6800</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Cashflow1:</p>
<p>LOAD Year,XIRR(Payments, Date) as XIRR2013 Resident Cashflow Group By Year;</p></td>
<td><p>Year</p>
<p>2013</p></td>
<td><p>XIRR2013</p>
<p>0.5385</p></td>
</tr>
</tbody>
</table>

### XNPV

 **XNPV()** returns the aggregated net present value for a schedule of cashflows
(not necessarily periodic) represented by paired numbers in **pmt** and
 **date**, iterated over a number of records as defined by a group by clause. Rate
is the interest rate per period. All payments are discounted based on a
365-day year.

`XNPV( discount_rate, pmt, date )``

**Return data type:** numeric. The result has a default number format of money.
 

| Argument       | Description                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| discount_rate  |  **discount_rate**  is the rate of discount over the length of the period.                                          |
| pmt            | The expression or field containing the data to be measured.                                                         |
| date           | The expression or field containing the schedule of dates corresponding to the cash flow payments given in  **pmt**. |

Text values, NULL values and missing values in any or both pieces of a
data-pair will result in the entire data-pair to be disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

Example:

```
Cashflow:
LOAD 2013 as Year, \* inline [
Date|Discount|Payments
2013-01-01|0.1|-10000
2013-03-01|0.1|3000
2013-10-30|0.1|4200
2014-02-01|0.2|6800
] (delimiter is '|');

Cashflow1:
LOAD Year,XNPV(0.2, Payments, Date) as XNPV1_2013 Resident Cashflow Group By Year;
```

Result:
**Year 2013** XNPV1_2013 $2104.37

Given that the Cashflow table is loaded as in the previous example:

LOAD Year,XNPV(Discount, Payments, Date) as XNPV2_2013 Resident
Cashflow Group By Year, Discount;

Note that the Group By clause sorts the results by Year and Discount.
The first argument, discount_rate, is given as a field (Discount),
rather than a specific number, and therefore, a second sorting criterion
is required. A field can contain a different values, so the aggregated
records must be sorted to allow for different values of Year and
Discount.

<table>
<tbody>
<tr class="odd">
<td><p>Year</p>
<p>2013<br />
2013</p></td>
<td><p>Discount</p>
<p>0.1<br />
0.2</p></td>
<td><p>XNPV2_2013</p>
<p>-$3164.35<br />
$6800.00</p></td>
</tr>
</tbody>
</table>

# StatisticalAggregationFunctions

### Avg

 **Avg()** finds the average value of the aggregated data in the expression over a
number of records as defined by a group by clause.

`Avg( [DISTINCT] expr )`

**Return data type:** numeric

| Argument | Description                                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured.                                  |
| DISTINCT | If the word  **distinct**  occurs before the expression, all duplicates will be disregarded. |

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

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
<p>crosstable (Month, Sales) load * inline [</p>
<p>Customer|Jan|Feb|Mar||Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec</p>
<p>Astrida|46|60|70|13|78|20|45|65|78|12|78|22</p>
<p>Betacab|65|56|22|79|12|56|45|24|32|78|55|15</p>
<p>Canutility|77|68|34|91|24|68|57|36|44|90|67|27</p>
<p>Divadip|36|44|90|67|27|57|68|47|90|80|94</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Avg1:</p>
<p>LOAD Customer, Avg(Sales) as MyAverageSalesByCustomer Resident Temp Group By Customer;</p>
<p> </p></td>
<td><p>Customer MyAverageSalesByCustomer</p>
<p>Astrida 48.916667</p>
<p>Betacab 44.916667</p>
<p>Canutility 56.916667</p>
<p>Divadip 63.083333</p>
This can be checked in the sheet by creating a table including the measure:<br />
Sum(Sales)/12</td>
</tr>
<tr class="even">
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<p>LOAD Customer,Avg(DISTINCT Sales) as MyAvgSalesDistinct Resident Temp Group By Customer;</p></td>
<td><p>Customer MyAverageSalesByCustomer</p>
<p>Astrida 43.1</p>
<p>Betacab 43.909091</p>
<p>Canutility 55.909091</p>
<p>Divadip 61</p>
Only the distinct values are counted. Divide the total by the number of non-duplicate values.</td>
</tr>
</tbody>
</table>

## Correl

 **Correl()** returns the aggregated correlation coefficient for a series of
coordinates represented by paired numbers in x-expression and
y-expression iterated over a number of records as defined by a
group by clause.

`Correl( value1, value2 )`

**Return data type:** numeric

| Argument       | Description                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| value1, value2 | The expressions or fields containing the two sample sets for which the correlation coefficient is to be measured. |

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Salary:</p>
<p>Load *, 1 as Grp;</p>
<p>LOAD * inline [</p>
<p>&quot;Employee name&quot;|Gender|Age|Salary</p>
<p>Aiden Charles|Male|20|25000</p>
<p>Brenda Davies|Male|25|32000</p>
<p>Charlotte Edberg|Female|45|56000</p>
<p>Daroush Ferrara|Male|31|29000</p>
<p>Eunice Goldblum|Female|31|32000</p>
<p>Freddy Halvorsen|Male|25|26000</p>
<p>Gauri Indu|Female|36|46000</p>
<p>Harry Jones|Male|38|40000</p>
<p>Ian Underwood|Male|40|45000</p>
<p>Jackie Kingsley|Female|23|28000</p>
<p>] (delimiter is '|');</p>
 
<p>Correl1:</p>
<p>LOAD Grp,</p>
<p>Correl(Age,Salary) as Correl_Salary Resident Salary Group By Grp;</p>
<p> </p></td>
<td>In a table with the dimension Correl_Salary, the result of the Correl() calculation in the data load script will be shown: 0.9270611</td>
</tr>
</tbody>
</table>

## Fractile

**Fractile()** finds the value that corresponds to the fractile (quantile) of the
aggregated data in the expression over a number of records as defined by a
group by clause.

`Fractile( expr, fraction )``

**Return data type:** numeric 

| Argument | Description                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured.                                                 |
| fraction | A number between 0 and 1 corresponding to the fractile (quantile expressed as a fraction) to be calculated. |

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Table1:</p>
<p>crosstable LOAD recno() as ID, * inline [</p>
<p>Observation|Comparison</p>
<p>35|2</p>
<p>40|27</p>
<p>12|38</p>
<p>15|31</p>
<p>21|1</p>
<p>14|19</p>
<p>46|1</p>
<p>10|34</p>
<p>28|3</p>
<p>48|1</p>
<p>16|2</p>
<p>30|3</p>
<p>32|2</p>
<p>48|1</p>
<p>31|2</p>
<p>22|1</p>
<p>12|3</p>
<p>39|29</p>
<p>19|37</p>
<p>25|2 ] (delimiter is '|');</p>
 
<p>Fractile1:</p>
<p>LOAD Type,</p>
<p>Fractile(Value,0.75) as MyFractile Resident Table1 Group By Type;</p>
<p> </p></td>
<td><p>In a table with the dimensions Type and MyFractile, the results of the Fractile() calculations in the data load script are:</p>
<p>Type MyFractile</p>
<p>Comparison 27.5</p>
<p>Observation 36</p></td>
</tr>
</tbody>
</table>

## Kurtosis

 **Kurtosis()** returns the kurtosis of the data in the expression over a number of
records as defined by a group by clause.

`Kurtosis( [distinct ] expr )`

**Return data type:** numeric

| Argument | Description                                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured.                                  |
| distinct | If the word  **distinct**  occurs before the expression, all duplicates will be disregarded. |

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Table1:</p>
<p>crosstable LOAD recno() as ID, * inline [</p>
<p>Observation|Comparison</p>
<p>35|2</p>
<p>40|27</p>
<p>12|38</p>
<p>15|31</p>
<p>21|1</p>
<p>14|19</p>
<p>46|1</p>
<p>10|34</p>
<p>28|3</p>
<p>48|1</p>
<p>16|2</p>
<p>30|3</p>
<p>32|2</p>
<p>48|1</p>
<p>31|2</p>
<p>22|1</p>
<p>12|3</p>
<p>39|29</p>
<p>19|37</p>
<p>25|2 ] (delimiter is '|');</p>
 
<p>Kurtosis1:</p>
<p>LOAD Type,</p>
<p>Kurtosis(Value) as MyKurtosis1,</p>
<p>Kurtosis(DISTINCT Value) as MyKurtosis2</p>
<p>Resident Table1 Group By Type;</p>
<p> </p></td>
<td><p>In a table with the dimensions Type, MyKurtosis1,and MyKurtosis2, the results of the Kurtosis() calculations in the data load script are:</p>
<p>Type MyKurtosis1 MyKurtosis2</p>
<p>Comparison -1.1612957 -1.4982366</p>
<p>Observation -1.1148768 -0.93540144</p></td>
</tr>
</tbody>
</table>

## LINEST_B

 **LINEST_B()** 
returns the aggregated b value (y-intercept) of a linear regression
defined by the equation y=mx+b for a series of coordinates represented
by paired numbers in x-expression and y-expression iterated over a
number of records as defined by a group by clause.

`LINEST_B( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

## LINEST_DF

 **LINEST_DF()** 
returns the aggregated degrees of freedom of a linear regression defined
by the equation y=mx+b for a series of coordinates represented by paired
numbers in x-expression and y-expression iterated over a number of
records as defined by a group by clause.

`LINEST_DF( y_value, x_value[, y0 [, x0 ]] )`
**Return data type:** numeric 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

# LINEST_F

This script function returns the aggregated F statistic
(r<sup>2</sup>/(1-r<sup>2</sup>))
of a linear regression defined by the equation y=mx+b for a series of
coordinates represented by paired numbers in x-expression and
y-expression iterated over a number of records as defined by a
group by clause.

`LINEST_F( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

## LINEST_M

 **LINEST_M()** 
returns the aggregated m value (slope) of a linear regression defined by
the equation y=mx+b for a series of coordinates represented by paired
numbers in x-expression and y-expression iterated over a number of
records as defined by a group by clause.

`LINEST_M( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

## LINEST_R2

LINEST_R2() returns the aggregated
r<sup>2</sup> value (coefficient of determination) of a linear regression defined by
the equation y=mx+b for a series of coordinates represented by paired
numbers in x-expression and y-expression iterated over a number of
records as defined by a
group by clause.

`LINEST_R2( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

# LINEST_SEB

 **LINEST_SEB()** 
returns the aggregated standard error of the b value of a linear
regression defined by the equation y=mx+b for a series of coordinates
represented by paired numbers in x-expression and y-expression iterated
over a number of records as defined by a
group by clause.

`LINEST_SEB( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

# LINEST_SEM

 **LINEST_SEM()** 
returns the aggregated standard error of the m value of a linear
regression defined by the equation y=mx+b for a series of coordinates
represented by paired numbers in x-expression and y-expression iterated
over a number of records as defined by a group by clause.

`LINEST_SEM( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

# LINEST_SEY

 **LINEST_SEY()** 
returns the aggregated standard error of the y estimate of a linear
regression defined by the equation y=mx+b for a series of coordinates
represented by paired numbers in x-expression and y-expression iterated
over a number of records as defined by a group by clause.

`LINEST_SEY( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

# LINEST_SSREG

LINEST_SSREG()
returns the aggregated regression sum of squares of a linear regression
defined by the equation y=mx+b for a series of coordinates represented
by paired numbers in x-expression and y-expression iterated over a
number of records as defined by a
group by clause.

`LINEST_SSREG( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

# LINEST_SSRESID

 **LINEST_SSRESID()** 
returns the aggregated residual sum of squares of a linear regression
defined by the equation y=mx+b for a series of coordinates represented
by paired numbers in x-expression and y-expression iterated over a
number of records as defined by a group by clause.

`LINEST_SSRESID( y_value, x_value[, y0 [, x0 ]] )`

**Return data type:** numeric 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>y_value</td>
<td>The expression or field containing the range of y-values to be measured.</td>
</tr>
<tr class="even">
<td>x_value</td>
<td>The expression or field containing the range of x-values to be measured.</td>
</tr>
<tr class="odd">
<td>y(0), x(0)</td>
<td><p>An optional value y0 may be stated forcing the regression line to pass through the y-axis at a given point. By stating both y0 and x0 it is possible to force the regression line to pass through a single fixed coordinate.</p>
<p>Unless both y0 and x0 are stated, the function requires at least two valid data-pairs to calculate. If y0 and x0 are stated, a single data pair will do. </p></td>
</tr>
</tbody>
</table>

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

# Median

 **Median()** 
returns the aggregated median of the values in the expression over a
number of records as defined by a group by clause.

`Median( expr )`

**Return data type:** numeric

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

Add the example script to your app and run it. Then build a straight table with
Type and MyMedian as dimensions.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Table1:</p>
<p>crosstable LOAD recno() as ID, * inline [</p>
<p>Observation|Comparison</p>
<p>35|2</p>
<p>40|27</p>
<p>12|38</p>
<p>15|31</p>
<p>21|1</p>
<p>14|19</p>
<p>46|1</p>
<p>10|34</p>
<p>28|3</p>
<p>48|1</p>
<p>16|2</p>
<p>30|3</p>
<p>32|2</p>
<p>48|1</p>
<p>31|2</p>
<p>22|1</p>
<p>12|3</p>
<p>39|29</p>
<p>19|37</p>
<p>25|2 ] (delimiter is '|');</p>
 
<p>Median1:</p>
<p>LOAD Type,</p>
<p>Median(Value) as MyMedian</p>
<p>Resident Table1 Group By Type;</p>
<p> </p></td>
<td><p>The results of the Median() calculation are:</p>
<ul>
<li>Type is MyMedian</li>
<li>Comparison is 2.5</li>
<li>Observation is 26.5</li>
</ul></td>
</tr>
</tbody>
</table>

## Skew

 **Skew()** 
returns the skewness of expression over a number of records as defined
by a group by clause.

`Skew( [ distinct] expr )``

**Return data type:** numeric

| Argument | Description                                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured.                                  |
| DISTINCT | If the word  **distinct**  occurs before the expression, all duplicates will be disregarded. |

Add the example script to your app and run it. Then build a straight
table with Type and MySkew as dimensions.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Table1:</p>
<p>crosstable LOAD recno() as ID, * inline [</p>
<p>Observation|Comparison</p>
<p>35|2</p>
<p>40|27</p>
<p>12|38</p>
<p>15|31</p>
<p>21|1</p>
<p>14|19</p>
<p>46|1</p>
<p>10|34</p>
<p>28|3</p>
<p>48|1</p>
<p>16|2</p>
<p>30|3</p>
<p>32|2</p>
<p>48|1</p>
<p>31|2</p>
<p>22|1</p>
<p>12|3</p>
<p>39|29</p>
<p>19|37</p>
<p>25|2 ] (delimiter is '|');</p>
 
<p>Skew1:</p>
<p>LOAD Type,</p>
<p>Skew(Value) as MySkew</p>
<p>Resident Table1 Group By Type;</p>
<p> </p></td>
<td><p>The results of the Skew() calculation are:</p>
<ul>
<li>Type is MySkew</li>
<li>Comparison is 0.86414768</li>
<li>Observation is 0.32625351</li>
</ul></td>
</tr>
</tbody>
</table>

### Stdev

 **Stdev()** 
returns the standard deviation of the values given by the expression
over a number of records as defined by a group by clause.

`Stdev( [distinct] expr )`

**Return data type:** numeric

| Argument | Description                                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured.                                  |
| distinct | If the word  **distinct**  occurs before the expression, all duplicates will be disregarded. |

Add the example script to your app and run it. Then build a straight
table with Type and MyStdev as dimensions.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Table1:</p>
<p>crosstable LOAD recno() as ID, * inline [</p>
<p>Observation|Comparison</p>
<p>35|2</p>
<p>40|27</p>
<p>12|38</p>
<p>15|31</p>
<p>21|1</p>
<p>14|19</p>
<p>46|1</p>
<p>10|34</p>
<p>28|3</p>
<p>48|1</p>
<p>16|2</p>
<p>30|3</p>
<p>32|2</p>
<p>48|1</p>
<p>31|2</p>
<p>22|1</p>
<p>12|3</p>
<p>39|29</p>
<p>19|37</p>
<p>25|2 ] (delimiter is '|');</p>
 
<p>Stdev1:</p>
<p>LOAD Type,</p>
<p>Stdev(Value) as MyStdev</p>
<p>Resident Table1 Group By Type;</p></td>
<td><p>The results of the Stdev() calculation are:</p>
<ul>
<li>Type is MyStdev</li>
<li>Comparison is 14.61245</li>
<li>Observation is 12.507997</li>
</ul></td>
</tr>
</tbody>
</table>

## Sterr

 **Sterr()** 
returns the aggregated standard error (stdev/sqrt(n)) for a series of
values represented by the expression iterated over a number of records
as defined by a group by clause.

`Sterr( [distinct] expr )`
**Return data type:** numeric

| Argument | Description                                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured.                                  |
| distinct | If the word  **distinct**  occurs before the expression, all duplicates will be disregarded. |

Text values, NULL values and missing values are disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Table1:</p>
<p>crosstable LOAD recno() as ID, * inline [</p>
<p>Observation|Comparison</p>
<p>35|2</p>
<p>40|27</p>
<p>12|38</p>
<p>15|31</p>
<p>21|1</p>
<p>14|19</p>
<p>46|1</p>
<p>10|34</p>
<p>28|3</p>
<p>48|1</p>
<p>16|2</p>
<p>30|3</p>
<p>32|2</p>
<p>48|1</p>
<p>31|2</p>
<p>22|1</p>
<p>12|3</p>
<p>39|29</p>
<p>19|37</p>
<p>25|2 ] (delimiter is '|');</p>
 
<p>Sterr1:</p>
<p>LOAD Type,</p>
<p>Sterr(Value) as MySterr</p>
<p>Resident Table1 Group By Type;</p></td>
<td><p>In a table with the dimensions Type and MySterr, the results of the Sterr() calculation in the data load script are:</p>
<p>Type MySterr</p>
<p>Comparison 3.2674431</p>
<p>Observation 2.7968733</p></td>
</tr>
</tbody>
</table>

## STEYX

 **STEYX()** 
returns the aggregated standard error of the predicted y-value for each
x-value in the regression for a series of coordinates represented by
paired numbers in x-expression and y-expression iterated over a number
of records as defined by a group by clause.

`STEYX( y_value, x_value )``

**Return data type:** numeric

| Argument | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| y_value  | The expression or field containing the range of y-values to be measured. |
| x_value  | The expression or field containing the range of x-values to be measured. |

Text values, NULL values and missing values in any or both pieces of a
data-pair result in the entire data-pair being disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Trend:</p>
<p>Load *, 1 as Grp;</p>
<p>LOAD * inline [</p>
<p>Month|KnownY|KnownX</p>
<p>Jan|2|6</p>
<p>Feb|3|5</p>
<p>Mar|9|11</p>
<p>Apr|6|7</p>
<p>May|8|5</p>
<p>Jun|7|4</p>
<p>Jul|5|5</p>
<p>Aug|10|8</p>
<p>Sep|9|10</p>
<p>Oct|12|14</p>
<p>Nov|15|17</p>
<p>Dec|14|16</p>
<p>] (delimiter is '|');</p>
 
<p>STEYX1:</p>
<p>LOAD Grp,</p>
<p>STEYX(KnownY, KnownX) as MySTEYX</p>
<p>Resident Trend Group By Grp;</p></td>
<td><p>In a table with the dimension MySTEYX, the result of the STEYX() calculation in the data load script is 2.0714764.</p></td>
</tr>
</tbody>
</table>

# Statistical test functions

## Chi2Test_chi2

Chi2Test_chi2() returns the aggregated chi2-test value for one or two series of values.
If the function is used in the data load script, the values are iterated over a number of records as defined by a group by clause.
If the function is used in a chart expression, the values are iterated over the chart dimensions.

`Chi2Test_chi2( col, row, actual_value[, expected_value] )`

**Return data type:** numeric

| Argument       | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| col, row       | The specified column and row in the matrix of values being tested.    |
| actual_value   | The observed value of the data at the specified col and row.          |
| expected_value | The expected value for the distribution at the specified col and row. |

Limitations:  
Text values, NULL values and missing values in the expression value will result in the function returning NULL.

## Chi2Test_df

Chi2Test_df() returns the aggregated chi2-test df value (degrees of freedom) for one or two series of values.
If the function is used in the data load script, the values are iterated over a number of records as defined by a group by clause.
If the function is used in a chart expression, the values are iterated over the chart dimensions.

`Chi2Test_df( col, row, actual_value[, expected_value] )`

**Return data type:** numeric

| Argument       | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| col, row       | The specified column and row in the matrix of values being tested.    |
| actual_value   | The observed value of the data at the specified col and row.          |
| expected_value | The expected value for the distribution at the specified col and row. |

Limitations:  
Text values, NULL values and missing values in the expression value will result in the function returning NULL

## Chi2Test_p

Chi2Test_p() returns the aggregated chi2-test p value (significance) for one or two series of values. The test can be done either on the values in actual_value, testing for variations within the specified col and row matrix, or by comparing values in actual_value with corresponding values in expected_value, if specified.
If the function is used in the data load script, the values are iterated over a number of records as defined by a group by clause.
If the function is used in a chart expression, the values are iterated over the chart dimensions.

`Chi2Test_p( col, row, actual_value[, expected_value] )`

**Return data type:** numeric

| Argument       | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| col, row       | The specified column and row in the matrix of values being tested.    |
| actual_value   | The observed value of the data at the specified col and row.          |
| expected_value | The expected value for the distribution at the specified col and row. |

Limitations:  
Text values, NULL values and missing values in the expression value will result in the function returning NULL.







# String aggregation functions

## Concat

 **Concat()** 
is used to combine string values. The script function returns the
aggregated string concatenation of all values of the expression iterated
over a number of records as defined by a group by clause.

`Concat( [ distinct ] string [, delimiter [, sort-weight]] )`

**Return data type:** string

The expression or field containing the string to be processed.

| Argument    | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| string      | The expression or field containing the string to be processed.|
| delimiter   | Each value may be separated by the string found in delimiter.|
| sort-weight | The order of concatenation may be determined by the value of the dimension , if present, with the string corresponding to the lowest value appearing first in the concatenation. |
| distinct    | If the word **distinct occurs before the expression, all duplicates are disregarded.                                            

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

Example

Result

 

TeamData:

LOAD \* inline [

SalesGroup|Team|Date|Amount

East|Gamma|01/05/2013|20000

East|Gamma|02/05/2013|20000

West|Zeta|01/06/2013|19000

East|Alpha|01/07/2013|25000

East|Delta|01/08/2013|14000

West|Epsilon|01/09/2013|17000

West|Eta|01/10/2013|14000

East|Beta|01/11/2013|20000

West|Theta|01/12/2013|23000

] (delimiter is '|');

 

Concat1:

LOAD SalesGroup,Concat(Team) as TeamConcat1 Resident TeamData Group By
SalesGroup;

SalesGroup

East

West

TeamConcat1

AlphaBetaDeltaGammaGamma

EpsilonEtaThetaZeta

Given that the TeamData table is loaded as in the previous example:

LOAD SalesGroup,Concat(distinct Team,'-') as TeamConcat2 Resident
TeamData Group By SalesGroup;

SalesGroup

East

West

TeamConcat2

Alpha-Beta-Delta-Gamma

Epsilon-Eta-Theta-Zeta

Given that the TeamData table is loaded as in the previous example:

LOAD SalesGroup,Concat(distinct Team,'-',Amount) as TeamConcat2 Resident
TeamData Group By SalesGroup;

Because the argument for
 **sort-weight** 
is added, the results are ordered by the value of the dimension
Amount.

SalesGroup

East

West

TeamConcat2

Delta-Beta-Gamma-Alpha

Eta-Epsilon-Zeta-Theta

## FirstValue

 **FirstValue()** 
returns the value that was loaded first from the records defined by the
expression, sorted by a group by clause.

This function is only available as a script function.

`FirstValue( expr )`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.


Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>TeamData:</p>
<p>LOAD * inline [</p>
<p>SalesGroup|Team|Date|Amount</p>
<p>East|Gamma|01/05/2013|20000</p>
<p>East|Gamma|02/05/2013|20000</p>
<p>West|Zeta|01/06/2013|19000</p>
<p>East|Alpha|01/07/2013|25000</p>
<p>East|Delta|01/08/2013|14000</p>
<p>West|Epsilon|01/09/2013|17000</p>
<p>West|Eta|01/10/2013|14000</p>
<p>East|Beta|01/11/2013|20000</p>
<p>West|Theta|01/12/2013|23000</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>FirstValue1:</p>
<p>LOAD SalesGroup,FirstValue(Team) as FirstTeamLoaded Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>FirstTeamLoaded</p>
<p>Gamma</p>
<p>Zeta</p></td>
</tr>
</tbody>
</table>

## LastValue

 **LastValue()** 
returns the value that was loaded last from the records defined by the
expression, sorted by a group by clause.

This function is only available as a script function.

`LastValue( expr )`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

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
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>TeamData:</p>
<p>LOAD * inline [</p>
<p>SalesGroup|Team|Date|Amount</p>
<p>East|Gamma|01/05/2013|20000</p>
<p>East|Gamma|02/05/2013|20000</p>
<p>West|Zeta|01/06/2013|19000</p>
<p>East|Alpha|01/07/2013|25000</p>
<p>East|Delta|01/08/2013|14000</p>
<p>West|Epsilon|01/09/2013|17000</p>
<p>West|Eta|01/10/2013|14000</p>
<p>East|Beta|01/11/2013|20000</p>
<p>West|Theta|01/12/2013|23000</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>LastValue1:</p>
<p>LOAD SalesGroup,LastValue(Team) as LastTeamLoaded Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>LastTeamLoaded</p>
<p>Beta</p>
<p>Theta</p></td>
</tr>
</tbody>
</table>

## MaxString

 **MaxString()** 
finds string values in the expression and returns the last text value
sorted over a number of records, as defined by a group by clause.

`MaxString( expr )`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>TeamData:</p>
<p>LOAD * inline [</p>
<p>SalesGroup|Team|Date|Amount</p>
<p>East|Gamma|01/05/2013|20000</p>
<p>East|Gamma|02/05/2013|20000</p>
<p>West|Zeta|01/06/2013|19000</p>
<p>East|Alpha|01/07/2013|25000</p>
<p>East|Delta|01/08/2013|14000</p>
<p>West|Epsilon|01/09/2013|17000</p>
<p>West|Eta|01/10/2013|14000</p>
<p>East|Beta|01/11/2013|20000</p>
<p>West|Theta|01/12/2013|23000</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Concat1:</p>
<p>LOAD SalesGroup,MaxString(Team) as MaxString1 Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>MaxString1</p>
<p>Gamma</p>
<p>Zeta</p></td>
</tr>
<tr class="even">
<td><p>Given that the TeamData table is loaded as in the previous example, and your data load script has the SET statement:<br />
<code data-conditions="Targets.NotToTranslate" data-autonumposition="none">SET DateFormat='DD/MM/YYYY';</code>':</p>
<p>LOAD SalesGroup,MaxString(Date) as MaxString2 Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>MaxString2</p>
<p>01/11/2013</p>
<p>01/12/2013</p></td>
</tr>
</tbody>
</table>

## MinString

 **MaxString()** 
finds string values in the expression and returns the first text value
sorted over a number of records, as defined by a group by clause.

`MinString( expr )`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>TeamData:</p>
<p>LOAD * inline [</p>
<p>SalesGroup|Team|Date|Amount</p>
<p>East|Gamma|01/05/2013|20000</p>
<p>East|Gamma|02/05/2013|20000</p>
<p>West|Zeta|01/06/2013|19000</p>
<p>East|Alpha|01/07/2013|25000</p>
<p>East|Delta|01/08/2013|14000</p>
<p>West|Epsilon|01/09/2013|17000</p>
<p>West|Eta|01/10/2013|14000</p>
<p>East|Beta|01/11/2013|20000</p>
<p>West|Theta|01/12/2013|23000</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Concat1:</p>
<p>LOAD SalesGroup,MinString(Team) as MinString1 Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>MinString1</p>
<p>Alpha</p>
<p>Epsilon</p></td>
</tr>
<tr class="even">
<td><p>Given that the TeamData table is loaded as in the previous example, and your data load script has the SET statement:<br />
<code data-conditions="Targets.NotToTranslate" data-autonumposition="none">SET DateFormat='DD/MM/YYYY';</code>':</p>
<p>LOAD SalesGroup,MinString(Date) as MinString2 Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>MinString2</p>
<p>01/05/2013</p>
<p>01062/2013</p></td>
</tr>
</tbody>
</table>