import { Id } from '@/convex/_generated/dataModel';
import { create } from 'zustand';

// States
type EventNameState = {
  eventName: string;
};

type EventDateState = {
  eventDate: string;
};

type EventStartTimeState = {
  eventStartTime: string;
};

type EventEndTimeState = {
  eventEndTime: string;
};

type EventContactPersonState = {
  eventContactPerson: string;
};

type EventContactEmailState = {
  eventContactEmail: string;
};

type EventContactPhoneState = {
  eventContactPhone: string;
};

type EventOrganizationIdState = {
  eventOrganizationId: Id<'organizations'>;
};

type EventSchoolIdState = {
  eventSchoolId: Id<'schools'>;
};

type AttendingCountState = {
  attendingCount: number;
};

type MaybeAttendingCountState = {
  maybeAttendingCount: number;
};

type CreatedByState = {
  createdBy: Id<'users'>;
};

type EventTagsState = {
  eventTags: string[];
};

type EventImageUrlState = {
  eventImgUrl: string;
};

// Actions
type EventNameAction = {
  updateEventName: (eventName: EventNameState['eventName']) => void;
};

type EventDateAction = {
  updateEventDate: (eventDate: EventDateState['eventDate']) => void;
};

type EventStartTimeAction = {
  updateEventStartTime: (eventStartTime: EventStartTimeState['eventStartTime']) => void;
};

type EventEndTimeAction = {
  updateEventEndTime: (eventEndTime: EventEndTimeState['eventEndTime']) => void;
};

type EventContactPersonAction = {
  updateEventContactPerson: (
    eventContactPerson: EventContactPersonState['eventContactPerson']
  ) => void;
};

type EventContactEmailAction = {
  updateEventContactEmail: (eventContactEmail: EventContactEmailState['eventContactEmail']) => void;
};

type EventContactPhoneAction = {
  updateEventContactPhone: (eventContactPhone: EventContactPhoneState['eventContactPhone']) => void;
};

type EventOrganizationIdAction = {
  updateEventOrganizationId: (
    eventOrganizationId: EventOrganizationIdState['eventOrganizationId']
  ) => void;
};

type EventSchoolIdAction = {
  updateEventSchoolId: (eventSchoolId: EventSchoolIdState['eventSchoolId']) => void;
};

type AttendingCountAction = {
  updateAttendingCount: (attendingCount: AttendingCountState['attendingCount']) => void;
};

type MaybeAttendingCountAction = {
  updateMaybeAttendingCount: (
    maybeAttendingCount: MaybeAttendingCountState['maybeAttendingCount']
  ) => void;
};

type CreatedByAction = {
  updateCreatedBy: (createdBy: CreatedByState['createdBy']) => void;
};

type EventTagsAction = {
  updateEventTags: (eventTags: EventTagsState['eventTags']) => void;
};

type EventImgUrlAction = {
  updateEventImgUrl: (eventImgUrl: EventImageUrlState['eventImgUrl']) => void;
};

// Stores
export const useEventNameStore = create<EventNameState & EventNameAction>((set) => ({
  eventName: '',
  updateEventName: (eventName) => set(() => ({ eventName })),
}));

export const useEventDateStore = create<EventDateState & EventDateAction>((set) => ({
  eventDate: '',
  updateEventDate: (eventDate) => set(() => ({ eventDate })),
}));

export const useEventStartTimeStore = create<EventStartTimeState & EventStartTimeAction>((set) => ({
  eventStartTime: '',
  updateEventStartTime: (eventStartTime) => set(() => ({ eventStartTime })),
}));

export const useEventEndTimeStore = create<EventEndTimeState & EventEndTimeAction>((set) => ({
  eventEndTime: '',
  updateEventEndTime: (eventEndTime) => set(() => ({ eventEndTime })),
}));

export const useEventContactPersonStore = create<
  EventContactPersonState & EventContactPersonAction
>((set) => ({
  eventContactPerson: '',
  updateEventContactPerson: (eventContactPerson) => set(() => ({ eventContactPerson })),
}));

export const useEventContactEmailStore = create<EventContactEmailState & EventContactEmailAction>(
  (set) => ({
    eventContactEmail: '',
    updateEventContactEmail: (eventContactEmail) => set(() => ({ eventContactEmail })),
  })
);

export const useEventContactPhoneStore = create<EventContactPhoneState & EventContactPhoneAction>(
  (set) => ({
    eventContactPhone: '',
    updateEventContactPhone: (eventContactPhone) => set(() => ({ eventContactPhone })),
  })
);

export const useEventOrganizationIdStore = create<
  EventOrganizationIdState & EventOrganizationIdAction
>((set) => ({
  eventOrganizationId: '' as Id<'organizations'>,
  updateEventOrganizationId: (eventOrganizationId) => set(() => ({ eventOrganizationId })),
}));

export const useEventSchoolIdStore = create<EventSchoolIdState & EventSchoolIdAction>((set) => ({
  eventSchoolId: '' as Id<'schools'>,
  updateEventSchoolId: (eventSchoolId) => set(() => ({ eventSchoolId })),
}));

export const useAttendingCountStore = create<AttendingCountState & AttendingCountAction>((set) => ({
  attendingCount: 0,
  updateAttendingCount: (attendingCount) => set(() => ({ attendingCount })),
}));

export const useMaybeAttendingCountStore = create<
  MaybeAttendingCountState & MaybeAttendingCountAction
>((set) => ({
  maybeAttendingCount: 0,
  updateMaybeAttendingCount: (maybeAttendingCount) => set(() => ({ maybeAttendingCount })),
}));

export const useCreatedByStore = create<CreatedByState & CreatedByAction>((set) => ({
  createdBy: '' as Id<'users'>,
  updateCreatedBy: (createdBy) => set(() => ({ createdBy })),
}));

export const useEventTagsStore = create<EventTagsState & EventTagsAction>((set) => ({
  eventTags: [],
  updateEventTags: (eventTags) => set(() => ({ eventTags })),
}));

export const useEventImgUrlStore = create<EventImageUrlState & EventImgUrlAction>((set) => ({
  eventImgUrl: '',
  updateEventImgUrl: (eventImgUrl) => set(() => ({ eventImgUrl })),
}));
