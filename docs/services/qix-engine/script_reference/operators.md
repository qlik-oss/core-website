# Operators

## Bit operators

All bit operators convert (truncate) the operands to signed integers (32bit) and return the result in the same way. All
operations are performed bit by bit. If an operand cannot be interpreted as a number, the operation will return NULL.

|        |             |     |
| ------ | ----------- | --- |
| bitnot | Bit inverse | Unary operator. The operation returns the logical inverse of the operand performed bit by bit.<br>bitnot 17 returns -18|
| bitand | Bit and     | The operation returns the logical AND of the operands performed bit by bit.<br>17 bitand 7 returns 1|
| bitor  | Bit or      | The operation returns the logical OR of the operands performed bit by bit.<br>17 bitor 7 returns 23|
| bitxor | Bit exclusive or | The operation returns the logical exclusive or of the operands performed bit by bit.<br>17 bitxor 7 returns 22|
| >>     | Bit right shift | The operation returns the first operand shifted to the right. The number of steps is defined in the second operand.<br>8 >> 2 returns 2|
| <<     | Bit left shift | The operation returns the first operand shifted to the left. The number of steps is defined in the second operand.<br>8 << 2 returns 32 |

## Logical operators

All logical operators interpret the operands logically and return True (-1) or False (0) as result.

|     |     |
| --- | --- |
| not | Logical inverse. One of the few unary operators. The operation returns the logical inverse of the operand.|
| and | Logical and. The operation returns the logical and of the operands. |
| or  | Logical or. The operation returns the logical or of the operands. |
| Xor | Logical exclusive or. The operation returns the logical exclusive or of the operands. I.e. like logical or, but with the difference that the result is False if both operands are True. |

## Numeric operators

All numeric operators use the numeric values of the operands and return
a numeric value as
result.

|   |     |
| - | --- |
| + | Sign for positive number (unary operator) or arithmetic addition. The binary operation returns the sum of the two operands. |
| - | Sign for negative number (unary operator) or arithmetic subtraction. The unary operation returns the operand multiplied by -1, and the binary the difference between the two operands.|
| * | Arithmetic multiplication. The operation returns the product of the two operands. |
| / | Arithmetic division. The operation returns the ratio between the two operands. |

## Relational operators

All relational operators compare the values of the operands and return True (-1) or False (0) as the result. All
relational operators are binary.

<table>
<tbody>
<tr>
<td>&lt;</td>
<td>Less than</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical
value of the evaluation of the comparison.</td>
</tr>
<tr>
<td>&lt;=</td>
<td>Less than or equal</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical
value of the evaluation of the comparison.</td>
</tr>
<tr>
<td>&gt;</td>
<td>Greater than</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical
value of the evaluation of the comparison.</td>
</tr>
<tr>
<td>&gt;=</td>
<td>Greater than or equal</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical
value of the evaluation of the comparison.</td>
</tr>
<tr>
<td>=</td>
<td>Equals</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical
value of the evaluation of the comparison.</td>
</tr>
<tr>
<td>&lt;&gt;</td>
<td>Not equivalent to</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical
value of the evaluation of the comparison.</td>
</tr>
<tr>
<td>precedes</td>
<td> </td>
<td>Unlike the &lt; operator no attempt is made to make a numeric interpretation of the argument values before the
comparison. The operation returns true if the value to the left of the operator has a text representation which, in
string comparison, comes before the text representation of the value on the right.
<br>
'1 ' precedes ' 2' returns FALSE<br>
whilst<br>
' 1' precedes ' 2' returns TRUE<br>
as the ASCII value of a space (' ') is of less value than the ASCII value of a number.
<p>
Compare this to:<br>
'1 ' &lt; ' 2' returns TRUE<br>
and<br>
' 1' &lt; ' 2' returns TRUE<br>
</p></td>
</tr>
<tr>
<td>follows</td>
<td> </td>
<td>Unlike the &gt; operator no attempt is made to make a numeric interpretation of the argument values before the
comparison. The operation returns true if the value to the left of the operator has a text representation which, in
string comparison, comes after the text representation of the value on the right.
<br>
' 2' follows '1 ' returns FALSE<br>
whilst<br>
' 2' follows ' 1' returns TRUE<br>
as the ASCII value of a space (' ') is of less value than the ASCII value of a number.
<p>
Compare this to:<br>
' 2' &gt; ' 1' returns TRUE<br>
and<br>
' 2' &gt; '1 ' returns TRUE<br>
</p>
</td>
</tr>
</tbody>
</table>

## String operators

There are two string operators. One uses the string values of the operands and return a string as result. The other one
compares the operands and returns a boolean value to indicate match.

| Operator | Description  | Example |
| -------- | -------------| ------- |
| &        | String concatenation. The operation returns a text string, that consists of the two operand strings, one after another.| 'abc' & 'xyz' returns 'abcxyz'|
| like     | String comparison with wildcard characters. The operation returns a boolean True (-1) if the string before the operator is matched by the string after the operator. The second string may contain the wildcard characters * (any number of arbitrary characters) or ? (one arbitrary character). | 'abc' lie 'a*' returns True (-1) <br>'abcd' like 'a?c*' returns True (-1)<br>'abc' like 'a??bc' returns False (0)|