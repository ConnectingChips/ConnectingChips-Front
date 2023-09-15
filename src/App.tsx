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
} from './AppBarral';
import RouteChangeTracker from './RouteChangeTracker';

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
