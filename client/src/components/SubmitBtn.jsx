import { useNavigation } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type='submit'
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting' : 'Submit'}
    </button>
  );
};

SubmitBtn.propTypes = {
  formBtn: PropTypes.bool,
};

export default SubmitBtn;
