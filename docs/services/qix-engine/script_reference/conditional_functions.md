# Conditional functions

The conditional functions all evaluate a condition and then return different answers depending on the condition value.

## alt

The **alt** function returns the first of the parameters that has a valid number representation. If no such match i
found, the last parameter will be returned. Any number of parameters can be used.

`alt(expr1 [, expr2 , expr3 , ...] , else)`

| Argument | Description                                                                           |
| -------- | ------------------------------------------------------------------------------------- |
| expr1    | The first expression to check for a valid number representation.                      |
| expr2    | The second expression to check for a valid number representation.                     |
| expr3    | The third expression to check for a valid number representation.                      |
| else     | Value to return if none of the previous parameters has a valid number representation. |

The alt function is often used with number or date interpretation functions. This way, Qlik associative engine can test different
date formats in a prioritized order. It can also be used to handle NULL values in numerical expressions.

Examples and results:

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td>
    <code>
        alt( date#( dat , 'YYYY/MM/DD' ),<br>
        date#( dat , 'MM/DD/YYYY' ),<br>
        date#( dat , 'MM/DD/YY' ),<br>
        'No valid date' )
    </code>
</td>
<td>This expression will test if the field date contains a date according to any of the three specified date formats.
If so, it will return a dual value containing the original string and a valid number representation of a date. If no
match is found, the text 'No valid date' will be returned (without any valid number representation).</td>
</tr>
<tr>
<td><p><code>alt(Sales,0) + alt(Margin,0)</code></p></td>
<td>This expression adds the fields Sales and Margin, replacing any missing value (NULL) with a 0.</td>
</tr>
</tbody>
</table>

## class

The class function assigns the first parameter to a class interval. The result is a dual value with `a<=x<b` as the
textual value, where a and b are the upper and lower limits of the bin, and the lower bound as numeric value.

`class(expression, interval [, label [, offset ]])`

| Argument | Description |
| -------- | ----------- |
| interval | A number that specifies the bin width. |
| label    | An arbitrary string that can replace the 'x' in the result text. |
| offset   | A number that can be used as offset from the default starting point of the classification. The default starting point is normally 0. |

| Example                                | Result                     |
| -------------------------------------- | -------------------------- |
| `class( var,10 ) with var = 23`        | returns '20<=x<30'       |
| `class( var,5,'value' ) with var = 23` | returns '20<= value <25' |
| `class( var,10,'x',5 ) with var = 23`  | returns '15<=x<25'       |

Example data load script:

In this example, we load a table containing name and age of people. We want to add a field that classifies each person
according to an age group with a ten year interval. The source table looks like this:

| Name  | Age |
| ----- | --- |
| John  | 25  |
| Karen | 42  |
| Yoshi | 53  |

To add the age group classification field, you can add a preceding load statement using the  **class** function. In this
example, we load the source table using inline data.

```qlik
LOAD *,
class(Age, 10, 'age') As Agegroup;

LOAD * INLINE
[ Age, Name
25, John
42, Karen
53, Yoshi];
```

The resulting data that is loaded looks like this:

| Name  | Age | Agegroup         |
| ----- | --- | ---------------- |
| John  | 25  | 20 <= age < 30 |
| Karen | 42  | 40 <= age < 50 |
| Yoshi | 53  | 50 <= age < 60 |

## if

The if function returns a value depending on whether the condition provided with the function evaluates as True or False.

`if(condition, then , else)`

The if function has three parameters, condition, then and else, which are all expressions. The two other ones, then and
else, can be of any type.

| Argument  | Description |
| --------- | ----------- |
| condition | Expression that is interpreted logically.                    |
| then      | Expression that can be of any type. If the  expression. |
| else      | Expression that can be of any type. If the condition is False, then the if function returns the value of the else expression. |

| Example            | Result  |
| ------------------ | ------- |
| `if( Amount>= 0, 'OK', 'Alarm' )` | This expression will test if the amount is a positive number (0 or larger) and return 'OK' if it is. If the amount is less than 0, 'Alarm' is returned. |

## match

The **match** function compares the first parameter with all the following ones and returns the number of expression
that matches. The comparison is case sensitive.

`match( str, expr1 [ , expr2,...exprN] )`

!!! Note
    If you want to use case insensitive comparison, use the **mixmatch** function. If you want to use case insensitive
    comparison and wildcards, use the **wildmatch** function.

Examples and results:

| Example | Result |
| ------- | ------ |
| `match( M, 'Jan','Feb','Mar')` | returns 2 if M = Feb <br> returns 0 if M = Aprorjan |

## mixmatch

The **mixmatch** function compares the first parameter with all the following ones and
returns the number of expressions that match. The comparison is case insensitive.

`mixmatch( str, expr1 [ , expr2,...exprN] )`

!!! Note
    If you want to use case sensitive comparison, use the **match** function. If you want to use case insensitive
    comparison and wildcards, use the **wildmatch** function.

| Example                         | Result               |
| ------------------------------- | -------------------- |
| mixmatch( M, 'Jan','Feb','Mar') | returns 1 if M = jan |

## pick

The pick function returns the *n*:th expression in the list.

`pick(n, expr1[ , expr2,...exprN])`

| Argument | Description                      |
| -------- | -------------------------------- |
| n        | n is an integer between 1 and N. |

| Example  | Result |
| -------- | ------ |
| `pick(N, 'A', 'B', 4, 6)` | returns 'B' if N = 2 <br>returns 4 if N = 3 |

## wildmatch

The **wildmatch** function compares the first parameter with all the following ones and returns the number of
expression that matches. It permits the use of wildcard characters(**\*** and **?**) in the comparison strings.
The comparison is case insensitive.

`wildmatch( str, expr1 [ , expr2,...exprN] )`

!!! Note
    If you want to use comparison without wildcards, use the **match** or **mixmatch** functions.

| Example | Result |
| ------- | ------ |
| `wildmatch( M, 'ja*','fe?','mar')` | returns 1 if M = January<br>returns 2 if M = fex |
