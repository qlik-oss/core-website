# Counter Aggregation functions

## Count

 **Count()** returns the number of values aggregated in expression, as defined by a
group by clause.

`Count([distinct] expr)`

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

### Example 1

Script:

```code
Temp:
LOAD * inline [
Customer|Product|OrderNumber|UnitSales|UnitPrice
Astrida|AA|1|4|16
Astrida|AA|7|10|15
Astrida|BB|4|9|9
Betacab|CC|6|5|10
Betacab|AA|5|2|20
Betacab|BB|1|25| 25
Canutility|AA|3|8|15
Canutility|CC|||19
Divadip|CC|2|4|16
Divadip|DD|3|1|25
] (delimiter is '|');

Count1:
LOAD Customer,Count(OrderNumber) as OrdersByCustomer Resident Temp Group By Customer;
```

Result:

| Customer | OrdersByCustomer |
| -------- | ---------------- |
| Astrida | 3 |
| Betacab | 3 |
| Canutility | 2 |
| Divadip | 2 |

As long as the dimension Customer is included in the table on the sheet,
otherwise the result for OrdersByCustomer is 3, 2.

### Example 2

Given that the Temp table is loaded as in the previous example:

| TotalOrderNumber |
| ---------------- |
| 10 |

### Example 3

Given that the Temp table is loaded as in the first example:

```code
LOAD Count(distinct OrderNumber) as TotalOrdersNumber Resident Temp;
```

Result:

| TotalOrderNumber |
| ---------------- |
| 9 |

Because there are two values of OrderNumber with the same value, 1.

## MissingCount

 **MissingCount()** returns the number of missing values aggregated in the expression, as
defined by a group by clause.

`MissingCount ([distinct] expr )`

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

### Example 1

Script:

```code
Temp:
LOAD * inline [
Customer|Product|OrderNumber|UnitSales|UnitPrice
Astrida|AA|1|4|16
Astrida|AA|7|10|15
Astrida|BB|4|9|9
Betacab|CC|6|5|10
Betacab|AA|5|2|20
Betacab|BB||| 25
Canutility|AA|||15
Canutility|CC| ||19
Divadip|CC|2|4|16
Divadip|DD|3|1|25
] (delimiter is '|');
MissCount1:
LOAD Customer,MissingCount(OrderNumber) as MissingOrdersByCustomer Resident Temp Group By Customer;

Load MissingCount(OrderNumber) as TotalMissingCount Resident Temp;
```

Result:

| Customer | MissingOrdersByCustomer |
| -------- | ----------------------- |
| Astrida | 0 |
| Betacab | 1 |
| Canutility | 2 |
| Divadip | 0 |

The second statement gives:

| TotalMissingCount|
| ---------------- |
| 3 |

in a table with that dimension.

### Example 2

Given that the Temp table is loaded as in the previous example:

```code
LOAD MissingCount(distinct OrderNumber) as TotalMissingCountDistinct Resident Temp;
```

Result:

| TotalMissingCountDistinct |
| ------------------------- |
| 1 |

Because there is only oneOrderNumber one missing value.

## NullCount

 **NullCount()** returns the number of NULL values aggregated in the expression, as
defined by a group by clause.

`NullCount([distinct] expr )`

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

### Example

Script:

```code
Set NULLINTERPRET = NULL;
Temp:
LOAD * inline [
Customer|Product|OrderNumber|UnitSales|CustomerID
Astrida|AA|1|10|1
Astrida|AA|7|18|1
Astrida|BB|4|9|1
Astrida|CC|6|2|1
Betacab|AA|5|4|2
Betacab|BB|2|5|2
Betacab|DD|||
Canutility|AA|3|8|
Canutility|CC|NULL||
] (delimiter is '|');
Set NULLINTERPRET=;
NullCount1:
LOAD Customer,NullCount(OrderNumber) as NullOrdersByCustomer Resident Temp Group By Customer;

LOAD NullCount(OrderNumber) as TotalNullCount Resident Temp;
```

Result:

| Customer | NullOrdersByCustomer |
| -------- | -------------------- |
| Astrida | 0 |
| Betacab | 0 |
| Canutility | 1 |

The second statement gives:

| TotalNullCount |
| -------------- |
| 1 |

in a table with that dimension, because only one record contains a null value.

## NumericCount

NumericCount() returns the number of numeric values found in the
expression, as defined by a group by clause.

`NumericCount([distinct] expr )`

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

### Example 1

```code
Temp:
LOAD * inline [
Customer|Product|OrderNumber|UnitSales|UnitPrice
Astrida|AA|1|4|16
Astrida|AA|7|10|15
Astrida|BB|4|9|9
Betacab|CC|6|5|10
Betacab|AA|5|2|20
Betacab|BB||| 25
Canutility|AA|||15
Canutility|CC| ||19
Divadip|CC|2|4|16
Divadip|DD|7|1|25
] (delimiter is '|');

NumCount1:
LOAD Customer,NumericCount(OrderNumber) as NumericCountByCustomer Resident Temp Group By Customer;
```

| Customer | NumericCountByCustomer |
| -------- | ---------------------- |
| Astrida | 3 |
| Betacab | 2 |
| Canutility | 0 |
| Divadip | 2 |

### Example 2

```code
LOAD NumericCount(OrderNumber) as TotalNumericCount Resident Temp;
```

The second statement gives:

| TotalNumericCount |
| ----------------- |
| 7 |

in a table with that dimension.

### Example 3

Given that the Temp table is loaded as in the previous example:

```code
LOAD NumericCount(distinct OrderNumber) as TotalNumeriCCountDistinct Resident Temp;
```

Result:

| TotalNumericCountDistinct |
| ------------------------- |
| 6 |

Because there is one OrderNumber that duplicates another, so the result is 6 that are not duplicates.

## TextCount

TextCount() returns the number of field values that are non-numeric aggregated in
the expression, as defined by a group by clause.

`TextCount ([distinct] expr )`

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

### Example

```code
Temp:
LOAD * inline [
Customer|Product|OrderNumber|UnitSales|UnitPrice
Astrida|AA|1|4|16
Astrida|AA|7|10|15
Astrida|BB|4|9|9
Betacab|CC|6|5|10
Betacab|AA|5|2|20
Betacab|BB||| 25
Canutility|AA|||15
Canutility|CC| ||19
Divadip|CC|2|4|16
Divadip|DD|3|1|25
] (delimiter is '|');

TextCount1:
LOAD Customer,TextCount(Product) as ProductTextCount Resident Temp Group By Customer;

TextCount2:
LOAD Customer,TextCount(OrderNumber) as OrderNumberTextCount Resident Temp Group By Customer;
```

| Customer | ProductTextCount | OrderNumberTextCount |
| -------- | ---------------- | -------------------- |
| Astrida | 3 | 0 |
| Betacab | 3 | 1 |
| Canutility | 2 | 2 |
| Divadip | 2 | 0 |
