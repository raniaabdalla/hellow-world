import React, {Component} from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';

class App extends Component {
  state= {
    persons:[
      {id:'qwe', name:'max', age: 28},
      {id:'asd', name:'manu', age: 29},
      {id:'zxc', name:'stephani', age: 26}
    ], 
    otherState: 'some other value',
    showPersons:false
  }

  
   nameChangedHandler = (event, id) => {
   const personIndex = this.state.persons.findIndex(p => {
     return p.id === id;
     });
     const person = { 
       ...this.state.persons[personIndex]
     };
     person.name = event.target.value;
     const persons = [...this.state.persons];
     persons[personIndex] = person;


    this.setState({ persons:persons});
   } 


   deletepersonHandler = (personIndex) => {
    // const persons= this.state.persons.slice;
    const persons= [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
   }
   togglePersonsHandler =() => {
     const doesShow = this.state.showPesons;
     this.setState({showPersons: !doesShow});    
      }

   render() {
     const style = {
       backgroundColor:'green',
       color:'white',
       font:'inherit',
       border:'1px solid blue',
       padding: '8px',
       cursor:'pointer',
       ':hover':{
         backgroundColor:'lightgreen',
         color: 'black'
       }
     };

     let persons= null;

     if (this.state.showPersons){
       persons= (
          <div>
            {this.state.persons.map((person, index) => {
              return <Person 
              click = {() => this.deletepersonHandler(index)}
              name= {person.name } 
              age = {person.age}
              key = {person.id}
              changed = {(event) => this.nameChangedHandler(event, person.id)}
              />
             })}
         </div>
       ) 
       style.backgroundColor='red';
       style[':hover'] = {
         backgroundColor: 'salmon',
         color: 'black'
       };
     }
    
    const classes = [];
    if (this.state.persons.length<= 2){
      classes.push('red');
    }
    if (this.state.persons.length<=1){
      classes.push('bold');
    }
    return (
      <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className= {classes.join(' ')}>This is really working</p>
        <button
        style={style}
        onClick= {this.togglePersonsHandler}>Switch Name</button>
        {persons}
      </div>
      </StyleRoot>
    );
  // return React.createElement('div',null, React.createElement('h1', null, 'does this work'))
}
}
export default Radium(App);




   