# Authorization Recipe

This recipe explains how the QIX Engine uses JSON Web Tokens to authorize users.

## Introduction

JSON Web Token (JWT) is an open standard for creating access tokens. To read more about the details of JWTs please
refer to [https://jwt.io/](https://jwt.io/) and [RFC7519](https://tools.ietf.org/html/rfc7519).

The QIX engine will use JWTs to:

- connect users to the same sessions
- apply data security (i.e. section access)
- enforce document level access control <---- needs to be verified

## JWT format

A typical JWT consists of three parts (each being base64url-encoded and separated by a dot):
`{header}.{payload}.{signature}`.

The header describes the type of token, and the hashing algorithm used to sign the token. For example:

```json
{
  "typ":"JWT",
  "alg":"none"
}
```

The payload contains the claims made by the token. The QIX Engine considers the `sub` and `exp` properties:

```json
{
  "sub": "<user>",
  "exp": "<numeric date>"
}
```

The signature is used to verify the authenticity of the token. The QIX Engine supports the following JWT signing
algorithms:

- HMAC: HS256, HS384 and HS512
- Elliptic curve: ES256, ES384 and ES512
- RSA: RS256, RS384 and RS512

## QIX Engine Configuration

The QIX engine can be configured to validate JWTs using the following command line parameters:

`-S ValidateJsonWebTokens=<enforcement type>`

where `enforcement type` is one of the following values:

| Value | Description |
|---|---|
| 0 | Not enforced (default) |
| 1 | Enforce JWT validation; JWT can be either signed or unsigned |
| 2 | Enforce JWT validation; JWT must be signed |

HMAC secrets are injected through the command line parameter: `-S JsonWebTokenSecret=<secret>`. Elliptic curve and RSA
requires a public key (packaged in a `pem`file)  which is set through: `-S JsonWebTokenPath=<path to pem file>`.

## JWT Validation

The JWT should be passed to the QIX Engine in the `Authorization` header using the `Bearer` schema:
`Authorization: Bearer <token>`

The JWT will be validated once the websocket connection is established. In order for validation to be successful, two
conditions must be met:

1. the signature must be valid
1. if the `exp` field exists, the expiry date must not been passed

If validation fails, the request will be rejected with the `401 Unauthorized` HTTP response code.

## Section access

Section access goes here!
