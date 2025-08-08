# study_my_id_card 프로젝트

## 📋 프로젝트 개요

React 초급자를 위한 스터디용 저장소로, ID 카드 관련 학습 프로젝트입니다. Vite 번들러를 활용하여 React 개발 환경을 구성하고, HMR(Hot Module Replacement)과 ESLint 규칙을 적용한 현대적인 React 애플리케이션 개발 방법을 학습할 수 있습니다.

## 🛠 기술 스택

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Code Formatting**: Prettier
- **Linting**: ESLint
- **Routing**: React Router DOM
- **UI Framework**: Ant Design

## 🚀 주요 기능 및 특징

### Vite 설정
- React용 최소 설정으로 빠른 개발 환경 제공
- HMR(Hot Module Replacement) 지원
- 두 가지 공식 플러그인 지원:
  - `@vitejs/plugin-react`: Babel 기반 Fast Refresh
  - `@vitejs/plugin-react-swc`: SWC 기반 Fast Refresh

### 코드 품질 관리
- Prettier를 통한 자동 코드 포매팅
- ESLint 규칙 적용으로 코드 일관성 유지

### 라우팅 시스템
- React Router DOM을 활용한 SPA 라우팅
- Ant Design Layout과 Menu 컴포넌트 활용
- 메뉴 기반 네비게이션 구현

## 🔧 설치 및 실행

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 코드 포매팅
```bash
npm run format
```

## 📁 프로젝트 구조

```
study_my_id_card/
├── src/
│   ├── main.jsx          # 애플리케이션 진입점
│   └── App.jsx           # 메인 애플리케이션 컴포넌트
├── package.json          # 프로젝트 설정 및 의존성
└── README.md            # 프로젝트 문서
```

## 🎯 학습 목표

### React 기초
- 컴포넌트 기반 개발 이해
- JSX 문법 숙달
- Props와 State 관리

### 라우팅 구현
- React Router DOM 활용법
- BrowserRouter 설정
- 동적 라우팅과 네비게이션

### 개발 환경 설정
- Vite 빌드 시스템 이해
- 코드 포매팅과 린팅 설정
- 개발 도구 활용법

## 🔨 라우팅 구현 가이드

### 1. 패키지 설치
```bash
npm install react-router-dom
```

### 2. main.jsx 설정
```jsx
import { BrowserRouter } from \"react-router-dom\";

// BrowserRouter로 애플리케이션 래핑
```

### 3. App.jsx 메뉴 및 라우트 구성
```jsx
import { Layout, Menu } from \"antd\";
import { Link, Route, Routes } from \"react-router-dom\";

<Layout>
  <Header>
    <Menu theme=\"dark\" mode=\"horizontal\">
      <Menu.Item key=\"home\">
        <Link to=\"/\">홈</Link>
      </Menu.Item>
      <Menu.Item key=\"about\">
        <Link to=\"/about\">소개</Link>
      </Menu.Item>
    </Menu>
  </Header>
  <Content>
    <Routes>
      <Route path=\"/\" element={<Home />} />
      <Route path=\"/about\" element={<About />} />
    </Routes>
  </Content>
</Layout>
```

## 💡 개발 환경 권장사항

### VS Code 확장 프로그램
프로젝트 개발의 편의성을 위해 다음 확장 프로그램 설치를 권장합니다:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### TypeScript 적용 고려사항
프로덕션 환경에서는 TypeScript 적용을 권장합니다:
- 타입 안전성 확보
- 더 나은 개발 경험
- 런타임 오류 사전 방지

## 📚 추가 학습 리소스

- [React 공식 문서](https://react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)
- [React Router 공식 문서](https://reactrouter.com/)
- [Ant Design 공식 문서](https://ant.design/)

## 📝 PR 변경 사항

- GitHub Pages 배포를 위해 `vite.config.js`의 `base` 경로를 `/study_my_id_card/`로 설정했습니다.

## 🤝 기여 방법

1. 이 저장소를 Fork합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 Push합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다
