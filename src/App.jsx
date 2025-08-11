import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Work from "./pages/Work.jsx";
import Todo from "./pages/Todo.jsx";

function App() {
  const menuItems = [
    {
      key: "home",
      label: <Link to="/">홈</Link>,
    },
    {
      key: "about",
      label: <Link to="/about">소개</Link>,
    },
    {
      key: "work",
      label: <Link to="/work">작업화면</Link>,
    },
    {
      key: "todo",
      label: <Link to="/todo">할일</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw", maxWidth: "100vw" }}>
      <Header style={{ padding: 0 }}>
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
      <Content style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Content>
      <Footer>푸터</Footer>
    </Layout>
  );
}

export default App;
