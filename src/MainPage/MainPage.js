import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MainPage extends React.Component {
  render() {
    return (
        <div className="ui placeholder segment">
            <div className="ui two column very relaxed stackable grid">
                <div className="column">
                    <div className="ui card">
                        <div className="image">
                            <img src={'https://placehold.it/200?text=No+Image'} alt="Cargo Cover" />
                        </div>
                        <div className="content">
                            <div className="header">Manager</div>
                        </div>
                        <div className="extra content">
                            <Link to={`/dashboard`} className="ui basic button green">Choose</Link>
                        </div>
                    </div>
                </div>
                <div className="middle aligned column">
                    <div className="ui card">
                        <div className="image">
                            <img src={'https://placehold.it/200?text=No+Image'} alt="Cargo Cover" />
                        </div>
                        <div className="content">
                            <div className="header">Seller</div>
                        </div>
                        <div className="extra content">
                            <Link to={`/sell-cargos`} className="ui basic button green">Choose</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui vertical divider">
                Or
            </div>
        </div>
    );
  }
}

MainPage.propTypes = {
  cargos: PropTypes.array.isRequired,
}

function mapsStateToProps(state) {
  return {
    cargos: state.cargos
  }
}

export default connect(mapsStateToProps)(MainPage);
