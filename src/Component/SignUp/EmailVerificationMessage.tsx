import styled from 'styled-components';

const EmailVerificationMessage = () => {
  return (
    <ContainerS>
      <TitleS>인증 메일이 오지 않았나요?</TitleS>
      <OrderedListS>
        <li>메일 주소가 정확한지 확인해 주세요.</li>
        <li>스팸 메일함/휴지통을 확인해 주세요.</li>
        <li>
          3분이 지나도 오지 않았다면 <ResendButtonS type='submit'>재전송</ResendButtonS>을
          눌러주세요.
        </li>
      </OrderedListS>
    </ContainerS>
  );
};

export default EmailVerificationMessage;

const ContainerS = styled.div`
  padding: 1rem;
  border-radius: 0.625rem;
  background-color: var(--color-bg);
`;

const TitleS = styled.p`
  margin-bottom: 0.5rem;
  font-size: var(--head-b);
  font-weight: 500;
`;

const OrderedListS = styled.ol`
  padding: 0.125rem 0 0.125rem 1.1875rem;
  color: #828282;
  font-size: var(--body-b);

  li {
    list-style: decimal;
  }
`;

const ResendButtonS = styled.button`
  padding: 0;
  color: var(--system-green);
  font-size: var(--body-b);
  text-decoration: underline;
`;
