import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import "./Records.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Records extends Component {
  componentDidMount() {
    this.props.onFetchRecords();
    let expirationTime = localStorage.getItem("authTokenExpiration");
    let currentTime = new Date().getTime();
    console.log(expirationTime - currentTime);
    let forcedLogout = expirationTime - currentTime;
    setTimeout(() => this.props.onLogout(), forcedLogout);
  }

  render() {
    let notesLoader = <Spinner />;

    if (!this.props.loading) {
      notesLoader = (
        <React.Fragment>
          <div className="col-12">
            <div className="row container">
              <div className="col-2"></div>
              <Button
                className="col-3 btn"
                color="info"
                onClick={() => {
                  this.props.onGetReport();
                }}
              >
                Generate Report
              </Button>
              <div className="col-2"></div>
              <Button
                className="col-3"
                color="danger"
                onClick={() => {
                  this.props.onLogout();
                }}
              >
                Logout
              </Button>
              <div className="col-2"></div>
            </div>
            <table className="table">
              <tr>
                <th>NAME</th>
                <th>CITY</th>
                <th>MESSAGE</th>
                <th>ATTACHMENT</th>
              </tr>
              {this.props.records.map((record, index) => (
                <tr key={record._id}>
                  <td>{record.name}</td>
                  <td>{record.city}</td>
                  <td>{record.message}</td>
                  <td>
                    {record.attachment ? (
                      <a href={record.attachment}>Download Attachment</a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment>{notesLoader}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.recordsReducer.recordsArray,
    loading: state.recordsReducer.loading,
    isAuth: state.authReducer.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchRecords: () => {
      dispatch(actions.fetchRecords());
    },
    onLogout: () => {
      localStorage.removeItem("authTokenExpiration");
      dispatch(actions.logout());
      window.location.reload(false);
    },
    onGetReport: () => {
      dispatch(actions.getReport());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Records);
