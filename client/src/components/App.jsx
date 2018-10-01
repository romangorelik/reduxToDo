import React from 'react'
import axios from 'axios'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'
import DeleteForever from '@material-ui/icons/DeleteForever'
import Divider from '@material-ui/core/Divider'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Assignment from '@material-ui/icons/Assignment';
import NoteAdd from '@material-ui/icons/NoteAddOutlined';
import CheckBox from '@material-ui/icons/CheckBoxOutlined'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';



class App extends React.Component {
  constructor (props) {
    super (props) 
    this.state = {
      todos: ['no', 'yes'],
      task: '',
      newTask: '',
      expanded: null
    }
  }

  componentDidMount () {
    this.getToDos()
  }


  handleChange (panel) {
    this.setState({
      expanded: expanded ? panel : false,
    })
  }

  onChange (e) {
    this.setState({task: e.target.value})
  }

  onNewChange (e) {
    this.setState({newTask: e.target.value})
  }

  getToDos () {
    axios.get('/todos')
      .then((res) => {
        this.setState({todos: res.data})
      })
  }

  addToDo (task) {
    axios.post('/todos', task)
      .then(res => {
        this.getToDos()
        this.setState({
          task: ''
        })
      })
      .catch(err => console.error(err))
  }

  deleteToDo (task) {
    axios.delete('/todos', {data: {task: task}})
      .then(res => {
        this.getToDos()
      })
      .catch(err => console.error(err))
  }

  updateToDo (task, newTask) {
    console.log(task, newTask)
    axios.put('/todos', {task: task, newTask: newTask})
      .then(res => {
        this.getToDos()
        this.setState({
          newTask: '',
          expanded: false
        })
      })
      .catch(err => console.error(err))
  }

  expanded () {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render () {
    return (
      <div>

        <List style={{width: '30%', margin: '6% auto'}}>
          <div style={{fontFamily: 'Courier New', textAlign: 'center', fontSize: '45px', marginBottom: "4%"}}>To Dos</div>

          {this.state.todos.map((todo, index) => (
            <div key={index + 10}>
            <ExpansionPanel expanded={this.state.expanded}>
              <ExpansionPanelSummary>
                <ListItem
                  role={undefined}
                  dense
                  button
                >
                  <ListItemIcon className='delete'>
                    <DeleteForever onClick={() => {this.deleteToDo(todo.task)}}/>
                  </ListItemIcon>
                  <ListItemText primary={`${todo.task}`} onClick={() => this.expanded()}/>
                </ListItem>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Input
                  onChange={(e) => {this.onNewChange(e)}}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end" variant='outlined'>
                      <CheckBox className='updateClick' onClick={() => this.updateToDo(todo.task, this.state.newTask)}/> 
                    </InputAdornment>
                  }
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>
          ))}
          <Divider />
          <FormControl style={{marginTop: '3%', marginLeft: '11%', display: 'inherit'}}>
            <Input
              onChange={(e) => {this.onChange(e)}}
              value={this.state.task}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start" variant='outlined'>
                  <Assignment /> 
                </InputAdornment>
              }
            />
            <NoteAdd onClick={() => {this.addToDo({task: this.state.task})}} className='buttonAdd' style={{float: 'right', marginRight: '4%'}}/>
          </FormControl>
        </List>
        
      </div>
    )
  }
}

export default App