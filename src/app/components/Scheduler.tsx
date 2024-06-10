"use client";

import { useEffect, useState } from "react";
import Progress, { Step } from "./Progress";
import CoursesView from "./coursesView/CoursesView";
import ClassroomsView from "./classroomsView/ClassroomsView";
import { Repository } from "../repository";
import BusyView from "./busyView/BusyView";
import ConflictView from "./conflictView/ConflictView";
import SplitView from "./splitView/SplitView";
import ReserveView from "./reserveView/ReserveView";
import GenerateView from "./generateView/GenerateView";
import { useTranslation } from "react-i18next";

export default function Scheduler() {
  const [t, i18n] = useTranslation("global");
  const [currentStep, _setCurrentStep] = useState(1);
  const setCurrentStep = (step: number) => {
    Repository.SetStep(step);
    _setCurrentStep(step);
  };

  useEffect(() => {
    _setCurrentStep(Repository.GetStep());
  }, []);

  const steps: Step[] = [
    { index: 1, title: t("scheduler.courseList"), details: "" },
    { index: 2, title: t("scheduler.classrooms"), details: "" },
    { index: 3, title: t("scheduler.busyDays"), details: "" },
    { index: 4, title: t("scheduler.conflictingCourses"), details: "" },
    { index: 5, title: t("scheduler.split"), details: "" },
    { index: 6, title: t("scheduler.reserved"), details: "" },
    { index: 7, title: t("scheduler.generate"), details: "" },
  ];
  const views = [
    <CoursesView key={steps[0].title} />,
    <ClassroomsView key={steps[1].title} />,
    <BusyView key={steps[2].title} />,
    <ConflictView key={steps[3].title} />,
    <SplitView key={steps[4].title} />,
    <ReserveView key={steps[5].title} />,
    <GenerateView key={steps[6].title} />,
  ];
  return (
    <div>
      <div className="py-4 mb-4 border-b border-slate-100 shadow-md">
        <Progress
          currentStep={currentStep}
          steps={steps}
          changeStep={setCurrentStep}
        />
      </div>
      {views.at(currentStep - 1)}
    </div>
  );
}
