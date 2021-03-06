import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router';

import { UserContext } from 'Store';
import { useForm } from 'Hooks';
import { Input, Form, ErrorCard, Button, CardHeader, CardBody } from 'Elements';

interface Props {
  setUpdateComments: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCommentForm: React.FC<Props> = ({ setUpdateComments }) => {
  const { productId } = useParams();
  const { push } = useHistory();
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [values, handleChange] = useForm({ text: '', author: user.username });

  const addComment = async () => {
    const lsLoginToken = localStorage.getItem('loginToken');
    if (lsLoginToken) {
      try {
        const response: Response = await fetch(`/api/products/${productId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${lsLoginToken}`
          },
          body: JSON.stringify(values)
        });

        const errorCodes: number[] = [400, 500];
        if (errorCodes.includes(response.status)) {
          const errorData: { status: number; message: string } = await response.json();
          return setErrorMessage(errorData.message);
        }

        await response.json();

      } catch (err) {
        console.log(err.message);
      } finally {
        setUpdateComments(true);
      }
    } else {
      // If the user is not logged in (does not have a login token),
      // Redirect them to the login page
      push('/login');
    }
  };

  return (
    <>
      {errorMessage && (
        <ErrorCard>
          <CardHeader as='h3'>Error</CardHeader>
          <CardBody>
            <p>{errorMessage}</p>
          </CardBody>
        </ErrorCard>
      )}

      <Form
        onSubmit={e => {
          e.preventDefault();

          addComment();

          handleChange({
            target: {
              name: 'text',
              value: ''
            }
          });
        }}
      >
        <Input
          name='text'
          type='textarea'
          label='Add a comment'
          placeholder='Enter your comment here'
          value={values.text}
          onChange={handleChange}
        />

        <Button type='submit'>Add Comment</Button>
      </Form>
    </>
  );
};

export default AddCommentForm;
