# Color functions

## Pre-defined color functions

The following functions can be used in expressions for pre-defined colors. Each function returns an RGB color representation.

Optionally a parameter for alpha factor can be given, in which case an ARGB color representation is returned. An alpha
factor of 0 corresponds to full transparency, and an alpha factor of 255 corresponds to full opacity. If a value for
alpha is not entered, it is assumed to be 255.

| Color function       | RGB value    |
| ------------------- -| ------------ |
| black ([alpha])      | (0,0,0)      |
| blue([alpha])        | (0,0,128)    |
| brown([alpha])       | (128,128,0)  |
| cyan([alpha])        | (0,128,128)  |
| darkgray([alpha])    | (128,128,128)|
| green([alpha])       | (0,128,0)    |
| lightblue([alpha])   | (0,0,255)    |
| lightcyan([alpha])   | (0,255,255)  |
| lightgray([alpha])   | (192,192,192)|
| lightgreen([alpha])  | (0,255,0)    |
| lightmagenta([alpha])| (255,0,255)  |
| lightred([alpha])    | (255,0,0)    |
| magenta([alpha])     | (128,0,128)  |
| red([alpha])         | (128,0,0)    |
| white([alpha])       | (255,255,255)|
| yellow([alpha])      | (255,255,0)  |

| Examples  | Results           |
| --------- | ----------------- |
| Blue()    | RGB(0,0,128)      |
| Blue(128) | ARGB(128,0,0,128) |

These functions can be used in expressions associated with setting and evaluating the color properties.

## ARGB

ARGB() is used in expressions to set or evaluate the color properties of a chart object, where the color is defined by
a red component **r**, a green component **g**, and a blue component **b**, with an alpha factor (opacity) of alpha.

`ARGB(alpha, r, g, b)`

**Return data type:** dual

| Argument        | Description                  |
| --------------- | ---------------------------- |
| alpha           | Transparency value in the range 0 - 255. 0 corresponds to full transparency and 255 corresponds to full opacity.|
| r, g, b         | Red, green, and blue component values. A color component of 0 corresponds to no contribution and one of 255 to full contribution.|

!!! Note
    All arguments must be expressions that resolve to integers in the range 0 to 255.

If interpreting the numeric component and formatting it in hexadecimal notation, the values of the color components are
easier to see.For example, light green has the number 4 278 255 360, which in hexadecimal notation is FF00FF00. The
first two positions ‘FF’ (255) denote the alpha factor.The next two positions ‘00’ denote the amount of red, the next
two positions ‘FF’ denote the amount of green and the final two positions ‘00’ denote the amount of blue.

## RGB

RGB() is used in expressions to set or evaluate the color properties of a chart object, where the color is defined by a
red component **r**, a green component **g**, and a blue component **b** with values between 0 and 255.

`RGB (r, g, b)`

**Return data type:** dual

| Argument        | Description                  |
| --------------- | ---------------------------- |
| r, g, b         | Red, green, and blue component values. A color component of 0 corresponds to no contribution and one of 255 to full contribution.|

!!! Note
    All arguments must be expressions that resolve to integers in the range 0 to 255.

If interpreting the numeric component and formatting it in hexadecimal notation, the values of the color components are
easier to see. For example, light green has the number 4 278 255 360, which in hexadecimal notation is FF00FF00. The
first two positions ‘FF’ (255) denote the alpha factor.In the functions RGB and HSL, this is always ‘FF’ (opaque). The
next two positions ‘00’ denote the amount of red, the next two positions ‘FF’ denote the amount of green and the final
two positions ‘00’ denote the amount of blue.

## HSL

HSL() is used in expressions to set or evaluate the color properties of a chart object, where the color is defined by
values of hue, saturation, and luminosity between 0 and 1.

`HSL (hue, saturation, luminosity)`

**Return data type:** dual

| Argument                    | Description                  |
| --------------------------- | ---------------------------- |
| hue, saturation, luminosity | hue, saturation, and luminosity component values ranging between 0 and 1.|

All arguments must be expressions that resolve to integers in the range 0 to 1.

If interpreting the numeric component and formatting it in hexadecimal notation, the RGB values of the color components
are easier to see. For example, light green has the number 4 278 255 360, which in hexadecimal notation is FF00FF00 and
RGB (0,255,0). This is equivalent to HSL (80/240, 240/240, 120/240) - a HSL value of (0.33, 1, 0.5).
