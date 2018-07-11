

## FormattingFunctions

# ApplyCodepage - script and chart function

 **ApplyCodepage()** 
applies a different code page character set to the field or text stated
in the expression. The
 **codepage** 
argument must be in number format.



Although ApplyCodepage can be used in chart expressions, it is more
commonly used as a script function in the data load editor. For example,
as you load files that might have been saved in different character sets
out of your control, you can apply the code page that represents the
character set you
require.



 

, codepage)

string

 

| Argument | Description                                                                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text     | Field or text to which you want to apply a different code page, given by the argument . | | codepage | Number representing the code page to be applied to the field or expression given by **text.       |

Examples and results:

<table style="width:30%;">
<colgroup>
<col style="width: 30%" />
<col style="width: 0%" />
</colgroup>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>LOAD </p>
<p>ApplyCodepage(ROWX,1253) as GreekProduct,</p>
<p>ApplyCodepage (ROWY, 1255) as HebrewProduct,</p>
<p>ApplyCodepage (ROWZ, 65001) as EnglishProduct;</p>
<p>SQL SELECT ROWX, ROWY, ROWZ From Products;</p></td>
<td><p>When loading from SQL the source might have a mixture of different character sets: Cyrillic, Hebrew, and so on, from the UTF-8 format. These would be required to be loaded row by row, applying a different code page for each row.</p>
<p>The  **codepage**  value 1253 represents Windows Greek character set, the value 1255 represents Hebrew, and the value 65001 represents standard Latin UTF-8 characters.</p></td>
</tr>
</tbody>
</table>

<div class="see_also" data-autonumposition="none">

*Character
set*



# Date - script and chart function

Date() formats an expression as a date using the format set in the
system variables in the data load script, or the operating system, or a
format string, if
supplied.

 

[, format])

dual

string

QLIK-41197 The result in the example should returned only a
string.

 

| Argument | Description                                                                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number   | The number to be formatted.                                                                                                                                                                  |
| format   | String describing the format of the resulting string. If no format string is supplied, the date format set in the system variables in the data load script, or the operating system is used. |

Examples and results:

The examples below assume the following default settings:

  - Date setting 1: YY-MM-DD
  - Date setting 2: M/D/YY

Example

Results

Setting 1

Setting
2

Date( A )  
where
A=35648

String:

97-08-06

8/6/97

Number:

35648

35648

Date( A, 'YY.MM.DD' )  
where
A=35648

String:

97.08.06

97.08.06

Number:

35648

35648

Date( A, 'DD.MM.YYYY' )  
where
A=35648.375

String:

06.08.1997

06.08.1997

Number:

35648.375

35648.375

Date( A, 'YY.MM.DD' )  
where
A=8/6/97

String:

NULL (nothing)

97.08.06

Number:

NULL

35648

# Dual - script and chart function

 **Dual()** 
combines a number and a string into a single record, such that the
number representation of the record can be used for sorting and
calculation purposes, while the string value can be used for display
purposes.

 

text, number)

dual

 

| Argument | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| text     | The string value to be used in combination with the number argument.         |
| number   | The number to be used in combination with the string in the string argument. |

In Qlik Sense, all field values are potentially dual values. This means
that the field values can have both a numeric value and a textual value.
An example is a date that could have a numeric value of 40908 and the
textual representation ‘2011-12-31’.

When several data items read into one field have different string
representations but the same valid number representation, they will all
share the first string representation encountered.



The
 **dual** 
function is typically used early in the script, before other data is
read into the field concerned, in order to create that first string
representation, which will be shown in filter panes.



Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Add the following examples to your script and run it.</p>
<p>Load dual ( NameDay,NumDay ) as DayOfWeek inline</p>
<p>[ NameDay,NumDay</p>
<p>Monday,0</p>
<p>Tuesday,1</p>
<p>Wednesday,2</p>
<p>Thursday,3</p>
<p>Friday,4</p>
<p>Saturday,5</p>
<p>Sunday,6 ];</p></td>
<td>The field DayOfWeek can be used in a visualization, as a dimension, for example.In a table with the week days are automatically sorted into their correct number sequence, instead of alphabetical order.</td>
</tr>
<tr class="even">
<td> <td>This example finds the current quarter. It is displayed as Q1 when the Now() function is run in the first three months of the year, Q2 for the second three months, and so on. However, when used in sorting, the field Quarter will behave as its numerical value: 1 to 4.</td>
</tr>
<tr class="odd">
<td>Dual('Q' &amp; Ceil(Month(Date)/3), Ceil(Month(Date)/3)) as Quarter</td>
<td>As in the previous example, the field Quarter is created with the text values 'Q1' to 'Q4', and assigned the numeric values 1 to 4. In order to use this in the script the values for Date must be loaded.</td>
</tr>
<tr class="even">
<td>Dual(WeekYear(Date) &amp; '-W' &amp; Week(Date), WeekStart(Date)) as YearWeek</td>
<td>This example create sa field YearWeek with text values of the form '2012-W22' and at the same time, assigns a numeric value corresponding to the date number of the first day of the week, for example: 41057. In order to use this in the script the values for Date must be loaded.</td>
</tr>
</tbody>
</table>

# Formatting functions

The formatting functions impose the display format on the input numeric
fields or expressions, Depending on data type, you can specify the
characters for the decimal separator, thousands separator, and so on.

The functions all return a dual value with both the string and the
number value, but can be thought of as performing a number-to-string
conversion.
Dual() is a
special case, but the other formatting functions take the numeric value
of the input expression and generate a string representing the number.

In contrast, the interpretation functions do the opposite: they take
string expressions and evaluate them as numbers, specifying the format
of the resulting number.

The functions can be used both in data load scripts and chart
expressions.



For reasons of clarity, all number representations are given with a
decimal point as the decimal
separator.



## Formatting functions overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the
functions.

ApplyCodepage

 **ApplyCodepage()** 
applies a different code page character set to the field or text stated
in the expression. The
 **codepage** 
argument must be in number
format.

**ApplyCodePage2333012249** (text, codepage)

Date

Date() formats an expression as a date using the format set in the
system variables in the data load script, or the operating system, or a
format string, if
supplied.

number[, format])

Dual

 **Dual()** 
combines a number and a string into a single record, such that the
number representation of the record can be used for sorting and
calculation purposes, while the string value can be used for display
purposes.

text, number)

Interval

Interval()
formats a number as a time interval using the format in the system
variables in the data load script, or the operating system, or a format
string, if
supplied.

number[, format])

Money

 **Money()** 
formats an expression numerically as a money value, in the format set in
the system variables set in the data load script, or in the operating
system, unless a format string is supplied, and optional decimal and
thousands
separators.

**Money2207513545**(number[,
format[, dec_sep [,
thou_sep]]])

Num

Num() formats
an expression numerically in the number format set in the system
variables in the data load script, or in the operating system, unless a
format string is supplied, and optional decimal and thousands
separators.

**Num2477684916**(number[,
format[, dec_sep [,
thou_sep]]])

Time

Time()
formats an expression as a time value, in the time format set in the
system variables in the data load script, or in the operating system,
unless a format string is
supplied.

number[, format])

Timestamp

TimeStamp()
formats an expression as a date and time value, in the timestamp format
set in the system variables in the data load script, or in the operating
system, unless a format string is
supplied.

number[, format])

 

*Interpretation
functions*

# Interval - script and chart function

Interval()
formats a number as a time interval using the format in the system
variables in the data load script, or the operating system, or a format
string, if supplied.

Intervals may be formatted as a time, as days or as a combination of
days, hours, minutes, seconds and fractions of
seconds.

 

number[, format])

dual

string

QLIK-41197 The result in the example should returned only a
string.

 

| Argument | Description                                                                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number   | The number to be formatted.                                                                                                                                                         |
| format   | String describing how the resulting interval string is to be formatted. If omitted, the short date format, time format, and decimal separator set in the operating system are used. |

Examples and results:

The examples below assume the following default settings:

  - Date format setting 1: YY-MM-DD
  - Date format setting 2: hh:mm:ss
  - Number decimal separator: .

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>String</th>
<th>Number</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Interval( A )<br />
where A=0.375</td>
<td>09:00:00</td>
<td>0.375</td>
</tr>
<tr class="even">
<td>Interval( A )<br />
where A=1.375</td>
<td>33:00:00</td>
<td>1.375</td>
</tr>
<tr class="odd">
<td>Interval( A, 'D hh:mm' )<br />
where A=1.375</td>
<td>1 09:00</td>
<td>1.375</td>
</tr>
<tr class="even">
<td>Interval( A-B, 'D hh:mm' )<br />
where A=97-08-06 09:00:00 and B=96-08-06 00:00:00</td>
<td>365 09:00</td>
<td>365.375</td>
</tr>
</tbody>
</table>

# Money - script and chart function

 **Money()** 
formats an expression numerically as a money value, in the format set in
the system variables set in the data load script, or in the operating
system, unless a format string is supplied, and optional decimal and
thousands
separators.

 

Money(number[,
format[, dec_sep[,
thou_sep]]])

dual

string

QLIK-41197 The result in the example should returned only a
string.

  

| Argument  | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| number    | The number to be formatted.                                          |
| format    | String describing how the resulting money string is to be formatted. |
| dec_sep  | String specifying the decimal number separator.                      |
| thou_sep | String specifying the thousands number separator.                    |

If arguments 2-4 are omitted, the currency format set in the operating
system is used.

Examples and results:

The examples below assume the following default settings:

  - MoneyFormat setting 1: kr \#\#0,00, MoneyThousandSep' '
  - MoneyFormat setting 2: $ \#,\#\#0.00, MoneyThousandSep','

Example

Results

Setting 1

Setting
2

Money( A )  
where A=35648

String:

kr 35 648,00

$
35,648.00

Number:

35648.00

35648.00

Money( A, '\#,\#\#0 ¥', '.' , ',' )  
where A=3564800

String:

3,564,800 ¥

3,564,800
¥

Number:

3564800

3564800

# Num - script and chart function

Num() formats
an expression numerically in the number format set in the system
variables in the data load script, or in the operating system, unless a
format string is supplied, and optional decimal and thousands
separators.

 

Num(number[,
format[, dec_sep [,
thou_sep]]])

dual

string

QLIK-41197 The result in the example should returned only a
string.

  

| Argument  | Description                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| number    | The number to be formatted.                                                                                                          |
| format    | String describing how the resulting date string is to be formatted. If omitted, the date format set in the operating system is used. |
| dec_sep  | String specifying the decimal number separator. If omitted, the MoneyDecimalSep value set in the data load script is used.           |
| thou_sep | String specifying the thousands number separator. If omitted, the MoneyThousandSep value set in the data load script is used.        |

Examples and results:

The examples below assume the following default settings:

  - Number format setting 1: \# \#\#0
  - Number format setting 2: \#,\#\#0

Example

Results

Setting 1

Setting
2

 Num( A, '0.0' )  
where A=35648.375

String:

35 648
375

35648.375

Number:

35648375

35648.375

Num( A, '\#,\#\#0.\#\#', '.' , ',' )  
where
A=35648

String:

35,648.00

35,648.00

Number:

35648

35648

Num( pi( ), '0,00' )

String:

3,14

003

Number:

3.141592653

3.141592653

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Add this example script to your app and run it.</p>
<p>Then build a straight table with Field1 and Field2 as dimensions.</p>
<p>Sheet1:</p>
<p>let result= Num( pi( ), '0,00' );</p>
<p>Load * inline</p>
<p>[Field1; Field2</p>
<p>9; 8,2</p>
<p>1; $(result)</p>
<p>](delimiter is ';');</p></td>
<td><p>Field1 contains the values 1 and 9.</p>
<p>Field2 contains the values 3,14 and 8,2.</p>
<p> </p></td>
</tr>
</tbody>
</table>

# Time - script and chart function

Time()
formats an expression as a time value, in the time format set in the
system variables in the data load script, or in the operating system,
unless a format string is
supplied.

 

number[, format])

dual

string

QLIK-41197 The result in the example should returned only a
string.

 

| Argument | Description                                                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| number   | The number to be formatted.                                                                                                                                                    |
| format   | String describing how the resulting time string is to be formatted. If omitted, the short date format, time format, and decimal separator set in the operating system is used. |

Examples and results:

The examples below assume the following default settings:

  - Time format setting 1: hh:mm:ss
  - Time format setting 2: hh.mm.ss

Example

Results

Setting 1

Setting
2

Time( A )  
where
A=0.375

String:

09:00:00

09.00.00

Number:

0.375

0.375

Time( A )  
where
A=35648.375

String:

09:00:00

09.00.00

Number:

35648.375

35648.375

Time( A, 'hh-mm' )  
where
A=0.99999

String:

23-59

23-59

Number:

0.99999

0.99999

# Timestamp - script and chart function

TimeStamp()
formats an expression as a date and time value, in the timestamp format
set in the system variables in the data load script, or in the operating
system, unless a format string is
supplied.

 

number[, format])

dual

string

QLIK-41197 The result in the example should returned only a
string.

 

| Argument | Description                                                                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number   | The number to be formatted.                                                                                                                                                         |
| format   | String describing how the resulting timestamp string is to be formatted. If omitted, the short date format, time format, and decimal separator set in the operating system is used. |

Examples and results:

The examples below assume the following default settings:

  - TimeStampFormat setting 1: YY-MM-DD hh:mm:ss
  - TimeStampFormat setting 2: M/D/YY hh:mm:ss

Example

Results

Setting 1

Setting
2

Timestamp( A )  
where A=35648.375

String:

97-08-06 09:00:00

8/6/97
09:00:00

Number:

35648.375

35648.375

Timestamp( A,'YYYY-MM-DD hh.mm')  
where A=35648

String:

1997-08-06 00.00

1997-08-06
00.00

Number:

35648

35648