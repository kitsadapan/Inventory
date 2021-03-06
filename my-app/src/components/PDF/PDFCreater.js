import React from 'react';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import { Table, TableBody, TableHeader, TableCell, DataTableCell} from '@david.kucsai/react-pdf-table'

import font from './font/Prompt-Regular.ttf'

Font.register({ family: 'Prompt', src: font });


class InvoiceCreater extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            tableBorderWidth: 2,
            sum:0,
            discount:0,
            tax:0,
            total:0
        }
        
    }

    componentDidMount(){
        let tempSum = 0;
        let tempDiscount = 0;
        for(let x of this.state.data){
            console.log(x);
            tempSum += x.sum;
            tempDiscount += x.discount;
        }
        this.setState({sum: tempSum});
        this.setState({discount: tempDiscount});
        console.log(this.state.sum)
        let tempTax = ((tempSum-tempDiscount)*7) / 100
        let tempTotal = (tempSum-tempDiscount) + tempTax
        this.setState({tax : tempTax});
        this.setState({total : tempTotal});
    }

    renderInvoiceList=()=>{
        let componentList = []
        console.log(this.state.data);
        
        for(let x in this.state.data) {
            console.log(x);
            let num = parseInt(x)+1;
            
            componentList.push(
                <View style={{borderTopColor:'black', 
                              borderTopWidth:this.state.tableBorderWidth, 
                              textAlign:'center', 
                              fontSize:11,
                              flexDirection:'row'}}>
                    <View style={{flex:0.09}}>
                        <Text>{num}</Text>    
                    </View>
                    <View style={{flex:0.16, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].id}</Text>
                    </View>
                    <View style={{flex:0.18, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].pname}</Text>
                    </View>
                    <View style={{flex:0.15, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].pricePerUnit}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].quantity}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].discount}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].sum}</Text>
                    </View>    
                </View>
            );
        
        }
        return(componentList);
    }

    render(){
        return(
            <Document title='PDFTEST'> 
                <Page size="A4" style={styles.page} orientation='landscape'>
                    <View style={{flexDirection:'row', width:'100%'}}>
                        <View style={{marginTop:20, marginLeft:30, flex:0.7}}>
                            <Text style={{fontSize:25, fontWeight:'bold'}}>{this.props.companyData.comName}</Text>

                            <View style={{flexDirection:'row', marginTop:5}}>
                                <Text style={{fontSize:14}}>99/99</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>???????????? {this.props.companyData.moo}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>???????????? {this.props.companyData.sub_district}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>??????????????? {this.props.companyData.district}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>????????????????????? {this.props.companyData.provide}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>{this.props.companyData.zipCode}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14}}>????????? {this.props.companyData.tel}</Text>
                                {/* <Text style={{fontSize:15, marginLeft:10}}>???????????? ---- </Text> */}
                            </View>
                        </View>
                        <View style={{flex:0.3, alignItems:'flex-end', marginTop:20, marginRight:30}}>
                            {/* <Text>Section #2</Text> */}
                            <View style={{borderColor:'black', 
                                        borderWidth:2, 
                                        width:'100%', 
                                        alignItems:'center', 
                                        borderRadius:10}}>
                                <Text style={{fontSize:20, marginTop:5}}>??????????????????????????????</Text>
                                <Text style={{fontSize:20, marginBottom:5}}>Invoice</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', marginTop:10}}>
                        <View style={{marginLeft:30,
                                    flex:0.7}}>
                            <View style={{borderColor:'black',
                                    borderWidth:2,
                                    width:'97%'}}>
                                <Text style={{fontSize:13, marginLeft:14}}>???????????????????????? {this.props.branchData.branchID}</Text>
                                <Text style={{fontSize:13, marginLeft:14}}>?????????????????????????????? {this.props.branchData.cusName}</Text>
                                <View style={{flexDirection:'row'}}> 
                                    <Text style={{fontSize:13, marginLeft:14}}>????????????????????? {this.props.branchData.address}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???????????? {this.props.branchData.moo}</Text> 
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.sub_district}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.district}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.provide}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>{this.props.branchData.zipCode}</Text>
                                </View>
                                <Text style={{fontSize:13, marginLeft:14}}>????????? {this.props.branchData.tel}</Text>
                            </View>
                
                        </View>
                        <View style={{borderColor:'black',
                                    borderWidth:2, 
                                    marginRight:30, 
                                    flex:0.3}}>
                            <Text style={{fontSize:13, marginLeft:5}}>??????????????????????????????????????????????????? : 12123</Text>
                            <Text style={{fontSize:13, marginLeft:5}}>?????????????????? : 01/01/2564</Text>
                            <Text style={{fontSize:13, marginLeft:5}}>???????????????????????????????????? : </Text>
                            <Text style={{fontSize:13, marginLeft:5}}>????????????????????????????????? : 01/01/2564</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft:30, marginRight:30}}>
                        <View style={{borderColor:'black', borderWidth:this.state.tableBorderWidth}}>
                            <View style={{flexDirection:'row', textAlign:'center', fontSize:13}}>
                                <View style={{flex:0.09}}>
                                    <Text>???????????????</Text>    
                                </View>
                                <View style={{flex:0.16, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>??????????????????????????????</Text>
                                </View>
                                <View style={{flex:0.18, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>????????????????????????????????????</Text>
                                </View>
                                <View style={{flex:0.15, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>????????????????????????????????????</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>???????????????</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>??????????????????</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>???????????????????????????</Text>
                                </View>
                                
                            </View>
                            {/*  ##  renderList   ## */}
                            <this.renderInvoiceList/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <View style={{flexDirection:'row', marginTop:90, textAlign:'center', alignSelf:'center'}}>
                                    <View style={{borderTopColor:'black', borderTopWidth:1, width:130}}>
                                        <Text style={{fontSize:12, marginTop:4}}>??????????????????????????????</Text>
                                    </View>
                                    <View style={{borderTopColor:'black', borderTopWidth:1, marginLeft:30, width:130}}>
                                        <Text style={{fontSize:12, marginTop:4}}>??????????????????????????????????????????????????????</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1}}>                        
                                <View style={{borderColor:'black', 
                                            borderWidth:this.state.tableBorderWidth, 
                                            marginTop:10, 
                                            width:'70%', 
                                            alignSelf:'flex-end',
                                            fontSize:13,
                                            textAlign:'center'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text>?????????????????????????????????????????????</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.sum}</Text>
                                        </View>
                                    </View>  

                                    <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                        <View style={{flex:1}}>
                                            <Text>??????????????????</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.discount}</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                        <View style={{flex:1}}>
                                            <Text>???????????????????????????????????????</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.sum - this.state.discount}</Text>
                                        </View>
                                    </View> 

                                    <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                        <View style={{flex:1}}>
                                            <Text>????????????????????????????????????????????? 7%</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.tax}</Text>
                                        </View>
                                    </View> 

                                    <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                        <View style={{flex:1}}>
                                            <Text>????????????????????????????????????????????????????????????</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.total}</Text>
                                        </View>
                                    </View>                         
                                </View>
                            </View>    
                        </View>
                    </View>
                </Page>
            </Document>        
        );
    }

    
}

class ReceiptCreater extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            tableBorderWidth: 2,
            sum:0,
            discount:0,
            tax:0,
            total:0
        }
        
    }

    componentDidMount(){
        let tempSum = 0;
        let tempDiscount = 0;
        for(let x of this.state.data){
            console.log(x);
            tempSum += x.sum;
            tempDiscount += x.discount;
        }
        this.setState({sum: tempSum});
        this.setState({discount: tempDiscount});
        console.log(this.state.sum)
        let tempTax = ((tempSum-tempDiscount)*7) / 100
        let tempTotal = (tempSum-tempDiscount) + tempTax
        this.setState({tax : tempTax});
        this.setState({total : tempTotal});
    }

    renderInvoiceList=()=>{
        let componentList = []
        console.log(this.state.data);
        
        for(let x in this.state.data) {
            console.log(x);
            let num = parseInt(x)+1;
            
            componentList.push(
                <View style={{borderTopColor:'black', 
                              borderTopWidth:this.state.tableBorderWidth, 
                              textAlign:'center', 
                              fontSize:11,
                              flexDirection:'row'}}>
                    <View style={{flex:0.09}}>
                        <Text>{num}</Text>    
                    </View>
                    <View style={{flex:0.16, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].id}</Text>
                    </View>
                    <View style={{flex:0.18, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].pname}</Text>
                    </View>
                    <View style={{flex:0.15, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].pricePerUnit}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].quantity}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].discount}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].sum}</Text>
                    </View>    
                </View>
            );
        
        }
        return(componentList);
    }

    render(){
        return(
            <Document title='PDFTEST'> 
                <Page size="A4" style={styles.page} orientation='landscape'>
                    <View style={{flexDirection:'row', width:'100%'}}>
                        <View style={{marginTop:20, marginLeft:30, flex:0.7}}>
                            <Text style={{fontSize:25, fontWeight:'bold'}}>{this.props.companyData.comName}</Text>

                            <View style={{flexDirection:'row', marginTop:5}}>
                                <Text style={{fontSize:14}}>99/99</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>???????????? {this.props.companyData.moo}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>???????????? {this.props.companyData.sub_district}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>??????????????? {this.props.companyData.district}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>????????????????????? {this.props.companyData.provide}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>{this.props.companyData.zipCode}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14}}>????????? {this.props.companyData.tel}</Text>
                                {/* <Text style={{fontSize:15, marginLeft:10}}>???????????? ---- </Text> */}
                            </View>
                        </View>
                        <View style={{flex:0.3, alignItems:'flex-end', marginTop:20, marginRight:30}}>
                            {/* <Text>Section #2</Text> */}
                            <View style={{borderColor:'black', 
                                        borderWidth:2, 
                                        width:'100%', 
                                        alignItems:'center', 
                                        borderRadius:10}}>
                                <Text style={{fontSize:20, marginTop:5}}>??????????????????????????????????????????</Text>
                                <Text style={{fontSize:20, marginBottom:5}}>Receipt</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', marginTop:10}}>
                        <View style={{marginLeft:30,
                                    flex:0.7}}>
                            <View style={{borderColor:'black',
                                    borderWidth:2,
                                    width:'97%'}}>
                                <Text style={{fontSize:13, marginLeft:14}}>???????????????????????? {this.props.branchData.branchID}</Text>
                                <Text style={{fontSize:13, marginLeft:14}}>?????????????????????????????? {this.props.branchData.cusName}</Text>
                                <View style={{flexDirection:'row'}}> 
                                    <Text style={{fontSize:13, marginLeft:14}}>????????????????????? {this.props.branchData.address}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???????????? {this.props.branchData.moo}</Text> 
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.sub_district}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.district}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.provide}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>{this.props.branchData.zipCode}</Text>
                                </View>
                                <Text style={{fontSize:13, marginLeft:14}}>????????? {this.props.branchData.tel}</Text>
                            </View>
                
                        </View>
                        <View style={{borderColor:'black',
                                    borderWidth:2, 
                                    marginRight:30, 
                                    flex:0.3}}>
                            <Text style={{fontSize:13, marginLeft:5}}>??????????????????????????????????????????????????? : 12123</Text>
                            <Text style={{fontSize:13, marginLeft:5}}>?????????????????? : 01/01/2564</Text>
                            <Text style={{fontSize:13, marginLeft:5}}>???????????????????????????????????? : </Text>
                            <Text style={{fontSize:13, marginLeft:5}}>????????????????????????????????? : 01/01/2564</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft:30, marginRight:30}}>
                        <View style={{borderColor:'black', borderWidth:this.state.tableBorderWidth}}>
                            <View style={{flexDirection:'row', textAlign:'center', fontSize:13}}>
                                <View style={{flex:0.09}}>
                                    <Text>???????????????</Text>    
                                </View>
                                <View style={{flex:0.16, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>??????????????????????????????</Text>
                                </View>
                                <View style={{flex:0.18, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>????????????????????????????????????</Text>
                                </View>
                                <View style={{flex:0.15, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>????????????????????????????????????</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>???????????????</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>??????????????????</Text>
                                </View>
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>???????????????????????????</Text>
                                </View>
                                
                            </View>
                            {/*  ##  renderList   ## */}
                            <this.renderInvoiceList/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <View style={{marginTop:60, textAlign:'center', alignSelf:'center'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{borderTopColor:'black', borderTopWidth:1, width:130}}>
                                            <Text style={{fontSize:12, marginTop:4}}>?????????????????????????????????</Text>
                                        </View>
                                        <View style={{borderTopColor:'black', borderTopWidth:1, marginLeft:30, width:130}}>
                                            <Text style={{fontSize:12, marginTop:4}}>??????????????????????????????</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row', marginTop:45}}>
                                        <View style={{borderTopColor:'black', borderTopWidth:1, width:130}}>
                                            <Text style={{fontSize:12, marginTop:4}}>????????????????????????????????????</Text>
                                        </View>
                                        <View style={{borderTopColor:'black', borderTopWidth:1, marginLeft:30, width:130}}>
                                            <Text style={{fontSize:12, marginTop:4}}>????????????????????????????????????</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1}}>                        
                                <View style={{borderColor:'black', 
                                            borderWidth:this.state.tableBorderWidth, 
                                            marginTop:10, 
                                            width:'70%', 
                                            alignSelf:'flex-end',
                                            fontSize:13,
                                            textAlign:'center'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text>?????????????????????????????????????????????</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.sum}</Text>
                                        </View>
                                    </View>  

                                    <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                        <View style={{flex:1}}>
                                            <Text>????????????????????????????????????????????? 7%</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.tax}</Text>
                                        </View>
                                    </View> 

                                    <View style={{flexDirection:'row', borderTopColor:'black', borderTopWidth:this.state.tableBorderWidth}}>
                                        <View style={{flex:1}}>
                                            <Text>????????????????????????????????????????????????????????????</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.total}</Text>
                                        </View>
                                    </View>                         
                                </View>
                            </View>    
                        </View>
                    </View>
                </Page>
            </Document>        
        );
    }

    
}


class POCreater extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : this.props.data,
            tableBorderWidth: 2,
            total:0
        }
        
    }

    componentDidMount(){
        let tempTotal = 0;
        for(let x of this.state.data){
            console.log(x);
            tempTotal += x.quantity
        }
        
        this.setState({total : tempTotal});
    }

    renderInvoiceList=()=>{
        let componentList = []
        console.log(this.state.data);
        
        for(let x in this.state.data) {
            console.log(x);
            let num = parseInt(x)+1;
            
            componentList.push(
                <View style={{borderTopColor:'black', 
                              borderTopWidth:this.state.tableBorderWidth, 
                              textAlign:'center', 
                              fontSize:11,
                              flexDirection:'row'}}>
                    <View style={{flex:0.09}}>
                        <Text>{num}</Text>    
                    </View>
                    <View style={{flex:0.77, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].pname}</Text>
                    </View>
                    <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                        <Text>{this.state.data[x].quantity}</Text>
                    </View>    
                </View>
            );
        
        }
        return(componentList);
    }

    render(){
        return(
            <Document title='PDFTEST'> 
                <Page size="A4" style={styles.page} orientation='landscape'>
                    <View style={{flexDirection:'row', width:'100%'}}>
                        <View style={{marginTop:20, marginLeft:30, flex:0.7}}>
                            <Text style={{fontSize:25, fontWeight:'bold'}}>{this.props.companyData.comName}</Text>

                            <View style={{flexDirection:'row', marginTop:5}}>
                                <Text style={{fontSize:14}}>99/99</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>???????????? {this.props.companyData.moo}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>???????????? {this.props.companyData.sub_district}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>??????????????? {this.props.companyData.district}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>????????????????????? {this.props.companyData.provide}</Text>
                                <Text style={{fontSize:14, marginLeft:10}}>{this.props.companyData.zipCode}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14}}>????????? {this.props.companyData.tel}</Text>
                                {/* <Text style={{fontSize:15, marginLeft:10}}>???????????? ---- </Text> */}
                            </View>
                        </View>
                        <View style={{flex:0.3, alignItems:'flex-end', marginTop:20, marginRight:30}}>
                            {/* <Text>Section #2</Text> */}
                            <View style={{borderColor:'black', 
                                        borderWidth:2, 
                                        width:'100%', 
                                        alignItems:'center', 
                                        borderRadius:10}}>
                                <Text style={{fontSize:20, marginTop:5}}>??????????????????????????????</Text>
                                <Text style={{fontSize:20, marginBottom:5}}>Purchase Orders</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', marginTop:10}}>
                        <View style={{marginLeft:30,
                                    flex:0.7}}>
                            <View style={{borderColor:'black',
                                    borderWidth:2,
                                    width:'97%'}}>
                                <Text style={{fontSize:13, marginLeft:14}}>???????????????????????? {this.props.branchData.branchID}</Text>
                                <Text style={{fontSize:13, marginLeft:14}}>?????????????????????????????? {this.props.branchData.cusName}</Text>
                                <View style={{flexDirection:'row'}}> 
                                    <Text style={{fontSize:13, marginLeft:14}}>????????????????????? {this.props.branchData.address}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???????????? {this.props.branchData.moo}</Text> 
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.sub_district}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.district}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>???. {this.props.branchData.provide}</Text>
                                    <Text style={{fontSize:13, marginLeft:10}}>{this.props.branchData.zipCode}</Text>
                                </View>
                                <Text style={{fontSize:13, marginLeft:14}}>????????? {this.props.branchData.tel}</Text>
                            </View>
                
                        </View>
                        <View style={{borderColor:'black',
                                    borderWidth:2, 
                                    marginRight:30, 
                                    flex:0.3}}>
                            <Text style={{fontSize:13, marginLeft:5}}>??????????????????????????????????????????????????? : 12123</Text>
                            <Text style={{fontSize:13, marginLeft:5}}>?????????????????? : 01/01/2564</Text>
                            <Text style={{fontSize:13, marginLeft:5}}>???????????????????????????????????? : </Text>
                            <Text style={{fontSize:13, marginLeft:5}}>????????????????????????????????? : 01/01/2564</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft:30, marginRight:30}}>
                        <View style={{borderColor:'black', borderWidth:this.state.tableBorderWidth}}>
                            <View style={{flexDirection:'row', textAlign:'center', fontSize:13}}>
                                <View style={{flex:0.09}}>
                                    <Text>???????????????</Text>    
                                </View>
                                
                                <View style={{flex:0.77, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>????????????????????????????????????</Text>
                                </View>
                                
                                <View style={{flex:0.14, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}> 
                                    <Text>???????????????</Text>
                                </View>
                                
                            </View>
                            {/*  ##  renderList   ## */}
                            <this.renderInvoiceList/>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <View style={{flexDirection:'row', marginTop:90, textAlign:'center', alignSelf:'center'}}>
                                    <View style={{borderTopColor:'black', borderTopWidth:1, width:130}}>
                                        <Text style={{fontSize:12, marginTop:4}}>??????????????????????????????</Text>
                                    </View>
                                    <View style={{borderTopColor:'black', borderTopWidth:1, marginLeft:30, width:130}}>
                                        <Text style={{fontSize:12, marginTop:4}}>???????????????????????????????????????</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex:1}}>                        
                                <View style={{borderColor:'black', 
                                            borderWidth:this.state.tableBorderWidth, 
                                            marginTop:10, 
                                            width:'70%', 
                                            alignSelf:'flex-end',
                                            fontSize:13,
                                            textAlign:'center'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text>????????????????????????????????????????????????</Text>
                                        </View>
                                        <View style={{flex:1, borderLeftColor:'black', borderLeftWidth:this.state.tableBorderWidth}}>
                                            <Text>{this.state.total}</Text>
                                        </View>
                                    </View>                         
                                </View>
                            </View>    
                        </View>
                    </View>
                </Page>
            </Document>        
        );
    }

    
}

// Create styles
const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white',
      fontFamily:'Prompt'
    },
    section: {

    }
});
  


export {InvoiceCreater, ReceiptCreater, POCreater}