# Variables

A variable in the engineis a container storing a static value or a calculation, for example a numeric or alphanumeric
value. When you use the variable in the app, any change made to the variable is applied everywhere the variable is used.
You set the value of a variable using Let or Set statements in the data load script.

When used, the variable is substituted by its value. Variables can be used in the script for dollar sign expansion and
in various control statements. This is useful if the same string is repeated many times in the script, for example,
a path.

Some special system variables will be set at the start of the script execution regardless of their previous values.

## Defining a variable

When defining a variable, the syntax:

`set variablename = string`

or

`let variable = expression`

is used. The **Set** command assigns the text to the right of the equal sign to the variable, whereas the **Let**
command evaluates the expression.

Variables are case sensitive.

!!! Note
    It is not recommended to name a variable identically to a field or a function.

**Examples:**

```qlik
set HidePrefix = $ ; // the variable will get the character '$' as value.
let vToday = Num(Today()); // returns the date serial number of today.
```

## Deleting a variable

If you remove a variable from the script and reload the data, the variable stays in the app. If you want to fully
remove the variable from the app, you must also delete the variable using the
[destroyvariablebyname](../apis/qix/doc/#destroyvariablebyname) or
[destroyvariablebyid](../apis/qix/doc/destroyvariablebyid) functions.

## Loading a variable value as a field value

If you want to load a variable value as a field value in a **LOAD** statement and the result of the dollar expansion is
text rather than numeric or an expression then you need to enclose the expanded variable in single quotes.

**Example:**

This example loads the system variable containing the list of script errors to a table. You can note that the expansion
of ScriptErrorCount in the If clause does not require quotes, while the expansion of ScriptErrorList requires quotes.

```qlik
IF $(ScriptErrorCount) >= 1 THEN
   LOAD '$(ScriptErrorList)' AS Error AutoGenerate 1;
END IF
```

## Variable calculation

There are several ways to use variables with calculated values, and the result depends on how you define it and how you
call it in an expression.

In this example we load some inline data:

```qlik
LOAD * INLINE [
    Dim, Sales
    A, 150
    A, 200
    B, 240
    B, 230
    C, 410
    C, 330
];
```

Let's define two variables:

```qlik
Let vSales  = 'Sum(Sales)' ;
Let vSales2  = '=Sum(Sales)' ;
```

In the second variable, we add an equal sign before the expression. This will cause the variable to be calculated before
it is expanded and the expression is evaluated.

If you use the vSales variable as it is, for example in a measure, the result will be the string Sum(Sales), that is, no
calculation is performed.

If you add a dollar-sign expansion and call $(vSales) in the expression, the variable is expanded, and the sum of Sales
is displayed.

Finally, if you call $(vSales2), the variable will be calculated before it is expanded. This means that the result
displayed is the total sum of Sales. The difference between using =$(vSales) and =$(vSales2) as measure expressions is
seen in this table showing the results:

| Dim | $(vSales) | $(vSales2) |
| --- | --------- | ---------- |
| A   | 350       | 1560       |
| B   | 470       | 1560       |
| C   | 740       | 1560       |

As you can see, $(vSales) results in the partial sum for a dimension value, while $(vSales2) results in the total sum.