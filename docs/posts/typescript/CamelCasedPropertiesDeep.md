# TypeScript: 将Python接口风格转成Java接口风格

最近我们的一个服务从python迁移到了java，接口数据也发生了一些变化

```json
// old
{
	"user_id": 1,
	"user_name": "admin"
}

// new
{
	"userId": 1,
	"userName": "admin"
}
```

这就导致我们之前写的一些interface无法使用，需要重新写了

```typescript
// old
interface IUser {
	user_id: numebr;
	user_name: string;
}

// new
interface IUser {
	userId: numebr;
	userName: string;
}
```

我就想到是否能有办法一键转换到新的接口类型，就像下面这样：

```typescript
type IJavaUser = Trans<IPyUser>
```

这其实可以拆分成两个问题

1. 如何从user_id映射到userId
2. 如何对属性名称（key）进行修改

### 字符串模板

在`typescript 4.1`版本后，我们可以使用字符串模板来直接修改字符串常量的类型

```typescript
type a = 'old';

// type b = "old-1"
type b = `${a}-1`
```

可以通过以下代码实现从user_id到userId映射关系

```typescript
type UpF<T> = T extends `${infer first}${infer others}` ? `${Uppercase<first>}${others}` : T;
type TrF<T> = T extends `${infer front}_${infer end}` ? `${front}${UpF<end>}` : T;

// type userIdKey = "userId"
type userIdKey = TrF<'user_id'>
```

`infer` 关键词在 typescript 中的作用类似于`var`，即设定一个类型变量

typescript可以根据自动推断出`first`和`others`这两个变量对应的类型

当不影响后续匹配时，每个推断类型会匹配尽量少的值，所以`first`只匹配第一个字符

实际上内置的`Capitalize`也可以实现上面`UpF`的效果

```typescript
type TrF<T> = T extends `${infer front}_${infer end}` ? `${front}${Capitalize<end>}` : T;

// type userIdKey = "userId"
type userIdKey = TrF<'user_id'>
```

### 应用到每个字段

前面我们已经实现了单个key的转换，现在我们需要将其应用到`IUser`的每一个字段上。

```typescript
type Py2Java<T> = {
  [K in keyof T as TrF<K>]: T[K];
};

/* 
type IJavaUser = {
    userId: number;
    userName: string;
}
*/
type IJavaUser = Py2Java<IUser>;
```

### 剩下的问题

前面的研究已经基本可以满足接口转换的需求，但是还有两个问题。

1. 如果是`user_role_name`这种字段名该怎么处理？
2. 如果有字段嵌套怎么处理？

```typescript
// type userRoleNameKey = "userRole_name"
type userRoleNameKey = TrF<'user_role_name'>

interface IUser {
	user_id: numebr;
	user_name: string;
	role: {
		role_name: string;
	}
}

/*
type IJavaUser = {
    userId: number;
    userName: string;
    role: {
        role_name: string;
    };
}
*/
type IJavaUser = Py2Java<IUser>;
```

其实`type-fest`这个库已经给出了解决方案

[CamelCase](https://github.com/sindresorhus/type-fest/blob/main/source/camel-case.d.ts) – Convert a string literal to camel-case (`fooBar`).

[CamelCasedProperties](https://github.com/sindresorhus/type-fest/blob/main/source/camel-cased-properties.d.ts) – Convert object properties to camel-case (`fooBar`).

[CamelCasedPropertiesDeep](https://github.com/sindresorhus/type-fest/blob/main/source/camel-cased-properties-deep.d.ts) – Convert object properties to camel-case recursively (`fooBar`).

下面我们来深入源码来看看他是怎么实现的

### 多个分隔符

`CamelCase`使用`Split`先将字符串切割开，再使用`CamelCaseStringArray`对字符串进行合并

```typescript
// 以下代码已经过简化

export type CamelCase<K> = K extends string ? CamelCaseStringArray<Split<K extends Uppercase<K> ? Lowercase<K> : K, WordSeparators>> : K;

type Split<S extends string, Delimiter extends string> =
  S extends `${infer Head}${Delimiter}${infer Tail}` ? [Head, ...Split<Tail, Delimiter>] : [S];
```

我们可以看到`Split`使用了数组解构的操作，而且递归调用了自身

可以理解为每次只切分最前面一段，然后剩余的留到下次调用时再分割

返回的结果经过解构打平，使得最终得到的结果是一维的数组

`CamelCaseStringArray`的逻辑有点复杂，总体来说也是使用了解构和递归调用的方式将数组拼接起来，不过这里的解构是用来匹配数组的剩余部分

```typescript
type InnerCamelCaseStringArray<Parts extends readonly any[], PreviousPart> =
	Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
		? FirstPart extends undefined
			? ''
			: FirstPart extends ''
					? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
					: `${PreviousPart extends '' ? FirstPart : Capitalize<FirstPart>}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`
		: '';

type CamelCaseStringArray<Parts extends readonly string[]> =
	Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
		? Uncapitalize<`${FirstPart}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`>
		: never;
```

### 嵌套属性

`CamelCasedPropertiesDeep`和上文的实现最大的区别就是在赋予属性类型值的时候又递归调用了自身

```typescript
export type CamelCasedPropertiesDeep<Value> = Value extends Function
	? Value
	: Value extends Array<infer U>
	? Array<CamelCasedPropertiesDeep<U>>
	: Value extends Set<infer U>
	? Set<CamelCasedPropertiesDeep<U>> : {
			[K in keyof Value as CamelCase<K>]: CamelCasedPropertiesDeep<Value[K]>;
	};
```

我们来改一下前面的实现

```typescript
type Py2Java<T> = {
  [K in keyof T as TrF<K>]: Py2Java<T[K]>;
};

/* 
type IJavaUser = {
    userId: number;
    userName: string;
    role: Py2Java<{
        role_name: string;
    }>;
}
*/
type IJavaUser = Py2Java<IUser>;
```

实际使用中还是直接使用工具库比较方便，还考虑了更多边界情况。

### 参考

[将小驼峰接口类型递归的转成大驼峰：TypeScript 高级类型与 4.1 字符串模板类型实战](https://juejin.cn/post/6934593935335489544)

[https://github.com/sindresorhus/type-fest](https://github.com/sindresorhus/type-fest)