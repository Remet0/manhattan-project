import { Comment, ICommentDocument } from './Comment';
import mongoose from 'mongoose';
import { ObjectID } from 'bson';
declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: any;
    }
  }
}

const commentData = {
  author: new ObjectID(),
  text: 'what a great beer',
  product: new ObjectID(),
  upvotes: new ObjectID(),
  downvotes: new ObjectID()
};

describe('Comment Modal Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  //test modal
  it('creates a comment', async done => {
    const validComment: ICommentDocument = new Comment(commentData);
    const savedComment = await validComment.save();

    expect(savedComment.author).toBe(validComment.author);
    expect(savedComment.text).toBe(validComment.text);
    expect(savedComment.upvotes).toBe(validComment.upvotes);
    expect(savedComment.downvotes).toBe(validComment.downvotes);
    done();
  });

  // Test Schema is working
  it('insert comment but any undefined field in shema should result in undefined', async done => {
    const commentWithInvalidField: ICommentDocument = new Comment({
      author: new ObjectID(),
      text: 'yummy yummy',
      time: '10am',
      product: new ObjectID()
    });
    const savedCommentWithInvalidField = await commentWithInvalidField.save();
    expect(savedCommentWithInvalidField._id).toBeDefined();
    //@ts-ignore
    expect(savedCommentWithInvalidField.time).toBeUndefined();
    done();
  });

  // Test Validation is working
  it('creating a comment without a required field should fail', async done => {
    const commentWithoutRequiredField = new Comment({ text: 'yum yum beer' });
    let err: any;
    try {
      const savedCommentWithoutRequiredField = await commentWithoutRequiredField.save();
      //@ts-ignore
      error = savedCommentWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.author).toBeDefined();
    done();
  });
});
