# Range functions

# RangeIRR

RangeIRR() returns the internal rate of return for a series of cash flows
represented by the input values.

The internal rate of return is the interest rate received for an
investment consisting of payments (negative values) and income (positive
values) that occur at regular periods.

`RangeIRR( value[, value][, Expression] )`

numeric

| Argument   | Description                                                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value      | A single value or a range of values as returned by an inter record function with a third optional parameter. The function needs at least one positive and one negative value to be calculated. |
| Expression | Optional expressions or fields containing the range of data to be measured.                                                                                                                    |

Text values, NULL values and missing values are disregarded.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>RangeIRR(-70000,12000,15000,18000,21000,26000)</p></td>
<td><p>Returns 0.0866</p></td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>RangeTab3:</p>
<p>LOAD *,</p>
<p>recno() as RangeID,</p>
<p>RangeIRR(Field1,Field2,Field3) as RangeIRR;</p>
<p>LOAD * INLINE [</p>
<p>Field1|Field2|Field3</p>
<p>-10000|5000|6000</p>
<p>-2000|NULL|7000</p>
<p>-8000|'abc'|8000</p>
<p>-1800|11000|9000</p>
<p>-5000|5000|9000</p>
<p>-9000|4000|2000</p>
<p><span class="Code" data-autonumposition="none">] (delimiter is '|');</p></td>
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

RangeIRR(above(sum(value), 0, 10))

RangeIRR(above(total value, 0, rowno(total)))

## RangeNPV

RangeNPV()
returns the net present value of an investment based on a discount rate
and a series of future periodic payments (negative values) and incomes
(positive values). The result has a default number format of
 **money** .

For cash flows that are not necessarily periodic, see *RangeXNPV -
script
function*.

 

RangeNPV(discount_rate,
value[,value][,
Expression]) 

numeric

 

| Argument       | Description                                                                                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| discount_rate | The interest rate per period.                                                                                                                                                           |
| value          | A payment or income occurring at the end of each period. Each value may be a single value or a range of values as returned by an inter-record function with a third optional parameter. |
| Expression     | Optional expressions or fields containing the range of data to be measured.                                                                                                             |

 

Text values, NULL values and missing values are disregarded.

<table>
<thead>
<tr class="header">
<th>Examples</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>RangeNPV(0.1,-10000,3000,4200,6800)</p></td>
<td><p>Returns 1188.44</p></td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>RangeTab3:</p>
<p>LOAD *,</p>
<p>recno() as RangeID,</p>
<p>RangeNPV(Field1,Field2,Field3) as RangeNPV;</p>
<p>LOAD * INLINE [</p>
<p>Field1|Field2|Field3</p>
<p>10|5|-6000</p>
<p>2|NULL|7000</p>
<p>8|'abc'|8000</p>
<p>18|11|9000</p>
<p>5|5|9000</p>
<p>9|4|2000</p>
<p>] (delimiter is '|');</p></td>
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

RangeNPV(0.05, above(sum(value), 0, 10))

RangeNPV(0.05, above(total value, 0, rowno(total)))


# RangeXIRR

RangeXIRR()
returns the internal rate of return for a schedule of cash flows that is
not necessarily periodic. To calculate the internal rate of return for a
series of periodic cash flows, use the
 **RangeIRR** 
function.

 

RangeXIRR(value,
date{, value,
date})

numeric

 

| Argument | Description                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value    | A cash flow or a series of cash flows that correspond to a schedule of payments in dates. The series of values must contain at least one positive and one negative value. |
| date     | A payment date or a schedule of payment dates that corresponds to the cash flow payments.                                                                                 |

 

Text values, NULL values and missing values are disregarded.

All payments are discounted based on a 365-day
year.

| Examples                                                                                                                                       | Results        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| RangeXIRR(-2500,'2008-01-01',2750,'2008-09-01') | Returns 0.1532 |

 

*RangeIRR - script
function*

# RangeXNPV

RangeXNPV()
returns the net present value for a schedule of cash flows that is not
necessarily periodic. The result has a default number format of money.
To calculate the net present value for a series of periodic cash flows,
use the
 **RangeNPV** 
function.

 

RangeXNPV(discount_rate,
values, dates[,
Expression])

numeric

 

| Argument       | Description                                                                                                                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| discount_rate | The interest rate per period.                                                                                                                                                                                                                                                                             |
| values         | A cash flow or a series of cash flows that corresponds to a schedule of payments in dates. Each value may be a single value or a range of values as returned by an inter-record function with a third optional parameter. The series of values must contain at least one positive and one negative value. |
| dates          | A payment date or a schedule of payment dates that corresponds to the cash flow payments.                                                                                                                                                                                                                 |

 

Text values, NULL values and missing values are disregarded.

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
<td><p>RangeXNPV(0.1, -2500,'2008-01-01',2750,'2008-09-01')</p></td>
<td><p>Returns 80.25</p></td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>RangeTab3:</p>
<p>LOAD *,</p>
<p>recno() as RangeID,</p>
<p>RangeXNPV(Field1,Field2,Field3) as RangeNPV;</p>
<p>LOAD * INLINE [</p>
<p>Field1|Field2|Field3</p>
<p>10|5|-6000</p>
<p>2|NULL|7000</p>
<p>8|'abc'|8000</p>
<p>18|11|9000</p>
<p>5|5|9000</p>
<p>9|4|2000</p>
<p>] (delimiter is '|');</p></td>
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

RangeXNPV(0.1, above(sum(value), 0, 10), above(date, 0, 10))

RangeXNPV(0.1, above(total
value,0,rowno(total)),