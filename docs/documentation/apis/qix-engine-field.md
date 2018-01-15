<!-- markdownlint-disable -->
# Field

_QIX methods for version 12.122.0._

## `Clear`

Clears the selections in a specific field.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true/false&gt;<br>The operation is successful if **qReturn** is set to true.  |

## `ClearAllButThis`

Maintains the selections in the current field while clearing the selections in the other fields.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `GetAndMode`

Returns the AND mode status of a field.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true or false&gt;<br>The field is in AND mode if **qReturn** is set to true.  |

## `GetCardinal`

Retrieves the number of distinct values in a field.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | integer | &lt;cardinal value&gt; |

## `GetNxProperties`

Gets the properties of a field.<br><br>The property _OneAndOnlyOne_ is set to true if one and only value has been selected in the field prior setting the property. 

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qProperties` | [`NxFieldProperties`](./qix-engine-definitions.md#nxfieldproperties) | Information about the properties of the field. |

## `Lock`

Locks all selected values of a specific field.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true/false&gt;<br>The operation is successful if **Return** is set to true.  |

## `LowLevelSelect`

Selects some values in a field, by entering the element numbers related to the values to select.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qValues` | array | Yes | Indexes (or element numbers) of the values to select. |
| `qToggleMode` | boolean | Yes | Set to true to keep any selections present in the list object.<br>If this parameter is set to false, selections made before accepting the list object search become alternative. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `Select`

Selects field values matching a search string.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qMatch` | string | Yes | String to search for.<br>Can contain wild cards or numeric search criteria. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |
| `qExcludedValuesMode` | integer | No | Include excluded values in search. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `SelectAll`

Selects all values of a field. Excluded values are also selected.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `SelectAlternative`

Selects all alternatives values in a specific field.<br>In a field that contains at least one selected value, the values that are neither selected nor excluded are alternatives values.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `SelectExcluded`

Inverts the current selections.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `SelectPossible`

Selects all possible values in a specific field.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `SelectValues`

Selects some values in a field, by entering the values to select.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qFieldValues` | [`FieldValue`](./qix-engine-definitions.md#fieldvalue) | Yes | List of the values to select. |
| `qToggleMode` | boolean | No | The default value is false. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `SetAndMode`

Sets a field in the AND mode.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qAndMode` | boolean | Yes | Specifies if the AND mode applies to the field.<br>Set this parameter to true to enter the AND mode. |

_No return values._

## `SetNxProperties`

Sets some properties to a field.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qProperties` | [`NxFieldProperties`](./qix-engine-definitions.md#nxfieldproperties) | Yes | Information about the properties of the field. |

_No return values._

## `ToggleSelect`

Toggle selects field values matching a search string.

**Parameters:**

| Name | Type | Mandatory | Description |
| ---- | ---- | --------- | ----------- |
| `qMatch` | string | Yes | String to search for.<br>Can contain wild cards or numeric search criteria. |
| `qSoftLock` | boolean | No | Set to true to ignore locks; in that case, locked fields can be selected.<br>The default value is false. |
| `qExcludedValuesMode` | integer | No | Include excluded values in search. |

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | true/false<br>The operation is successful if qReturn is set to true. |

## `Unlock`

Unlocks all selected values of a specific field if the target (or handle ) is a field.

_No parameters._

**Returns:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `qReturn` | boolean | &lt;true/false&gt;<br>The operation is successful if **Return** is set to true.  |
