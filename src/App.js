import React, { Component } from 'react';
import ReactTable from 'react-table';
import { MdModeEdit,MdDelete } from 'react-icons/md';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';

import FormComponent from './components/FormComponent/FormComponent';

import axios from './services/axios';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      urlData: [],
      err: false,
      alertInsert: false,
      alertDelete: false,
      modalIsOpen: false,
      id: null
    }
  }

  componentDidMount() {
    axios.get('/')
      .then(res => {
        this.setState({ urlData: res.data });
      }).catch(err => {
        this.setState({ err: true })
      })
  }

  insertURL = (address) => {
      axios.post('/url', {"url": address, "urlShortened": "", "active": true})
        .then(res => {
          this.state.urlData.push(res.data);
          this.setState({ urlData: this.state.urlData, alertInsert: true });
        }).catch(err => {
        this.setState({ err: true })
      })
    }
    
    closeModal = () => {
      this.setState({ modalIsOpen: false });
    }

    toggleEdit = (id) => {
      this.setState({ modalIsOpen: true, id: id})
    }
    
    editURL = (edditAddress) => {
      axios.put('/url/' + this.state.id, {"url": edditAddress, "active": true})
        .then(res => {
          this.setState({ urlData: this.state.urlData, modalIsOpen: false });
          window.location.reload(true)
        })
    }

    deleteURL = (id) => {
    axios.delete('/url/' + id)
      .then(res => {
        const index = this.state.urlData.findIndex(url => {
          return url.id === id
        })
        this.state.urlData.splice(index, 1);
        this.setState({ urlData: this.state.urlData, alertDelete: true });
      })
  }
  
  render() {
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
                  onClick={() => this.toggleEdit(row.original.id)}
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
    let newData = [...this.state.urlData];
    return (
      <div className="App">
        <Alert
        toggle={() => this.setState({alertInsert: false})}
        isOpen={this.state.alertInsert}
        color="info"
        className="alert">Item inserido com sucesso!</Alert>

        <Alert
        toggle={() => this.setState({alertDelete: false})}
        isOpen={this.state.alertDelete}
        color="danger">Item excluído com sucesso!</Alert>

        <Alert
        toggle={() => this.setState({err: false})}
        isOpen={this.state.err}
        color="danger">Ocorreu um erro inesperado, por favor aguarde.</Alert>

        <div className="container">
          <div className="intro">
              <h2>
                Olá, seja bem-vindo! Apenas cole no campo abaixo a URL que deseja encurtar, clique no botão e aguarde a mágica acontecer.
              </h2>
              <FormComponent insertURL={this.insertURL}/>
          </div>

          <ReactTable
            data={newData}
            columns={columns}
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
        
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.closeModal}>
            Alterar URL
          </ModalHeader>

          <ModalBody className="modalBody">
            <FormComponent insertURL={ this.editURL }/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default App;