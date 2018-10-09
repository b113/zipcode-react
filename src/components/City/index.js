import React from 'react';
import { connect } from 'react-redux';
import { checkCity } from '../../actions';

class City extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    }

    this.chooseCity = this.chooseCity.bind(this);
  }

  chooseCity(id) {

    this.props.checkCity(id)
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    const { children, id } = this.props;
    return (
      <li
        key={id}
        zip={id}
        style={{ cursor: 'pointer' }}
        data-checked={this.state.isChecked}
        className={(this.state.isChecked ? "bg-danger" : "bg-light") + " list-group-item m-1 col-sm-7 col-md-5 mx-auto text-body text-center"}
        onClick={() => this.chooseCity(id)}
      >
        {children}
      </li>
    );
  }
}

export default connect(null, { checkCity })(City);
