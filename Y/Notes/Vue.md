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

监听 DOM 事件来触发一些 JavaScript 代码。

- 事件类型由参数指定，例如：click、submit等等。
- 表达式可以是一个方法的名字或一个内联语句，这个内联跟样式的内联一样