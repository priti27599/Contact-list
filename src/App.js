import React, { Component } from 'react';
import styles from './App.css';

class App extends Component {


  state = {
    users: null,
    total: null,
    per_page: null,
    current_page: 1
  }


  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }

  makeHttpRequestWithPage = async pageNumber => {
    const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  }


  render() {

    let users, renderPageNumbers;

    if (this.state.users !== null) {
      users = this.state.users.map(user => (
        <div className="card" key={user.id}>
          <img src={user.avatar} alt="" className="img" />
          <div className="name">{user.first_name}{" "}{user.last_name}</div>
        </div>
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ? styles.active : '';

        return (
          <span key={number} className="class" onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
      });
    }

    return (


      <div className="app list-group mb-4">
        <h1 class="header">Contact List</h1>
        <div className="main">
          {users}
        </div>


        <div className="pagination">
          <div className="box1">
            <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
          </div>
          <div className="box2">
            {renderPageNumbers}
          </div>
          <div className="box3">
            <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
          </div>
        </div>

      </div>
    );
  }

}

export default App;
