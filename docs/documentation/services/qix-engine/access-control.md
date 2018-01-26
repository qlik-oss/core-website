# Access Control

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution
    since this feature may change in the future.

Being able to control which users can do what in the context
of a document is often necessary. In QIX Engine we support
[Attribute-Based Access Control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control)
which lets you control the document resources based on a users'
attributes rather than using roles or other, more static, means.

## Configuration

Rules are defined, one on each row, in text files. QIX Engine will
apply rules in order (except for deny rules which are always applied first,
regardless of where they are defined).

If the ABAC feature is enabled, all users will by default have no
access, so it is important that you also include rules when enabling it
or you will cause access problems for your users.

```bash
docker run
    -v ./local-rules:/container-rules
    qlikea/engine:<version> \
    -S EnableABAC=1 \
    -S SystemAllowRulePath=/container-rules/allow.txt \
    -S SystemDenyRulePath=/container-rules/deny.txt
```

## Allow versus Deny

In addition to using _Allow_ rules to grant access, the QIX Engine
also supports _Deny_ rules to deny access.

!!! Note
    _Deny_ rules are always applied first, if none matched
    it will continue with _Allow_ rules.

## Actions

Action       | Description
------------ | -----------
Create       | Create resource.
Read         | Read resource.
Update       | Update resource.
Delete       | Delete resource.
Export       | Export a document.
Publish      | Publish a resource.
Change owner | Change the owner of a resource.
Change role  | Change user role.
Export data  | Export data from an object.

## Resources

There are a number of resources which you may use in your rule conditions.
All supported resources are listed below.

### Shared attributes

Attribute         | Description
----------------- | -----------
resource.id       | The unique identifier for the resource.
resource.name     | The name of the resource, if any.

### User

The user resource contains all attributes defined in the [JWT header used to authenticate the user](../../../tutorials/authorization.md#json-web-token).

Example JWT:

```json
{
  "sub": "john-doe",
  "name": "John Doe",
  "employeeType": "developer",
  "tags": ["research"],
  "custom": {
    "country": "sweden"
  }
}
```

Example usage in condition:

```c
// Evaluates to `true` if the JWT looks like the example above:
user.employeeType = "developer" and user.custom.country = "sweden"
```

### App

The document (called App in the rules syntax) context.

It has no additional attributes.

### App.Object

An object inside a document context.

Attribute | Description | Example condition
--------- | ----------- | -----------------
approved | Indicator of whether the object was part of the original document when the document was published. Values: `true` or `false`. | `resource.approved="true"`
description | The object description. | `resource.description="My custom description"`
objectType | The object type. | `resource.objectType="field" or resource.objectType="my-generic-object"`
published | Indicator of whether the object is published. Values: `true` or `false`. | `resource.published="false"`
app.name | Name of the document that the object is part of. | `app.name="Q3_Report"`

## Conditions

**Syntax**

```c
[resource.resourcetype = "resourcetypevalue"] [OPERATOR] [(((<resource.property = propertyvalue) [OPERATOR (resource.property = propertyvalue)))]
```

Argument          | Description
----------------- | -----------
resource          | Implies that the conditions will be applied to a resource.
resourcetype      | Implies that the conditions will be applied to a resource of the type defined by the `resourcetypevalue`. You can also use predefined functions for conditions to return property values.
resourcetypevalue | You must provide at least one resource type value.
property          | The property name for the resource condition. See Properties for available names.
propertyvalue     | The value of the selected property name.
user              | Implies that the conditions will be applied to a user.

The order that you define conditions does not matter. This means that you can define the
resources first and then the user and/or resource conditions or the other way round.
However, it is recommended that you are consistent in the order in which you define
resources and conditions as this simplifies troubleshooting. When using multiple conditions,
you can group two conditions by wrapping them in parentheses.

**Example**

```c
// If the resource is of any type,
// and the user is a developer,
// then allow all actions:
resource.resourcetype = "*" and user.employeeType = "developer" and resource.actions = "*"
```

## Operators

### AND

This operator compares two expressions and returns `true` only if both evaluate
to `true`.

**Syntax**

```c
(EXPRESSION) && (EXPRESSION)

// Same as previous, but using "and" notation instead of "&&":
(EXPRESSION) and (EXPRESSION)
```

**Examples**

```c
(resource.org = "UK") && (user.name = "John Doe")

// Same as previous, but using "and" notation instead of "&&":
(resource.org = "UK") and (user.name = "John Doe")
```

### EQUAL

This operator is case insensitive and returns `true` if the
compared expressions are equal. If a list is used, only one
value needs to match.

**Syntax**

```c
(EXPRESSION) = (EXPRESSION)
```

**Examples**

Given that `org` is `"uk"` in the access request.

```c
// Evaluates to `true` because the operator is case insensitive:
resource.org = "UK"

// Evaluates to `true`:
resource.org = "uk"

// Evaluates to `false` because the values are different:
resource.org = "United Kingdom"
```

### LIKE

The security rules support the regular expression operator "like".
This operator is case insensitive.

**Syntax**

```c
(EXPRESSION) like (EXPRESSION)
```

**Examples**

```c
// Evaluates all resources with names beginning with
// "mya" to `true`, regardless of case:
resource.name like "mya*"
```

### NOT

This operator inverts the Boolean value of an expression and
returns `true` if the expression is `false` and returns `false`
if the expression is `true`.

**Syntax**

```c
!(EXPRESSION)
```

**Examples**

Given that `org` is `"UK"` in the access request.

```c
// Evaluates to `false` since the values are equal:
!(resource.org = "UK")

// Evalutes to `true`:
!(resource.org = "SE")
```

### MATCHES

This operator is case insensitive and returns results that match your
expression, regardless of case. Regular expression start and end anchors
are implicitly added.

**Syntax**

```c
(EXPRESSION) matches (EXPRESSION)
```

**Examples**

```c
// Evaluates all resources with names containing "yap" to `true`,
// regardless of case:
resource.name matches ".*yAp.*"

// Evaluates to `true` if the access request resource filter starts with
// "myresource_" and ends with "<four digits>":
resource.resourcefilter matches "myresource_\\d{4}"
```

### NOT EQUAL

This operator is case insensitive and returns `true` if the compared expressions
are not equal. If a list is used, only one value needs not to match.

**Syntax**

```c
(EXPRESSION) != (EXPRESSION)
```

**Examples**

Given that `org` is `"uk"` in the access request.

```c
// Evaluates to `false` because the operator is case insensitive:
resource.org != "UK"

// Evalues to `true`:
resource.org != "SE"
```

### OR

This operator compares two expressions and returns `true` if one
or both evaluate to `true`.

**Syntax**

```c
(EXPRESSION) || (EXPRESSION)

// Same as previous, but using "or" notation instead of "||":
(EXPRESSION) or (EXPRESSION)
```

**Examples**

```c
// Evaluates to `true` only if any of the
// expressions are `true`:
(resource.org = "UK") || (resource.org = "US")

// Same as previous, but using "or" notation instead of "||":
(resource.org = "UK") or (resource.org = "US")
```

### STRICT EQUAL

This operator is case sensitive and returns `true` if the compared
expressions are exactly equal. The full list does not have to match
when a value used in an expression exists in a list.

**Syntax**

```c
(EXPRESSION) == (EXPRESSION)
```

**Examples**

Given that `org` is `"united states"` in the access request.

```c
// Evaluates to `false` because the operator is case sensitive:
resource.org == "United States"

// Evaluates to `true`:
resource.org == "united states"
```

### STRICT NOT EQUAL

This operator is case sensitive and returns `true` if the compared
expressions are exactly not equal. The full list does not have to
match when a value used in an expression exists in a list.

**Syntax**

```c
(EXPRESSION) !== (EXPRESSION)
```

**Examples**

Given that `org` is `"united states"` in the access request.

```c
// Evaluates to `true` because the operator is case sensitive:
resource.org !== "United States"

// Evaluates to `false`:
resource.org !== "united states"
```

## Functions

### `HasPrivilege(<action>)`

Boolean function for resource conditions that returns `true` if
the user making the request has the specified access right for
the targeted resource or resources. Otherwise returns `false`.

**Syntax**

```c
resource.HasPrivilege("action")
```

The required parameter `action` needs to be one of the actions listed under [Actions](#actions).

**Examples**

_None at the moment._

### `IsAnonymous()`

Boolean function for user conditions that returns `true` only if
the user requesting access is logged in as anonymous.

**Syntax**

```c
user.IsAnonymous()
```

**Examples**

```c
// Evaluates to `true` if the user is part of the "Developers"
// organization, and is not anonymous:
user.org == "Developers" and !user.IsAnonymous()
```

### `Empty()`

Boolean function for resource conditions that returns `true` only if the
specified resource has no connections (that is, has no value).

**Syntax**

```c
resource.resourcetype.Empty()
```

**Examples**

_None at the moment._

### `IsOwned()`

Boolean function for resource conditions that returns `true` only if the
specified resource has an owner.

**Syntax**

```c
resource.IsOwned()
```

**Examples**

```c
// Evaluates to `true` if the resource is owned by the user
// being evaluated:
resource.IsOwned() and resource.owner = user
```
