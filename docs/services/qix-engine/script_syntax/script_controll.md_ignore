

## ScriptControlStatements

# Call

The
 **call** 
control statement calls a subroutine which must be defined by a previous
 **sub** 
statement.

 

name ( [
paramlist
])

 

 

| Argument  | Description                                                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name      | The name of the subroutine.                                                                                                                                     |
| paramlist | A comma separated list of the actual parameters to be sent to the subroutine. Each item in the list may be a field name, a variable or an arbitrary expression. |

The subroutine called by a
 **call** 
statement must be defined by a
 **sub** 
encountered earlier during script execution.

Parameters are copied into the subroutine and, if the parameter in the
 **call** 
statement is a variable and not an expression, copied back out again
upon exiting the subroutine.

 

Since the
 **call** 
statement is a control statement and as such is ended with either a
semicolon or end-of-line, it must not cross a line boundary.

 

This example lists all Qlik related files in a folder and its
subfolders, and stores file information in a table. It is assumed that
you have created a data connection named Apps to the folder .

The DoDir subroutine is called with the reference to the folder,
'lib://Apps', as parameter. Inside the subroutine, there is a recursive
call, Call DoDir (Dir), that makes the function look for files recursively in
subfolders.



sub DoDir (Root) For Each Ext in 'qvw', 'qvo', 'qvs', 'qvt', 'qvd',
'qvc', 'qvf' For Each File in filelist (Root&'\\\*.' \&Ext) LOAD
'$(File)' as Name, FileSize( '$(File)' ) as Size, FileTime( '$(File)' )
as FileTime autogenerate 1; Next File Next Ext For Each Dir in dirlist
(Root&'\\\*' ) Call DoDir (Dir) Next Dir End Sub Call DoDir
('lib://Apps')



# Do..loop

The
 **do..loop** 
control statement is a script iteration construct which executes one or
several statements until a logical condition is met.

 

 [ ( while |
until )
condition ] [statements]  
[ [ ( when |
unless )
condition ] [statements]  
[ ( while |
 ) condition ]

 



Since the
 **do..loop** 
statement is a control statement and as such is ended with either a
semicolon or end-of-line, each of its three possible clauses
( **do** ,
exit do and
 **loop** )
must not cross a line
boundary.



 

| Argument      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| condition     | A logical expression evaluating to True or False.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| statements    | Any group of one or more Qlik Sense script statements.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| while / until | The . Each condition is interpreted only the first time it is encountered but is evaluated for every time it encountered in the loop.                | | exit do       | If an  **exit do clause is encountered inside the loop, the execution of the script will be transferred to the first statement after the **loop clause denoting the end of the loop. An **exit do clause can be made conditional by the optional use of a **when**  or **unless suffix. |

 

// LOAD files file1.csv..file9.csv

Set a=1;

Do while a\<10  LOAD \* from file$(a).csv;  Let a=a+1;  Loop     *Exit*  # End  The  **End** 
script keyword is used to close
, **Sub
and
 **Switch** 
clauses.

*If..then..elseif..else..end if*

*Sub..end sub*

*Switch..case..default..end
switch*

# Exit script

This control statement stops script execution. It may be inserted
anywhere in the script.

 

Exit Script [ (when
|
) condition ]

 

Since the
exit script statement is a control statement and as such is ended with
either a semicolon or end-of-line, it must not cross a line
boundary.

 

| Argument      | Description                                                                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| condition     | A logical expression evaluating to True or False.                                                                                                                                                  |
| when / unless | An  **exit script**  statement can be made conditional by the optional use of when or unless clause. |

 

//Exit script

Exit Script;

 

//Exit script when a condition is fulfilled

Exit Script when
a=1

 

*Exit*

 

# Exit

The
 **Exit** 
script keyword is part of the
Exit Script statement, but can also be used to exit
, **For
or
 **Sub** 
clauses.

*Exit script*

*Do..loop*

*For..next*

*For each..next*

*Sub..end
sub*

# For each..next

The
for each..next control statement is a script iteration construct
which executes one or several statements for each value in a comma
separated list. The statements inside the loop enclosed by
 **for** 
and
 **next** 
will be executed for each value of the list.

 

Special syntax makes it possible to generate lists with file and
directory names in the current directory.

for each var in list

[statements]

[ [ ( when
|  ) condition
]

[statements]

next [var]

 

| Argument | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| var      | A script variable name which will acquire a new value from list for each loop execution. If  **var is specified after **next it must be the same variable name as the one found after the corresponding **for each** . |

The value of the
 **var** 
variable may be changed by statements inside the loop, but this is not
good programming practice.

If an
exit for clause is encountered inside the loop, the execution of the
script will be transferred to the first statement after the
 **next** 
clause denoting the end of the loop. An
exit for clause can be made conditional by the optional use of a
 **when** 
or
 **unless** 
suffix.



Since the
for each..next statement is a control statement and as such is ended
with either a semicolon or end-of-line, each of its three possible
clauses
(for each,
exit for and
 **next** )
must not cross a line boundary.



 

list := item { , item }

item := constant |
(expression)
|
filelist mask
|
dirlist mask
|
fieldvaluelist mask

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>constant</td>
<td>Any number or string. Note that a string written directly in the script must be enclosed by single quotes. A string without single quotes will be interpreted as a variable, and the value of the variable will be used. Numbers do not need to be enclosed by single quotes.</td>
</tr>
<tr class="even">
<td>expression</td>
<td>An arbitrary expression.</td>
</tr>
<tr class="odd">
<td>mask</td>
<td><p>A filename or folder name mask which may include any valid filename characters as well as the standard wildcard characters,  *** and **?** .</p>
<p>You can use absolute file paths or lib:// paths.</p></td>
</tr>
<tr class="even">
<td>condition</td>
<td>A logical expression evaluating to True or False.</td>
</tr>
<tr class="odd">
<td>statements</td>
<td>Any group of one or more Qlik Sense script statements.</td>
</tr>
<tr class="even">
<td>filelist mask</td>
<td><p>This syntax produces a comma separated list of all files in the current directory matching the filename mask.</p>

This argument supports only library connections in standard mode. See File system access restriction
</td>
</tr>
<tr class="odd">
<td>dirlist mask</td>
<td><p>This syntax produces a comma separated list of all folders in the current folder matching the folder name mask.</p>

This argument supports only library connections in standard mode. See File system access restriction
</td>
</tr>
<tr class="even">
<td>fieldvaluelist mask</td>
<td>This syntax iterates through the values of a field already loaded into Qlik Sense.</td>
</tr>
</tbody>
</table>

Loading a list of
files

<div class="code" data-space="preserve" data-conditions="Targets.NotToTranslate" data-autonumposition="none">

// LOAD the files 1.csv, 3.csv, 7.csv and xyz.csv for each a in
1,3,7,'xyz' LOAD \* from file$(a).csv; next



Creating a list of files on disk

This example loads a list of all Qlik Sense related files in a
folder.



sub DoDir (Root) for each Ext in 'qvw', 'qva', 'qvo', 'qvs', 'qvc',
'qvf', 'qvd' for each File in filelist (Root&'\\\*.' \&Ext) LOAD
'$(File)' as Name, FileSize( '$(File)' ) as Size, FileTime( '$(File)' )
as FileTime autogenerate 1; next File next Ext for each Dir in dirlist
(Root&'\\\*' ) call DoDir (Dir) next Dir end sub call DoDir
('lib://MyData')



Iterating through a the values of a field

This example iterates through the list of loaded values of FIELD and
generates a new field, NEWFIELD. For each value of FIELD, two NEWFIELD
records will be
created.



load \* inline [ FIELD one two three ]; FOR Each a in
FieldValueList('FIELD') LOAD '$(a)' &'-'\&RecNo() as NEWFIELD
AutoGenerate 2; NEXT a



The resulting table looks like this:

| NEWFIELD |
| -------- |
| one-1    |
| one-2    |
| two-1    |
| two-2    |
| three-1  |
| three-2  |

 

*For..next*

*Next*

*Exit*

# For..next

The
 **for..next** 
control statement is a script iteration construct with a counter. The
statements inside the loop enclosed by
 **for** 
and
 **next** 
will be executed for each value of the counter variable between
specified low and high
limits.

 

For counter
=
expr1 to expr2
[
step expr3
]

[statements]

[ [ ( when
|  ) condition
]

[statements]

Next [counter]

 

The expressions
, expr2
and
expr3
are only evaluated the first time the loop is entered. The value of the
counter variable may be changed by statements inside the loop, but this
is not good programming practice.

If an
exit for clause is encountered inside the loop, the execution of the
script will be transferred to the first statement after the
 **next** 
clause denoting the end of the loop. An
exit for clause can be made conditional by the optional use of a
 **when** 
or
 **unless** 
suffix.



Since the
 **for..next** 
statement is a control statement and as such is ended with either a
semicolon or end-of-line, each of its three possible clauses
( **for..to..step** ,
exit for and
 **next** )
must not cross a line
boundary.



 

| Argument   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| counter    | A variable name. If . | | expr1      | An expression which determines the first value of the counter variable for which the loop should be executed.                                                                                                                                                                                                                               |
| expr2      | An expression which determines the last value of the  variable for which the loop should be executed.                                                                                                                                                                                                                                | | expr3      | An expression which determines the value indicating the increment of the counter variable each time the loop has been executed.                                                                                                                                                                                                             |
| condition  | a logical expression evaluating to True or False.                                                                                                                                                                                                                                                                                                                                                                                                |
| statements | Any group of one or more Qlik Sense script statements.                                                                                                                                                                                                                                                                                                                                                                                           |

Loading a sequence of files

// LOAD files file1.csv..file9.csv

for a=1 to 9

> LOAD \* from file$(a).csv;

next

Loading a random number of files

In this example, we assume there are data files
x1.csv, x3.csv, x5.csv, x7.csv and
<span class="path" data-autonumposition="none">x9.csv. Loading is
stopped at a random point using the
if rand( )\<0.5 then condition.

for counter=1 to 9 step 2

> set filename=x$(counter).csv;
> 
> if rand( )\<0.5 then > 
> > exit for unless counter=1
> 
> end if
> 
> LOAD a,b from $(filename);

next

 

*For
each..next*

*Next*

*To*

*Exit*

# If..then..elseif..else..end if

The
 **if..then** 
control statement is a script selection construct forcing the script
execution to follow different paths depending on one or several logical
conditions.

*if - script and chart function* (script and chart
function)

 

 condition then

  [ statements ]

{
elseif condition then

  [ statements ] }

[ else

  [ statements ] ]

end if

 

Since the
 **if..then** 
statement is a control statement and as such is ended with either a
semicolon or end-of-line, each of its four possible clauses
(, **elseif..then,
 **else** 
and
end if) must not cross a line
boundary.

 

| Argument   | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| condition  | A logical expression which can be evaluated as True or False. |
| statements | Any group of one or more Qlik Sense script statements.        |

 

if a=1 then

> LOAD \* from abc.csv;
> 
> SQL SELECT e, f, g from tab1;

end if

 

if a=1 then; drop table xyz; end if;

 

if x\>0 then

> LOAD \* from pos.csv;

elseif x\<0 then  > LOAD \* from neg.csv;

else

> LOAD \* from zero.txt;

end
if

 

*End*

# Next

The
 **Next** 
script keyword is used to close
 **For** 
loops.

*For..next*

*For
each..next*

# Script control statements

The Qlik Sense script consists of a number of statements. A statement
can be either a regular script statement or a script control statement.

Control statements are typically used for controlling the flow of the
script execution. Each clause of a control statement must be kept inside
one script line and may be terminated by semicolon or end-of-line.

Prefixes are never applied to control statements, with the exceptions of
the prefixes
 **when** 
and
 **unless** 
which may be used with a few specific control statements.

All script keywords can be typed with any combination of lower case and
upper case
characters.

## Script control statements overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

Call

The
 **call** 
control statement calls a subroutine which must be defined by a previous
 **sub** 
statement.

name ( [
paramlist
])

Do..loop

The
 **do..loop** 
control statement is a script iteration construct which executes one or
several statements until a logical condition is
met.

 [ ( while
| until )
condition ] [statements]  
[ [ ( when |
unless )
condition ] [statements]  
 [ ( while |
 ) condition ]

Exit script

This control statement stops script execution. It may be inserted
anywhere in the script.

**exit script1406463331**[ (when
|
) condition ]

For each ..next

The
for each..next control statement is a script iteration construct
which executes one or several statements for each value in a comma
separated list. The statements inside the loop enclosed by
 **for** 
and
 **next** 
will be executed for each value of the list.

**For Each593310968** var in list

[statements]

[ [ ( when
|  ) condition
]

[statements]

next [var]

For..next

The
 **for..next** 
control statement is a script iteration construct with a counter. The
statements inside the loop enclosed by
 **for** 
and
 **next** 
will be executed for each value of the counter variable between
specified low and high
limits.

**For3620039988**counter
=
expr1 to expr2
[
stepexpr3
]

[statements]

[ [ ( when
|  ) condition
]

[statements]

Next [counter]

If..then

The
 **if..then** 
control statement is a script selection construct forcing the script
execution to follow different paths depending on one or several logical
conditions.



Since the
 **if..then** 
statement is a control statement and as such is ended with either a
semicolon or end-of-line, each of its four possible clauses
(, **elseif..then,
 **else** 
and
end if) must not cross a line
boundary.



 condition then

  [ statements ]

{
 condition then

  [ statements ] }

[ else

  [ statements ] ]

end if

Sub

The
sub..end sub control statement defines a subroutine which can be called
upon from a
 **call** 
statement.

name [ (
paramlist ] statements end sub

Switch

The
 **switch** 
control statement is a script selection construct forcing the script
execution to follow different paths, depending on the value of an
expression.

expression {case
valuelist [ statements ]}
[ statements] end switch

# Sub..end sub

The
sub..end sub control statement defines a subroutine which can be called
upon from a
 **call** 
statement.

 

name [ (
paramlist ] statements end sub

 

Arguments are copied into the subroutine and, if the corresponding
actual parameter in the
 **call** 
statement is a variable name, copied back out again upon exiting the
subroutine.

If a subroutine has more formal parameters than actual parameters passed
by a
 **call** 
statement, the extra parameters will be initialized to NULL and can be
used as local variables within the subroutine.

Since the
 **sub** 
statement is a control statement and as such is ended with either a
semicolon or end-of-line, each of its two clauses
( **sub** 
and
end sub) must not cross a line
boundary.

 

| Argument   | Description                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | The name of the subroutine.                                                                                                                    |
| paramlist  | A comma separated list of variable names for the formal parameters of the subroutine. These can be used as any variable inside the subroutine. |
| statements | Any group of one or more Qlik Sense script statements.                                                                                         |

 

Sub INCR (I,J)

I = I + 1

Exit Sub when I \< 10  J = J + 1  End Sub  Call INCR (X,Y)  \- parameter transfer  Sub ParTrans (A,B,C)  A=A+1  B=B+1  C=C+1  End Sub  A=1  X=1  C=1  Call ParTrans (A, (X+1)\*2)  The result of the above will be that locally, inside the subroutine, A will be initialized to 1, B will be initialized to 4 and C will be initialized to NULL.  When exiting the subroutine, the global variable A will get 2 as value (copied back from subroutine). The second actual parameter “(X+1)\*2” will not be copied back since it is not a variable. Finally, the global variable C will not be affected by the subroutine call.     *Call*  *Exit*  *End*  # Switch..case..default..end switch  The  **switch** 
control statement is a script selection construct forcing the script
execution to follow different paths, depending on the value of an
expression.

 

expression {case
valuelist [ statements ]}
[ statements] end switch



Since the
 **switch** 
statement is a control statement and as such is ended with either a
semicolon or end-of-line, each of its four possible clauses
(, **case,
 **default** 
and
end switch) must not cross a line
boundary.



 

| Argument   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| expression | An arbitrary expression.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| valuelist  | A comma separated list of values with which the value of expression will be compared. Execution of the script will continue with the statements in the first group encountered with a value in valuelist equal to the value in expression. Each value in valuelist may be an arbitrary expression. If no match is found in any  **case clause, the statements under the **default**  clause, if specified, will be executed. |
| statements | Any group of one or more Qlik Sense script statements.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

 

Switch I

Case 1

LOAD '$(I): CASE 1' as case autogenerate 1;

Case 2

LOAD '$(I): CASE 2' as case autogenerate 1;

Default

LOAD '$(I): DEFAULT' as case autogenerate 1;

End
Switch

 

*End*

# To

The
 **To** 
script keyword is used in several script statements.

*For..next*

*Connect*

*Rename field*

*Rename
table*