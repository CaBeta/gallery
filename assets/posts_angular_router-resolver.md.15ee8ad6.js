import{_ as n,c as s,o as a,d as t}from"./app.e0d33696.js";const h='{"title":"Angular router Resolver\u52A8\u6001\u8BBE\u7F6E\u9875\u9762title\u548C\u9762\u5305\u5C51","description":"","frontmatter":{},"headers":[{"level":3,"title":"Title","slug":"title"},{"level":3,"title":"\u9762\u5305\u5C51","slug":"\u9762\u5305\u5C51"}],"relativePath":"posts/angular/router-resolver.md","lastUpdated":1639817182507}',p={},o=t(`<h1 id="angular-router-resolver\u52A8\u6001\u8BBE\u7F6E\u9875\u9762title\u548C\u9762\u5305\u5C51" tabindex="-1">Angular router Resolver\u52A8\u6001\u8BBE\u7F6E\u9875\u9762title\u548C\u9762\u5305\u5C51 <a class="header-anchor" href="#angular-router-resolver\u52A8\u6001\u8BBE\u7F6E\u9875\u9762title\u548C\u9762\u5305\u5C51" aria-hidden="true">#</a></h1><p>\u5728Angular\u5E94\u7528\u4E2D\uFF0C\u6211\u4EEC\u4E00\u822C\u4F7F\u7528\u8DEF\u7531\u4E2D\u643A\u5E26\u7684data\u6765\u52A8\u6001\u4FEE\u6539\u9875\u9762\u7684title\uFF0C\u8DEF\u7531\u5B9A\u4E49\u5982\u4E0B\uFF1A</p><div class="language-tsx"><pre><code><span class="token keyword">const</span> routes<span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> redirectTo<span class="token operator">:</span> <span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span> pathMatch<span class="token operator">:</span> <span class="token string">&#39;full&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span> component<span class="token operator">:</span> HomeComponent<span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;\u4E3B\u9875&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre></div><p>\u4F46\u53EF\u80FD\u9047\u5230\u52A8\u6001\u5339\u914D\u8DEF\u7531\u7684\u60C5\u51B5\uFF0C\u6B64\u65F6\u9884\u5148\u5B9A\u4E49\u7684title\u5C31\u65E0\u6CD5\u6EE1\u8DB3\u9700\u6C42</p><div class="language-tsx"><pre><code><span class="token keyword">const</span> routes<span class="token operator">:</span> Route<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> redirectTo<span class="token operator">:</span> <span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span> pathMatch<span class="token operator">:</span> <span class="token string">&#39;full&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span> component<span class="token operator">:</span> HomeComponent<span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;\u4E3B\u9875&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">&#39;hello/:name&#39;</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> HelloComponent<span class="token punctuation">,</span>
    data<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;\u6B22\u8FCE&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div><p>\u5B9E\u9645\u4E0AAngular\u8DEF\u7531\u5DF2\u7ECF\u63D0\u4F9B\u4E86\u52A8\u6001\u52A0\u8F7Ddata\u6570\u636E\u7684\u65B9\u6CD5\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7resolve\u5B57\u6BB5\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684resolver\u6765\u9884\u5148\u52A0\u8F7D\u6570\u636E</p><div class="language-tsx"><pre><code>@<span class="token function">Injectable</span><span class="token punctuation">(</span><span class="token punctuation">{</span> providedIn<span class="token operator">:</span> <span class="token string">&#39;root&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HeroResolver</span> <span class="token keyword">implements</span> <span class="token class-name">Resolve<span class="token operator">&lt;</span>Hero<span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">private</span> service<span class="token operator">:</span> HeroService</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token function">resolve</span><span class="token punctuation">(</span>
    route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span>
    state<span class="token operator">:</span> RouterStateSnapshot
  <span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token operator">|</span><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token operator">|</span><span class="token builtin">any</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>service<span class="token punctuation">.</span><span class="token function">getHero</span><span class="token punctuation">(</span>route<span class="token punctuation">.</span>paramMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-tsx"><pre><code>@<span class="token function">NgModule</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>
    RouterModule<span class="token punctuation">.</span><span class="token function">forRoot</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        path<span class="token operator">:</span> <span class="token string">&#39;detail/:id&#39;</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> HeroDetailComponent<span class="token punctuation">,</span>
        resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
          hero<span class="token operator">:</span> HeroResolver
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  exports<span class="token operator">:</span> <span class="token punctuation">[</span>RouterModule<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppRoutingModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>\u4E5F\u53EF\u4EE5\u4F7F\u7528\u76F4\u63A5\u58F0\u660E</p><div class="language-tsx"><pre><code><span class="token keyword">export</span> <span class="token keyword">const</span> myHero<span class="token operator">:</span> Hero <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

@<span class="token function">NgModule</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>
    RouterModule<span class="token punctuation">.</span><span class="token function">forRoot</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        path<span class="token operator">:</span> <span class="token string">&#39;detail/:id&#39;</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> HeroComponent<span class="token punctuation">,</span>
        resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
          hero<span class="token operator">:</span> <span class="token string">&#39;heroResolver&#39;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      provide<span class="token operator">:</span> <span class="token string">&#39;heroResolver&#39;</span><span class="token punctuation">,</span>
      <span class="token function-variable function">useValue</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> state<span class="token operator">:</span> RouterStateSnapshot</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> myHero
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><p>\u6CE8\u610F\u8FD9\u91CC\u7684resolver\u5FC5\u987B\u901A\u8FC7\u4F9D\u8D56\u6CE8\u5165\u7684\u65B9\u5F0F\u63D0\u4F9B</p><div class="language-tsx"><pre><code><span class="token comment">// \u274C \u8FD9\u6837\u7684\u5199\u6CD5\u662F\u9519\u8BEF\u7684</span>
@<span class="token function">NgModule</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>
    RouterModule<span class="token punctuation">.</span><span class="token function">forRoot</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        path<span class="token operator">:</span> <span class="token string">&#39;detail/:id&#39;</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> HeroComponent<span class="token punctuation">,</span>
        resolve<span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token function-variable function">hero</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> state<span class="token operator">:</span> RouterStateSnapshot</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> myHero
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// Error: Uncaught (in promise): NullInjectorError: R3InjectorError(AppModule)[hero -&gt; hero -&gt; hero]:</span>
<span class="token comment">// NullInjectorError: No provider for hero!</span>
<span class="token comment">// NullInjectorError: R3InjectorError(AppModule)[hero -&gt; hero -&gt; hero]:</span>
<span class="token comment">// NullInjectorError: No provider for hero!</span>
</code></pre></div><p>\u56DE\u5F52\u5230\u6211\u4EEC\u7684\u9700\u6C42\uFF0C\u6700\u540E\u7684\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-tsx"><pre><code><span class="token keyword">const</span> routes<span class="token operator">:</span> Route<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> redirectTo<span class="token operator">:</span> <span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span> pathMatch<span class="token operator">:</span> <span class="token string">&#39;full&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> path<span class="token operator">:</span> <span class="token string">&#39;home&#39;</span><span class="token punctuation">,</span> component<span class="token operator">:</span> HomeComponent<span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;\u4E3B\u9875&#39;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">&#39;hello/:name&#39;</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> HelloComponent<span class="token punctuation">,</span>
    resolve<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;titleResolver&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

@<span class="token function">NgModule</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>BrowserModule<span class="token punctuation">,</span> FormsModule<span class="token punctuation">,</span> RouterModule<span class="token punctuation">.</span><span class="token function">forRoot</span><span class="token punctuation">(</span>routes<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  declarations<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">,</span> HelloComponent<span class="token punctuation">,</span> HomeComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
  bootstrap<span class="token operator">:</span> <span class="token punctuation">[</span>AppComponent<span class="token punctuation">]</span><span class="token punctuation">,</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      provide<span class="token operator">:</span> <span class="token string">&#39;titleResolver&#39;</span><span class="token punctuation">,</span>
      <span class="token function-variable function">useValue</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> state<span class="token operator">:</span> RouterStateSnapshot</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        route<span class="token punctuation">.</span>params<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppModule</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><h3 id="title" tabindex="-1">Title <a class="header-anchor" href="#title" aria-hidden="true">#</a></h3><p>\u5728\u7EBF\u4EE3\u7801\uFF1A</p><p><a href="https://stackblitz.com/edit/angular-ivy-buvzoe?file=src/app/app.component.html" target="_blank" rel="noopener noreferrer">Angular Router (forked) - StackBlitz</a></p><p>\u5C55\u793A\u5730\u5740\uFF1A</p><p><a href="https://angular-ivy-buvzoe.stackblitz.io/" target="_blank" rel="noopener noreferrer">\u70B9\u51FB\u94FE\u63A5\u89C2\u5BDFtitle\u53D8\u5316</a></p><h3 id="\u9762\u5305\u5C51" tabindex="-1">\u9762\u5305\u5C51 <a class="header-anchor" href="#\u9762\u5305\u5C51" aria-hidden="true">#</a></h3><p><a href="https://stackblitz.com/edit/ng-zorro-breadcrumb-auto-tqp331?file=src/app/app.component.html" target="_blank" rel="noopener noreferrer">Ng Zorro Breadcrumb Auto (forked) - StackBlitz</a></p><p>\u53C2\u8003\uFF1A</p><p><a href="https://angular.io/guide/router-tutorial-toh#resolve-pre-fetching-component-data" target="_blank" rel="noopener noreferrer">Angular\u8DEF\u7531\u6559\u7A0B</a></p><p><a href="https://angular.io/api/router/Resolve" target="_blank" rel="noopener noreferrer">Angular\u6587\u6863\u4E2D\u7684Resolve</a></p><p><a href="https://www.jianshu.com/p/a34f9869918a" target="_blank" rel="noopener noreferrer">Angular8 \u8BBE\u5B9A\u9875\u9762\u6807\u9898title</a></p><p><a href="https://ng.ant.design/components/breadcrumb/zh#components-breadcrumb-demo-auto" target="_blank" rel="noopener noreferrer">Ng-Zorro:\u901A\u8FC7\u914D\u7F6Erouter.data\u81EA\u52A8\u751F\u6210\u9762\u5305\u5C51</a></p>`,26),e=[o];function c(l,r,u,k,i,d){return a(),s("div",null,e)}var m=n(p,[["render",c]]);export{h as __pageData,m as default};
