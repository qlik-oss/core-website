

# String aggregation functions

This section describes string-related aggregation functions.

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the
functions.

## String aggregation functions in the data load script

Concat

 **Concat()** 
is used to combine string values. The script function returns the
aggregated string concatenation of all values of the expression iterated
over a number of records as defined by a
group by
clause.

**concat2643095552**([
distinct ] expression [, delimiter [,
sort-weight]])

FirstValue

 **FirstValue()** 
returns the value that was loaded first from the records defined by the
expression, sorted by a
group by clause.



This function is only available as a script
function.



**FirstValue3690018533** (expression)

LastValue

 **LastValue()** 
returns the value that was loaded last from the records defined by the
expression, sorted by a
group by clause.



This function is only available as a script
function.



**LastValue2619022641** (expression)

MaxString

 **MaxString()** 
finds string values in the expression and returns the last text value
sorted over a number of records, as defined by a
group by
clause.

expression )

MinString

 **MaxString()** 
finds string values in the expression and returns the first text value
sorted over a number of records, as defined by a
group by
clause.

expression )

## String aggregation functions in charts

The following chart functions are available for aggregating strings in
charts.

Concat

Concat() is used to combine string values. The function returns the
aggregated string concatenation of all the values of the expression
evaluated over each
dimension.

{[SetExpression] [DISTINCT]
[TOTAL
[\<fld{, fld}\>]] string[, delimiter[,
sort_weight]])

MaxString

MaxString() finds string values in the expression or field and returns
the last text value in the text sort
order.

{[SetExpression] [TOTAL
[\<fld{, fld}\>]]}
expr)

MinString

MinString() finds string values in the expression or field and returns
the first text value in the text sort
order.

{[SetExpression] [TOTAL
[\<fld {, fld}\>]]}
expr)

## StringFunctions

# Capitalize - script and chart function

Capitalize()
returns the string with all words in initial uppercase
letters.

 

Capitalize(text)

string

Examples and
results:

| Example                                                                                                                        | Result                   |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
|  | Returns 'My Little Pony' | | Capitalize ( 'AA bb cC Dd')     | Returns 'Aa Bb Cc Dd'    |

# Chr - script and chart function

Chr() returns
the Unicode character corresponding to the input
integer.

 

Chr(int)

string

Examples and results:

| Example | Result                 |
| ------- | ---------------------- |
| Chr(65) | Returns the string 'A' |

# Evaluate - script function

Evaluate()
finds if the input text string can be evaluated as a valid Qlik Sense
expression, and if so, returns the value of the expression as a string.
If the input string is not a valid expression, NULL is
returned.

 

Evaluate(expression_text)

dual



This string function can not be used in chart expressions.



Examples and
results:

| Example                                                                                                            | Result       |
| ------------------------------------------------------------------------------------------------------------------ | ------------ |
| Evaluate ( 5 \* 8 ) | Returns '40' |

# FindOneOf - script and chart function

FindOneOf()
searches a string to find the position of the occurrence of any
character from a set of provided characters. The position of the first
occurrence of any character from the search set is returned unless a
third argument (with a value greater than 1) is supplied. If no match is
found, 0 is
returned.

 

FindOneOf(text,
char_set[,
count])

integer

 

| Argument  | Description                                                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| text      | The original string.                                                                                                          |
| char_set | A set of characters to search for in text.                                                                                    |
| count     | Defines which occurrence of any of the character to search for. For example, a value of 2 searches for the second occurrence. |

Examples and
results:

| Example                                                                                                                                        | Result                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
|     | Returns '4'.                                                                                                                         | | FindOneOf( 'my example text string', 'et%s', 3) | Returns '12'. Because the search is for any of the characters: e, t, % or s, and "t" is the third occurrence, and is in position 12. |
| FindOneOf( 'my example text string', '¤%&')     | Returns '0'.                                                                                                                         |

# Hash128 - script and chart function

Hash128()
returns a 128-bit hash of the combined input expression values. The
result is a 22-character
string.

 

expr{, expression})

string

 

Hash128 ( 'abc', 'xyz', '123' )

Hash128 ( Region, Year, Month
)

# Hash160 - script and chart function

Hash160()
returns a 160-bit hash of the combined input expression values. The
result is a 27-character
string.

 

expr{, expression})

string

 

Hash160 ( 'abc', 'xyz', '123' )

Hash160 ( Region, Year, Month
)

# Hash256 - script and chart function

Hash256()
returns a 256-bit hash of the combined input expression values. The
result is a 43-character
string.

 

expr{, expression})

string

 

Hash256 ( 'abc', 'xyz', '123' )

Hash256 ( Region, Year, Month
)

# Index - script and chart function

Index()
searches a string to find the starting position of the nth occurrence of
a provided substring. An optional third argument provides the value of
n, which is 1 if omitted. A negative value searches from the end of the
string. The positions in the string are numbered from
1 and up.

 

Index(text,
substring[,
count])

integer

 

| Argument  | Description                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| text      | The original string.                                                                                               |
| substring | A string of characters to search for in text.                                                                      |
| count     | Defines which occurrence of substring to search for. For example, a value of 2 searches for the second occurrence. |

Examples and
results:

| Example                                                                                                                                                                                                                                                       | Result                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Index( 'abcdefg', 'cd' )                                                                                                                                                                                                                                      | Returns 3                                                      |
| Index( 'abcdabcd', 'b', 2)                                                                                                                                                                                                                                    | Returns 6 (the second occurrence of 'b')                       |
| Index( 'abcdabcd', 'b',-2)                                                                                                                                                                                                                                    | Returns 2 (the second occurrence of 'b' starting from the end) |
|  =  1997-07-14 | Returns 1997                                                   | | Mid( Date, Index( Date, '-', 2 ) -2, 2 ) where Date =  1997-07-14                                                                                              | Returns 07                                                     |

# KeepChar - script and chart function

KeepChar()
returns a string consisting of the first string ,'text', less any of the
characters NOT contained in the second string,
"keep_chars".

 

text, keep_chars)

string

 

| Argument    | Description                                            |
| ----------- | ------------------------------------------------------ |
| text        | The original string.                                   |
| keep_chars | A string containing the characters in text to be kept. |

Examples and
results:

| Example                                                                                                                      | Result          |
| ---------------------------------------------------------------------------------------------------------------------------- | --------------- |
|    | Returns '123'.  | | KeepChar ( 'a1b2c3','1234' )  | Returns '123'.  |
|  | Returns '1223'. | | KeepChar ( 'a1b2c3','312' )   | Returns '123'.  |

 

*PurgeChar - script and chart
function*

# Left - script and chart function

Left()
returns a string consisting of the first (left-most) characters of the
input string, where the number of characters is determined by the second
argument.

 

text, count)

string

 

| Argument | Description                                                                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text     | The original string.                                                                                                                                                                         |
| count    | Defines the number of characters to included from the left-hand part of the string  **text** . |

Examples and
results:

| Example                                                                 | Result        |
| ----------------------------------------------------------------------- | ------------- |
| <span class="Code" data-autonumposition="none">Left('abcdef', 3) | Returns 'abc' |

the
*Index - script and chart function*, which allows more complex string
analysis.

# Len - script and chart function

Len() returns
the length of the input
string.

 

Len(text)

integer

 

Examples and
results:

| Example                                                                                                     | Result      |
| ----------------------------------------------------------------------------------------------------------- | ----------- |
| Len('Peter') | Returns '5' |

# Lower - script and chart function

Lower()
converts all the characters in the input string to lower
case.

 

Lower(text)

string

Examples and
results:

| Example                                                                                                      | Result         |
| ------------------------------------------------------------------------------------------------------------ | -------------- |
| Lower('abcD') | Returns 'abcd' |

# LTrim - script and chart function

LTrim()
returns the input string trimmed of any leading
spaces.

 

LTrim(text)

string

Examples and
results:

| Example                                                                                                        | Result         |
| -------------------------------------------------------------------------------------------------------------- | -------------- |
|  | Returns 'abc'  | | LTrim( 'abc ' ) | Returns 'abc ' |

 

*RTrim - script and chart
function*

# Mid - script and chart function

Mid() returns
the part of the input string starting at the position of the character
defined by the second argument, 'start', and returning the number of
characters defined by the third argument, 'count'. If 'count' is
omitted, the rest of the input string is returned. The first character
in the input string is numbered 1.

 

Mid(text,
start[,
count])

string

 

| Argument | Description                                                                                                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text     | The original string.                                                                                                                                                                                                            |
| start    | Integer defining the position of the first character in text to include.                                                                                                                                                        |
| count    | Defines the string length of the output string. If omitted, all characters from the position defined by  **start**  are included. |

Examples and results:

| Example             | Result         |
| ------------------- | -------------- |
| Mid('abcdef',3 )    | Returns 'cdef' |
| Mid('abcdef',3, 2 ) | Returns 'cd'   |

 

*Index - script and chart
function*

# Ord - script and chart function

Ord() returns
the Unicode code point number of the first character of the input
string.

 

Ord(text)

integer

Examples and
results:

| Example                                                                                                  | Result                  |
| -------------------------------------------------------------------------------------------------------- | ----------------------- |
|   | Returns the integer 65. | | Ord('Ab') | Returns the integer 65. |

# PurgeChar - script and chart function

PurgeChar()
returns a string consisting of the characters contained in the input
string ('text'), excluding any that appear in the second argument
('remove_chars').

 

text, remove_chars)

string

 

| Argument      | Description                                               |
| ------------- | --------------------------------------------------------- |
| text          | The original string.                                      |
| remove_chars | A string containing the characters in text to be removed. |

string

Examples and
results:

| Example                                                                                                                     | Result        |
| --------------------------------------------------------------------------------------------------------------------------- | ------------- |
|  | Returns 'abc' | | PurgeChar ( 'a1b2c3','312' ) | Returns 'abc' |

 

*KeepChar - script and chart
function*

# Repeat - script and chart function

Repeat()
forms a string consisting of the input string repeated the number of
times defined by the second
argument.

 

text[, repeat_count])

string

 

| Argument      | Description                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| text          | The original string.                                                                                   |
| repeat_count | Defines the number of times the characters in the string text are to be repeated in the output string. |

Examples and
results:

| Example                                                                                                                                                                                                                                     | Result             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Repeat( ' \* ', rating ) when  **rating**  = 4 | Returns '\*\*\*\*' |

# Replace - script and chart function

Replace()
returns a string after replacing all occurrences of a given substring
within the input string with another substring. The function is
non-recursive and works from left to right.

 

Replace(text,
from_str,
to_str)

string

 

| Argument  | Description                                                                                                                                                                                                                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text      | The original string.                                                                                                                                                                                                                                                                      |
| from_str | A string which may occur one or more times within the input string .                                                                                                              | | to_str   | The string that will replace all occurrences of  **from_str**  within the string **text. |

Examples and
results:

| Example                                                                                                                     | Result            |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Replace('abccde','cc','xyz') | Returns 'abxyzde' |

 

*Replace*

# Right - script and chart function

Right()
returns a string consisting of the last (right-most) characters of the
input string, where the number of characters is determined by the second
argument.

 

text, count)

string

 

| Argument | Description                                                                                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| text     | The original string.                                                                                                                                                                             |
| count    | Defines the number of characters to be included from the right-hand part of the string  **text** . |

Examples and
results:

| Example                                                                                                           | Result        |
| ----------------------------------------------------------------------------------------------------------------- | ------------- |
| Right('abcdef', 3) | Returns 'def' |

# RTrim - script and chart function

RTrim()
returns the input string trimmed of any trailing
spaces.

 

RTrim(text)

string

Examples and
results:

| Example                                                                                                        | Result         |
| -------------------------------------------------------------------------------------------------------------- | -------------- |
|  | Returns ' abc' | | RTrim( 'abc ' ) | Returns 'abc'  |

 

*LTrim - script and chart
function*

# String functions

This section describes functions for handling and manipulating strings.
In the functions below, the parameters are expressions where
 **s** 
should be interpreted as a string.

All functions can be used in both the data load script and in chart
expressions, except for
Evaluate
which can only be used in the data load script.

## String functions overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

Capitalize

Capitalize()
returns the string with all words in initial uppercase letters.

**Capitalize630363689**(text)

Chr

Chr() returns
the Unicode character corresponding to the input
integer.

**Chr3156091642**(int)

Evaluate

Evaluate()
finds if the input text string can be evaluated as a valid Qlik Sense
expression, and if so, returns the value of the expression as a string.
If the input string is not a valid expression, NULL is returned.

**Evaluate403597717**(expression_text)

FindOneOf

FindOneOf()
searches a string to find the position of the occurrence of any
character from a set of provided characters. The position of the first
occurrence of any character from the search set is returned unless a
third argument (with a value greater than 1) is supplied. If no match is
found, 0 is
returned.

**FindOneOf3996554715**(text, char_set[, count])

Hash128

Hash128()
returns a 128-bit hash of the combined input expression values. The
result is a 22-character string.

**Hash12874929253**(expr{, expression})

Hash160

Hash160()
returns a 160-bit hash of the combined input expression values. The
result is a 27-character string.

**Hash1601068716909**(expr{, expression})

Hash256

Hash256()
returns a 256-bit hash of the combined input expression values. The
result is a 43-character string.

**Hash256853087234**(expr{, expression})

Index

Index()
searches a string to find the starting position of the nth occurrence of
a provided substring. An optional third argument provides the value of
n, which is 1 if omitted. A negative value searches from the end of the
string. The positions in the string are numbered from
1 and up.

**Index3834692976** (text, substring[, count])

KeepChar

KeepChar()
returns a string consisting of the first string ,'text', less any of the
characters NOT contained in the second string, "keep_chars".

**KeepChar3171397454**(text, keep_chars)

Left

Left()
returns a string consisting of the first (left-most) characters of the
input string, where the number of characters is determined by the second
argument.

text, count)

Len

Len() returns
the length of the input
string.

**Len2278417357**(text)

Lower

Lower()
converts all the characters in the input string to lower case.

**Lower3685182766**(text)

LTrim

LTrim()
returns the input string trimmed of any leading
spaces.

**LTrim2907883186**(text)

Mid

Mid() returns
the part of the input string starting at the position of the character
defined by the second argument, 'start', and returning the number of
characters defined by the third argument, 'count'. If 'count' is
omitted, the rest of the input string is returned. The first character
in the input string is numbered 1.

**Mid4161756914**(text, start[, count])

Ord

Ord() returns
the Unicode code point number of the first character of the input
string.

**Ord4012376444**(text)

PurgeChar

PurgeChar()
returns a string consisting of the characters contained in the input
string ('text'), excluding any that appear in the second argument
('remove_chars').

**PurgeChar2552501378**(text, remove_chars)

Repeat

Repeat()
forms a string consisting of the input string repeated the number of
times defined by the second argument.

**Repeat1468468979**(text[, repeat_count])

Replace

Replace()
returns a string after replacing all occurrences of a given substring
within the input string with another substring. The function is
non-recursive and works from left to right.

**Replace3686858261**(text, from_str, to_str)

Right

Right()
returns a string consisting of the last (right-most) characters of the
input string, where the number of characters is determined by the second
argument.

text, count)

RTrim

RTrim()
returns the input string trimmed of any trailing spaces.

**RTrim3168128504**(text)

SubField

SubField() is
used to extract substring components from a parent string field, where
the original record fields consist of two or more parts separated by a
delimiter.

**SubField1533128850**(text, delimiter[, field_no
])

SubStringCount

SubStringCount()
returns the number of occurrences of the specified substring in the
input string text. If there is no match, 0 is returned.

**SubStringCount3414145597**(text, substring)

TextBetween

TextBetween()
returns the text in the input string that occurs between the characters
specified as delimiters.

**TextBetween2311027252**(text, delimiter1, delimiter2[, n])

Trim

Trim()
returns the input string trimmed of any leading and trailing spaces.

**Trim1527522105**(text)

Upper

Upper()
converts all the characters in the input string to upper case for all
text characters in the expression. Numbers and symbols are
ignored.

**Upper3197739354**(text)

# SubField - script and chart function

SubField() is
used to extract substring components from a parent string field, where
the original record fields consist of two or more parts separated by a
delimiter.

The
Subfield()
function can be used, for example, to extract first name and surname
from a list of records consisting of full names, the component parts of
a path name, or for extracting data from comma-separated tables.

If you use the
Subfield()
function in a
LOAD
statement with the optional field_no parameter left out, one full
record will be generated for each substring. If several fields are
loaded using
Subfield()
the Cartesian products of all combinations are
created.

 

SubField(text,
delimiter[, field_no
])

string

 

| Argument  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text      | The original string. This can be a hard-coded text, a variable, a dollar-sign expansion, or another expression.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| delimiter | A character within the input  that divides the string into component parts.                                                                                                                                                                                                                                                                                                                                                                                                                                                           | | field_no | The optional third argument is an integer that specifies which of the substrings of the parent string  **text**  is to be returned. Use the value 1 to return the first substring, 2 to return the second substring, and so on. A negative value causes the substring to be extracted from the right-hand side of the string. That is, the string search is from right to left, instead of left to right, if **field_no is a positive value. |



SubField() can be used instead of using complex combinations of
functions such as Len(), Right(), Left(), Mid(), and other string
functions.



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
<td> <td>Returns 'cde' if **S is 'abc;cde;efg'.</td>
</tr>
<tr class="even">
<td> <td>Returns NULL if **S is an empty string.</td>
</tr>
<tr class="odd">
<td> <td>Returns an empty string if **S is ';'.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>FullName:</p>
<p>LOAD * inline [</p>
<p>Name</p>
<p>'Dave Owen'</p>
<p>'Joe Tem'</p>
<p>];</p>
<p> </p>
<p>SepNames:</p>
<p>Load Name,</p>
<p>SubField(Name, ' ',1) as FirstName,</p>
<p>SubField(Name, ' ',-1) as Surname</p>
<p>Resident FullName;</p>
<p>Drop Table FullName;</p>
<p> </p></td>
<td><table>
<thead>
<tr class="header">
<th>Name</th>
<th>FirstName</th>
<th>Surname</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Dave Owen</td>
<td>Dave</td>
<td>Owen</td>
</tr>
<tr class="even">
<td>Joe Tem</td>
<td>Joe</td>
<td>Tem</td>
</tr>
</tbody>
</table></td>
</tr>
<tr class="odd">
<td><p>Suppose you have a variable that holds a path name vMyPath,</p>
<p>Set vMyPath=\Users\ext_jrb\Documents\Qlik\Sense\Apps;.</p>
<p> </p></td>
<td>In a text &amp; image chart, you can add a measure such as:<br />
<span class="Code" data-autonumposition="none">SubField(vMyPath, '\',-3<span class="Code" data-autonumposition="none">), which results in 'Qlik', because it is the substring third from the right-hand end of the variable vMyPath.</td>
</tr>
<tr class="even">
<td><p>This example shows how using multiple instances of the Subfield() function, each with the field_no parameter left out, from within the same LOAD statement creates Cartesian products of all combinations. The DISTINCT option is used to avoid creating duplicate record.</p>
<p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>LOAD DISTINCT</p>
<p>Instrument,</p>
<p>SubField(Player,',') as Player,</p>
<p>SubField(Project,',') as Project;</p>
<p> </p>
<p>Load * inline [</p>
<p>Instrument|Player|Project</p>
<p>Guitar|Neil,Mike|Music,Video</p>
<p>Guitar|Neil|Music,OST</p>
<p>Synth|Neil,Jen|Music,Video,OST</p>
<p>Synth|Jo|Music</p>
<p>Guitar|Neil,Mike|Music,OST</p>
<p>] (delimiter is '|');</p>
<p> </p></td>
<td><table>
<thead>
<tr class="header">
<th>Instrument</th>
<th>Player</th>
<th>Project</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Guitar</td>
<td>Mike</td>
<td>Music</td>
</tr>
<tr class="even">
<td>Guitar</td>
<td>Mike</td>
<td>Video</td>
</tr>
<tr class="odd">
<td>Guitar</td>
<td>Mike</td>
<td>OST</td>
</tr>
<tr class="even">
<td>Guitar</td>
<td>Neil</td>
<td>Music</td>
</tr>
<tr class="odd">
<td>Guitar</td>
<td>Neil</td>
<td>Video</td>
</tr>
<tr class="even">
<td>Guitar</td>
<td>Neil</td>
<td>OST</td>
</tr>
<tr class="odd">
<td>Synth</td>
<td>Jen</td>
<td>Music</td>
</tr>
<tr class="even">
<td>Synth</td>
<td>Jen</td>
<td>Video</td>
</tr>
<tr class="odd">
<td>Synth</td>
<td>Jen</td>
<td>OST</td>
</tr>
<tr class="even">
<td>Synth</td>
<td>Jo</td>
<td>Music</td>
</tr>
<tr class="odd">
<td>Synth</td>
<td>Neil</td>
<td>Music</td>
</tr>
<tr class="even">
<td>Synth</td>
<td>Neil</td>
<td>Video</td>
</tr>
<tr class="odd">
<td>Synth</td>
<td>Neil</td>
<td>OST</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

# SubStringCount - script and chart function

SubStringCount()
returns the number of occurrences of the specified substring in the
input string text. If there is no match, 0 is
returned.

 

text, sub_string)

integer

 

| Argument    | Description                                                                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text        | The original string.                                                                                                                                                         |
| sub_string | A string which may occur one or more times within the input string  **text** . |

Examples and
results:

| Example                                                                                                                                | Result      |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
|  | Returns '2' | | SubStringCount ( 'abcdefgcdxyz', 'dc' ) | Returns '0' |

# TextBetween - script and chart function

TextBetween()
returns the text in the input string that occurs between the characters
specified as
delimiters.

 

TextBetween(text,
delimiter1, delimiter2[,
n])

string

 

| Argument   | Description                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text       | The original string.                                                                                                                                                                                    |
| delimiter1 | Specifies the first delimiting character (or string) to search for in .                         | | delimiter2 | Specifies the second delimiting character (or string) to search for in **text.                        |
| n          | Defines which occurrence of the delimiter pair to search between. For example, a value of 2 returns the characters between the second occurrence of delimiter1 and the second occurrence of delimiter2. |

Examples and
results:

| Example                                                                                                                                   | Result        |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
|          | Returns 'abc' | | TextBetween('\<abc\>\<de\>', '\<', '\>',2) | Returns 'de'  |

# Trim - script and chart function

Trim()
returns the input string trimmed of any leading and trailing
spaces.

 

Trim(text)

string

Examples and
results:

| Example                                                                                                        | Result        |
| -------------------------------------------------------------------------------------------------------------- | ------------- |
|   | Returns 'abc' | | Trim( 'abc ' )  | Returns 'abc' |
| Trim( ' abc ' ) | Returns 'abc' |

# Upper - script and chart function

Upper()
converts all the characters in the input string to upper case for all
text characters in the expression. Numbers and symbols are
ignored.

 

Upper(text)

string

Examples and
results:

| Example                                                                                                       | Result         |
| ------------------------------------------------------------------------------------------------------------- | -------------- |
| Upper(' abcD') | Returns 'ABCD' |
