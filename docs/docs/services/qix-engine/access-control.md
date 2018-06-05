# Access Control

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution
    since this feature may change in the future.

Being able to control which users can do what in the context of a document is often necessary. In Qlik Associative
Engine we support [Attribute-Based Access Control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control)
which lets you control the document resources based on a user's attributes rather than using roles or other more static
means.

## Configuration

### Rules

Each rule is a conditional expression that evaluates to either `true` or `false`. Typically, a rule asserts if a _User_
with certain attributes is allowed to perform a specific _Action_ on a certain _Resource_.

ABAC rule evaluation is enabled in the engine by using the `-S EnableABAC=1` command line switch.

!!! Note
    If the ABAC feature is enabled, all users will by default have no access, so it is important that you also include
    rules when enabling it or you will cause access problems for your users.

### Rule Files

Rules are defined in text files with one rule on each row. Qlik Associative Engine applies rules in the order they
appear in the file. Two types of rule files are supported. The _Deny_ rule file and the _Allow_ rule file.

The _Deny_ rule file denies access and is always evaluated first. If any rule in the _Deny_ file evaluates to `true`,
access is immediately denied and no further processing of rules take place. The path to the _Deny_ rule file is passed
to the engine using the `-S SystemDenyRulePath=<path to file>` command line switch.

The _Allow_ rule file allows access. If any rule in the _Allow_ file evaluates to `true`, access is immediately granted
and no further processing of rules take place. The path to the _Allow_ rule file is passed to the engine using the
`-S SystemAllowRulePath=<path to file>` command line switch.

### Example

The following command shows how to start a Qlik Associative Engine instance as a Docker container, enabling ABAC

```bash
docker run
    -v <host folder>:<container folder>
    qlikcore/engine:<version> \
    -S Gen3=1 \
    -S PersistenceMode=3 \
    -S EnableABAC=1 \
    -S SystemAllowRulePath=/<container folder>/allow.txt \
    -S SystemDenyRulePath=/<container folder>/deny.txt
```

## User

All rules are evaluated in the context of a _User_. In the rules syntax, the user is represented by the `user`
object.

### User Attributes

`user` contains all attributes defined in the
[JWT header used to authenticate the user](../../tutorials/authorization.md#json-web-token).

##### Examples

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

Here, `employeeType`, and `custom.country` become attributes on `user` and can be used in a rule condition like this:

```c
user.employeeType = "developer" and user.custom.country = "sweden"
```

With the example JWT above, this rule evaluates to `true`.

### User Built-in Functions

#### `IsAnonymous()`

Boolean function for user conditions that returns `true` only if the user requesting access is logged in as anonymous.

##### Syntax

```c
user.IsAnonymous()
```

##### Examples

```c
// Evaluates to `true` if the user is part of the "Developers"
// organization, and is not anonymous:
user.org == "Developers" and !user.IsAnonymous()
```

## Resources

A _Resource_ is a generic concept can represent documents, or objects within documents when writing rules. Resources
carries attributes which may also be used in your rule conditions. In the rules syntax the resource being accessed is
represented by the `resource` object.

### Resource Attributes

#### Common Attributes

There are different resource types but all share some common attributes:

Attribute              | Description
---------------------- | -----------
resource.id            | The unique identifier for the resource.
resource.name          | The name of the resource, if any.
resource._resourcetype | The type of the resource being accessed. Equals:<br/>- `"App"` if accessing a document<br/>- `"App.Object"` if accessing an object within a document |
resource._actions      | The action carried out on a resource. |

**QUESTION: I have added `_resourcetype` and `_actions` the common attributes since `user` is not a resource. Is this correct?**

**QUESTION: Is it `resourcetype` or `_resourcetype`?**

**QUESTION: Is it `actions` or `_actions`?**

#### Actions

The supported actions are:

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

**QUESTION: Are not the actions referred to as `create`, `read`, ..., and `export` (not "Create", "Export data" and so on)?**

##### Examples

The following expression evaluates to `true` if the action is `read` or `update`:

```c
resource._actions = {"read", "update"}
```

#### Resource-type Specific Attributes

Depending on what type of resource that is being accessed, `resource` carries different attributes

If the resource type is `"App"`, `resource` has no additional attributes.

If the resource type is `"App.Object"`, `resource` has the following additional attributes:

Attribute | Description | Example condition
--------- | ----------- | -----------------
`resource.approved` | Indicator of whether the object was part of the original document when the document was published. Values: `true` or `false`. | `resource.approved="true"`
`resource.description` | The object description. | `resource.description="My custom description"`
`resource.objectType` | The object type. | `resource.objectType="field" or resource.objectType="my-generic-object"`
`resource.published` | Indicator of whether the object is published. Values: `true` or `false`. | `resource.published="false"`
`resource.app.name` | Name of the document that the object is part of. | `resource.app.name="Q3_Report"`

### Resource Built-in Functions

#### `HasPrivilege(<action>)`

Boolean function for resource conditions that returns `true` if the user making the request has the specified access
right for the targeted resource or resources. Otherwise returns `false`.

##### Syntax

```c
resource.HasPrivilege(ACTION)
```

The required parameter `ACTION` shall have a value of any of the supported actions described in [Actions](#Actions).

##### Examples

_None at the moment._

#### `Empty()`

Boolean function for resource conditions that returns `true` only if the specified resource has no connections
(that is, has no value).

##### Syntax

```c
resource.resourcetype.Empty()
```

##### Examples

_None at the moment._

#### `IsOwned()`

Boolean function for resource conditions that returns `true` only if the specified resource has an owner.

##### Syntax

```c
resource.IsOwned()
```

##### Examples

```c
// Evaluates to `true` if the resource is owned by the user
// being evaluated:
resource.IsOwned() and resource.owner = user
```

**QUESTION: Is `owner` a common attribute of all resources?**

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
// If the resource is of any type, and the user is a developer, then allow all actions:
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
