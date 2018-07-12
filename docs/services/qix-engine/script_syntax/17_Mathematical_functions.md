# Mathematical functions

## e

The function returns the base of the natural logarithms,
 **e** (2.71828...).

`e( )`

## false

The function returns a dual value with text value 'False' and numeric
value 0, which can be used as logical false in expressions.

`false( )`

## pi

The function returns the value of π (3.14159...).

`pi( )`

## rand

The function returns a random number between 0 and 1. This can be used
to create sample data.

`rand( )`

This example script creates a table of 1000 records with randomly
selected upper case characters, that is, characters in the range 65 to
91
(65+26).

```
Load Chr( Floor(rand() \* 26) + 65) as UCaseChar, RecNo() as ID
Autogenerate 1000;
```

## true

The function returns a dual value with text value 'True' and numeric
value -1, which can be used as logical true in
expressions.

`true( )`
