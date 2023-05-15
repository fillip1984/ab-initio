import { getWeighIns } from "@/ServerActions/actions";
import { format, formatISO } from "date-fns";
import { BsCalendarEvent } from "react-icons/bs";
import { IoScaleOutline } from "react-icons/io5";
import { GiMuscleFat } from "react-icons/gi";
import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from "react-icons/md";

const WeighIns = async () => {
  const weighIns = await getWeighIns();

  return (
    <>
      <h2 className="my-2 text-center">ab initio</h2>

      <div className="flex flex-col gap-2">
        {weighIns.map((weighIn) => (
          <div
            key={weighIn.id}
            className="border-1 flex items-center justify-between rounded-xl bg-gray-200 p-2">
            <div className="flex flex-col">
              <span className="flex items-center justify-between gap-2">
                <IoScaleOutline />
                <span className="text-3xl">{weighIn.weight.toString()}</span>
              </span>
              <div className="flex items-center justify-between gap-2">
                <div className="text-2xl">
                  {weighIn.weightProgress.isPositive() &&
                    !weighIn.weightProgress.isZero() && <MdTrendingUp />}
                  {weighIn.weightProgress.isZero() && <MdTrendingFlat />}
                  {weighIn.weightProgress.isNegative() && <MdTrendingDown />}
                </div>
                <div className="flex flex-col items-end text-xs">
                  <span>
                    {weighIn.weightProgress.toString()} lbs{" "}
                    {weighIn.weightProgress.isPositive() ? "gained" : "lost"}
                  </span>
                  <span>.13 lbs gained overall</span>
                  <span>{weighIn.weightToGoal.toString()} to goal</span>
                </div>
              </div>
            </div>

            {/* {weighIn.bodyFatPercentage && (
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <GiMuscleFat />
                  {weighIn.bodyFatPercentage?.toString()}%
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-2xl">
                    <MdTrendingDown />
                  </div>
                  <div className="flex flex-col items-end text-xs">
                    <span>.25% lost</span>
                    <span>4.12% to goal</span>
                  </div>
                </div>
              </div>
            )} */}

            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <BsCalendarEvent />
                {weighIn.date.toISOString().substring(0, 10)}
              </div>
              {/* <div className="flex items-center gap-2 text-xs">
                13 days into journey
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeighIns;
