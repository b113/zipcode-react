import React from 'react';
import { connect } from 'react-redux';
import City from '../City';

class CitiesList extends React.Component {

  render() {
    const { cities } = this.props;
    return (
      <div className="">
        {
          cities.length ? (
            <ul className="list-group row">
              {
                cities.map(item => (
                  <City
                    key={item.text}
                    id={item.text}
                  >
                    {item.city}, {item.state}
                  </City>
                ))
              }
            </ul>
          ) : (
              <h4 className="text-center text-light text-capitalize font-italic">
                no cities yet...
            </h4>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ cities: state });

export default connect(mapStateToProps)(CitiesList);
