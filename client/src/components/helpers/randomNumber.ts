import ITopCast from '../../models/ITopCast';

const randomNumber = (topCast: ITopCast[]) => {
  if (topCast.length < 2) {
    return 0;
  } else if (topCast.length === 2) {
    return Math.floor(Math.random() * 1);
  } else {
    return Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  } 
};

export default randomNumber;