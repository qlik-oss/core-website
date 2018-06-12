0,# Access Control

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution since this feature may change in the future.

Being able to control which users can do what in the context of a document is often necessary. In Qlik Associative
Engine we support [Attribute-Based Access Control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control)
which lets you control the document resources based on users' attributes rather than using roles or other more static
means.

## Rules

Each rule is a conditional expression that evaluates to either `true` or `false`. In addition to this, each rule
contains a mandatory part that determines which actions the rule grants, or denies.

!!! Note
    If the ABAC feature is enabled, all users will by default have no access, so it is important that you also include
    rules when enabling it or you will cause access problems for your users.

### Rules Overview

Upcoming sections more formally describe how rules are formed, but to get an initial understanding, consider the
following rule:

```py
user.id = "ada-lovelace" and resource._resourcetype = "App" and resource._actions = {"create", "update", "read"}
```

This rule states that if the user is `ada-lovelace` and the accessed resource type is an `App`, grant the actions
`create`, `update`, and `read`.

The first two comparisons in the expression are optional. They could be omitted and the expression would still be a
valid rule. In this example they must evaluate to `true` in order for the actions to be granted.

The expression involving `_actions`

```py
resource._actions = {"create", "update", "read"}
```

must be present in order to determine which actions that are granted access. There is special semantics behind
expressions with `_actions`:

* They always evaluates to `true`
* They have the "side effect" of accumulating the granted actions for the user

Hence, omitting it would not accumulate any granted actions at all, and it would not matter how the other expressions in
the rule evaluate. No action would be granted.

It is a good practice to write all rules so that the final expression in the rule involves `resource._actions` to
define for which actions the access is granted if all other preceeding parts of the rule evaluate to `true`.

## Rule Files

Rules are defined in text files with one rule on each row. Qlik Associative Engine applies rules in the order they
appear in the file. Two types of rule files are supported. The _Deny_ rule file and the _Allow_ rule file.

The _Deny_ rule file denies access and is always evaluated first. If any rule in the _Deny_ file evaluates to `true`,
access is immediately denied for the actions proviced and no further evaluation of rules take place. 

The _Allow_ rule file allows access. If a rule in the _Allow_ file evaluates to `true`, access is granted for the
actions specified and rule evaluation continues, possibly accumulating access to more actions based on succeeding
rules.

## Engine Configuration for ABAC

### ABAC-related Command Line Switches

| Switch | Values | Description |
| ------ | ------ | ----------- |
| `EnableABAC` | `0` or `1` | Enabling/disabling of ABAC rule evalutation. |
| `Gen3` | `0` or `1` | Enablig/disabling of server mode. Must be set to `1` if enabling ABAC. |
| `SystemDenyRulePath` | File path | File path to the _Deny_ rules file. |
| `SystemAllowRulePath` | File path | File path to the _Allow_ rules file. |

### Example

The following command shows how to start a Qlik Associative Engine instance as a Docker container, enabling ABAC, and
with the _Allow_ and _Deny_ rules in the `allow.txt` and `deny.txt` files.

```bash
docker run -v <host folder path>:<container folder path> qlikcore/engine:<version> \
    -S EnableABAC=1 \
    -S Gen3=1 \
    -S SystemAllowRulePath=/<container folder path>/allow.txt \
    -S SystemDenyRulePath=/<container folder path>/deny.txt
```

## Qlik Associative Engine Rules Language

The following sections provide a more in-depth documentation of the rules language in Qlik Associative Engine - its
syntax and semantics.

Rules are built upon three central entities:

* **User** - The _subject_ that shall be granted or denied access.
* **Resource** - The _object_ in the engine to which actions are granted or denied.
* **Action** - The operation a user wants to perform resources in the engine.

All these entities can be expressed and used in the rules language.

### Expressions

Rules, in which the entities above are used, are written as Boolean expressions, evaluating to `true` or `false`.
Expressions are based _logical_ operators and _comparison_ operators.

The logical operators are:

| Operator | Meaning |
| -------- | ------- |
| [`!`](#!_not) | Logical negation (not) |
| [`and`, `&&`](#and) | Logical conjunction |
| [`or`, `||`](#or) | Logical disjunction |

The comparison operators are:

| Operator | Meaning |
| -------- | ------- |
| [`=`](#=_(equal)) | Equality |
| [`==`](#==_(strict_equal)) | Strict equality |
| [`!=`](#!=_(not_equal)) | Inequality |
| [`!==`](#!==_(strict_not_equal)) | Strict inequality |
| [`like`](#like) | todo |
| [`matches`](#matches) | todo |

### The `user` Object

All rules are evaluated in the context of a _User_. In rule expressions the user is represented by the `user` object.

#### Attributes

| Attribute | Description |
| --------- | ----------- |
| `user.id` | The identifier of the user. This gets the value of the mandatory `sub` attribute in the JWT. |

In addition to this `user` will contain all other attributes defined in the
[JWT header used to authenticate the user](../../tutorials/authorization.md#json-web-token).

**Examples**

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

Here, Also, `user.id` will be set to `john-doe` based on the `sub` attribute. `employeeType`, and `custom.country`
become attributes on `user`. The attributes could be used in a (fictitous) rule like this:

```py
user.id = "john-doe" and user.employeeType = "developer" and user.custom.country = "sweden" and resource._actions = "*"
```

With the example JWT above, this user is granted access for all actions to all resources.

### The `resource` Object

A _Resource_ is a generic concept can represent documents, or objects within documents. A Resource carries attributes
which may be used in rule expressions. In rule expressions the resource being accessed is represented by the `resource`
object.

#### Common Attributes

There are different resource types but all share some common attributes:

| Attribute | Description |
| --------- | ----------- |
| `resource.id` | The unique identifier for the resource. |
| `resource.owner` | The owner of the resource. |
| `resource._resourcetype` | The type of the resource being accessed. Equal to `"App"` or `"App.Object"`. |
| `resource._actions` | The actions to be granted on the resource. See [Actions](#actions) for more details.|

#### Type-specific Attributes

Depending on what type of resource that is being accessed, `resource` may carry additional attributes. If the resource
type is `"App"`, there are no additional attributes. If the resource type is `"App.Object"`, `resource` has the
following additional attributes:

Attribute | Description | Example condition
--------- | ----------- | -----------------
`resource.description` | The object description. | `resource.description = "My custom description"`
`resource._objecttype` | The object type. | `resource._objecttype = "field" or resource.objecttype_ = "my-generic-object"`
`resource.app.name` | Name of the document that the object is part of. | `resource.app.name = "Q3_Report"`

#### Built-in Functions

##### `HasPrivilege(<action>)`

Boolean function for resource conditions that returns `true` if the user making the request has the specified access
right for the targeted resource or resources. Otherwise returns `false`.

**TODO: Provide a better description of the mechanics of this function.**

**Syntax**

```py
resource.HasPrivilege(ACTION)
```

The required parameter `ACTION` shall have a value of any of the supported actions described in [Actions](#Actions).

**Examples**

_None at the moment._

### Actions

An _Action_ is what operation a user wants to perform on a resource in the Qlik Associative Engine. The actions are:

| Action | Description |
| -------| ----------- |
| `create` | Create a resource. |
| `read` | Read a resource. |
| `update` | Update a resource. |
| `reload`| Reload a document. |
| `delete` | Delete a resource. |
| `import` | Import a document. |
| `export` | Export a document. |
| `export data` | Export data from an object. |

####

In the a rule expression the attribute `resource._actions` is given a special meaning

**Examples**

The following expression evaluates to `true` if the action is `read` or `update`:

```py
resource._actions = {"read", "update"}
```

## Rule Expressions

**Syntax**

**TODO: Rewrite this section if we can use a better EBNF spec**

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

### Logical Operators

#### `!` (not)

This operator returns the logical negation of its operand. It returns `true` if the operand is `false`, and returns
`false` if the operand is `true`.

**Syntax**

```py
!(EXPRESSION)
```

**Examples**

Assuming `user.country` is `"uk"`:

```py
# Evaluates to false
!(resource.country = "UK")

# Evaluates to true
!(resource.country = "SE")
```

#### `and`, `&&`

This operator returns the logical conjuction of its operands. It returns `true` only if both operands evaluate to
`true`.

**Syntax**

```py
(EXPRESSION) (and | &&) (EXPRESSION)
```

**Examples**

Assuming `user.country` is `"uk"` and `user.id` is `"john-doe"`:

```py
# Evaluate to true
(user.country = "UK") && (user.id = "john-doe")
(user.country = "UK") and (user.id = "john-doe")

# Evaluate to false
(user.country = "SE") && (user.id = "john-doe")
(user.country = "UK") and (user.id = "bill-smith")
```

#### `or`, `||`

This operator returns the logical disjunction of its operands. It returns `true` only if one or both operands evaluate to
`true`.

**Syntax**

```py
(EXPRESSION) (|| | or) (EXPRESSION)
```

**Examples**

Assuming `user.country` is `"uk"` and `user.id` is `"john-doe"`:

```py
# Evaluate to true
(user.country = "UK") || (user.id = "john-doe")
(user.country = "UK") || (user.id = "bill-smith")
(user.country = "SE") or (user.id = "john-doe")

# Evaluate to false
(user.country = "SE") or (user.id = "bill-smith")
(user.country = "SE") || (user.id = "bill-smith")
```

### Comparison Operators

#### `=` (equal)

This operator returns `true` only if its operands are equal. String comparison is case insensitive (see `==`
for case sensitive comparison). If a comparing a value with a list, only one value needs to be equal.

**Syntax**

```py
(EXPRESSION) = (EXPRESSION)
```

**Examples**

Assuming that `user.country` is `"uk"`:

```py
# Evaluate to true
user.country = "UK"
user.country = "uk"
user.country = {"se", "us", "uk"}

# Evaluate to false
user.org = "United Kingdom"
user.org = {"se", "dk", "ca"}
```

#### `==` (strict equal)

This operator is case sensitive and returns `true` only if its operands are strictly equal. If comparing a value with a
list, only one value needs to be strictly equal.

**Syntax**

```c
(EXPRESSION) == (EXPRESSION)
```

**Examples**

Given that `user.country` is `"united states"`:

```py
# Evaluate to true
user.country == "united states"
user.country == {"sweden", "united states", "canada"}

# Evaluate to false
user.country == "United States"
user.country == {"Sweden", "United States", "Canada"}
```

#### `!=` (not equal)

This operator is case insensitive and returns `true` only if its operands are not equal. If comparing a value with a
list, only one value needs not to match.

**Syntax**

```py
(EXPRESSION) != (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

```py
# Evaluate to true
resource.org != "SE"
resource.org != {"SE", "UK", "uk"}

# Evaluate to false
resource.org != "UK"
resource.org != {"uk", "UK"}
```

#### `!==` (strict not equal)

This operator is case sensitive and returns `true` if the compared expressions are exactly not equal. The full list
does not have to match when a value used in an expression exists in a list.

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

#### `like`

The security rules support the regular expression operator "like". This operator is case insensitive.

**Syntax**

```py
(EXPRESSION) like (EXPRESSION)
```

**Examples**

Evaluates all resources with names beginning with "mya" to `true`, regardless of case:

```py
resource.name like "mya*"
```

#### `matches`

This operator is case insensitive and returns results that match your expression, regardless of case. Regular expression
start and end anchors are implicitly added.

**Syntax**

```c
(EXPRESSION) matches (EXPRESSION)
```

**Examples**

```c
// Evaluates all resources with names containing "yap" to `true`,
// regardless of case:
resource.name matches ".*yAp.*"

```
