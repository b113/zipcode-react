import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addItem } from '../../actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: '',
      modal: false,
      zip: ''
    };

    this.clearText = this.clearText.bind(this);
    this.changeText = this.changeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getZip = this.getZip.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      error: false,
      networkError: false,
    });
  }

  getData(text) {
    const { addItem } = this.props;
    axios(`https://www.zipwise.com/webservices/zipinfo.php?key=4wr846f4qbamf84b&zip=${text}&format=json`)
      .then((response) => {
        this.setState({
          error: '',
        });

        const city = response.data.results.cities[0].city;

        const state = response.data.results.state;
        if (this.checkCity(city)) {
          const newItem = {
            text,
            city,
            state,
            checked: false,
          };

          addItem(newItem);
        }
      })
      .catch((error) => {
        if (error instanceof TypeError) {
          this.setState({
            error: true,
            modal: true,
          });
        } else {
          this.setState({
            networkError: true,
            modal: true,
          });
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text } = this.state;
    this.getData(text);
    if (text) {
      this.clearText();
    }
  }

  changeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  clearText() {
    this.setState({
      text: '',
    });
  }

  checkCity(city) {
    const { cities } = this.props;
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].city === city) {
        this.setState({
          modal: true,
          error: false,
        });
        return false;
        break;
      }
    }
    return true;
  }

  getZip() {
    const { cities } = this.props;
    cities.map(item => {
      if (item.checked) {
        this.setState({
          zip: item.text,
        });
      }
    })
  }

  clearZipState() {
    this.setState({
      zip: '',
    });
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (this.props.cities !== nextProps.cities) {
      this.clearZipState();
      this.getZip()
    }
    return true;
  }

  render() {
    const { text, error, networkError } = this.state;
    return (
      <div className="text-center">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} >Oops!</ModalHeader>
          <ModalBody className="text-center h4">
            {
              error ? (
                "It is not a valid ZIP code"
              ) : (networkError) ? (
                "Network error! Try again later"
              ) : (
                    "You've already added it!"
                  )
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>

        <form onSubmit={this.handleSubmit} className="form-inline justify-content-center m-4">
          <div className="form-group mx-1">
            <input required type="text" className="form-control px-3" placeholder={this.state.zip ? this.state.zip : "Enter a Zip Code"} value={text} onChange={this.changeText} />
          </div>
          <div className="form-group mx-1">
            <button type="submit" className="btn text-black-50 px-4">Go</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ cities: state });

export default connect(mapStateToProps, { addItem })(Form);
