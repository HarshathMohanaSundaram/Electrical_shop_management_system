import './list.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';
import React from 'react'

import {Link} from 'react-router-dom'
const List = ({page, row, column, loadData}) => {
    const pathLink = (page==='Customer')?"/customers":(page==='Product')?"/product":"/supplier"
    return ( 
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatableTitle">
                    {page}
                    <Link to={`${pathLink}/new`}  className='link'>Add new</Link>
                </div>
                <Datatable page={page} row={row} column={column} loadData = {loadData}/>
            </div>
        </div>
     );
}
 
export default List;
