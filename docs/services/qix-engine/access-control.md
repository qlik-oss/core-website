# Access Control

Administrators often want to control access to their applications
based on different policies and attributes rather than static user roles.
To handle this, Qlik Associative Engine supports
[Attribute-Based Access Control (ABAC)](https://en.wikipedia.org/wiki/Attribute-based_access_control),
which lets you control application access through attribute-based rules.

## Rules

When ABAC is enabled, users are granted access based on rules.
Each rule is a conditional expression that evaluates to either `true` or `false`,
and each rule contains a property that determines which actions the rule grants, or denies.

!!! Note
    When the ABAC feature is enabled, all user access is disabled by default.
    You must include rules when enabling ABAC to provide user access.

### Rules overview

Rules are constructed using attributes that defines user access. Consider the following rule:

```c
user.sub = "ada-lovelace" and resource._resourcetype = "App" and resource._actions = {"create", "update", "read"}
```

Notice that the rule consists of key-value pairs linked by logical operators,
in this case, `and`.

This rule states that if the user is `ada-lovelace`
and the accessed resource type is `App`, grant the actions
`create`, `update`, and `read`.

!!! Note
    Only the `_actions` attribute is mandatory.
    The `user.sub` and `resource._resourcetype` expressions
    could be omitted and the rule would still be valid.
    See [Actions](#actions) for more details.

### Rule files

Rules are defined in two text files: a _Deny_ rules file and an _Allow_ rules file.
The _Deny_ rules file is evaluated first, and rules are evaluated in the order that they appear.
A rule is written on a single row.

The _Deny_ rules file denies access to perform actions (create, read, update, etc.).
If any rule in the _Deny_ rules file evaluates to `true`,
access is immediately denied for the actions listed and rules evaluation stops.

The _Allow_ rule file grants access to perform actions (create, read, update, etc.).
If a rule in the _Allow_ rule file evaluates to `true`, access is granted for the actions listed.
Rule evaluation continues for the entire file, possibly accumulating access to more actions based on other rules.

!!! Note
    When you start a session, Qlik Associative Engine reads the rules files immediately.
    If you modify the rules files,
    you need to restart the session or make a REST call to trigger the engine to reread the rules files.

## Engine configuration for ABAC

Before you start the Qlik Associative Engine, you must enable ABAC and set the rules files paths with command-line switches.

### ABAC-related command-line switches

| Switch | Values | Default | Description |
| ------ | ------ | ------- | ----------- |
| `EnableABAC` | `0` or `1` | `0` | Enabling/disabling of ABAC rule evaluation. |
| `SystemDenyRulePath` | File path | N/A | File path to the _Deny_ rules file. |
| `SystemAllowRulePath` | File path | N/A | File path to the _Allow_ rules file. |

### ABAC examples

To start Qlik Associative Engine instance as a Docker container,
enable ABAC, and set the _Allow_ and _Deny_ rules file paths, run the following command:

```bash
docker run -v <host folder path>:<container folder path> qlikcore/engine:<version> \
    -S EnableABAC=1 \
    -S SystemAllowRulePath=/<container folder path>/allow.txt \
    -S SystemDenyRulePath=/<container folder path>/deny.txt
```

For more examples using ABAC, see the
[core-authorization](https://github.com/qlik-oss/core-authorization) repository,
which contains running code examples on how to enable ABAC and how to provide rules to Qlik Associative Engine.

## Rules language

Before you write any ABAC rules,
it is important to understand the syntax
and semantics of the rules language,
and how they interact with each other.

### Rules language concepts

Rules are built upon three concepts:

* **User** - The _subject_ that is granted or denied access.
* **Resource** - The _object_ to which actions are granted or denied.
* **Action** - The operation performed on a resource.

These concepts are used to build the expressions in the rules language.

### Rules language expressions

Rules are made of expressions, and these expressions
are written with logical and comparison operators.
Consequently, a rule evaluates to either `true` or `false`
depending on the expressions and the types of operators
contained within the rule.

The logical operators are:

| Operator | Meaning |
| -------- | ------- |
| [`!`](#not) | Logical negation (not) |
| [`and`, `&&`](#and) | Logical conjunction (and) |
| [`or`, <code>&#124;&#124;</code>](#or) | Logical disjunction (or) |

The comparison operators are:

| Operator | Meaning |
| -------- | ------- |
| [`=`](#equal) | Equality |
| [`==`](#strictly-equal) | Strict equality |
| [`!=`](#not-equal) | Inequality |
| [`!==`](#strictly-not-equal) | Strict inequality |
| [`like`](#like) | Wildcard string matching |
| [`matches`](#matches) | Regular expression string matching |

### The `user` object

All rules are evaluated in the context of a user.
In rule expressions, the user is represented by the `user` object.

#### User attribute

| Attribute | Description |
| --------- | ----------- |
| `user.sub` | The identifier of the user. This `user.sub` gets the value of the mandatory `sub` attribute in the JWT. |

Also, `user` contains all attributes defined in the JWT header that are used to authenticate the user.

For more information about attributes in the JWT header, see [JSON web token](../../tutorials/authorization.md#json-web-token).

**Example**

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

The `user.sub` is `john-doe`, based on the `sub` attribute.
All of the attributes are attributes of `user`.
An example of a rule using some of the user attributes looks like the following:

```c
user.sub = "john-doe" and user.employeeType = "developer" and user.custom.country = "sweden" and resource._actions = "*"
```

In example rule above, the user `john-doe` is granted access for all actions to all resources.

### The `resource` object

A resource object is a generic concept that can represent applications, or objects within applications.
A resource object consists of attributes that can be used in rule expressions.
In rule expressions, the resource being accessed is represented by the `resource` object.

#### Common resource attributes

There are different resource types, but all resources share some common attributes.

| Attribute | Description |
| --------- | ----------- |
| `resource.description` | The resource description. Can be empty. | `resource.description = "My custom description"` |
| `resource.id` | The unique identifier for the resource. |
| `resource.owner` | The owner of the resource. |
| `resource._resourcetype` | The type of the resource being accessed. Equal to `"App"` or `"App.Object"`. |
| `resource._actions` | The actions granted on the resource. See [Actions](#actions) for more details.|

#### Type-specific resource attributes

Depending on the type of resource that is being accessed, `resource` may carry additional attributes.
If the resource type is `"App"`, there are no additional attributes.
If the resource type is `"App.Object"`, then `resource` has the following additional attributes:

| Attribute | Description | Example condition |
| --------- | ----------- | ----------------- |
| `resource._objecttype` | The object type. | `resource._objecttype = "field" or resource._objecttype = "my-generic-object"` |
| `resource.app` | Reference to the app resource that the object is part of. | `resource.app.owner = "john-doe"` |

##### The `app` attribute

When the common resource attribute is `resource._resourcetype = "App.Object"`,
then the type-specific resource attribute `resource.app` contains a reference to the `app` resource.
This means that all attributes and built-in functions are available on `resource.app`.

#### The `HasPrivilege` built-in function

If the user making the request has already been granted access for the provided action,
then the built-in `HasPrivilege(<action>)` function returns `true`, otherwise it returns `false`.

The syntax of the `HasPrivilege` function is the following:

```c
resource.HasPrivilege(ACTION)
```

The `ACTION` parameter is required. Its value can be any of the supported actions described in [Actions](#actions).

Consider the following rules:

```c
user.country = "uk" and resource._resourcetype = "App.Object" and resource._actions = "create"
resource._resourcetype = "App.Object" and resource.HasPrivilege("create") and resource._actions = {"read", "update"}
```

The first rule grants the `create` action to a user.

The second rules contains the `HasPrivilege` function
that will evaluate to `true` if the `create` action
has already been granted to the user.
Because of the first rule, it is evaluated as `true`.
As a result, the second rule adds the `read` and `update` actions to the user.
The user is granted `create`,`read`,and `update` actions from two rules.

### Actions

An _action_ is an operation that a user can perform on a Qlik Associative Engine resource.
The actions are:

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
    If a reload script requires other actions, for example to create variables in the application,
    then the user must be granted the required actions that are called in the script.
    For example:
    `resource._resourcetype = "App.Object" && resource._objecttype = "variable" && resource._action = "create"`.

#### The `_actions` attribute

In rule expressions, the resource attribute `_actions` has special semantics:

* `resource._actions` is always used as left operand with the `=` operator. Other usage is undefined behavior.
* The expression `resource._actions = (EXPRESSION)` always evaluates to `true`.
* The expression `resource._actions = (EXPRESSION)` has the side effect
    of accumulating the actions given by the right operand which is a single action or a list of actions.
* `resource._actions = "*"` can be used to grant all actions, where `"*"` is wildcard for all actions.

If `resource._actions = (EXPRESSION)` is ommitted from a rule,
any actions that are granted are not accumulated.
It is good practice to write all rules so that the final expression in
the rule involves `resource._actions`.

Consider the following rule:

```c
user.country = "uk" and resource._actions = {"read", "update"}
```

When the rule evaluates to `true`, the user from the UK is granted `read` and `update` actions.

Note that granted actions accumulate in the order in which the rules are evaluated.

Consider the following rule:

```c
user.country = "uk" and resource._actions = {"read", "update"}
user.roles = {"developer"} and resource._actions = {"create"}
```

When the first rule evaluates to `true`, the user from the UK is granted `read` and `update` actions.

If the user from UK has a user role of `developer`,
then the second rule will evaluate to `true`,
and the user from the UK is granted the `create` action.
The actions accumulate, so the user from UK has `read`, `update`, and `create` actions.

!!! Note
    Do not rely on accumulating actions. It is better to be explicit about which actions to grant.

To avoid relying on the accumulation of actions, the example rules above can be written as the following:

```c
user.country = "uk" and resource._actions = {"read", "update"}
user.roles = {"developer"} and resource._actions = {"read", "update", "create"}
```

## Rule operators

Rules contain expressions that are joined together with logical and comparison operators.
Comparison operators have precedence over logical operators.
Parantheses are supported to override precedence.

### Logical Operators

There are three logical operators for rule expressions: _not_, _and_, and _or_.

#### **`!` (not)**

The _not_ operator returns the logical negation of its operand.

|Returns|When   |
|---    |---    |
|`true` | Operand is `false`|
|`false`| Operand is `true`|

**Syntax**

```c
!(EXPRESSION)
```

**Example**

Given that `user.country` is `"uk"`:

```c
# Evaluates to false
!(resource.country = "UK")

# Evaluates to true
!(resource.country = "SE")
```

#### **`and`, `&&`**

This operator returns the logical conjuction of its operands.

|Returns|When   |
|---    |---    |
|`true` | All operands are `true`|
|`false`| Any operand is `false`|

**Syntax**

```c
(EXPRESSION) (and | &&) (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"` and `user.sub` is `"john-doe"`:

```c
# Evaluate to true
(user.country = "UK") && (user.sub = "john-doe")
(user.country = "UK") and (user.sub = "john-doe")

# Evaluate to false
(user.country = "SE") && (user.sub = "john-doe")
(user.country = "UK") and (user.sub = "bill-smith")
```

#### **`or`, `||`**

This operator returns the logical disjunction of its operands.

|Returns|When   |
|---    |---    |
|`true` | Operands are `true`|
|`true` | Any operand is `true`|
|`false`| All operands are `false`|

**Syntax**

```c
(EXPRESSION) (|| | or) (EXPRESSION)
```

**Examples**

Given that `user.country` is `"uk"` and `user.sub` is `"john-doe"`:

```c
# Evaluate to true
(user.country = "UK") || (user.sub = "john-doe")
(user.country = "UK") || (user.sub = "bill-smith")
(user.country = "SE") or (user.sub = "john-doe")

# Evaluate to false
(user.country = "SE") or (user.sub = "bill-smith")
(user.country = "SE") || (user.sub = "bill-smith")
```

### Comparison Operators

There are six comparison operators for rule expressions:
_equal_, _strictly equal_, _not equal_, _strictly not equal_, _like_, and _matches_.

#### **`=` (equal)**

This _equal_ operator returns `true` only if its operands are equal.

|Returns|When   |
|---    |---    |
|`true` | Operands are equal|
|`false`| Operands are not equal|

!!! Note
    _equal_ string comparison is _case insensitive_ (see `==` for case
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

#### **`==` (strictly equal)**

The _strictly equal_ operator returns `true` only if its operands are _strictly_ equal.

|Returns|When   |
|---    |---    |
|`true` | Operands are _strictly_ equal|
|`false`| Operands are not equal|

!!! Note
    _strictly equal_ string comparison is _case sensitive_ (see `=` for case insensitive comparison).
    If one of the operands is a list, only one value in the list needs to be strictly equal.

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

#### **`!=` (not equal)**

The _not equal_ operator returns `true` only if its operands are not equal.

|Returns|When   |
|---    |---    |
|`true` | Operands are not equal|
|`false`| Operands are equal|

!!! Note
    _not equal_ string comparison is _case insensitive_ (see `!==` for
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

#### **`!==` (strictly not equal)**

The _strictly not equal_ operator returns `true` only if its operands are _strictly_ not equal.

|Returns|When   |
|---    |---    |
|`true` | Operands are _strictly_ not equal|
|`false`| Operands are equal|

!!! Note
    String comparison is _case sensitive_ (see `!=` for case insensitive comparison).
    If one of the operands is a list, only one value in the list needs to be strictly unequal.

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

#### **`like`**

The _like_ operator returns `true` only if the left operand matches the **wildcard** pattern given by the right operand.

|Returns|When   |
|---    |---    |
|`true` | Left operand matches the wildcard in the right operand.|
|`false`| Left operand does not match the wildcard in right operand.|

!!! Note
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

Given that `user.region` is `"us-east"` or `"us-west"`:

```c
# Evaluate to true
user.region like "us-*"
user.region like "US-*"
user.region like "??-*"

# Evaluate to false
user.region like "us-?"
user.region like "uk-*"
```

#### **`matches`**

The _matches_ operator returns `true` only if the left operand matches the **regular expression**
given by the right operand.

|Returns|When   |
|---    |---    |
|`true` | Left operand matches the regular expression in the right operand.|
|`false`| Left operand does not match the regular expression in the  right operand.|

**Syntax**

```c
(EXPRESSION) matches (EXPRESSION)
```

**Examples**

To match users from deployments `1` or `2` from any US region (`east`, `west` etc.):

```c
user.region matches "us-[^-]+-(1|2)"
```

This regular expression matches regions starting with `us-`, followed by one ore more characters that are anything but
`-`, followed by `-1` or `-2`.

## Adding an existing app

To add an existing app (qvf) to an engine that is running access control, you must import the app.
You can do this with the engine REST API.
The access control feature requires the app to follow a specific file structure,
which is created when an app is imported.

### Example

In this example, we describe how to import and enable access control for an app.
For this example, we will import the
[African Urbanization](https://github.com/qlik-oss/core-scaling) use case.

First, we start the Qlik Associative Engine with the following parameters:

```sh
"-S", "AcceptEULA=no", # change to 'yes' if you accept the Qlik Core EULA
"-S", "LicenseServiceUrl=<LicenseService adress>",
"-S", "DocumentDirectory=<directory for doc>",
"-S", "EnableABAC=1",
"-S", "SystemAllowRulePath=<directory for rules>"
```

Next, we call the engine REST API to import the `Shared-Africa-Urbanization.qvf`:

[POST /v1/apps/import](https://core.qlik.com/services/qix-engine/apis/rest/qlik-associative-engine-api/#post-v1appsimport)

```sh
curl -s --data-binary @Shared-Africa-Urbanization.qvf http://<adress to engine>/v1/apps/import
```

The engine returns information about the import. It looks similar to this:

```json
{"attributes":{"id":"09aa1749-52a0-43ad-a525-3699d6e9f866","name":"","description":"","thumbnail":"","lastReloadTime":"2018-06-13T13:34:41.436Z","createdDate":"","modifiedDate":"","owner":"Personal\\Me","dynamicColor":"","published":false,"publishTime":"","custom":{},"_resourcetype":"app"},"privileges":["read","create","update","delete","reload","import","export","exportdata","publish","duplicate","approve"],"create":[{"resource":"\"sheet\"","canCreate":true},{"resource":"\"bookmark\"","canCreate":true},{"resource":"\"story\"","canCreate":true},{"resource":"\"dimension\"","canCreate":true},{"resource":"\"measure\"","canCreate":true},{"resource":"\"masterobject\"","canCreate":true},{"resource":"\"folderconnection\"","canCreate":true},{"resource":"\"internetconnection\"","canCreate":true}]}
```

Notice that the engine returns an `id` in the response body. This `id` is the name of the imported app.
The `Shared-Africa-Urbanization.qvf` app now follows the same rules that are defined for access control.

For more information, see this [commit](https://github.com/qlik-oss/core-scaling/commit/76689e7911a2c83312a43e32600d67f9c957bae7).
