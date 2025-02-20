import LoginInfoSection from '@/components/molecule/register/Sections/LoginInfoSection';
import NameSection from '@/components/molecule/register/Sections/NameSection';
import PhoneSection from '@/components/molecule/register/Sections/PhoneSection';
import TermSection from '@/components/molecule/register/Sections/TermSection';
import ButtonSection from '@/components/molecule/register/Sections/ButtonSection';
import useRegisterStore from '@/store/useRegisterStore';
import { pb, randomNickName } from '@/util';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCommonStore from '@/store/useCommonStore';

const fetchRegister = async (data) => {
  const result = await pb.collection('users').create(data);

  return result;
};

const fetchLogin = async (data) => {
  pb.authStore.clear();
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  const result = await pb
    .collection('users')
    .authWithPassword(data.username, data.password);

  return result;
};

const RegisterForm = () => {
  const { clearRegisterState } = useRegisterStore((state) => state);
  const { setIsPending, setLoginUser } = useCommonStore((state) => state);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const registerData = {};

    for (let key of formData.keys()) {
      registerData[key] = formData.get(key);
    }
    registerData['nickname'] = randomNickName();

    setIsPending(true);
    fetchRegister(registerData)
      .then(() => fetchLogin(registerData))
      .then((data) => {
        sessionStorage.setItem('token', data.token);
        setTimeout(() => {
          const model = JSON.parse(localStorage.getItem('pocketbase_auth'));

          setLoginUser({
            id: model.id,
            nickname: model.nickname,
            thumbnail: `${window.location.origin}/assets/common/guest.svg`,
          });
          navigate('/');
          clearRegisterState();
          setTimeout(() => setIsPending(false), 500);
        }, 1000);
      });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="register-form flex w-[1720px]">
        <NameSection />
        <PhoneSection />
        <LoginInfoSection />
        <TermSection />
      </div>
      <ButtonSection />
    </form>
  );
};

export default RegisterForm;
