# 修改viki代码以支持vnote3

先大概了解一下[Grunt](https://www.gruntjs.net/getting-started)。

clone下代码，然后应该就是`npm install`了。

啊这，连`.gitignore`文件都没有的吗？

```ps1
PS C:\Users\tootal\Documents\Projects\viki> npm install

> phantomjs-prebuilt@2.1.16 install C:\Users\tootal\Documents\Projects\viki\node_modules\phantomjs-prebuilt
> node install.js

PhantomJS not found on PATH
Downloading https://github.com/Medium/phantomjs/releases/download/v2.1.1/phantomjs-2.1.1-windows.zip
Saving to C:\Users\tootal\AppData\Local\Temp\phantomjs\phantomjs-2.1.1-windows.zip
Receiving...
  [========================================] 100%
Received 17767K total.
Extracting zip contents
Removing C:\Users\tootal\Documents\Projects\viki\node_modules\phantomjs-prebuilt\lib\phantom
Copying extracted folder C:\Users\tootal\AppData\Local\Temp\phantomjs\phantomjs-2.1.1-windows.zip-extract-1613306455561\phantomjs-2.1.1-windows -> C:\Users\tootal\Documents\Projects\viki\node_modules\phantomjs-prebuilt\lib\phantom
Writing location.js file
Done. Phantomjs binary available at C:\Users\tootal\Documents\Projects\viki\node_modules\phantomjs-prebuilt\lib\phantom\bin\phantomjs.exe

> core-js@2.6.9 postinstall C:\Users\tootal\Documents\Projects\viki\node_modules\@babel\polyfill\node_modules\core-js
> node scripts/postinstall || echo "ignore"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon: 
> https://opencollective.com/core-js 
> https://www.patreon.com/zloirock 

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 712 packages from 340 contributors and audited 781 packages in 720.416s
found 212 low severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
```

然后grunt，要先在本地安装grunt-cli。

```ps1
PS C:\Users\tootal\Documents\Projects\viki> grunt
Running "jshint:files" (jshint) task
>> 21 files lint free.

Running "copy:pre" (copy) task
Copied 33 files

Running "browserify:dist" (browserify) task
Browserslist: caniuse-lite is outdated. Please run next command `npm update caniuse-lite browserslist`
>> Bundle tmp/viki.transpiled.js created.

Running "concat:dist" (concat) task

Running "copy:post" (copy) task
Copied 8 files

Running "clean:tmp" (clean) task
>> 1 path cleaned.

Done.
```PS C:\Users\tootal\Documents\Projects\viki> grunt
Running "jshint:files" (jshint) task
>> 21 files lint free.

Running "copy:pre" (copy) task
Copied 33 files

Running "browserify:dist" (browserify) task
Browserslist: caniuse-lite is outdated. Please run next command `npm update caniuse-lite browserslist`
>> Bundle tmp/viki.transpiled.js created.

Running "concat:dist" (concat) task

Running "copy:post" (copy) task
Copied 8 files

Running "clean:tmp" (clean) task
>> 1 path cleaned.

Done.

```

以前的配置文件是`_vnote.json`，现在是`vx.json`。

支持了vx.json文件，但是还是加载不出来，看来要看看怎么解析的这个文件了。

```js
// Subfolders.
for (let i = 0; i < p_jobj.sub_directories.length; ++i) {
    let folder = p_jobj.sub_directories[i];
```

这里有undefined错误。

## 支持配置index

感觉是要取消注册service worker


[chrome://serviceworker-internals/](chrome://serviceworker-internals/)


[edge://serviceworker-internals/](edge://serviceworker-internals/)


发现这个东西没那么简单，暂时放弃了。

