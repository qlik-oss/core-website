# Financial functions

## BlackAndSchole - script and chart function

The Black and Scholes model is a mathematical model for financial market derivative instruments. The formula calculates the theoretical value of an option. In Qlik Sense, the BlackAndSchole function returns the value according to the Black and Scholes unmodified formula (European style options).

`BlackAndSchole( strike , time_left , underlying_price , vol , risk_free_rate , type )`

**Return data type:** numeric

| Argument | Description|
| -------- | ---------------------------------------- |
| strike | The future purchase price of the stock. |
|time_left | The number of time periods remaining. |
| underlying_price| The current value of the stock. |
| vol | Volatility (of the stock price) expressed as a percentage in decimal form, per time period. |
| risk_free_rate | The risk-free rate expressed as a percentage in decimal form, per time period.
| call_or_put |  'c', 'call' or any non-zero numeric value for call options. p', 'put' or 0 for put options.|

Limitations:
The value of strike, time_left, and underlying_price must be >0.
The value of vol and risk_free_rate must be: <0 or >0.

## FV - script and chart function

This function returns the future value of an investment based on
periodic, constant payments and a simple annual interest.

`FV( rate, nper, pmt [ ,pv [ , type ]] )`

**Return data type:** numeric. The result has a default number format of money.

| Argument | Description|
| -------- | --------------------------- |
| rate     | The interest rate per period.|
| nper     | The total number of payment periods in an annuity.|
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.|
| pv       | The present value, or lump-sum amount, that a series of future payments is worth right now. If  is omitted, it is assumed to be 0 (zero).|
| type     | Should be 0 if payments are due at the end of the period and 1 if payments are due at the beginning of the period. If **type is omitted, it is assumed to be 0. |

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
<td><p>You are paying a new household appliance by 36 monthly installments of $20. The interest rate is 6% per annum. The bill comes at the end of every month. What is the total invested, when the last bill has been paid?</p>
<p>FV(0.005,36,-20)</p></td>
<td>Returns $786.72</td>
</tr>
</tbody>
</table>

## nPer - script and chart function

This function returns the number of periods for an investment based on
periodic, constant payments and a constant interest rate.

`nPer( rate, pmt, pv [ ,fv [ , type ]] )`

**Return data type:** numeric

| Argument | Description|
| -------- | ----------------------------------------------------------------------------- |
| rate     | The interest rate per period.|
| nper     | The total number of payment periods in an annuity.|
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.|
| pv       | The present value, or lump-sum amount, that a series of future payments is worth right now. If  is omitted, it is assumed to be 0 (zero).|
| fv       | The future value, or cash balance, you want to attain after the last payment is made. If **fv is omitted, it is assumed to be 0.|
| type     | Should be 0 if payments are due at the end of the period and 1 if payments are due at the beginning of the period. If  **type**  is omitted, it is assumed to be 0. |

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
<td><p>You want to sell a household appliance by monthly installments of $20. The interest rate is 6% per annum. The bill comes at the end of every month. How many periods are required if the value of the money received after the last bill has been paid should equal $800?</p>
<p>nPer(0.005,-20,0,800)</p></td>
<td>Returns 36.56</td>
</tr>
</tbody>
</table>

## Pmt - script and chart function

This function returns the payment for a loan based on periodic, constant
payments and a constant interest rate.

`Pmt( rate, nper, pv [ ,fv [ , type ] ] )`

**Return data type:** numeric. The result has a default number format of money. .

To find the total amount paid over the duration of the loan, multiply
the returned **pmt** value by **nper** .

| Argument | Description|
| -------- | ------------------------------ |
| rate     | The interest rate per period.|
| nper     | The total number of payment periods in an annuity.|
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.|
| pv       | The present value, or lump-sum amount, that a series of future payments is worth right now. If  is omitted, it is assumed to be 0 (zero).|
| fv       | The future value, or cash balance, you want to attain after the last payment is made. If **fv is omitted, it is assumed to be 0.|
| type     | Should be 0 if payments are due at the end of the period and 1 if payments are due at the beginning of the period. If  **type**  is omitted, it is assumed to be 0. |

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
<td><p>The following formula returns the monthly payment on a $20,000 loan at an annual rate of 10 percent, that must be paid off in 8 months:</p>
<p>Pmt(0.1/12,8,20000)</p></td>
<td>Returns -$2,594.66</td>
</tr>
<tr class="even">
<td><p>For the same loan, if payment is due at the beginning of the period, the payment is:</p>
<p>Pmt(0.1/12,8,20000,0,1)</p></td>
<td>Returns -$2,573.21</td>
</tr>
</tbody>
</table>

## PV - script and chart function

This function returns the present value of an investment.

`PV( rate, nper, pmt [ ,fv [ , type ]] )`

**Return data type:** numeric. The result has a default number format of money. .  

The present value is the total amount that a series of future payments
is worth right now. For example, when borrowing money, the loan amount
is the present value to the lender.

| Argument | Description|
| -------- | --------------------------------------------------- |
| rate     | The interest rate per period.|
| nper     | The total number of payment periods in an annuity.|
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.|
| fv       | The future value, or cash balance, you want to attain after the last payment is made. If  is omitted, it is assumed to be 0.                                |
| type     | Should be 0 if payments are due at the end of the period and 1 if payments are due at the beginning of the period. If **type is omitted, it is assumed to be 0. |

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
<td><p>What is the present value of a debt, when you have to pay $100 at the end of each month during a five-year period, given an interest rate of 7%?</p>
<p>PV(0.07/12,12*5,-100,0,0)</p></td>
<td>Returns $5,050.20</td>
</tr>
</tbody>
</table>

## Rate - script and chart function

This function returns the interest rate per period on annuity. The
result has a default number format of
 **Fix** two decimals and %.

`Rate( nper, pmt , pv [ ,fv [ , type ]] )`

**Return data type:** numeric

The **rate** is calculated by iteration and can have zero or more solutions. If the
successive results of **rate** do not converge, a NULL value will be returned.

| Argument | Description|
| -------- | -------------------------------------------------------------- |
| nper     | The total number of payment periods in an annuity.|
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.|
| pv       | The present value, or lump-sum amount, that a series of future payments is worth right now. If  is omitted, it is assumed to be 0 (zero).|
| fv       | The future value, or cash balance, you want to attain after the last payment is made. If **fv is omitted, it is assumed to be 0.|
| type     | Should be 0 if payments are due at the end of the period and 1 if payments are due at the beginning of the period. If  **type**  is omitted, it is assumed to be 0. |

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
<td><p>What is the interest rate of a five-year $10,000 annuity loan with monthly payments of $300?</p>
<p>Rate(60,-300,10000)</p></td>
<td>Returns 2.00%</td>
</tr>
</tbody>
</table>
