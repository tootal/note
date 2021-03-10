# 计组课设Ariane分析
## 发射阶段源码浅析
源代码仓库：[openhwgroup/cva6](https://github.com/openhwgroup/cva6)

从`src/issue_read_operands.sv`文件开始分析。
第一句`import ariane_pkg::*;`引入ariane_pkg包下的所有类。

`ariane_pkg`定义在`include/ariane_pkg.sv`文件中。

```
 * Description: Contains all the necessary defines for Ariane
 *              in one package.
```

包含了一些通用定义。

后面看到不知道的内容再来这里面找找。

继续：

```sv
module issue_read_operands #(
    parameter int unsigned NR_COMMIT_PORTS = 2
)(
```

由于没学过Verilog、System Verilog所以找了个教程[SystemVerilog Tutorial](http://www.asic-world.com/systemverilog/tutorial.html)结合来看。

[关于module的介绍部分](http://www.asic-world.com/systemverilog/basic1.html#Modules)

NR_COMMIT_PORTS大概是一个参数，默认值为2。

接下来就是一堆输入输出端口的定义了。

注意这里：

```sv
    // get clobber input
    input  fu_t [2**REG_ADDR_SIZE-1:0]             rd_clobber_gpr_i,
    input  fu_t [2**REG_ADDR_SIZE-1:0]             rd_clobber_fpr_i,
```

fu_t是没出现过的，在之前的`include/ariane_pkg.sv`中可以找到它的定义：

```sv
    typedef enum logic[3:0] {
        NONE,      // 0
        LOAD,      // 1
        STORE,     // 2
        ALU,       // 3
        CTRL_FLOW, // 4
        MULT,      // 5
        CSR,       // 6
        FPU,       // 7
        FPU_VEC    // 8
    } fu_t;
```

[typedef语法](http://www.asic-world.com/systemverilog/data_types5.html#User_defined_types)
[enum语法](http://www.asic-world.com/systemverilog/data_types6.html#Enumerations_types)

然而不知道怎么在PyHCL里面定义枚举类型，GG。

算了，先看下面的，后面再处理这个枚举。

logic [7:0] addr
相当于
wire [7:0] addr

初步分析到这里，接下来找个环境运行测试一下system verilog代码才行。

