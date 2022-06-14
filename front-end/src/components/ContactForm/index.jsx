import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import FormGroup from '../FormGroup';
import { Form, ButtonContainer } from './styles';

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input type="text" placeholder="Name" />
      </FormGroup>

      <FormGroup>
        <Input type="text" placeholder="E-mail" />
      </FormGroup>
      <FormGroup>

        <Input type="text" placeholder="Phone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
          <option value="123">Instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{ buttonLabel }</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
