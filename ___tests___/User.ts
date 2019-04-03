import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  created: Date;
  saveCount: number;
  foo: IFoo;
}

export interface IFoo extends mongoose.Document {
  name: string;
  email: string;
  created: Date;
}

const schema = new Schema({
  created: { type: Date, default: Date.now },
  email: { type: String, required: true },
  foo: { type: String, ref: 'Foo' },
  name: String,
  saveCount: { type: Number, default: 0 },
});

const foo = new Schema({
  created: { type: Date, default: Date.now },
  email: String,
  name: String,
});

schema.pre('save', function() {
  (this as any).saveCount++;
});

const User = mongoose.model<IUser>('User', schema);
const Foo = mongoose.model('Foo', foo);

export { User, Foo };
