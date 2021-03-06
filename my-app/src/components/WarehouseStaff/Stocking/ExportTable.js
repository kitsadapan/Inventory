import React from 'react';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    FormControl
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';

import './Style/ExportTable.css';

class ExportTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lot: this.props.location.lot,
            channel: this.props.location.channel,
            exportDetail: this.props.location.data,
            checkCount:this.props.location.data.length
        }
        // console.log(this.state.exportDetail)
    }

    onCheckChange =(event)=>{
        if(event.target.checked == true){
            this.setState({checkCount:(this.state.checkCount-=1)})
            console.log(event.target.checked)
            // console.log(this.state.checkCount)
        }
        else{
            this.setState({checkCount:(this.state.checkCount+=1)})
            console.log(event.target.checked)
            // console.log(this.state.checkCount)
        }
    }

    onSaveOrder =()=>{
        if(this.state.checkCount == 0){
            console.log("Success")
        }
        else if(this.state.checkCount != 0){
            console.log("Unsuadadw ccess")
        }
    }

    render() {
        let i = 0
        const listItems = this.state.exportDetail.map((data) => {
            i++
            return (
                <tr>
                    <th scope="row">{i}</th>
                    <td>{data.productID}</td>
                    <td>{data.oldNew}</td>
                    <td>{data.comName}</td>
                    <td>{data.productName}</td>
                    <td>{data.productWeight}</td>
                    <td>{data.total}</td>
                    <td>
                        <InputGroup>
                            <Input addon type="checkbox" style={{ width: 20, height: 20 }} onChange = {this.onCheckChange}/>
                        </InputGroup>
                    </td>
                </tr>
            )
        }
        );

        return (
            <div className="ContainerTable">

                <body className="ContentTable" style={{ border: '2px solid gray' }}>

                    <h1 style={{ width: '95%', alignSelf: 'center', marginTop: 60, marginBottom: 20 }}>???????????????????????????????????????????????????????????????</h1>
                    <h3 style={{ width: '95%', alignSelf: 'center', marginTop: 10 }}>????????????????????????????????? : {this.state.lot} | ??????????????????????????? : {this.state.channel}</h3>
                    {/* <h3 style={{width:'95%', alignSelf:'center', marginTop:10, marginBottom:20}}>??????????????????????????? : {this.state.channel}</h3> */}

                    <Table hover style={{ width: '95%', alignSelf: 'center', marginTop: 20, marginBottom: 20, background: "#f1f1f1" }}>

                        {/* -------------------------- This is header for table  --------------------------*/}
                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th>???????????????</th>
                                <th>??????????????????????????????</th>
                                <th>????????????/????????????</th>
                                <th>??????????????????????????????</th>
                                <th>??????????????????????????????</th>
                                <th>?????????????????????</th>
                                <th>???????????????</th>
                            </tr>
                        </thead>

                        {/* -------------------------- This is datafrom for table  --------------------------*/}
                        {/* Example */}
                        <tbody style={{ textAlign: 'center' }}>
                            {listItems}
                        </tbody>
                    </Table>

                    <body className="ButtonTable">
                        <Button style={{ height: 40, width: 80, background: "#FF0000" }} onClick={() => this.props.history.goBack()}>????????????</Button>
                        <Button style={{ height: 40, width: 80, background: "#00B046", marginRight: 20 }} onClick={this.onSaveOrder}>??????????????????</Button>
                    </body>

                </body>
            </div>
        )
    }
}

export default ExportTable