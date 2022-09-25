import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
} from 'helpers/helper';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const PaymentCard = ({ setIsCC, setIsSuccess, page, handleClose }) => {
  const [comingSoon] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setCardDetails({ ...cardDetails, issuer });
    }
  };

  const handleInputFocus = ({ target }) => {
    setCardDetails({ ...cardDetails, focused: target.name });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }
    setCardDetails({ ...cardDetails, [target.name]: target.value });
  };
  return (
    <div className='paymentCardDiv DBlock'>
      {comingSoon ? (
        <div className='paymentText DFlex justify-content-center'>
          <h1>Coming Soon!</h1>
        </div>
      ) : (
        <Row>
          <Col sm={12} lg={5} className='mb-3'>
            <Card
              number={cardDetails?.number}
              name={cardDetails?.name}
              expiry={cardDetails?.expiry}
              cvc={cardDetails?.cvc}
              focused={cardDetails?.focused}
              callback={handleCallback}
            />
          </Col>
          <Col sm={12} lg={7}>
            <div>
              <div className='form-group'>
                <input
                  type='tel'
                  name='number'
                  className='form-control'
                  placeholder='Card Number'
                  pattern='[\d| ]{16,22}'
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  placeholder='Name'
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <Row>
                <Col sm={12} md={6}>
                  <input
                    type='tel'
                    name='expiry'
                    className='form-control'
                    placeholder='Valid Thru'
                    pattern='\d\d/\d\d'
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Col>
                <Col sm={12} md={6}>
                  <input
                    type='tel'
                    name='cvc'
                    className='form-control'
                    placeholder='CVC'
                    pattern='\d{3,4}'
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Col>
              </Row>
              <input type='hidden' name='issuer' value={cardDetails?.issuer} />
              <div className='btnDivs DFlex justify-content-start'>
                <button
                  onClick={() =>
                    page === 'pricing' ? handleClose() : setIsCC(false)
                  }
                  className='outline DFlex justify-content-center'>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsCC(false);
                    setIsSuccess(true);
                  }}
                  className='DFlex justify-content-center'>
                  Payment Confirmed
                </button>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PaymentCard;
