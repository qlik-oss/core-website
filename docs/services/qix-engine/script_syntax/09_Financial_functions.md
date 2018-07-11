

## FinancialFunctions

# Financial functions

Financial functions can be used in the data load script and in chart
expressions to calculate payments and interest rates.

For all the arguments, cash that is paid out is represented by negative
numbers. Cash received is represented by positive numbers.

Listed here are the arguments that are used in the financial functions
(excepting the ones beginning with
 **range** -).



For all financial functions it is vital that you are consistent when
specifying units for
 **rate** 
and
 **nper** .
If monthly payments are made on a five-year loan at 6% annual interest,
use 0.005 (6%/12) for
 **rate** 
and 60 (5\*12) for
 **nper** .
If annual payments are made on the same loan, use 6% for
 **rate** 
and 5 for
 **nper** .



## Financial functions overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

FV

This function returns the future value of an investment based on
periodic, constant payments and a simple annual
interest.

**FV2111990020**(rate,
nper, pmt [ ,pv [ , type ]
])

nPer

This function returns the number of periods for an investment based on
periodic, constant payments and a constant interest
rate.

**nPer1535805135**(rate,
pmt, pv [ ,fv [ , type ]
])

Pmt

This function returns the payment for a loan based on periodic, constant
payments and a constant interest
rate.

**Pmt932306164**(rate,
nper, pv [ ,fv [ , type ] ]
)

PV

This function returns the present value of an
investment.

**PV2058119428**(rate,
nper, pmt [ ,fv [ , type ]
])

Rate

This function returns the interest rate per period on annuity. The
result has a default number format of
 **Fix** 
two decimals and
%.

**Rate4038716167**(nper,
pmt , pv [ ,fv [ , type ]
])

 

*BlackAndSchole - script and chart function*

*Money - script and chart
function*

# FV - script and chart function

This function returns the future value of an investment based on
periodic, constant payments and a simple annual interest.

 

FV(rate,
nper, pmt [ ,pv [ , type ]
])

numeric. The result has a default number format of money.
.

 

| Argument | Description                                                                                                                                                                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rate     | The interest rate per period.                                                                                                                                                                                                                                     |
| nper     | The total number of payment periods in an annuity.                                                                                                                                                                                                                |
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.                                                                                                                          |
| pv       | The present value, or lump-sum amount, that a series of future payments is worth right now. If  is omitted, it is assumed to be 0 (zero).                   | | type     | Should be 0 if payments are due at the end of the period and 1 if payments are due at the beginning of the period. If **type is omitted, it is assumed to be 0. |

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

# nPer - script and chart function

This function returns the number of periods for an investment based on
periodic, constant payments and a constant interest rate.

 

nPer(rate,
pmt, pv [ ,fv [ , type ]
])

numeric

 

| Argument | Description                                                                                                                                                                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rate     | The interest rate per period.                                                                                                                                                                                                                                     |
| nper     | The total number of payment periods in an annuity.                                                                                                                                                                                                                |
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.                                                                                                                          |
| pv       | The present value, or lump-sum amount, that a series of future payments is worth right now. If  is omitted, it is assumed to be 0 (zero).                   | | fv       | The future value, or cash balance, you want to attain after the last payment is made. If **fv is omitted, it is assumed to be 0.                                |
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

# Pmt - script and chart function

This function returns the payment for a loan based on periodic, constant
payments and a constant interest rate.

Pmt(rate,
nper, pv [ ,fv [ , type ] ]
)

numeric. The result has a default number format of money. .

To find the total amount paid over the duration of the loan, multiply
the returned
 **pmt** 
value by
 **nper** .

 

| Argument | Description                                                                                                                                                                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rate     | The interest rate per period.                                                                                                                                                                                                                                     |
| nper     | The total number of payment periods in an annuity.                                                                                                                                                                                                                |
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.                                                                                                                          |
| pv       | The present value, or lump-sum amount, that a series of future payments is worth right now. If  is omitted, it is assumed to be 0 (zero).                   | | fv       | The future value, or cash balance, you want to attain after the last payment is made. If **fv is omitted, it is assumed to be 0.                                |
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

# PV - script and chart function

This function returns the present value of an investment.

PV(rate,
nper, pmt [ ,fv [ , type ]
])

numeric. The result has a default number format of money. .  

The present value is the total amount that a series of future payments
is worth right now. For example, when borrowing money, the loan amount
is the present value to the
lender.

 

| Argument | Description                                                                                                                                                                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rate     | The interest rate per period.                                                                                                                                                                                                                                     |
| nper     | The total number of payment periods in an annuity.                                                                                                                                                                                                                |
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.                                                                                                                          |
| fv       | The future value, or cash balance, you want to attain after the last payment is made. If  is omitted, it is assumed to be 0.                                | | type     | Should be 0 if payments are due at the end of the period and 1 if payments are due at the beginning of the period. If **type is omitted, it is assumed to be 0. |

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

# Rate - script and chart function

This function returns the interest rate per period on annuity. The
result has a default number format of
 **Fix** 
two decimals and %.

 

Rate(nper,
pmt , pv [ ,fv [ , type ]
])

numeric.

The
 **rate** 
is calculated by iteration and can have zero or more solutions. If the
successive results of
 **rate** 
do not converge, a NULL value will be
returned.

 

| Argument | Description                                                                                                                                                                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nper     | The total number of payment periods in an annuity.                                                                                                                                                                                                                |
| pmt      | The payment made each period. It cannot change over the life of the annuity. A payment is stated as a negative number, for example, -20.                                                                                                                          |
| pv       | The present value, or lump-sum amount, that a series of future payments is worth right now. If  is omitted, it is assumed to be 0 (zero).                   | | fv       | The future value, or cash balance, you want to attain after the last payment is made. If **fv is omitted, it is assumed to be 0.                                |
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