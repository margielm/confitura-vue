import { Module } from 'vuex';
import { EmbeddedPresentations, EmbeddedUserProfiles, Presentation, RootState, UserProfile } from '@/types';
import axios from 'axios';

export const LOAD_USERS = 'LOAD_S';
export const LOAD_ALL_PRESENTATIONS = 'LOAD_ALL_PRESENTATIONS';
const SET_USERS = 'SET_USERS';
const SET_PRESENTATIONS = 'SET_PRESENTATIONS ';

export const adminModule: Module<AdminState, RootState> = {
  state: {
    users: [],
    presentations: [],
  },
  getters: {
    userCount: ({ users }) => users.length,
    presentationCount: ({ presentations }) => presentations.length,
  },
  mutations: {
    [SET_USERS](store, payload: { users: UserProfile[] }) {
      store.users = payload.users;
    },
    [SET_PRESENTATIONS](store, payload: { presentations: Presentation[] }) {
      store.presentations = payload.presentations;
    },
  },
  actions: {
    [LOAD_USERS]({ commit }) {
      return axios.get<EmbeddedUserProfiles>('/api/users')
        .then((it) => {
          commit(SET_USERS, { users: it.data._embedded.users });
        });
    },
    [LOAD_ALL_PRESENTATIONS]({ commit}) {
      return axios.get<EmbeddedPresentations>('/api/presentations', { params: { projection: 'inlineSpeaker' } })
        .then((it) => {
          commit(SET_PRESENTATIONS, { presentations: it.data._embedded.presentations });
        });
    },
  },
};

export interface AdminState {
  users: UserProfile[];
  presentations: Presentation[];
}
