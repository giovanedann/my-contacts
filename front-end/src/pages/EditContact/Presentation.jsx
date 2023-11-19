import PropTypes from 'prop-types';
import { Loader, ContactForm, PageHeader } from '../../components';

export default function Presentation({
  isLoading, contactName, contactFormRef, onSubmit,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Loading...' : `Edit ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Save Changes"
        onSubmit={(formData) => onSubmit(formData)}
      />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  contactName: PropTypes.string.isRequired,
  contactFormRef: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
};
