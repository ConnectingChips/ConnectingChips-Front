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
import { MyInfoContext, MyListContext } from './API/Context';
import useMyContext from './Hooks/useMyContext';
import GroupCheck from './Component/GroupCheck';

function App() {
  RouteChangeTracker();
  const { myInfo, setMyInfo, myList, setMylist } = useMyContext();

  return (
    <MobileS>
      <MyInfoContext.Provider value={{ myInfo, setMyInfo }}>
        <MyListContext.Provider value={{ myList, setMylist }}>
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
            <Route path='/groupPage/:mindID' element={<GroupCheck component={<GroupPage />} />} />
            <Route path='/uploadPost/:mindID' element={<GroupCheck component={<UploadPost />} />} />
            <Route path='/feed' element={<Feed />} />
            <Route
              path='/myPage/:userID'
              element={<OAuthPage component={<MyPage />} authenticated='access' />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </MyListContext.Provider>
      </MyInfoContext.Provider>
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
