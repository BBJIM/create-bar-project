import { makeVar, ReactiveVar } from '@apollo/client';
import { User } from 'Common/Models';

export const currentUserVar: ReactiveVar<User | null> = makeVar(null as User | null);
