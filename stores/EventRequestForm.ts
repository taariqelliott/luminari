import { Id } from '@/convex/_generated/dataModel';
import { create } from 'zustand';

// States
type EventRequestName = {
  eventRequestName: string;
};

type EventRequestCreatedById = {
  eventRequestCreatedById: Id<'users'>;
};

type EventRequestCreatedBy = {
  eventRequestCreatedBy: string;
};

type EventRequestSchoolId = {
  eventRequestSchoolId: Id<'schools'>;
};

type EventRequestSchoolName = {
  eventRequestSchoolName: string;
};

type EventRequestOrganizationId = {
  eventRequestOrganizationId: Id<'organizations'>;
};

type EventRequestTags = {
  eventRequestTags: string[];
};

type EventRequestContactEmail = {
  eventRequestContactEmail: string;
};

type EventRequestLikeCount = {
  eventRequestLikeCount: number;
};

type EventRequestStatus = {
  eventRequestStatus: string;
};

// Actions
type EventRequestNameAction = {
  updateEventRequestName: (eventRequestName: EventRequestName['eventRequestName']) => void;
};

type EventRequestCreatedByIdAction = {
  updateEventRequestCreatedById: (
    eventRequestCreatedById: EventRequestCreatedById['eventRequestCreatedById']
  ) => void;
};

type EventRequestCreatedByAction = {
  updateEventRequestCreatedBy: (
    eventRequestCreatedBy: EventRequestCreatedBy['eventRequestCreatedBy']
  ) => void;
};

type EventRequestSchoolIdAction = {
  updateEventRequestSchoolId: (
    eventRequestSchoolId: EventRequestSchoolId['eventRequestSchoolId']
  ) => void;
};

type EventRequestSchoolNameAction = {
  updateEventRequestSchoolName: (
    eventRequestSchoolName: EventRequestSchoolName['eventRequestSchoolName']
  ) => void;
};

type EventRequestOrganizationIdAction = {
  updateEventRequestOrganizationId: (
    eventRequestOrganizationId: EventRequestOrganizationId['eventRequestOrganizationId']
  ) => void;
};

type EventRequestTagsAction = {
  updateEventRequestTags: (eventRequestTags: EventRequestTags['eventRequestTags']) => void;
};

type EventRequestContactEmailAction = {
  updateEventRequestContactEmail: (
    eventRequestContactEmail: EventRequestContactEmail['eventRequestContactEmail']
  ) => void;
};

type EventRequestLikeCountAction = {
  updateEventRequestLikeCount: (
    eventRequestLikeCount: EventRequestLikeCount['eventRequestLikeCount']
  ) => void;
};

type EventRequestStatusAction = {
  updateEventRequestStatus: (eventRequestStatus: EventRequestStatus['eventRequestStatus']) => void;
};

// Stores
export const useEventRequestNameStore = create<EventRequestName & EventRequestNameAction>(
  (set) => ({
    eventRequestName: '',
    updateEventRequestName: (eventRequestName) => set(() => ({ eventRequestName })),
  })
);

export const useEventRequestCreatedByIdStore = create<
  EventRequestCreatedById & EventRequestCreatedByIdAction
>((set) => ({
  eventRequestCreatedById: '' as Id<'users'>,
  updateEventRequestCreatedById: (eventRequestCreatedById) =>
    set(() => ({ eventRequestCreatedById })),
}));

export const useEventRequestCreatedByStore = create<
  EventRequestCreatedBy & EventRequestCreatedByAction
>((set) => ({
  eventRequestCreatedBy: '',
  updateEventRequestCreatedBy: (eventRequestCreatedBy) => set(() => ({ eventRequestCreatedBy })),
}));

export const useEventRequestSchoolIdStore = create<
  EventRequestSchoolId & EventRequestSchoolIdAction
>((set) => ({
  eventRequestSchoolId: '' as Id<'schools'>,
  updateEventRequestSchoolId: (eventRequestSchoolId) => set(() => ({ eventRequestSchoolId })),
}));

export const useEventRequestSchoolNameStore = create<
  EventRequestSchoolName & EventRequestSchoolNameAction
>((set) => ({
  eventRequestSchoolName: '',
  updateEventRequestSchoolName: (eventRequestSchoolName) => set(() => ({ eventRequestSchoolName })),
}));

export const useEventRequestOrganizationIdStore = create<
  EventRequestOrganizationId & EventRequestOrganizationIdAction
>((set) => ({
  eventRequestOrganizationId: '' as Id<'organizations'>,
  updateEventRequestOrganizationId: (eventRequestOrganizationId) =>
    set(() => ({ eventRequestOrganizationId })),
}));

export const useEventRequestTagsStore = create<EventRequestTags & EventRequestTagsAction>(
  (set) => ({
    eventRequestTags: [],
    updateEventRequestTags: (eventRequestTags) => set(() => ({ eventRequestTags })),
  })
);

export const useEventRequestContactEmailStore = create<
  EventRequestContactEmail & EventRequestContactEmailAction
>((set) => ({
  eventRequestContactEmail: '',
  updateEventRequestContactEmail: (eventRequestContactEmail) =>
    set(() => ({ eventRequestContactEmail })),
}));

export const useEventRequestLikeCountStore = create<
  EventRequestLikeCount & EventRequestLikeCountAction
>((set) => ({
  eventRequestLikeCount: 0,
  updateEventRequestLikeCount: (eventRequestLikeCount) => set(() => ({ eventRequestLikeCount })),
}));

export const useEventRequestStatusStore = create<EventRequestStatus & EventRequestStatusAction>(
  (set) => ({
    eventRequestStatus: '',
    updateEventRequestStatus: (eventRequestStatus) => set(() => ({ eventRequestStatus })),
  })
);
