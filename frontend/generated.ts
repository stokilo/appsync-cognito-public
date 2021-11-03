import gql from 'graphql-tag'
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Note>;
  deleteNote?: Maybe<Scalars['String']>;
  updateNote?: Maybe<Note>;
};

export type MutationCreateNoteArgs = {
  note: NoteInput;
};

export type MutationDeleteNoteArgs = {
  noteId: Scalars['String'];
};

export type MutationUpdateNoteArgs = {
  note: UpdateNoteInput;
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type NoteInput = {
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getNoteById?: Maybe<Note>;
  listNotes?: Maybe<Array<Maybe<Note>>>;
};

export type QueryGetNoteByIdArgs = {
  noteId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateNote?: Maybe<Note>;
};

export type SubscriptionOnCreateNoteArgs = {
  content?: Maybe<Scalars['String']>;
};

export type UpdateNoteInput = {
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ListNotesQueryVariables = Exact<{ [key: string]: never; }>;

export type ListNotesQuery = { __typename?: 'Query', listNotes?: Array<{ __typename?: 'Note', id: string, content: string } | null | undefined> | null | undefined };

export type CreateNoteMutationVariables = Exact<{
  note: NoteInput;
}>;

export type CreateNoteMutation = { __typename?: 'Mutation', createNote?: { __typename?: 'Note', id: string, content: string } | null | undefined };

export type OnCreateNoteSubscriptionSubscriptionVariables = Exact<{
  content?: Maybe<Scalars['String']>;
}>;

export type OnCreateNoteSubscriptionSubscription = { __typename?: 'Subscription', onCreateNote?: { __typename?: 'Note', id: string, content: string } | null | undefined };

export const ListNotesGql = gql`
    query ListNotes {
  listNotes {
    id
    content
  }
}
    `
export const CreateNoteGql = gql`
    mutation CreateNote($note: NoteInput!) {
  createNote(note: $note) {
    id
    content
  }
}
    `
export const OnCreateNoteSubscriptionGql = gql`
    subscription OnCreateNoteSubscription($content: String) {
  onCreateNote(content: $content) {
    id
    content
  }
}
    `
