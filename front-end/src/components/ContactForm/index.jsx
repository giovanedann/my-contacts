import PropTypes from 'prop-types';
import {
  forwardRef,
} from 'react';

import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';

import { ButtonContainer } from './styles';
import { useContactForm } from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  } = useContactForm({ onSubmit, ref });

  return (
    <form onSubmit={(event) => handleSubmit(event)} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Name *"
          value={name}
          error={getErrorMessageByFieldName('name')}
          onChange={(event) => handleNameChange(event)}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          error={getErrorMessageByFieldName('email')}
          onChange={(event) => handleEmailChange(event)}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          type="text"
          placeholder="Phone"
          maxLength="15"
          value={phone}
          onChange={(event) => handlePhoneChange(event)}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={({ target }) => setCategoryId(target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">No category selected</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
