export const SkillForm = () => {
  return (
    <form>
      <h3>Skills</h3>
      <label>Skill</label>
      <input type="text" name="skill" />
      <input type="submit" value="Add" className="btn-submit" />
    </form>
  );
};
