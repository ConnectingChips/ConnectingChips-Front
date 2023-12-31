import { useState, Link, styled, useNavigate } from './LoginBarrel';
import { LogInS, LoginInputS, SignClearBtnS, Arrow_Right } from './LoginBarrel';
import Banner from '../../Component/SignUp/Banner';
// import useLoginCheck from '../../Hooks/useLoginCheck';
import { postLogin } from '../../API/login';
import { GroupHeader } from '../../Component/Mission/GroupHeader';

type bindValue = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

/** 2023-08-24 LogIn.tsx - 로그인 페이지 */
const LogIn = (): JSX.Element => {
  const [inputState, setInputState] = useState('default');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const idBind: bindValue = { value: nickname, setValue: setNickname };
  const pwBind: bindValue = { value: password, setValue: setPassword };
  const navigate = useNavigate();

  // TODO: 로그인 여부는 라우터에서 처리중(사용하지 않으면 삭제하기)
  // useLoginCheck(navigate, 'Done');

  const isDefault = inputState === 'default';

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await postLogin(nickname, password);
      localStorage.setItem('access_token', accessToken);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패');
      setInputState('failed');
    }
  };

  return (
    <LogInS>
      <GroupHeader text='로그인' />
      <Banner />
      <LoginOuterContainerS>
        <LoginFormS onSubmit={handleLoginSubmit}>
          <LoginContainerS>
            <LoginInnerContainerS>
              <LoginInput
                sort='ID'
                isdefault={isDefault}
                inputbind={idBind}
                setInputState={setInputState}
              />
              <LoginInput
                sort='PW'
                isdefault={isDefault}
                inputbind={pwBind}
                setInputState={setInputState}
              />
            </LoginInnerContainerS>
            {!isDefault && <p className='error'>아이디 혹은 비밀번호가 일치하지 않습니다</p>}
          </LoginContainerS>

          <SignClearBtnS type='submit'>로그인</SignClearBtnS>
        </LoginFormS>
        <NudgeSignS>
          <p className='hoxy'>회원이 아니신가요?</p>
          <Link to='/signUp'>회원가입</Link>
          <div className='img'>
            <img src={Arrow_Right} alt='arrowIcon' />
          </div>
        </NudgeSignS>
      </LoginOuterContainerS>
    </LogInS>
  );
};

export default LogIn;

interface LoginInputProps {
  sort: 'ID' | 'PW';
  isdefault: boolean;
  inputbind: bindValue;
  setInputState: React.Dispatch<React.SetStateAction<string>>;
}

const LoginInput = ({
  sort,
  isdefault,
  inputbind,
  setInputState,
}: LoginInputProps): JSX.Element => {
  const { value, setValue } = inputbind;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setInputState('default');
  };

  if (sort === 'ID')
    return (
      <LoginInputS
        placeholder='아이디를 입력해 주세요'
        className={isdefault ? '' : 'failed'}
        value={value}
        onChange={handleInputChange}
      />
    );

  return (
    <LoginInputS
      placeholder='비밀번호를 입력해 주세요'
      className={isdefault ? '' : 'failed'}
      type={true ? 'password' : 'text'}
      value={value}
      onChange={handleInputChange}
    />
  );
};

/** 2023-08-24 LogIn.tsx - 로그인 / 회원가입 배너 */
const LoginOuterContainerS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;

/** 2023-08-24 LogIn.tsx - 로그인 입력폼 */
const LoginFormS = styled.form`
  display: flex;
  flex-direction: column;
  height: 13.75rem;
  width: 100%;

  p.error {
    color: var(--system-red);
  }
`;

const LoginContainerS = styled.div`
  height: 9.28438rem;
  margin-bottom: 0.97rem;
`;

/** 2023-08-24 LogIn.tsx - 로그인 입력 컨테이너 */
const LoginInnerContainerS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.47rem;
`;

/** 2023-08-24 LogIn.tsx - 회원가입 유도 */
const NudgeSignS = styled.div`
  margin-top: 4.25rem;
  display: flex;
  justify-content: center;
  p {
    font-size: 0.875rem;

    &.hoxy {
      color: var(--font-color3);
      margin-right: 0.4rem;
    }
  }
  a {
    font-size: 0.875rem;
  }
  .img {
    width: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 3px;
  }
`;
