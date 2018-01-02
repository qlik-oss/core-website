# Authorization

In this tutorial, you will learn how to configure the QIX Engine
and JSON Web Tokens (JWT) to manage and authenticate users.

## JSON Web Token

JWT is an open standard for creating access tokens. To read more about the details of JWTs,
see to [JWT documentation](https://jwt.io/) and the [JWT Standard](https://tools.ietf.org/html/rfc7519).

The QIX Engine uses JWTs for the following tasks:

- Ensuring that only authenticated users are allowed to connect.
- Connecting users to the same sessions.
- Applying data security (for example, section access).
- Enforcing document level access control.

### Format

A typical JWT consists of three parts.

`{header}.{payload}.{signature}`

**Note:** Each part of the JWT is Base64Url-encoded and separated by a dot.
See [Base 64 Encoding with URL and Filename Safe Alphabet](https://tools.ietf.org/html/rfc4648#section-5).

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
The QIX Engine evaluates the `sub` and `exp` claims.

| Key | Description |
| -----|------------|
| `sub` | The subject - a unique identifier for a user. |
| `exp` | The numerical expiration date - never expires if omitted. |

For example:

```json
{
  "sub": "jdoe",
  "exp": "1541173994"
}
```

#### Signature

The signature is used to verify the authenticity of the token.
The QIX Engine supports the following JWT signing algorithms:

| Encryption type | Algorithms |
| ----            | --------- |
| HMAC            | HS256, HS384, HS512 |
| Elliptic curve  | ES256, ES384, ES512 |
| RSA             | RS256, RS384,  RS512 |

To learn more about signatures, see [Signature](https://jwt.io/introduction/#signature).

### QIX Engine configuration

To configure the QIX Engine to validate JWTs, use the following command line parameter:

`-S ValidateJsonWebTokens=<enforcement type>`

where `enforcement type` is one of the following values:

| Value | Description |
|---|---|
| 0 | Not enforced (default) |
| 1 | Enforce JWT validation (JWT can be either signed or unsigned) |
| 2 | Enforce JWT validation (JWT must be signed) |

HMAC secrets are injected through the command line parameter:

`-S JsonWebTokenSecret=<secret>`

Elliptic curve and RSA algorithms require a public key, packaged in a `pem` file.

`-S JsonWebTokenPath=<path to pem file>`

Example:

```yaml
version: "3.1"

services:
  engine:
    image: qlikea/engine
    command: -S ValidateJsonWebTokens=2 -S JsonWebTokenSecret=passw0rd
  ...
```

### Validation

The JWT is passed to the QIX Engine in the `Authorization` header using the `Bearer` schema:

`Authorization: Bearer <token>`

The JWT is validated once the websocket connection is established. In order for validation to be successful, two
conditions must be met:

1. The signature must be valid.
1. If the `exp` field exists, then the expiry date must not have passed.

If validation fails, the request is rejected with the `401 Unauthorized` HTTP response code.

## Section access

You can use section access to segment application data so that specific
sections are available only to certain users.
See [Section access](http://help.qlik.com/en-US/sense/Subsystems/Hub/Content/Scripting/Security/manage-security-with-section-access.htm).

### Manage access control

Access control is managed through one or more security tables,
which are loaded in the same way that the QIX Engine normally loads data.

For example, the load script below grants regional users access to their respective country data:

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

The QIX Engine takes the `sub` field of the JWT and maps it to the user names that are specified in the section access table.
In theexample above, notice that the `COUNTRY` key connects the section access and `Sales` tables,
and that the section access table now specifies which rows of the `Sales` table are visible to the specific user.

Similarily, you can use groups to segment the application data.
See [Managing security with section access](http://help.qlik.com/en-US/sense/Subsystems/Hub/Content/Scripting/Security/manage-security-with-section-access.htm)
site for more information.