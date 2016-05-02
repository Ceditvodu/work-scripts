## Classes

<dl>
<dt><a href="#Spoiler">Spoiler</a></dt>
<dd><p>this class will create spoiler.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#velocity">velocity</a></dt>
<dd></dd>
<dt><a href="#spoilerStatus">spoilerStatus</a></dt>
<dd></dd>
<dt><a href="#clickable">clickable</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getStatus">getStatus(index)</a> ⇒ <code>String</code> | <code>Array</code></dt>
<dd><p>returning status of spoiler (opened, closed)</p>
</dd>
<dt><a href="#toggle">toggle(index)</a></dt>
<dd><p>toggle spoiler element</p>
</dd>
</dl>

<a name="Spoiler"></a>

## Spoiler
this class will create spoiler.

**Kind**: global class  
**Version**: 2.0.0  
**Author:** Ivan Kaduk  
**Copyright**: Ivan Kaduk 2016.  

* [Spoiler](#Spoiler)
    * [new Spoiler(className, status, velocity, title, content)](#new_Spoiler_new)
    * [~spoilerName](#Spoiler..spoilerName)
    * [~spoilerTitle](#Spoiler..spoilerTitle)
    * [~spoilerContentName](#Spoiler..spoilerContentName)
    * [~spoiler](#Spoiler..spoiler)
    * [~title](#Spoiler..title)
    * [~content](#Spoiler..content)
    * [~contentHeight](#Spoiler..contentHeight)

<a name="new_Spoiler_new"></a>

### new Spoiler(className, status, velocity, title, content)

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | class of div wich containe spoiler child elements. |
| status | <code>String</code> | start status of spoiler, it can be 'opened' or 'closed'. |
| velocity | <code>int</code> | velocite of slide in px per second |
| title | <code>String</code> | class of spoiler button |
| content | <code>String</code> | class of spoiler content div |

**Example**  
```js
var spoiler = new Spoiler('spoiler','opened', 1);
```
<a name="Spoiler..spoilerName"></a>

### Spoiler~spoilerName
**Kind**: inner property of <code>[Spoiler](#Spoiler)</code>  
**Privat**:   
<a name="Spoiler..spoilerTitle"></a>

### Spoiler~spoilerTitle
**Kind**: inner property of <code>[Spoiler](#Spoiler)</code>  
**Default**: <code>title</code>  
**Privat**:   
<a name="Spoiler..spoilerContentName"></a>

### Spoiler~spoilerContentName
**Kind**: inner property of <code>[Spoiler](#Spoiler)</code>  
**Default**: <code>content</code>  
**Privat**:   
<a name="Spoiler..spoiler"></a>

### Spoiler~spoiler
**Kind**: inner property of <code>[Spoiler](#Spoiler)</code>  
**Privat**:   
<a name="Spoiler..title"></a>

### Spoiler~title
**Kind**: inner property of <code>[Spoiler](#Spoiler)</code>  
**Privat**:   
<a name="Spoiler..content"></a>

### Spoiler~content
**Kind**: inner property of <code>[Spoiler](#Spoiler)</code>  
**Privat**:   
<a name="Spoiler..contentHeight"></a>

### Spoiler~contentHeight
**Kind**: inner property of <code>[Spoiler](#Spoiler)</code>  
**Privat**:   
<a name="velocity"></a>

## velocity
**Kind**: global variable  
**Default**: <code>10</code>  
**Access:** public  
<a name="spoilerStatus"></a>

## spoilerStatus
**Kind**: global variable  
**Access:** public  
<a name="clickable"></a>

## clickable
**Kind**: global variable  
**Access:** public  
<a name="getStatus"></a>

## getStatus(index) ⇒ <code>String</code> &#124; <code>Array</code>
returning status of spoiler (opened, closed)

**Kind**: global function  
**Returns**: <code>String</code> - - status of current spoiler<code>Array</code> - - statuses of all spoilers with current className  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>int</code> | it is index of spoiler element with current className |

**Example**  
```js
spoiler.getStatus(0);
```
<a name="toggle"></a>

## toggle(index)
toggle spoiler element

**Kind**: global function  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>int</code> | it is index of spoiler element with current className |

**Example**  
```js
spoiler.toggle();
```
