import { styled } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, GroupIntro, Feed, GroupPage, LogIn, UploadPost, SignUp, NotFound } from "./AppBarral";

function App() {
  return (
    <BrowserRouter>
      <MobileS>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groupIntro/:uuid" element={<GroupIntro />} />
          <Route path="/groupPage/:uuid" element={<GroupPage />} />
          <Route path="/uploadPost/:postID" element={<UploadPost />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MobileS>
    </BrowserRouter>
  );
}

export default App;

/** 2023-08-20 App.tsx 모바일 케이스 */
const MobileS = styled.div`
  max-width: var(--width-mobile);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
