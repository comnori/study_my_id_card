# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Prettier 사용하기

`prettier` 패키지를 이용해 코드 포매팅을 수행할 수 있습니다. 다음 명령으로 전체 소스를 포맷합니다.

```bash
npm run format
```

## VS Code 확장 추천

프로젝트를 편리하게 개발하기 위해 다음 VS Code 확장 설치를 권장합니다.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## React Router 사용하기

`react-router-dom`을 이용해 페이지를 라우팅하고 메뉴를 구성할 수 있습니다. 기본 절차는 아래와 같습니다.

1. 패키지 설치

   ```bash
   npm install react-router-dom
   ```

2. `src/main.jsx`에서 `BrowserRouter`로 애플리케이션을 감쌉니다.
3. `src/App.jsx`에서 메뉴와 라우트를 정의합니다.

   ```jsx
   import { Layout, Menu } from "antd";
   import { Link, Route, Routes } from "react-router-dom";

   <Layout>
     <Header>
       <Menu theme="dark" mode="horizontal">
         <Menu.Item key="home">
           <Link to="/">홈</Link>
         </Menu.Item>
         <Menu.Item key="about">
           <Link to="/about">소개</Link>
         </Menu.Item>
       </Menu>
     </Header>
     <Content>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
       </Routes>
     </Content>
   </Layout>
   ```

위와 같이 설정하면 두 개의 메뉴(홈, 소개)를 가진 기본적인 라우터가 완성됩니다.
