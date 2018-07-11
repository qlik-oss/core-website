# Color functions

## ARGB

ARGB() is used in expressions to set or evaluate the color properties of a chart object, where the color is defined by a red component r, a green component g, and a blue component b, with an alpha factor (opacity) of alpha.

`ARGB( alpha, r, g, b )`

**Return data type:** dual

| Argument        | Description                  |
| --------------- | ---------------------------- |
| alpha           | Transparency value in the range 0 - 255. 0 corresponds to full transparency and 255 corresponds to full opacity.|
| r, g, b         | Red, green, and blue component values. A color component of 0 corresponds to no contribution and one of 255 to full contribution.|

All arguments must be expressions that resolve to integers in the range 0 to 255.

If interpreting the numeric component and formatting it in hexadecimal notation, the values of the color components are easier to see.For example, light green has the number 4 278 255 360, which in hexadecimal notation is FF00FF00.The first two positions ‘FF’ (255) denote the alpha factor.The next two positions ‘00’ denote the amount of red, the next two positions ‘FF’ denote the amount of green and the final two positions ‘00’ denote the amount of blue.

## RGB

RGB() is used in expressions to set or evaluate the color properties of a chart object, where the color is defined by a red component r, a green component g, and a blue component b with values between 0 and 255.

`RGB (r, g, b)`

**Return data type:** dual

| Argument        | Description                  |
| --------------- | ---------------------------- |
| r, g, b         | Red, green, and blue component values. A color component of 0 corresponds to no contribution and one of 255 to full contribution.|

All arguments must be expressions that resolve to integers in the range 0 to 255.

If interpreting the numeric component and formatting it in hexadecimal notation, the values of the color components are easier to see.For example, light green has the number 4 278 255 360, which in hexadecimal notation is FF00FF00.The first two positions ‘FF’ (255) denote the alpha factor.In the functions RGB and HSL, this is always ‘FF’ (opaque).The next two positions ‘00’ denote the amount of red, the next two positions ‘FF’ denote the amount of green and the final two positions ‘00’ denote the amount of blue.

## HSL

HSL() is used in expressions to set or evaluate the color properties of a chart object, where the color is defined by values of hue, saturation, and luminosity between 0 and 1.

`HSL (hue, saturation, luminosity)`

**Return data type:** dual

| Argument                    | Description                  |
| --------------------------- | ---------------------------- |
| hue, saturation, luminosity | hue, saturation, and luminosity component values ranging between 0 and 1.|

All arguments must be expressions that resolve to integers in the range 0 to 1.

If interpreting the numeric component and formatting it in hexadecimal notation, the RGB values of the color components are easier to see. For example, light green has the number 4 278 255 360, which in hexadecimal notation is FF00FF00 and RGB (0,255,0). This is equivalent to HSL (80/240, 240/240, 120/240) - a HSL value of (0.33, 1, 0.5).
