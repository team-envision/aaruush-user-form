import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import "./Records.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Records extends Component {
  componentWillMount() {
    this.props.onFetchRecords();
  }

  render() {
    let notesLoader = <Spinner />;

    if (!this.props.loading) {
      notesLoader = (
        <React.Fragment className={"text-center"}>
          <div className="col-10">
            <table className="table">
              <tr>
                <th>NAME</th>
                <th>CITY</th>
                <th>MESSAGE</th>
                <th>ATTACHMENT</th>
              </tr>
              {this.props.records.map((record, index) => (
                <tr>
                  <td>{record.name}</td>
                  <td>{record.city}</td>
                  <td>{record.message}</td>
                  <td>
                    {record.attachment ? (
                      <a href={record.attachment}>Download Attachemnt</a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </table>
            <div className="row">
              <div className="col-4"></div>
              <Button
                className="col-2"
                color="info"
                onClick={() => {
                  this.props.onGetReport();
                }}
              >
                Download Everything
              </Button>
              <div className="col-2"></div>
              <Button
                className="col-2"
                color="danger"
                onClick={() => {
                  this.props.onLogout();
                }}
              >
                Logout
              </Button>
              <div className="col-4"></div>
            </div>
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
  };
};

const mapDispatchToProps = (dispath) => {
  return {
    onFetchRecords: () => {
      dispath(actions.fetchRecords());
    },
    onLogout: () => {
      dispath(actions.logout());
    },
    onGetReport: () => {
      dispath(actions.getReport());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Records);
