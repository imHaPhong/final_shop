import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AdminPost from '../../components/Admin/AdminPost'
import Post from '../../components/User/Post'
import {adminGetReport, adminDelete} from '../../middlerware/adminMiddlerware'

const Report = ({adminGetReport, adminDelete}) => {
    const [listReport, setListReport] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await adminGetReport()
            setListReport(data.data)

        }
        getData()
    },[])

    return (
        <div style={{height: "100vh", overflow:"scroll"}}>
           <div style={{width: "60vh", margin: "0 auto"}}>
           {listReport.length > 0 ? listReport.map((el, index) => 
            {
               return <AdminPost data={el.pId} reId={el._id} index={index}/>
            }): <div style={{height: "60vh", display: "flex", alignItems: "center"}}>
                <h1>No new reported yet</h1>
                </div>}
           </div>
        </div>
    )
}

export default connect(null, {adminGetReport, adminDelete})(Report)
