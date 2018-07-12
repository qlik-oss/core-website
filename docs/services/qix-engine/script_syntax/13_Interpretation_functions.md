# InterpretationFunctions

## Date\#

Date#() evaluates an expression as a date in the format specified in the second
argument, if supplied.

`Date#( text[, format] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>text</td>
<td><p>The text string to be evaluated.</p></td>
</tr>
<tr class="even">
<td>format</td>
<td><p>String describing the format of the text string to be evaluated. If omitted, the date format set in the system variables in the data load script, or the operating system is used.</p>
<p><em>Conventions for number and time formats</em></p></td>
</tr>
</tbody>
</table>

Examples and results:

The following example uses the date format
M/D/YYYY. The
date format is specified in the
SET DateFormat statement at the top of the data load script.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Add this example script to your app and run it.</p>
<p>Load *,</p>
<p>Num(Date#(StringDate)) as Date;</p>
<p>LOAD * INLINE [</p>
<p>StringDate</p>
<p>8/7/97</p>
<p>8/6/1997</p></td>
<td><p>If you create a table with StringDate and Date as dimensions, the results are as follows:</p>
<table>
<tbody>
<tr class="odd">
<td>StringDate</td>
<td>Date</td>
</tr>
<tr class="even">
<td>8/7/97</td>
<td>35649</td>
</tr>
<tr class="odd">
<td>8/6/1997</td>
<td>35648</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## Interval\#

Interval#()
evaluates a text expression as a time interval in the format set in the
operating system, by default, or in the format specified in the second
argument, if supplied.

`Interval#( text[, format] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>text</td>
<td><p>The text string to be evaluated.</p></td>
</tr>
<tr class="even">
<td>format</td>
<td><p>String describing the expected input format to use when converting the string to a numeric interval.</p>
<p>If omitted, the short date format, time format, and decimal separator set in the operating system are used.</p></td>
</tr>
</tbody>
</table>

The **interval#** function converts a text time interval to a numeric equivalent.

Examples and results:

The examples below assume the following operating system settings:

- Short date format: YY-MM-DD
- Time format: M/D/YY
- Number decimal separator: .

<table style="width:85%;">
<colgroup>
<col style="width: 65%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Interval#( A, 'D hh:mm' )<br />
where A='1 09:00'</td>
<td>1.375</td>
</tr>
</tbody>
</table>

## Money\#

Money#() converts a text string to a money value, in the format set in the load
script or the operating system, unless a format string is supplied.
Custom decimal and thousand separator symbols are optional
parameters.

`Money#( text[, format[, dec_sep [, thou_sep ] ]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>text</td>
<td><p>The text string to be evaluated.</p></td>
</tr>
<tr class="even">
<td>format</td>
<td><p>String describing the expected input format to use when converting the string to a numeric interval.</p>
<p>If omitted, the money format set in the operating system is used.</p></td>
</tr>
<tr class="odd">
<td>dec_sep</td>
<td>String specifying the decimal number separator. If omitted, the MoneyDecimalSep value set in the data load script is used.</td>
</tr>
<tr class="even">
<td>thou_sep</td>
<td>String specifying the thousands number separator. If omitted, the MoneyThousandSep value set in the data load script is used.</td>
</tr>
</tbody>
</table>

The **money#** function generally behaves just like the
 **num\#** function but takes its default values for decimal and thousand separator
from the script variables for money format or the system settings for
currency.

Examples and results:

The examples below assume the two following operating system settings:

- Money format default setting 1: kr \# \#\#0,00
- Money format default setting 2: $ \#,\#\#0.00

Example

Results

Setting 1

Setting
2

Money\#(A , '\# \#\#0,00 kr' )  
where A=35 648,37 kr

String:

35 648.37 kr

35 648.37
kr

Number:

35648.37

3564837

Money\#( A, ' $\#', '.', ',' )  
where A=
$35,648.37

String:

$35,648.37

$35,648.37

Number:

35648.37

35648.37

## Num\#

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

Examples and results:

The examples below assume the two following operating system settings:

- Number format default setting 1: \# \#\#0
- Number format default setting 2: \#,\#\#0

Example

Results

Setting 1

Setting
2

Num\#( A, '\#.\#', '.' , ',')  
where
A=35,648.375

String:

35,648.375

35,648.375

Number:

35648.375

35648.375

## Text

 **Text()** forces the expression to be treated as text, even if a numeric
interpretation is possible.

`Text (expr)`

**Return data type:** dual

Examples and results:

Example

Result

Text( A )  
where
A=1234

String:

1234

Number:

\-

Text(
pi( )
)

String:

3.1415926535898

Number:

\-

## Timestamp\#

 **Timestamp#()** evaluates an expression as a date and time value, in the timestamp
format set in the data load script or the operating system, unless a
format string is
supplied.

`Timestamp#( text[, format] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>text</td>
<td><p>The text string to be evaluated.</p></td>
</tr>
<tr class="even">
<td>format</td>
<td><p>String describing the format of the text string to be evaluated. If omitted, the short date format, time format, and decimal separator set in the operating system is used. ISO 8601 is supported for timestamps.</p>
<p><em>Conventions for number and time formats</em></p></td>
</tr>
</tbody>
</table>

Examples and results:

The following example uses the date format
M/D/YYYY. The
date format is specified in the
SET DateFormat statement at the top of the data load script.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Results</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Add this example script to your app and run it.</p>
<p>Load *,</p>
<p>Timestamp(Timestamp#(String)) as TS;</p>
<p>LOAD * INLINE [</p>
<p>String</p>
<p>2015-09-15T12:13:14</p>
<p>1952-10-16T13:14:00+0200</p>
<p>1109-03-01T14:15</p>
<p>];</p></td>
<td><p>If you create a table with String and TS as dimensions, the results are as follows:</p>
<table>
<tbody>
<tr class="odd">
<td>String</td>
<td>TS</td>
</tr>
<tr class="even">
<td>2015-09-15T12:13:14</td>
<td>9/15/2015 12:13:14 PM</td>
</tr>
<tr class="odd">
<td>1952-10-16T13:14:00+0200</td>
<td>10/16/1952 11:14:00 AM</td>
</tr>
<tr class="even">
<td>1109-03-01T14:15</td>
<td>3/1/1109 2:15:00 PM</td>
</tr>
</tbody>
</table>
<p> </p></td>
</tr>
</tbody>
</table>

## Time\#

 **Time#()** evaluates an expression as a time value, in the time format set in the
data load script or the operating system, unless a format string is
supplied..

`Time#( text[, format] )`
**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>text</td>
<td><p>The text string to be evaluated.</p></td>
</tr>
<tr class="even">
<td>format</td>
<td><p>String describing the format of the text string to be evaluated. If omitted, the short date format, time format, and decimal separator set in the operating system is used.</p>
<p><em>Conventions for number and time formats</em></p></td>
</tr>
</tbody>
</table>

Examples and results:

The examples below assume the two following operating system settings:

- Time format default setting 1: hh:mm:ss
- Time format default setting 2: hh.mm.ss

Example

Results

Setting 1

Setting
2

time\#( A )  
where
A=09:00:00

String:

09:00:00

09:00:00

Number:

0.375

\-

time\#( A, 'hh.mm' )  
where
A=09.00

String:

09.00

09.00

Number:

0.375

0.375