import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function ErrorRadios(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = useState('Choose wisely');
  const [data, setData] = useState({})	
  const [open, setOpen] = React.useState(true);

  useEffect( () => {

    console.log(props);
  		const fetchData=async()=>await  axios.get(
		`/courseSubItems/${props.queryId}`
		)
		.then((res)=>{
			console.log(res);
			setData(
				{
				"content":decodeURIComponent(res.data.data.courseSubItem.subItem.mcqStatement).replace(/\n/gmi,"<br />")
				,"title":res.data.data.courseSubItem.subItem.mcqTitle,
				"options":res.data.data.courseSubItem.subItem.options,
				'answer':res.data.data.courseSubItem.subItem.answer
				,id:res.data.data.courseSubItem._id,subItemId:res.data.data.courseSubItem.subItem._id}
			);
        if(props.attempt) checkAnswer();
    }

		)
		.catch((err)=>console.error(err));
    fetchData();
  }, [props])

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText('Choose wisely');
    setError(false);
  };
  const checkAnswer=async ()=>{
    const checkVal=props.attempt?props.attemptData.attemptString:value;
    if (checkVal === data.answer) {
      setHelperText('You got it!');
      setError(false);
    } else if (checkVal !== data.answer) {
      setHelperText('Sorry, wrong answer!');
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    checkAnswer().then(async ()=>{
      console.log(value===data.answer);
       const options = {
       method: 'POST',
        url: '/attempts',
        data: {
          attemptType:"MCQ",
          attemptLanguage: "C",
          attemptString: value,
          attemptResult:((value===data.answer)?"correct":"wrong"),
          attemptTitle:data.title,
          userId:localStorage.getItem("userId"),
          problemId:data.id,subItemId:data.subItemId
        }
    };
    await axios.request(options)
      .then((res)=>{
        console.log(res.data);
        })
      .catch((err)=>console.error(err));

    })
  };
  if(!data.options||data.options.length===0) return  "laoding...";
  return (
    <div>
    <form onSubmit={handleSubmit}>

    <Typography variant="h4" noWrap>
           {data.title}
          </Typography>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <FormLabel component="legend">{data.content}</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
          {
          	data.options.map((value,index)=>{
         		return <FormControlLabel key={index} value={value} control={<Radio />} label={value} /> 		
          	})
          }
          {/*<FormControlLabel value="worst" control={<Radio />} label="The worst." />*/}
        </RadioGroup>
        {/* style={helperText.localeCompare("You got it!")===0?{backgroundColor:"#e8f5e9"}:{backgroundColor:"#d9534f",color:"white"}} */}
        <FormHelperText>{helperText.localeCompare("You got it!")===0 &&
        <Alert severity="success">
        <AlertTitle>Correct</AlertTitle>
        {helperText}
        </Alert>}{helperText.localeCompare("Sorry, wrong answer!")===0 && <Alert severity="error">
        <AlertTitle>Wrong</AlertTitle>
        {helperText}
      </Alert>}{(helperText.localeCompare("Please select an option.")===0 || helperText.localeCompare("Choose wisely")===0) && <Alert severity="info">
        <AlertTitle>Pick an option</AlertTitle>
        {helperText}
      </Alert>}</FormHelperText>
        <Button type="submit" onClick={()=>setOpen(true)}  variant="outlined" color="primary" className={classes.button}>
          Check Answer
        </Button>
      </FormControl>
    </form>
    </div>
  );
}
