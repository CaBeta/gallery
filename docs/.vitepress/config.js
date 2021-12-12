const baseUrl = "/gallery/";

module.exports = {
  title: "Gallery",
  base: baseUrl,
  themeConfig: {
    // 启动页面丝滑滚动
    smoothScroll: true,
    sidebar: {
      "/posts/": [
        { text: "TypeScript", link: `posts/typescript/` },
        { text: "RxJS", link: "posts/rxjs/" },
      ],
      "/game/": [
        { text: "五子棋", link: `game/` },
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
