# Authorization Recipe

This recipe explains how the QIX Engine can be configured to manage authenticated users.

## JSON Web Token

JSON Web Token (JWT) is an open standard for creating access tokens. To read more about the details of JWTs please
refer to [https://jwt.io/](https://jwt.io/) and [RFC7519](https://tools.ietf.org/html/rfc7519).

The QIX Engine will use JWTs to:

- ensure that only authenticated users are allowed to connect
- connect users to the same sessions
- apply data security (i.e. section access)
- enforce document level access control <---- needs to be verified

### Format

A typical JWT consists of three parts (each being [base64url](https://tools.ietf.org/html/rfc4648#section-5)-encoded
and separated by a dot): `{header}.{payload}.{signature}`.

The header describes the type of token, and the hashing algorithm used to sign the token. For example:

```json
{
  "typ": "JWT",
  "alg": "none"
}
```

The payload contains the claims made by the token. The QIX Engine considers the `sub` and `exp` properties:

| Key | Description |
| -----|------------|
| `sub` | The subject, a unique identifier for a user |
| `exp` | The numerical expiration date, never expires if omitted |

For example:

```json
{
  "sub": "jdoe",
  "exp": "1541173994"
}
```

The signature is used to verify the authenticity of the token. The QIX Engine supports the following JWT signing
algorithms:

- HMAC: HS256, HS384 and HS512
- Elliptic curve: ES256, ES384 and ES512
- RSA: RS256, RS384 and RS512

### QIX Engine Configuration

The QIX Engine can be configured to validate JWTs using the following command line parameter:

`-S ValidateJsonWebTokens=<enforcement type>`

where `enforcement type` is one of the following values:

| Value | Description |
|---|---|
| 0 | Not enforced (default) |
| 1 | Enforce JWT validation; JWT can be either signed or unsigned |
| 2 | Enforce JWT validation; JWT must be signed |

HMAC secrets are injected through the command line parameter: `-S JsonWebTokenSecret=<secret>`. Elliptic curve and RSA
requires a public key (packaged in a `pem` file)  which is set through: `-S JsonWebTokenPath=<path to pem file>`.

For example:

```yaml
version: "3.1"

services:
  engine:
    image: qlikea/engine
    command: -S ValidateJsonWebTokens=2 -S JsonWebTokenSecret=passw0rd
  ...
```

### Validation

The JWT shall be passed to the QIX Engine in the `Authorization` header using the `Bearer` schema:
`Authorization: Bearer <token>`

The JWT is validated once the websocket connection is established. In order for validation to be successful, two
conditions must be met:

1. the signature must be valid
1. if the `exp` field exists, the expiry date must not have passed

If validation fails, the request is rejected with the `401 Unauthorized` HTTP response code.

## Section access

[Section access](http://help.qlik.com/en-US/sense/Subsystems/Hub/Content/Scripting/Security/manage-security-with-section-access.htm)
can be used to segment application data in portions that are only viewable by certain users.

### Manage access control

Access control is managed through one (or more) security tables loaded in the same way that the QIX Engine normally
loads data.

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

The QIX Engine will use the `sub` field of the JWT and map it to the user names specified in the access table. In the
example above, note how the `COUNTRY` key connects the access and `Sales` tables and thus declares which portions of
the data that are visible to the specific user.

In a similar way, groups can be used to segment the application data.
Please consult the [Qlik Sense help](http://help.qlik.com/en-US/sense/Subsystems/Hub/Content/Scripting/Security/manage-security-with-section-access.htm)
site for detailed documentation.
