# Angular router Resolver动态设置页面title和面包屑

在Angular应用中，我们一般使用路由中携带的data来动态修改页面的title，路由定义如下：

```tsx
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: '主页' } }
]
```

但可能遇到动态匹配路由的情况，此时预先定义的title就无法满足需求

```tsx
const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: '主页' } },
  {
    path: 'hello/:name',
    component: HelloComponent,
    data: { title: '欢迎' },
  },
];
```

实际上Angular路由已经提供了动态加载data数据的方法，我们可以通过resolve字段添加自定义的resolver来预先加载数据

```tsx
@Injectable({ providedIn: 'root' })
export class HeroResolver implements Resolve<Hero> {
  constructor(private service: HeroService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.getHero(route.paramMap.get('id'));
  }
}
```

```tsx
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'detail/:id',
        component: HeroDetailComponent,
        resolve: {
          hero: HeroResolver
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

也可以使用直接声明

```tsx
export const myHero: Hero = {
  // ...
}

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'detail/:id',
        component: HeroComponent,
        resolve: {
          hero: 'heroResolver'
        }
      }
    ])
  ],
  providers: [
    {
      provide: 'heroResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => myHero
    }
  ]
})
export class AppModule {}
```

注意这里的resolver必须通过依赖注入的方式提供

```tsx
// ❌ 这样的写法是错误的
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'detail/:id',
        component: HeroComponent,
        resolve: {
          hero: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => myHero
        }
      }
    ])
  ]
})
export class AppModule {}
// Error: Uncaught (in promise): NullInjectorError: R3InjectorError(AppModule)[hero -> hero -> hero]:
// NullInjectorError: No provider for hero!
// NullInjectorError: R3InjectorError(AppModule)[hero -> hero -> hero]:
// NullInjectorError: No provider for hero!
```

回归到我们的需求，最后的代码如下：

```tsx
const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: '主页' } },
  {
    path: 'hello/:name',
    component: HelloComponent,
    resolve: { title: 'titleResolver' },
  },
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, HelloComponent, HomeComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: 'titleResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        route.params.name,
    },
  ],
})
export class AppModule {}
```

### Title

在线代码：

[Angular Router (forked) - StackBlitz](https://stackblitz.com/edit/angular-ivy-buvzoe?file=src/app/app.component.html)

展示地址：

[点击链接观察title变化](https://angular-ivy-buvzoe.stackblitz.io/)

### 面包屑

[Ng Zorro Breadcrumb Auto (forked) - StackBlitz](https://stackblitz.com/edit/ng-zorro-breadcrumb-auto-tqp331?file=src/app/app.component.html)

参考：

[Angular路由教程](https://angular.io/guide/router-tutorial-toh#resolve-pre-fetching-component-data)

[Angular文档中的Resolve](https://angular.io/api/router/Resolve)

[Angular8 设定页面标题title](https://www.jianshu.com/p/a34f9869918a)

[Ng-Zorro:通过配置router.data自动生成面包屑](https://ng.ant.design/components/breadcrumb/zh#components-breadcrumb-demo-auto)