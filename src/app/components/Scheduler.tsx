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

export default function Scheduler() {
  const [currentStep, _setCurrentStep] = useState(1);
  const setCurrentStep = (step: number) => {
    Repository.SetStep(step);
    _setCurrentStep(step);
  };

  useEffect(() => {
    _setCurrentStep(Repository.GetStep());
  });

  const steps: Step[] = [
    { index: 1, title: "Course List", details: "" },
    { index: 2, title: "Classrooms", details: "" },
    { index: 3, title: "Busy Days", details: "" },
    { index: 4, title: "Conflicting Courses", details: "" },
    { index: 5, title: "Split", details: "" },
    { index: 6, title: "Reserved", details: "" },
    { index: 7, title: "Generate", details: "" },
  ];
  const views = [
    <CoursesView />,
    <ClassroomsView />,
    <BusyView />,
    <ConflictView />,
    <SplitView />,
    <ReserveView />,
    <GenerateView />,
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
