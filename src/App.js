import React, { Component } from 'react';
import ReactTable from 'react-table';
import { MdModeEdit,MdDelete } from 'react-icons/md';

import FormComponent from './components/FormComponent/FormComponent';

import axios from './services/axios';
import './App.css';

class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      urlData: [],
      showModal: false,
      address: '',
      shortenedUrl: ''
    }
  }
  
  componentDidUpdate() {
    axios.get('/')
      .then(res => {
        this.setState({ urlData: res.data });
      }).catch(err => {
        console.log(err);
      })
  }

  insertURL = (address) => {
    axios.post('/url', {"url": address, "urlShortened": "", "active": true})
      .then (res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
  }

  deleteURL = (id) => {
    axios.delete('/url/' + id)
      .then(res => {
        console.log(res, "Excluído com sucesso!");
      }).catch(err => {
        console.log(err);
      })
  }
  
  render() {
    const { urlData } = this.state;
    const columns = [
      {
        Header: "URL",
        columns: [
          {
            Header: "Endereço completo da URL",
            accessor: "url"
          },
          {
            Header: "Ações",
            accessor: "actions",
            maxWidth: 90,
            Cell: row => (
              <div>
                <button 
                  className="button-actions"
                  
                >
                  <MdModeEdit />
                </button>
                <button 
                  className="button-actions"
                  onClick={ () => this.deleteURL(row.original.id)}
                >
                  <MdDelete />
                </button>
              </div>
            )
          }
        ]
      },
      {
        Header: "URL ENCURTADA",
        columns: [
          {
            Header: "Endereço encurtado da URL",
            accessor: "urlShortened"
          }
        ]
      }
    ]

    return (
      <div className="App">
        <div className="container">
          <div className="intro">
              <h2>
                Olá! Esse é um encurtador de URL, apenas digite no campo abaixo a URL que deseja encurtar, clique no botão e aguarde a mágica acontecer.
              </h2>

              <FormComponent insertURL={this.insertURL}/>
              
          </div>

          <ReactTable
            data={urlData}
            columns={columns}
            onFetchData={ (state, instance) => {
              axios.get('/')
              .then(res => {
                this.setState({ urlData: res.data });
              }).catch(err => {
                console.log(err);
              })
            }}
            noDataText="Não existem dados para serem mostrados."
            previousText="Anterior"
            nextText="Próxima"
            pageText="Página"
            ofText="de"
            rowsText="linhas"
            style={{ backgroundColor: '#fff' }}
            defaultPageSize={10}
            className="-striped -highlight mt-5"
          />
        </div>
      </div>
    );
  }
}

export default App;
