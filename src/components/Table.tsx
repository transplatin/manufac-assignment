import TableRow from "./TableRow";
import Styles from './Table.module.css'

type Props = {
  classList: string[];
  mean: string[];
  median: string[];
  mode: string[];
  tableHeader:string;
  tableFooter?: boolean;
  rowTitles:string[];  
};

const Table = (props: Props) => {
  const { classList, mean, median, mode, tableFooter,tableHeader,rowTitles } = props;
  return (
    <table className={Styles.table} border={1}>
      <tbody>
        <thead className={Styles.tableHead}>{tableHeader}</thead>
        <TableRow type="Header" rowData={classList} leftTitle="Measure" />
        <TableRow type="Data" rowData={mean} leftTitle={rowTitles[0]} />
        <TableRow type="Data" rowData={median} leftTitle={rowTitles[1]} />
        <TableRow type="Data" rowData={mode} leftTitle={rowTitles[2]} />
        {tableFooter ? (
          <tfoot className={Styles.tableFoot}>
            Note : N.A. means that every value is unique and occuring only once
            in dataset. Therefore every value can act as mode.
          </tfoot>
        ) : null}
      </tbody>
    </table>
  );
};

export default Table;
