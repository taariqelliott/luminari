import { Id } from '@/convex/_generated/dataModel';

//States
type EventNameState = {
  eventName: string;
};

type EventDateState = {
  eventDate: string;
};

type EventTimeFromState = {
  eventTimeFrom: string;
};

type EventTimeToState = {
  eventTimeTo: string;
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

type EventShareUrlState = {
  eventShareUrl: string;
};

// Actions
type EventNameAction = {
  updateEventName: (eventName: EventNameState['eventName']) => void;
};

type EventDateAction = {
  updateEventDate: (eventDate: EventDateState['eventDate']) => void;
};

type EventTimeFromAction = {
  updateEventTimeFrom: (eventTimeFrom: EventTimeFromState['eventTimeFrom']) => void;
};

type EventTimeToAction = {
  updateEventTimeTo: (eventTimeTo: EventTimeToState['eventTimeTo']) => void;
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

type EventImageUrlAction = {
  updateEventImgUrl: (eventImgUrl: EventImageUrlState['eventImgUrl']) => void;
};

type EventShareUrlAction = {
  updateEventShareUrl: (eventShareUrl: EventShareUrlState['eventShareUrl']) => void;
};
