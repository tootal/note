# pandoc生成pdf
[参考](https://github.com/phodal/ebook-boilerplate)
还是先尝试一下能不能把原来的修好。

[官网的教程](https://pandoc.org/getting-started.html)非常详细，甚至有如何使用命令行的教程。

## 修复note
把python链接到python3

## pandoc基础
### 命令行转换

```cmd
PS C:\Users\tootal> pandoc --version
pandoc.exe 2.11.2
Compiled with pandoc-types 1.22, texmath 0.12.0.3, skylighting 0.10.0.3,
citeproc 0.2, ipynb 0.1
User data directory: C:\Users\tootal\AppData\Roaming\pandoc
warranty, not even for merchantability or fitness for a particular purpose.
PS C:\Users\tootal> pwd

Path
----
C:\Users\tootal

PS C:\Users\tootal> cd .\Documents\
PS C:\Users\tootal\Documents> pwd

Path
----
C:\Users\tootal\Documents


PS C:\Users\tootal\Documents> mkdir pandoc-test

    Directory: C:\Users\tootal\Documents


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        12/12/2020  11:19 AM                pandoc-test


PS C:\Users\tootal\Documents> cd .\pandoc-test\
PS C:\Users\tootal\Documents\pandoc-test> pwd

Path
----
C:\Users\tootal\Documents\pandoc-test


PS C:\Users\tootal\Documents\pandoc-test> pandoc
Hello *pandoc*!

- one
- two
^Z
<p>Hello <em>pandoc</em>!</p>
<ul>
<li>one</li>
<li>two</li>
</ul>
PS C:\Users\tootal\Documents\pandoc-test> pandoc -f html -t markdown
<p>Hello <em>pandoc</em>!</p>
^Z
Hello *pandoc*!
```

### 文件转换

```cmd
PS C:\Users\tootal\Documents\pandoc-test> vi test1.md                                                                   PS C:\Users\tootal\Documents\pandoc-test> ls


    Directory: C:\Users\tootal\Documents\pandoc-test


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        12/12/2020  11:22 AM            523 .test1.md.un~
-a----        12/12/2020  11:22 AM             93 test1.md
-a----        12/12/2020  11:22 AM             93 test1.md~

PS C:\Users\tootal\Documents\pandoc-test> cat .\test1.md
---
title: Test
---

# Test!

This is a test of *pandoc*.

- list one
- list two

PS C:\Users\tootal\Documents\pandoc-test> pandoc .\test1.md -f markdown -t html -s -o test1.html
PS C:\Users\tootal\Documents\pandoc-test> ls


    Directory: C:\Users\tootal\Documents\pandoc-test


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----        12/12/2020  11:22 AM            523 .test1.md.un~
-a----        12/12/2020  11:23 AM           3713 test1.html
-a----        12/12/2020  11:22 AM             93 test1.md
-a----        12/12/2020  11:22 AM             93 test1.md~


PS C:\Users\tootal\Documents\pandoc-test> start .\test1.html
```

### filters

[官方文档](https://pandoc.org/filters.html)

Json格式的AST：

```json
PS C:\Users\tootal\Documents\pandoc-test> pandoc -s .\test1.md -t json
{"pandoc-api-version":[1,22],"meta":{"title":{"t":"MetaInlines","c":[{"t":"Str","c":"Test"}]}},"blocks":[{"t":"Header","c":[1,["test",[],[]],[{"t":"Str","c":"Test!"}]]},{"t":"Para","c":[{"t":"Str","c":"This"},{"t":"Space"},{"t":"Str","c":"is"},{"t":"Space"},{"t":"Str","c":"a"},{"t":"Space"},{"t":"Str","c":"test"},{"t":"Space"},{"t":"Str","c":"of"},{"t":"Space"},{"t":"Emph","c":[{"t":"Str","c":"pandoc"}]},{"t":"Str","c":"."}]},{"t":"BulletList","c":[[{"t":"Plain","c":[{"t":"Str","c":"list"},{"t":"Space"},{"t":"Str","c":"one"}]}],[{"t":"Plain","c":[{"t":"Str","c":"list"},{"t":"Space"},{"t":"Str","c":"two"}]}]]}]}
```

格式化后：

```json
{
    "pandoc-api-version": [
        1,
        22
    ],
    "meta": {
        "title": {
            "t": "MetaInlines",
            "c": [
                {
                    "t": "Str",
                    "c": "Test"
                }
            ]
        }
    },
    "blocks": [
        {
            "t": "Header",
            "c": [
                1,
                [
                    "test",
                    [],
                    []
                ],
                [
                    {
                        "t": "Str",
                        "c": "Test!"
                    }
                ]
            ]
        },
        {
            "t": "Para",
            "c": [
                {
                    "t": "Str",
                    "c": "This"
                },
                {
                    "t": "Space"
                },
                {
                    "t": "Str",
                    "c": "is"
                },
                {
                    "t": "Space"
                },
                {
                    "t": "Str",
                    "c": "a"
                },
                {
                    "t": "Space"
                },
                {
                    "t": "Str",
                    "c": "test"
                },
                {
                    "t": "Space"
                },
                {
                    "t": "Str",
                    "c": "of"
                },
                {
                    "t": "Space"
                },
                {
                    "t": "Emph",
                    "c": [
                        {
                            "t": "Str",
                            "c": "pandoc"
                        }
                    ]
                },
                {
                    "t": "Str",
                    "c": "."
                }
            ]
        },
        {
            "t": "BulletList",
            "c": [
                [
                    {
                        "t": "Plain",
                        "c": [
                            {
                                "t": "Str",
                                "c": "list"
                            },
                            {
                                "t": "Space"
                            },
                            {
                                "t": "Str",
                                "c": "one"
                            }
                        ]
                    }
                ],
                [
                    {
                        "t": "Plain",
                        "c": [
                            {
                                "t": "Str",
                                "c": "list"
                            },
                            {
                                "t": "Space"
                            },
                            {
                                "t": "Str",
                                "c": "two"
                            }
                        ]
                    }
                ]
            ]
        }
    ]
}
```

## note命令分析

```cmd
pandoc --template ../pandoc/algo.latex --filter ../pandoc/minted.py --pdf-engine=xelatex --no-highlight --pdf-engine-opt="-shell-escape" -o template.tex --from markdown -V mainfont="Source Han Serif CN" -V monofont="Source Code Pro" -V sansfont="Source Han Sans CN" -V CJKmainfont="Source Han Serif CN" -V secnumdepth=2 -V --number-sections --toc -V include-before="\renewcommand\labelitemi{$\bullet$}" -V header-includes="\usepackage{minted}" -V geometry="margin=2cm" ./*-*.md
```

### minted

先看看这个过滤器都干了什么：

```py
#!/usr/bin/env python3
'''
Filter to wrap Pandoc's CodeBlocks into minted blocks when using latex.
Pandoc's `fence_code_attributes` can be used to provide:
- the language (first class)
- minted's argumentless options (following classes)
- minted's options with arguments (attributes)
'''

from pandocfilters import toJSONFilter, RawBlock


TEMPLATE = r'''
\begin{{minted}}[fontsize=\footnotesize,breaklines,linenos{options}]{{{lang}}}
{cont}
\end{{minted}}
'''.strip()


def latex(x):
    return RawBlock('latex', x)


def join_options(opts):
    return ',\n'.join(opts)


def process_atts(kws):
    '''Preprocess the attributes provided by pandoc - they come as a list of
    2-lists, convert to a list of strings'''
    return ['%s=%s' % (l, r) for l, r in kws]


def mintedify(key, value, format_, meta):
    if key == 'CodeBlock':
        (ident, classes, attributes), contents = value
        if format_ == 'latex' and classes:
            language, *pos = classes
            atts = process_atts(attributes)
            return [latex(TEMPLATE.format(lang=language,
                                          options=join_options(pos+atts),
                                          cont=contents))]

if __name__ == '__main__':
    toJSONFilter(mintedify) 

```

### 安装字体

```
https://github.com/adobe-fonts/source-code-pro
https://github.com/adobe-fonts/source-han-serif
https://github.com/adobe-fonts/source-han-sans

```

github太慢了，去清华镜像站下载。

