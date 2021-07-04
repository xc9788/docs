# PHPUnit笔记

> - 2021-07-04 随笔记录一些，尝试写了一些demo.
> - 2021-07-?? TODO

> - Tip: [phpunit](http://www.phpunit.cn/) 
>  - 笔记跳过`介绍`, `安装`, `使用`, `编写`等基础记录.

### 基境

##### 编写代码来将整个场景设置成某个已知的状态，并在测试结束后将其复原到初始状态。这个已知的状态称为测试的基境

```php
// 测试类的每个测试方法都会运行一次
setUp() 
tearDown()

// 将分别在测试用例类的第一个测试运行之前和测试用例类的最后一个测试运行之后调用
setUpBeforeClass()
tearDownAfterClass()
```

### 标注

#### 第二行记录它，因为支持注解！！！喜欢注解！！！

```
@afterClass 标注用于指明此静态方法应该于测试类中的所有测试方法都运行完成之后调用，用于清理共享基境。

@backupGlobals
PHPUnit 可选地允许在每个测试之前备份所有全局与超全局变量，并在每个测试结束后还原这些备份。

@backupGlobals
PHPUnit 可选地允许在每个测试之前备份所有全局与超全局变量，并在每个测试结束后还原这些备份。


@backupStaticAttributes
PHPUnit 可选地允许在每个测试之前备份所有已声明类的静态属性，并在每个测试结束后还原这些备份。

... [jump](https://phpunit.readthedocs.io/zh_CN/latest/annotations.html#)

```

### 测试替身

##### 解决测试时一些依赖组件使用的麻烦

> Tip: `编写测试时无法使用实际的依赖组件，可以用测试替身来代替。测试替身不需要和真正的依赖组件有完全一样的的行为方式；它只需要提供和真正的组件同样的 API 即可，这样被测系统就会以为它是真正的组件！`

```php
// 生成对象
createStub($type)
createMock($type)
getMockBuilder($type)

/**
 createStub($type) 和 createMock($type) 方法直接返回指定类型（接口或类）的测试替身对象实例。此测试替身的创建使用了最佳实践默认方案。原始类的 __construct() 和 __clone() 方法不会执行，且不对传递给测试替身的方法的参数进行克隆。如果这些默认值非你所需，可以用 getMockBuilder($type) 方法并使用流畅式接口来定制测试替身的生成过程。

 局限性：final、private、与 static 方法
*/

/**
  Stubs 桩件
  将对象替换为（可选地）返回配置好的返回值的测试替身的实践方法称为打桩
 */
class SomeClass
{
    public function doSomething()
    {
        return 'foo';
    }
}

<?php

use PHPUnit\Framework\TestCase;

class StubTest extends TestCase
{
    public function testStub()
    {
        // 为 SomeClass 类创建桩件。
        $stub = $this->createStub(SomeClass::class);

        // 配置桩件。
        $stub->method('doSomething')
             ->willReturn('foo');

        // 现在调用 $stub->doSomething() 会返回 'foo'。
        $this->assertSame('foo', $stub->doSomething());
    }
}

/**
  Mock 仿件
  将对象替换为能验证预期行为（例如断言某个方法必会被调用）的测试替身的实践方法称为模仿
*/

```