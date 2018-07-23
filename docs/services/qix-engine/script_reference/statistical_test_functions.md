# Statistical Test functions

## Chi2Test_chi2

Chi2Test_chi2() returns the aggregated chi2-test value for one or two series of values. The values are iterated over a
number of records as defined by a group by clause.

`Chi2Test_chi2(col, row, actual_value[, expected_value])`

**Return data type:** numeric

| Argument       | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| col, row       | The specified column and row in the matrix of values being tested.    |
| actual_value   | The observed value of the data at the specified col and row.          |
| expected_value | The expected value for the distribution at the specified col and row. |

Text values, NULL values and missing values in the expression value will result in the function returning NULL.

## Chi2Test_df

Chi2Test_df() returns the aggregated chi2-test df value (degrees of freedom) for one or two series of values. The values
are iterated over a number of records as defined by a group by clause.

`Chi2Test_df(col, row, actual_value[, expected_value])`

**Return data type:** numeric

| Argument       | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| col, row       | The specified column and row in the matrix of values being tested.    |
| actual_value   | The observed value of the data at the specified col and row.          |
| expected_value | The expected value for the distribution at the specified col and row. |

Text values, NULL values and missing values in the expression value will result in the function returning NULL

## Chi2Test_p

**Chi2Test_p()** returns the aggregated chi2-test p value (significance) for one or two series of values. The test can
be done either on the values in **actual_value**, testing for variations within the specified col and row matrix, or by
comparing values in actual_value with corresponding values in expected_value, if specified. The values are iterated over
a number of records as defined by a group by clause.

`Chi2Test_p( col, row, actual_value[, expected_value] )`

**Return data type:** numeric

| Argument       | Description                                                           |
| -------------- | --------------------------------------------------------------------- |
| col, row       | The specified column and row in the matrix of values being tested.    |
| actual_value   | The observed value of the data at the specified col and row.          |
| expected_value | The expected value for the distribution at the specified col and row. |

Text values, NULL values and missing values in the expression value will result in the function returning NULL.
