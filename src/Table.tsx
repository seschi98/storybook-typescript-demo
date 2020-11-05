import * as React from 'react';
import './Table.css';

type ColumnProps = {
  /**
   * Column title (displayed in table head)
   */
  header: string;

  /**
   * Value of column. Can be either be a key from the `data` array or a custom function that maps the array entry to a
   * value that is then displayed in the table.
   */
  value: string | ((data: any, index: number) => any);

  /**
   * Alignment of content inside column
   */
  align?: 'left' | 'center' | 'right';
};

type TableProps = {
  /**
   * Liste der Tabellen Elemente
   */
  children?: React.ReactNode | React.ReactNodeArray;

  /**
   * Array of data that is displayed inside table
   */
  data?: any[];

  /**
   * If true, the header is removed from the table
   */
  withoutHeader?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Column: React.FC<ColumnProps> = (props: ColumnProps) => <></>;

Column.defaultProps = {
  align: 'left',
};

const Table: React.FC<TableProps> & { Column: typeof Column } = (props: TableProps) => {
  const columns = React.Children.toArray(props.children)
    .map((col: any) => {
      return col.props as ColumnProps;
    })
    .filter(c => c !== null) as ColumnProps[];

  const renderHeader = (): JSX.Element => {
    return (
      <tr>
        {columns.map((col, colIndex) => (
          <th key={`header-${colIndex}`} className={`text-${col.align}`}>
            {col.header}
          </th>
        ))}
      </tr>
    );
  };

  const renderRows = (): JSX.Element => {
    return (
      <>
        {props.data &&
          props.data.map((entry, index) => {
            return (
              <tr key={`row-${index}`}>
                {columns.map((col, colIndex) => {
                  let value = '';
                  if (typeof col.value === 'string') {
                    value = '' + entry[col.value];
                  } else {
                    value = col.value(entry, index);
                  }

                  return (
                    <td key={`row-${index}-col-${colIndex}`} className={`text-${col.align}`}>
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </>
    );
  };

  const showHeader = props.withoutHeader === undefined || !props.withoutHeader;

  return (
    <table>
      {showHeader && <thead>{renderHeader()}</thead>}
      <tbody>{renderRows()}</tbody>
    </table>
  );
};
export { Table, Column };

Table.defaultProps = {
  data: [],
  withoutHeader: false,
};

Table['Column'] = Column;
