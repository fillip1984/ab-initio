import { getWeighIns } from "@/ServerActions";
import { format } from "date-fns";
import { BsCalendarEvent } from "react-icons/bs";
import { IoScaleOutline } from "react-icons/io5";
import { GiMuscleFat } from "react-icons/gi";
import { MdTrendingDown, MdTrendingFlat, MdTrendingUp } from "react-icons/md";

const WeighIns = async () => {
  const weighIns = await getWeighIns();
  return (
    <div className="py-12">
      <h2>ab initio</h2>

      <div className="flex flex-col gap-2">
        {weighIns.map((weighIn) => (
          <div
            key={weighIn.id}
            className="flex justify-between items-center border-1 rounded-xl bg-gray-200 p-2">
            <div className="flex flex-col">
              <span className="flex gap-2 justify-between items-center">
                <IoScaleOutline />
                <span className="text-3xl">{weighIn.weight.toString()}</span>
              </span>
              <div className="flex items-center justify-between gap-2">
                <div className="text-2xl">
                  <MdTrendingDown />
                </div>
                <div className="flex text-xs flex-col items-end">
                  <span>5 lost</span>
                  <span>35 to goal</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-2 justify-between items-center">
                <GiMuscleFat />
                {weighIn.bodyFatPercentage?.toString()}%
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-2xl">
                  <MdTrendingDown />
                </div>
                <div className="flex text-xs flex-col items-end">
                  <span>.25% lost</span>
                  <span>4.12% to goal</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-2 justify-between items-center">
                <BsCalendarEvent />
                {format(weighIn.date, "MM-dd-yyyy")}
              </div>
              <div className="flex text-xs items-center gap-2">
                13 days into journey
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeighIns;
