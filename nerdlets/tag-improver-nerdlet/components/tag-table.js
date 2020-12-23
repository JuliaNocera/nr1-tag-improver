import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowCell
} from 'nr1';

export default class TagTable extends React.Component {
  static propTypes = {
    getTableData: PropTypes.func,
    selectTag: PropTypes.func
  };

  state = {
    tag_column_0: TableHeaderCell.SORTING_TYPE.ASCENDING
  };

  setSortingColumn = (columnId, event, sortingData) => {
    const nextType = sortingData ? sortingData.nextSortingType : undefined;
    const updates = [0, 1, 2, 3].reduce((acc, column) => {
      acc[`tag_column_${column}`] = column === columnId ? nextType : undefined;
      return acc;
    }, {});
    this.setState(updates);
  };

  render() {
    const { setSortingColumn } = this;

    return (
      <Table items={this.props.getTableData()}>
        <TableHeader>
          <TableHeaderCell
            value={({ item }) => item.tagKey}
            sortable
            sortingType={this.state.tag_column_0}
            sortingOrder={1}
            onClick={(a, b) => setSortingColumn(0, a, b)}
          >
            Tag name
          </TableHeaderCell>
          <TableHeaderCell
            value={({ item }) => item.cardinality}
            sortable
            sortingType={this.state.tag_column_1}
            sortingOrder={2}
            onClick={(a, b) => setSortingColumn(1, a, b)}
          >
            Distinct values
          </TableHeaderCell>
          <TableHeaderCell
            value={({ item }) => item.entityCount}
            sortable
            sortingType={this.state.tag_column_2}
            sortingOrder={3}
            onClick={(a, b) => setSortingColumn(2, a, b)}
          >
            Tagged entities
          </TableHeaderCell>
          <TableHeaderCell
            value={({ item }) => item.entityPercent}
            sortable
            sortingType={this.state.tag_column_3}
            sortingOrder={4}
            onClick={(a, b) => setSortingColumn(3, a, b)}
          >
            % coverage
          </TableHeaderCell>
        </TableHeader>

        {({ item }) => (
          <TableRow
            onClick={() => {
              this.props.selectTag(item.tagKey);
            }}
          >
            <TableRowCell>{item.tagKey}</TableRowCell>
            <TableRowCell>{item.cardinality}</TableRowCell>
            <TableRowCell>{item.entityCount}</TableRowCell>
            <TableRowCell>{item.entityPercent}</TableRowCell>
          </TableRow>
        )}
      </Table>
    );
  }
}
