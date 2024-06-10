import { Busy, Classroom, Conflict, Course, Reserved, Split } from "./models";

export const Repository = {
  SetStep: (index: number) => {
    sessionStorage.setItem("__step", JSON.stringify(index));
  },
  GetStep: () => {
    const stepStr = sessionStorage.getItem("__step");
    if (stepStr == null) return 1;

    const parsed = Number.parseInt(stepStr);
    if (parsed >= 1 && parsed <= 7) return parsed;

    return 1;
  },
  SetCourses: (courses: Course[]) => {
    localStorage.setItem("__courses", JSON.stringify(courses));
  },
  GetCourses: (): Course[] => {
    const courses: Course[] = [];
    const coursesStr = localStorage.getItem("__courses");
    if (coursesStr == null) return courses;

    const parsed = JSON.parse(coursesStr);
    if (parsed && typeof parsed == typeof courses) return parsed;

    return courses;
  },
  SetClassrooms: (classrooms: Classroom[]) => {
    localStorage.setItem("__classrooms", JSON.stringify(classrooms));
  },
  GetClassrooms: (): Classroom[] => {
    const classrooms: Classroom[] = [];
    const classroomsStr = localStorage.getItem("__classrooms");
    if (classroomsStr == null) return classrooms;

    const parsed = JSON.parse(classroomsStr);
    if (parsed && typeof parsed == typeof classrooms) return parsed;

    return classrooms;
  },
  SetBusy: (busy: Busy[]) => {
    localStorage.setItem("__busy", JSON.stringify(busy));
  },
  GetBusy: (): Busy[] => {
    const busy: Busy[] = [];
    const busyStr = localStorage.getItem("__busy");
    if (busyStr == null) return busy;

    const parsed = JSON.parse(busyStr);
    if (parsed && typeof parsed == typeof busy) return parsed;

    return busy;
  },
  SetConflict: (conflict: Conflict[]) => {
    localStorage.setItem("__conflict", JSON.stringify(conflict));
  },
  GetConflict: (): Conflict[] => {
    const conflict: Conflict[] = [];
    const conflictStr = localStorage.getItem("__conflict");
    if (conflictStr == null) return conflict;

    const parsed = JSON.parse(conflictStr);
    if (parsed && typeof parsed == typeof conflict) return parsed;

    return conflict;
  },
  SetSplit: (split: Split[]) => {
    localStorage.setItem("__split", JSON.stringify(split));
  },
  GetSplit: (): Split[] => {
    const split: Split[] = [];
    const splitStr = localStorage.getItem("__split");
    if (splitStr == null) return split;

    const parsed = JSON.parse(splitStr);
    if (parsed && typeof parsed == typeof split) return parsed;

    return split;
  },
  SetReserved: (reserved: Reserved[]) => {
    localStorage.setItem("__reserved", JSON.stringify(reserved));
  },
  GetReserved: (): Reserved[] => {
    const reserved: Reserved[] = [];
    const reservedStr = localStorage.getItem("__reserved");
    if (reservedStr == null) return reserved;

    const parsed = JSON.parse(reservedStr);
    if (parsed && typeof parsed == typeof reserved) return parsed;

    return reserved;
  },
  GetProfessors: () => {
    const seen: Map<string, boolean> = new Map();
    const profs: string[] = [];
    Repository.GetCourses()
      .filter(function (item) {
        return seen.has(item.Lecturer) ? false : seen.set(item.Lecturer, true);
      })
      .forEach((u) => {
        profs.push(u.Lecturer);
      });
    return profs;
  },
  GetDepartments: () => {
    const seen: Map<string, boolean> = new Map();
    const deps: string[] = [];
    Repository.GetCourses()
      .filter(function (item) {
        return seen.has(item.Depertmant)
          ? false
          : seen.set(item.Depertmant, true);
      })
      .forEach((u) => {
        deps.push(u.Depertmant);
      });
    return deps;
  },
  GetCourseCodes: (department: string) => {
    const seen: Map<string, boolean> = new Map();
    const codes: string[] = [];
    Repository.GetCourses()
      .filter(function (item) {
        if (item.Depertmant != department) return false;
        return seen.has(item.Course_Code)
          ? false
          : seen.set(item.Course_Code, true);
      })
      .forEach((u) => {
        codes.push(u.Course_Code);
      });
    return codes;
  },
};
