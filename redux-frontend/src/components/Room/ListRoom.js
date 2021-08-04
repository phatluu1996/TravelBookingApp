import { useEffect } from 'react';
import DataTable from 'react-data-table-component';




const ListRoom = (props) => {

  var data = props.dataRoom;
  const columns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
      // cell: row => <div style={{fontSize: 25}}>{row.title}</div>
    },
    {
      name: 'Room Number',
      selector: 'roomNumber',
      sortable: true,
      center: true,
      // cell: row => <div style={{fontSize: 25}}>{row.title}</div>
    },
    {
      name: 'Room Type',
      selector: 'roomType',
      sortable: true,
      center: true,
    },
    {
      name: 'Price ',
      selector: 'price',
      sortable: true,
      center: true,
    },
    {
      name: 'Max Adult ',
      selector: 'maxAdult',
      sortable: true,
      center: true,
    },
    {
      name: 'Max Children ',
      selector: 'maxChildren',
      sortable: true,
      center: true,
    },
    {
      cell: () =>   <button
                        className="booking-complete-btn"
                        type="submit"
                        style={{ marginBottom: "20px" ,width:"60px" ,height:"30px" }}
                    >
                        Update
                    </button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // const importData = () => {
  //   data.push(props);
  // }
  const conditionalRowStyles = [
    {
      when: row => row.calories < 300,
      style: {
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    // You can also pass a callback to style for additional customization
    {
      when: row => row.retired === false,
      style: row => ({
        backgroundColor: row.retired ? 'pink' : 'inerit',
      }),
    },
  ];


  // useEffect(() => {
  //   let mount = false;

  //   return () => {
  //     mount = true;
  //   };
  // }, []);

  return (
    <>
          <DataTable
            className="table-a"
            title="Rooms of hotel"
            columns={columns}
            data={data}
            pagination
            keyField="id"
            conditionalRowStyles={conditionalRowStyles}
          />
      <div className="clear"></div>
    </>
  );
}




export default ListRoom