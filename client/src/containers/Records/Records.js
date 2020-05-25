import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./Notes.css";

class Notes extends Component {
  componentDidMount() {
    () => this.props.onFetchRecords;
  }

  render() {
    return (
      <div className="col-10">
        {this.props.records.map((note, index) => (
          <Note />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    records: state.notes.notes,
    loading: state.notes.loading,
  };
};

const mapDispatchToProps = (dispath) => {
  return {
    onFetchRecords: () => console.log("OnfetchNotes"),
  };
};

export default withPolling(actions.fetchNotes)(
  connect(mapStateToProps, mapDispatchToProps)(Notes)
);
