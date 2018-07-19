# General numeric functions

## BitCount

BitCount() finds how many bits in the binary equivalent of a number are set to 1.
That is, the function returns the number of set bits in integer_number, where
integer_number is interpreted as a signed 32-bit integer.

`BitCount( integer_number )`

**Return data type:** integer

| Examples       | Results                                            |
| -------------- | -------------------------------------------------- |
| BitCount( 3 )  | 3 is binary 101, therefore this returns 2          |
| BitCount( -1 ) | -1 is 64 ones in binary, therefore this returns 64 |

## Ceil

Ceil() rounds up a number to the nearest multiple of the step shifted by the
offset number.
Compare with the floor function, which rounds input numbers down.

`Ceil(x[, step[, offset]])`

**Return data type:** numeric

| Argument | Description |
| -------- | -------------------------------------------------- |
| x        | Input number.|
| step     | Interval increment. The default value is 1. |
| offset   | Defines the base of the step interval. The default value is 0. |

<BR>

| Examples | Results |
| -------------- | -------------------------------------------------- |
| Ceil(2.4 ) | Returns 3<BR>In this example, the size of the step is 1 and the base of the step interval is 0.<BR>The intervals are ...0 < x <=1, 1 < x <= 2, 2< x <=3, 3< x <=4...|
| Ceil(4.2 ) | Returns 5 |
| Ceil(3.88 ,0.1) | Returns 3.9<BR>In this example, the size of the interval is 0.1 and the base of the interval is 0.<BR>The intervals are ... 3.7 < x <= 3.8, 3.8 < x <= 3.9, 3.9 < x <= 4.0... |
| Ceil(3.88 ,5) | Returns 5 |
| Ceil(1.1 ,1) | Returns 2 |
| Ceil(1.1 ,1,0.5) | Returns 1.5<BR>In this example, the size of the step is 1 and the offset is 0.5. It means that the base of the step interval is 0.5 and not 0.<BR>The intervals are ...0.5 < x <=1.5, 1.5 < x <= 2.5, 2.5< x <=3.5, 3.5< x <=4.5... |
| Ceil(1.1 ,1,-0.01) | Returns 1.99<BR>The intervals are ...-0.01< x <= 0.99, 0.99< x <= 1.99, 1.99 < x <=2.99...|

## Combin

Combin() returns the number of combinations of q elements that can be picked from
a set of p items. As represented by the formula: Combin(p,q) = p! / q!(p-q)! The
order in which the items are selected is insignificant.

`Combin(p, q)`

**Return data type:** integer

**Limitations:** Non-integer items will be truncated.

| Examples | Results |
| -------- | -------- |
| How many combinations of 7 numbers can be picked from a total of 35 lottery numbers?<BR>Combin( 35,7 ) | Returns 6,724,520 |

## Div

Div() returns the integer part of the arithmetic division of the first argument
by the second argument. Both parameters are interpreted as real numbers, that is,
they do not have to be integers.

`Div(integer_number1, integer_number2)`

**Return data type:** integer

| Examples | Results |
| -------- | ------- |
| Div( 7,2 ) | Returns 3 |
| Div( 7.1,2.3 ) | Returns 3 |
| Div( 9,3 ) | Returns 3 |
| Div( -4,3 ) | Returns -1 |
| Div( 4,-3 ) | Returns -1 |
| Div( -4,-3 ) | Returns 1 |

## Even

Even() returns True (-1), if integer_number is an even integer or zero. It returns
False (0), if integer_number is an odd integer, and NULL if integer_number is not
an integer.

`Even(integer_number)`

**Return data type:** Boolean

| Examples | Results |
| -------- | ------- |
| Even( 3 ) | Returns 0, False |
| Even( 2 * 10 ) | Returns -1, True |
| Even( 3.14 ) | Returns NULL|

## Fabs

Fabs() returns the absolute value of x. The result is a positive number.

`Fabs(x)`

**Return data type:** numeric

| Examples | Results |
| -------- | ------- |
| Fabs( 2.4 ) | Returns 2.4 |
| Fabs( -3.8 ) | Returns 3.8 |

## Fact

Fact() returns the factorial of a positive integer x.

`Fact(x)`

**Return data type:** integer

**Limitations:** If the number x is not an integer, it will be truncated.
Non-positive numbers will return NULL.

| Examples | Results |
| -------- | ------- |
| Fact( 1 ) | Returns 1 |
| Fact( 5 ) | Returns 120 ( `1 * 2 * 3 * 4 * 5 = 120` ) |
| Fact( -5 ) | Returns NULL |

## Floor

Floor() rounds down a number to the nearest multiple of the step shifted by the
offset number.
Compare with the ceil function, which rounds input numbers up.

`Floor(x[, step[, offset]])`

**Return data type:** numeric

| Argument | Description |
| -------- | -------------------------------------------------- |
| x | Input number. |
| step | Interval increment. The default value is 1. |
| offset | Defines the base of the step interval. The default value is 0. |

<BR>

| Examples | Results |
| -------- | ------- |
| Floor(2.4) | Returns 2<BR>In this example, the size of the step is 1 and the base of the step interval is 0.<BR>The intervals are ...0 <= x <1, 1 <= x < 2, 2<= x <3, 3<= x <4.... |
| Floor(4.2) | Returns 4 |
| Floor(3.88 ,0.1) | Returns 3.8<BR>In this example, the size of the interval is 0.1 and the base of the interval is 0.<BR>The intervals are ... 3.7 <= x < 3.8, 3.8 <= x < 3.9, 3.9 <= x < 4.0... |
| Floor(3.88 ,5) | Returns 0 |
| Floor(1.1 ,1) | Returns 1 |
| Returns 1 | Returns 0.5<BR>In this example, the size of the step is 1 and the offset is 0.5. It means that the base of the step interval is 0.5 and not 0.<BR>The intervals are ...0.5 <= x <1.5, 1.5 <= x < 2.5, 2.5<= x <3.5,... |

## Fmod

fmod() is a generalized modulo function that returns the remainder part of the
integer division of the first argument (the dividend) by the second argument
(the divisor). The result is a real number. Both arguments are interpreted as
real numbers, that is, they do not have to be integers.

`Fmod(a, b)`

**Return data type:** numeric

| Argument | Description |
| -------- | -------------------------------------------------- |
| a | Dividend |
| b | Divisor |

<BR>

| Examples | Results |
| -------- | ------- |
| Fmod( 7,2 ) | Returns 1 |
| Fmod( 7.5,2 ) | Returns 1.5 |
| Fmod( 9,3 ) | Returns 0 |
| Fmod( -4,3 ) | Returns -1 |
| Fmod( 4,-3 ) | Returns 1 |
| Fmod( -4,-3 ) | Returns -1 |

## Frac

Frac() returns the fraction part of x.

The fraction is defined in such a way that Frac(x ) + Floor(x ) = x. In simple
terms this means that the fractional part of a positive number is the difference
between the number (x) and the integer that precedes it.

For example: The fractional part of 11.43 = 11.43 - 11 = 0.43

For a negative number, say -1.4, Floor(-1.4) = -2, which produces the following result:
The fractional part of -1.4 = 1.4 - (-2) = -1.4 + 2 = 0.6

`Frac(x)`

**Return data type:** numeric

| Argument | Description |
| -------- | -------------------------------------------------- |
| x | Number to return fraction for. |

<BR>

| Examples | Results |
| -------- | ------- |
| Frac( 11.43 ) | Returns 0.43 |
| Frac( -1.4 ) | Returns 0.6 |

## Mod

Mod() is a mathematical modulo function that returns the non-negative remainder
of an integer division. The first argument is the dividend, the second argument
is the divisor, Both arguments must be integer values.

`Mod(integer_number1, integer_number2)`

**Return data type:** integer

**Limitations:** integer_number2 must be greater than 0.

| Examples | Results |
| -------- | ------- |
| Mod( 7,2 ) | Returns 1 |
| Mod( 7.5,2 ) | Returns NULL |
| Mod( 9,3 ) | Returns 0 |
| Mod( -4,3 ) | Returns 2 |
| Mod( 4,-3 ) |Returns NULL |
| Mod( -4,-3 ) |Returns NULL |

## Odd

Odd() returns True (-1), if integer_number is an odd integer or zero. It returns
False (0), if integer_number is an even integer, and NULL if integer_number is
not an integer.

`Odd(integer_number)`

**Return data type:** Boolean

| Examples | Results |
| -------- | ------- |
| Odd( 3 ) | Returns -1, True |
| Odd( 2 * 10 ) | Returns 0, False |
| Odd( 3.14 ) |Returns NULL |

## Permut

Permut() returns the number of permutations of q elements that can be selected
from a set of p items. As represented by the formula: Permut(p,q) = (p)! / (p - q)!
The order in which the items are selected is significant.

`Permut(p, q)`

**Return data type:** integer

**Limitations:** Non-integer arguments will be truncated.

| Examples | Results |
| -------- | ------- |
| In how many ways could the gold, silver and bronze medals be distributed after a 100 m final with 8 participants?<BR>Permut( 8,3 ) | Returns 336 |

## Round

Round() returns the result of rounding a number up or down to the nearest multiple
of step shifted by the offset number.

If the number to round is exactly in the middle of an interval, it is rounded upwards.

`Round(x[, step[, offset]])`

**Return data type:** numeric

If you are rounding a floating point number you may observe erroneous results.
These rounding errors occur because floating point numbers are represented by a
finite number of binary digits. Therefore, results are calculated using a number
that is already rounded. If these rounding errors will affect your work, multiply
the numbers to convert them to integers before rounding.

| Argument | Description                                        |
| -------- | -------------------------------------------------- |
| x        | Input number. |
| step     | Interval increment. The default value is 1. |
| offset   | Defines the base of the step interval. The default value is 0. |

<BR>

| Examples | Results |
| -------- | ------- |
| Round(3.8) | Returns 4<BR>In this example, the size of the step is 1 and the base of the step interval is 0.<BR>The intervals are ...0 <= x <1, 1 <= x < 2, 2<= x <3, 3<= x <4... |
| Round(3.8,4) | Returns 4 |
| Round(2.5) | Returns 3. Rounded up because 2.5 is exactly half of the default step interval. |
| Round(2,4) | Returns 4. Rounded up because 2 is exactly half of the step interval of 4.<BR>In this example, the size of the step is 4 and the base of the step interval is 0.<BR>The intervals are ...0 <= x <4, 4 <= x <8, 8<= x <12... |
| Round(2,6) | Returns 0. Rounded down because 2 is less than half of the step interval of 6.<BR>In this example, the size of the step is 6 and the base of the step interval is 0.<BR>The intervals are ...0 <= x <6, 6 <= x <12, 12<= x <18... |
| Round(3.88 ,0.1) | Returns 3.9<BR>In this example, the size of the step is 0.1 and the base of the step interval is 0.
<BR>The intervals are ... 3.7 <= x <3.8, 3.8 <= x <3.9, 3.9 <= x < 4.0... |
| Round(3.88 ,5) | Returns 5 |
| Round(1.1 ,1,0.5) | Returns 1.5<BR>In this example, the size of the step is 1 and the base of the step interval is 0.5.<BR>The intervals are ...0.5 <= x <1.5, 1.5 <= x <2.5, 2.5<= x <3.5... |

## Sign

Sign() returns 1, 0 or -1 depending on whether x is a positive number, 0, or a
negative number.

`Sign(x)`

**Return data type:** numeric

**Limitations:** If no numeric value is found, NULL is returned.

| Examples | Results |
| -------- | ------- |
| Sign( 66 ) | Returns 1 |
| Sign( 0 ) | Returns 0 |
| Sign( - 234 ) | Returns -1 |
