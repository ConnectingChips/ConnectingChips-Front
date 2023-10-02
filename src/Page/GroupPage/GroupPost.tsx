import { styled } from 'styled-components';
import { PageSort } from '../../Type/Mind'; 
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { useState } from 'react';
import { BoardsType } from '../../API/Boards';
import { GetUser } from '../Home/HomeBarrel';
interface GroupGroupPostProps {
  passsort: PageSort;
  postData: BoardsType;
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
  userInfo: GetUser;
}

const GroupPost = ({
  passsort,
  postData,
  refreshBind,
  userInfo,
}: GroupGroupPostProps): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false);
  const editbind = {
    edit,
    setEdit,
  };

  return (
    <GroupPostS passsort={passsort}>
      <PostS>
        <PostHeader
          editbind={editbind}
          postData={postData}
          refreshBind={refreshBind}
          userInfo={userInfo}
        />
        {postData.image !== '' && (
          <PostImageS>
            <img src={postData.image} alt='업로드 사진' />
          </PostImageS>
        )}
        <PostContent editbind={editbind} postData={postData} refreshBind={refreshBind} />
      </PostS>
    </GroupPostS>
  );
};

export default GroupPost;

const GroupPostS = styled.div<{ passsort: PageSort }>`
  margin: ${(props) => (props.passsort === 'Intro' ? '0 1rem 1rem 1rem' : null)};
  margin: ${(props) => (props.passsort === 'Page' ? '0 1rem 0 1rem' : null)};

  h2 {
    margin-bottom: var(--height-gap);
  }
`;

const PostS = styled.article`
  border-radius: 0.5rem;
  background-color: var(--color-bg);
`;

const PostImageS = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
`;
