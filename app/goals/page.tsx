import { getGoal, updateGoal } from "@/serverActions/actions";

const Goal = async () => {
  const goal = await getGoal();
  return (
    <div>
      <h2>Goal</h2>
      {goal && (
        <form action={updateGoal}>
          <input type="hidden" id="id" name="id" defaultValue={goal.id} />
          <div className="form-control">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              step={0.01}
              id="weight"
              name="weight"
              defaultValue={goal.weight.toNumber()}
            />
          </div>

          {/* TODO: update needs more feedback */}
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default Goal;
