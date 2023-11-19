import { Container } from './styles';

import emptyBox from '../../../../assets/images/empty-box.svg';

export default function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="empty box icon" />
      <p>
        You do not have any registered contact yet!
        Click on
        {' '}
        <strong>New Contact</strong>
        {' '}
        above to register your first contact!
      </p>
    </Container>
  );
}
