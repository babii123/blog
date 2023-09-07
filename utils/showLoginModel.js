import NiceModal from '@ebay/nice-modal-react';
import Login from '../components/other/Login' 

const showLoginModel = () => {
      NiceModal.show(Login).then((res) => {
            console.log(res);
      }, err => {
            console.log(err);
      })
}
export default showLoginModel