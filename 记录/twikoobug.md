# twikoobug

START RequestId:659fb03b-459c-11eb-9daa-5254000f125d

2020-12-24T03:59:18.733Z 659fb03b-459c-11eb-9daa-5254000f125d 请求方法： COMMENT_SUBMIT

2020-12-24T03:59:18.734Z 659fb03b-459c-11eb-9daa-5254000f125d 请求参数： { comment:

   '<p>xxxxxxx<br><img src="https://746f-tootal-0gfd320q0433ea1f-1257857887.tcb.qcloud.la/tk-img/1608782348797-d2efd116371c4265a9ac3e87223c16e8.png" alt="image"></p>\n',

  event: 'COMMENT_SUBMIT',

  href: 'http://localhost:9820/demo.html',

  link: 'http://xxxxxxx',

  mail: 'xxxxxxx@qq.com',

  nick: 'Convex-lens',

  ua:

   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66',

  url: '/demo.html' }

TypeError: Converting circular structure to JSON

    at JSON.stringify (<anonymous>)

    at tcbMessage.map.arg (/var/runtime/node10/WrapLog.js:38:61)

    at Array.map (<anonymous>)

    at commonLog (/var/runtime/node10/WrapLog.js:38:45)

    at Console.log (/var/runtime/node10/WrapLog.js:51:7)

    at noticeWeChat (/var/user/index.js:823:11)

    at process._tickCallback (internal/process/next_tick.js:68:7)TypeError: Converting circular structure to JSON

    at JSON.stringify (<anonymous>)

    at tcbMessage.map.arg (/var/runtime/node10/WrapLog.js:38:61)

    at Array.map (<anonymous>)

    at commonLog (/var/runtime/node10/WrapLog.js:38:45)

    at Console.log (/var/runtime/node10/WrapLog.js:51:7)

    at noticeQQ (/var/user/index.js:852:11)

    at process._tickCallback (internal/process/next_tick.js:68:7)2020-12-24T03:59:20.763Z 659fb03b-459c-11eb-9daa-5254000f125d 博主通知结果： { accepted: [ 'tootal@yeah.net' ],

  rejected: [],

  envelopeTime: 201,

  messageTime: 1221,

  messageSize: 1714,

  response: '250 Ok: queued as ',

  envelope: { from: 'blog@tootal.xyz', to: [ 'tootal@yeah.net' ] },

  messageId: '<4d9a7941-f36b-6949-da51-e316d3f78b12@tootal.xyz>' }

2020-12-24T03:59:20.763Z 659fb03b-459c-11eb-9daa-5254000f125d 请求返回： { id: '9f2a34705fe412160086c50a3aeee86e' } 

END RequestId:659fb03b-459c-11eb-9daa-5254000f125d

Report RequestId:659fb03b-459c-11eb-9daa-5254000f125d Duration:2111ms Memory:128MB MemUsage:63.300781MB


