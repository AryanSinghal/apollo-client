import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import {
  Table, AddDialog, RemoveDialog, EditDialog,
} from './components';
import { SnackBarContext } from '../../contexts';
import callApi from '../../lib/utils/api';
import traineeList from './data/trainee';
import {
  COLUMNS, ROWS_PER_PAGE, TRAINEE_PATH, SKIP,
} from '../../configs/constants';
import GET_TRAINEES from './query';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: '',
      page: 0,
      skip: SKIP,
      limit: ROWS_PER_PAGE,
      deleteDialogOpen: false,
      editDialogOpen: false,
      traineeRecord: {},
      dialogProgressBar: false,
      error: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ dialogProgressBar: true });
    const name = event.target[0].value;
    const email = event.target[2].value;
    const password = event.target[4].value;
    console.log({ name, email, password });
    const { openSnackbar } = this.context;
    callApi('post', TRAINEE_PATH, { name, email, password })
      .then((data) => {
        this.setState({ dialogProgressBar: false, open: false });
        openSnackbar('success', data.message);
      })
      .catch((err) => {
        this.setState({ dialogProgressBar: false });
        openSnackbar('error', err.message);
      });
  };

  onSelect = (data) => data

  onSort = (order, orderBy) => {
    const newOrder = (order === 'asc') ? 'desc' : 'asc';
    this.setState({ order: newOrder, orderBy });
    return orderBy;
  }

  handlePageChange = (page, direction) => {
    let { skip } = this.state;
    const { limit } = this.state;
    let newPage = page;
    if (direction === 'right') {
      newPage += 1;
      skip += limit;
    } else {
      newPage -= 1;
      skip -= limit;
    }
    const {
      data: {
        refetch,
      },
    } = this.props;
    refetch({ skip, limit });
    this.setState({ page: newPage, skip });
  }

  handleEditDialogOpen = (traineeRecord) => {
    this.setState({ traineeRecord, editDialogOpen: true });
  }

  handleDeleteDialogOpen = (traineeRecord) => {
    this.setState({ traineeRecord, deleteDialogOpen: true });
  }

  handleEditDialogClose = () => {
    this.setState({ traineeRecord: {}, editDialogOpen: false });
  }

  handleDeleteDialogClose = () => {
    this.setState({ traineeRecord: {}, deleteDialogOpen: false });
  }

  handleEditSubmit = (event) => {
    event.preventDefault();
    this.setState({ dialogProgressBar: true });
    const name = event.target[0].value;
    const email = event.target[2].value;
    const { openSnackbar } = this.context;
    const { traineeRecord } = this.state;
    callApi('put', TRAINEE_PATH, { name, email, id: traineeRecord.originalId })
      .then((response) => {
        const { data } = response;
        this.setState({ traineeRecord: {}, editDialogOpen: false, dialogProgressBar: false });
        console.log('Edited item');
        console.log({ data, name, email });
      })
      .catch((err) => {
        this.setState({ traineeRecord: {}, dialogProgressBar: false });
        openSnackbar('error', err.message);
      });
  }

  handleDeleteSubmit = () => {
    this.setState({ dialogProgressBar: true });
    const { traineeRecord } = this.state;
    const { openSnackbar } = this.context;
    callApi('delete', `${TRAINEE_PATH}/${traineeRecord.originalId}`)
      .then(() => {
        this.setState({ traineeRecord: {}, deleteDialogOpen: false, dialogProgressBar: false });
        console.log('Deleted item');
        console.log(traineeRecord);
      })
      .catch((err) => {
        this.setState({ traineeRecord: {}, dialogProgressBar: false });
        openSnackbar('error', err.message);
      });
  }

  componentDidUpdate = (prevProps) => {
    const { openSnackbar } = this.context;
    const {
      data: {
        error,
      },
    } = this.props;
    if (!prevProps.data.error && error) {
      openSnackbar('error', error.message);
    }
  }

  render() {
    const {
      open, orderBy, order, page, deleteDialogOpen,
      editDialogOpen, traineeRecord, dialogProgressBar,
    } = this.state;
    const {
      data: {
        loading,
        getAllTrainees: {
          records = [],
          count = 0,
        } = {},
      },
    } = this.props;
    return (
      <>
        <div align="right">
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEE
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
          progressBar={dialogProgressBar}
        />
        <br />
        <Table
          id="trainee_id"
          data={records}
          columns={COLUMNS}
          orderBy={orderBy}
          order={order}
          onSort={this.onSort}
          onSelect={this.onSelect}
          action={
            [
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleDeleteDialogOpen,
              },
            ]
          }
          rowsPerPage={ROWS_PER_PAGE}
          dataLength={count}
          count={count}
          page={page}
          onChangePage={this.handlePageChange}
          loader={loading}
        />
        <ul>
          {
            traineeList && traineeList.length && traineeList.map((value, index) => (
              <li key={value.name + String(index)}>
                <Link to={`/trainee/${value.id}`}>{value.name}</Link>
              </li>
            ))
          }
        </ul>
        <RemoveDialog
          open={deleteDialogOpen}
          onClose={this.handleDeleteDialogClose}
          onSubmit={this.handleDeleteSubmit}
          progressBar={dialogProgressBar}
        />
        <EditDialog
          open={editDialogOpen}
          onClose={this.handleEditDialogClose}
          onSubmit={this.handleEditSubmit}
          data={traineeRecord}
          progressBar={dialogProgressBar}
        />
      </>
    );
  }
}

TraineeList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    refetch: PropTypes.func,
    getAllTrainees: PropTypes.shape({
      records: PropTypes.array,
      count: PropTypes.number,
    }),
  }).isRequired,
};

TraineeList.contextType = SnackBarContext;

export default graphql(GET_TRAINEES, {
  options: {
    variables: {
      skip: SKIP,
      limit: ROWS_PER_PAGE,
    },
  },
})(TraineeList);
