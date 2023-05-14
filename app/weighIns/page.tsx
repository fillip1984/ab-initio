import { getWeighIns } from "@/ServerActions";
import { format } from "date-fns";
import { BsCalendarEvent } from "react-icons/bs";
import { IoScaleOutline } from "react-icons/io5";
import { GiMuscleFat } from "react-icons/gi";
import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from "react-icons/md";

const WeighIns = async () => {
  const weighIns = await getWeighIns();
  return (
    <div className="p-12">
      <h2>ab initio</h2>

      <div className="flex flex-col gap-2">
        {weighIns.map((weighIn) => (
          <div
            key={weighIn.id}
            className="w-full p-4 flex justify-between border-2 border-red-200 rounded-xl bg-red-100">
            <span className="stat flex flex-col items-center">
              <span className="stat-icon text-xl text-gray-400 mb-2">
                <BsCalendarEvent />
              </span>
              <span className="stat-value text-xl font-bold">
                {format(weighIn.date, "MM-dd-yyyy")}
              </span>
              <span className="stat-desc text-gray-400 text-sm">
                55 days since goal set
              </span>
            </span>

            <div className="stat flex gap-6 text-red-500 items-center">
              <div className="stat-content flex flex-col">
                <span className="stat-value text-2xl font-bold">
                  {weighIn.weight.toString()}
                </span>
                <span className="stat-desc flex items-center text-sm text-red-300">
                  2 lbs gained <MdTrendingUp />
                </span>
              </div>
              <IoScaleOutline className="text-4xl" />
            </div>

            <div className="stat flex gap-6 text-red-500 items-center">
              <div className="stat-content flex flex-col">
                <span className="stat-value text-2xl font-bold">
                  {weighIn.bodyFatPercentage?.toString()}
                </span>
                <span className="stat-desc flex items-center text-sm text-red-300">
                  3% <MdTrendingUp /> <MdTrendingFlat /> <MdTrendingDown />
                </span>
              </div>
              <GiMuscleFat className="text-4xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeighIns;
