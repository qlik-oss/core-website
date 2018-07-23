# Trigonometric and Hyperbolic functions

## cos

Cosine of **x**.
The result is a number between -1 and 1.

`cos( x )`

## acos

Inverse cosine of **x**.
The function is only defined if -1≤ **x** ≤1.
The result is a number between 0 and
<span style='font-family: Symbol;' data-autonumposition='none'>p.</span>

`acos( x )`

## sin

Sine of **x**.
The result is a number between -1 and 1.

`sin( x )`

## asin

Inverse sine of **x**.
The function is only defined if
-1≤ **x** ≤1.
The result is a number between -
<span style='font-family: Symbol;' data-autonumposition='none'>p/2</span>
and
<span style='font-family: Symbol;' data-autonumposition='none'>p/2</span>.

`asin( x )`

## tan

Tangent of **x**.
The result is a real number.

`tan( x )`

## atan

Inverse tangent of **x**.
The result is a number between -
<span style='font-family: Symbol;' data-autonumposition='none'>p/2</span>
and
<span style='font-family: Symbol;' data-autonumposition='none'>p/2</span>.

`atan( x )`

## atan2

Two-dimensional generalization of the inverse tangent function. Returns
the angle between the origin and the point represented by the
coordinates **x** and **y**.
The result is a number between -
<span style='font-family: Symbol;' data-autonumposition='none'>p</span>
and +
<span style='font-family: Symbol;' data-autonumposition='none'>p</span>.

`atan2( y,x )`

## cosh

Hyperbolic cosine of **x**.
The result is a positive real number.

`cosh( x )`

## sinh

Hyperbolic sine of **x**.
The result is a real number.

`sinh( x )`

## tanh

Hyperbolic tangent of **x** .
The result is a real number.

`tanh( x )`

The following script code loads a sample table, and then loads a table
containing the calculated trigonometric and hyperbolic operations on the
values.

```qlik
SampleData:
LOAD * Inline [Value -1 0 1];

Results:
Load *,
cos(Value),
acos(Value),
sin(Value),
asin(Value),
tan(Value),
atan(Value),
atan2(Value, Value),
cosh(Value),
sinh(Value),
tanh(Value)
RESIDENT SampleData;

Drop Table SampleData;
```
