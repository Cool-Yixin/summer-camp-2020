# Node.js

## Node基本介绍

NodeJs可以解析和执行js代码使js可以脱离浏览器运行
1.在NodeJs这个JavaScript环境中为JavaScript提供了一些服务器级别的操作API:

```
文件的读写
网络服务的构建
网络通信
http服务器等处理
```

2.没有BOM,DOM
3.只有一些简单的js语法（ECMScript）

*在nodeJs中没有DOM和BOM，所以在js中使用window和document会报错*



## Node操作文件

fs, file-system, 文件系统

在Node中进行文件操作，须引入fs这个核心模块。

在fs这个核心模块提供了所有文件操作相关的API

1.使用require方法加载fs核心模块                     

```
var fs = require('fs');
```

2.读取文件
参数一 ：待读取的文件路径

参数二：是一个回调函数

```javascript
fs.readFile('helloworld.txt',function(error,data){
    if(error){
        console.log('读取文件失败');//error：读取失败，error就是错误对象，读取成功，error就是null
        return;
    }else{
        console.log(data.toString());//data：读取成功，data就是读取的数据，读取失败，data就是null
    }
});
```

文件中存储的其实是一堆的0和1二进制数，使用toString方法来转化为字符串

3.写文件
参数一：要写的文件的路径，

参数二：写入的文件内容,

参数三：为回调函数

```javascript
fs.writeFile('helloworld.txt','我是nodeJs',function(error){
    console.log(error);
})//error为错误对象:写入成功为null
```

## 简单的http服务

使用Node构建一个web服务器，在node中专门构建一个核心模块：http，http模块可创建编写服务器

1.加载http核心模块           

```
var http=require('http');
```

2.使用http.createServer()方法创建一个web服务器
  返回一个server实例                 

```
var server=http.createServer();
```

3.服务器：提供数据的服务

- 发请求
- 接收请求
- 处理请求
- 发送响应
  - 注册request请求事件
    当客户端请求过来，就会自动触发服务器的request请求事件，然后执行第二个参数：回调函数
  - Request 请求对象，可以用来获取客户端的一些请求信息，例如请求路径等
  - Response 响应对象，可以用来给客户端发送响应消息,响应的数据只能是二进制数和字符串，不能是数组，对象，数字等,需要进行装换。

```
server.on('request',function(request,response){
    console.log('收到请求了');
    //发送响应
    response.write('hello');
    //结束响应
    response.end();
});  

server.listen(3000,function(){
    console.log('服务器启动成功了，可以通过http://127.0.0.1:300/ 来进行访问');
});
```



## Node中的Javascript                    

EcmaScript:没有DOM和BOM

- 核心模块
- 第三方模块
- 用户自定义模块

1.核心模块
Node为JavaScript提供了很多服务器级别的API，这些API绝大多数都被包装到了一个具名的核心模块中了，例如文件操作的fs核心模块，http服务构建的http模块，path路径模块.                     

使用这个模块需要引入：var fs=require('fs')

2.简单的模块化编程                     

在node中模块有三种：
    1.具名的核心模块，例如：fs,http等
    2.用户自己编写的文件模块：相对路径必须加./
require导入
exports输出

```javascript
//b.js
var foo='hello';
exports.foo=foo;
exports.add=function add(x,y){
    return x+y;
}
//a.js
var obj=require('./b.js');
obj.foo;
obj.add(x,y);

```

## Node.js REPL

Read Eval Print Loop:交互式解释器，表示一个环境

REPL命令

```
ctrl + c - 退出当前终端。

ctrl + c 按下两次 - 退出 Node REPL。

ctrl + d - 退出 Node REPL.

向上/向下 键 - 查看输入的历史命令

tab 键 - 列出当前命令

.help - 列出使用命令

.break - 退出多行表达式

.clear - 退出多行表达式

.save filename - 保存当前的 Node REPL 会话到指定文件

.load filename - 载入当前 Node REPL 会话的文件内容。
```

## Node.js事件循环

- 事件驱动程序

  ![img](https://www.runoob.com/wp-content/uploads/2015/09/event_loop.jpg)

Node.js 有多个内置的事件，可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件：

```
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
// 触发事件
eventEmitter.emit('eventName');
```

## Node.js EventEmitter

Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。

```javascript
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter();//注册event监听器
event.on('some_event', function() { 
    console.log('some_event 事件触发'); 
}); 
setTimeout(function() { 
    event.emit('some_event'); 
}, 1000); //调回event监听器
```

具体方法详见https://www.runoob.com/nodejs/nodejs-event.html

## Node.js Buffer

### 写入缓冲区

- 语法

```
buf.write(string[, offset[, length]][, encoding])
```

- 参数：

  - **string** - 写入缓冲区的字符串。

  - **offset** - 缓冲区开始写入的索引值，默认为 0 。

  - **length** - 写入的字节数，默认为 buffer.length
  - **encoding** - 使用的编码。默认为 'utf8' 。

根据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。

```
buf = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   //使用 'ascii' 编码, 并输出: abcde
console.log( buf.toString('utf8',0,5));    // 使用 'utf8' 编码, 并输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用默认的 'utf8' 编码, 并输出: abcde
```

### 将 Buffer 转换为 JSON 对象

```
buf.toJSON()
```

### 缓冲区合并

- 语法

```
Buffer.concat(list[, totalLength])
```

- 参数
  - **list** - 用于合并的 Buffer 对象数组列表。
  - **totalLength** - 指定合并后Buffer对象的总长度。

更多方法见https://www.runoob.com/nodejs/nodejs-buffer.html

## Node.js Stream

Stream 是一个抽象接口，有四种流类型：

- **Readable** - 可读操作。
- **Writable** - 可写操作。
- **Duplex** - 可读可写操作.
- **Transform** - 操作被写入数据，然后读出结果。

常用事件：

- **data** - 当有数据可读时触发。
- **end** - 没有更多的数据可读时触发。
- **error** - 在接收和写入过程中发生错误时触发。
- **finish** - 所有数据已被写入到底层系统时触发。

常用流操作：

### 从流中读取数据

```
var fs = require("fs");
var data = '';
// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});
```

### 写入流

```
// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});
```

### 管道流

从一个流中获取数据并将数据传递到另外一个流中

```
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
```

### 链式流

```
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
```

## Node.js模块系统

- 创建模块

```
//module.js
module.exports = function() {
  // ...
}
//main.js
var hello = require(./hello)
```

- **exports 和 module.exports 的使用**

如果要对外暴露属性或方法，就用 **exports** 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 **module.exports**。

- 加载优先级

## Node.js 函数

- 函数作为参数时，传递的不是返回值，而是函数本身

- 匿名函数使用

- 函数传递使http服务器工作

  ```
  var http = require("http");
  
  http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }).listen(8888);
  ```

  

## Node.js路由

为路由提供请求的URL以及GET和POST参数，路由根据参数执行对应的代码。

## Node.js全局对象

js中，通常windows作为全局对象；

node中，global作为全局对象。

global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条件的变量是全局变量：

- 在最外层定义的变量；
- 全局对象的属性；
- 隐式定义的变量（未定义直接赋值的变量）。

*最好不使用var来避免全局变量的使用，减少代码耦合风险*

- _filename表示当前正在执行的脚本文件名，输出文件所在位置的绝对路径
- _dirname当前脚本所在目录
- setTimeout(cb,ms)全局函数在指定毫秒ms后执行指定函数cb，只执行一次
- clearTimeout(t)清除定时器
- **setInterval(cb, ms)** 全局函数在指定的毫秒(ms)数后执行指定函数(cb)，持续执行直到 clearInterval(t) 被调用或窗口被关闭。
- console方法，详见https://www.runoob.com/nodejs/nodejs-global-object.html