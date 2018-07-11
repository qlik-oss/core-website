

## Operators

# Bit operators

All bit operators convert (truncate) the operands to signed integers (32
bit) and return the result in the same way. All operations are performed
bit by bit. If an operand cannot be interpreted as a number, the
operation will return NULL.

<table>
<tbody>
<tr class="odd">
<td>bitnot</td>
<td>Bit inverse.</td>
<td><p>Unary operator. The operation returns the logical inverse of the operand performed bit by bit.</p>
<p> </p>
<p>bitnot 17 returns -18</p></td>
</tr>
<tr class="even">
<td>bitand</td>
<td>Bit and.</td>
<td><p>The operation returns the logical AND of the operands performed bit by bit.</p>
<p> </p>
<p>17 bitand 7 returns 1</p></td>
</tr>
<tr class="odd">
<td>bitor</td>
<td>Bit or.</td>
<td><p>The operation returns the logical OR of the operands performed bit by bit.</p>
<p> </p>
<p>17 bitor 7 returns 23</p></td>
</tr>
<tr class="even">
<td>bitxor</td>
<td>Bit exclusive or.</td>
<td><p>The operation returns the logical exclusive or of the operands performed bit by bit.</p>
<p> </p>
<p>17 bitxor 7 returns 22</p></td>
</tr>
<tr class="odd">
<td>&gt;&gt;</td>
<td>Bit right shift.</td>
<td><p>The operation returns the first operand shifted to the right. The number of steps is defined in the second operand.</p>
<p> </p>
<p>8 &gt;&gt; 2 returns 2</p></td>
</tr>
<tr class="even">
<td>&lt;&lt;</td>
<td>Bit left shift.</td>
<td><p>The operation returns the first operand shifted to the left. The number of steps is defined in the second operand.</p>
<p> </p>
<p>8 &lt;&lt; 2 returns 32</p></td>
</tr>
</tbody>
</table>

# Logical operators

All logical operators interpret the operands logically and return True
(-1) or False (0) as
result.

|                                                           |                                                                                                                                                                                         |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| not | Logical inverse. One of the few unary operators. The operation returns the logical inverse of the operand.                                                                              |
| and | Logical and. The operation returns the logical and of the operands.                                                                                                                     |
| or    | Logical or. The operation returns the logical or of the operands.                                                                                                                       |
| Xor | Logical exclusive or. The operation returns the logical exclusive or of the operands. I.e. like logical or, but with the difference that the result is False if both operands are True. |

# Numeric operators

All numeric operators use the numeric values of the operands and return
a numeric value as
result.

|                                         |                                                                                                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| +      | Sign for positive number (unary operator) or arithmetic addition. The binary operation returns the sum of the two operands.                                                            |
| -     | Sign for negative number (unary operator) or arithmetic subtraction. The unary operation returns the operand multiplied by -1, and the binary the difference between the two operands. |
| \* | Arithmetic multiplication. The operation returns the product of the two operands.                                                                                                      |
| /    | Arithmetic division. The operation returns the ratio between the two operands.                                                                                                         |

# Operators

This section describes the operators that can be used in Qlik Sense.
There are two types of operators:

  - Unary operators (take only one operand)
  - Binary operators (take two operands)

Most operators are binary.

The following operators can be defined:

  - Bit operators
  - Logical operators
  - Numeric operators
  - Relational operators
  - String
operators

# Relational operators

All relational operators compare the values of the operands and return
True (-1) or False (0) as the result. All relational operators are
binary.

<table>
<colgroup>
<col style="width: 15%" />
<col style="width: 20%" />
<col style="width: 65%" />
</colgroup>
<tbody>
<tr class="odd">
<td>&lt;</td>
<td>Less than</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical value of the evaluation of the comparison.</td>
</tr>
<tr class="even">
<td>&lt;=</td>
<td>Less than or equal</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical value of the evaluation of the comparison.</td>
</tr>
<tr class="odd">
<td>&gt;</td>
<td>Greater than</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical value of the evaluation of the comparison.</td>
</tr>
<tr class="even">
<td>&gt;=</td>
<td>Greater than or equal</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical value of the evaluation of the comparison.</td>
</tr>
<tr class="odd">
<td>=</td>
<td>Equals</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical value of the evaluation of the comparison.</td>
</tr>
<tr class="even">
<td>&lt;&gt;</td>
<td>Not equivalent to</td>
<td>A numeric comparison is made if both operands can be interpreted numerically. The operation returns the logical value of the evaluation of the comparison.</td>
</tr>
<tr class="odd">
<td> **precedes** </td>
<td> </td>
<td>Unlike the &lt; operator no attempt is made to make a numeric interpretation of the argument values before the comparison. The operation returns true if the value to the left of the operator has a text representation which, in string comparison, comes before the text representation of the value on the right.
<p> </p>
<p>'1 ' precedes ' 2' returns FALSE</p>
<p>whilst</p>
<p>' 1' precedes ' 2' returns TRUE</p>
<p>as the ASCII value of a space (' ') is of less value than the ASCII value of a number.</p>
<p>Compare this to:</p>
<p>'1 ' &lt; ' 2' returns TRUE</p>
<p>and</p>
<p>' 1' &lt; ' 2' returns TRUE</p></td>
</tr>
<tr class="even">
<td> **follows** </td>
<td> </td>
<td>Unlike the &gt; operator no attempt is made to make a numeric interpretation of the argument values before the comparison. The operation returns true if the value to the left of the operator has a text representation which, in string comparison, comes after the text representation of the value on the right.
<p> </p>
<p>' 2' follows '1 ' returns FALSE</p>
<p>whilst</p>
<p>' 2' follows ' 1' returns TRUE</p>
<p>as the ASCII value of a space (' ') is of less value than the ASCII value of a number.</p>
<p>Compare this to:</p>
<p>' 2' &gt; ' 1' returns TRUE</p>
<p>and</p>
<p>' 2' &gt; '1 ' returns TRUE</p></td>
</tr>
</tbody>
</table>

# String operators

There are two string operators. One uses the string values of the
operands and return a string as result. The other one compares the
operands and returns a boolean value to indicate match.

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 75%" />
</colgroup>
<tbody>
<tr class="odd">
<td>&amp;</td>
<td>String concatenation. The operation returns a text string, that consists of the two operand strings, one after another.</td>
</tr>
<tr class="even">
<td> </td>
<td><p> </p>
'abc' &amp; 'xyz' returns 'abcxyz'</td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 75%" />
</colgroup>
<tbody>
<tr class="odd">
<td>like</td>
<td>String comparison with wildcard characters. The operation returns a boolean True (-1) if the string before the operator is matched by the string after the operator. The second string may contain the wildcard characters * (any number of arbitrary characters) or ? (one arbitrary character).</td>
</tr>
<tr class="even">
<td> </td>
<td><p> </p>
 returns True (-1) <p>'abcd' like 'a?c*' returns True (-1)</p>
'abc' like 'a??bc' returns False (0)</td>
</tr>
</tbody>
</table>