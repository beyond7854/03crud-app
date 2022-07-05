//해당 문서에서 React기능을 사용하기 위해 import한다.
import React, {Component} from 'react';
import './App.css';

/* 
외부 js파일로 모듈화한 컴포넌트에 해당 문서로 import 하기 위한 구분으로,
각 컴포넌트의 마지막에 지정한 "export default 컴포넌트명"을 그대로 사용한다.
형식] import 변수로 사용할 이름(별칭) from '컴포넌트경로'
*/
import Subject from './components/Subject';
import Navi from './components/Navi';
import Content from './components/Content';

/* 
함수형 컴포넌트 대신 클래스형 컴포넌트를 사용해서 CRUD앱을 제작한다.
클래스형 컴포넌트 제작시 CDN방식에서는 React.Component를 상속하지만 웹팩방식에서는
아래와 같이 상속하면 된다. React는 상단 import구문에서 이미 정의되어 있기때문이다.
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: { title: 'WEB(st)', sub: 'World Wide Web(st)' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML은 내용을 출력합니다.' },
        { id: 2, title: 'CSS', desc: 'CSS는 스타일을 지정합니다.' },
        { id: 3, title: 'JavaScript', desc: "JS는 화면을 동적으로 제어합니다." }
      ],
      mode: 'welcome',
      welcome: { title: 'welcome', desc: 'Hello, React...!!' },
      selected_content_id: 2,
    }
  }
  render() {
    let _title, _desc = null;
    /*
    비교 연산자 == 은 값만 동일한지 비교한다.
    ===은 값과 타입까지 동일한지 비교하는 연산자이다. ES6에서 권장
    한다.
    */
    if (this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if (this.state.mode === 'read'){
      // _title = this.sate.contents[0].title;
      // _desc = this.contents[0].desc;
      var i =0;
      while(i< this.state.contents.length){
        var data = this.state.contents[i];
        if (data.id === this.state.selected_contents.id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++
      }
    }
    /*
    Step2 : props는 컴포넌트 추가시 HTML의 속성처럼 추가하는 부분으로 해당 컴포넌트에서
    사용시에는 "this.props.프롭스명"으로 기술하면 된다.
    Step4 : 생성자에서 state를 생성한 후 기존의 문자열을 state값으로 변경한다.
    Step5 : Navi를 클릭했을시 해당 내용으로 변경하기위해 state에 mode, welcome을 추가한다.
      현재 mode가 welcome이라면 환영 메세지를 출력하고, read라면 해당 컨텐츠를 출력할 것이다.
    Step7 : Navi 클릭할때 모드 변경을위해 select_content_id를 state에 추가한다.
    */
    return (
      <div className="App">
        {/*
        Subject 컴포넌트로 onChangePage라는 props를 전달한다. 자식에서
        호출시 mode를 welcome으로 변경하는 역할을 한다.
        */}
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}
        onChangePage={function(){
          alert("이벤트 확인용(부모)");
          this.setState({
            mode:'welcome',
          });
        }.bind(this)}></Subject>

        {/*
        Navi 컴포넌트로 onchangepage라는 props를 ㅈ넌달한다. 자식에서 호출시
        mode를 read로 변경하고 매개변수로 전달된 값으로 id를 변경한다.
         */}
        <Navi data={this.state.contents}
        onChangePage={function(id){
          alert('이벤트확인용 (navi)');
          console.log("content_id",id);
          this.setState({
            mode : 'read',
            selected_content_id : Number(id)
          }.bind(this))
        }}></Navi>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}
export default App;
