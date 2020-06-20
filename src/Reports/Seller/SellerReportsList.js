import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SellerReportItem from './SellerReportItem';

import { fetchReports, deleteReport } from '../../redux/actions/report/actions';

class SellerReportsList extends React.Component {

  componentDidMount() {
    const { fetchReports } = this.props;
    fetchReports();
  }

  render() {
    const { reports, deleteReport } = this.props;
    
    const emptyMessage = (
      <p>На даний момент звітів немає!</p>
    );
  
    const reportsList = (
      <div>
        <div className="table-container">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Ім'я та Прізвище продавця</th>
              <th>Підрозділ</th>
              <th>Продано товару</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <SellerReportItem 
                report={report}
                key={report._id}
                deleteReport={() => deleteReport(report._id)}
              />
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );

    console.log('reports: ', reports);
  
    return (
      <div>
        { reports.length === 0 ? emptyMessage : reportsList }
      </div>
    );
  }
}

SellerReportsList.propTypes = {
  reports: PropTypes.array.isRequired,
  deleteReport: PropTypes.func.isRequired
}

const mapsStateToProps = (state) => ({
  reports: state.reports,
});

const mapDispatchToProps = {
  fetchReports,
  deleteReport,
};

export default connect(mapsStateToProps, mapDispatchToProps)(SellerReportsList);
