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
