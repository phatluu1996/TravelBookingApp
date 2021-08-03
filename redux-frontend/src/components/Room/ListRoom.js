import { useEffect } from 'react';
import DataTable from 'react-data-table-component';




const ListRoom = ({props}) => {

  const data = [];
  const columns = [];

  const importData = () =>{
    
    data.push();
  }

  useEffect(() => {
    let mount = false;
    
    return () => {
      mount = true;
    };
  }, []);

  return (
    <>
      <DataTable
        title="Rooms of hotel"
        columns={columns}
        data={data}
      />
    </>
  );
}




export default ListRoom