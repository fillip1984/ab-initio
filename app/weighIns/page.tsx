import { getGoal, getWeighIns } from "@/serverActions/actions";
import { BsCalendarEvent } from "react-icons/bs";
import { GiMuscleFat, GiStairsGoal } from "react-icons/gi";
import { IoScaleOutline } from "react-icons/io5";
import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from "react-icons/md";

const WeighIns = async () => {
  const weighIns = await getWeighIns();
  const goal = await getGoal();
  const goalWeight = goal.weight.toNumber();

  return (
    <>
      <h3 className="my-2 text-center">ab initio</h3>

      <div className="flex flex-col gap-2">
        {weighIns.map((weighIn) => (
          <div key={weighIn.id} className="flex flex-col rounded-lg border-2">
            <div className="flex items-center justify-center gap-2 bg-gray-100 p-1">
              <BsCalendarEvent />
              {weighIn.date.toISOString().substring(0, 10)}
            </div>
            <div className="flex flex-1 justify-between bg-gray-100 p-4">
              <span className="flex flex-col items-center text-3xl">
                <span className="text-xs uppercase text-gray-500">Weight</span>
                {weighIn.weight.toNumber()}
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <IoScaleOutline /> lbs
                </span>
              </span>
              <span className="flex flex-col items-center text-xl">
                <span className="text-xs uppercase text-gray-500">To Date</span>
                {weighIn.weightProgress.toNumber()}
                {weighIn.weightProgress.isPositive() &&
                  !weighIn.weightProgress.isZero() && <MdTrendingUp />}
                {weighIn.weightProgress.isZero() && <MdTrendingFlat />}
                {weighIn.weightProgress.isNegative() && <MdTrendingDown />}
              </span>
              <span className="flex flex-col items-center text-xl">
                <span className="text-xs uppercase text-gray-500">Total</span>
                {weighIn.weightTotalChange.toNumber()}
                {weighIn.weightTotalChange.isPositive() &&
                  !weighIn.weightTotalChange.isZero() && <MdTrendingUp />}
                {weighIn.weightTotalChange.isZero() && <MdTrendingFlat />}
                {weighIn.weightTotalChange.isNegative() && <MdTrendingDown />}
              </span>
              <span className="flex flex-col items-center text-3xl">
                <span className="text-xs uppercase text-gray-500">To Goal</span>
                {weighIn.weightToGoal.toNumber()}
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <GiStairsGoal />
                  {goalWeight} lbs
                </span>
              </span>
            </div>

            {/* TODO: add in additional stats? */}
            {/* <div className="flex justify-around border-t-2 border-t-gray-200 bg-gray-300 p-2">
              <span>
                23% bf <GiMuscleFat />
              </span>
              <span>28.4 BMI</span>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default WeighIns;
