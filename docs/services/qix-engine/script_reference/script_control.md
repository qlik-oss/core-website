# Script control statements

The script consists of a number of statements. A statement
can be either a regular script statement or a script control statement.

Control statements are typically used for controlling the flow of the
script execution. Each clause of a control statement must be kept inside
one script line and may be terminated by semicolon or end-of-line.

Prefixes are never applied to control statements, with the exceptions of
the prefixes **when** and **unless** which may be used with a few specific control statements.

All script keywords can be typed with any combination of lower case and
upper case characters.

## Call

The **call** control statement calls a subroutine which must be defined by a previous  **sub** statement.

`call name ( [ paramlist ])`

| Argument  | Description |
| --------- | ----------  |
| name      | The name of the subroutine. |
| paramlist | A comma separated list of the actual parameters to be sent to the subroutine. Each item in the list may be a field name, a variable or an arbitrary expression. |

The subroutine called by a  **call** statement must be defined by a  **sub** encountered earlier during script execution.

Parameters are copied into the subroutine and, if the parameter in the  **call** statement is a variable and not an
expression, copied back out again upon exiting the subroutine.

Since the  **call** statement is a control statement and as such is ended with either a semicolon or end-of-line,
it must not cross a line boundary.

This example lists all Qlik related files in a folder and its
subfolders, and stores file information in a table. It is assumed that
you have created a data connection named Apps to the folder .

The DoDir subroutine is called with the reference to the folder,
'lib://Apps', as parameter. Inside the subroutine, there is a recursive
call, Call DoDir (Dir), that makes the function look for files recursively in
subfolders.

```qlik
sub DoDir (Root)
    For Each Ext in 'qvw', 'qvo', 'qvs', 'qvt', 'qvd', 'qvc', 'qvf'
      For Each File in filelist (Root&'\*.' &Ext)
       LOAD
        '$(File)' as Name,
         FileSize( '$(File)' ) as Size,
         FileTime( '$(File)' ) as FileTime
         autogenerate 1;
     Next File
    Next Ext
    For Each Dir in dirlist (Root&'\*' )
        Call DoDir (Dir)
    Next Dir
End Sub

Call DoDir ('lib://Apps')
```

## Do..loop

The  **do..loop** control statement is a script iteration construct which executes one or several statements until a
logical condition is met.

```qlik
Do [ ( while | until ) condition ] [statements]
[exit do [ ( when | unless )condition ] [statements]
loop[ ( while | until ) condition ]
```

Since the  **do..loop** statement is a control statement and as such is ended with either a semicolon or end-of-line,
each of its three possible clauses ( **do** , exit do and  **loop** )must not cross a line boundary.

| Argument      | Description     |
| ------------- | ----------------|
| condition     | A logical expression evaluating to True or False.|
| statements    | Any group of one or more Qlik Sense script statements.|
| while / until | The . Each condition is interpreted only the first time it is encountered but is evaluated for every  time it encountered in the loop. |
| exit do       | If an  **exit do** clause is encountered inside the loop, the execution of the script will be transferred to the first statement after the **loop** clause denoting the end of the loop. An **exit do** clause can be made conditional by the optional use of a **when**  or unless suffix. |

```qlik

// LOAD files file1.csv..file9.csv

Set a=1;
Do while a<10
LOAD * from file$(a).csv;
Let a=a+1;
Loop

```

## Exit script

This control statement stops script execution. It may be inserted anywhere in the script.

`Exit Script [ (when | unless) condition ]`

Since the *exit script* statement is a control statement and as such is ended with either a semicolon or end-of-line, it
must not cross a line boundary.

| Argument      | Description   |
| ------------- | --------------|
| condition     | A logical expression evaluating to True or False. |
| when / unless | An  **exit script**  statement can be made conditional by the optional use of when or unless clause.|

**Examples**

//Exit script

Exit Script;

//Exit script when a condition is fulfilled

Exit Script when
a=1

## For each..next

The for each..next control statement is a script iteration construct
which executes one or several statements for each value in a comma
separated list. The statements inside the loop enclosed by **for**
and  **next** will be executed for each value of the list.

Special syntax makes it possible to generate lists with file and
directory names in the current directory.

`for each var in list [statements] [ [ ( when| unless ) condition ][statements]next [var]`

| Argument | Description    |
| -------- | ---------------|
| var      | A script variable name which will acquire a new value from list for each loop execution. If  **var** is specified after **next** it must be the same variable name as the one found after the corresponding **for each** . |

The value of the **var** variable may be changed by statements inside the loop, but this is not good programming
practice.

If an exit for clause is encountered inside the loop, the execution of the
script will be transferred to the first statement after the **next** clause denoting the end of the loop. An exit for
clause can be made conditional by the optional use of a **when** or **unless** suffix.

Since the for each..next statement is a control statement and as such is ended
with either a semicolon or end-of-line, each of its three possible clauses
(for each,exit for and **next** ) must not cross a line boundary.

`list := item { , item } item := constant | (expression) | filelist mask | dirlist mask | fieldvaluelist mask`

<table>
<thead>
<tr>
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr >
<td>constant</td>
<td>Any number or string. Note that a string written directly in the script must be enclosed by single quotes. A string
without single quotes will be interpreted as a variable, and the value of the variable will be used. Numbers do not
need to be enclosed by single quotes.</td>
</tr>
<tr >
<td>expression</td>
<td>An arbitrary expression.</td>
</tr>
<tr >
<td>mask</td>
<td><p>A filename or folder name mask which may include any valid filename characters as well as the standard wildcard
characters,  <b>*</b> and <b>?</b> .</p>
<p>You can use absolute file paths or lib:// paths.</p></td>
</tr>
<tr >
<td>condition</td>
<td>A logical expression evaluating to True or False.</td>
</tr>
<tr >
<td>statements</td>
<td>Any group of one or more Qlik Sense script statements.</td>
</tr>
<tr >
<td>filelist mask</td>
<td><p>This syntax produces a comma separated list of all files in the current directory matching the filename mask.</p>

This argument supports only library connections in standard mode. See File system access restriction
</td>
</tr>
<tr >
<td>dirlist mask</td>
<td><p>This syntax produces a comma separated list of all folders in the current folder matching the folder name mask.</p>

This argument supports only library connections in standard mode. See File system access restriction
</td>
</tr>
<tr >
<td>fieldvaluelist mask</td>
<td>This syntax iterates through the values of a field already loaded into Qlik Sense.</td>
</tr>
</tbody>
</table>

Example 1: Loading a list of files

```qlik
// LOAD the files 1.csv, 3.csv, 7.csv and xyz.csv
for each a in 1,3,7,'xyz'
LOAD * from file$(a).csv;
next
```

Example 2: Creating a list of files on disk

This example loads a list of all Qlik Sense related files in a folder.

```qlik
sub DoDir (Root)
 for each Ext in 'qvw', 'qva', 'qvo', 'qvs', 'qvc','qvf', 'qvd' for each File in filelist (Root&'\*.' &Ext)
 LOAD
  '$(File)' as Name,
   FileSize( '$(File)' ) as Size,
    FileTime( '$(File)' ) as FileTime
    autogenerate 1;
    next File
    next Ext for each Dir in dirlist (Root&'\*' )
    call DoDir (Dir)
    next Dir
    end sub
    call DoDir ('lib://MyData')
```

Example 3: Iterating through a the values of a field

This example iterates through the list of loaded values of FIELD and generates a new field, NEWFIELD. For each value
of FIELD, two NEWFIELD records will be created.

```qlik
load * inline [
FIELD
one
two
three
];

FOR Each a in FieldValueList('FIELD')
LOAD '$(a)' &'-'&RecNo() as NEWFIELD AutoGenerate 2;
NEXT a
```

The resulting table looks like this:

| NEWFIELD |
| -------- |
| one-1    |
| one-2    |
| two-1    |
| two-2    |
| three-1  |
| three-2  |

## For..next

The **for..next** control statement is a script iteration construct with a counter. The statements inside the loop
enclosed by **for** and  **next**
will be executed for each value of the counter variable between specified low and high limits.

`For counter = expr1 to expr2 [ step expr3 ][statements][exit for [ ( when
| unless ) condition ][statements]`

`Next [counter]`

The expressions, expr2 and expr3 are only evaluated the first time the loop is entered. The value of the counter
variable may be changed by statements inside the loop, but this is not good programming practice.

If an exit for clause is encountered inside the loop, the execution of the
script will be transferred to the first statement after the **next**
clause denoting the end of the loop. An exit for clause can be made conditional by the optional use of a **when** or
**unless** suffix.

Since the **for..next** statement is a control statement and as such is ended with either a semicolon or end-of-line,
each of its three possible clauses
( **for..to..step** , exit for and **next** ) must not cross a line boundary.

| Argument   | Description |
| ---------- | ------------|
| counter    | A variable name. If counter is specified after next it must be the same variable name as the one found after the corresponding for. |
| expr1      | An expression which determines the first value of the counter variable for which the loop should be executed.  |
| expr2      | An expression which determines the last value of the  variable for which the loop should be executed.|
| expr3      | An expression which determines the value indicating the increment of the counter variable each time the loop has been executed.|
| condition  | a logical expression evaluating to True or False.  |
| statements | Any group of one or more Qlik Sense script statements.  |

Example 1: Loading a sequence of files

```qlik
// LOAD files file1.csv..file9.csv

for a=1 to 9
 LOAD * from file$(a).csv;
next
```

Example 2: Loading a random number of files

In this example, we assume there are data files x1.csv, x3.csv, x5.csv, x7.csv and x9.csv. Loading is stopped at a
random point using the if rand( )<0.5 then condition.

```qlik
for counter=1 to 9 step 2
set filename=x$(counter).csv;
if rand( )<0.5 then
    exit for unless counter=1
end if
LOAD a,b from $(filename);
next
```

## If..then..elseif..else..end if

The
 **if..then**
control statement is a script selection construct forcing the script
execution to follow different paths depending on one or several logical
conditions.

`If condition then [ statements ] {elseif condition then [ statements ] }[ else [ statements ] ] end if`

Since the **if..then** statement is a control statement and as such is ended with either a semicolon or end-of-line,
each of its four possible clauses
(**if..then**, **elseif..then**, **else** and **end if**) must not cross a line boundary.

| Argument   | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| condition  | A logical expression which can be evaluated as True or False. |
| statements | Any group of one or more Qlik Sense script statements.        |

Example 1:

```qlik
if a=1 then
    LOAD * from abc.csv;
    SQL SELECT e, f, g from tab1;
end if
```

Example 2:

```qlik
if a=1 then; drop table xyz; end if;
```

Example 3:

```qlik
if x>0 then
    LOAD * from pos.csv;
elseif x<0 then
    LOAD * from neg.csv;
else
    LOAD * from zero.txt;
end if
```

## Sub..end sub

The sub..end sub control statement defines a subroutine which can be called
upon from a **call** statement.

`Sub name [ (paramlist ] statements end sub`

Arguments are copied into the subroutine and, if the corresponding
actual parameter in the **call** statement is a variable name, copied back out again upon exiting the subroutine.

If a subroutine has more formal parameters than actual parameters passed
by a **call** statement, the extra parameters will be initialized to NULL and can be used as local variables within the
subroutine.

Since the **sub** statement is a control statement and as such is ended with either a semicolon or end-of-line, each of
its two clauses
( **sub** and end sub) must not cross a line boundary.

| Argument   | Description  |
| ---------- | -------------|
| name       | The name of the subroutine.  |
| paramlist  | A comma separated list of variable names for the formal parameters of the subroutine. These can be used as any variable inside the subroutine. |
| statements | Any group of one or more Qlik Sense script statements. |

Example 1:

```qlik
Sub INCR (I,J)
I = I + 1
Exit Sub when I < 10
J = J + 1
End Sub
Call INCR (X,Y)
```

Example 2:- parameter transfer

```qlik
Sub ParTrans (A,B,C)
A=A+1
B=B+1
C=C+1
End Sub
A=1
X=1
C=1
Call ParTrans (A, (X+1)*2)
```

The result of the above will be that locally, inside the subroutine, A will be initialized to 1, B will be initialized
to 4 and C will be initialized to NULL.

When exiting the subroutine, the global variable A will get 2 as value (copied back from subroutine). The second actual
parameter “(X+1)*2” will not be copied back since it is not a variable. Finally, the global variable C will not be
affected by the subroutine call.

## Switch..case..default..end switch  The  **switch**

The switch control statement is a script selection construct forcing the script
execution to follow different paths, depending on the value of an
expression.

`Switch expression {case valuelist [ statements ]}[ statements] end switch`

Since the **switch** statement is a control statement and as such is ended with either a semicolon or end-of-line, each
of its four possible clauses
(**switch**, **case**, **default** and **end switch**) must not cross a line boundary.

| Argument   | Description   |
| ---------- | --------------|
| expression | An arbitrary expression.  |
| valuelist  | A comma separated list of values with which the value of expression will be compared. Execution of the script will continue with the statements in the first group encountered with a value in valuelist equal to the value in expression. Each value in valuelist may be an arbitrary expression. If no match is found in any  **case** clause, the statements under the **default**  clause, if specified, will be executed. |
| statements | Any group of one or more Qlik Sense script statements.  |

**Example:**

```qlik
Switch I
Case 1
LOAD '$(I): CASE 1' as case autogenerate 1;
Case 2
LOAD '$(I): CASE 2' as case autogenerate 1;
Default
LOAD '$(I): DEFAULT' as case autogenerate 1;
End Switch
```
