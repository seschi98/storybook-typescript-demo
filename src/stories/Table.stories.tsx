import * as React from 'react';
import { Column, Table } from '../Table';

export default {
  title: 'Organisms/Table',
  component: Table,
  subcomponents: { 'Table.Column': Column },
};

const people = [
  { first: 'Mark', last: 'Otto', age: 42, handle: 'mdo' },
  { first: 'Jacob', last: 'Thornton', age: 27, handle: 'fat' },
  { first: 'Larry', last: 'the Bird', age: 12, handle: 'twitter' },
];

export const defaultTable = (): JSX.Element => (
  <Table data={people}>
    <Table.Column header="#" value={(data, index): number => index + 1} align={'center'} />
    <Table.Column header="Last Name" value="last" />
    <Table.Column header="First Name" value="first" />
    <Table.Column
      header="Twitter handle"
      value={(data): JSX.Element => <a href={'https://twitter.com/' + data.handle}>@{data.handle}</a>}
    />
    <Table.Column header="Full name" value={(data): string => data.first + ' ' + data.last} />
    <Table.Column header="Age with longer title" value="age" align="right" />
  </Table>
);
