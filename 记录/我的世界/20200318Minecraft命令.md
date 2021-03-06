# 20200318Minecraft命令
[wiki链接](https://minecraft-zh.gamepedia.com/命令)
[wiki镜像链接](https://wiki.biligame.com/mc/命令)
## 相对坐标和绝对坐标
世界[坐标](https://wiki.biligame.com/mc/%E5%9D%90%E6%A0%87 "坐标")被视作绝对坐标。很多命令可以使用[波浪号](http://en.wikipedia.org/wiki/zh:%E6%B3%A2%E6%B5%AA%E5%8F%B7 "wikipedia:zh:波浪号")（`~`）来指定**相对坐标**，使用[插入符](http://en.wikipedia.org/wiki/zh:%E8%84%B1%E5%AD%97%E7%AC%A6 "wikipedia:zh:脱字符")（`^`）来指定**局部坐标**（也称**本地坐标**）。在波浪号和插入符后可以跟一个数字，表示相对基准点的**偏移量**。基准点由命令本身决定。举例来说，常见的基准点包括命令的执行位置和命令指定的其他坐标。局部坐标的基准点默认为执行者的头部而不是脚部。

相对坐标以世界的[绝对坐标](https://wiki.biligame.com/mc/%E5%9D%90%E6%A0%87 "坐标")为偏移量。局部坐标以执行者的头部为基准点，并在包括头部的倾斜角度下分别指向左、上、前方为坐标轴 x y z 的正方向。无论是哪一个，数字的正负号都表示向坐标轴的正或负方向偏移。一个单独的波浪号`~`是`~0`的简写，表示没有偏移。同样地，`^`是`^0`的简写。

举例来说，`/tp 0 64 0`将会移动使用者到坐标(0, 64, 0)，而`/tp ~3 ~ ~-3`会使使用者往x轴的正方向（东方）移动3米，保持原本高度，并在z轴的负方向（北方）移动3米，而`/tp ^ ^ ^3`会使使用者往前移动3米。

通常绝对坐标和相对坐标可以混合使用，但局部坐标不可与绝对或相对坐标混合使用。举例来说，`/tp ~ 64 ~`会保持执行者的x轴和z轴坐标，但是将传送执行者到绝对高度64。`/tp ^-5 ^ ^`将根据头部的倾斜，将玩家向右传送5个方块的距离。

## 目标选择器
大多数以实体或玩家作为参数的命令，可以通过某些限定条件来选择一个或多个实体或玩家，而不必指定实体名、玩家名或UUID。要用条件来选择实体或玩家，应先输入一个**目标选择器变量**，如有需要，还可再使用一个或多个**目标选择器参数**以制定具体的条件（可选）。

比如，要把A队所有玩家的游戏模式改为创造模式，但不使用玩家名来逐个指明：

`/gamemode creative @a[team=A]`

### 目标选择器变量
目标选择器变量用于指定待选目标的大致分类。共有5种变量：

`@p`

选择最近的玩家。在服务器控制台中输入时，默认基准点为(0, 0, 0)。如果有多个最近的玩家，他们与基准点距离完全相同，那么会选择其中最晚进入服务器的玩家。

[目标选择器参数](https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4#.E7.9B.AE.E6.A0.87.E9.80.89.E6.8B.A9.E5.99.A8.E5.8F.82.E6.95.B0)可以进一步筛选待选目标。举例来说，`@p[team=A]`‌‌<sup>\[仅[Java版](https://wiki.biligame.com/mc/Java%E7%89%88 "Java版")\]</sup>只会选择A队中距离最近的玩家，即使有其他非A队玩家更为靠近。

`c`‌‌<sup>\[仅[基岩版](https://wiki.biligame.com/mc/%E5%9F%BA%E5%B2%A9%E7%89%88 "基岩版")\]</sup>或`limit`‌‌<sup>\[仅[Java版](https://wiki.biligame.com/mc/Java%E7%89%88 "Java版")\]</sup>目标选择器参数可以用来追加待选目标。（举例来说，`@p[c=3]`‌‌<sup>\[仅[基岩版](https://wiki.biligame.com/mc/%E5%9F%BA%E5%B2%A9%E7%89%88 "基岩版")\]</sup>或`@p[limit=3]`‌‌<sup>\[仅[Java版](https://wiki.biligame.com/mc/Java%E7%89%88 "Java版")\]</sup>将选择三个最近的玩家）。若参数`c`是负值，会反转选择目标的顺序（举例来说，`@p[c=-1]`会选择*最远*的一名玩家）‌‌<sup>\[仅[基岩版](https://wiki.biligame.com/mc/%E5%9F%BA%E5%B2%A9%E7%89%88 "基岩版")\]</sup>。

`@r`

选择随机玩家（`type`目标选择器参数已经不适用于`@r`）。

[目标选择器参数](https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4#.E7.9B.AE.E6.A0.87.E9.80.89.E6.8B.A9.E5.99.A8.E5.8F.82.E6.95.B0)可以进一步筛选待选目标。举例来说，`@r[team=A]`‌‌<sup>\[仅[Java版](https://wiki.biligame.com/mc/Java%E7%89%88 "Java版")\]</sup>只会随机选择A队玩家。

`c`‌‌<sup>\[仅[基岩版](https://wiki.biligame.com/mc/%E5%9F%BA%E5%B2%A9%E7%89%88 "基岩版")\]</sup>或`limit`‌‌<sup>\[仅[Java版](https://wiki.biligame.com/mc/Java%E7%89%88 "Java版")\]</sup>目标选择器参数可以用来追加待选目标。比如，`@r[c=3]`‌‌<sup>\[仅[基岩版](https://wiki.biligame.com/mc/%E5%9F%BA%E5%B2%A9%E7%89%88 "基岩版")\]</sup>或`@r[limit=3]`‌‌<sup>\[仅[Java版](https://wiki.biligame.com/mc/Java%E7%89%88 "Java版")\]</sup>将随机选择三个玩家。

`@a`

选择所有玩家。

[目标选择器参数](https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4#.E7.9B.AE.E6.A0.87.E9.80.89.E6.8B.A9.E5.99.A8.E5.8F.82.E6.95.B0)可以进一步筛选待选目标。举例来说，`@a[team=A]`‌‌<sup>\[仅[Java版](https://wiki.biligame.com/mc/Java%E7%89%88 "Java版")\]</sup>只会选择A队的所有玩家。

`@e`

选择所有实体（包含玩家），但不包含死亡的实体。除`@e`以外的所有目标选择器都可以选中死亡的实体。

[目标选择器参数](https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4#.E7.9B.AE.E6.A0.87.E9.80.89.E6.8B.A9.E5.99.A8.E5.8F.82.E6.95.B0)可以进一步筛选待选目标。举例来说，`@e[type=cow]`只会选择牛。

`@s`

只选择唯一一个实体：该命令的执行者，包括已死亡玩家。若命令执行者不是一个实体，比如是命令方块或服务器控制台执行命令，则此选择器不会选中任何东西。

[目标选择器参数](https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4#.E7.9B.AE.E6.A0.87.E9.80.89.E6.8B.A9.E5.99.A8.E5.8F.82.E6.95.B0) 可用于确定执行者是否会成为目标。举例来说，`@s[type=cow,team=Red]`只会在命令执行者是红队的一头牛时才会将其选中。

`@c`

选择自己的吉祥物。‌‌<sup>\[仅[教育版](https://wiki.biligame.com/mc/%E6%95%99%E8%82%B2%E7%89%88 "教育版")\]</sup>

[目标选择器参数](https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4#.E7.9B.AE.E6.A0.87.E9.80.89.E6.8B.A9.E5.99.A8.E5.8F.82.E6.95.B0)可以用于标记自己的吉祥物。举例来说，`/tp @c 50 60 40`会将自己的吉祥物传送到指定的位置。

`@v`

选择所有的吉祥物。‌‌<sup>\[仅[教育版](https://wiki.biligame.com/mc/%E6%95%99%E8%82%B2%E7%89%88 "教育版")\]</sup>

[目标选择器参数](https://wiki.biligame.com/mc/%E5%91%BD%E4%BB%A4#.E7.9B.AE.E6.A0.87.E9.80.89.E6.8B.A9.E5.99.A8.E5.8F.82.E6.95.B0)可以用于标记所有的吉祥物。举例来说，`/remove @v`将移除所有的吉祥物。

## 目标选择器参数
在使用目标选择器之后，你可以使用参数来限定所要选择的群组。当使用`@a`或`@e`时，待选目标从全体筛选成特定的少数。当使用`@p`或`@r`时，参数将从完整的待选列表缩小到被筛选后的待选列表。当使用`@s`时，命令执行者只有在所有参数都满足时才会被选择，否则命令执行失败。

在目标选择器变量之后附加键值对构成的逗号分隔，并包含在方括号中：

`@<*变量*>[<*参数*>=<*值*>,<*参数*>=<*值*>,…]`

参数和值区分大小写，括号、等号和逗号旁可以有空格（目标选择器和第一个方括号之间除外）。键值对只能用逗号分隔。