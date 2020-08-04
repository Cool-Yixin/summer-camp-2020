# Vue.js入门

## 基本使用

1. 引入

   ```
   <!-- 生产环境版本，优化了尺寸和速度 -->
   <script src="https://cdn.jsdelivr.net/npm/vue"></script>
   ```

2. 声明式渲染

   ```
   <div id="app">
     {{ message }}
   </div>
   ```

   - `v-bind` attribute 被称为**指令**,意为“将这个元素节点的 `title` attribute 和 Vue 实例的 `message` property 保持一致”

   

## Vue常用指令介绍

1、v-text (更新元素的文本内容)                        

```
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```

2、v-html (更新元素的innerHTML)

**`注意:`**内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。                       

```
<div v-html="html"></div>
```

3、v-if (根据表达式的值的真假条件渲染元素)                        

```
<h1 v-if="ok">Yes</h1>
相当于
<!-- Handlebars 模板 -->
{{#if ok}}
<h1>Yes</h1>
{{/if}}
```

上面的代码，如果ok为false，则h1不会被渲染出来。
同时操作多个，可以在要操作的元素外面包一层，例如用*`div`*              

```
<div v-if="ok">
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </div>
<!-- 如果ok为flase,那么h1和两个p都不会渲染 -->
```

4、v-else (指令给 v-if或 v-show添加一个 “else” 块)

**v-else**不只是可以搭配**v-if**，还可以搭配**v-show**
**注意** ：**v-else**元素必须紧跟在 v-if或 v-show元素的后面——否则它不能被识别。

```
<div v-if="Math.random() > 0.5">
    Sorry
</div>
<div v-else>
    Not sorry
</div>
<!-- 随机切换两种展示结果 -->
```

5、v-show (根据条件展示元素

**v-show**用法跟**v-if**是一样的，**不同的是**有 v-show的元素会始终渲染并保持在 DOM 中。v-show是简单的切换元素的 CSS 属性 display。             

```
<div v-if="type === 'A'">
A
</div>
<div v-else-if="type === 'B'">
B
</div>
<div v-else-if="type === 'C'">
C
</div>
<div v-else>
Not A/B/C
</div>

/*很像
if(){
}else if(){
}else {
}*/
```

6、v-for(基于源数据多次渲染元素或模板块  

**特定语法：**`alias in expression`)

通俗，遍历一个数组，数组里面放的是一个个的对象。
**基本用法**              

```
<!-- html -->
<ul id="example-1">
  <li v-for="word in words">
      {{ word.text }}
  </li>
</ul>

//javascript
var example1 = new Vue({
        el: '#example-1',
        data: {
            words: [
                {text: 'a' },
                {text: 'b' },
                {text: 'c' }
            ]
        }
    })
```

**v-for**,可以遍历数组，对象，甚至是整数（可以当做循环的次数来用），其中遍历的参数可以是**value**，**index**，如果是对象还有**key**。        

```
<!-- 数组 -->
<div v-for="(item, index) in items"></div>
<!-- 对象-->
<div v-for="(val, key) in object"></div>
<div v-for="(val, key, index) in object"></div>
<!-- 整数-->
<div>
<span v-for="n in 10">{{ n }}</span>
</div>
结果为：1 2 3 4 5 6 7 8 9 10

```

7、v-on(指定事件监听器)

监听 DOM 事件来触发一些 JavaScript 代码，使用户和应用进行交互。

- 事件类型由参数指定，例如：click、submit等等。
- 表达式可以是一个方法的名字或一个内联语句，这个内联跟样式的内联一样

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">反转消息</button>
</div>
```

```javascript
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {//更新了应用状态，但没有触碰DOM,所有操作都用Vue来进行处理
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

8、v-model指令，实现表单输入和应用状态之间的双向绑定

9、组件化应用构建

注册组件

```js
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'//一个待办项
    
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'//从父作用域将数据传至子组件
})

var app = new Vue(...)
```

v-bind指令将代办项传至循环输出的每个组件

## Vue实例

### 创建实例

一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。

```
var vm = new Vue({
  // 选项
})
```

### 数据与方法

- 当一个 Vue 实例被创建时，它将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**中。

- 添加新的property不会触发视图的更新

  但如果一开始为空或不存在，仅需要设置一些初始值

- 使用Object.freeze()组织修改现有的property

### 实例生命周期的钩子

- [`created`](https://cn.vuejs.org/v2/api/#created) 钩子可以用来在一个实例被创建之后执行代码

-  [`mounted`](https://cn.vuejs.org/v2/api/#mounted)、[`updated`](https://cn.vuejs.org/v2/api/#updated) 和 [`destroyed`](https://cn.vuejs.org/v2/api/#destroyed)

- this上下文指调用它的Vue实例

  *不能在property或回调上使用箭头函数*

  

## 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。

### 插值

#### 文本

数据绑定最常见的形式使用“Mustache”语法的文本插值：

```
<span>Message: {{ msg }}</span>
```

Mustache 标签将会被替代为对应数据对象上 `msg` property 的值。无论何时，绑定的数据对象上 `msg` property 发生了改变，插值处的内容都会更新。

通过使用 v-once 指令执行一次性地插值，当数据改变时，插值处的内容不会更新。

```
<span v-once>这个将不会改变: {{ msg }}</span>
```

原始 HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，需要使用 `v-html` 指令：

```
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>.
```

 `span` 的内容将会被替换成为 property 值 `rawHtml`，直接作为 HTML——会忽略解析 property 值中的数据绑定。

#### Attribute

Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 `v-bind` 指令：

```
<div v-bind:id="dynamicId"></div>
```

#### 使用 JavaScript 表达式

表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含**单个表达式**，所以下面的例子都**不会**生效。

```
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

模板表达式都被放在sandbox中，只能访问全局变量的一个白名单如 `Math` 和 `Date` 。

## 计算属性和侦听器

### 计算属性

对于任何复杂逻辑，都应当使用**计算属性**。

```
computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
```

#### 计算属性缓存 vs 方法

```
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。

#### 计算属性 vs 侦听属性

watch的命令写法重读，不如计算属性简洁

### 侦听器

当需要在数据变化时执行异步或开销较大的操作时，watch方式是最有用的。

## Class与Style绑定