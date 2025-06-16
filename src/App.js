
//import logo from './logo.svg';
import { Component } from 'react';
import TOC from './component/TOC';
import Subject from './component/Subject';
import ReadContent from './component/ReadContent';
import Control from './component/Control';
import CreateContent from './component/CreateContent';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      mode: 'read',
      selected_content_id : 2,
      subject:{title:'WEB', sub:'World Wide WEb!'},
      welcome:{title:'Welcome', desc:'Hellp React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render(){
    console.log('App render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === 'read'){
      var i = 0;
      while (i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === 'create'){
      _article = <CreateContent></CreateContent>;
    }
    return(
      <div className='App'>
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode : 'welcome'});
          }.bind(this)}
          ></Subject>
        <TOC
          onChangePage={function(id){
            this.setState({
              mode : 'read',
              selected_content_id : Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode : _mode
          });
        }.bind(this)}
        ></Control>
        {_article}
      </div>
    );
  }
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
