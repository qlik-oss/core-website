# InterpretationFunctions

The interpretation functions evaluate the contents of input text
fields or expressions, and impose a specified data format on the
resulting numeric value. With these functions, you can specify the
format of the number, in accordance with its data type, including
attributes such as: decimal separator, thousands separator, and
date format.

The interpretation functions all return a dual value with both the
string and the number value, but can be thought of as performing a
string-to-number conversion. The functions take the text value of
the input expression and generate a number representing the string.

In contrast, the formatting functions do the opposite: they take
numeric expressions and evaluate them as strings, specifying the
display format of the resulting text.

If no interpretation functions are used, the engine interprets the
data as a mix of numbers, dates, times, time stamps and strings,
using the default settings for number format, date format, and
time format, defined by script variables and by the operating system.

All interpretation functions can be used in both data load scripts
and chart expressions.

!!! Note
    For reasons of clarity, all number representations are given with a decimal point as the decimal separator.

## Date# #

Date#() evaluates an expression as a date in the format specified in the second
argument, if supplied.

`Date#(text[, format])`

**Return data type:** dual

| Argument | Description |
| -------- | ----------- |
| text     | The text string to be evaluated. |
| format   | String describing the format of the text string to be evaluated. If omitted, the date format set in the system variables in the data load script, or the operating system is used.

**Examples and results:**

The following example uses the date format M/D/YYYY. The date format is specified in the
SET DateFormat statement at the top of the data load script.

Add this example script to your app and run it.

```qlik
Load *,
Num(Date#(StringDate)) as Date;
LOAD * INLINE [
StringDate
8/7/97
8/6/1997
```

If you create a table with StringDate and Date as dimensions, the results are as follows:

| StringDate | Date  |
| ---------- | ----- |
| 8/7/97     | 35649 |
| 8/6/1997   | 35648 |

## Interval# #

Interval#() evaluates a text expression as a time interval in the format set in the
operating system, by default, or in the format specified in the second
argument, if supplied.

`Interval#(text[, format])`

**Return data type:** dual

| Argument | Description |
| -------- | ----------- |
| text     | The text string to be evaluated.|
| format   | String describing the expected input format to use when converting the string to a numeric interval. If omitted, the short date format, time format, and decimal separator set in the operating system are used.|

The **interval#** function converts a text time interval to a numeric equivalent.

**Examples and results:**

The examples below assume the following operating system settings:

- Short date format: YY-MM-DD
- Time format: M/D/YY
- Number decimal separator: .

| Example | Result |
| ------- | ------ |
| Interval#( A, 'D hh:mm' ) <br> where A='1 09:00' | 1.375 |

## Money# #

Money#() converts a text string to a money value, in the format set in the load
script or the operating system, unless a format string is supplied.
Custom decimal and thousand separator symbols are optional
parameters.

`Money#(text[, format[, dec_sep [, thou_sep ] ]])`

**Return data type:** dual

| Argument | Description |
| -------- | ----------- |
| text     | The text string to be evaluated.|
| format   | String describing the expected input format to use when converting the string to a numeric interval. If omitted, the money format set in the operating system is used.|
| dec_sep  | String specifying the decimal number separator. If omitted, the MoneyDecimalSep value set in the data load script is used.|
| thou_sep | String specifying the thousands number separator. If omitted, the MoneyThousandSep value set in the data load script is used.|

The **money#** function generally behaves just like the
 **num\#** function but takes its default values for decimal and thousand separator
from the script variables for money format or the system settings for
currency.

**Examples and results:**

The examples below assume the two following operating system settings:

- Money format default setting 1: kr \# \#\#0,00
- Money format default setting 2: $ \#,\#\#0.00

| Example | Results | Setting 1 | Setting 2 |
| ------- | ------- | --------- | --------- |
| Money#(A , '# ##0,00 kr' ) <br> where A=35 648,37 kr | String | 35 648.37 kr | 35 648.37 kr |
|  | Number: | 35648.37 | 3564837 |
| Money#( A, ' $#', '.', ',' ) <br> where A= $35,648.37 | String | $35,648.37 | $35,648.37 |
| | Number: | 35648.37 | 35648.37 |

## Num# #

Num#() converts a text string to a numerical value, in the number format set in
the data load script or the operating system. Custom decimal and
thousand separator symbols are optional parameters.

`Num#(text[, format[, dec_sep [, thou_sep ]]] )`

**Return data type:** dual

| Argument  | Description|
| --------- | ------------------------------------------------------------------------------ |
| text      | The text string to be evaluated.|
| format    | String describing how the resulting date string is to be formatted. If omitted, the number format set in the operating system is used. |
| dec_sep  | String specifying the decimal number separator. If omitted, the DecimalSep value set in the data load script is used.|
| thou_sep | String specifying the thousands number separator. If omitted, the ThousandSep value set in the data load script is used.|

**Examples and results:**

The examples below assume the two following operating system settings:

- Number format default setting 1: \# \#\#0
- Number format default setting 2: \#,\#\#0

| Example | Results | Setting 1 | Setting 2 |
| ------- | ------- | --------- | --------- |
| Num#( A, '#.#', '.' , ',') <br> where A=35,648.375 | String | 35,648.375 | 35,648.375 |
| | Number | 35648.375 | 35648.375 |

## Text

 **Text()** forces the expression to be treated as text, even if a numeric
interpretation is possible.

`Text(expr)`

**Return data type:** dual

**Examples and results:**

| Example | Result |  |
| ------- | ------ | - |
| Text(A) <br> where A=1234 | String | 1234 |
| | Number | - |
| Text( pi( ) ) | String  |3.1415926535898 |
| | Number | - |

## Timestamp# #

 **Timestamp#()** evaluates an expression as a date and time value, in the timestamp
format set in the data load script or the operating system, unless a
format string is supplied.

`Timestamp#(text[, format])`

**Return data type:** dual

| Argument | Description |
| -------- | ----------- |
| text     | The text string to be evaluated. |
| format   | String describing the format of the text string to be evaluated. If omitted, the short date format, time format, and decimal separator set in the operating system is used. ISO 8601 is supported for timestamps.|

Examples and results:

The following example uses the date format M/D/YYYY. The date format is specified in the
**SET DateFormat** statement at the top of the data load script.

Add this example script to your app and run it.

```qlik
Load *,
Timestamp(Timestamp#(String)) as TS;
LOAD * INLINE [
String
2015-09-15T12:13:14
1952-10-16T13:14:00+0200
1109-03-01T14:15
];
```

If you create a table with String and TS as dimensions, the results are as follows:

| String | TS |
| ------ | -- |
| 2015-09-15T12:13:14 | 9/15/2015 12:13:14 PM |
| 1952-10-16T13:14:00+0200 | 10/16/1952 11:14:00 AM|
| 1109-03-01T14:15 | 3/1/1109 2:15:00 PM |

## Time# #

**Time#()** evaluates an expression as a time value, in the time format set in the
data load script or the operating system, unless a format string is
supplied..

`Time#(text[, format])`

**Return data type:** dual

| Argument | Description |
| -------- | ----------- |
| text     | The text string to be evaluated. |
| format   | String describing the format of the text string to be evaluated. If omitted, the short date format, time format, and decimal separator set in the operating system is used.|

**Examples and results:**

The examples below assume the two following operating system settings:

- Time format default setting 1: hh:mm:ss
- Time format default setting 2: hh.mm.ss

| Example | Results | Setting 1 | Setting 2 |
| ------- | ------- | --------- | --------- |
| time#( A ) <br> where A=09:00:00 | String | 09:00:00 | 09:00:00 |
| | Number | 0.375 | - |
| time#( A, 'hh.mm' ) <br> where A=09.00 | String | 09.00 | 09.00 |
| | Number | 0.375 | 0.375 |
