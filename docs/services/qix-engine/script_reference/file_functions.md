# File functions

## Attribute

This script function returns the value of the meta tags of different media files
as text. The following file formats are supported: MP3, WMA, WMV, PNG and JPG.
If the file filename does not exist, is not a supported file format or does not
contain a meta tag named attributename, NULL will be returned.

`Attribute( filename, attributename)`

A large number of meta tags can be read. The examples in this topic show
which tags can be read for the respective supported file types.

!!! INFO
    You can only read meta tags saved in the file according to the relevant
    specification, for example ID2v3 for MP3 files or EXIF for JPG files,
    not meta information saved in the
    Windows File Explorer.

| Argument | Description |
| -------- | ----------- |
| filename | The name of a media file including path, if needed, as a folder data connection.<BR>Example: 'lib://Table Files/'<BR>In legacy scripting mode, the following path formats are also supported:<BR>- absolute: Example: c:\data\ <BR> - relative to the app working directory: Example: data\ |
| attributename | The name of a meta tag. |

The examples use the GetFolderPath function to find the paths to media files. As
GetFolderPath is only supported in legacy mode, you need to replace the references to
GetFolderPath with a lib:// data connection path.

**Example MP3 files**
This script reads all possible MP3 meta tags in folder MyMusic.

```code
// Script to read MP3 meta tags
for each vExt in 'mp3'
for each vFoundFile in filelist( GetFolderPath('MyMusic') & '\*.'& vExt )

FileList:
LOAD FileLongName,
    subfield(FileLongName,'\',-1) as FileShortName,
    num(FileSize(FileLongName),'# ### ### ###',',',' ') as FileSize,
    FileTime(FileLongName) as FileTime,
    // ID3v1.0 and ID3v1.1 tags Attribute(FileLongName, 'Title') as Title,
    Attribute(FileLongName, 'Artist') as Artist,
    Attribute(FileLongName, 'Album') as Album,
    Attribute(FileLongName, 'Year') as Year,
    Attribute(FileLongName, 'Comment') as Comment,
    Attribute(FileLongName,'Track') as Track,
    Attribute(FileLongName, 'Genre') as Genre,

    // ID3v2.3 tags Attribute(FileLongName, 'AENC') as AENC, // Audio encryption
    Attribute(FileLongName, 'APIC') as APIC, // Attached picture
    Attribute(FileLongName, 'COMM') as COMM, // Comments
    Attribute(FileLongName, 'COMR') as COMR, // Commercial frame
    Attribute(FileLongName, 'ENCR') as ENCR, // Encryption method registration
    Attribute(FileLongName, 'EQUA') as EQUA, // Equalization
    Attribute(FileLongName, 'ETCO') as ETCO, // Event timing codes
    Attribute(FileLongName, 'GEOB') as GEOB, // General encapsulated object
    Attribute(FileLongName, 'GRID') as GRID, // Group identification registration
    Attribute(FileLongName, 'IPLS') as IPLS, // Involved people list
    Attribute(FileLongName, 'LINK') as LINK, // Linked information
    Attribute(FileLongName, 'MCDI') as MCDI, // Music CD identifier
    Attribute(FileLongName, 'MLLT') as MLLT, // MPEG location lookup table
    Attribute(FileLongName, 'OWNE') as OWNE, // Ownership frame
    Attribute(FileLongName, 'PRIV') as PRIV, // Private frame
    Attribute(FileLongName, 'PCNT') as PCNT, // Play counter
    Attribute(FileLongName, 'POPM') as POPM, // Popularimeter

    Attribute(FileLongName, 'POSS') as POSS, // Position synchronisation frame
    Attribute(FileLongName, 'RBUF') as RBUF, // Recommended buffersize
    Attribute(FileLongName, 'RVAD') as RVAD, // Relative volume adjustment
    Attribute(FileLongName, 'RVRB') as RVRB, // Reverb
    Attribute(FileLongName, 'SYLT') as SYLT, // Synchronized lyric/text
    Attribute(FileLongName, 'SYTC') as SYTC, // Synchronized tempo codes
    Attribute(FileLongName, 'TALB') as TALB, // Album/Movie/Show title
    Attribute(FileLongName, 'TBPM') as TBPM, // BPM (beats per minute)
    Attribute(FileLongName, 'TCOM') as TCOM, // Composer
    Attribute(FileLongName, 'TCON') as TCON, // Content type
    Attribute(FileLongName, 'TCOP') as TCOP, // Copyright message
    Attribute(FileLongName, 'TDAT') as TDAT, // Date Attribute(FileLongName, 'TDLY') as TDLY, // Playlist delay

    Attribute(FileLongName, 'TENC') as TENC, // Encoded by
    Attribute(FileLongName, 'TEXT') as TEXT, // Lyricist/Text writer
    Attribute(FileLongName, 'TFLT') as TFLT, // File type
    Attribute(FileLongName, 'TIME') as TIME, // Time
    Attribute(FileLongName, 'TIT1') as TIT1, // Content group description
    Attribute(FileLongName, 'TIT2') as TIT2, // Title/songname/content description
    Attribute(FileLongName, 'TIT3') as TIT3, // Subtitle/Description refinement
    Attribute(FileLongName, 'TKEY') as TKEY, // Initial key
    Attribute(FileLongName, 'TLAN') as TLAN, // Language(s)
    Attribute(FileLongName, 'TLEN') as TLEN, // Length
    Attribute(FileLongName, 'TMED') as TMED, // Media type

    Attribute(FileLongName, 'TOAL') as TOAL, // Original album/movie/show title
    Attribute(FileLongName, 'TOFN') as TOFN, // Original filename
    Attribute(FileLongName, 'TOLY') as TOLY, // Original lyricist(s)/text writer(s)
    Attribute(FileLongName, 'TOPE') as TOPE, // Original artist(s)/performer(s)
    Attribute(FileLongName, 'TORY') as TORY, // Original release year
    Attribute(FileLongName, 'TOWN') as TOWN, // File owner/licensee
    Attribute(FileLongName, 'TPE1') as TPE1, // Lead performer(s)/Soloist(s)
    Attribute(FileLongName, 'TPE2') as TPE2, // Band/orchestra/accompaniment

    Attribute(FileLongName, 'TPE3') as TPE3, // Conductor/performer refinement
    Attribute(FileLongName, 'TPE4') as TPE4, // Interpreted, remixed, or otherwise modified by
    Attribute(FileLongName, 'TPOS') as TPOS, // Part of a set
    Attribute(FileLongName, 'TPUB') as TPUB, // Publisher
    Attribute(FileLongName, 'TRCK') as TRCK, // Track number/Position in set
    Attribute(FileLongName, 'TRDA') as TRDA, // Recording dates
    Attribute(FileLongName, 'TRSN') as TRSN, // Internet radio station name
    Attribute(FileLongName, 'TRSO') as TRSO, // Internet radio station owner

    Attribute(FileLongName, 'TSIZ') as TSIZ, // Size
    Attribute(FileLongName, 'TSRC') as TSRC, // ISRC (international standard recording code)
    Attribute(FileLongName, 'TSSE') as TSSE, // Software/Hardware and settings used for encoding
    Attribute(FileLongName, 'TYER') as TYER, // Year Attribute(FileLongName, 'TXXX') as TXXX, // User defined text information frame
    Attribute(FileLongName, 'UFID') as UFID, // Unique file identifier
    Attribute(FileLongName, 'USER') as USER, // Terms of use
    Attribute(FileLongName, 'USLT') as USLT, // Unsychronized lyric/text transcription
    Attribute(FileLongName, 'WCOM') as WCOM, // Commercial information
    Attribute(FileLongName, 'WCOP') as WCOP, // Copyright/Legal information

    Attribute(FileLongName, 'WOAF') as WOAF, // Official audio file webpage
    Attribute(FileLongName, 'WOAR') as WOAR, // Official artist/performer webpage
    Attribute(FileLongName, 'WOAS') as WOAS, // Official audio source webpage
    Attribute(FileLongName, 'WORS') as WORS, // Official internet radio station homepage
    Attribute(FileLongName, 'WPAY') as WPAY, // Payment
    Attribute(FileLongName, 'WPUB') as WPUB, // Publishers official webpage
    Attribute(FileLongName, 'WXXX') as WXXX; // User defined URL link frame
LOAD @1:n as FileLongName Inline "$(vFoundFile)" (fix, no labels);
Next vFoundFile
Next vExt
```

**Example JPG files**
This script reads all possible EXIF meta tags from JPG files in folder MyPictures.

```code
FileList:
LOAD FileLongName,
    subfield(FileLongName,'\',-1) as FileShortName,
    num(FileSize(FileLongName),'# ### ### ###',',',' ') as FileSize,
    FileTime(FileLongName) as FileTime,
    // ************   Exif Main (IFD0) Attributes   ************
    Attribute(FileLongName, 'ImageWidth') as ImageWidth,
    Attribute(FileLongName, 'ImageLength') as ImageLength,
    Attribute(FileLongName, 'BitsPerSample') as BitsPerSample,
    Attribute(FileLongName, 'Compression') as Compression,
    //  examples: 1=uncompressed, 2=CCITT, 3=CCITT 3, 4=CCITT 4,
    //5=LZW, 6=JPEG (old style), 7=JPEG, 8=Deflate, 32773=PackBits RLE,
    Attribute(FileLongName, 'PhotometricInterpretation') as PhotometricInterpretation,
    //  examples: 0=WhiteIsZero, 1=BlackIsZero, 2=RGB, 3=Palette, 5=CMYK, 6=YCbCr,
    Attribute(FileLongName, 'ImageDescription') as ImageDescription,
    Attribute(FileLongName, 'Make') as Make,
    Attribute(FileLongName, 'Model') as Model,
    Attribute(FileLongName, 'StripOffsets') as StripOffsets,
    Attribute(FileLongName, 'Orientation') as Orientation,
    //  examples: 1=TopLeft, 2=TopRight, 3=BottomRight, 4=BottomLeft,
    // 5=LeftTop, 6=RightTop, 7=RightBottom, 8=LeftBottom,
    Attribute(FileLongName, 'SamplesPerPixel') as SamplesPerPixel,
    Attribute(FileLongName, 'RowsPerStrip') as RowsPerStrip,
    Attribute(FileLongName, 'StripByteCounts') as StripByteCounts,
    Attribute(FileLongName, 'XResolution') as XResolution,
    Attribute(FileLongName, 'YResolution') as YResolution,
    Attribute(FileLongName, 'PlanarConfiguration') as PlanarConfiguration,
    //  examples: 1=chunky format, 2=planar format,
    Attribute(FileLongName, 'ResolutionUnit') as ResolutionUnit,
    //  examples: 1=none, 2=inches, 3=centimeters,
    Attribute(FileLongName, 'TransferFunction') as TransferFunction,
    Attribute(FileLongName, 'Software') as Software,
    Attribute(FileLongName, 'DateTime') as DateTime,
    Attribute(FileLongName, 'Artist') as Artist,
    Attribute(FileLongName, 'HostComputer') as HostComputer,
    Attribute(FileLongName, 'WhitePoint') as WhitePoint,
    Attribute(FileLongName, 'PrimaryChromaticities') as PrimaryChromaticities,
    Attribute(FileLongName, 'YCbCrCoefficients') as YCbCrCoefficients,
    Attribute(FileLongName, 'YCbCrSubSampling') as YCbCrSubSampling,
    Attribute(FileLongName, 'YCbCrPositioning') as YCbCrPositioning,
    //  examples: 1=centered, 2=co-sited,
    Attribute(FileLongName, 'ReferenceBlackWhite') as ReferenceBlackWhite,
    Attribute(FileLongName, 'Rating') as Rating,
    Attribute(FileLongName, 'RatingPercent') as RatingPercent,
    Attribute(FileLongName, 'ThumbnailFormat') as ThumbnailFormat,
    //  examples: 0=Raw Rgb, 1=Jpeg,
    Attribute(FileLongName, 'Copyright') as Copyright,
    Attribute(FileLongName, 'ExposureTime') as ExposureTime,
    Attribute(FileLongName, 'FNumber') as FNumber,
    Attribute(FileLongName, 'ExposureProgram') as ExposureProgram,
    //  examples: 0=Not defined, 1=Manual, 2=Normal program, 3=Aperture priority, 4=Shutter priority,
    // 5=Creative program, 6=Action program, 7=Portrait mode, 8=Landscape mode, 9=Bulb,
    Attribute(FileLongName, 'ISOSpeedRatings') as ISOSpeedRatings,
    Attribute(FileLongName, 'TimeZoneOffset') as TimeZoneOffset,
    Attribute(FileLongName, 'SensitivityType') as SensitivityType,
    //  examples: 0=Unknown, 1=Standard output sensitivity (SOS), 2=Recommended exposure index (REI),
    // 3=ISO speed, 4=Standard output sensitivity (SOS) and Recommended exposure index (REI),
    //5=Standard output sensitivity (SOS) and ISO Speed, 6=Recommended exposure index (REI) and ISO Speed,
    // 7=Standard output sensitivity (SOS) and Recommended exposure index (REI) and ISO speed,
    Attribute(FileLongName, 'ExifVersion') as ExifVersion,
    Attribute(FileLongName, 'DateTimeOriginal') as DateTimeOriginal,
    Attribute(FileLongName, 'DateTimeDigitized') as DateTimeDigitized,
    Attribute(FileLongName, 'ComponentsConfiguration') as ComponentsConfiguration,
    //  examples: 1=Y, 2=Cb, 3=Cr, 4=R, 5=G, 6=B,
    Attribute(FileLongName, 'CompressedBitsPerPixel') as CompressedBitsPerPixel,
    Attribute(FileLongName, 'ShutterSpeedValue') as ShutterSpeedValue,
    Attribute(FileLongName, 'ApertureValue') as ApertureValue,
    Attribute(FileLongName, 'BrightnessValue') as BrightnessValue, //  examples: -1=Unknown,
    Attribute(FileLongName, 'ExposureBiasValue') as ExposureBiasValue,
    Attribute(FileLongName, 'MaxApertureValue') as MaxApertureValue,
    Attribute(FileLongName, 'SubjectDistance') as SubjectDistance,
    //  examples: 0=Unknown, -1=Infinity,
    Attribute(FileLongName, 'MeteringMode') as MeteringMode,
    //  examples: 0=Unknown, 1=Average, 2=CenterWeightedAverage, 3=Spot,
    // 4=MultiSpot, 5=Pattern, 6=Partial, 255=Other,
    Attribute(FileLongName, 'LightSource') as LightSource,
    //  examples: 0=Unknown, 1=Daylight, 2=Fluorescent, 3=Tungsten, 4=Flash, 9=Fine weather,
    // 10=Cloudy weather, 11=Shade, 12=Daylight fluorescent,
    // 13=Day white fluorescent, 14=Cool white fluorescent,
    // 15=White fluorescent, 17=Standard light A, 18=Standard light B, 19=Standard light C,
    // 20=D55, 21=D65, 22=D75, 23=D50, 24=ISO studio tungsten, 255=other light source,
    Attribute(FileLongName, 'Flash') as Flash,
    Attribute(FileLongName, 'FocalLength') as FocalLength,
    Attribute(FileLongName, 'SubjectArea') as SubjectArea,
    Attribute(FileLongName, 'MakerNote') as MakerNote,
    Attribute(FileLongName, 'UserComment') as UserComment,
    Attribute(FileLongName, 'SubSecTime') as SubSecTime,

    Attribute(FileLongName, 'SubsecTimeOriginal') as SubsecTimeOriginal,
    Attribute(FileLongName, 'SubsecTimeDigitized') as SubsecTimeDigitized,
    Attribute(FileLongName, 'XPTitle') as XPTitle,
    Attribute(FileLongName, 'XPComment') as XPComment,

    Attribute(FileLongName, 'XPAuthor') as XPAuthor,
    Attribute(FileLongName, 'XPKeywords') as XPKeywords,
    Attribute(FileLongName, 'XPSubject') as XPSubject,
    Attribute(FileLongName, 'FlashpixVersion') as FlashpixVersion,
    Attribute(FileLongName, 'ColorSpace') as ColorSpace, //  examples: 1=sRGB, 65535=Uncalibrated,
    Attribute(FileLongName, 'PixelXDimension') as PixelXDimension,
    Attribute(FileLongName, 'PixelYDimension') as PixelYDimension,
    Attribute(FileLongName, 'RelatedSoundFile') as RelatedSoundFile,

    Attribute(FileLongName, 'FocalPlaneXResolution') as FocalPlaneXResolution,
    Attribute(FileLongName, 'FocalPlaneYResolution') as FocalPlaneYResolution,
    Attribute(FileLongName, 'FocalPlaneResolutionUnit') as FocalPlaneResolutionUnit,
    //  examples: 1=None, 2=Inch, 3=Centimeter,
    Attribute(FileLongName, 'ExposureIndex') as ExposureIndex,
    Attribute(FileLongName, 'SensingMethod') as SensingMethod,
    //  examples: 1=Not defined, 2=One-chip color area sensor, 3=Two-chip color area sensor,
    // 4=Three-chip color area sensor, 5=Color sequential area sensor,
    // 7=Trilinear sensor, 8=Color sequential linear sensor,
    Attribute(FileLongName, 'FileSource') as FileSource,
    //  examples: 0=Other, 1=Scanner of transparent type,
    // 2=Scanner of reflex type, 3=Digital still camera,
    Attribute(FileLongName, 'SceneType') as SceneType,
    //  examples: 1=A directly photographed image,
    Attribute(FileLongName, 'CFAPattern') as CFAPattern,
    Attribute(FileLongName, 'CustomRendered') as CustomRendered,
    //  examples: 0=Normal process, 1=Custom process,
    Attribute(FileLongName, 'ExposureMode') as ExposureMode,
    //  examples: 0=Auto exposure, 1=Manual exposure, 2=Auto bracket,
    Attribute(FileLongName, 'WhiteBalance') as WhiteBalance,
    //  examples: 0=Auto white balance, 1=Manual white balance,
    Attribute(FileLongName, 'DigitalZoomRatio') as DigitalZoomRatio,
    Attribute(FileLongName, 'FocalLengthIn35mmFilm') as FocalLengthIn35mmFilm,
    Attribute(FileLongName, 'SceneCaptureType') as SceneCaptureType,
    //  examples: 0=Standard, 1=Landscape, 2=Portrait, 3=Night scene,
    Attribute(FileLongName, 'GainControl') as GainControl,
    //  examples: 0=None, 1=Low gain up, 2=High gain up, 3=Low gain down, 4=High gain down,
    Attribute(FileLongName, 'Contrast') as Contrast,
    //  examples: 0=Normal, 1=Soft, 2=Hard,
    Attribute(FileLongName, 'Saturation') as Saturation,
    //  examples: 0=Normal, 1=Low saturation, 2=High saturation,
    Attribute(FileLongName, 'Sharpness') as Sharpness,
    //  examples: 0=Normal, 1=Soft, 2=Hard,
    Attribute(FileLongName, 'SubjectDistanceRange') as SubjectDistanceRange,
    //  examples: 0=Unknown, 1=Macro, 2=Close view, 3=Distant view,
    Attribute(FileLongName, 'ImageUniqueID') as ImageUniqueID,
    Attribute(FileLongName, 'BodySerialNumber') as BodySerialNumber,
    Attribute(FileLongName, 'CMNT_GAMMA') as CMNT_GAMMA,
    Attribute(FileLongName, 'PrintImageMatching') as PrintImageMatching,
    Attribute(FileLongName, 'OffsetSchema') as OffsetSchema,

    // ************   Interoperability Attributes   ************
    Attribute(FileLongName, 'InteroperabilityIndex') as InteroperabilityIndex,
    Attribute(FileLongName, 'InteroperabilityVersion') as InteroperabilityVersion,
    Attribute(FileLongName, 'InteroperabilityRelatedImageFileFormat') as InteroperabilityRelatedImageFileFormat,
    Attribute(FileLongName, 'InteroperabilityRelatedImageWidth') as InteroperabilityRelatedImageWidth,
    Attribute(FileLongName, 'InteroperabilityRelatedImageLength') as InteroperabilityRelatedImageLength,
    Attribute(FileLongName, 'InteroperabilityColorSpace') as InteroperabilityColorSpace,
    //  examples: 1=sRGB, 65535=Uncalibrated,
    Attribute(FileLongName, 'InteroperabilityPrintImageMatching') as InteroperabilityPrintImageMatching,
    // ************   GPS Attributes   ************
    Attribute(FileLongName, 'GPSVersionID') as GPSVersionID,
    Attribute(FileLongName, 'GPSLatitudeRef') as GPSLatitudeRef,
    Attribute(FileLongName, 'GPSLatitude') as GPSLatitude,
    Attribute(FileLongName, 'GPSLongitudeRef') as GPSLongitudeRef,
    Attribute(FileLongName, 'GPSLongitude') as GPSLongitude,
    Attribute(FileLongName, 'GPSAltitudeRef') as GPSAltitudeRef,
    //  examples: 0=Above sea level, 1=Below sea level,
    Attribute(FileLongName, 'GPSAltitude') as GPSAltitude,
    Attribute(FileLongName, 'GPSTimeStamp') as GPSTimeStamp,
    Attribute(FileLongName, 'GPSSatellites') as GPSSatellites,
    Attribute(FileLongName, 'GPSStatus') as GPSStatus,
    Attribute(FileLongName, 'GPSMeasureMode') as GPSMeasureMode,
    Attribute(FileLongName, 'GPSDOP') as GPSDOP,
    Attribute(FileLongName, 'GPSSpeedRef') as GPSSpeedRef,

    Attribute(FileLongName, 'GPSSpeed') as GPSSpeed,
    Attribute(FileLongName, 'GPSTrackRef') as GPSTrackRef,
    Attribute(FileLongName, 'GPSTrack') as GPSTrack,
    Attribute(FileLongName, 'GPSImgDirectionRef') as GPSImgDirectionRef,
    Attribute(FileLongName, 'GPSImgDirection') as GPSImgDirection,
    Attribute(FileLongName, 'GPSMapDatum') as GPSMapDatum,
    Attribute(FileLongName, 'GPSDestLatitudeRef') as GPSDestLatitudeRef,

    Attribute(FileLongName, 'GPSDestLatitude') as GPSDestLatitude,
    Attribute(FileLongName, 'GPSDestLongitudeRef') as GPSDestLongitudeRef,
    Attribute(FileLongName, 'GPSDestLongitude') as GPSDestLongitude,
    Attribute(FileLongName, 'GPSDestBearingRef') as GPSDestBearingRef,
    Attribute(FileLongName, 'GPSDestBearing') as GPSDestBearing,
    Attribute(FileLongName, 'GPSDestDistanceRef') as GPSDestDistanceRef,

    Attribute(FileLongName, 'GPSDestDistance') as GPSDestDistance,
    Attribute(FileLongName, 'GPSProcessingMethod') as GPSProcessingMethod,
    Attribute(FileLongName, 'GPSAreaInformation') as GPSAreaInformation,
    Attribute(FileLongName, 'GPSDateStamp') as GPSDateStamp,
    Attribute(FileLongName, 'GPSDifferential') as GPSDifferential;
    //  examples: 0=No correction, 1=Differential correction,
LOAD @1:n as FileLongName Inline "$(vFoundFile)" (fix, no labels);
Next vFoundFile
Next vExt
```

**Example Windows media files files**
This script reads all possible WMA/WMV ASF meta tags in folder MyMusic.

```code
/ Script to read WMA/WMV ASF meta tags
for each vExt in 'asf', 'wma', 'wmv'
for each vFoundFile in filelist( GetFolderPath('MyMusic') & '\*.'& vExt )

FileList:
LOAD FileLongName,
    subfield(FileLongName,'\',-1) as FileShortName,
    num(FileSize(FileLongName),'# ### ### ###',',',' ') as FileSize,
    FileTime(FileLongName) as FileTime,
    Attribute(FileLongName, 'Title') as Title,
    Attribute(FileLongName, 'Author') as Author,
    Attribute(FileLongName, 'Copyright') as Copyright,
    Attribute(FileLongName, 'Description') as Description,

    Attribute(FileLongName, 'Rating') as Rating,
    Attribute(FileLongName, 'PlayDuration') as PlayDuration,
    Attribute(FileLongName, 'MaximumBitrate') as MaximumBitrate,
    Attribute(FileLongName, 'WMFSDKVersion') as WMFSDKVersion,
    Attribute(FileLongName, 'WMFSDKNeeded') as WMFSDKNeeded,
    Attribute(FileLongName, 'IsVBR') as IsVBR,
    Attribute(FileLongName, 'ASFLeakyBucketPairs') as ASFLeakyBucketPairs,

    Attribute(FileLongName, 'PeakValue') as PeakValue,
    Attribute(FileLongName, 'AverageLevel') as AverageLevel;
LOAD @1:n as FileLongName Inline "$(vFoundFile)" (fix, no labels);
Next vFoundFile
Next vExt

```

**Example PNG files**
This script reads all possible PNG meta tags in folder MyPictures.

```code
// Script to read PNG meta tags
for each vExt in 'png'
for each vFoundFile in filelist( GetFolderPath('MyPictures') & '\*.'& vExt )

FileList:
LOAD FileLongName,
    subfield(FileLongName,'\',-1) as FileShortName,
    num(FileSize(FileLongName),'# ### ### ###',',',' ') as FileSize,
    FileTime(FileLongName) as FileTime,
    Attribute(FileLongName, 'Comment') as Comment,

    Attribute(FileLongName, 'Creation Time') as Creation_Time,
    Attribute(FileLongName, 'Source') as Source,
    Attribute(FileLongName, 'Title') as Title,
    Attribute(FileLongName, 'Software') as Software,
    Attribute(FileLongName, 'Author') as Author,
    Attribute(FileLongName, 'Description') as Description,

    Attribute(FileLongName, 'Copyright') as Copyright;
LOAD @1:n as FileLongName Inline "$(vFoundFile)" (fix, no labels);
Next vFoundFile
Next vExt
```

## ConnectString

The ConnectString() function returns the name of the active data connection for
ODBC or OLE DB connections. The function returns an empty string if no connect
statement has been executed, or after a disconnect statement.

`ConnectString( )`

| Example | Result |
| ------- | ------ |
| LIB CONNECT TO 'Tutorial ODBC';<BR>ConnectString:<BR>Load ConnectString() as ConnectString AutoGenerate 1; | Returns 'Tutorial ODBC' in field ConnectString.<BR>This examples assumes that you have an available data connection called Tutorial ODBC. |

## FileBaseName

The FileBaseName function returns a string containing the name of the table file
currently being read, without path or extension.

`FileBaseName( )`

| Example | Result |
| ------- | ------ |
| LOAD *, filebasename( ) as X from<BR>C:\UserFiles\abc.txt | Will return 'abc' in field X in each record read. |

## FileDir

The FileDir function returns a string containing the path to the directory of the
table file currently being read.

`FileDir( )`

| Example | Result |
| ------- | ------ |
| Load *, filedir( ) as X from<BR>C:\UserFiles\abc.txt | Will return 'C:\UserFiles' in field X in each record read. |

## FileExtension

The FileExtension function returns a string containing the extension of the
table file currently being read.

`FileExtension( )`

| Example | Result |
| ------- | ------ |
| LOAD *, FileExtension( ) as X from<BR>C:\UserFiles\abc.txt | Will return 'txt' in field X in each record read. |

## FileName

The FileName function returns a string containing the name of the table file
currently being read, without path but including the extension.

`FileName( )`

| Example | Result |
| ------- | ------ |
| LOAD *, FileName( ) as X from<BR>C:\UserFiles\abc.txt | Will return 'abc.txt' in field X in each record read. |

## FilePath

The FilePath function returns a string containing the full path to the table file
currently being read.

`FilePath( )`

This function supports only folder data connections in standard mode.
See *File system access restriction*

| Example | Result |
| ------- | ------ |
| Load *, FilePath( ) as X from<BR>C:\UserFiles\abc.txt | Will return 'C:\UserFiles\abc.txt' in field X in each record read. |

## FileSize

The FileSize function returns an integer containing the size in bytes of the file
filename or, if no filename is specified, of the table file currently
being read.

`FileSize( [filename] )`

| Argument | Description |
| -------- | ----------- |
| filename | The name of a file, if necessary including path, as a folder or web file data connection. If you don't specify a file name, the table file currently being read is used.<BR>Example: 'lib://Table Files/'<BR>In legacy scripting mode, the following path formats are also supported:<BR>- absolute: Example: c:\data\ <BR>- relative to the app working directory: Example: data\ <BR>- URL address (HTTP or FTP), pointing to a location on the Internet or an intranet: Example: `https://www.qlik.com` |

<BR>

| Example                                 | Result                                                         |
| --------------------------------------- |--------------------------------------------------------------- |
| LOAD *, FileSize( ) as X from abc.txt;  | Will return the size of the specified file (abc.txt) as an integer in field X in each record read. |
| FileSize( 'lib://MyData/xyz.xls' )      | Will return the size of the file xyz.xls.|

## FileTime

The FileTime function returns a timestamp for the date and time of the last
modification of the file filename. If no filename is specified, the
function will refer to the currently read table file.

`FileTime( [filename] )`

| Argument | Description |
| -------- | ----------- |
| filename | The name of a file, if necessary including path, as a folder or web file data connection. If you don't specify a file name, the table file currently being read is used.<BR>Example: 'lib://Table Files/'<BR>In legacy scripting mode, the following path formats are also supported:<BR>- absolute: Example: c:\data\ <BR>- relative to the app working directory: Example: data\ <BR>- URL address (HTTP or FTP), pointing to a location on the Internet or an intranet: Example: `https://www.qlik.com` |

<BR>

| Example| Result|
| --------------------------------------- | -------------------------------------------------------------------- |
| LOAD *, FileTime( ) as X from abc.txt;  | Will return the date and time of the last modification of the file (abc.txt) as a timestamp in field X in each record read. |
| FileTime( 'xyz.xls' )                   | Will return the timestamp of the last modification of the file xyz.xls.|

## GetFolderPath

The GetFolderPath function returns the value of the Microsoft Windows SHGetFolderPath
function. This function takes as input the name of a Microsoft Windows folder and
returns the full path of the folder.

This function is not supported in standard mode.

`GetFolderPath( foldername )`

| Argument | Description |
| -------- | ----------- |
| foldername | Name of the Microsoft Windows folder.<BR>The folder name should not contain any space. Any space in the folder name seen in Windows Explorer should be removed from the folder name.<BR>Examples:<BR>- MyMusic<BR>- MyDocuments |

The goal of this example is to get the paths of the following Microsoft
Windows folders:
MyMusic,
MyPictures and
Windows.
Add the example script to your app and reload
it.

```code
LOAD
    GetFolderPath('MyMusic') as MyMusic,
    GetFolderPath('MyPictures') as MyPictures,
    GetFolderPath('Windows') as Windows
AutoGenerate 1;
```

Once the app is reloaded, the fields MyMusic, MyPictures and Windows are added
to the data model. Each field contains the path to the folder defined in input.
For example:

- C:\Users\smu\Music for the folder
- C:\Users\smu\Pictures for the folder
- C:\Windows for the folder Windows

## QvdCreateTime

This script function returns the XML-header time stamp from a QVD file,
if any is present, otherwise it returns NULL.

`QvdCreateTime( filename )`

| Argument | Description |
| -------- | ----------- |
| filename | The name of a QVD file, if necessary including path, as a folder or web file data connection.<BR>Example: 'lib://Table Files/'<BR>In legacy scripting mode, the following path formats are also supported:<BR>- absolute: Example: c:\data\ <BR>- relative to the app working directory: Example: data\ <BR>- URL address (HTTP or FTP), pointing to a location on the Internet or an intranet: Example: `https://www.qlik.com` |

QvdCreateTime('MyFile.qvd')

QvdCreateTime('C:\\MyDir\\MyFile.qvd')

QvdCreateTime('lib://data\\MyFile.qvd')

## QvdFieldName

This script function returns the name of field number **fieldno**, if it exists in a QVD file (otherwise
NULL).

`QvdFieldName( filename , fieldno )`

| Argument | Description |
| -------- | ----------- |
| filename | The name of a QVD file, if necessary including path, as a folder or web file data connection.<BR>Example: 'lib://Table Files/'<BR>In legacy scripting mode, the following path formats are also supported:<BR>- absolute: Example: c:\data\ <BR>- relative to the app working directory: Example: data\ <BR>- URL address (HTTP or FTP), pointing to a location on the Internet or an intranet: Example: `https://www.qlik.com` |

**Examples:**

QvdFieldName ('MyFile.qvd', 3)

QvdFieldName ('C:\\MyDir\\MyFile.qvd', 5)

QvdFieldName ('lib://data\\MyFile.qvd',5)

## QvdNoOfFields

This script function returns the number of fields in a QVD file.

`QvdNoOfFields( filename )`

| Argument | Description |
| -------- | ----------- |
| filename | The name of a QVD file, if necessary including path, as a folder or web file data connection.<BR>Example: 'lib://Table Files/'<BR>In legacy scripting mode, the following path formats are also supported:<BR>- absolute: Example: c:\data\ <BR>- relative to the app working directory: Example: data\ <BR>- URL address (HTTP or FTP), pointing to a location on the Internet or an intranet: Example: `https://www.qlik.com` |

**Examples:**

QvdNoOfFields ('MyFile.qvd')

QvdNoOfFields ('C:\\MyDir\\MyFile.qvd')

QvdNoOfFields ('lib://data\\MyFile.qvd')

## QvdNoOfRecords

This script function returns the number of records currently in a QVD file.

`QvdNoOfRecords( filename )`

| Argument | Description |
| -------- | ----------- |
| filename | The name of a QVD file, if necessary including path, as a folder or web file data connection.<BR>Example: 'lib://Table Files/'<BR>In legacy scripting mode, the following path formats are also supported:<BR>- absolute: Example: c:\data\ <BR>- relative to the app working directory: Example: data\ <BR>- URL address (HTTP or FTP), pointing to a location on the Internet or an intranet: Example: `https://www.qlik.com` |

**Examples:**

QvdNoOfRecords ('MyFile.qvd')

QvdNoOfRecords ('C:\\MyDir\\MyFile.qvd')

QvdNoOfRecords ('lib://data\\MyFile.qvd')

## QvdTableName

This script function returns the name of the table stored in a QVD file.

`QvdTableName( filename )`

| Argument | Description |
| -------- | ----------- |
| filename | The name of a QVD file, if necessary including path, as a folder or web file data connection.<BR>Example: 'lib://Table Files/'<BR>In legacy scripting mode, the following path formats are also supported:<BR>- absolute: Example: c:\data\ <BR>- relative to the app working directory: Example: data\ <BR>- URL address (HTTP or FTP), pointing to a location on the Internet or an intranet: Example: `https://www.qlik.com` |

**Examples:**

QvdTableName ('MyFile.qvd')

QvdTableName ('C:\\MyDir\\MyFile.qvd')

QvdTableName ('lib://data\\MyFile.qvd')
