import { addWeighIn } from "@/ServerActions";
import Link from "next/link";

const AddWeighIn = () => {
  return (
    <div>
      <form action={addWeighIn} noValidate>
        <div className="form-control">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
        </div>

        <div className="form-control">
          <label htmlFor="weight">Weight</label>
          <input type="number" id="weight" name="weight" />
        </div>

        <div className="form-control">
          <label htmlFor="bodyFatPercentage">Body Fat % (optional)</label>
          <input
            type="number"
            id="bodyFatPercentage"
            name="bodyFatPercentage"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <Link href="/weighIns" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddWeighIn;
