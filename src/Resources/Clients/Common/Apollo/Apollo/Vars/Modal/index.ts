import { makeVar, ReactiveVar } from '@apollo/client';
import { ModalItem } from 'Common/Types';

export const openVar = makeVar(false);
export const modalStackVar: ReactiveVar<ModalItem[]> = makeVar([] as ModalItem[]);
