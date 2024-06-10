export type Step = {
  index: number;
  title: string;
  details: string;
};

function Progress({
  currentStep,
  steps,
  changeStep,
}: {
  currentStep: number;
  steps: Step[];
  changeStep: Function;
}) {
  return (
    <ol className="items-center w-full space-y-4 flex justify-around sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
      {steps.map((s) => {
        if (s.index > currentStep)
          return (
            <span
              className="cursor-pointer select-none"
              onClick={() => changeStep(s.index)}
              key={s.index}
            >
              <UpcomingStep
                index={s.index}
                title={s.title}
                details={s.details}
                key={s.index}
              />
            </span>
          );
        else if (s.index < currentStep)
          return (
            <span
              className="cursor-pointer select-none"
              onClick={() => changeStep(s.index)}
              key={s.index}
            >
              <CompletedStep
                index={s.index}
                title={s.title}
                details={s.details}
                key={s.index}
              />
            </span>
          );
        else
          return (
            <span
              className="cursor-pointer select-none"
              onClick={() => changeStep(s.index)}
              key={s.index}
            >
              <CurrentStep
                index={s.index}
                title={s.title}
                details={s.details}
                key={s.index}
              />
            </span>
          );
      })}
    </ol>
  );
}

function CompletedStep(step: Step) {
  return (
    <li className="flex items-center text-green-600 space-x-2.5 rtl:space-x-reverse">
      <span className="flex items-center justify-center w-8 h-8 border border-green-600 rounded-full shrink-0 ">
        {step.index}
      </span>
      <span>
        <h3 className="font-medium leading-tight">{step.title}</h3>
        <p className="text-sm">{step.details}</p>
      </span>
    </li>
  );
}

function CurrentStep(step: Step) {
  return (
    <li className="flex items-center text-blue-600 space-x-2.5 rtl:space-x-reverse">
      <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 ">
        {step.index}
      </span>
      <span>
        <h3 className="font-medium leading-tight">{step.title}</h3>
        <p className="text-sm">{step.details}</p>
      </span>
    </li>
  );
}

function UpcomingStep(step: Step) {
  return (
    <li className="flex items-center text-gray-500  space-x-2.5 rtl:space-x-reverse">
      <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 ">
        {step.index}
      </span>
      <span>
        <h3 className="font-medium leading-tight">{step.title}</h3>
        <p className="text-sm">{step.details}</p>
      </span>
    </li>
  );
}

export default Progress;
