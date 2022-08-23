import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { ApplicationState } from '../../../redux/store';

const useCheckUser = () => {
  const navigate = useNavigate();
  const user = useSelector((state: ApplicationState) => state.user)

  useEffect(() => {
    if(user.id) {
      navigate('/login/profile')
    }
  }, [user, navigate])
}

export default useCheckUser;
