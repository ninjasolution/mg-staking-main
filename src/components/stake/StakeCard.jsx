import { useState } from 'react';
import { GrFormNext } from 'react-icons/gr';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ProgressBar from 'react-bootstrap/ProgressBar';

const StakeCard = ({ handleShow }) => {
  const [isDetail, setIsDetail] = useState(false);

  return (
    <div className='stakeCard DBlock'>
      <div className='cardHeading DFlex'>
        <div className='headingContent'>
          <h4>MegaFans</h4>
          <p>Stake MegaFans,</p>
        </div>
        <div className='cardImg DFlex justify-content-center'>
          <img src='/assets/svgs/mega.svg' alt='megaImg' className='megaImg' />
        </div>
      </div>
      <div className='cardBody'>
        <ul>
          <li className='DFlex'>
            <span>Polygon:</span>
            <span>0.00%</span>
          </li>
          <li className='DFlex'>
            <span>Profit:</span>
            <span className='badgeSpan'>+130%</span>
          </li>
          <li className='DFlex'>
            <ProgressBar
              animated
              now={70}
              label='70%'
              className='progressBar w-100'
            />
          </li>
          <li className='DFlex'>
            <strong>START EARNING</strong>
            <button onClick={handleShow}>Connect Wallet</button>
          </li>
        </ul>
        {isDetail ? (
          <button className='seeMore' onClick={() => setIsDetail(false)}>
            Hide <BiChevronUp />
          </button>
        ) : (
          <button className='seeMore mb-0' onClick={() => setIsDetail(true)}>
            See More <BiChevronDown />
          </button>
        )}
        {isDetail && (
          <div className='seeMoreCard DBlock'>
            <div className='formGroup'>
              <label htmlFor='address'>Stake address</label>
              <input
                type='text'
                name='address'
                placeholder='3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5'
              />
            </div>
            <div className='formGroup'>
              <label htmlFor='days'>Days of stake</label>
              <input type='text' name='days' placeholder='Enter Days' />
            </div>
            <div className='formGroup'>
              <label htmlFor='number'>length of stake</label>
              <input type='text' name='number' placeholder='Enter Stake No' />
            </div>
            {/* <p className='DFlex'>
              Total MegaFan Staked:
              <span>145,246,747</span>
            </p>
            <p className='DFlex'>
              Total Liquidity:
              <span>$14,802.12</span>
            </p> */}
            <div className='btnsDiv DFlex'>
              <button className='DFlex'>
                See Token Info{' '}
                <span>
                  <GrFormNext />
                </span>
              </button>
              <button className='DFlex outline'>
                View Contract{' '}
                <span>
                  <GrFormNext />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StakeCard;
