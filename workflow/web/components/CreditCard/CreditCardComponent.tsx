import React, { ReactNode } from "react";
import { SuperInput } from "workflow/shared";
// import "./nodemodule/

class CreditCard extends SuperInput<any> {
  handleChangeText(value: string, key: string): void {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }

  render(): ReactNode {
    const { 
      // render, 
      title, mandatory, 
      // handleRefreshOn, refreshOn, id
     } = this.props;
    // const { value, error } = this.state;

    return (
      <>
        <div className="mt-4">
          {title && <p className="text-14 font-700 mb-2"
            style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px' }}>{title}{mandatory && <span className="text-error" style={{ color: 'red' }}>*</span>}</p>}
        </div>
        <div className="card-js">
          <input className="card-number my-custom-class" name="card-number" style={{ width: '49%', margin: "5px", padding: '15px', border: '1px solid #ccc', borderRadius: '4px', height: '48px' }} placeholder="Card number" onChange={(e) => this.handleChangeText(e.target.value, 'cardNumber')} />
          <input className="name" id="the-card-name-id" name="card-holders-name" placeholder="Name on card" style={{ width: '49%', margin: "5px", padding: '15px', border: '1px solid #ccc', borderRadius: '4px', height: '48px' }} onChange={(e) => this.handleChangeText(e.target.value, 'name')} />
          <input className="expiry-month" name="expiry-month" style={{ width: '49%', margin: "5px", padding: '15px', border: '1px solid #ccc', borderRadius: '4px', height: '48px' }} placeholder="MM" onChange={(e) => this.handleChangeText(e.target.value, 'expiryMonth')} />
          <input className="expiry-year" name="expiry-year" style={{ width: '49%', margin: "5px", padding: '15px', border: '1px solid #ccc', borderRadius: '4px', height: '48px' }} placeholder="YY" onChange={(e) => this.handleChangeText(e.target.value, 'expiryYear')} />
          <input className="cvc" name="cvc" style={{ width: '49%', margin: "5px", padding: '15px', border: '1px solid #ccc', borderRadius: '4px', height: '48px' }} placeholder="CVC" onChange={(e) => this.handleChangeText(e.target.value, 'cvc')} />
        </div>
      </>
    );
  }
}

export default CreditCard;
