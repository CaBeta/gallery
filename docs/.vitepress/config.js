const baseUrl = "/gallery/";

module.exports = {
  title: "Gallery",
  base: baseUrl,
  themeConfig: {
    // 启动页面丝滑滚动
    smoothScroll: true,
    sidebar: {
      "/posts/": [
        {
          text: "Angular",
          children: [
            {
              text: "Angular router Resolver动态设置页面title和面包屑",
              link: "posts/angular/router-resolver",
            },
          ],
        },
        {
          text: "TypeScript", link: `posts/typescript/`, children: [
            {
              text: "TypeScript: 将Python接口风格转成Java接口风格",
              link: "posts/typescript/CamelCasedPropertiesDeep",
            },
          ]
        },
        { text: "RxJS", link: "posts/rxjs/" },
      ],
      "/game/": [
        { text: "五子棋", link: `game/gobang` },
        { text: "贪吃🐍", link: `game/snake` },
        { text: "扫雷", link: `game/minesweeper` },
      ],
    },
    // 导航栏配置
    nav: [
      { text: "技术分享", link: "/posts/" },
      { text: "小游戏", link: "/game/" },
      { text: "Github", link: "https://github.com/CaBeta/gallery" },
    ],
  },
};
