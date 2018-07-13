# String aggregation functions

## Capitalize

Capitalize() returns the string with all words in initial uppercase letters.

`Capitalize(text)`

**Return data type:** string

| Example                         | Result                   |
| ------------------------------- | ------------------------ |
| Capitalize ( 'my little pony' ) | Returns 'My Little Pony' |
| Capitalize ( 'AA bb cC Dd')     | Returns 'Aa Bb Cc Dd'    |

## Chr

Chr() returns the Unicode character corresponding to the input integer.

`Chr( int )`

**Return data type:** string

| Example | Result                 |
| ------- | ---------------------- |
| Chr(65) | Returns the string 'A' |

## Evaluate

Evaluate() finds if the input text string can be evaluated as a valid Qlik Sense
expression, and if so, returns the value of the expression as a string.
If the input string is not a valid expression, NULL is
returned.

`Evaluate(expression_text)`

**Return data type:** dual

| Example          | Result       |
| ---------------- | ------------ |
| Evaluate(5 \* 8) | Returns '40' |

## FindOneOf

FindOneOf() searches a string to find the position of the occurrence of any
character from a set of provided characters. The position of the first
occurrence of any character from the search set is returned unless a
third argument (with a value greater than 1) is supplied. If no match is
found, 0 is returned.

`FindOneOf(text, char_set[, count])`

**Return data type:** integer

| Argument | Description |
| - | - |
| text | The original string. |
| char_set | A set of characters to search for in text. |
| count | Defines which occurrence of any of the character to search for. For example, a value of 2 searches for the second occurrence. |

<br/>

| Example | Result |
| - | - |
| FindOneOf('my example text string', 'et%s')    | Returns '4'. |
| FindOneOf('my example text string', 'et%s', 3) | Returns '12'. Because the search is for any of the characters: e, t, % or s, and "t" is the third occurrence, and is in position 12. |
| FindOneOf('my example text string', '¤%&')     | Returns '0'.|

## Hash128

Hash128() returns a 128-bit hash of the combined input expression values. The
result is a 22-character string.

`Hash128(expr{, expression})`

**Return data type:** string

**Examples:**

Hash128('abc', 'xyz', '123')<br/>
Hash128(Region, Year, Month)

## Hash160

Hash160() returns a 160-bit hash of the combined input expression values. The
result is a 27-character string.

`Hash160(expr{, expression})`

**Return data type:** string

**Examples**

Hash160('abc', 'xyz', '123')<br/>
Hash160(Region, Year, Month)

## Hash256

Hash256() returns a 256-bit hash of the combined input expression values. The
result is a 43-character string.

`Hash256(expr{, expression})`

**Return data type:** string

**Result**

Hash256('abc', 'xyz', '123')<br/>
Hash256(Region, Year, Month)

## Index

Index()
searches a string to find the starting position of the nth occurrence of
a provided substring. An optional third argument provides the value of
n, which is 1 if omitted. A negative value searches from the end of the
string. The positions in the string are numbered from
1 and up.

`Index(text, substring[, count])`

**Return data type:** integer

| Argument | Description |
| - | - |
| text | The original string.|
| substring | A string of characters to search for in text.|
| count | Defines which occurrence of substring to search for. For example, a value of 2 searches for the second occurrence. |

<br/>

| Example | Result |
| - | - |
| Index('abcdefg', 'cd') | Returns 3 |
| Index('abcdabcd', 'b', 2) | Returns 6 (the second occurrence of 'b') |
| Index('abcdabcd', 'b',-2) | Returns 2 (the second occurrence of 'b' starting from the end) |
| Left(Date, Index( Date,'-') -1) where Date = 1997-07-14 | Returns 1997 |
| Mid(Date, Index(Date, '-', 2 ) -2, 2) where Date = 1997-07-14 | Returns 07 |

## KeepChar

KeepChar()
returns a string consisting of the first string ,'text', less any of the
characters NOT contained in the second string, "keep_chars".

`KeepChar(text, keep_chars)`

**Return data type:** string

| Argument | Description |
| - | - |
| text | The original string. |
| keep_chars | A string containing the characters in text to be kept. |

<br/>

| Example                    | Result          |
| -------------------------- | --------------- |
| KeepChar('a1b2c3','123')   | Returns '123'.  |
| KeepChar('a1b2c3','1234')  | Returns '123'.  |
| KeepChar('a1b22c3','1234') | Returns '1223'. |
| KeepChar('a1b2c3','312')   | Returns '123'.  |

## Left

Left()
returns a string consisting of the first (left-most) characters of the
input string, where the number of characters is determined by the second
argument.

Left(text, count)`

**Return data type:** string

| Argument | Description |
| - | - |
| text | The original string. |
| count | Defines the number of characters to included from the left-hand part of the string **text** . |

<br/>

| Example           | Result        |
| ----------------- | ------------- |
| Left('abcdef', 3) | Returns 'abc' |

## Len

Len() returns the length of the input string.

`Len(text)`

**Return data type:** integer

| Example      | Result      |
| ------------ | ----------- |
| Len('Peter') | Returns '5' |

## Lower

Lower() converts all the characters in the input string to lower case.

`Lower(text)`

**Return data type:** string

| Example       | Result         |
| ------------- | -------------- |
| Lower('abcD') | Returns 'abcd' |

## LTrim

LTrim() returns the input string trimmed of any leading spaces.

`LTrim(text)`

**Return data type:** string

| Example       | Result         |
| ------------- | -------------- |
| LTrim(' abc') | Returns 'abc'  |
| LTrim('abc ') | Returns 'abc ' |

## Mid

Mid() returns
the part of the input string starting at the position of the character
defined by the second argument, 'start', and returning the number of
characters defined by the third argument, 'count'. If 'count' is
omitted, the rest of the input string is returned. The first character
in the input string is numbered 1.

`Mid(text, start[, count])`

**Return data type:** string

| Argument | Description |
| - | - |
| text | The original string. |
| start | Integer defining the position of the first character in text to include. |
| count | Defines the string length of the output string. If omitted, all characters from the position defined by **start** are included. |

<br/>

| Example            | Result         |
| ------------------ | -------------- |
| Mid('abcdef',3)    | Returns 'cdef' |
| Mid('abcdef',3, 2) | Returns 'cd'   |

## Ord

Ord() returns
the Unicode code point number of the first character of the input
string.

`Ord(text)`

**Return data type:** integer

| Example   | Result                  |
| --------- | ----------------------- |
| Ord('A')  | Returns the integer 65. |
| Ord('Ab') | Returns the integer 65. |

## PurgeChar

PurgeChar()
returns a string consisting of the characters contained in the input
string ('text'), excluding any that appear in the second argument
('remove_chars').

`PurgeChar(text, remove_chars)`

**Return data type:** string

| Argument | Description |
| - | - |
| text | The original string. |
| remove_chars | A string containing the characters in text to be removed. |

<br/>

| Example | Result |
| - | - |
| PurgeChar('a1b2c3','123') | Returns 'abc' |
| PurgeChar('a1b2c3','312') | Returns 'abc' |

## Repeat

Repeat() forms a string consisting of the input string repeated the number of
times defined by the second
argument.

`Repeat(text[, repeat_count])`

**Return data type:** string

| Argument | Description |
| - | - |
| text | The original string. |
| repeat_count | Defines the number of times the characters in the string **text** are to be repeated in the output string. |

<br/>

| Example                                    | Result             |
| ------------------------------------------ | ------------------ |
| Repeat(' \* ', rating) when **rating** = 4 | Returns '\*\*\*\*' |

## Replace

Replace()
returns a string after replacing all occurrences of a given substring
within the input string with another substring. The function is
non-recursive and works from left to right.

`Replace(text, from_str, to_str)`

**Return data type:** string

| Argument | Description |
| - | - |
| text | The original string. |
| from_str | A string which may occur one or more times within the input string **text**. |
| to_str | The string that will replace all occurrences of **from_str** within the string **text**. |

<br/>

| Example                      | Result            |
| ---------------------------- | ----------------- |
| Replace('abccde','cc','xyz') | Returns 'abxyzde' |

## Right

Right()
returns a string consisting of the last (right-most) characters of the
input string, where the number of characters is determined by the second
argument.

`Right(text, count)`

**Return data type:** string

| Argument | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| text     | The original string. |
| count    | Defines the number of characters to be included from the right-hand part of the string **text** . |

<br/>

| Example            | Result        |
| ------------------ | ------------- |
| Right('abcdef', 3) | Returns 'def' |

## RTrim

RTrim()
returns the input string trimmed of any trailing
spaces.

`RTrim(text)`

**Return data type:** string

| Example       | Result         |
| ------------- | -------------- |
| RTrim(' abc') | Returns ' abc' |
| RTrim('abc ') | Returns 'abc'  |

## SubField

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

`SubField(text, delimiter[, field_no])`

**Return data type:** string

| Argument  | Description |
| - | - |
| text | The original string. This can be a hard-coded text, a variable, a dollar-sign expansion, or another expression.|
| delimiter | A character within the input **text** that divides the string into component parts. |
| field_no  | The optional third argument is an integer that specifies which of the substrings of the parent string **text** is to be returned. Use the value 1 to return the first substring, 2 to return the second substring, and so on. A negative value causes the substring to be extracted from the right-hand side of the string. That is, the string search is from right to left, instead of left to right, if **field_no** is a positive value. |

!!! Tip
    SubField() can be used instead of using complex combinations of functions such as Len(), Right(), Left(),
    Mid(), and other string functions.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>SubField(S, ';' ,2)<td>Returns 'cde' if <b>S<b> is 'abc;cde;efg'.</td>
</tr>
<tr class="even">
<td>SubField(S, ';' ,1)<td>Returns NULL if <b>S</b> is an empty string.</td>
</tr>
<tr class="odd">
<td>SubField(S, ';' ,1)<td>Returns an empty string if <b>S</b> is ';'.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it.</p>
FullName:<br/>
LOAD * inline [<br/>
Name<br/>
'Dave Owen'<br/>
'Joe Tem'<br/>
];</p>
<p>SepNames:<br/>
Load Name,<br />
SubField(Name, ' ',1) as FirstName,<br/>
SubField(Name, ' ',-1) as Surname<br/>
Resident FullName;<br/>
Drop Table FullName;<br/>
</td>
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
<td><p>This example shows how using multiple instances of the Subfield() function, each with the
field_no parameter left out, from within the same LOAD statement creates Cartesian products of
all combinations. The DISTINCT option is used to avoid creating duplicate record.</p>
<p>Add the example script to your app and run it.</p>
<p>LOAD DISTINCT<br/>
Instrument,<br/>
SubField(Player,',') as Player,<br/>
SubField(Project,',') as Project;</p>
<p>Load * inline [<br/>
Instrument|Player|Project<br/>
Guitar|Neil,Mike|Music,Video<br/>
Guitar|Neil|Music,OST<br/>
Synth|Neil,Jen|Music,Video,OST<br/>
Synth|Jo|Music<br/>
Guitar|Neil,Mike|Music,OST
] (delimiter is '|');</p>
</td>
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

## SubStringCount

SubStringCount()
returns the number of occurrences of the specified substring in the
input string text. If there is no match, 0 is
returned.

`SubStringCount(text, sub_string)`

**Return data type:** integer

| Argument   | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| text       | The original string.                                                          |
| sub_string | A string which may occur one or more times within the input string **text** . |

<br />

| Example                              | Result      |
| ------------------------------------ | ----------- |
| SubStringCount('abcdefgcdxyz', 'cd') | Returns '2' |
| SubStringCount('abcdefgcdxyz', 'dc') | Returns '0' |

## TextBetween

TextBetween()
returns the text in the input string that occurs between the characters
specified as delimiters.

`TextBetween(text, delimiter1, delimiter2[, n ])`

**Return data type:** string

| Argument   | Description|
| ---------- | - |
| text       | The original string.|
| delimiter1 | Specifies the first delimiting character (or string) to search for in **text**.|
| delimiter2 | Specifies the second delimiting character (or string) to search for in **text**.|
| n          | Defines which occurrence of the delimiter pair to search between. For example, a value of 2 returns the characters between the second occurrence of delimiter1 and the second occurrence of delimiter2. |

<br/>

| Example                                    | Result        |
| ------------------------------------------ | ------------- |
| TextBetween('\<abc\>', '\<', '\>')         | Returns 'abc' |
| TextBetween('\<abc\>\<de\>', '\<', '\>',2) | Returns 'de'  |

## Trim

Trim()
returns the input string trimmed of any leading and trailing
spaces.

`Trim(text)`

**Return data type:** string

| Example       | Result        |
| ------------- | ------------- |
| Trim(' abc')  | Returns 'abc' |
| Trim('abc ')  | Returns 'abc' |
| Trim(' abc ') | Returns 'abc' |

## Upper

Upper()
converts all the characters in the input string to upper case for all
text characters in the expression. Numbers and symbols are
ignored.

`Upper(text)`

**Return data type:** string

| Example        | Result         |
| -------------- | -------------- |
| Upper(' abcD') | Returns 'ABCD' |
