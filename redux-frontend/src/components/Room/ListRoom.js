import { useEffect,useState } from 'react';
import DataTable from 'react-data-table-component';
import { faEdit, faEye, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  Pagination  from '../Hotel/Pagination';





const ListRoom = (props) => {
  const data = props.dataRoom;
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [pageNumber,setPageNumber]  = useState(1);

  const setPageNum = (number) => setPageNumber(number);

  const getPagination = (list = [],page, itemsPerPage) => {
    if (!Array.isArray(list) || list.length === 0) {
      return [];
    }
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = (startIdx + itemsPerPage - 1) + 1;
   
    return list.slice(startIdx, endIdx);
  };

  return (
    <>  <div>
      <table className="table-a light">
        <tr>
          <th>Id</th>
          <th>Rum Number</th>
          <th>Room Type</th>
          <th>Price</th>
          <th>Max Adult</th>
          <th>Max Children</th>
          <th>Action</th>
        </tr>
        {
          getPagination(data,pageNumber,itemsPerPage)?.map(room => {
            return (
              <>
                <tr>
                  <td>{room.id}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomType}</td>
                  <td>{room.price}</td>
                  <td>{room.maxAdult}</td>  
                  <td>{room.maxChildren}</td>
                
                  {/* <div className="blog-widget tags-widget"> */}
                    {/* <h2>Tags</h2> */}
                    <div className="tags-row">
                    <span ></span>
                      <a href="#"><FontAwesomeIcon className="list-btn-sm-icon" icon={faEye}></FontAwesomeIcon></a>
                      <a href="#"><FontAwesomeIcon className="list-btn-sm-icon" icon={faSave}></FontAwesomeIcon></a>
                    </div>
                    
                  {/* </div> */}
                </tr>
              </>
            )
          })
        }
        <div className="clear"></div>
        <Pagination itemsPerPage={itemsPerPage} listItem={props?.dataRoom?.length} setPageNum={setPageNum}/>
      </table>
    </div>
      <div className="clear"></div>
    </>
  );
}




export default ListRoom