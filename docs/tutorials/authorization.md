# Authorization

In this tutorial, learn how to configure JSON Web Tokens (JWT) and how to use Qlik Associative Engine
to manage and authenticate users.

## JSON Web Token

JWT is an open standard for creating access tokens. To learn more about JWT,
see the [JWT documentation](https://jwt.io/) and the [JWT Standard](https://tools.ietf.org/html/rfc7519).

The Qlik Associative Engine uses JWTs for the following tasks:

- Ensuring that only authenticated users are allowed to connect.
- Connecting users to the same sessions.
- Applying data security (for example, section access).
- Enforcing document level access control.

### JWT format

A typical JWT consists of three parts.

`{header}.{payload}.{signature}`

!!! Note
    Each part of the JWT is base64url-encoded and separated by a dot.
    To learn more about JWT encoding, see [Base 64 Encoding with URL and Filename Safe Alphabet](https://tools.ietf.org/html/rfc4648#section-5).

#### Header

The header describes the type of token,
and the hashing algorithm that is used to sign the token. For example:

```json
{
  "typ": "JWT",
  "alg": "none"
}
```

#### Payload

The payload contains the claims of the JWT.
The relevant claims that are evaluated by the Qlik Associative Engine are the subject and the expiration date.

| Field    | Mandatory | Description |
| -------- | --------- | ----------- |
| `sub`    | Yes       | The subject is a unique identifier for a user. |
| `exp`    | No        | The numerical expiration date. If omitted it never expires. |
| `groups` | No        | Array of user groups. If present the GROUP column can be used in section access |
| `kid`    | No        | Reserved field for JWKS in the future. |

For example:

```json
{
  "sub": "jdoe",
  "exp": "1541173994"
}
```

#### Signature

The signature is used to verify the authenticity of the token.
The Qlik Associative Engine supports the following JWT signing algorithms:

| Encryption type | Algorithms |
| ----            | --------- |
| HMAC            | HS256, HS384, HS512 |
| Elliptic curve  | ES256, ES384, ES512 |
| RSA             | RS256, RS384,  RS512 |

To learn more about JWT signatures, see [Signature](https://jwt.io/introduction/#signature).

### Qlik Associative Engine configuration

To validate JWTs, you must configure the Qlik Associative Engine by specifying
the JWT enforcement type and the JWT secret in the `docker-compose.yml` file.

The enforcement type is defined as:

`-S ValidateJsonWebTokens=<enforcement type>`

where `enforcement type` is one of the following values:

| Value | Description |
|---|---|
| 0 | Not enforced (default) |
| 1 | Enforce JWT validation (JWT can be either signed or unsigned) |
| 2 | Enforce JWT validation (JWT must be signed) |

HMAC secrets are injected through the command line parameter:

`-S JsonWebTokenSecret=<secret>`

Elliptic curve and RSA secrets are retrieved from a public key,
stored on a `pem` file.

`-S JsonWebTokenPath=<path to pem file>`

Example:

```yaml
version: "3.1"

services:
  engine:
    image: qlikcore/engine
    command: -S ValidateJsonWebTokens=2 -S JsonWebTokenSecret=passw0rd
  ...
```

### Validation

The JWT is passed to the Qlik Associative Engine in the `Authorization` header using
the `Bearer` schema, and is validated once the websocket connection is established.

`Authorization: Bearer <token>`

In order for validation to be successful, two
conditions must be met:

1. The signature must be valid.
1. If the `exp` field exists, then the expiry date must not have passed.

If validation fails, the request is rejected and a `401 Unauthorized` HTTP response code is returned.

## Section access

You can use section access to segment application data so specific
sections are available only to certain users or groups.
To learn more about section access, see [Managing security with section access](http://help.qlik.com/en-US/sense/Subsystems/Hub/Content/Scripting/Security/manage-security-with-section-access.htm).

!!! Note
    Qlik Associative Engine has to be started with `-S ValidateJsonWebTokens= < 1 or 2 >` otherwise the error
    `Section access detected when opening an app in QlikView Personal.` will be shown.

### Managing access control

Access control is managed through one or several security tables loaded
in the same way that the Qlik Associative Engine normally loads data.

In the example below, the load script grants regional
users access to their respective country data
while the admin user has access to all data.

```none
section access;
LOAD * inline [
ACCESS, USERID, COUNTRY, OMIT
ADMIN, admin,,
USER, us-user,US,
USER, uk-user,UK,
USER, de-user,DE,
];

section Application;
Sales:
LOAD * INLINE [
COUNTRY, PRODUCT, SALES_AMOUNT
US, Electronics, 101
US, Furniture, 102
US, Other, 103
UK, Electronics, 201
UK, Furniture, 202
UK, Other, 203
DE, Electronics, 301
DE, Furniture, 302
DE, Other, 303
];
```

The Qlik Associative Engine maps the `sub` field from the JWT to the user names
that are specified in the section access table.
In the example above, the section access table is linked to the `Sales` table
through the `COUNTRY` field value,
which allows the visibility of row data to be controlled by section access.

If the JWT contains the `groups` field it will be mapped to the 'GROUP' column in the section access table.
