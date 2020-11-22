import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CodeEditor from './CodeEditor';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    
  },
}));

export default function FullWidthGrid(props) {
  const [data, setData] = useState({})
  const classes = useStyles();
   useEffect(() => {
  	const fun= async () => {
  		await axios.get(
		`/courseSubItems/5fafeec106ccb1909bbc2bb0`
		)
		.then((res)=>{
			console.log(res.data.data);
			setData(
				{
				"content":decodeURIComponent(res.data.data.courseSubItem.subItem.problemStatement).replace(/\n/gmi,"<br />")
				,"title":decodeURIComponent(res.data.data.courseSubItem.subItem.problemTitle),
				"testCases":res.data.data.courseSubItem.subItem.testCases,
				"correctOutput":res.data.data.courseSubItem.subItem.correctOutput
				,"id":res.data.data.courseSubItem.subItem._id}
			);}
		)
		.catch((err)=>console.error(err));

  	};
    fun();
  }, [])
 if(!data.content) return "loading...";
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        
        <Grid item xs={6} sm={5}>
          <Paper style={{"height":"80vh"}} className={classes.paper}>
          	<h1>{data.title}</h1>
          	<p>{data.content}</p>
  			<p><b>Input:</b></p>
          		<div className="jumbotron">
          		
          			{
          				data&&data.testCases&&data.testCases.map((value,index)=>{
          					return (
          							<p key={index}>
          							{decodeURIComponent(value)}<br />
          							</p>
          						)
          				})
          			}
          		</div>
          		<p><b>Output:</b></p>
          		<div className="jumbotron">
          		
          			{
          				data&&data.correctOutput&&data.correctOutput.map((value,index)=>{
          					return (
          							<p key={index}>
          							{decodeURIComponent(value)}<br />
          							</p>
          						)
          				})
          			}
          		</div>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper style={{"height":"80vh"}} className={classes.paper}>

          	<CodeEditor data={data} />
          </Paper>
        </Grid>
        
        </Grid>
    </div>
  );
}
