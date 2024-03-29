import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/style/global';
import defaultTheme from '../../assets/style/themes/default';
import { Container } from './styles';
import { Header } from '..';
import Router from '../../Router';
import ToastContainer from '../Toast/ToastContainer';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <Container>
          <Header />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
