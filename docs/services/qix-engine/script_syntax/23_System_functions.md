
## SystemFunctions

# EngineVersion - script and chart function

This function returns the full Qlik Sense engine version as a
string.

 

EngineVersion()

# GetExtendedProperty - chart function

This function returns the value of a named extended property in the
sheet object with the given object ID. If
 **objectid** 
is not given, the sheet object containing the expression will be used.
An extended property is defined for the extension object in its
definition file.

 

GetExtendedProperty (name[, objectid])

 

GetExtendedProperty
('Greeting')

# GetNotSelectedCount - chart function

This chart function returns the number of not-selected values in the
field named
 **fieldname** .
The field must be in and-mode for this function to be relevant.

 

GetNotSelectedCount(fieldname [,
includeexcluded=false])

 

| Argument        | Description                                                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fieldname       | The name of the field to be evaluated.                                                                                                                                                                                              |
| includeexcluded | If  **includeexcluded**  is stated as True, the count will include selected values which are excluded by selections in another field. |

 

GetNotSelectedCount( Country )

GetNotSelectedCount( Country, true
)

# GetObjectField - chart function

This function returns the name of the dimension.
 **Index** 
is an optional integer denoting which of the used dimensions that should
be returned.



It is not possible to use this function in the title label of a chart.



 

GetObjectField
([index])

 

GetObjectField(2)

# IsPartialReload - script function

This function returns - 1 (True) if the current reload is partial,
otherwise 0
(False).

 

IsPartialReload()

# ProductVersion - script and chart function

This function returns the full Qlik Sense version and build number as a
string. This function is deprecated and replaced by
EngineVersion().

*EngineVersion - script and chart
function*

 

ProductVersion()

# StateName - chart function

StateName()
returns the name of the alternate state of the visualization in which it
is used. StateName can be used, for example, to create visualizations
with dynamic text and colors to reflect when the state of a
visualization is changed. This function can be used in chart
expressions, but cannot be used to determine the state that the
expression refers to.

 

StateName ()



Alternate states can only be defined and assigned using the Qlik Engine
API.



 

Dynamic Text

\='Region - ' & if(StateName() = '$', 'Default', StateName())

 

Dynamic Colors

if(StateName() = 'Group 1', rgb(152, 171, 206),

> if(StateName() = 'Group 2', rgb(187, 200, 179),

> > rgb(210, 210,
210)

> )

)

# System functions

System functions provide functions for accessing system, device and Qlik
Sense app properties.

## System functions overview

Some of the functions are described further after the overview. For
those functions, you can click the function name in the syntax to
immediately access the details for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. For some of the functions, you can get further
details about that specific function by clicking the function name in
the syntax description.



This function returns a string containing the author property of the
current app. It can be used in both the data load script and in a chart
expression.



Author property can not be set in the current version of Qlik Sense. If
you migrate a QlikView document, the author property will be
retained.





This function returns the user agent string of the client browser. It
can be used in both the data load script and in a chart expression.

 

Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/35.0.1916.114 Safari/537.36

ComputerName


This function returns a string containing the name of the computer as
returned by the operating system. It can be used in both the data load
script and in a chart
expression.

ComputerName( )

DocumentName

This function returns a string containing the name of the current Qlik
Sense app, without path but with extension. It can be used in both the
data load script and in a chart
expression.

DocumentName(
)

DocumentPath

This function returns a string containing the full path to the current
Qlik Sense app. It can be used in both the data load script and in a
chart expression.

DocumentPath( )



This function is not supported in standard mode. See *File system access
restriction*



DocumentTitle

This function returns a string containing the title of the current Qlik
Sense app. It can be used in both the data load script and in a chart
expression.

DocumentTitle( )

EngineVersion

This function returns the full Qlik Sense engine version as a
string.

**EngineVersion2638094892**()



This script function returns the culture name of the collation locale
that is used. If the variable CollationLocale has not been set, the
actual user machine locale is
returned.

GetCollationLocale( )

GetExtendedProperty

This function returns the value of a named extended property in the
sheet object with the given object ID. If
 **objectid** 
is not given, the sheet object containing the expression will be used.
An extended property is defined for the extension object in its
definition file.

**GetExtendedProperty3101079595**(name[, objectid])

GetObjectField

This function returns the name of the dimension.
 **Index** 
is an optional integer denoting which of the used dimensions that should
be
returned.

**GetObjectField2062322537**([index])



This function returns the value of a key in the Windows registry. It can
be used in both the data load script and in a chart
expression.

GetRegistryString(path, key)



This function is not supported in standard mode. See *File system access
restriction*



IsPartialReload

This function returns - 1 (True) if the current reload is partial,
otherwise 0 (False).

**IsPartialReload755098372**()

OSUser

This function returns a string containing the name of the user that is
currently connected. It can be used in both the data load script and in
a chart
expression.

OSUser( )



In Qlik Sense Desktop, this function always returns 'Personal\\Me'.



ProductVersion

This function returns the full Qlik Sense version and build number as a
string.

This function is deprecated and replaced by
EngineVersion().

**ProductVersion3175723484**()

ReloadTime


This function returns a timestamp for when the last data load finished.
It can be used in both the data load script and in a chart
expression.

ReloadTime( )



StateName()
returns the name of the alternate state of the visualization in which it
is used. StateName can be used, for example, to create visualizations
with dynamic text and colors to reflect when the state of a
visualization is changed. This function can be used in chart
expressions, but cannot be used to determine the state that the
expression refers
to.

**StateName2454803168**()

 

*GetFolderPath - script
function*