import { styled } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  GroupIntro,
  Feed,
  GroupPage,
  LogIn,
  UploadPost,
  SignUp,
  NotFound,
  MyPage,
  OAuthPage,
} from './AppBarral';

function App() {
  return (
    <BrowserRouter>
      <MobileS>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/LogIn'
            element={<OAuthPage component={<LogIn />} authenticated='block' />}
          />
          <Route
            path='/LogIn'
            element={<OAuthPage component={<SignUp />} authenticated='block' />}
          />
          <Route path='/groupIntro/:mindID' element={<GroupIntro />} />
          <Route
            path='/groupPage/:mindID'
            element={<OAuthPage component={<GroupPage />} authenticated='access' />}
          />
          <Route
            path='/uploadPost/:mindID'
            element={<OAuthPage component={<UploadPost />} authenticated='access' />}
          />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/myPage/:userID'
            element={<OAuthPage component={<MyPage />} authenticated='access' />}
          />
          <Route path='*' element={<NotFound />} />
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
