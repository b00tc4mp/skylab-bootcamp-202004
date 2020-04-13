# Shortcuts

Rename variables/params (safe command): must be used in the first param with that name

```sh
    $ Windows: (Fn +) F2 
    $ Linux: F2
    $ Mac: Cmd + Option + F
```

Rename variables/params: find next ocurrence with same typing

```sh
    $ Windows: Ctrl + D
    $ Mac: Cmd + D
```

Rename variables/params: find all ocurrence with same typing (unsafe)

```sh
    $ Windows: Ctrl + (Fn) + F2
    $ Linuc: Ctrl + F2
    $ Mac: Cmd + Shift + L
```

Select "scope" textblocks

```sh
    $ Windows??: (Alt/Ctrl) + Shift + <-/->
    $ Mac: Option + Shift + <-/->
```

Select full line

```sh
    $ Windows: Ctrl + L
    $ Mac: Cmd + L
```

Move full line

```sh
    $ Windows: Alt + Up/Down
    $ Mac: Option + Up/Down
```

Delete textblocks based on their "scope"

```sh
    $ Windows: Ctrl + Supr
    $ Mac: Option + Fn + Delete
```

Delete full line, including the upcoming empty space

```sh
    $ Windows: Alt + Supr
```

Close all tags from VSCode

```sh
    $ Windows: Ctrl + K + ... + W
```

Comment block of code (many ways, each with their specificities)

```
    $ Alt + Shift + A
    $ Ctrl + K + ... + C
    $ Ctrl + Shift + 7
    $ Ctrl + Ç
    $ Mac: Option + Shift + A
```

Select all text

```
    $ Windows: Ctrl + A
    $ Mac: Cmd + A
```

Formatting the text (blessed command!)

```sh
    $ Windows: Alt + Shift + F
    $ Mac: Option + Shift + F
```


Tabulate on/off

```sh
    $ Tab / Shift + Tab
```

Open/Close Editor Window

```sh
    $ Windows: Ctrl + B
    $ Mac: Cmd + B
```
# Snippets

## HTML

Create basic HTML tree

```sh
    $ !
    $ html:5
```

Auto Link CSS 

```sh
    $ link:css
```

Auto Link JS

```sh
    $ source:src
```

Auto class

```sh
    $ .<class> + Tab
```

Auto id

```sh
    $ '#'<class> + Tab
```

Custom Snippets: File --> Preferences --> User Snippets --> Global Custom Snippet

```sh
{
	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:
	"Creates a basic for structure": {
		"scope": "javascript,typescript",
		"prefix": "For",
		"body": [
			"for (var i = 0; i < $1.length; i++) {\n\t$2\n};$3"
		],
		"description": "Creates a basic for structure"
	}
}
```