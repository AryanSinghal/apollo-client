import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import { Mutation } from '@apollo/react-components';
import {
  Table, AddDialog, RemoveDialog, EditDialog,
} from './components';
import { SnackBarContext } from '../../contexts';
import traineeList from './data/trainee';
import {
  COLUMNS, ROWS_PER_PAGE, SKIP,
} from '../../configs/constants';
import GET_TRAINEES from './query';
import { ADD_TRAINEE, EDIT_TRAINEE, DELETE_TRAINEE } from './mutation';
import { TRAINEE_UPDATED, TRAINEE_DELETED } from './subscription';

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
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (createTrainee) => async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[2].value;
    const password = event.target[4].value;
    const { openSnackbar } = this.context;
    try {
      await createTrainee({ variables: { name, email, password } });
      openSnackbar('success', 'Trainee Successfully Created');
      this.setState({ open: false });
    } catch (error) {
      openSnackbar('error', error.message);
    }
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

  handleEditSubmit = (updateTrainee) => async (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[2].value;
    const { openSnackbar } = this.context;
    try {
      const { traineeRecord: { originalId } } = this.state;
      const { data } = await updateTrainee({ variables: { id: originalId, name, email } });
      this.setState({ traineeRecord: {}, editDialogOpen: false });
      openSnackbar('success', 'Trainee Successfully Updated');
      console.log('Edited item');
      console.log(data.updateTrainee);
    } catch (err) {
      this.setState({ traineeRecord: {} });
      openSnackbar('error', err.message);
    }
  }

  handleDeleteSubmit = async (deleteTrainee) => {
    const { traineeRecord, limit } = this.state;
    let { skip, page } = this.state;
    const { openSnackbar } = this.context;
    try {
      await deleteTrainee({ variables: { id: traineeRecord.originalId } });
      const {
        data: {
          refetch,
          getAllTrainees: {
            records = [],
            count = 0,
          } = {},
        },
      } = this.props;
      if (records.length - 1 === 0 && count - 1 > 0) {
        page -= 1;
        skip -= limit;
        refetch({ skip, limit });
      }
      this.setState({
        traineeRecord: {}, deleteDialogOpen: false, skip, page,
      });
      openSnackbar('success', 'Trainee Successfully Deleted');
      console.log('Deleted item');
      console.log(traineeRecord);
    } catch (err) {
      this.setState({ traineeRecord: {} });
      openSnackbar('error', err.message);
    }
  }

  componentDidMount = () => {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: TRAINEE_UPDATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { getAllTrainees: { records } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = records.map((record) => {
          if (record.originalId === traineeUpdated.id) {
            delete traineeUpdated.id;
            return { ...record, ...traineeUpdated };
          }
          return record;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            count: prev.getAllTrainees.count,
            records: updatedRecords,
          },
        };
      },
    });

    subscribeToMore({
      document: TRAINEE_DELETED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { getAllTrainees: { records } } = prev;
        const { data: { traineeDeleted } } = subscriptionData;
        const updatedRecords = records.filter((record) => (record.originalId !== traineeDeleted));
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            count: prev.getAllTrainees.count,
            records: updatedRecords,
          },
        };
      },
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
      open, orderBy, order, page, deleteDialogOpen, editDialogOpen, traineeRecord, skip, limit,
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
    const variables = { skip, limit };
    return (
      <>
        <div align="right">
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEE
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <Mutation mutation={ADD_TRAINEE} refetchQueries={[{ query: GET_TRAINEES, variables }]}>
          {
            (createTrainee, { loading: createProgressBar }) => (
              <AddDialog
                open={open}
                onClose={this.handleClose}
                createTrainee={createTrainee}
                onSubmit={this.handleSubmit}
                progressBar={createProgressBar}
              />
            )
          }
        </Mutation>
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
        <Mutation mutation={DELETE_TRAINEE}>
          {
            (deleteTrainee, { loading: deleteProgressBar }) => (
              <RemoveDialog
                open={deleteDialogOpen}
                onClose={this.handleDeleteDialogClose}
                onSubmit={this.handleDeleteSubmit}
                deleteTrainee={deleteTrainee}
                progressBar={deleteProgressBar}
              />
            )
          }
        </Mutation>
        <Mutation mutation={EDIT_TRAINEE}>
          {
            (updateTrainee, { loading: updateProgressBar }) => (
              <EditDialog
                open={editDialogOpen}
                onClose={this.handleEditDialogClose}
                onSubmit={this.handleEditSubmit}
                updateTrainee={updateTrainee}
                data={traineeRecord}
                progressBar={updateProgressBar}
              />
            )
          }
        </Mutation>
      </>
    );
  }
}

TraineeList.propTypes = {
  data: PropTypes.shape({
    subscribeToMore: PropTypes.func.isRequired,
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
