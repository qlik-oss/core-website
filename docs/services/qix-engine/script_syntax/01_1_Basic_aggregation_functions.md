# Basic aggregation functions

## FirstSortedValue

**FirstSortedValue()** returns the value from the expression specified in value that corresponds to the result of
sorting the **sort_weight** argument, for example, the name of the product with the lowest unit price. The nth value in
the sort order, can be specified in **rank**.

If more than one resulting value shares the same **sort_weight** for the specified **rank**, the function returns NULL.
The sorted values are iterated over a number of records, as defined by a group by clause, or aggregated across the full
data set if no group by clause is defined.

`FirstSortedValue([distinct] value, sort-weight [, rank])`

**Return data type:** dual

| Argument               | Description|
| ---------------------- | ------------------------------------------ |
| value Expression       | The function finds the value of the expression value that corresponds to the result of sorting .|
| sort-weight Expression | The expression containing the data to be sorted. The first (lowest) value of  **sort_weight** is found, from which the corresponding value of the **value**  expression is determined. If you place a minus sign in front of **sort_weight**, the function returns the last (highest) sorted value instead. |
| rank Expression        | By stating a  "n" larger than 1, you get the nth sorted value.|
| distinct               | If the word **DISTINCT** occurs before the function arguments, duplicates resulting from the evaluation of the function arguments are disregarded.|

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>Temp:<br>
LOAD * inline [<br>
Customer|Product|OrderNumber|UnitSales|CustomerID<br>
Astrida|AA|1|10|1<br>
Astrida|AA|7|18|1<br>
Astrida|BB|4|9|1<br>
Astrida|CC|6|2|1<br>
Betacab|AA|5|4|2<br>
Betacab|BB|2|5|2<br>
Betacab|DD|12|25|2<br>
Canutility|AA|3|8|3<br>
Canutility|CC|13|19|3<br>
Divadip|AA|9|16|4<br>
Divadip|AA|10|16|4<br>
Divadip|DD|11|10|4<br>
] (delimiter is '|');<br>
 <br>
FirstSortedValue:<br>
LOAD Customer,FirstSortedValue(Product, UnitSales) as MyProductWithSmallestOrderByCustomer Resident Temp Group By Customer;<br></td>
<td>Customer MyProductWithSmallestOrderByCustomer<br>
Astrida CC<br>
Betacab AA<br>
Canutility AA<br>
Divadip DD
</code>

<p>The function sorts UnitSales from smallest to largest, looging for the value of Customer with the smallest value of
UnitSales, the smallest order.</p>
<p>Because CC corresponds to the smallest order (value of UnitSales=2) for customer Astrida. AA corresponds to the
smallest order (4) for customer Betacab, CC corresponds to the smallest order (8) for customer Canutility, and DD
corresponds to the smallest order (10) for customer Divadip..</p></td>
</tr>
<tr>
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<code>LOAD Customer,<br>
FirstSortedValue(Product, -UnitSales) as MyProductWithLargestOrderByCustomer<br>
Resident Temp<br>
Group By Customer;
</code></td>
<td>Customer MyProductWithLargestOrderByCustomer<br>
Astrida AA<br>
Betacab DD<br>
Canutility CC<br>
Divadip -<br>
A minus sign precedes the sort_weight argument, so the function sorts the largest first.</p>
Because AA corresponds to the largest order (value of UnitSales:18) for customer Astrida, DD corresponds to the
largest order (12) for customer Betacab, and CC corresponds to the largest order (13) for customer Canutility. There are
two identical values for the largest order (16) for customer Divadip, therefore this produces a null result.</p></td>
</tr>
<tr>
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<code>
LOAD Customer,<br>
FirstSortedValue(distinct Product, -UnitSales) as MyProductWithSmallestOrderByCustomer<br>
Resident Temp
Group By Customer;
</code>
</td>
<td>Customer MyProductWithLargestOrderByCustomer<br>
Astrida AA<br>
Betacab DD<br>
Canutility CC<br>
Divadip AA<br>
This is the same as the previous example, except the distinct qualifier is used. This causes the duplicate result for
Divadip to be disregarded, allowing a non-null value to be returned.</p></td>
</tr>
</tbody>
</table>

## Max

 **Max()** finds the highest numeric value of the aggregated data in the expression, as defined by a group by clause. By
 specifying a **rank** n, the nth highest value can be found.

`Max(expr[, rank])`

**Return data type:** numeric

| Argument        | Description                  |
| --------------- | ---------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| rank Expression | The default value of  **rank** is 1, which corresponds to the highest value. By specifying **rank** as 2, the second highest value is returned. If **rank** is 3, the third highest value is returned, and so on. |

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Temp:<br>
LOAD * inline [<br>
Customer|Product|OrderNumber|UnitSales|CustomerID<br>
Astrida|AA|1|10|1<br>
Astrida|AA|7|18|1<br>
Astrida|BB|4|9|1<br>
Astrida|CC|6|2|1<br>
Betacab|AA|5|4|2<br>
Betacab|BB|2|5|2<br>
Betacab|DD<br>
Canutility|DD|3|8<br>
Canutility|CC<br>
] (delimiter is '|');<br>
 <br>
Max:<br>
LOAD Customer, Max(UnitSales) as MyMax, Resident Temp Group By Customer;<br></td>
<td>Customer<br>
Astrida<br>
Betacab<br>
Canutility<br></td>
<td>MyMax<br>
18<br>
5<br>
8<br>
</code>
</td>
</tr>
<tr>
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<code>LOAD Customer, Max(UnitSales,2) as MyMaxRank2 Resident Temp Group By Customer;</code></td>
<td>Customer<br>
Astrida<br>
Betacab<br>
Canutility<br></td>
<td>
MyMaxRank2<br>
10<br>
4<br>
-<br></td>
</tr>
</tbody>
</table>

## Min

 **Min()** returns the lowest numeric value of the aggregated data in the expression, as defined by a group by clause.
 By specifying a **rank** n, the nth lowest value can be found.

`Min(expr[, rank])`

**Return data type:** numeric

| Argument        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured.|
| rank Expression | The default value of  **rank** is 1, which corresponds to the lowest value. By specifying **rank** as 2, the second lowest value is returned. If **rank**  is 3, the third lowest value is returned, and so on. |

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Temp:<br>
LOAD * inline [<br>
Customer|Product|OrderNumber|UnitSales|CustomerID<br>
Astrida|AA|1|10|1<br>
Astrida|AA|7|18|1<br>
Astrida|BB|4|9|1<br>
Astrida|CC|6|2|1<br>
Betacab|AA|5|4|2<br>
Betacab|BB|2|5|2<br>
Betacab|DD<br>
Canutility|DD|3|8<br>
Canutility|CC<br>
] (delimiter is '|');<br>
 <br>
Min:<br>
LOAD Customer, Min(UnitSales) as MyMin Resident Temp Group By Customer;<br></td>
<td>Customer<br>
Astrida<br>
Betacab<br>
Canutility<br></td>
<td>MyMin<br>
2<br>
4<br>
8<br>
</code></td>
</tr>
<tr>
<td><p>Given that the Temp table is loaded as in the previous example:</p>
<code>LOAD Customer, Min(UnitSales,2) as MyMinRank2 Resident Temp Group By Customer;</code></td>
<td>Customer
Astrida</p>
Betacab</p>
Canutility</p></td>
<td>MyMinRank2</p>
9</p>
5</p>
-</p></td>
</tr>
</tbody>
</table>

### Mode

 **Mode()** returns the most commonly-occurring value, the mode value, of the aggregated data in the expression, as
 defined by a group by clause. The **Mode()** function can return numeric values as well as text values.

`Mode (expr)`

**Return data type:** dual

| Argument        | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured. |

If more than one value is equally commonly occurring, NULL is returned.

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Temp:<br>
LOAD * inline [<br>
Customer|Product|OrderNumber|UnitSales|CustomerID<br>
Astrida|AA|1|10|1<br>
Astrida|AA|7|18|1<br>
Astrida|BB|4|9|1<br>
Astrida|CC|6|2|1<br>
Betacab|AA|5|4|2<br>
Betacab|BB|2|5|2<br>
Betacab|DD<br>
Canutility|DD|3|8<br>
Canutility|CC<br>
] (delimiter is '|');<br>
 <br>
Mode:<br>
LOAD Customer, Mode(Product) as MyMostOftenSoldProduct Resident Temp Group By Customer;<br></td>
<td>MyMostOftenSoldProduct<br>
AA<br>
because AA is the only product sold more than once.<br>
</code>
</td>
</tr>
</tbody>
</table>

## Only

**Only()** returns a value if there is one and only one possible result from the aggregated data. If records contain
only one value then that value is returned, otherwise NULL is returned. Use the group by clause to evaluate over
multiple records. The **Only()** function can return numeric and text values.

`Only (expr)`

**Return data type:** dual

| Argument        | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| expr Expression | The expression or field containing the data to be measured. |

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Temp:<br>
LOAD * inline [<br>
Customer|Product|OrderNumber|UnitSales|CustomerID<br>
Astrida|AA|1|10|1<br>
Astrida|AA|7|18|1<br>
Astrida|BB|4|9|1<br>
Astrida|CC|6|2|1<br>
Betacab|AA|5|4|2<br>
Betacab|BB|2|5|2<br>
Betacab|DD<br>
Canutility|DD|3|8<br>
Canutility|CC<br>
] (delimiter is '|');<br>
 <br>
Only:<br>
LOAD Customer, Only(CustomerID) as MyUniqIDCheck Resident Temp Group By Customer;<br></td>
<td>Customer Astrida<br>
 <br>
MyUniqIDCheck<br>
1<br>
</code>
because only customer Astrida has complete records that include CustomerID.</td>
</tr>
</tbody>
</table>

## Sum

 **Sum()**  calculates the total of the values aggregated in the expression, as defined by a group by clause.

`sum([ distinct] expr)`

| Argument        | Description                                                                                  |
| --------------- |--------------------------------------------------------------------------------------------- |
| distinct        | If the word  **distinct**  occurs before the expression, all duplicates will be disregarded. |
| expr Expression | The expression or field containing the data to be measured.|

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Temp:<br>
LOAD * inline [<br>
Customer|Product|OrderNumber|UnitSales|CustomerID<br>
Astrida|AA|1|10|1<br>
Astrida|AA|7|18|1<br>
Astrida|BB|4|9|1<br>
Astrida|CC|6|2|1<br>
Betacab|AA|5|4|2<br>
Betacab|BB|2|5|2<br>
Betacab|DD<br>
Canutility|DD|3|8<br>
Canutility|CC<br>
] (delimiter is '|');<br>
 <br>
Sum:<br>
LOAD Customer, Sum(UnitSales) as MySum Resident Temp Group By Customer;<br></td>
<td>Customer<br>
Astrida<br>
Betacab<br>
Canutility<br></td>
<td>MySum<br>
39<br>
9<br>
8<br>
</code></td>
</tr>
</tbody>
</table>
