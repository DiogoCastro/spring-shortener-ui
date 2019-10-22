import React, { Component } from 'react';
import ReactTable from 'react-table'

import axios from './services/axios';
import './App.css';

class App extends Component{
  state = {
    data: [],
    address: '',
    shortenedUrl: ''
  }

  componentDidMount() {
    axios.get('/urls')
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  insertURL = (address) => {
    axios.post('/url/' + address)
      .then (res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }
  
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="intro">
              <h2>
                Olá! Esse é um encurtador de URL, apenas digite no campo abaixo a URL que deseja encurtar, clique no botão e aguarde a mágica acontecer.
              </h2>
              <div className="form-inline mt-5">
                  <input type="url" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="URL"/>
                  <button type="button" className="btn btn-primary ml-3">Inserir</button>
              </div>
          </div>
          <ReactTable
          data={this.data}
          noDataText="Não existem dados para serem mostrados."
          columns={[
            {
              Header: "URLs",
              columns: [
                {
                  Header: "Endereço Completo da URL",
                  accessor: "url"
                },
                {
                  Header: "Endereço encurtado da URL",
                  id: "urlShortened",
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: "Ações",
              columns: [
                {
                  Header: "",
                  accessor: ""
                }
              ]
            }
          ]}
          defaultPageSize={10}
          style={{ backgroundColor: '#fff' }}
          className="-striped -highlight mt-5"
        />
        </div>
      </div>
    );
  }
}

export default App;
