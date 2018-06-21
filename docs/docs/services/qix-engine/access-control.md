# Access Control

!!! warning "Experimental feature"
    This feature is in an experimental state. Use with caution since this feature may change in the future.

It is often necessary to be able to control what different users are allowed to do in the context of an application.
In Qlik Associative Engine
[Attribute-Based Access Control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control) is supported which
makes it possible to control the application resources based on user attributes rather than using roles or other more
static means.

## Rules

Each rule is a conditional expression that evaluates to either `true` or `false`. In addition to this, each rule
contains a mandatory part that determines which actions the rule grants, or denies.

!!! Note
    If the ABAC feature is enabled, all users will by default have no access, so it is important to also include
    rules when enabling it. Otherwise, access problems for users can easily be caused.

### Rules Overview

Upcoming sections more formally describe how rules are formed, but to get an initial understanding, consider the
following rule:

```c
user.id = "ada-lovelace" and resource._resourcetype = "App" and resource._actions = {"create", "update", "read"}
```

This rule states that if the user is `ada-lovelace` and the accessed resource type is `"App"`, grant the actions
`create`, `update`, and `read`. The `user.id` and `resource._resourcetype` expressions could be omitted and the rule
would still be valid.

The expression involving `_actions` must be present in order to determine which actions that are granted access. See
section [Actions](#actions) for more details.

### Rule Files

Rules are defined in text files with one rule on each row. Qlik Associative Engine applies rules in the order they
appear in the file. Two types of rule files are supported. The _Deny_ rule file and the _Allow_ rule file.

The Deny rule file denies access and is always evaluated first. If any rule in the Deny file evaluates to `true`,
access is immediately denied for the actions provided and no further evaluation of rules take place.

The Allow rule file allows access. If a rule in the Allow file evaluates to `true`, access is granted for the
actions specified and rule evaluation continues, possibly accumulating access to more actions based on succeeding
rules.

!!! Note
    The rule files are read by Qlik Associative Engine at each session start. Modifying the rule files requires a
    a new session start or REST call for updated rules to take effect.

## Engine Configuration for ABAC

### ABAC-related Command Line Switches

| Switch | Values | Default | Description |
| ------ | ------ | ------- | ----------- |
| `EnableABAC` | `0` or `1` | `0` | Enabling/disabling of ABAC rule evaluation. |
| `SystemDenyRulePath` | File path | N/A | File path to the _Deny_ rules file. |
| `SystemAllowRulePath` | File path | N/A | File path to the _Allow_ rules file. |

### Example

The following command shows how to start a Qlik Associative Engine instance as a Docker container, enabling ABAC, and
with the Allow and Deny rules in the `allow.txt` and `deny.txt` files.

```bash
docker run -v <host folder path>:<container folder path> qlikcore/engine:<version> \
    -S EnableABAC=1 \
    -S SystemAllowRulePath=/<container folder path>/allow.txt \
    -S SystemDenyRulePath=/<container folder path>/deny.txt
```

### More Code Examples

The [core-authorization](https://github.com/qlik-oss/core-authorization) repository contains running code examples on
how to enable ABAC and how to provide rules to Qlik Associative Engine.

## Rules Language

The following sections provide a more in-depth documentation of the rules language in Qlik Associative Engine - its
syntax and semantics.

Rules are built upon three concepts:

* **User** - The _subject_ that shall be granted or denied access.
* **Resource** - The _object_ to which actions are granted or denied.
* **Action** - The operation a user wants to perform on a resource.

All of these can be expressed and used in the rules language.

### Expressions

Rules, in which the entities above are used, are written as Boolean expressions, evaluating to `true` or `false`.
Expressions are written using _logical_ and _comparison_ operators.

The logical operators are:

| Operator | Meaning |
| -------- | ------- |
| [`!`](#not) | Logical negation (not) |
| [`and`, `&&`](#and) | Logical conjunction |
| [`or`, <code>&#124;&#124;</code>](#or) | Logical disjunction |

The comparison operators are:

| Operator | Meaning |
| -------- | ------- |
| [`=`](#equal) | Equality |
| [`==`](#strictly-equal) | Strict equality |
| [`!=`](#not-equal) | Inequality |
| [`!==`](#strictly-not-equal) | Strict inequality |
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

Here, `user.id` will be set to `john-doe` based on the `sub` attribute. `employeeType`, and `custom.country`
become attributes on `user`. The attributes could be used in a (fictitous) rule like this:

```c
user.id = "john-doe" and user.employeeType = "developer" and user.custom.country = "sweden" and resource._actions = "*"
```

With the example JWT above, this user is granted access for all actions to all resources.

### The `resource` Object

A _Resource_ is a generic concept that can represent applications, or objects within applications. A Resource carries
attributes which may be used in rule expressions. In rule expressions the resource being accessed is represented by the
`resource` object.

#### Common Attributes

There are different resource types but all share some common attributes:

| Attribute | Description |
| --------- | ----------- |
| `resource.description` | The resource description. Can be empty. | `resource.description = "My custom description"` |
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
| `resource._objecttype` | The object type. | `resource._objecttype = "field" or resource._objecttype = "my-generic-object"` |
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

```c
resource.HasPrivilege(ACTION)
```

The required parameter `ACTION` shall have a value of any of the supported actions described in [Actions](#Actions).

**Examples**

```c
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
| `reload`| Reload an application. |
| `delete` | Delete a resource. |
| `import` | Import an application. |
| `export` | Export an application. |
| `export data` | Export data from an object. |

!!! Note
    When granting access to the `reload` action, the `create` action also must also be granted to objects of type
    `"variable"` as in the rule expression
    `resource._resourcetype = "App.Object" && resource._objecttype = "variable" && resource._action = "create"`.
    This is needed since a reload requires that variable objects are created in the application.

#### The `_actions` Attribute

In rule expressions the `resource` attribute `_actions` has special semantics:

* `resource._actions` shall always be used as left operand with the `=` operator. Other usage is undefined behavior.
* The expression `resource._actions = (EXPRESSION)` always evaluates to `true`.
* The expression `resource._actions = (EXPRESSION)` has the "side effect" of accumulating the actions given by the
  right operand which shall be a single action or a list of actions to be granted.
* `resource._actions = "*"` can be used to grant all actions, where `"*"` is wildcard for "all actions".

Hence, omitting `resource._actions = (EXPRESSION)` from a rule would not accumulate any granted actions at all.

It is good practice to write all rules so that the final expression in the rule involves `resource._actions` to
define for which actions the access is granted if all other preceeding parts of the rule evaluate to `true`.

**Examples**

Given that `user.country` is `"uk"`, the following rule evaluates to `true` and actions granted to users from UK
are `read` and `update`:

```c
user.country = "uk" and resource._actions = {"read", "update"}
```

Note that granted actions accumulate in order of rules evaluated. Consider:

```c
user.country = "uk" and resource._actions = {"read", "update"}
user.roles = {"developer"} and resource._actions = {"create"}
```

First, users from from UK are granted `read` and `update` access. Then, if the user role is `developer`, `create`
access is granted. Since actions are accumulated, developers from UK are granted access for actions `read`, `update`,
and `create`.

!!! Note
    It may be dangerous to rely on accumulating actions. Often, it is better to be explicit about which actions to
    grant.

A better way to formulate the rules above would be:

```c
user.country = "uk" and resource._actions = {"read", "update"}
user.roles = {"developer"} and resource._actions = {"read", "update", "create"}
```

## Rule Expressions

Rule expressions are built on combining logical and comparison operators. Comparison operators have precedence over
logical operators. Parantheses are supported to override precedence.

### Logical Operators

#### `!` (not)

This operator returns the logical negation of its operand. It returns `true` if the operand is `false`, and returns
`false` if the operand is `true`.

**Syntax**

```c
!(EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

```c
# Evaluates to false
!(resource.country = "UK")

# Evaluates to true
!(resource.country = "SE")
```

#### `and`, `&&`

This operator returns the logical conjuction of its operands. It returns `true` only if both operands evaluate to
`true`.

**Syntax**

```c
(EXPRESSION) (and | &&) (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"` and `user.id` is `"john-doe"`:

```c
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

```c
(EXPRESSION) (|| | or) (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"` and `user.id` is `"john-doe"`:

```c
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

```c
(EXPRESSION) = (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

```c
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

```c
(EXPRESSION) == (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

```c
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

```c
(EXPRESSION) != (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"`:

```c
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

```c
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

```c
(EXPRESSION) like (EXPRESSION)
```

**Examples**

Given that `user.region` is `"us-east"` or `"us-west"`

```c
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

```c
(EXPRESSION) matches (EXPRESSION)
```

**Examples**

Suppose users shall be matched that are in any US region (`east`, `west` etc.) and only those users that are in the
number `1` or `2` deployments. A rule expressions for matching this could be:

```c
user.region matches "us-[^-]+-(1|2)"
```

This regular expression matches regions starting with `us-`, followed by one ore more characters that are anything but
`-`, followed by `-1` or `-2`.
