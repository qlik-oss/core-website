# Formatting functions

## ApplyCodepage

ApplyCodepage() applies a different code page character set to the field or text
stated in the expression. The codepage argument must be in number format.

Although ApplyCodepage can be used in chart expressions, it is more
commonly used as a script function in the data load editor. For example,
as you load files that might have been saved in different character sets
out of your control, you can apply the code page that represents the
character set you
require.

`ApplyCodepage(text, codepage)`

**Return data type:** string

| Argument | Description                                                                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text     | Field or text to which you want to apply a different code page, given by the argument . |
| codepage | Number representing the code page to be applied to the field or expression given by text.|

| Example | Result |
| ------- | ------ |
| <code>LOAD<BR>ApplyCodepage(ROWX,1253) as GreekProduct,<BR>ApplyCodepage (ROWY, 1255) as HebrewProduct,<BR>ApplyCodepage (ROWZ, 65001) as EnglishProduct;<BR>SQL SELECT ROWX, ROWY, ROWZ From Products;</code> | When loading from SQL the source might have a mixture of different character sets: Cyrillic, Hebrew, and so on, from the UTF-8 format. These would be required to be loaded row by row, applying a different code page for each row.<BR>The codepage value 1253 represents Windows Greek character set, the value 1255 represents Hebrew, and the value 65001 represents standard Latin UTF-8 characters. |

## Date

Date() formats an expression as a date using the format set in the system variables
in the data load script, or the operating system, or a format string, if supplied.

`Date(number[, format])`

**Return data type:** dual

| Argument | Description                                                                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number   | The number to be formatted.                                                                                                                                                                  |
| format   | String describing the format of the resulting string. If no format string is supplied, the date format set in the system variables in the data load script, or the operating system is used. |

**Examples and results:**

The examples below assume the following default settings:

- Date setting 1: YY-MM-DD
- Date setting 2: M/D/YY

| Example | Result | Setting 1 | Setting 2 |
| ------- | ------ | ------- | ------ |
| Date( A )<BR>where A=35648 | String:<BR>Number: | 97-08-06<BR>35648 | 8/6/97<BR>35648 |
| Date( A, 'YY.MM.DD' )<BR>where A=35648 | String:<BR>Number: | 97.08.06<BR>35648 | 97.08.06<BR>35648 |
| Date( A, 'DD.MM.YYYY' )<BR>where A=35648.375 | String:<BR>Number: | 06.08.1997<BR>35648.375 | 06.08.1997<BR>35648.375 |
| Date( A, 'YY.MM.DD' )<BR>where A=8/6/97 | String:<BR>Number: | NULL (nothing)<BR>NULL | 97.08.06<BR>35648 |

### Dual

Dual() combines a number and a string into a single record, such that the number
representation of the record can be used for sorting and calculation purposes,
while the string value can be used for display purposes.

`Dual(text, number)`

**Return data type:** dual

| Argument | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| text     | The string value to be used in combination with the number argument.         |
| number   | The number to be used in combination with the string in the string argument. |

All field values are potentially dual values. This means
that the field values can have both a numeric value and a textual value.
An example is a date that could have a numeric value of 40908 and the
textual representation ‘2011-12-31’.

When several data items read into one field have different string
representations but the same valid number representation, they will all
share the first string representation encountered.

!!! Note
    The dual function is typically used early in the script, before other data is
    read into the field concerned, in order to create that first string
    representation, which will be shown in filter panes.

| Example | Description |
| ------- | ----------- |
| Add the following examples to your script and run it.<BR><Code>Load dual ( NameDay,NumDay ) as DayOfWeek inline<BR>[ NameDay,NumDay<BR>Monday,0<BR>Tuesday,1<BR>Wednesday,2<BR>Thursday,3<BR>Friday,4<BR>Saturday,5<BR>Sunday,6 ];</Code> | The field DayOfWeek can be used in a visualization, as a dimension, for example.In a table with the week days are automatically sorted into their correct number sequence, instead of alphabetical order. |
| <Code>Load Dual('Q' & Ceil(Month(Now())/3), Ceil(Month(Now())/3)) as Quarter AutoGenerate 1;</Code> | This example finds the current quarter. It is displayed as Q1 when the Now() function is run in the first three months of the year, Q2 for the second three months, and so on. However, when used in sorting, the field Quarter will behave as its numerical value: 1 to 4. |
| <Code>Dual('Q' & Ceil(Month(Date)/3), Ceil(Month(Date)/3)) as Quarter</code> | As in the previous example, the field Quarter is created with the text values 'Q1' to 'Q4', and assigned the numeric values 1 to 4. In order to use this in the script the values for Date must be loaded. |
| <Code>Dual(WeekYear(Date) & '-W' & Week(Date), WeekStart(Date)) as YearWeek</code> | This example create sa field YearWeek with text values of the form '2012-W22' and at the same time, assigns a numeric value corresponding to the date number of the first day of the week, for example: 41057. In order to use this in the script the values for Date must be loaded. |

## Interval

Interval() formats a number as a time interval using the format in the system
variables in the data load script, or the operating system, or a format string,
if supplied.

Intervals may be formatted as a time, as days or as a combination of days, hours,
minutes, seconds and fractions of seconds.

`Interval(number[, format])`

**Return data type:** dual

| Argument | Description |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number   | The number to be formatted.                                                                                                                                                         |
| format   | String describing how the resulting interval string is to be formatted. If omitted, the short date format, time format, and decimal separator set in the operating system are used. |

Examples and results:

The examples below assume the following default settings:

- Date format setting 1: YY-MM-DD
- Date format setting 2: hh:mm:ss
- Number decimal separator: .

| Example | String | Number |
| ------- | ------ | ------ |
| Interval( A )<BR>where A=0.375 | 09:00:00 | 0.375 |
| Interval( A )<BR>where A=1.375 | 33:00:00 | 1.375 |
| Interval( A, 'D hh:mm' )<BR>where A=1.375 | 1 09:00 | 1.375 |
| Interval( A-B, 'D hh:mm' )<BR>where A=97-08-06 | 09:00:00 and B=96-08-06 00:00:00 | 365 09:00 | 365.375 |

## Money

Money() formats an expression numerically as a money value, in the format set in
the system variables set in the data load script, or in the operating
system, unless a format string is supplied, and optional decimal and
thousands separators.

`Money(number[, format[, dec_sep[, thou_sep]]])`

**Return data type:** dual

| Argument  | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| number    | The number to be formatted.                                          |
| format    | String describing how the resulting money string is to be formatted. |
| dec_sep  | String specifying the decimal number separator.                       |
| thou_sep | String specifying the thousands number separator.                     |

If arguments 2-4 are omitted, the currency format set in the operating
system is used.

Examples and results:

The examples below assume the following default settings:

- MoneyFormat setting 1: kr ##0,00, MoneyThousandSep' '
- MoneyFormat setting 2: $ #,##0.00, MoneyThousandSep','

| Example | Results | Setting 1 | Setting 2 |
| ------- | ------- | --------- | --------- |
| Money( A )<BR>where A=35648 | String:<BR>Number: | kr 35 648,00<BR>35648.00 | $ 35,648.00<BR>35648.00 |
| Money( A, '#,##0 ¥', '.' , ',' )<BR>where A=3564800 | String:<BR>Number: | 3,564,800 ¥<BR>3564800 | 3,564,800 ¥<BR>3564800 |

## Num

Num() formats an expression numerically in the number format set in the system
variables in the data load script, or in the operating system, unless a
format string is supplied, and optional decimal and thousands separators.

`Num( number[, format[, dec_sep [, thou_sep]]] )`

**Return data type:** dual

| Argument  | Description                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| number    | The number to be formatted.                                                                                                          |
| format    | String describing how the resulting date string is to be formatted. If omitted, the date format set in the operating system is used. |
| dec_sep   | String specifying the decimal number separator. If omitted, the MoneyDecimalSep value set in the data load script is used.           |
| thou_sep  | String specifying the thousands number separator. If omitted, the MoneyThousandSep value set in the data load script is used.        |

Examples and results:

The examples below assume the following default settings:

- Number format setting 1: # ##0
- Number format setting 2: #,##0

| Example | Results | Setting 1 | Setting 2 |
| ------- | ------- | --------- | --------- |
| Num( A, '0.0' )<BR>where A=35648.375 | String:<BR>Number: | 35 648 375<BR>35648375 | 35648.375<BR>35648.375
| Num( A, '#,##0.##', '.' , ',' )<BR>where A=35648 | String:<BR>Number: | 35,648.00<BR>35648 | 35,648.00<BR>35648 |
| Num( pi( ), '0,00' ) | String:<BR>Number: | 3,14<BR>3.141592653 | 003<BR>3.141592653 |

| Example | Result |
| ------- | ------ |
| Add this example script to your app and run it.<BR>Then build a straight table with Field1 and Field2 as dimensions.<BR>
<Code>Sheet1:<BR>let result= Num( pi( ), '0,00' );<BR>Load * inline<BR>\[Field1; Field2<BR>9; 8,2<BR>1; $(result)<BR>\](delimiter is ';');</Code> | Field1 contains the values 1 and 9.<BR>Field2 contains the values 3,14 and 8,2. |

## Time

Time() formats an expression as a time value, in the time format set in the system
variables in the data load script, or in the operating system, unless a format string is
supplied.

`Time(number[, format])`
**Return data type:** dual

| Argument | Description                                                                                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| number   | The number to be formatted.                                                                                                                                                    |
| format   | String describing how the resulting time string is to be formatted. If omitted, the short date format, time format, and decimal separator set in the operating system is used. |

Examples and results:

The examples below assume the following default settings:

- Time format setting 1: hh:mm:ss
- Time format setting 2: hh.mm.ss

| Example | Results | Setting 1 | Setting 2 |
| ------- | ------- | --------- | --------- |
| Time( A )<BR>where A=0.375 | String:<BR>Number: | 09:00:00<BR>0.375 | 09.00.00<BR>0.375 |
| Time( A )<BR>where A=35648.375 | String:<BR>Number: | 09:00:00<BR>35648.375 | 09.00.00<BR>35648.375 |
| Time( A, 'hh-mm' )<BR>where A=0.99999 | String:<BR>Number: | 23-59<BR>0.99999 | 23-59<BR>0.99999 |

## Timestamp

TimeStamp() formats an expression as a date and time value, in the timestamp format
set in the system variables in the data load script, or in the operating
system, unless a format string is supplied.

`Timestamp(number[, format])`

**Return data type:** dual

| Argument | Description                                                                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| number   | The number to be formatted.                                                                                                                                                         |
| format   | String describing how the resulting timestamp string is to be formatted. If omitted, the short date format, time format, and decimal separator set in the operating system is used. |

Examples and results:

The examples below assume the following default settings:

- TimeStampFormat setting 1: YY-MM-DD hh:mm:ss
- TimeStampFormat setting 2: M/D/YY hh:mm:ss

| Example | Results | Setting 1 | Setting 2 |
| ------- | ------- | --------- | --------- |
| Timestamp( A )<BR>where A=35648.375 | String:<BR>Number: | 97-08-06 09:00:00<BR>35648.375 | 8/6/97 09:00:00<BR>35648.375 |
| Timestamp( A,'YYYY-MM-DD hh.mm')<BR>where A=35648 | String:<BR>Number: | 1997-08-06 00.00<BR>35648 | 1997-08-06 00.00<BR>35648 |
