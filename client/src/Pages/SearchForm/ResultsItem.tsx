import React from 'react';
import { BeerProps, CocktailProps } from './SearchForm';

import placeholder from 'Assets/img/placeholder.png';

interface Props {
  item: BeerProps | CocktailProps;
}

const ResultsItem: React.FC<Props> = ({ item }) => {
  console.log(item.details);

  return (
    <>
      <img src={item.imgUrl === '//:0' || !item.imgUrl ? placeholder : item.imgUrl} height='25' width='25' alt='(image not found)'></img>
      {item.name}
      {item.details.ABV}
      <hr></hr>
    </>
  );
};

export default ResultsItem;
