import { ethers } from 'ethers';
import Payment from 'payment';
import { toast } from 'react-toastify';
import marketPlaceABI from 'config/marketPlaceABI.json';

export const walletAddress =
  process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS ||
  '0xC115c36d2ed62aE7117f7A649B88c53a18D9BB25';

export const pricingList = [
  {
    id: 1,
    plan: 'fan',
    eth: 0.1,
    avaiable: 1280,
    features: [
      { id: 1, text: 'Access to private members-only Discord channel.' },
      { id: 2, text: 'Privileges and discounts in the MegaFans MegaMart.' },
      { id: 3, text: 'Special perks (giveaways).' },
    ],
  },
  {
    id: 2,
    plan: 'superfan',
    eth: 0.25,
    avaiable: 1980,
    features: [
      { id: 1, text: 'Access to private members-only Discord channel.' },
      { id: 2, text: 'Privileges and discounts in the MegaFans MegaMart.' },
      { id: 3, text: 'Special perks (giveaways).' },
    ],
  },
  {
    id: 3,
    plan: 'gigafan',
    eth: 0.15,
    avaiable: 1990,
    features: [
      { id: 1, text: 'Access to private members-only Discord channel.' },
      { id: 2, text: 'Privileges and discounts in the MegaFans MegaMart.' },
      { id: 3, text: 'Special perks (giveaways).' },
    ],
  },
  {
    id: 4,
    plan: 'megafan',
    eth: 1.0,
    avaiable: 1199,
    features: [
      { id: 1, text: 'Access to private members-only Discord channel.' },
      { id: 2, text: 'Privileges and discounts in the MegaFans MegaMart.' },
      { id: 3, text: 'Special perks (giveaways).' },
    ],
  },
];

//Payemtn Card Validation
function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === 'amex' ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const notifyErrors = (error) => {
  if (typeof error?.response?.data !== 'string') {
    for (let message in error?.response?.data?.errors) {
      toast.error(
        `${message} ${
          Array.isArray(error?.response?.data?.errors[message])
            ? error?.response?.data?.errors[message][0]
            : error?.response?.data?.errors[message]
        }`
      );
    }
  } else {
    toast.error(error?.response?.data);
  }
};

export const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ercMarketPlace = new ethers.Contract(
    walletAddress,
    marketPlaceABI,
    provider
  );
  return { provider, ercMarketPlace };
};

export const getSignProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ercMarketPlace = new ethers.Contract(
    walletAddress,
    marketPlaceABI,
    signer
  );
  return { provider, ercMarketPlace };
};
