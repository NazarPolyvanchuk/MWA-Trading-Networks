import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

class SellerReportItem extends React.Component {
    render() {
        const { report, deleteReport } = this.props;
        return (
            <tr>
                <td data-label="Date">{format(new Date(report.created_at), 'dd.MM.yyyy hh:mm:ss')}</td>
                <td data-label="Name and Surname">{report.employee.name}{' '}{report.employee.surname}</td>      
                <td data-label="Category">{report.department.name}</td>
                <td data-label="Sold cargo">{report.products.reduce((sum, item) => sum + Number(item.qty), 0)}</td>
                <td data-label="Actions">
                    <div className="ui two buttons">
                        <Link to={`/seller-report/${report._id}`} className="ui basic button green">Деталі</Link>
                        <div className="ui basic button red" onClick={() => deleteReport(report._id)}>Видалити</div>
                    </div>
                </td>
            </tr>
        );
    }
}

SellerReportItem.propTypes = {
  report: PropTypes.object.isRequired,
  deleteReport: PropTypes.func.isRequired
}

export default SellerReportItem;
