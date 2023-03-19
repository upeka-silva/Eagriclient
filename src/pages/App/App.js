import logo from '../../logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectSample } from '../../redux/selectors/sample/selectors';
import { updateSample } from '../../redux/actions/sample/actions';
import { Input, Card } from '@mui/material';

const App = () => {

  const dispatch = useDispatch();
  const sample = useSelector(selectSample);

  const onChange = (e) => {
    dispatch(updateSample(e?.target?.value));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Card>
          <p>{sample}</p>
          <Input onChange={onChange} />
        </Card>
      </header>
    </div>
  );
}

export default App;
