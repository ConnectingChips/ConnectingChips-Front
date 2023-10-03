import { styled } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
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
  RouteChangeTracker,
  GroupCheck,
} from './AppBarral';

function App() {
  RouteChangeTracker();

  return (
    <MobileS>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/LogIn'
              element={<OAuthPage component={<LogIn />} authenticated='block' />}
            />
            <Route
              path='/SignUp'
              element={<OAuthPage component={<SignUp />} authenticated='block' />}
            />
            <Route
              path='/groupIntro/:mindId'
              element={<GroupCheck component={<GroupIntro />} sort='Intro' />}
            />
            <Route
              path='/groupPage/:mindId'
              element={<GroupCheck component={<GroupPage />} sort='Page' />}
            />
            <Route
              path='/uploadPost/:mindId'
              element={<GroupCheck component={<UploadPost />} sort='Upload' />}
            />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/myPage/:userId'
              element={<OAuthPage component={<MyPage />} authenticated='access' />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
    </MobileS>
  );
}

export default App;

/** 2023-08-20 App.tsx 모바일 케이스 */
const MobileS = styled.div`
  display: flex;
  justify-content: center;
`;
