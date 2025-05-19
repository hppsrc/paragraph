# Paragraph Text Document (.ptd) File Format Specification

***Specification Version: 002***

***Version: 1.1 alpha***

---

This document outlines the specification for the Paragraph Text Document (.ptd) file format, designed for use with the Paragraph text editor application.

A .ptd file is a ZIP archive containing the following internal components:

1. meta.json:  Stores metadata about the document in JSON format.
2. document.json: Stores the main document content and formatting in JSON format.

---

## meta.json (Metadata File)

**Format**: JSON.

**Purpose**: Contains descriptive metadata about the Paragraph Text Document. This information is intended for document management, versioning, and application-specific settings.

### Current Fields

#### documentTitle (String)

The user-defined title of the document

Example:

``` plain
My Important Report
```

#### ptdSPCVersion (Number)

File structure specification version number.

Example:

``` plain
123
```

>[!NOTE]
> This field denotes the version of the file structure specification, independent of the user-visible format version. It should be incremented whenever there are changes to the internal file structure to ensure proper compatibility and parsing

#### ptdFormatVersion (Number)

Version number of the .ptd file format specification.

Example:

``` plain
1.0
```

#### ptdTypeVersion (String)

Indicates the development stage of the Paragraph File itself.

Example:

``` plain
alpha

beta

stable
```

### Future Fields (to be considered for future versions)

#### author (String)

Name of the document author.

Example:

``` plain
Hppsrc
```

#### creationDate (String)

Date and time when the document was initially created.

Example:

``` plain
2025-01-01 01:00:00
```

#### modificationDate (String)

Date and time of the last document modification (save operation).

Example:

``` plain
2025-02-03 04:00:00
```

#### documentVersion (Integer)

Counter that increments each time the document is loaded into the Paragraph editor and subsequently saved. This tracks the number of "editing sessions" rather than every single save operation. The counter should increment by one upon each load-and-save cycle.

Example:

``` plain
5
```

>[!NOTE]
>Starts at 1 for a new document. Increments to 2 after the first load and save, then to 3 after the next load and save, and so on. Example: If the doc is load and save multiple times it only counts add 1

### Example JSON structure for current meta.json specification

```json
{
    "documentTitle": "My Presentation File",
    "ptdSPCVersion": "002",
    "ptdFormatVersion": "1.1",
    "ptdTypeVersion": "alpha"
}
```

### Example JSON structure for future meta.json specification

```json
{
    "documentTitle": "My Presentation File",
    "ptdSPCVersion": "123",
    "ptdFormatVersion": "1.2",
    "ptdTypeVersion": "stable",
    "author": "Hppsrc",
    "creationDate": "2025-01-01 01:00:00",
    "modificationDate": "2025-02-03 2:00:00",
    "documentVersion": 5
}
```

>[!NOTE]
>May not represent future formats exactly.

---

## document.json (Document Content File)

*Format*: JSON.

*Purpose*: Contains the primary content of the Paragraph Text Document, including:

- Textual content itself.
- Text formatting (e.g., bold, italics, font styles, sizes, colors).
- Document structure (e.g., paragraphs, headings, lists).
- Potentially, in future versions, references to embedded media.

### Current Fields

#### content (String)

String containing the entire contents of the file.

Example:

``` plain
My content.
```

### Example JSON structure for current document.json specification

```json
{
    "content":"My content."
}
```

### Example JSON structure for future document.json specification

```json
{

    "body": {

        "content": [

            {
                "type": "paragraph",
                "style": "normal",
                "content": [
                    "This is the first ",
                    { "type": "bold", "content": "paragraph" },
                    " of the document."
                ]
            },

            {
                "type": "paragraph",
                "style": "normal",
                "content": [
                    "Here is another paragraph with ",
                    { "type": "italic", "content": "italicized" },
                    " text."
                ]
            },

            {
                "type": "image",
                "position": "block",
                "info": [
                    "name" :  "my_image.png",
                    "w" : "120px",
                    "h" : "120px",
                ]
            }

        ]

    }

}
```

>[!NOTE]
>May not represent future formats exactly.
