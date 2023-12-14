import styles from "./TableRow.module.css";

type Props = {
  leftTitle: string;
  type: string;
  rowData: string[];
};

const TableRow = (props: Props) => {
  return (
    <div>
      <tr className={styles.row}>
        <th className={styles.rowData}>{props.leftTitle}</th>
        {props.rowData.map((e) => {
            if(Array.isArray(e)){
                if(e.length===0){
                    e='N.A.'
                }else{
                    e=e.join(" , ")
                }
            }
          if (props.type === "Header") {
            return <th className={styles.rowData}>{e}</th>;
          }
          return <td className={styles.rowData}>{e}</td>;
        })}
      </tr>
    </div>
  );
};

export default TableRow;
