# Number Interpretation Variables

Number interpretation variables are system defined, that is, they are automatically generated according to the current
regional settings of the operating system when a new app is created. The variables are included at the top of the script
of the new app and substitute operating system defaults for certain number formatting settings at the time of the script
execution. They can be deleted, edited or duplicated freely.

## BrokenWeeks

The setting defines if weeks are broken or not.

`BrokenWeeks`

By default, functions use unbroken weeks. This means that:

- In some years, week 1 starts in December, and in other years, week
  52 or 53 continues into January.
- Week 1 always has at least 4 days in January.

The alternative is to use broken weeks.

- Week 52 or 53 do not continue into January.
- Week 1 starts on January 1 and is, in most cases, not a full week.

The following values can be used:

- 0 (=use unbroken weeks)
- 1 (= use broken weeks)

**Examples:**

```qlik
Set BrokenWeeks=0; //(use unbroken weeks)
Set BrokenWeeks=1; //(use broken weeks)
```

## DateFormat

The format defined replaces the date format of the operating system (regional settings).

`DateFormat`

**Example:**

```qlik
Set DateFormat='M/D/YY'; //(US format)
Set DateFormat='DD/MM/YY'; //(UK date format)
Set DateFormat='YYYY-MM-DD'; //(ISO date format)
```

## DayNames

The format defined replaces the weekday names convention of the operating system (regional settings).

`DayNames`

`Set DayNames='Mon;Tue;Wed;Thu;Fri;Sat;Sun';`

## DecimalSep

The decimal separator defined replaces the decimal symbol of the operating system (regional settings).

`DecimalSep`

**Examples:**

```qlik
Set DecimalSep='.';
Set DecimalSep=',';
```

## FirstWeekDay

Integer that defines which day to use as the first day of the week.

`FirstWeekDay`

By default, functions use Monday as the first day of the week. The following values can be used:

- 0 (= Monday)
- 1 (= Tuesday)
- 2 (= Wednesday)
- 3 (= Thursday)
- 4 (= Friday)
- 5 (= Saturday)
- 6 (= Sunday)

**Example:**

`Set FirstWeekDay=6; //(set Sunday as the first day of the week)`

## LongDayNames

The format defined replaces the long weekday names convention of the operating system (regional settings).

`LongDayNames`

**Example:**

`Set LongDayNames='Monday;Tuesday;Wednesday;Thursday;Friday;Saturday;Sunday';`

## LongMonthNames

The format defined replaces the long month names convention of the operating system (regional settings).

`LongMonthNames`

**Example**

`Set LongMonthNames='January;February;March;April;May;June;July;August;September;October;November;December';`

## MoneyDecimalSep

The decimal separator defined replaces the decimal symbol for currency of the operating system (regional settings).

`MoneyDecimalSep`

**Example:**

`Set MoneyDecimalSep='.';`

## MoneyFormat

The symbol defined replaces the currency symbol of the operating system (regional settings).

`MoneyFormat`

**Example:**

`Set MoneyFormat='$ #,##0.00; ($ #,##0.00)';`

## MoneyThousandSep

The thousands separator defined replaces the digit grouping symbol for currency of the operating system (regional
settings).

`MoneyThousandSep`

**Example:**

`Set MoneyThousandSep=',';`

## MonthNames

The format defined replaces the month names convention of the operating system (regional settings).

`MonthNames`

**Example:**

`Set MonthNames='Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec';`

## NumericalAbbreviation

The numerical abbreviation sets which abbreviation to use for scale prefixes of numerals, for example M for mega or a
million (10<sup>6</sup>), and µ for micro (10<sup>-6</sup>).

`NumericalAbbreviation`

You set the `NumericalAbbreviation` variable to a string containing a list of abbreviation definition pairs,
delimited by semi colon. Each abbreviation definition pair should contain the scale (the exponent in decimal base) and
the abbreviation separated by a colon, for example, `6:M` for a million.

The default setting is
`'3:k;6:M;9:G;12:T;15:P;18:E;21:Z;24:Y;-3:m;-6:µ;-9:n;-12:p;-15:f;-18:a;-21:z;-24:y'`

**Examples:**

This setting will change the prefix for a thousand to t and the prefix for a billion to B. This would be useful for
financial applications where you would expect abbreviations like t$, M$, and B$.

`Set NumericalAbbreviation='3:t;6:M;9:B;12:T;15:P;18:E;21:Z;24:Y;-3:m;-6:µ;-9:n;-12:p;-15:f;-18:a;-21:z;-24:y';`

## ReferenceDay

The setting defines which day in January to set as reference day to define week 1.

`ReferenceDay`

By default, functions use 4 as the reference day. This means that week 1 must contain January 4, or put differently,
that week 1 must always have at least 4 days in January.

The following values can be used to set a different reference day:

- 1 (= January 1)
- 2 (= January 2)
- 3 (= January 3)
- 4 (= January 4)
- 5 (= January 5)
- 6 (= January 6)
- 7 (= January 7)

**Example:**

`Set ReferenceDay=3; //(set January 3 as the reference day)`

## ThousandSep

The thousands separator defined replaces the digit grouping symbol of the operating system (regional settings).

`ThousandSep`

**Examples:**

```qlik
Set ThousandSep=','; //(for example, seven billion must be specified as: 7,000,000,000)
Set ThousandSep=' ';
```

## TimeFormat

The format defined replaces the time format of the operating system (regional settings).

`TimeFormat`

**Example:**

`Set TimeFormat='hh:mm:ss';`

## TimestampFormat

The format defined replaces the date and time formats of the operating system (regional settings).

`TimestampFormat`

**Example:**

`Set TimestampFormat='M/D/YY hh:mm:ss[.fff]';`
