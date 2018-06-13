# Access Control

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

The expression involving `_actions` must be present in order to determine which actions that are granted access. See
section [Actions](#actions) for more details.

## Rule Files

Rules are defined in text files with one rule on each row. Qlik Associative Engine applies rules in the order they
appear in the file. Two types of rule files are supported. The _Deny_ rule file and the _Allow_ rule file.

The Deny rule file denies access and is always evaluated first. If any rule in the Deny file evaluates to `true`,
access is immediately denied for the actions proviced and no further evaluation of rules take place. 

The Allow rule file allows access. If a rule in the Allow file evaluates to `true`, access is granted for the
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
with the Allow and Deny rules in the `allow.txt` and `deny.txt` files.

```bash
docker run -v <host folder path>:<container folder path> qlikcore/engine:<version> \
    -S EnableABAC=1 \
    -S Gen3=1 \
    -S SystemAllowRulePath=/<container folder path>/allow.txt \
    -S SystemDenyRulePath=/<container folder path>/deny.txt
```

### More Code Examples

The [core-authorization](https://github.com/qlik-oss/core-authorization) repository contains running code examples on
how to enable ABAC and how to provide rules to Qlik Associative Engine.

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
| [`like`](#like) | Wildcard string matching |
| [`matches`](#matches) | Regular expression string matching |

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

| Attribute | Description | Example condition |
| --------- | ----------- | ----------------- |
| `resource.description` | The object description. | `resource.description = "My custom description"` |
| `resource._objecttype` | The object type. | `resource._objecttype = "field" or resource.objecttype_ = "my-generic-object"` |
| `resource.app` | Reference to the app resource that the object is part of. | `resource.app.owner = "john-doe"` |

##### The `app` Attribute

As stated above, if `resource._resourcetype = "App.Object"`, `resource.app` contains the reference to the `"App"`
resource that the object exists in, and all attributes and [built-in functions](#built-in_function) that apply
to `"App"` objects are available on `resource.app`.

#### Built-in Functions

##### `HasPrivilege(<action>)`

Boolean function that returns `true` if the user making the request has already been granted access for the provided
action. Otherwise returns `false`.

**Syntax**

```py
resource.HasPrivilege(ACTION)
```

The required parameter `ACTION` shall have a value of any of the supported actions described in [Actions](#Actions).

**Examples**

```py
user.country = "uk" and resource._resourcetype = "App.Object" and resource._actions = "create"
resource._resourcetype = "App.Object" and resource.HasPrivilege("create") and resource._actions = {"read", "update"}
```

Here, the second rule uses `HasPrivilege` to check if the `create` action has already been granted to the user, which
could be result from the preceeding rule. If that is the case, it also grants access to the `read` and `update` actions.

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

#### The `_actions` Attribute

In rule expressions the `resource` attribute `_actions` has special semantics:

* `resource._actions` shall always be used as left operand with the `=` operator. Other usage is undefined behavior.
* The expression `resource._actions = (EXPRESSION)` always evaluates to `true`.
* The expression `resource._actions = (EXPRESSION)` has the "side effect" of accumulating the actions given by the
  right operand which shall be a single action or a list of actions to be granted.

Hence, omitting `resource._actions = (EXPRESSION)` from a rule would not accumulate any granted actions at all.

It is a good practice to write all rules so that the final expression in the rule involves `resource._actions` to
define for which actions the access is granted if all other preceeding parts of the rule evaluate to `true`.

**Examples**

Given that `user.country` is `"uk"`, the following rule evaluates to `true` and actions granted to users from UK
are `read` and `update`:

```pas
user.country = "uk" and resource._actions = {"read", "update"}
```

Note that granted actions accumulate in order of rules evaluated. Thus

```pas
user.country = "uk" and resource._actions = {"read", "update"}
user.roles = {"developer"} and resource._actions = {"create"}
```

first grants users from UK `read` and `update` access. If the user role is `developer`, `create` access is granted.
Since actions are accumulated, developers from UK are granted access for actions `read`, `update`, and `create`.

!!! Note
    This is what we might want, but care must be taken here. If the role is `developer` but the user is _not_ from UK,
    only `create` access will be granted, which may not be what we want. Possibly, a developer from any country should
    also have `read` and `update` access. It may be dangerous to rely on accumulating actions so the rules we would
    want in this case, should be explicit on all actions to be granted.

The rules to handle this would be:

```py
user.country = "uk" and resource._actions = {"read", "update"}
user.roles = {"developer"} and resource._actions = {"read", "update", "create"}
```

## Rule Expressions

### Syntax

**TODO: Write this section based on proper EBNF spec**

### Logical Operators

#### `!` (not)

This operator returns the logical negation of its operand. It returns `true` if the operand is `false`, and returns
`false` if the operand is `true`.

**Syntax**

```py
!(EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

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

Given that `user.country` is `"uk"` and `user.id` is `"john-doe"`:

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

Given that `user.country` is `"uk"` and `user.id` is `"john-doe"`:

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

This operator returns `true` only if its operands are equal. String comparison is _case insensitive_ (see `==` for case
sensitive comparison). If one of the operands is a list, only one value in the list needs to be equal.

**Syntax**

```py
(EXPRESSION) = (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

```py
# Evaluate to true
user.country = "UK"
user.country = "uk"
user.country = {"se", "us", "uk"}

# Evaluate to false
user.org = "United Kingdom"
user.org = {"se", "dk", "ca"}
```

#### `==` (strictly equal)

This operator returns `true` only if its operands are _strictly_ equal. String comparison is _case sensitive_ (see `=`
for case insensitive comparison). If one of the operands is a list, only one value in the list needs to be strictly
equal.

**Syntax**

```py
(EXPRESSION) == (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

```py
# Evaluate to true
user.country == "uk"
user.country == {"se", "uk", "ca"}

# Evaluate to false
user.country == "UK"
user.country == {"SE", "UK", "CA"}
```

#### `!=` (not equal)

This operator returns `true` only if its operands are not equal. String comparison is _case insensitive_ (see `!==` for
case sensitive comparison). If one of the operands is a list, only one value in the list needs to be unequal.

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

#### `!==` (strictly not equal)

This operator returns `true` only if its operands are _strictly_ not equal. String comparison is _case sensitive_ (see
`!=` for case insensitive comparison). If one of the operands is a list, only one value in the list needs to be strictly
unequal.

**Syntax**

```c
(EXPRESSION) !== (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

```py
# Evaluate to true
user.country !== "UK"
user.country !== {"uk", "UK", "se"}

# Evaluate to false
resource.org !== "uk"
resource.org !== {"uk"}
```

#### `like`

This operator provides wildcard string matching.

The operator returns `true` only if the left operand matches the wildcard pattern given by the right operand.
The comparison is _case insensitive_.

| Wildcard | Description |
| -------- | ----------- |
| `?`      | Matches any single character. |
| `*`      | Matches zero or more characters. |

The escape character `\` can be used to match `?`, `*`, and `\` using the escaped sequences - `\?`, `\*`, and `\\`.

**Syntax**

```py
(EXPRESSION) like (EXPRESSION)
```

**Examples**

Given that `user.region` is `"us-east"` or `"us-west"`

```py
# Evaluate to true
user.region like "us-*"
user.region like "US-*"
user.region like "??-*"

# Evaluate to false
user.region like "us-?"
user.region like "uk-*"
```

#### `matches`

This operator provides regular expression string matching.

The operator returns `true` only if the left operand matches the regular expression given by the right operand.

**Syntax**

```py
(EXPRESSION) matches (EXPRESSION)
```

**Examples**

Suppose we want to match users that are in any of the US regions, and we want to match users that are in any of the
number `1` or number `2` instances. A rule expressions for matching this could be:

```py
user.region matches "us-[^-]+-(1|2)"
```

This regular expression matches regions starting with `us-`, followed by one ore more characters that are anything but
`-`, followed by `-1` or `-2`.
