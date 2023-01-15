import { DataUtil } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';

export class DialogFormTemplate extends React.Component {
    constructor(props) {
        super(props);
        // this.shipCountryDistinctData = DataUtil.distinct(orderData, 'ShipCountry', true);
        this.state = Object.assign({}, props);
    }
    onChange(args) {
        this.setState({ [args.target.name]: args.target.value });
    }
    render() {
        this.onChange = this.onChange.bind(this);
        const data = this.state;
        return (<div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <div className="e-float-input e-control-wrapper">
                        <input id="name" name="name" type="text" value={data.name} onChange={this.onChange}/>
                        <span className="e-float-line"/>
                        <label className="e-float-text e-label-top"> name</label>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="e-float-input e-control-wrapper">
                        <input value={data.stock} id="stock" name="stock" type="text" onChange={this.onChange}/>
                        <span className="e-float-line"/>
                        <label className="e-float-text e-label-top">stock</label>
                    </div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <NumericTextBoxComponent id="Freight" format='C2' value={data.Freight} placeholder="Precio" floatLabelType='Always'/>
                </div>
                {/* <div className="form-group col-md-6">
                    <DropDownListComponent id="description" value={data.description} dataSource={this.description} fields={{ text: 'description', value: 'description' }} placeholder="Description" popupHeight='300px' floatLabelType='Always'/>
                </div> */}
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <div className="e-float-input e-control-wrapper">
                        <textarea id="description" name="description" value={data.description} onChange={this.onChange}/>
                        <span className="e-float-line"/>
                        <label className="e-float-text e-label-top">Description</label>
                    </div>
                </div>
            </div>
        </div>);
    }
}