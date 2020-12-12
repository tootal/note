pandoc --template .\pandoc\algo.latex --filter .\pandoc\minted.py --pdf-engine=xelatex --no-highlight --pdf-engine-opt="-shell-escape" -o template.tex --from markdown -V mainfont="Source Han Serif CN" -V monofont="Source Code Pro" -V sansfont="Source Han Sans CN" -V CJKmainfont="Source Han Serif CN" -V secnumdepth=2 -V --number-sections --toc -V include-before="\renewcommand\labelitemi{$\bullet$}" -V header-includes="\usepackage{minted}" -V geometry="margin=2cm" 0-一切的开始.md 1-数据结构.md 2-数学.md 3-图论.md 4-计算几何.md 5-字符串.md 6-专题.md 7-杂项.md
latexmk -xelatex -shell-escape template.tex
latexmk -c
