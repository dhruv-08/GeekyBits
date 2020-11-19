import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import {createMuiTheme} from '@material-ui/core/styles';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter } from 'react-router-dom';

import Tutorial from './components/Content/Tutorial/Tutorial';
import Course from './components/Course';
import Material from './components/Material';
//To Change Default Material UI Theme
const theme=createMuiTheme({
	palette:{
		primary:{
			500:"rgb(7, 54, 64);"
		}
	}
});



function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    	<CssBaseline />
    <div className="App">
      {/* <Tutorial /> */}
      <Login/>
      {/* <Course/> */}
      {/* <Material/> */}
    </div>
    </ThemeProvider>

    </BrowserRouter>
  );
}

export default App;
