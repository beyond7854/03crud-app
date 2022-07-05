import React, { Component } from "react";

class Navi extends Component {

    render() {
        //빈 배열 변수 선언
        let lists = [];
        //프롭스로 전달된 값(배열)을 변수에 저장
        let data = this.props.data;
        let i = 0;
        //배열의 크기만큼 반복한다.
        while (i < data.length) {
            //앞에서 생성한 빈 배열에 <li>태그를 하나씩 추가한다.
            lists.push(<li key={data[i].id}>
                <a href={"/content/" + data[i].id}
                    data-id={data[i].id}
                    onClick={function(event){
                        console.log(event);
                        event.preventDefault();
                        this.props.onChangePage(event.target.dataset.id);
                    }.bind(this)}
                >{data[i].title}</a>
            </li>);
            i++;
        }
        /* 
        React에서는 <li>, <td>태그와 같이 반복되는 코드가 있다면 중복되지 않는
        "key"라는 이름의 props를 요구한다. 따라서 일련번호와 같이 중복되지 않는
        특정값을 사정해줘야 한다. <li key=일련번호>와 같이 기술한다.
        */
       
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default Navi;