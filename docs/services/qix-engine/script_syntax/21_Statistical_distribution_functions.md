# Statistical distribution functions

## CHIDIST

CHIDIST() returns the one-tailed probability of the chi<sup>2</sup> distribution.
The chi<sup>2</sup> distribution is associated with a chi<sup>2</sup>
test.

`CHIDIST(value, degrees_freedom)`

**Return data type:** number

| Argument        | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| value           | The value at which you want to evaluate the distribution. The value must not be negative. |
| degrees_freedom | A positive integer stating the number of degrees of freedom.                              |

This function is related to the **CHIINV** function in the following way:  
If prob = CHIDIST(value,df), then CHIINV(prob, df) = value

**Limitations:**
All arguments must be numeric, else NULL will be returned.

| Example        | Result         |
| -------------- | -------------- |
| CHIDIST(8, 15) | Returns 0.9238 |

## CHIINV

CHIINV() returns the inverse of the one-tailed probability of the chi<sup>2</sup>
distribution.

`CHIINV(prob, degrees_freedom)`

**Return data type:** number

| Argument        | Description                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| prob            | A probability associated with the chi<sup>2</sup> distribution. It must be a number between 0 and 1. |
| degrees_freedom | An integer stating the number of degrees of freedom.                                                 |

This function is related to the **CHIDIST** function in the following way:  
If prob = CHIDIST(value,df), then CHIINV(prob, df) = value

**Limitations:**
All arguments must be numeric, else NULL will be returned.

| Example               | Result         |
| --------------------- | -------------- |
| CHIINV(0.9237827, 15) | Returns 8.0000 |

## FDIST

FDIST() returns the F-probability distribution.

`FDIST(value, degrees_freedom1, degrees_freedom2)`

**Return data type:** number

| Argument         | Description                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------- |
| value            | The value at which you want to evaluate the distribution. **Value** must not be negative. |
| degrees_freedom1 | A positive integer stating the number of numerator degrees of freedom.                    |
| degrees_freedom2 | A positive integer stating the number of denominator degrees of freedom.                  |

This function is related to the **FINV** function in the following way:  
If prob = FDIST(value, df1, df2), then FINV(prob, df1, df2) = value

**Limitations:**
All arguments must be numeric, else NULL will be returned.

| Example         | Result         |
| --------------- | -------------- |
| FDIST(15, 8, 6) | Returns 0.0019 |

## FINV

FINV() returns the inverse of the F-probability distribution.

`FINV(prob, degrees_freedom1, degrees_freedom2)`

**Return data type:** number

| Argument        | Description                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------- |
| prob            | A probability associated with the F-probability distribution and must be a number between 0 and 1. |
| degrees_freedom | An integer stating the number of degrees of freedom.                                               |

This function is related to the **FDIST** function in the following way:  
If prob = FDIST(value, df1, df2), then FINV(prob, df1, df2) = value

**Limitations:**
All arguments must be numeric, else NULL will be returned.

| Example               | Result          |
| --------------------- | --------------- |
| FINV(0.0019369, 8, 6) | Returns 15.0000 |

## NORMDIST

NORMDIST() returns the cumulative normal distribution for the specified mean and
standard deviation. If mean = 0 and standard_dev = 1, the function
returns the standard normal distribution.

`NORMDIST(value, mean, standard_dev)`

**Return data type:** number

| Argument     | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| value        | The value at which you want to evaluate the distribution.            |
| mean         | A value stating the arithmetic mean for the distribution.            |
| standard_dev | A positive value stating the standard deviation of the distribution. |

This function is related to the **NORMINV** function in the following way:  
If prob = NORMDIST(value, m, sd), then NORMINV(prob, m, sd) = value

**Limitations:**
All arguments must be numeric, else NULL will be returned.

| Example             | Result         |
| ------------------- | -------------- |
| NORMDIST(0.5, 0, 1) | Returns 0.6915 |

## NORMINV

NORMINV() returns the inverse of the normal cumulative distribution for the
specified mean and standard deviation.

`NORMINV(prob, mean, standard_dev)`

**Return data type:** number

| Argument     | Description                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------- |
| prob         | A probability associated with the normal distribution. It must be a number between 0 and 1. |
| mean         | A value stating the arithmetic mean for the distribution.                                   |
| standard_dev | A positive value stating the standard deviation of the distribution.                        |

This function is related to the **NORMDIST** function in the following way:  
If prob = NORMDIST(value, m, sd), then NORMINV(prob, m, sd) = value

**Limitations:**
All arguments must be numeric, else NULL will be returned.

| Example                  | Result         |
| ------------------------ | -------------- |
| NORMINV(0.6914625, 0, 1) | Returns 0.5000 |

## TDIST

TDIST() returns the probability for the Student's t-distribution where a numeric
value is a calculated value of t for which the probability is to be
computed.

`TDIST(value, degrees_freedom, tails)`
**Return data type:** number

| Argument        | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| value           | The value at which you want to evaluate the distribution and must not be negative. |
| degrees_freedom | A positive integer stating the number of degrees of freedom.                       |
| tails           | Must be either 1 (one-tailed distribution) or 2 (two-tailed distribution).         |

This function is related to the **TINV** function in the following way:  
If prob = TDIST(value, df ,2), then TINV(prob, df) = value

**Limitations:**
All arguments must be numeric, else NULL will be returned.

| Example         | Result         |
| --------------- | -------------- |
| TDIST(1, 30, 2) | Returns 0.3253 |

## TINV

TINV() returns the t-value of the Student's t-distribution as a function of the
probability and the degrees of freedom.

`TINV(prob, degrees_freedom)`

**Return data type:** number

| Argument        | Description                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------- |
| prob            | A two-tailed probability associated with the t-distribution. It must be a number between 0 and 1. |
| degrees_freedom | An integer stating the number of degrees of freedom.                                              |

All arguments must be numeric, else NULL will be returned.

This function is related to the **TDIST** function in the following way:  
If prob = TDIST(value, df ,2), then TINV(prob, df) = value.

| Example             | Result         |
| ------------------- | -------------- |
| TINV(0.3253086, 30) | Returns 1.0000 |
