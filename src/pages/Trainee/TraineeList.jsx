import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import querystring from 'querystring';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Table, AddDialog, RemoveDialog, EditDialog,
} from './components';
import { SnackBarContext } from '../../contexts';
import callApi from '../../lib/utils/api';
import traineeList from './data/trainee';
import {
  COLUMNS, ROWS_PER_PAGE, TRAINEE_PATH, SKIP,
} from '../../configs/constants';

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: '',
      page: 0,
      count: 0,
      skip: SKIP,
      limit: ROWS_PER_PAGE,
      traineeData: [],
      deleteDialogOpen: false,
      editDialogOpen: false,
      traineeRecord: {},
      dialogProgressBar: false,
      tableProgressBar: false,
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
    if (direction === 'right') {
      page += 1;
      skip += limit;
    } else {
      page -= 1;
      skip -= limit;
    }
    callApi('get', `${TRAINEE_PATH}?${querystring.stringify({ skip, limit })}`)
      .then((response) => {
        const { data } = response;
        this.setState({ count: data.count, traineeData: data.records });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ page, skip });
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

  componentDidMount = () => {
    this.setState({ tableProgressBar: true });
    const { openSnackbar } = this.context;
    const { skip, limit } = this.state;
    callApi('get', `${TRAINEE_PATH}?${querystring.stringify({ skip, limit })}`)
      .then((response) => {
        const { data } = response;
        this.setState({ count: data.count, traineeData: data.records, tableProgressBar: false });
      })
      .catch((err) => {
        this.setState({ tableProgressBar: false, count: 0 });
        openSnackbar('error', err.message);
      });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.dialogProgressBar && !this.state.dialogProgressBar) {
      let { skip, page } = this.state;
      const { limit, count, traineeData } = this.state;
      if (traineeData.length - 1 === 0 && count - 1 > 0) {
        page -= 1;
        skip -= limit;
      }
      callApi('get', `${TRAINEE_PATH}?${querystring.stringify({ skip, limit })}`)
        .then((response) => {
          const { data } = response;
          this.setState({
            count: data.count, traineeData: data.records, page, skip,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const {
      open, orderBy, order, page, deleteDialogOpen, editDialogOpen, traineeRecord,
      dialogProgressBar, tableProgressBar, count, traineeData,
    } = this.state;
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
          data={traineeData}
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
          loader={tableProgressBar}
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

TraineeList.contextType = SnackBarContext;

export default TraineeList;
