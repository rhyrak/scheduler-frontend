export type Course = {
  Section: number;
  Course_Code: string;
  Course_Name: string;
  Number_of_Students: number;
  Course_Environment: string;
  "T+U": string;
  AKTS: number;
  Class: number;
  Depertmant: string;
  Lecturer: string;
  Department: string;
};

export type Classroom = {
  floor_number: number;
  classroom_id: string;
  capacity: number;
  available_days: string;
};

export type Busy = {
  Lecturer: string;
  Busy_Day: string;
};

export type Conflict = {
  Department1: string;
  Course_Code1: string;
  Department2: string;
  Course_Code2: string;
};

export type Split = {
  Department: string;
  Course_Code: string;
  Half_Duration: number;
};

export type Reserved = {
  Department: string;
  Course_Code: string;
  Day: string;
  Starting_Time: string;
};

export type ResultRow = {
  course_code: string;
  day: string;
  time: string;
  duration: string;
  classroom: string;
  grade: string;
  department: string;
  course_name: string;
  lecturer: string;
};

export type ScheduleMeta = {
  id: string;
  status: string;
  report: string;
};

export type GetAllSchedulesResponse = {
  schedules: ScheduleMeta[];
};
