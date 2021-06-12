# Java高精度整数BigInteger源代码分析
刚刚把Java环境配置好了，准备研究一下Java的BigInteger代码。
从这份代码开始吧：

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        BigInteger a = new BigInteger(in.readLine());
        BigInteger b = new BigInteger(in.readLine());
        System.out.println(a.divide(b));
    }
}
```

包的位置是`java.math.BigInteger`，直接看下构造函数。

## 从String构造

```java
/**
 * Translates the decimal String representation of a BigInteger into a
 * BigInteger.  The String representation consists of an optional minus
 * sign followed by a sequence of one or more decimal digits.  The
 * character-to-digit mapping is provided by {@code Character.digit}.
 * The String may not contain any extraneous characters (whitespace, for
 * example).
 *
 * @param val decimal String representation of BigInteger.
 * @throws NumberFormatException {@code val} is not a valid representation
 *         of a BigInteger.
 * @see    Character#digit
 */
public BigInteger(String val) {
    this(val, 10);
}
```

它的作用是从一个十进制表示的字符串构造`BigInteger`。

调用了另一个构造函数：

```java
/**
 * Translates the String representation of a BigInteger in the
 * specified radix into a BigInteger.  The String representation
 * consists of an optional minus or plus sign followed by a
 * sequence of one or more digits in the specified radix.  The
 * character-to-digit mapping is provided by {@code
 * Character.digit}.  The String may not contain any extraneous
 * characters (whitespace, for example).
 *
 * @param val String representation of BigInteger.
 * @param radix radix to be used in interpreting {@code val}.
 * @throws NumberFormatException {@code val} is not a valid representation
 *         of a BigInteger in the specified radix, or {@code radix} is
 *         outside the range from {@link Character#MIN_RADIX} to
 *         {@link Character#MAX_RADIX}, inclusive.
 * @see    Character#digit
 */
public BigInteger(String val, int radix) {
    int cursor = 0, numDigits;
    final int len = val.length();

    if (radix < Character.MIN_RADIX || radix > Character.MAX_RADIX)
        throw new NumberFormatException("Radix out of range");
    if (len == 0)
        throw new NumberFormatException("Zero length BigInteger");

    // Check for at most one leading sign
    int sign = 1;
    int index1 = val.lastIndexOf('-');
    int index2 = val.lastIndexOf('+');
    if (index1 >= 0) {
        if (index1 != 0 || index2 >= 0) {
            throw new NumberFormatException("Illegal embedded sign character");
        }
        sign = -1;
        cursor = 1;
    } else if (index2 >= 0) {
        if (index2 != 0) {
            throw new NumberFormatException("Illegal embedded sign character");
        }
        cursor = 1;
    }
    if (cursor == len)
        throw new NumberFormatException("Zero length BigInteger");

    // Skip leading zeros and compute number of digits in magnitude
    while (cursor < len &&
           Character.digit(val.charAt(cursor), radix) == 0) {
        cursor++;
    }

    if (cursor == len) {
        signum = 0;
        mag = ZERO.mag;
        return;
    }

    numDigits = len - cursor;
    signum = sign;

    // Pre-allocate array of expected size. May be too large but can
    // never be too small. Typically exact.
    long numBits = ((numDigits * bitsPerDigit[radix]) >>> 10) + 1;
    if (numBits + 31 >= (1L << 32)) {
        reportOverflow();
    }
    int numWords = (int) (numBits + 31) >>> 5;
    int[] magnitude = new int[numWords];

    // Process first (potentially short) digit group
    int firstGroupLen = numDigits % digitsPerInt[radix];
    if (firstGroupLen == 0)
        firstGroupLen = digitsPerInt[radix];
    String group = val.substring(cursor, cursor += firstGroupLen);
    magnitude[numWords - 1] = Integer.parseInt(group, radix);
    if (magnitude[numWords - 1] < 0)
        throw new NumberFormatException("Illegal digit");

    // Process remaining digit groups
    int superRadix = intRadix[radix];
    int groupVal = 0;
    while (cursor < len) {
        group = val.substring(cursor, cursor += digitsPerInt[radix]);
        groupVal = Integer.parseInt(group, radix);
        if (groupVal < 0)
            throw new NumberFormatException("Illegal digit");
        destructiveMulAdd(magnitude, superRadix, groupVal);
    }
    // Required for cases where the array was overallocated.
    mag = trustedStripLeadingZeroInts(magnitude);
    if (mag.length >= MAX_MAG_LENGTH) {
        checkRange();
    }
}
```

里面用到了一个很关键的函数`Character.digit`，用来把字符（串）转换成数字。

分析一下主要分为：

* 安全检查
* 确定符号
* 去除前导0
* 