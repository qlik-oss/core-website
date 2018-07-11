
## StatisticalDistributionFunctions

# CHIDIST - script and chart function

CHIDIST()
returns the one-tailed probability of the chi<sup>2</sup> distribution.
The chi<sup>2</sup> distribution is associated with a ch<sup>i2</sup>
test.

 

value, degrees_freedom<span class="syntax" data-autonumposition="none">)

number

 

| Argument         | Description                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------- |
| value            | The value at which you want to evaluate the distribution. The value must not be negative. |
| degrees_freedom | A positive integer stating the number of degrees of freedom.                              |

This function is related to the
 **CHIINV** 
function in the following
way:  
If prob = CHIDIST(value,df), then CHIINV(prob, df) = value

 

All arguments must be numeric, else NULL will be returned.

Examples and results:

| Example         | Result         |
| --------------- | -------------- |
| CHIDIST( 8, 15) | Returns 0.9238 |

 

*CHIINV - script and chart
function*

# CHIINV - script and chart function

CHIINV()
returns the inverse of the one-tailed probability of the chi<sup>2</sup>
distribution.

 

prob, degrees_freedom<span class="syntax" data-autonumposition="none">)

number

 

| Argument         | Description                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| prob             | A probability associated with the chi<sup>2</sup> distribution. It must be a number between 0 and 1. |
| degrees_freedom | An integer stating the number of degrees of freedom.                                                 |

This function is related to the
 **CHIDIST** 
function in the following
way:  
If prob = CHIDIST(value,df), then CHIINV(prob, df) = value

 

All arguments must be numeric, else NULL will be returned.

Examples and results:

| Example                | Result         |
| ---------------------- | -------------- |
| CHIINV(0.9237827, 15 ) | Returns 8.0000 |

 

*CHIDIST - script and chart
function*

# FDIST - script and chart function

FDIST()
returns the F-probability distribution.

 

<span class="syntax" data-autonumposition="none">FDIST(value,
degrees_freedom1,
degrees_freedom2<span class="syntax" data-autonumposition="none">)

number

 

| Argument          | Description                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value             | The value at which you want to evaluate the distribution.  **Value**  must not be negative. |
| degrees_freedom1 | A positive integer stating the number of numerator degrees of freedom.                                                                                                                    |
| degrees_freedom2 | A positive integer stating the number of denominator degrees of freedom.                                                                                                                  |

This function is related to the
 **FINV** 
function in the following
way:  
If prob = FDIST(value, df1, df2), then FINV(prob, df1, df2) = value

 

All arguments must be numeric, else NULL will be returned.

Examples and results:

| Example         | Result         |
| --------------- | -------------- |
| FDIST(15, 8, 6) | Returns 0.0019 |

 

*FINV - script and chart
function*

# FINV - script and chart function

FINV()
returns the inverse of the F-probability distribution.

 

<span class="syntax" data-autonumposition="none">FINV(prob,
degrees_freedom1,
degrees_freedom2<span class="syntax" data-autonumposition="none">)

number

 

| Argument         | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| prob             | A probability associated with the F-probability distribution and must be a number between 0 and 1. |
| degrees_freedom | An integer stating the number of degrees of freedom.                                               |

This function is related to the
 **FDIST** 
function in the following
way:  
If prob = FDIST(value, df1, df2), then FINV(prob, df1, df2) = value

 

All arguments must be numeric, else NULL will be returned.

Examples and results:

| Example                | Result          |
| ---------------------- | --------------- |
| FINV( 0.0019369, 8, 6) | Returns 15.0000 |

 

*FDIST - script and chart
function*

# NORMDIST - script and chart function

NORMDIST()
returns the cumulative normal distribution for the specified mean and
standard deviation. If mean = 0 and standard_dev = 1, the function
returns the standard normal distribution.

 

<span class="syntax" data-autonumposition="none">NORMDIST(value,
mean,
standard_dev<span class="syntax" data-autonumposition="none">)

number

 

| Argument      | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| value         | The value at which you want to evaluate the distribution.            |
| mean          | A value stating the arithmetic mean for the distribution.            |
| standard_dev | A positive value stating the standard deviation of the distribution. |

This function is related to the
 **NORMINV** 
function in the following
way:  
If prob = NORMDIST(value, m, sd), then NORMINV(prob, m, sd) = value

 

All arguments must be numeric, else NULL will be returned.

Examples and results:

| Example              | Result         |
| -------------------- | -------------- |
| NORMDIST( 0.5, 0, 1) | Returns 0.6915 |

 

*NORMINV - script and chart
function*

# NORMINV - script and chart function

NORMINV()
returns the inverse of the normal cumulative distribution for the
specified mean and standard deviation.

 

<span class="syntax" data-autonumposition="none">NORMINV(prob,
mean,
standard_dev<span class="syntax" data-autonumposition="none">)

number

 

| Argument      | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| prob          | A probability associated with the normal distribution. It must be a number between 0 and 1. |
| mean          | A value stating the arithmetic mean for the distribution.                                   |
| standard_dev | A positive value stating the standard deviation of the distribution.                        |

This function is related to the
 **NORMDIST** 
function in the following
way:  
If prob = NORMDIST(value, m, sd), then NORMINV(prob, m, sd) = value

 

All arguments must be numeric, else NULL will be returned.

Examples and results:

| Example                    | Result         |
| -------------------------- | -------------- |
| NORMINV( 0.6914625, 0, 1 ) | Returns 0.5000 |

 

*NORMDIST - script and chart
function*

# Statistical distribution functions

The statistical distribution functions described below are all
implemented in Qlik Sense using the Cephesfunction library. For
references and details on algorithms used, accuracy, and so on, see:
[*http://www.netlib.org/cephes/*](http://www.netlib.org/cephes/). The
Cephes function library is used by permission.

The statistical distribution DIST functions measure the probability of
the distribution function at the point in the distribution given by the
supplied value. The INV functions calculate the value, given the
probability of the distribution. In contrast, the groups of statistical
aggregation functions calculate the aggregated values of series of
statistical test values for various statistical hypothesis tests.

All functions can be used in both the data load script and in chart
expressions.

## Statistical distribution functions overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

CHIDIST

CHIDIST()
returns the one-tailed probability of the chi<sup>2</sup> distribution.
The chi<sup>2</sup> distribution is associated with a ch<sup>i2</sup>
test.

**CHIDIST2509702684**(value, degrees_freedom)

CHIINV

CHIINV()
returns the inverse of the one-tailed probability of the chi<sup>2</sup>
distribution.

**CHIINV1817553425**(prob, degrees_freedom)

NORMDIST

NORMDIST()
returns the cumulative normal distribution for the specified mean and
standard deviation. If mean = 0 and standard_dev = 1, the function
returns the standard normal distribution.

**NORMDIST3597591535**(value, mean, standard_dev)

NORMINV

 NORMINV()
returns the inverse of the normal cumulative distribution for the
specified mean and standard deviation.

**NORMINV1076435117**(prob, mean, standard_dev)

TDIST

TDIST()
returns the probability for the Student's t-distribution where a numeric
value is a calculated value of t for which the probability is to be
computed.

**TDIST4244508934**(value, degrees_freedom, tails)

TINV

TINV()
returns the t-value of the Student's t-distribution as a function of the
probability and the degrees of freedom.

**TINV3329773813**(prob, degrees_freedom)

FDIST

FDIST()
returns the F-probability distribution.

**FDIST1852313862**(value, degrees_freedom1, degrees_freedom2)

FINV

FINV()
returns the inverse of the F-probability distribution.

**FINV1633571061**(prob, degrees_freedom1, degrees_freedom2)

 

*Statistical aggregation
functions*

# TDIST - script and chart function

TDIST()
returns the probability for the Student's t-distribution where a numeric
value is a calculated value of t for which the probability is to be
computed.

 

<span class="syntax" data-autonumposition="none">TDIST(value,
degrees_freedom,
tails<span class="syntax" data-autonumposition="none">)

number

 

| Argument         | Description                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| value            | The value at which you want to evaluate the distribution and must not be negative. |
| degrees_freedom | A positive integer stating the number of degrees of freedom.                       |
| tails            | Must be either 1 (one-tailed distribution) or 2 (two-tailed distribution).         |

This function is related to the
 **TINV** 
function in the following
way:  
If prob = TDIST(value, df ,2), then TINV(prob, df) = value

 

All arguments must be numeric, else NULL will be returned.

Examples and results:

| Example         | Result         |
| --------------- | -------------- |
| TDIST(1, 30, 2) | Returns 0.3253 |

 

*TINV - script and chart
function*

# TINV - script and chart function

TINV()
returns the t-value of the Student's t-distribution as a function of the
probability and the degrees of freedom.

 

prob, degrees_freedom<span class="syntax" data-autonumposition="none">)

number

 

| Argument         | Description                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| prob             | A two-tailed probability associated with the t-distribution. It must be a number between 0 and 1. |
| degrees_freedom | An integer stating the number of degrees of freedom.                                              |

 

All arguments must be numeric, else NULL will be returned.

This function is related to the
 **TDIST** 
function in the following
way:  
If prob = TDIST(value, df ,2), then TINV(prob, df) = value.

Examples and results:

| Example              | Result         |
| -------------------- | -------------- |
| TINV(0.3253086, 30 ) | Returns 1.0000 |

 

*TDIST - script and chart
function*
