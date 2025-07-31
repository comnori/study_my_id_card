import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Work from "./pages/Work.jsx";

function App() {
  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw", maxWidth: "100vw" }}>
      <Header style={{ padding: 0 }}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">홈</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">소개</Link>
          </Menu.Item>
          <Menu.Item key="work">
            <Link to="/work">작업화면</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </Content>
      <Footer>푸터</Footer>
    </Layout>
  );
}

export default App;
