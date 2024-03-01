import useCommonStore from '@/store/useCommonStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Component = () => {
  const { loginUser, setLoginUser } = useCommonStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('pocketbase_auth'));
    if (!loginUser.nickname && auth?.model.nickname) {
      setLoginUser({ id: auth.model.id, nickname: auth.model.nickname });
    }

    if (!loginUser.nickname && !auth?.model.nickname) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    }
  }, []);

  return (
    <section>
      <h2>홈</h2>
      <span>{loginUser.nickname}님 안녕하세요!</span>
    </section>
  );
};

Component.displayName = 'Home';
