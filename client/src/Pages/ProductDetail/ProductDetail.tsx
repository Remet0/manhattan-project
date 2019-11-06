import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { ProductProps } from 'Store';
import { useTitle } from 'Hooks';
import { spacing } from 'Utilities';
import { Card, CardHeader, CardBody, GoBackButton, Rating } from 'Elements';
import placeholder from 'Assets/img/placeholder.png';
import CommentsSection from './CommentsSection';

interface Props {}

const ProductDetail: React.FC<Props> = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  useTitle(product ? product.name : 'Error: Product not Found');

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response: Response = await fetch(`/api/products/${productId}`, { method: 'GET' });

        const errorCodes: number[] = [400, 404, 500];
        if (errorCodes.includes(response.status)) {
          // TODO: Handle Errors
          return;
        }

        if (response.status === 200) {
          const successData = await response.json();
          setProduct(successData);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getProductDetails();
  }, [productId]);

  return (
    <>
      <GoBackButton />

      {product === null ? (
        <p> Product doesn't exist </p>
      ) : product.type === 'MIXED' ? (
        <>
          <Card as='section'>
            <CardHeader>{product.name}</CardHeader>
            <ProductInfo>
              <Rating
                rating={product.rating}
                upvotes={product.upvotes}
                downvotes={product.downvotes}
                id={productId || 'error: product not found'}
                type='products'
              />
              <Details>
                <p>
                  <strong>Glass Type:</strong> {product.details.glassType}
                </p>
                <p>
                  <strong>Directions:</strong> {product.details.directions}
                </p>
                <strong>Ingredients: </strong> <br />
                <ul>
                  {product.details.ingredients ? (
                    product.details.ingredients.map(e => (
                      <li key={e._id}>
                        {e.name}: {e.measurement}
                      </li>
                    ))
                  ) : (
                    <span></span>
                  )}
                </ul>
              </Details>
              <Image
                src={product.imgUrl === '//:0' || !product.imgUrl ? placeholder : product.imgUrl}
                alt={product.name}
              />
            </ProductInfo>
          </Card>
          <CommentsSection type={product.type} comments={product.comments} />
        </>
      ) : (
        <>
          <Card as='section'>
            <CardHeader>{product.name}</CardHeader>
            <ProductInfo>
              <Rating
                rating={product.rating}
                upvotes={product.upvotes}
                downvotes={product.downvotes}
                id={productId || 'error: product not found'}
                type='products'
              />
              <Details>
                {/* Beer Details */}
                {product.details.ABV && `ABV: ${product.details.ABV}%`}
                {product.details.organic === true && (
                  <p>
                    Organic: <i className='fas fa-seedling' />
                  </p>
                )}

                {product.details.desc && <p>{product.details.desc}</p>}
              </Details>
              <Image
                src={product.imgUrl === '//:0' || !product.imgUrl ? placeholder : product.imgUrl}
                alt={product.name}
              />
            </ProductInfo>
          </Card>
          <CommentsSection type={product.type} comments={product.comments} />
        </>
      )}
    </>
  );
};

export default ProductDetail;

const Image = styled.img`
  grid-area: image;

  max-width: 100%;
  height: auto;
  object-position: center;

  @media screen and (min-width: 768px) {
    max-width: 300px;
    max-height: 50%;
  }
`;

const Details = styled.div`
  grid-area: details;

  word-wrap: break-word;
  overflow: hidden;
`;

const ProductInfo = styled(CardBody)`
  display: grid;
  grid-template-rows: max-content 1fr;
  grid-template-columns: max-content 1fr;
  grid-template-areas:
    'rating image'
    '. details';
  grid-gap: ${spacing.md};

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, max-content) 1fr;
    grid-template-rows: initial;
    grid-template-areas: 'rating image details';
  }
`;
