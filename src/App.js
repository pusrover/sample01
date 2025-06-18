
//import logo from './logo.svg';
import { Component } from 'react';
import TOC from './component/TOC';
import Subject from './component/Subject';
import ReadContent from './component/ReadContent';
import Control from './component/Control';
import CreateContent from './component/CreateContent';
import UpdateContent from './component/UpdateContent';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.max_content_id = 3;
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

  getReadContent(){
    var i = 0;

    while (i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
      }
      i = i + 1;
    }    
  }


  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if(this.state.mode === 'read'){
      
      /*      
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
        */
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if(this.state.mode === 'create'){
      _article = <CreateContent
        onSubmit={function(_title, _desc){
          this.max_content_id = this.max_content_id + 1;
          var _content = this.state.contents.concat(
            {id : this.max_content_id, title : _title, desc : _desc}
          );
          this.setState({
            contents : _content,
            mode:'read',
            selected_content_id:this.max_content_id
          });
          console.log(_title, _desc);
          }.bind(this)}>
      </CreateContent>;
    } else if (this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={ function(_id, _title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;

        while( i < _contents.length){
          if( _contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc };
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });
      }.bind(this)}></UpdateContent>
    }
  
    return _article;
  }

  render(){
    console.log('App render');
    
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
        {this.getContent()}
      </div>
    );
  }
}


export default App;
