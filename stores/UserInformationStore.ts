import { create } from 'zustand';

// States
type UsernameState = {
  username: string;
};

type FirstNameState = {
  firstName: string;
};

type LastNameState = {
  lastName: string;
};

type EmailState = {
  email: string;
};

type RoleState = {
  role: 'student' | 'faculty' | 'organization';
};

type SchoolNameState = {
  schoolName: string;
};

// Actions
type UsernameAction = {
  updateUsername: (username: UsernameState['username']) => void;
};

type FirstNameAction = {
  updateFirstname: (firstName: FirstNameState['firstName']) => void;
};

type LastNameAction = {
  updateLastname: (lastName: LastNameState['lastName']) => void;
};

type EmailAction = {
  updateEmail: (email: EmailState['email']) => void;
};

type RoleAction = {
  updateRole: (role: RoleState['role']) => void;
};

type SchoolNameAction = {
  updateSchoolName: (schoolName: SchoolNameState['schoolName']) => void;
};

// Stores
export const useUsernameStore = create<UsernameState & UsernameAction>((set) => ({
  username: '',
  updateUsername: (username) => set(() => ({ username: username })),
}));

export const useFirstNameStore = create<FirstNameState & FirstNameAction>((set) => ({
  firstName: '',
  updateFirstname: (firstName) => set(() => ({ firstName: firstName })),
}));

export const useLastNameStore = create<LastNameState & LastNameAction>((set) => ({
  lastName: '',
  updateLastname: (lastName) => set(() => ({ lastName: lastName })),
}));

export const useEmailStore = create<EmailState & EmailAction>((set) => ({
  email: '',
  updateEmail: (email) => set(() => ({ email: email })),
}));

export const useRoleStore = create<RoleState & RoleAction>((set) => ({
  role: 'student',
  updateRole: (role) => set(() => ({ role: role })),
}));

export const useSchoolNameStore = create<SchoolNameState & SchoolNameAction>((set) => ({
  schoolName: '',
  updateSchoolName: (schoolName) => set(() => ({ schoolName: schoolName })),
}));
