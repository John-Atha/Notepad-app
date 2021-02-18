import React from 'react';
import './App.css';


class Note extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text,
    }
  }

  deleteNote = (event) => {
    console.log("deleting");
    console.log(event.target.parentNode);
    event.target.parentNode.parentNode.classList.add("disappear");

    setTimeout(() => {
      event.target.parentNode.parentNode.style.display="none"
    }, 500);
  }

  textUpdate = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  titleUpdate = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  changeColor = (event) => {
    if(event.target.id==="color-2") {
      event.target.parentNode.parentNode.style.backgroundColor=event.target.dataset.color;
    }
    else {
      event.target.parentNode.parentNode.parentNode.style.backgroundColor=event.target.dataset.color;
    }
  }

  render () {
    return (
      <div className="note note-grid" key={this.state.key}>
        <div className="first-line-container">
          <textarea className="note-title" value={this.state.title} onChange={this.titleUpdate} ></textarea>
          <button className="note-delete" onClick={this.deleteNote}>X</button>
        </div>
        <textarea className="note-text" value={this.state.text} onChange={this.textUpdate} ></textarea>
          <div className="color-picker">
            <button id="color-2" className="color" data-color="rgb(240, 128, 128)" onClick={this.changeColor} >Important</button>
            <div className="color-line2">
              <button id="color-1" className="color" data-color="rgb(110, 175, 110)" onClick={this.changeColor} >Fun</button>
              <button id="color-3" className="color" data-color="rgb(245, 245, 143)" onClick={this.changeColor} >Other</button>
            </div>
          </div>
      </div>
    )
  }
}

class NotesContainer extends React.Component {
   
  constructor(props) {
    super(props);

    this.state = {
      notes : [
        {
          title: "Note title",
          text: "Text"
        }
      ]
    }
  }


  addNew = () => {
    let oldNotes = this.state.notes;
    oldNotes.push({
      title: "note",
      text: "test..",
    })
    this.setState({
      notes: oldNotes
    })
    localStorage.setItem('notesList4', this.state.notes);
  }

  render() {
    //this.clean();
    console.log("retrieved notes");
    return (
      <div id="main-container">
        <div className="add-button-container">
          <button className="add" onClick={this.addNew}>Add new note</button>
        </div>
        <div className="notes-container">
          {
            this.state.notes.map((value, index)=> {
              console.log(index);
                return <Note key={index} title={value.title} text={value.text}/>
            })
          }
        </div>
      </div>
    )
  }

}

class App extends React.Component {
  
  constructor(props) {
    let name = ""
    if (props.user===null) {
      name="My";
    }
    else {
      name= props.user + "'s";
    }
    super(props);
    this.state = {
      user: name
    }
  }

  render() {
    return (
      <div className="container">
        <h2>{this.state.user} Notes</h2>
        <NotesContainer />
      </div>
    )
  }

}

export default App;