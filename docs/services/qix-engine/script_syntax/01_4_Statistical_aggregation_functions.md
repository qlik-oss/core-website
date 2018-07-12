# Statistical aggregation functions

## Avg

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

## LINEST_F

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

## LINEST_SEB

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

## LINEST_SEM

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

## LINEST_SEY

 **LINEST_SEY()** returns the aggregated standard error of the y estimate of a linear
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

## LINEST_SSREG

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

## LINEST_SSRESID

 **LINEST_SSRESID()** returns the aggregated residual sum of squares of a linear regression
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

## Median

 **Median()** returns the aggregated median of the values in the expression over a
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

 **Skew()** returns the skewness of expression over a number of records as defined
by a group by clause.

`Skew( [ distinct] expr )`

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

## Stdev

 **Stdev()** returns the standard deviation of the values given by the expression
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

 **Sterr()** returns the aggregated standard error (stdev/sqrt(n)) for a series of
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

 **STEYX()** returns the aggregated standard error of the predicted y-value for each
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