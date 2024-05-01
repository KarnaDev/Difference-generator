### Hexlet tests and linter status:
[![Actions Status](https://github.com/KarnaDev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/KarnaDev/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/da0e8f92d87fbec926c2/maintainability)](https://codeclimate.com/github/KarnaDev/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/da0e8f92d87fbec926c2/test_coverage)](https://codeclimate.com/github/KarnaDev/frontend-project-46/test_coverage)

---

### Description:
The console utility developed as a JavaScript student project. The difference generator is a program for identifying variances between two data structures. Such tools are frequently used for test output and automated tracking of configuration file alterations.

**Key features of the utility:**
* Compatibility with different input formats such as YML and JSON
* Generation of reports in plain text, stylish, and JSON formats

---

### Dependencies:
**dependencies:**
* commander
* lodash
* js-yaml

---

**devDependencies:**
* eslint
* eslint-config-airbnb-base
* eslint-plugin-import

---

### Setup:
```
git clone git@github.com:KarnaDev/frontend-project-46.git
```
```
sudo apt install make
```
```
make install
```

---

### Usage:
1. Help:

        gendiff -h
        Usage: gendiff [options] <filepath1> <filepath2> 

        Compares two configuration files and shows a difference.

        Options:
          -V, --version        output the version number
          -f, --format [type]  output format (default: "stylish")
          -h, --help           display help for command

2. Stylish formatter (default option):

        gendiff path/to/file path/to/another/file

        {
            common: {
              + follow: false
                setting1: Value 1
              - setting2: 200
              - setting3: true
              + setting3: null
              + setting4: blah blah
              + setting5: {
                    key5: value5
                }
            }
        }


3. Plain formatter:

        gendiff -f plain path/to/file path/to/another/file

        Property 'common.follow' was added with value: false
        Property 'common.setting2' was removed
        Property 'common.setting3' was updated. From true to null
        Property 'common.setting4' was added with value: 'blah blah'
        Property 'common.setting5' was added with value: [complex value]


4. JSON formatter:

        gendiff -f json path/to/file path/to/another/file

        {
          "common": {
            "type": "nested",
            "children": {
              "follow": {
                "type": "added",
                "value": false
              },
              "setting1": {
                "type": "unchanged",
                "value": "Value 1"
              },
              "setting2": {
                "type": "deleted",
                "value": 200
              },       
            }
          }
        }

---

### Demonstraion:
1. Stylish formatter:
[![asciicast](https://asciinema.org/a/654154.svg)](https://asciinema.org/a/654154)

2. Plain formatter:
[![asciicast](https://asciinema.org/a/657220.svg)](https://asciinema.org/a/657220)

3. JSON formatter:
[![asciicast](https://asciinema.org/a/657219.svg)](https://asciinema.org/a/657219)